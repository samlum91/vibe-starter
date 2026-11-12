export type MarketCategory =
  | 'Overview'
  | 'Stocks'
  | 'Crypto'
  | 'Forex'
  | 'Indices'
  | 'Futures'
  | 'Bonds';

export type Timeframe = '1D' | '1W' | '1M' | '1Y' | 'All';

export type Rating = 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';

export interface MarketAsset {
  symbol: string;
  name: string;
  category: Exclude<MarketCategory, 'Overview'>;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  peRatio?: number | null;
  rating: Rating;
  open: number;
  high: number;
  low: number;
  prevClose: number;
  sparkline: number[];
  currency?: string;
}

export interface SectorItem {
  name: string;
  changePercent: number;
  marketCapShare: number;
  topStock: string;
  topStockChange: number;
}

export const MARKET_CATEGORIES: MarketCategory[] = [
  'Overview',
  'Stocks',
  'Crypto',
  'Forex',
  'Indices',
  'Futures',
  'Bonds',
];

export const TIMEFRAMES: Timeframe[] = ['1D', '1W', '1M', '1Y', 'All'];

export const MARKET_ASSETS: MarketAsset[] = [
  // Indices
  {
    symbol: 'SPX',
    name: 'S&P 500 Index',
    category: 'Indices',
    exchange: 'SP',
    price: 5985.42,
    change: 34.18,
    changePercent: 0.57,
    volume: '2.41B',
    marketCap: '—',
    rating: 'Buy',
    open: 5958.1,
    high: 5994.8,
    low: 5951.2,
    prevClose: 5951.24,
    sparkline: [5940, 5948, 5944, 5955, 5962, 5959, 5971, 5978, 5985.42],
  },
  {
    symbol: 'NDX',
    name: 'Nasdaq 100 Index',
    category: 'Indices',
    exchange: 'NASDAQ',
    price: 21042.15,
    change: 186.4,
    changePercent: 0.89,
    volume: '1.18B',
    marketCap: '—',
    rating: 'Strong Buy',
    open: 20890.0,
    high: 21088.5,
    low: 20875.2,
    prevClose: 20855.75,
    sparkline: [20840, 20865, 20890, 20915, 20940, 20975, 21010, 21025, 21042.15],
  },
  {
    symbol: 'DJI',
    name: 'Dow Jones Industrial Average',
    category: 'Indices',
    exchange: 'DJ',
    price: 43912.6,
    change: -48.25,
    changePercent: -0.11,
    volume: '412M',
    marketCap: '—',
    rating: 'Neutral',
    open: 43965.0,
    high: 44012.3,
    low: 43850.1,
    prevClose: 43960.85,
    sparkline: [43980, 43995, 43970, 43940, 43925, 43910, 43890, 43905, 43912.6],
  },
  {
    symbol: 'RUT',
    name: 'Russell 2000 Index',
    category: 'Indices',
    exchange: 'TVC',
    price: 2368.9,
    change: 22.14,
    changePercent: 0.94,
    volume: '680M',
    marketCap: '—',
    rating: 'Buy',
    open: 2348.5,
    high: 2374.1,
    low: 2345.0,
    prevClose: 2346.76,
    sparkline: [2342, 2348, 2351, 2355, 2360, 2358, 2364, 2367, 2368.9],
  },
  {
    symbol: 'DAX',
    name: 'DAX Performance Index',
    category: 'Indices',
    exchange: 'XETR',
    price: 19418.3,
    change: 112.7,
    changePercent: 0.58,
    volume: '88.4M',
    marketCap: '—',
    rating: 'Buy',
    open: 19320.0,
    high: 19445.0,
    low: 19305.4,
    prevClose: 19305.6,
    sparkline: [19300, 19325, 19340, 19355, 19370, 19390, 19402, 19410, 19418.3],
  },
  {
    symbol: 'NKY',
    name: 'Nikkei 225',
    category: 'Indices',
    exchange: 'TVC',
    price: 39180.5,
    change: -145.2,
    changePercent: -0.37,
    volume: '1.04B',
    marketCap: '—',
    rating: 'Neutral',
    open: 39310.0,
    high: 39345.0,
    low: 39120.0,
    prevClose: 39325.7,
    sparkline: [39330, 39310, 39280, 39250, 39220, 39200, 39195, 39175, 39180.5],
  },

  // Stocks
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    category: 'Stocks',
    exchange: 'NASDAQ',
    price: 147.82,
    change: 4.16,
    changePercent: 2.9,
    volume: '248.4M',
    marketCap: '$3.62T',
    peRatio: 54.2,
    rating: 'Strong Buy',
    open: 144.1,
    high: 148.65,
    low: 143.8,
    prevClose: 143.66,
    sparkline: [143.2, 144.0, 144.8, 145.1, 146.0, 146.5, 147.1, 147.4, 147.82],
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    category: 'Stocks',
    exchange: 'NASDAQ',
    price: 229.45,
    change: 1.85,
    changePercent: 0.81,
    volume: '42.1M',
    marketCap: '$3.48T',
    peRatio: 34.8,
    rating: 'Buy',
    open: 227.9,
    high: 230.1,
    low: 227.4,
    prevClose: 227.6,
    sparkline: [227.4, 227.8, 228.1, 228.0, 228.5, 228.9, 229.1, 229.3, 229.45],
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    category: 'Stocks',
    exchange: 'NASDAQ',
    price: 428.14,
    change: 3.92,
    changePercent: 0.92,
    volume: '19.8M',
    marketCap: '$3.18T',
    peRatio: 35.4,
    rating: 'Strong Buy',
    open: 425.0,
    high: 429.2,
    low: 424.3,
    prevClose: 424.22,
    sparkline: [424.0, 424.8, 425.5, 426.1, 426.8, 427.0, 427.5, 427.9, 428.14],
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    category: 'Stocks',
    exchange: 'NASDAQ',
    price: 211.68,
    change: 5.04,
    changePercent: 2.44,
    volume: '38.7M',
    marketCap: '$2.22T',
    peRatio: 44.1,
    rating: 'Strong Buy',
    open: 207.2,
    high: 212.4,
    low: 206.9,
    prevClose: 206.64,
    sparkline: [206.8, 207.5, 208.3, 209.1, 209.8, 210.2, 210.9, 211.3, 211.68],
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    category: 'Stocks',
    exchange: 'NASDAQ',
    price: 181.34,
    change: -1.12,
    changePercent: -0.61,
    volume: '21.3M',
    marketCap: '$2.23T',
    peRatio: 23.9,
    rating: 'Buy',
    open: 182.6,
    high: 183.1,
    low: 180.85,
    prevClose: 182.46,
    sparkline: [182.6, 182.4, 182.1, 181.9, 181.7, 181.5, 181.2, 181.4, 181.34],
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    category: 'Stocks',
    exchange: 'NASDAQ',
    price: 591.2,
    change: 8.45,
    changePercent: 1.45,
    volume: '14.2M',
    marketCap: '$1.49T',
    peRatio: 27.6,
    rating: 'Buy',
    open: 583.5,
    high: 593.0,
    low: 582.1,
    prevClose: 582.75,
    sparkline: [582.8, 584.1, 585.5, 586.9, 588.0, 589.2, 590.1, 590.8, 591.2],
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    category: 'Stocks',
    exchange: 'NASDAQ',
    price: 342.18,
    change: -9.62,
    changePercent: -2.73,
    volume: '96.5M',
    marketCap: '$1.09T',
    peRatio: 91.2,
    rating: 'Neutral',
    open: 350.4,
    high: 352.1,
    low: 339.8,
    prevClose: 351.8,
    sparkline: [351.5, 350.2, 348.9, 347.1, 345.6, 344.2, 343.0, 342.5, 342.18],
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    category: 'Stocks',
    exchange: 'NYSE',
    price: 241.55,
    change: 1.92,
    changePercent: 0.8,
    volume: '8.9M',
    marketCap: '$682B',
    peRatio: 13.4,
    rating: 'Buy',
    open: 239.8,
    high: 242.1,
    low: 239.2,
    prevClose: 239.63,
    sparkline: [239.5, 239.9, 240.3, 240.6, 240.9, 241.1, 241.3, 241.4, 241.55],
  },
  {
    symbol: 'XOM',
    name: 'Exxon Mobil Corporation',
    category: 'Stocks',
    exchange: 'NYSE',
    price: 118.42,
    change: -1.84,
    changePercent: -1.53,
    volume: '15.6M',
    marketCap: '$524B',
    peRatio: 14.2,
    rating: 'Sell',
    open: 120.1,
    high: 120.45,
    low: 118.1,
    prevClose: 120.26,
    sparkline: [120.2, 119.9, 119.6, 119.3, 119.0, 118.8, 118.6, 118.5, 118.42],
  },

  // Crypto
  {
    symbol: 'BTCUSD',
    name: 'Bitcoin / U.S. Dollar',
    category: 'Crypto',
    exchange: 'CRYPTO',
    price: 89420.0,
    change: 3180.5,
    changePercent: 3.69,
    volume: '$54.2B',
    marketCap: '$1.77T',
    rating: 'Strong Buy',
    open: 86240.0,
    high: 90150.0,
    low: 85980.0,
    prevClose: 86239.5,
    sparkline: [86100, 86500, 87100, 87400, 88000, 88500, 88900, 89200, 89420],
  },
  {
    symbol: 'ETHUSD',
    name: 'Ethereum / U.S. Dollar',
    category: 'Crypto',
    exchange: 'CRYPTO',
    price: 3284.5,
    change: 94.2,
    changePercent: 2.95,
    volume: '$24.8B',
    marketCap: '$395B',
    rating: 'Buy',
    open: 3190.3,
    high: 3315.0,
    low: 3175.0,
    prevClose: 3190.3,
    sparkline: [3185, 3198, 3210, 3225, 3240, 3255, 3268, 3276, 3284.5],
  },
  {
    symbol: 'SOLUSD',
    name: 'Solana / U.S. Dollar',
    category: 'Crypto',
    exchange: 'CRYPTO',
    price: 214.8,
    change: 11.4,
    changePercent: 5.6,
    volume: '$7.9B',
    marketCap: '$101B',
    rating: 'Strong Buy',
    open: 203.4,
    high: 217.2,
    low: 201.9,
    prevClose: 203.4,
    sparkline: [203, 205, 207, 208.5, 210, 211.8, 213, 214.1, 214.8],
  },
  {
    symbol: 'XRPUSD',
    name: 'XRP / U.S. Dollar',
    category: 'Crypto',
    exchange: 'CRYPTO',
    price: 0.684,
    change: -0.018,
    changePercent: -2.56,
    volume: '$2.4B',
    marketCap: '$38.9B',
    rating: 'Neutral',
    open: 0.702,
    high: 0.708,
    low: 0.678,
    prevClose: 0.702,
    sparkline: [0.702, 0.699, 0.696, 0.694, 0.691, 0.689, 0.687, 0.685, 0.684],
  },

  // Forex
  {
    symbol: 'EURUSD',
    name: 'Euro / U.S. Dollar',
    category: 'Forex',
    exchange: 'FX',
    price: 1.0618,
    change: -0.0034,
    changePercent: -0.32,
    volume: '142K',
    marketCap: '—',
    rating: 'Sell',
    open: 1.0652,
    high: 1.0664,
    low: 1.0609,
    prevClose: 1.0652,
    sparkline: [1.0652, 1.0648, 1.0642, 1.0637, 1.0632, 1.0628, 1.0624, 1.0621, 1.0618],
  },
  {
    symbol: 'GBPUSD',
    name: 'British Pound / U.S. Dollar',
    category: 'Forex',
    exchange: 'FX',
    price: 1.2742,
    change: -0.0021,
    changePercent: -0.16,
    volume: '98K',
    marketCap: '—',
    rating: 'Neutral',
    open: 1.2763,
    high: 1.2775,
    low: 1.2731,
    prevClose: 1.2763,
    sparkline: [1.2763, 1.276, 1.2756, 1.2752, 1.2749, 1.2747, 1.2745, 1.2743, 1.2742],
  },
  {
    symbol: 'USDJPY',
    name: 'U.S. Dollar / Japanese Yen',
    category: 'Forex',
    exchange: 'FX',
    price: 154.62,
    change: 0.84,
    changePercent: 0.55,
    volume: '164K',
    marketCap: '—',
    rating: 'Buy',
    open: 153.78,
    high: 154.88,
    low: 153.65,
    prevClose: 153.78,
    sparkline: [153.78, 153.9, 154.05, 154.18, 154.3, 154.42, 154.5, 154.58, 154.62],
  },

  // Futures
  {
    symbol: 'GC1!',
    name: 'Gold Futures',
    category: 'Futures',
    exchange: 'COMEX',
    price: 2618.4,
    change: -14.8,
    changePercent: -0.56,
    volume: '184K',
    marketCap: '—',
    rating: 'Neutral',
    open: 2633.2,
    high: 2638.5,
    low: 2612.0,
    prevClose: 2633.2,
    sparkline: [2633, 2630, 2628, 2626, 2624, 2622, 2620, 2619, 2618.4],
  },
  {
    symbol: 'CL1!',
    name: 'WTI Crude Oil Futures',
    category: 'Futures',
    exchange: 'NYMEX',
    price: 68.14,
    change: -1.18,
    changePercent: -1.7,
    volume: '312K',
    marketCap: '—',
    rating: 'Sell',
    open: 69.32,
    high: 69.55,
    low: 67.92,
    prevClose: 69.32,
    sparkline: [69.3, 69.1, 68.9, 68.7, 68.55, 68.4, 68.25, 68.18, 68.14],
  },

  // Bonds
  {
    symbol: 'US10Y',
    name: 'U.S. 10-Year Treasury Yield',
    category: 'Bonds',
    exchange: 'TVC',
    price: 4.428,
    change: 0.052,
    changePercent: 1.19,
    volume: '—',
    marketCap: '—',
    rating: 'Buy',
    open: 4.376,
    high: 4.442,
    low: 4.369,
    prevClose: 4.376,
    sparkline: [4.376, 4.384, 4.392, 4.401, 4.408, 4.415, 4.42, 4.425, 4.428],
    currency: '%',
  },
  {
    symbol: 'US02Y',
    name: 'U.S. 2-Year Treasury Yield',
    category: 'Bonds',
    exchange: 'TVC',
    price: 4.312,
    change: 0.038,
    changePercent: 0.89,
    volume: '—',
    marketCap: '—',
    rating: 'Buy',
    open: 4.274,
    high: 4.325,
    low: 4.268,
    prevClose: 4.274,
    sparkline: [4.274, 4.28, 4.286, 4.292, 4.298, 4.302, 4.306, 4.31, 4.312],
    currency: '%',
  },
];

