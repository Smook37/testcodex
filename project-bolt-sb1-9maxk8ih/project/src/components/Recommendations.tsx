import React from 'react';
import { CheckCircle, TrendingUp, TrendingDown, BarChart3, Shield, AlertTriangle, Star } from 'lucide-react';
import { InvestorProfile } from '../types/investor';
import { Asset } from '../types/assets';
import { mockAssets } from '../data/mockAssets';

interface RecommendationsProps {
  profile: InvestorProfile | null;
  onAssetSelect: (asset: Asset) => void;
  onCompareAssets: () => void;
}

export default function Recommendations({ profile, onAssetSelect, onCompareAssets }: RecommendationsProps) {
  if (!profile) return null;

  // Algorithme de recommandation simple basé sur le profil
  const getRecommendedAssets = (profile: InvestorProfile): Asset[] => {
    let filteredAssets = mockAssets.filter(asset => asset.peaEligible);
    
    // Filtrage par niveau de risque
    switch (profile.riskLevel) {
      case 'conservative':
        filteredAssets = filteredAssets.filter(asset => asset.risk === 'low' || asset.risk === 'medium');
        break;
      case 'moderate':
        filteredAssets = filteredAssets.filter(asset => asset.risk === 'medium');
        break;
      case 'aggressive':
        // Tous les actifs
        break;
    }

    // Scoring basé sur les intérêts
    const scored = filteredAssets.map(asset => {
      let score = 0;
      
      if (profile.interests.includes('Écologie & ESG') && asset.esgRating === 'AAA') score += 3;
      if (profile.interests.includes('Technologie') && asset.sector.toLowerCase().includes('tech')) score += 3;
      if (profile.interests.includes('Dividendes') && asset.dividendYield > 3) score += 3;
      if (profile.interests.includes('Europe') && (asset.sector.includes('Europe') || asset.sector.includes('France'))) score += 2;
      if (profile.interests.includes('International') && asset.sector.includes('Mondial')) score += 2;
      
      // Bonus pour les ETF si débutant
      if (profile.experience === 'beginner' && asset.type === 'ETF') score += 2;
      
      // Bonus pour la performance selon l'horizon
      if (profile.investmentHorizon === 'long' && asset.performance5Y > 5) score += 1;
      if (profile.investmentHorizon === 'short' && asset.volatility < 20) score += 1;

      return { ...asset, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  };

  const recommendedAssets = getRecommendedAssets(profile);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPerformanceIcon = (perf: number) => {
    if (perf > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Bonjour {profile.name} ! 👋
                </h1>
                <p className="text-lg opacity-90 mb-4">
                  Voici vos recommandations personnalisées d'investissement PEA Jeune
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    Profil {profile.riskLevel === 'conservative' ? 'Prudent' : profile.riskLevel === 'moderate' ? 'Équilibré' : 'Audacieux'}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    {profile.monthlyBudget}€/mois
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    Horizon {profile.investmentHorizon === 'short' ? 'Court' : profile.investmentHorizon === 'medium' ? 'Moyen' : 'Long'} terme
                  </span>
                </div>
              </div>
              <button
                onClick={onCompareAssets}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Comparateur
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {recommendedAssets.map((asset, index) => (
            <div
              key={asset.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 cursor-pointer"
              onClick={() => onAssetSelect(asset)}
            >
              <div className="p-6">
                {/* Header with badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    {index === 0 && (
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full mr-3 flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        Top choix
                      </div>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRiskColor(asset.risk)}`}>
                      {asset.risk === 'low' ? 'Faible risque' : asset.risk === 'medium' ? 'Risque modéré' : 'Risque élevé'}
                    </span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">PEA ✅</span>
                  </div>
                </div>

                {/* Asset info */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">{asset.name}</h3>
                    <span className="text-sm text-gray-500">{asset.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{asset.sector}</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{asset.description}</p>
                </div>

                {/* Key metrics */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Prix actuel</span>
                    <span className="font-semibold text-gray-900">{asset.price}€</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Performance 1 an</span>
                    <div className="flex items-center">
                      {getPerformanceIcon(asset.performance1Y)}
                      <span className={`ml-1 font-semibold ${asset.performance1Y > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {asset.performance1Y > 0 ? '+' : ''}{asset.performance1Y}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Volatilité</span>
                    <span className="text-sm font-medium text-gray-700">{asset.volatility}%</span>
                  </div>
                  
                  {asset.dividendYield > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Dividende</span>
                      <span className="text-sm font-medium text-green-600">{asset.dividendYield}%</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Frais annuels</span>
                    <span className="text-sm font-medium text-gray-700">{asset.fees}%</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">Notation ESG</span>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        asset.esgRating === 'AAA' ? 'bg-green-100 text-green-700' :
                        asset.esgRating === 'AA' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {asset.esgRating}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">Morningstar</span>
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start">
            <Shield className="h-6 w-6 text-blue-600 mr-3 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Pourquoi ces recommandations ?
              </h3>
              <p className="text-blue-800 mb-3">
                Notre algorithme a sélectionné ces actifs en fonction de votre profil de risque {profile.riskLevel === 'conservative' ? 'prudent' : profile.riskLevel === 'moderate' ? 'équilibré' : 'audacieux'}, 
                de votre horizon d'investissement {profile.investmentHorizon === 'short' ? 'court terme' : profile.investmentHorizon === 'medium' ? 'moyen terme' : 'long terme'}, 
                et de vos centres d'intérêt.
              </p>
              <div className="flex items-center text-sm text-blue-700">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span>Ces recommandations ne constituent pas un conseil en investissement. Diversifiez toujours vos placements.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}