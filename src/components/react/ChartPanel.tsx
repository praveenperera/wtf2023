import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ChartRow = Record<string, string | number | null>;
type ChartSeries = { key: string; label: string; color: string };

type ChartPanelProps = {
  title: string;
  subtitle: string;
  interpretation: string;
  source: string;
  snapshotDate: string;
  href: string;
  rows: ChartRow[];
  xKey: string;
  series: ReadonlyArray<ChartSeries>;
  type?: "line" | "area" | "stackedArea";
  emptyNote?: string;
  frame?: boolean;
  variant?: "default" | "operations";
  percentAxis?: boolean;
  annotation?: {
    x: string;
    label: string;
  };
};

const chartMargin = { top: 14, right: 18, bottom: 4, left: 0 };
const axisTick = { fill: "var(--dim)", fontSize: 11 };
const tooltipContentStyle = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  boxShadow:
    "0 16px 40px color-mix(in srgb, var(--foreground) 12%, transparent)",
  color: "var(--foreground)",
};

function formatAxisValue(value: string | number, percentAxis = false) {
  if (typeof value !== "number") {
    return value;
  }

  if (percentAxis) {
    return `${value}%`;
  }

  return new Intl.NumberFormat("en", {
    maximumFractionDigits: value >= 100 ? 0 : 1,
    notation: Math.abs(value) >= 1000 ? "compact" : "standard",
  }).format(value);
}

function formatTooltipValue(value: unknown, percentAxis = false) {
  if (typeof value !== "number") {
    return typeof value === "string" ? value : null;
  }

  const formatted = new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
  }).format(value);

  return percentAxis ? `${formatted}%` : formatted;
}

