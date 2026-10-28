/* Direction for the hero films: every camera, timing and look setting in one place.
   The hero shows pre-rendered films of the 3D yard (hero-3d-scene.tsx) from public/video: a seamless loop
   and a scroll tour, each wide and tall, day and night. The scene renders them frame by frame at a fixed
   canvas size; the page only plays them (hero-video.tsx, hero-tour.tsx).
   Positions are world units (metres); the yard: warehouse window wall around (-10, 4, -20), truck nose around
   (10.5, 1.9, 5.7), container stack around (15, 0, -33), the crane's hoist around (20.5, 8, -32.5).
   Tour positions are fractions of the camera path (0 = hero wide, 1 = aerial exit). */

export type Vec3 = [number, number, number];

/* ---------- Films ---------- */
/** Render size of the films, in pixels: wide for landscape screens, tall for portrait ones. */
export const FILM_SIZE = { wide: [2560, 1440], tall: [1080, 1920] } as const;

/** One seamless loop of the hero wide shot: length in seconds, frame rate, and the camera's slow move
    (sideways drift and rise in metres, push-in as a fraction of the distance to the subject).
    `shift` moves the camera left on landscape frames, so the yard sits right of the headline. */
export const LOOP_SHOT = { seconds: 12, fps: 30, drift: 1.6, rise: 0.12, push: 0.05, shift: 7 } as const;

/** The scroll tour: the camera path below as an image sequence (public/video/tour-<look>-<shape>/), played by
    scroll in hero-tour.tsx. It starts on the loop's first frame, so the hand-over is seamless. The day tour
    runs into a golden dusk along the way (`dayToNight`: the path fractions it turns over, up to `dayPeak` on
    the 0 day .. 1 night scale), so the light theme stays light, with the lamps just coming on.
    `handover` is the scroll fraction over which the loop and the headline give way to the tour. */
export const TOUR = { frames: 200, scroll: "260svh", handover: 0.06, dayToNight: [0.12, 0.85], dayPeak: 0.55 } as const;

/** Portrait screens, wide shot only (eases out over the first shot): aim sideways (metres), raise or lower
    the aim point (negative lifts the yard up the frame, clear of the headline), and pull back (fraction). */
export const PORTRAIT = { x: 3, lookY: -4.5, pullBack: 0.5 } as const;

/** Handheld sway on every shot, in degrees, and the tiny position drift with it, in metres. */
export const SWAY = { deg: 0.12, drift: 0.05 } as const;

/* ---------- Tour shots ---------- */
/** The tour is three forward pushes, each ending by flying into something that fills the frame: the lit
    warehouse window (dark by day, warm at night), then the truck's headlight (a white glare). The next shot
    comes out of that same colour, so the cut is never seen. Each shot is a CatmullRom through its `pos` and
    `look` points, travelled with `push` easing (above 1 = speeding up into the next shot) while the lens
    narrows from fov[0] to fov[1]. `from`/`to` are path fractions. */
export type Shot = {
  from: number; to: number; pos: Vec3[]; look: Vec3[]; fov: [number, number]; bloom: number; fog: number;
  into?: "window" | "headlight";
};
export const SHOTS: Shot[] = [
  // 1. From the hero wide (the loop's framing) over the trailer and into a window of the warehouse.
  { from: 0, to: 0.32, pos: [[3, 9.5, 41], [-6, 7.5, 16], [-9.45, 4.4, -16.05]], look: [[3, 5.6, 0], [-9.6, 4.6, -14], [-10.4, 4.4, -18.3]], fov: [38, 30], bloom: 0.95, fog: 1, into: "window" },
  // 2. The truck head-on on a long lens (stacks the warehouse up behind it); straight into its headlights.
  { from: 0.32, to: 0.62, pos: [[31.6, 2.6, -0.8], [21, 2.3, 2.4], [11.5, 1.95, 5.4]], look: [[10.55, 2.2, 5.67], [10.55, 2, 5.67], [10, 1.9, 5.85]], fov: [26, 19], bloom: 1.2, fog: 0.9, into: "headlight" },
  // 3. The crane from in front, lifting the red container; then up past the hoist and over the port, out to
  //    the open water and the moon (or the setting sun) over it.
  { from: 0.62, to: 1, pos: [[12, 1.8, -2], [12.5, 12, -14], [11, 34, -30]], look: [[19, 9, -32], [17, 16, -40], [24, 36, -67]], fov: [40, 36], bloom: 1.2, fog: 1 },
];
/** The fly-through between shots: over `blur` (a path fraction) the frame is pulled into a radial zoom blur
    up to `strength`, then over the last `out` it fills with what it flies into; the next shot comes out of
    that colour over `in`, its blur settling over `settle`. */
export const THROUGH = { blur: 0.09, strength: 0.32, out: 0.035, in: 0.04, settle: 0.06 } as const;

/** How the camera moves through each shot, as an operator would: [shot fraction, path fraction, speed].
    It lands out of the transition, slows to a drift while the subject and its caption read, then speeds up
    into the next fly-through. Joined with cubic Hermite curves, so speed changes are smooth. */
export const PACE: [number, number, number][] = [
  [0, 0, 1.5],
  [0.3, 0.33, 0.45],
  [0.7, 0.5, 0.45],
  [1, 1, 3.2],
];

/** When each scene's caption shows, as path fractions (warehouse, truck, crane, sky); the captions'
    text is hero.chapters in i18n.ts, in the same order. Each fades in and out over CHAPTER_FADE. */
export const CHAPTERS = [
  { from: 0.07, to: 0.26 },
  { from: 0.37, to: 0.56 },
  { from: 0.66, to: 0.81 },
  { from: 0.84, to: 0.97 },
] as const;
export const CHAPTER_FADE = 0.03;

/** The dissolve into the About background, as fractions of the tour's scroll. */
export const DISSOLVE = { from: 0.86, to: 1 } as const;

/* ---------- Look ---------- */
export const LOOK = {
  vignetteOffset: 0.32,
  vignetteDarkness: 0.5,
  /** Colour grade: lifted blacks, teal-navy shadows, warm highlights, gentle S-curve. */
  grade: {
    lift: 0.03,
    shadowTint: [-0.015, 0.02, 0.045] as Vec3,
    highlightTint: [0.05, 0.025, -0.035] as Vec3,
    sCurve: 0.22,
  },
} as const;

/* ---------- Live state ---------- */
/** What the scene reads every frame; the film renders set it per frame. */
export type Direction = {
  /** Position along the tour path, 0 to 1. */
  s: number;
  /** Time of day: 0 day, 0.5 dusk, 1 night. Lamps come on through dusk. */
  night: number;
};
