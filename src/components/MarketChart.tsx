import React, { useMemo, useState } from 'react';
import {
  MarketAsset,
  Timeframe,
  TIMEFRAMES,
  formatPrice,
  generateChartSeries,
} from '../data/marketsData';

interface MarketChartProps {
  asset: MarketAsset;
  timeframe: Timeframe;
  onTimeframeChange: (tf: Timeframe) => void;
}

export const MarketChart: React.FC<MarketChartProps> = ({
  asset,
  timeframe,
  onTimeframeChange,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const series = useMemo(
    () => generateChartSeries(asset, timeframe),
    [asset, timeframe]
  );

  const isPositive = asset.changePercent >= 0;
  const strokeColor = isPositive ? '#089981' : '#F23645';

  const width = 760;
  const height = 280;
  const padLeft = 12;
  const padRight = 68;
  const padTop = 18;
  const padBottom = 28;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const { minVal, maxVal, linePath, areaPath, coords } = useMemo(() => {
    const vals = series.map((p) => p.value);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min || 1;
    const paddedMin = min - range * 0.08;
    const paddedMax = max + range * 0.08;
    const paddedRange = paddedMax - paddedMin;

    const pts = series.map((p, i) => {
      const x = padLeft + (i / (series.length - 1)) * plotW;
      const y = padTop + plotH - ((p.value - paddedMin) / paddedRange) * plotH;
      return { x, y, ...p };
    });

    const line = pts
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`)
      .join(' ');

    const area = `${line} L ${pts[pts.length - 1].x.toFixed(1)} ${(
      padTop + plotH
    ).toFixed(1)} L ${pts[0].x.toFixed(1)} ${(padTop + plotH).toFixed(1)} Z`;

    return {
      minVal: paddedMin,
      maxVal: paddedMax,
      linePath: line,
      areaPath: area,
      coords: pts,
    };
  }, [series, plotW, plotH]);

  const activePoint = hoverIndex !== null ? coords[hoverIndex] : null;
  const displayPrice = activePoint ? activePoint.value : asset.price;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => {
    const val = maxVal - t * (maxVal - minVal);
    const y = padTop + t * plotH;
    return { val, y };
  });

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * width;
    const clampedX = Math.max(padLeft, Math.min(padLeft + plotW, relX));
    const idx = Math.round(((clampedX - padLeft) / plotW) * (coords.length - 1));
    setHoverIndex(Math.max(0, Math.min(coords.length - 1, idx)));
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-[#2A2E39] dark:bg-[#1E222D]">
      {/* Header Row */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4 dark:border-[#2A2E39]">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              {asset.symbol}
            </h2>
            <span className="text-sm text-slate-500 dark:text-[#787B86]">
              {asset.name}
            </span>
            <span className="text-xs font-medium text-slate-400 dark:text-[#787B86]">
              · {asset.exchange}
            </span>
          </div>

          <div className="mt-1.5 flex items-baseline gap-3">
            <span className="font-mono-num text-2xl font-semibold text-slate-900 dark:text-white">
              {formatPrice(displayPrice, asset.currency)}
            </span>
            <span
              className={`font-mono-num text-sm font-medium ${
                isPositive ? 'text-[#089981]' : 'text-[#F23645]'
              }`}
            >
              {isPositive ? '+' : ''}
              {asset.change.toFixed(asset.price < 10 ? 4 : 2)} ({isPositive ? '+' : ''}
              {asset.changePercent.toFixed(2)}%)
            </span>
            {activePoint && (
              <span className="text-xs text-slate-400 dark:text-[#787B86]">
                {activePoint.label}
              </span>
            )}
          </div>
        </div>

        {/* Timeframe Segmented Control */}
        <div className="flex items-center gap-1 rounded-md bg-slate-100 p-1 dark:bg-[#131722]">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => onTimeframeChange(tf)}
              className={`whitespace-nowrap shrink-0 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                timeframe === tf
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-[#2A2E39] dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-[#787B86] dark:hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative mt-4 w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full select-none overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id={`grad-${asset.symbol}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.22" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid Lines & Y-Axis Labels */}
          {yTicks.map((tick, idx) => (
            <g key={idx}>
              <line
                x1={padLeft}
                y1={tick.y}
                x2={padLeft + plotW}
                y2={tick.y}
                stroke="currentColor"
                className="text-slate-100 dark:text-[#2A2E39]"
                strokeWidth="1"
              />
              <text
                x={padLeft + plotW + 8}
                y={tick.y + 4}
                className="fill-slate-400 font-mono-num text-[11px] dark:fill-[#787B86]"
              >
                {formatPrice(tick.val, asset.currency)}
              </text>
            </g>
          ))}

          {/* Area & Line */}
          <path d={areaPath} fill={`url(#grad-${asset.symbol})`} />
          <path
            d={linePath}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* X-Axis Labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((t, idx) => {
            const ptIdx = Math.min(
              coords.length - 1,
              Math.round(t * (coords.length - 1))
            );
            const pt = coords[ptIdx];
            return (
              <text
                key={idx}
                x={pt.x}
                y={height - 6}
                textAnchor={idx === 0 ? 'start' : idx === 4 ? 'end' : 'middle'}
                className="fill-slate-400 text-[11px] dark:fill-[#787B86]"
              >
                {pt.label}
              </text>
            );
          })}

          {/* Hover Crosshair */}
          {activePoint && (
            <g>
              <line
                x1={activePoint.x}
                y1={padTop}
                x2={activePoint.x}
                y2={padTop + plotH}
                stroke="currentColor"
                className="text-slate-300 dark:text-[#434651]"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <line
                x1={padLeft}
                y1={activePoint.y}
                x2={padLeft + plotW}
                y2={activePoint.y}
                stroke="currentColor"
                className="text-slate-300 dark:text-[#434651]"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="4.5"
                fill={strokeColor}
                stroke="#ffffff"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Key OHLC Stats Row */}
      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-5 dark:border-[#2A2E39]">
        <div>
          <div className="text-xs text-slate-500 dark:text-[#787B86]">Open</div>
          <div className="font-mono-num mt-0.5 text-sm font-medium text-slate-900 dark:text-white">
            {formatPrice(asset.open, asset.currency)}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 dark:text-[#787B86]">High</div>
          <div className="font-mono-num mt-0.5 text-sm font-medium text-slate-900 dark:text-white">
            {formatPrice(asset.high, asset.currency)}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 dark:text-[#787B86]">Low</div>
          <div className="font-mono-num mt-0.5 text-sm font-medium text-slate-900 dark:text-white">
            {formatPrice(asset.low, asset.currency)}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 dark:text-[#787B86]">Prev Close</div>
          <div className="font-mono-num mt-0.5 text-sm font-medium text-slate-900 dark:text-white">
            {formatPrice(asset.prevClose, asset.currency)}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 dark:text-[#787B86]">Volume</div>
          <div className="font-mono-num mt-0.5 text-sm font-medium text-slate-900 dark:text-white">
            {asset.volume}
          </div>
        </div>
      </div>
    </div>
  );
};
