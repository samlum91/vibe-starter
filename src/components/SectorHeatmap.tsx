import React from 'react';
import { SECTOR_HEATMAP } from '../data/marketsData';

interface SectorHeatmapProps {
  onSelectSymbol: (symbol: string) => void;
}

export const SectorHeatmap: React.FC<SectorHeatmapProps> = ({ onSelectSymbol }) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-[#2A2E39] dark:bg-[#1E222D]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
            Sector Performance
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-[#787B86]">
            U.S. equities 1-day performance by market cap weight
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {SECTOR_HEATMAP.map((sector) => {
          const isPos = sector.changePercent >= 0;
          const intensity = Math.min(Math.abs(sector.changePercent) / 2, 1);
          const bgStyle = isPos
            ? `rgba(8, 153, 129, ${0.12 + intensity * 0.22})`
            : `rgba(242, 54, 69, ${0.12 + intensity * 0.22})`;

          return (
            <button
              key={sector.name}
              type="button"
              onClick={() => onSelectSymbol(sector.topStock)}
              style={{ backgroundColor: bgStyle }}
              className="group flex flex-col justify-between rounded-md border border-slate-200/70 p-3 text-left transition-transform duration-150 hover:-translate-y-0.5 dark:border-[#2A2E39]"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  {sector.name}
                </span>
                <span
                  className={`font-mono-num text-xs font-semibold ${
                    isPos ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                >
                  {isPos ? '+' : ''}
                  {sector.changePercent.toFixed(2)}%
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600 dark:text-[#B2B5BE]">
                <span>Leader: {sector.topStock}</span>
                <span className="font-mono-num">
                  {sector.topStockChange >= 0 ? '+' : ''}
                  {sector.topStockChange.toFixed(2)}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
