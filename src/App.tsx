import React, { useEffect, useMemo, useState } from 'react';
import { Moon, Search, Sun, TrendingDown, TrendingUp } from 'lucide-react';
import {
  MARKET_ASSETS,
  MARKET_CATEGORIES,
  MarketAsset,
  MarketCategory,
  Timeframe,
  formatPrice,
} from './data/marketsData';
import { MarketChart } from './components/MarketChart';
import { MarketTable } from './components/MarketTable';
import { SectorHeatmap } from './components/SectorHeatmap';
import { Sparkline } from './components/Sparkline';

const FEATURED_SYMBOLS = ['SPX', 'NDX', 'DJI', 'BTCUSD', 'EURUSD', 'GC1!'];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeCategory, setActiveCategory] = useState<MarketCategory>('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('SPX');
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [moverTab, setMoverTab] = useState<'gainers' | 'losers'>('gainers');

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const selectedAsset = useMemo(
    () =>
      MARKET_ASSETS.find((a) => a.symbol === selectedSymbol) ?? MARKET_ASSETS[0],
    [selectedSymbol]
  );

  const featuredAssets = useMemo(
    () =>
      FEATURED_SYMBOLS.map((sym) =>
        MARKET_ASSETS.find((a) => a.symbol === sym)
      ).filter((a): a is MarketAsset => Boolean(a)),
    []
  );

  const filteredAssets = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MARKET_ASSETS.filter((asset) => {
      const matchesCategory =
        activeCategory === 'Overview' || asset.category === activeCategory;
      const matchesQuery =
        !q ||
        asset.symbol.toLowerCase().includes(q) ||
        asset.name.toLowerCase().includes(q) ||
        asset.exchange.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const topMovers = useMemo(() => {
    const sorted = [...MARKET_ASSETS].sort((a, b) =>
      moverTab === 'gainers'
        ? b.changePercent - a.changePercent
        : a.changePercent - b.changePercent
    );
    return sorted.slice(0, 5);
  }, [moverTab]);

  const handleSelectAsset = (asset: MarketAsset) => {
    setSelectedSymbol(asset.symbol);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-[#131722] dark:text-[#D1D4DC]">
      {/* Top Navigation Bar (3-zone contract) */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xs dark:border-[#2A2E39] dark:bg-[#131722]/95">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-8 px-4 py-3 sm:px-6">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#markets"
            className="font-display flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 dark:text-white"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
            >
              <path
                d="M2 8h8v14H2V8zm10 6h6v8h-6v-8zm8-8h6v16h-6V6z"
                fill="currentColor"
              />
            </svg>
            TradingView
          </a>

          {/* Zone 2: Primary Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-[#B2B5BE]">
            <a
              href="#products"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              Products
            </a>
            <a
              href="#community"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              Community
            </a>
            <a
              href="#markets"
              className="whitespace-nowrap shrink-0 font-semibold text-[#2962FF]"
            >
              Markets
            </a>
            <a
              href="#news"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              News
            </a>
            <a
              href="#brokers"
              className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              Brokers
            </a>
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('screener-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="whitespace-nowrap shrink-0 rounded-md bg-[#2962FF] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1E53E5]"
            >
              Get started
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
        {/* Markets Header & Workspace Toolbar */}
        <section className="flex flex-col gap-4 border-b border-slate-200 pb-5 dark:border-[#2A2E39]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                Markets
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-[#787B86]">
                Global indices, equities, crypto, forex, futures, and sovereign yields
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Live Search */}
              <div className="relative w-64 sm:w-72">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search symbol or company..."
                  className="w-full rounded-md border border-slate-200 bg-white py-2 pr-3 pl-9 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#2962FF] focus:outline-none dark:border-[#2A2E39] dark:bg-[#1E222D] dark:text-white dark:placeholder:text-[#787B86]"
                />
              </div>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={() => setDarkMode((prev) => !prev)}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition-colors hover:text-slate-900 dark:border-[#2A2E39] dark:bg-[#1E222D] dark:text-[#B2B5BE] dark:hover:text-white"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
            {MARKET_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap shrink-0 rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#2962FF] text-white'
                      : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 dark:text-[#B2B5BE] dark:hover:bg-[#2A2E39] dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* Major Indices & Featured Strip */}
        <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {featuredAssets.map((asset) => {
            const isPos = asset.changePercent >= 0;
            const isSelected = asset.symbol === selectedSymbol;
            return (
              <button
                key={asset.symbol}
                type="button"
                onClick={() => handleSelectAsset(asset)}
                className={`flex flex-col justify-between rounded-lg border p-3.5 text-left transition-colors ${
                  isSelected
                    ? 'border-[#2962FF] bg-white dark:bg-[#1E222D]'
                    : 'border-slate-200 bg-white hover:border-slate-300 dark:border-[#2A2E39] dark:bg-[#1E222D] dark:hover:border-[#434651]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {asset.symbol}
                  </span>
                  <Sparkline
                    data={asset.sparkline}
                    isPositive={isPos}
                    width={46}
                    height={18}
                  />
                </div>
                <div className="mt-2">
                  <div className="font-mono-num text-sm font-semibold text-slate-900 dark:text-white">
                    {formatPrice(asset.price, asset.currency)}
                  </div>
                  <div
                    className={`font-mono-num mt-0.5 text-xs font-medium ${
                      isPos ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPos ? '+' : ''}
                    {asset.changePercent.toFixed(2)}%
                  </div>
                </div>
              </button>
            );
          })}
        </section>

        {/* Main Chart + Market Movers Grid */}
        <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <MarketChart
              asset={selectedAsset}
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
            />
          </div>

          {/* Market Movers Panel */}
          <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-5 lg:col-span-4 dark:border-[#2A2E39] dark:bg-[#1E222D]">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-[#2A2E39]">
              <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                Market Movers
              </h3>
              <div className="flex items-center gap-1 rounded-md bg-slate-100 p-0.5 dark:bg-[#131722]">
                <button
                  type="button"
                  onClick={() => setMoverTab('gainers')}
                  className={`inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                    moverTab === 'gainers'
                      ? 'bg-white text-[#089981] shadow-xs dark:bg-[#2A2E39]'
                      : 'text-slate-500 hover:text-slate-900 dark:text-[#787B86] dark:hover:text-white'
                  }`}
                >
                  <TrendingUp className="h-3.5 w-3.5" />
                  Gainers
                </button>
                <button
                  type="button"
                  onClick={() => setMoverTab('losers')}
                  className={`inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                    moverTab === 'losers'
                      ? 'bg-white text-[#F23645] shadow-xs dark:bg-[#2A2E39]'
                      : 'text-slate-500 hover:text-slate-900 dark:text-[#787B86] dark:hover:text-white'
                  }`}
                >
                  <TrendingDown className="h-3.5 w-3.5" />
                  Losers
                </button>
              </div>
            </div>

            <div className="mt-3 flex flex-1 flex-col divide-y divide-slate-100 dark:divide-[#2A2E39]">
              {topMovers.map((asset) => {
                const isPos = asset.changePercent >= 0;
                return (
                  <button
                    key={asset.symbol}
                    type="button"
                    onClick={() => handleSelectAsset(asset)}
                    className="flex items-center justify-between gap-3 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-[#2A2E39]/40"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {asset.symbol}
                      </div>
                      <div className="truncate text-xs text-slate-500 dark:text-[#787B86]">
                        {asset.name}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <Sparkline
                        data={asset.sparkline}
                        isPositive={isPos}
                        width={52}
                        height={20}
                      />
                      <div className="text-right">
                        <div className="font-mono-num text-sm font-medium text-slate-900 dark:text-white">
                          {formatPrice(asset.price, asset.currency)}
                        </div>
                        <div
                          className={`font-mono-num text-xs font-medium ${
                            isPos ? 'text-[#089981]' : 'text-[#F23645]'
                          }`}
                        >
                          {isPos ? '+' : ''}
                          {asset.changePercent.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sector Heatmap */}
        {(activeCategory === 'Overview' || activeCategory === 'Stocks') && (
          <section className="mt-5">
            <SectorHeatmap onSelectSymbol={(sym) => setSelectedSymbol(sym)} />
          </section>
        )}

        {/* Screener Data Table */}
        <section id="screener-section" className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
              {activeCategory === 'Overview'
                ? 'All Markets Screener'
                : `${activeCategory} Screener`}
            </h2>
            <span className="text-xs text-slate-500 dark:text-[#787B86]">
              {filteredAssets.length}{' '}
              {filteredAssets.length === 1 ? 'instrument' : 'instruments'}
            </span>
          </div>

          <MarketTable
            assets={filteredAssets}
            selectedSymbol={selectedSymbol}
            onSelectAsset={handleSelectAsset}
            onClearSearch={() => setSearchQuery('')}
          />
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-8 dark:border-[#2A2E39] dark:bg-[#131722]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-4 text-xs text-slate-500 sm:px-6 dark:text-[#787B86]">
          <div className="flex items-center gap-4">
            <span className="font-display font-semibold text-slate-900 dark:text-white">
              TradingView
            </span>
            <span>© 2026 TradingView Markets</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#products" className="hover:text-slate-900 dark:hover:text-white">
              Products
            </a>
            <a href="#community" className="hover:text-slate-900 dark:hover:text-white">
              Community
            </a>
            <a href="#markets" className="hover:text-slate-900 dark:hover:text-white">
              Markets
            </a>
            <a href="#brokers" className="hover:text-slate-900 dark:hover:text-white">
              Brokers
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
