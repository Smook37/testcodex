import React from 'react';
import { ArrowLeft, CheckCircle, TrendingUp, TrendingDown, Star, Shield, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Asset } from '../types/assets';

interface AssetDetailProps {
  asset: Asset | null;
  onBack: () => void;
}

export default function AssetDetail({ asset, onBack }: AssetDetailProps) {
  if (!asset) return null;

  const formatChartData = (historicalPrices: Array<{ date: string; price: number }>) => {
    return historicalPrices.map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('fr-FR', { 
        month: 'short',
        year: '2-digit'
      })
    }));
  };

  const chartData = formatChartData(asset.historicalPrices);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'low': return 'Faible risque';
      case 'medium': return 'Risque modéré';
      case 'high': return 'Risque élevé';
      default: return 'Non défini';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour aux recommandations
          </button>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium mr-3 ${getRiskColor(asset.risk)}`}>
                      {getRiskLabel(asset.risk)}
                    </span>
                    {asset.peaEligible && (
                      <div className="flex items-center text-green-600 bg-green-100 px-3 py-1 rounded-full text-xs font-medium">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Éligible PEA
                      </div>
                    )}
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {asset.name}
                </h1>
                
                <div className="flex items-center mb-4">
                  <span className="text-lg text-gray-600 mr-4">{asset.symbol}</span>
                  <span className="text-sm text-gray-500 mr-4">•</span>
                  <span className="text-lg text-gray-600 mr-4">{asset.type}</span>
                  <span className="text-sm text-gray-500 mr-4">•</span>
                  <span className="text-lg text-gray-600">{asset.sector}</span>
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {asset.description}
                </p>
              </div>
              
              <div className="lg:ml-8 lg:text-right">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {asset.price}€
                  </div>
                  <div className="flex items-center justify-end">
                    {asset.performance1Y > 0 ? (
                      <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
                    )}
                    <span className={`text-lg font-semibold ${
                      asset.performance1Y > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {asset.performance1Y > 0 ? '+' : ''}{asset.performance1Y}% (1 an)
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-end mb-2">
                  <span className="text-sm text-gray-600 mr-2">Notation Morningstar</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < asset.morningstarRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  ESG: <span className="font-medium">{asset.esgRating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Évolution du prix sur 3 ans
              </h2>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#6b7280"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      fontSize={12}
                      domain={['dataMin - 5', 'dataMax + 5']}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value: any) => [`${value}€`, 'Prix']}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: 'white' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Key metrics */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Métriques clés
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600">Prix actuel</span>
                  <span className="font-semibold text-gray-900">{asset.price}€</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600">Performance 1 an</span>
                  <div className="flex items-center">
                    {asset.performance1Y > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={`font-semibold ${
                      asset.performance1Y > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {asset.performance1Y > 0 ? '+' : ''}{asset.performance1Y}%
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600">Performance 5 ans</span>
                  <div className="flex items-center">
                    {asset.performance5Y > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={`font-semibold ${
                      asset.performance5Y > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {asset.performance5Y > 0 ? '+' : ''}{asset.performance5Y}%
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600">Volatilité</span>
                  <span className="font-semibold text-gray-900">{asset.volatility}%</span>
                </div>
                
                {asset.dividendYield > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-600">Rendement dividende</span>
                    <span className="font-semibold text-green-600">{asset.dividendYield}%</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600">Frais annuels</span>
                  <span className="font-semibold text-gray-900">{asset.fees}%</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Notation ESG</span>
                  <span className={`font-semibold px-2 py-1 rounded text-sm ${
                    asset.esgRating === 'AAA' ? 'bg-green-100 text-green-700' :
                    asset.esgRating === 'AA' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {asset.esgRating}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informations détaillées
              </h3>
              
              <div className="space-y-3">
                {asset.provider && (
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Émetteur</div>
                      <div className="text-sm text-gray-600">{asset.provider}</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Secteur d'activité</div>
                    <div className="text-sm text-gray-600">{asset.sector}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Notation Morningstar</div>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < asset.morningstarRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        ({asset.morningstarRating}/5)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PEA eligibility info */}
            <div className={`rounded-xl p-6 ${
              asset.peaEligible 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-start">
                {asset.peaEligible ? (
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1" />
                ) : (
                  <Shield className="h-6 w-6 text-red-600 mr-3 mt-1" />
                )}
                <div>
                  <h3 className={`font-semibold mb-2 ${
                    asset.peaEligible ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {asset.peaEligible ? 'Éligible au PEA Jeune' : 'Non éligible au PEA'}
                  </h3>
                  <p className={`text-sm ${
                    asset.peaEligible ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {asset.peaEligible 
                      ? 'Cet actif peut être intégré dans votre PEA Jeune en bénéficiant des avantages fiscaux.'
                      : 'Cet actif ne peut pas être détenu dans un PEA. Considérez un compte-titres ordinaire.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}