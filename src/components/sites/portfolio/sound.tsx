"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { getUI, type Lang } from "@/content/i18n";

/* Yard sound for the home page, synthesised in the browser (no audio files): a distant rumble of wind and
   city, a truck idling, an occasional metal clank from the crane with a short yard echo, and a rush of air
   that follows scroll speed, so the tour's fly-throughs are heard as well as seen. Off until the visitor
   turns it on (browsers only allow sound after a click anyway); it fades in and out, and pauses while the
   tab is hidden. */

type Rig = { ctx: AudioContext; master: GainNode; rush: GainNode; stop: () => void };

/** A few seconds of brown noise: soft, low, and loops without a click. */
function brownNoise(ctx: AudioContext, seconds = 4) {
  const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < d.length; i++) {
    last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
    d[i] = last * 3.5;
  }
  return buf;
}

function build(): Rig {
  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);
  const noise = brownNoise(ctx);
  const source = (buffer: AudioBuffer) => {
    const s = ctx.createBufferSource();
    s.buffer = buffer;
    s.loop = true;
    s.start();
    return s;
  };
  const chain = (...nodes: AudioNode[]) => nodes.reduce((a, b) => (a.connect(b), b));
  const filter = (type: BiquadFilterType, frequency: number, Q = 0.7) => new BiquadFilterNode(ctx, { type, frequency, Q });
  const gain = (value: number) => new GainNode(ctx, { gain: value });
  const lfo = (frequency: number, depth: number, target: AudioParam) => {
    const o = new OscillatorNode(ctx, { frequency });
    chain(o, gain(depth)).connect(target);
    o.start();
    return o;
  };

  // Distant rumble, and wind that swells slowly.
  chain(source(noise), filter("lowpass", 320), gain(0.35), master);
  const wind = gain(0.09);
  chain(source(noise), filter("bandpass", 700, 0.6), wind, master);
  const windLfo = lfo(0.07, 0.04, wind.gain);

  // Truck idling: two low saws, muffled, with a slight engine flutter.
  const engine = gain(0.05);
  const saws = [42, 84.6].map((f) => {
    const o = new OscillatorNode(ctx, { type: "sawtooth", frequency: f });
    o.connect(engine);
    o.start();
    return o;
  });
  chain(engine, filter("lowpass", 160), master);
  const flutter = lfo(5.5, 0.012, engine.gain);

  // A short yard echo for the crane.
  const echo = new DelayNode(ctx, { delayTime: 0.28 });
  const feedback = gain(0.32);
  chain(echo, filter("lowpass", 1400), feedback, echo);
  echo.connect(master);

  // Rush of air with scroll speed.
  const rush = gain(0);
  chain(source(noise), filter("bandpass", 900, 0.8), rush, master);

  // Now and then, metal on metal: a click of noise and two ringing partials that die away.
  let timer = 0;
  const clank = () => {
    const t = ctx.currentTime;
    const hit = gain(1);
    hit.connect(master);
    hit.connect(echo);
    [430, 690, 1130].forEach((f, i) => {
      const o = new OscillatorNode(ctx, { frequency: f * (0.97 + Math.random() * 0.06) });
      const g = gain(0);
      g.gain.setValueAtTime(0.05 / (i + 1), t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
      chain(o, g, hit);
      o.start(t);
      o.stop(t + 1.5);
    });
    const click = ctx.createBufferSource();
    click.buffer = noise;
    const cg = gain(0);
    cg.gain.setValueAtTime(0.25, t);
    cg.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
    chain(click, filter("bandpass", 1800, 1.2), cg, hit);
    click.start(t, Math.random() * 3, 0.08);
    timer = window.setTimeout(clank, 6000 + Math.random() * 7000);
  };
  timer = window.setTimeout(clank, 2500);

  return {
    ctx,
    master,
    rush,
    stop: () => {
      window.clearTimeout(timer);
      [windLfo, flutter, ...saws].forEach((o) => o.stop());
      void ctx.close();
    },
  };
}

export function SoundToggle({ lang }: { lang: Lang }) {
  const t = getUI(lang).sound;
  const [on, setOn] = useState(false);
  const rig = useRef<Rig | null>(null);

  // Fade in or out; build the sound on the first click (that click is what lets the browser play it).
  useEffect(() => {
    if (on && !rig.current) rig.current = build();
    const r = rig.current;
    if (!r) return;
    if (on) void r.ctx.resume();
    r.master.gain.setTargetAtTime(on ? 0.9 : 0, r.ctx.currentTime, on ? 0.6 : 0.25);
  }, [on]);

  // Scroll speed drives the rush of air; a hidden tab goes quiet.
  useEffect(() => {
    let lastY = window.scrollY;
    let lastT = performance.now();
    let calm = 0;
    const onScroll = () => {
      const r = rig.current;
      const now = performance.now();
      const speed = Math.abs(window.scrollY - lastY) / Math.max(16, now - lastT); // px per ms
      lastY = window.scrollY;
      lastT = now;
      if (!r) return;
      r.rush.gain.setTargetAtTime(Math.min(0.5, speed * 0.18), r.ctx.currentTime, 0.08);
      window.clearTimeout(calm);
      calm = window.setTimeout(() => r.rush.gain.setTargetAtTime(0, r.ctx.currentTime, 0.4), 120);
    };
    const onVisible = () => {
      const r = rig.current;
      if (!r) return;
      if (document.hidden) void r.ctx.suspend();
      else if (on) void r.ctx.resume();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisible);
      window.clearTimeout(calm);
    };
  }, [on]);

  useEffect(() => () => rig.current?.stop(), []);

  const label = on ? t.on : t.off;
  return (
    <button type="button" className="ctl ctl--sound" onClick={() => setOn((v) => !v)} aria-pressed={on} aria-label={label} title={label}>
      {on ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
    </button>
  );
}