export const SECTOR_HEATMAP: SectorItem[] = [
  { name: 'Technology', changePercent: 1.64, marketCapShare: 32, topStock: 'NVDA', topStockChange: 2.9 },
  { name: 'Financials', changePercent: 0.82, marketCapShare: 14, topStock: 'JPM', topStockChange: 0.8 },
  { name: 'Consumer Cyclical', changePercent: 1.15, marketCapShare: 12, topStock: 'AMZN', topStockChange: 2.44 },
  { name: 'Communication', changePercent: 0.48, marketCapShare: 10, topStock: 'META', topStockChange: 1.45 },
  { name: 'Healthcare', changePercent: -0.34, marketCapShare: 12, topStock: 'UNH', topStockChange: -0.45 },
  { name: 'Industrials', changePercent: 0.29, marketCapShare: 9, topStock: 'CAT', topStockChange: 0.62 },
  { name: 'Energy', changePercent: -1.42, marketCapShare: 6, topStock: 'XOM', topStockChange: -1.53 },
  { name: 'Utilities', changePercent: -0.68, marketCapShare: 5, topStock: 'NEE', topStockChange: -0.71 },
];

export interface ChartPoint {
  label: string;
  value: number;
}

export function generateChartSeries(asset: MarketAsset, timeframe: Timeframe): ChartPoint[] {
  const count = timeframe === '1D' ? 32 : timeframe === '1W' ? 28 : timeframe === '1M' ? 30 : 36;
  const seed = asset.symbol.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const volatility =
    timeframe === '1D'
      ? 0.004
      : timeframe === '1W'
      ? 0.012
      : timeframe === '1M'
      ? 0.025
      : timeframe === '1Y'
      ? 0.075
      : 0.14;

  const endPrice = asset.price;
  const startPrice =
    timeframe === '1D'
      ? asset.prevClose
      : endPrice / (1 + (asset.changePercent >= 0 ? 1 : -1) * volatility * 0.8);

  const points: ChartPoint[] = [];
  for (let i = 0; i < count; i++) {
    const progress = i / (count - 1);
    const wave =
      Math.sin((i + seed) * 0.65) * 0.45 +
      Math.cos((i * 1.3 + seed) * 0.35) * 0.35 +
      Math.sin(i * 2.1 + seed) * 0.2;
    const base = startPrice + (endPrice - startPrice) * progress;
    const envelope = Math.sin(progress * Math.PI);
    const value = i === count - 1 ? endPrice : base * (1 + wave * volatility * 0.35 * envelope);

    let label = '';
    if (timeframe === '1D') {
      const hour = 9 + Math.floor((i / count) * 7);
      const min = Math.floor(((i / count) * 7 * 60) % 60);
      label = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
    } else if (timeframe === '1W') {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      label = days[Math.floor((i / count) * 7) % 7];
    } else if (timeframe === '1M') {
      label = `Day ${i + 1}`;
    } else if (timeframe === '1Y') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      label = months[Math.floor((i / count) * 12) % 12];
    } else {
      label = `${2021 + Math.floor((i / count) * 5)}`;
    }

    points.push({ label, value: Number(value.toFixed(asset.price < 10 ? 4 : 2)) });
  }
  return points;
}

export function formatPrice(price: number, currency?: string): string {
  if (currency === '%') {
    return `${price.toFixed(3)}%`;
  }
  if (price < 2) {
    return price.toFixed(4);
  }
  if (price >= 1000) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return price.toFixed(2);
}