export default function ChartPanel({
  title,
  subtitle,
  interpretation,
  source,
  snapshotDate,
  href,
  rows,
  xKey,
  series,
  type = "line",
  emptyNote = "No chart rows are available for this view yet.",
  frame = true,
  variant = "default",
  percentAxis = false,
  annotation,
}: ChartPanelProps) {
  const hasRows = rows.length > 0;
  const isArea = type === "area" || type === "stackedArea";
  const isStackedArea = type === "stackedArea";
  const isOperations = variant === "operations";
  const Chart = isArea ? AreaChart : LineChart;
  const chartRef = useRef<HTMLDivElement>(null);
  const [canRenderChart, setCanRenderChart] = useState(!hasRows);
  const [chartSize, setChartSize] = useState({ height: 0, width: 0 });

  useEffect(() => {
    const node = chartRef.current;

    if (!node) {
      return;
    }

    const updateSize = () => {
      const rect = node.getBoundingClientRect();

      setChartSize((currentSize) => {
        const nextSize = {
          height: Math.max(0, Math.floor(rect.height)),
          width: Math.max(0, Math.floor(rect.width)),
        };

        if (
          currentSize.height === nextSize.height &&
          currentSize.width === nextSize.width
        ) {
          return currentSize;
        }

        return nextSize;
      });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!hasRows) {
      return;
    }

    const node = chartRef.current;

    if (!node) {
      return;
    }

    let animationFrame = 0;
    const renderWhenSized = () => {
      const rect = node.getBoundingClientRect();

      if (rect.width > 0 && rect.height > 0) {
        setCanRenderChart(true);
        return;
      }

      animationFrame = requestAnimationFrame(renderWhenSized);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animationFrame = requestAnimationFrame(renderWhenSized);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [hasRows]);

  const shouldRenderChart =
    hasRows && canRenderChart && chartSize.width > 0 && chartSize.height > 0;
  const chartHeight = Math.max(1, chartSize.height - 16);
  const chartWidth = Math.max(1, chartSize.width - 16);

  return (
    <article
      className={
        frame
          ? `data-panel flex min-h-full w-full min-w-0 flex-col p-5 ${isOperations ? "chart-panel-operations" : ""}`
          : `flex min-h-full w-full min-w-0 flex-col ${isOperations ? "chart-panel-operations" : ""}`
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className={
              isOperations
                ? "font-mono text-xs font-semibold uppercase tracking-normal text-muted"
                : "text-base font-semibold text-foreground"
            }
          >
            {title}
          </h3>
          <p
            className={
              isOperations
                ? "mt-1 text-xs leading-5 text-dim"
                : "mt-1 text-sm leading-6 text-muted"
            }
          >
            {subtitle}
          </p>
        </div>
        {!isOperations ? (
          <a
            className="hidden shrink-0 text-xs font-semibold text-accent no-underline hover:text-accent-strong sm:inline-flex"
            href={href}
          >
            Details{" "}
            <ChevronRight aria-hidden="true" className="ml-1 size-3.5" />
          </a>
        ) : null}
      </div>

      <div
        className={
          isOperations
            ? "mt-4 flex flex-wrap gap-x-5 gap-y-2 py-1"
            : "mt-4 flex flex-wrap gap-x-4 gap-y-2 border-y border-border py-3"
        }
      >
        {series.map((item) => (
          <span
            className={
              isOperations
                ? "inline-flex items-center gap-2 text-xs text-muted"
                : "inline-flex items-center gap-2 text-xs text-muted"
            }
            key={item.key}
          >
            <span
              className={isOperations ? "h-2.5 w-2.5" : "h-2 w-2 rounded-full"}
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </span>
        ))}
      </div>

      <figure className="mt-5 min-w-0 overflow-x-auto overscroll-x-contain pb-2">
        <div
          aria-label={`${title}: ${subtitle}`}
          className={
            isOperations
              ? "h-[20rem] min-h-[20rem] min-w-[42rem] rounded-md border border-border bg-background/35 p-2 sm:min-w-0 md:h-[22rem] md:min-h-[22rem]"
              : "h-64 min-h-64 min-w-[42rem] rounded-md border border-border bg-background/45 p-2 sm:min-w-0"
          }
          ref={chartRef}
          role="img"
        >
          {shouldRenderChart ? (
            <Chart
              data={rows}
              height={chartHeight}
              margin={chartMargin}
              width={chartWidth}
            >
              <CartesianGrid
                stroke="var(--border)"
                strokeDasharray={isOperations ? "2 4" : "3 3"}
                strokeOpacity={isOperations ? 0.48 : 0.72}
                vertical={false}
              />
              <XAxis
                axisLine={false}
                dataKey={xKey}
                minTickGap={26}
                stroke="var(--dim)"
                tick={axisTick}
                tickLine={false}
                tickMargin={10}
              />
              <YAxis
                axisLine={false}
                domain={percentAxis ? [0, 100] : undefined}
                stroke="var(--dim)"
                tick={axisTick}
                tickFormatter={(value) => formatAxisValue(value, percentAxis)}
                tickLine={false}
                tickMargin={8}
                width={46}
              />
              <Tooltip
                contentStyle={tooltipContentStyle}
                cursor={{
                  stroke: "var(--accent)",
                  strokeOpacity: 0.28,
                  strokeWidth: 1,
                }}
                formatter={(value) => formatTooltipValue(value, percentAxis)}
                labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
              />
              {annotation ? (
                <ReferenceLine
                  ifOverflow="extendDomain"
                  label={{
                    fill: "var(--accent)",
                    fontSize: 11,
                    position: "insideTopRight",
                    value: annotation.label,
                  }}
                  stroke="var(--accent)"
                  strokeDasharray="4 4"
                  strokeOpacity={0.72}
                  x={annotation.x}
                />
              ) : null}
              {series.map((item) =>
                isArea ? (
                  <Area
                    key={item.key}
                    connectNulls
                    dataKey={item.key}
                    fill={item.color}
                    fillOpacity={isOperations ? 0.78 : 0.16}
                    isAnimationActive={false}
                    name={item.label}
                    stackId={isStackedArea ? "blockspace" : undefined}
                    stroke={item.color}
                    strokeWidth={isOperations ? 1.5 : 2}
                    type="monotone"
                  />
                ) : (
                  <Line
                    key={item.key}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                    connectNulls
                    dataKey={item.key}
                    dot={false}
                    isAnimationActive={false}
                    name={item.label}
                    stroke={item.color}
                    strokeLinecap="round"
                    strokeWidth={2}
                    type="monotone"
                  />
                ),
              )}
            </Chart>
          ) : hasRows ? (
            <div className="h-full rounded-sm border border-dashed border-border bg-surface/35" />
          ) : (
            <div className="grid h-full place-items-center rounded-sm border border-dashed border-border bg-surface-2 p-6 text-center text-sm leading-6 text-muted">
              {emptyNote}
            </div>
          )}
        </div>
      </figure>

      {!isOperations ? (
        <>
          <p className="mt-4 text-sm font-medium leading-6 text-foreground">
            {interpretation}
          </p>
          <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-border pt-4">
            <p className="text-xs leading-5 text-dim">
              Source: {source} · Snapshot: {snapshotDate}
            </p>
            <a
              className="inline-flex items-center gap-2 text-xs font-semibold text-accent no-underline hover:text-accent-strong sm:hidden"
              href={href}
            >
              Details <ChevronRight aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        </>
      ) : null}
    </article>
  );
}
