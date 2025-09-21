export interface Asset {
  id: string;
  name: string;
  symbol: string;
  type: 'ETF' | 'Stock';
  sector: string;
  description: string;
  peaEligible: boolean;
  price: number;
  performance1Y: number;
  performance5Y: number;
  volatility: number;
  dividendYield: number;
  fees: number;
  esgRating: string;
  morningstarRating: number;
  historicalPrices: Array<{ date: string; price: number }>;
  provider?: string;
  risk: 'low' | 'medium' | 'high';
}