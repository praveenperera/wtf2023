import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

type GaugeTone = "accent" | "payment" | "risk";

type GaugeMeterProps = {
  value: number;
  max: number;
  label: string;
  detail: string;
  source: string;
  tone?: GaugeTone;
};

const toneClassNames: Record<GaugeTone, string> = {
  accent: "text-accent",
  payment: "text-payment",
  risk: "text-risk",
};

const toneColors: Record<GaugeTone, string> = {
  accent: "var(--accent)",
  payment: "var(--payment)",
  risk: "var(--risk)",
};

export default function GaugeMeter({
  value,
  max,
  label,
  detail,
  source,
  tone = "accent",
}: GaugeMeterProps) {
  const safeMax = max > 0 ? max : 100;
  const percentage = Math.min(Math.max((value / safeMax) * 100, 0), 100);
  const formattedValue = new Intl.NumberFormat("en", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(value);
  const gaugeData = [{ value: percentage }];

  return (
    <div
      aria-label={`${label}: ${formattedValue}% of ${safeMax}% maximum. ${detail}. Source: ${source}`}
      className="gauge-meter"
      role="img"
    >
      <p className="gauge-label">{label}</p>
      <div className="gauge-arc">
        <ResponsiveContainer height="100%" width="100%">
          <RadialBarChart
            barSize={18}
            cx="50%"
            cy="94%"
            data={gaugeData}
            endAngle={0}
            innerRadius="78%"
            outerRadius="100%"
            startAngle={180}
          >
            <PolarAngleAxis
              axisLine={false}
              domain={[0, 100]}
              tick={false}
              type="number"
            />
            <RadialBar
              background={{
                fill: "color-mix(in srgb, var(--border) 82%, transparent)",
              }}
              cornerRadius={999}
              dataKey="value"
              fill={toneColors[tone]}
              isAnimationActive={false}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="gauge-reading">
        <span className={toneClassNames[tone]}>{formattedValue}%</span>
        <small>{detail}</small>
      </div>
      <p className="gauge-source">{source}</p>
    </div>
  );
}
