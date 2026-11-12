import React, { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { MarketAsset, formatPrice } from '../data/marketsData';
import { Sparkline } from './Sparkline';

interface MarketTableProps {
  assets: MarketAsset[];
  selectedSymbol: string;
  onSelectAsset: (asset: MarketAsset) => void;
  onClearSearch?: () => void;
}

type SortKey = 'symbol' | 'price' | 'changePercent' | 'change';
type SortDir = 'asc' | 'desc';

export const MarketTable: React.FC<MarketTableProps> = ({
  assets,
  selectedSymbol,
  onSelectAsset,
  onClearSearch,
}) => {
  const [sortKey, setSortKey] = useState<SortKey>('changePercent');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'symbol' ? 'asc' : 'desc');
    }
  };

  const sortedAssets = useMemo(() => {
    return [...assets].sort((a, b) => {
      const mul = sortDir === 'asc' ? 1 : -1;
      if (sortKey === 'symbol') {
        return a.symbol.localeCompare(b.symbol) * mul;
      }
      return (a[sortKey] - b[sortKey]) * mul;
    });
  }, [assets, sortKey, sortDir]);

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) {
      return <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />;
    }
    return sortDir === 'asc' ? (
      <ArrowUp className="h-3.5 w-3.5 text-[#2962FF]" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-[#2962FF]" />
    );
  };

  if (assets.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white px-6 py-12 text-center dark:border-[#2A2E39] dark:bg-[#1E222D]">
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          No matching symbols found
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-[#787B86]">
          Try adjusting your search query or switching market categories.
        </p>
        {onClearSearch && (
          <button
            type="button"
            onClick={onClearSearch}
            className="mt-4 rounded-md bg-[#2962FF] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1E53E5]"
          >
            Clear search
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-[#2A2E39] dark:bg-[#1E222D]">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-medium text-slate-500 dark:border-[#2A2E39] dark:bg-[#131722]/60 dark:text-[#787B86]">
              <th className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => handleSort('symbol')}
                  className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white"
                >
                  Symbol
                  {renderSortIcon('symbol')}
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => handleSort('price')}
                  className="inline-flex items-center justify-end gap-1.5 hover:text-slate-900 dark:hover:text-white"
                >
                  Price
                  {renderSortIcon('price')}
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => handleSort('changePercent')}
                  className="inline-flex items-center justify-end gap-1.5 hover:text-slate-900 dark:hover:text-white"
                >
                  Change %
                  {renderSortIcon('changePercent')}
                </button>
              </th>
              <th className="hidden px-4 py-3 text-right sm:table-cell">
                <button
                  type="button"
                  onClick={() => handleSort('change')}
                  className="inline-flex items-center justify-end gap-1.5 hover:text-slate-900 dark:hover:text-white"
                >
                  Change
                  {renderSortIcon('change')}
                </button>
              </th>
              <th className="hidden px-4 py-3 text-right md:table-cell">Volume</th>
              <th className="hidden px-4 py-3 text-right lg:table-cell">Market Cap</th>
              <th className="hidden px-4 py-3 text-right md:table-cell">Analyst Rating</th>
              <th className="hidden px-4 py-3 text-right sm:table-cell">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm dark:divide-[#2A2E39]">
            {sortedAssets.map((asset) => {
              const isPos = asset.changePercent >= 0;
              const isSelected = asset.symbol === selectedSymbol;

              return (
                <tr
                  key={asset.symbol}
                  onClick={() => onSelectAsset(asset)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-50/70 dark:bg-[#2962FF]/10'
                      : 'hover:bg-slate-50 dark:hover:bg-[#2A2E39]/50'
                  }`}
                >
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 font-display text-[11px] font-bold text-slate-700 dark:bg-[#2A2E39] dark:text-[#D1D4DC]">
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {asset.symbol}
                          </span>
                          <span className="text-[11px] text-slate-400 dark:text-[#787B86]">
                            {asset.exchange}
                          </span>
                        </div>
                        <div className="truncate text-xs text-slate-500 dark:text-[#787B86]">
                          {asset.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="font-mono-num px-4 py-2.5 text-right font-medium text-slate-900 dark:text-white">
                    {formatPrice(asset.price, asset.currency)}
                  </td>

                  <td
                    className={`font-mono-num px-4 py-2.5 text-right font-medium ${
                      isPos ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPos ? '+' : ''}
                    {asset.changePercent.toFixed(2)}%
                  </td>

                  <td
                    className={`font-mono-num hidden px-4 py-2.5 text-right sm:table-cell ${
                      isPos ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPos ? '+' : ''}
                    {asset.change.toFixed(asset.price < 10 ? 4 : 2)}
                  </td>

                  <td className="font-mono-num hidden px-4 py-2.5 text-right text-slate-600 md:table-cell dark:text-[#B2B5BE]">
                    {asset.volume}
                  </td>

                  <td className="font-mono-num hidden px-4 py-2.5 text-right text-slate-600 lg:table-cell dark:text-[#B2B5BE]">
                    {asset.marketCap}
                  </td>

                  <td className="hidden px-4 py-2.5 text-right md:table-cell">
                    <span
                      className={`text-xs font-medium ${
                        asset.rating.includes('Buy')
                          ? 'text-[#089981]'
                          : asset.rating.includes('Sell')
                          ? 'text-[#F23645]'
                          : 'text-slate-500 dark:text-[#787B86]'
                      }`}
                    >
                      {asset.rating}
                    </span>
                  </td>

                  <td className="hidden px-4 py-2.5 sm:table-cell">
                    <div className="flex justify-end">
                      <Sparkline data={asset.sparkline} isPositive={isPos} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
