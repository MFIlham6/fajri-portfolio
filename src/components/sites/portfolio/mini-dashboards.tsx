import { HBar, Split } from "./charts";

/* Mini dashboards for the four featured projects. Each one shows figures from the doc. */

export const miniDashboardSlugs = new Set(["telkom-m2", "telkom-m1", "case-14", "case-9"]);

function Bar({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="mini__bar">
      <span>{title}</span>
      <span>{meta}</span>
    </div>
  );
}

/** Mini dashboard for a featured project, used as its preview where there is no chart image. */
/** Always in English, like the projects' lead charts. */
export function MiniDashboard({ slug }: { slug: string }) {
  switch (slug) {
    case "telkom-m2":
      return (
        <div className="mini">
          <Bar title={"OCA · Client segments"} meta="RFM + K-Means" />
          <div className="mini__grid">
            <div className="mini__card s2"><span className="t">Loyal Premium</span><span className="k accent">3</span><span className="t">60% revenue</span></div>
            <div className="mini__card s2"><span className="t">Mid Tier</span><span className="k">5</span><span className="t">25% revenue</span></div>
            <div className="mini__card s2"><span className="t">Potential</span><span className="k">12</span><span className="t">15% revenue</span></div>
            <div className="mini__card s6">
              <span className="t">{"Revenue share by segment"}</span>
              <Split label="60, 25, 15 percent" parts={[{ value: 60, text: "60%" }, { value: 25, text: "25%" }, { value: 15, text: "15%" }]} />
            </div>
            <div className="mini__card mini__card--dark s6"><span className="t">Silhouette (k = 3)</span><span className="k accent">{"0.985"}</span></div>
          </div>
        </div>
      );
    case "telkom-m1":
      return (
        <div className="mini">
          <Bar title={"OCA Blast · Message dashboard"} meta="Tableau" />
          <div className="mini__grid">
            <div className="mini__card s3"><span className="t">{"Message volume"}</span><span className="k accent">−28%</span><span className="t">{"49,534 → 35,492"}</span></div>
            <div className="mini__card s3"><span className="t">Email</span><span className="k">−60%</span></div>
            <div className="mini__card mini__card--dark s6">
              <span className="t">{"Success rate"}</span>
              <HBar label="SMS 99.67 percent, Call 21.87 percent" rows={[{ name: "SMS", value: 99.67, display: "99.67%", accent: true }, { name: "Call", value: 21.87, display: "21.87%" }]} />
            </div>
          </div>
        </div>
      );
    case "case-14":
      return (
        <div className="mini">
          <Bar title={"Year-on-year growth 2025"} meta="SQL" />
          <div className="mini__grid">
            <div className="mini__card s3"><span className="t">{"Revenue vs 2024"}</span><span className="k accent">{"+12.37%"}</span></div>
            <div className="mini__card s3"><span className="t">{"Months > 10%"}</span><span className="k">6 / 12</span></div>
            <div className="mini__card s6">
              <span className="t">{"Monthly growth range"}</span>
              <HBar label="June 3.83 percent, November 24.31 percent" rows={[{ name: "June", value: 15.8, display: "3.83%" }, { name: "November", value: 100, display: "24.31%", accent: true }]} />
            </div>
          </div>
        </div>
      );
    case "case-9":
      return (
        <div className="mini">
          <Bar title={"Product bundles · 3,000 baskets"} meta="SQL" />
          <div className="mini__grid">
            <div className="mini__card s3"><span className="t">{"Bundles chosen"}</span><span className="k accent">3</span></div>
            <div className="mini__card s3"><span className="t">{"Pairs tested"}</span><span className="k">105</span></div>
            <div className="mini__card s6">
              <span className="t">{"Baskets per pair"}</span>
              <HBar
                label="Bundles up to 1,395 baskets; rejected pair 146 baskets"
                rows={[
                  { name: "Bundles", value: 46.5, display: "≤ 1,395", accent: true },
                  { name: "Rejected", value: 4.9, display: "146" },
                ]}
              />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
