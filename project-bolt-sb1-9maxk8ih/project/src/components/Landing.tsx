import React from 'react';
import { TrendingUp, Shield, Target, Zap, CheckCircle, Star, Users } from 'lucide-react';

interface LandingProps {
  onStartQuestionnaire: () => void;
}

export default function Landing({ onStartQuestionnaire }: LandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">PEAdvisor</span>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <span className="flex items-center"><Shield className="h-4 w-4 mr-1" />100% sécurisé</span>
              <span className="flex items-center"><Users className="h-4 w-4 mr-1" />+10k utilisateurs</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              <Star className="h-4 w-4 mr-2" />
              Spécialement conçu pour le PEA Jeune
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Investir malin avec votre
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> PEA Jeune</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Découvrez les meilleures recommandations d'investissement personnalisées pour votre profil. 
            ETF et actions éligibles au PEA Jeune, comparateur intelligent et conseils d'experts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onStartQuestionnaire}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center"
            >
              <Zap className="h-5 w-5 mr-2" />
              Commencer mon analyse gratuite
            </button>
            <p className="text-sm text-gray-500">🚀 Résultat en 2 minutes</p>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <span className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-600" />Sans engagement</span>
            <span className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-600" />100% gratuit</span>
            <span className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-600" />Données sécurisées</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir PEAdvisor ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une approche moderne et intelligente pour optimiser vos investissements PEA Jeune
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recommandations personnalisées</h3>
              <p className="text-gray-600">
                Algorithme intelligent qui analyse votre profil pour vous proposer les meilleurs ETF et actions éligibles à votre PEA Jeune.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">100% éligible PEA</h3>
              <p className="text-gray-600">
                Tous nos actifs sont rigoureusement vérifiés pour leur éligibilité au PEA Jeune. Investissez en toute sérénité.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Comparateur intelligent</h3>
              <p className="text-gray-600">
                Comparez facilement les performances, risques et frais de plusieurs actifs pour faire le meilleur choix.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à optimiser vos investissements ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers de jeunes investisseurs qui font confiance à PEAdvisor
          </p>
          <button
            onClick={onStartQuestionnaire}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Démarrer mon analyse gratuite
          </button>
        </div>
      </section>
    </div>
  );
}