import React, { useState } from 'react';
import Landing from './components/Landing';
import Questionnaire from './components/Questionnaire';
import Recommendations from './components/Recommendations';
import Comparator from './components/Comparator';
import AssetDetail from './components/AssetDetail';
import Navigation from './components/Navigation';
import { InvestorProfile } from './types/investor';
import { Asset } from './types/assets';

export type Page = 'landing' | 'questionnaire' | 'recommendations' | 'comparator' | 'detail';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [investorProfile, setInvestorProfile] = useState<InvestorProfile | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const handleProfileComplete = (profile: InvestorProfile) => {
    setInvestorProfile(profile);
    setCurrentPage('recommendations');
  };

  const handleAssetSelect = (asset: Asset) => {
    setSelectedAsset(asset);
    setCurrentPage('detail');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onStartQuestionnaire={() => setCurrentPage('questionnaire')} />;
      case 'questionnaire':
        return <Questionnaire onComplete={handleProfileComplete} />;
      case 'recommendations':
        return (
          <Recommendations
            profile={investorProfile}
            onAssetSelect={handleAssetSelect}
            onCompareAssets={() => setCurrentPage('comparator')}
          />
        );
      case 'comparator':
        return <Comparator onAssetSelect={handleAssetSelect} />;
      case 'detail':
        return (
          <AssetDetail
            asset={selectedAsset}
            onBack={() => setCurrentPage('recommendations')}
          />
        );
      default:
        return <Landing onStartQuestionnaire={() => setCurrentPage('questionnaire')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'landing' && (
        <Navigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          hasProfile={!!investorProfile}
        />
      )}
      {renderPage()}
    </div>
  );
}

export default App;