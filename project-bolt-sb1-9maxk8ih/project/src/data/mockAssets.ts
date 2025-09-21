import { Asset } from '../types/assets';

// Génération de données historiques simulées
const generateHistoricalData = (startPrice: number, volatility: number, months: number) => {
  const data = [];
  let currentPrice = startPrice;
  
  for (let i = months; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    
    // Simulation de variation de prix
    const variation = (Math.random() - 0.5) * volatility * 0.1;
    currentPrice = Math.max(currentPrice * (1 + variation), 0.1);
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(currentPrice * 100) / 100
    });
  }
  
  return data;
};

export const mockAssets: Asset[] = [
  {
    id: 'etf001',
    name: 'MSCI World UCITS ETF',
    symbol: 'CW8',
    type: 'ETF',
    sector: 'Mondial diversifié',
    description: 'ETF répliquant l\'indice MSCI World, exposant aux marchés développés mondiaux. Parfait pour une diversification internationale.',
    peaEligible: true,
    price: 85.42,
    performance1Y: 12.4,
    performance5Y: 8.7,
    volatility: 16.2,
    dividendYield: 2.1,
    fees: 0.20,
    esgRating: 'AA',
    morningstarRating: 4,
    provider: 'iShares',
    risk: 'medium',
    historicalPrices: generateHistoricalData(75, 16.2, 36)
  },
  {
    id: 'etf002',
    name: 'STOXX Europe 600 UCITS ETF',
    symbol: 'EXXT',
    type: 'ETF',
    sector: 'Europe diversifié',
    description: 'ETF exposant aux 600 plus grandes entreprises européennes. Idéal pour investir dans l\'économie européenne.',
    peaEligible: true,
    price: 52.18,
    performance1Y: 8.9,
    performance5Y: 6.2,
    volatility: 18.1,
    dividendYield: 2.8,
    fees: 0.07,
    esgRating: 'A',
    morningstarRating: 5,
    provider: 'Xtrackers',
    risk: 'medium',
    historicalPrices: generateHistoricalData(45, 18.1, 36)
  },
  {
    id: 'stock001',
    name: 'LVMH',
    symbol: 'MC.PA',
    type: 'Stock',
    sector: 'Luxe',
    description: 'Leader mondial du luxe avec des marques iconiques comme Louis Vuitton, Moët & Chandon, et Hennessy.',
    peaEligible: true,
    price: 678.90,
    performance1Y: -8.5,
    performance5Y: 12.3,
    volatility: 25.4,
    dividendYield: 2.4,
    fees: 0,
    esgRating: 'B',
    morningstarRating: 4,
    risk: 'high',
    historicalPrices: generateHistoricalData(620, 25.4, 36)
  },
  {
    id: 'etf003',
    name: 'CAC 40 UCITS ETF',
    symbol: 'C40',
    type: 'ETF',
    sector: 'France',
    description: 'ETF répliquant l\'indice CAC 40, composé des 40 plus grandes capitalisations françaises.',
    peaEligible: true,
    price: 64.75,
    performance1Y: 5.2,
    performance5Y: 4.8,
    volatility: 20.3,
    dividendYield: 3.2,
    fees: 0.25,
    esgRating: 'A',
    morningstarRating: 3,
    provider: 'Lyxor',
    risk: 'medium',
    historicalPrices: generateHistoricalData(58, 20.3, 36)
  },
  {
    id: 'etf004',
    name: 'Global Clean Energy UCITS ETF',
    symbol: 'INRG',
    type: 'ETF',
    sector: 'Énergies renouvelables',
    description: 'ETF investissant dans les entreprises mondiales du secteur des énergies propres et renouvelables.',
    peaEligible: true,
    price: 12.84,
    performance1Y: -15.2,
    performance5Y: 1.4,
    volatility: 32.1,
    dividendYield: 0.8,
    fees: 0.65,
    esgRating: 'AAA',
    morningstarRating: 3,
    provider: 'iShares',
    risk: 'high',
    historicalPrices: generateHistoricalData(18, 32.1, 36)
  },
  {
    id: 'stock002',
    name: 'Sanofi',
    symbol: 'SAN.PA',
    type: 'Stock',
    sector: 'Pharmaceutique',
    description: 'Groupe pharmaceutique français, leader mondial dans la recherche et développement de médicaments.',
    peaEligible: true,
    price: 94.32,
    performance1Y: 6.8,
    performance5Y: 3.2,
    volatility: 18.7,
    dividendYield: 3.8,
    fees: 0,
    esgRating: 'A',
    morningstarRating: 4,
    risk: 'medium',
    historicalPrices: generateHistoricalData(85, 18.7, 36)
  },
  {
    id: 'etf005',
    name: 'NASDAQ 100 Technology UCITS ETF',
    symbol: 'NQSE',
    type: 'ETF',
    sector: 'Technologie',
    description: 'ETF exposant aux 100 plus grandes entreprises technologiques du NASDAQ. Croissance élevée mais volatilité importante.',
    peaEligible: false, // Pour montrer la différence
    price: 156.23,
    performance1Y: 22.1,
    performance5Y: 15.8,
    volatility: 28.9,
    dividendYield: 0.7,
    fees: 0.48,
    esgRating: 'B',
    morningstarRating: 4,
    provider: 'Invesco',
    risk: 'high',
    historicalPrices: generateHistoricalData(125, 28.9, 36)
  },
  {
    id: 'stock003',
    name: 'TotalEnergies',
    symbol: 'TTE.PA',
    type: 'Stock',
    sector: 'Énergie',
    description: 'Compagnie pétrolière et gazière française en transition vers les énergies renouvelables.',
    peaEligible: true,
    price: 62.84,
    performance1Y: 15.7,
    performance5Y: -2.1,
    volatility: 24.6,
    dividendYield: 5.2,
    fees: 0,
    esgRating: 'C',
    morningstarRating: 3,
    risk: 'medium',
    historicalPrices: generateHistoricalData(52, 24.6, 36)
  }
];