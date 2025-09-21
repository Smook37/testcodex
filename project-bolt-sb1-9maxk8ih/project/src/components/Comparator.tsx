import React, { useState } from 'react';
import { Plus, X, TrendingUp, TrendingDown, CheckCircle, XCircle } from 'lucide-react';
import { Asset } from '../types/assets';
import { mockAssets } from '../data/mockAssets';

interface ComparatorProps {
  onAssetSelect: (asset: Asset) => void;
}

export default function Comparator({ onAssetSelect }: ComparatorProps) {
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'ETF' | 'Stock'>('all');

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || asset.type === filterType;
    return matchesSearch && matchesType;
  });

  const addAsset = (asset: Asset) => {
    if (selectedAssets.length < 4 && !selectedAssets.find(a => a.id === asset.id)) {
      setSelectedAssets([...selectedAssets, asset]);
    }
  };

  const removeAsset = (assetId: string) => {
    setSelectedAssets(selectedAssets.filter(a => a.id !== assetId));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Comparateur d'actifs
          </h1>
          <p className="text-lg text-gray-600">
            Comparez jusqu'à 4 ETF et actions éligibles au PEA pour faire le meilleur choix
          </p>
        </div>

        {/* Asset Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Sélectionner des actifs à comparer ({selectedAssets.length}/4)
          </h2>
          
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Rechercher un actif..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex gap-2">
              {['all', 'ETF', 'Stock'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterType === type
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {type === 'all' ? 'Tous' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Asset list */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
            {filteredAssets.map(asset => (
              <div
                key={asset.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedAssets.find(a => a.id === asset.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
                onClick={() => selectedAssets.find(a => a.id === asset.id) ? removeAsset(asset.id) : addAsset(asset)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{asset.name}</h3>
                    <p className="text-xs text-gray-500">{asset.symbol} • {asset.type}</p>
                  </div>
                  {asset.peaEligible ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="text-sm text-gray-600">{asset.sector}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedAssets.length >= 2 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Critère</th>
                    {selectedAssets.map(asset => (
                      <th key={asset.id} className="text-center py-4 px-6 min-w-48">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 text-sm mb-1">{asset.name}</div>
                            <div className="text-xs text-gray-500">{asset.symbol}</div>
                          </div>
                          <button
                            onClick={() => removeAsset(asset.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <ComparisonRow
                    label="Éligibilité PEA"
                    values={selectedAssets.map(asset => 
                      asset.peaEligible ? (
                        <div className="flex items-center justify-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">Éligible</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center text-red-600">
                          <XCircle className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">Non éligible</span>
                        </div>
                      )
                    )}
                  />
                  
                  <ComparisonRow
                    label="Type"
                    values={selectedAssets.map(asset => (
                      <span className="text-sm font-medium text-gray-900">{asset.type}</span>
                    ))}
                  />
                  
                  <ComparisonRow
                    label="Prix actuel"
                    values={selectedAssets.map(asset => (
                      <span className="text-sm font-semibold text-gray-900">{asset.price}€</span>
                    ))}
                  />
                  
                  <ComparisonRow
                    label="Performance 1 an"
                    values={selectedAssets.map(asset => (
                      <div className="flex items-center justify-center">
                        {asset.performance1Y > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                        )}
                        <span className={`text-sm font-semibold ${
                          asset.performance1Y > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {asset.performance1Y > 0 ? '+' : ''}{asset.performance1Y}%
                        </span>
                      </div>
                    ))}
                  />
                  
                  <ComparisonRow
                    label="Performance 5 ans"
                    values={selectedAssets.map(asset => (
                      <div className="flex items-center justify-center">
                        {asset.performance5Y > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                        )}
                        <span className={`text-sm font-semibold ${
                          asset.performance5Y > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {asset.performance5Y > 0 ? '+' : ''}{asset.performance5Y}%
                        </span>
                      </div>
                    ))}
                  />
                  
                  <ComparisonRow
                    label="Volatilité"
                    values={selectedAssets.map(asset => (
                      <span className="text-sm font-medium text-gray-700">{asset.volatility}%</span>
                    ))}
                  />
                  
                  <ComparisonRow
                    label="Dividende"
                    values={selectedAssets.map(asset => (
                      <span className="text-sm font-medium text-green-600">
                        {asset.dividendYield}%
                      </span>
                    ))}
                  />
                  
                  <ComparisonRow
                    label="Frais annuels"
                    values={selectedAssets.map(asset => (
                      <span className="text-sm font-medium text-gray-700">{asset.fees}%</span>
                    ))}
                  />
                  
                  <ComparisonRow
                    label="Notation ESG"
                    values={selectedAssets.map(asset => (
                      <span className={`text-sm font-medium px-2 py-1 rounded ${
                        asset.esgRating === 'AAA' ? 'bg-green-100 text-green-700' :
                        asset.esgRating === 'AA' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {asset.esgRating}
                      </span>
                    ))}
                  />
                  
                  <ComparisonRow
                    label="Secteur"
                    values={selectedAssets.map(asset => (
                      <span className="text-sm text-gray-600">{asset.sector}</span>
                    ))}
                  />
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-3">
                {selectedAssets.map(asset => (
                  <button
                    key={asset.id}
                    onClick={() => onAssetSelect(asset)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Voir détails {asset.symbol}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedAssets.length < 2 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Sélectionnez au moins 2 actifs
            </h3>
            <p className="text-gray-600">
              Choisissez des actifs dans la liste ci-dessus pour commencer la comparaison
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ComparisonRow({ label, values }: { label: string; values: React.ReactNode[] }) {
  return (
    <tr>
      <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">{label}</td>
      {values.map((value, index) => (
        <td key={index} className="py-4 px-6 text-center">
          {value}
        </td>
      ))}
    </tr>
  );
}