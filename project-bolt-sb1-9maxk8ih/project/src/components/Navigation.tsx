import React from 'react';
import { TrendingUp, BarChart3, Lightbulb, ArrowLeft } from 'lucide-react';
import { Page } from '../App';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  hasProfile: boolean;
}

export default function Navigation({ currentPage, onNavigate, hasProfile }: NavigationProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">PEAdvisor</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {hasProfile && (
                <>
                  <button
                    onClick={() => onNavigate('recommendations')}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === 'recommendations'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Lightbulb className="h-4 w-4" />
                    <span>Recommandations</span>
                  </button>
                  
                  <button
                    onClick={() => onNavigate('comparator')}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === 'comparator'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Comparateur</span>
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            {currentPage === 'detail' && (
              <button
                onClick={() => onNavigate('recommendations')}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Retour</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}