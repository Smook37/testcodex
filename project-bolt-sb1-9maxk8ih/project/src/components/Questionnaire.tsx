import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, User, Target, DollarSign, Clock, Heart, TrendingUp } from 'lucide-react';
import { InvestorProfile } from '../types/investor';

interface QuestionnaireProps {
  onComplete: (profile: InvestorProfile) => void;
}

export default function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    riskLevel: '',
    investmentHorizon: '',
    monthlyBudget: '',
    interests: [] as string[],
    experience: '',
    goals: [] as string[]
  });

  const steps = [
    {
      title: 'Faisons connaissance',
      icon: User,
      component: BasicInfoStep
    },
    {
      title: 'Votre profil de risque',
      icon: TrendingUp,
      component: RiskProfileStep
    },
    {
      title: 'Votre budget',
      icon: DollarSign,
      component: BudgetStep
    },
    {
      title: 'Vos préférences',
      icon: Heart,
      component: InterestsStep
    },
    {
      title: 'Vos objectifs',
      icon: Target,
      component: GoalsStep
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const profile: InvestorProfile = {
        name: formData.name,
        age: parseInt(formData.age),
        riskLevel: formData.riskLevel as 'conservative' | 'moderate' | 'aggressive',
        investmentHorizon: formData.investmentHorizon as 'short' | 'medium' | 'long',
        monthlyBudget: parseInt(formData.monthlyBudget),
        interests: formData.interests,
        experience: formData.experience as 'beginner' | 'intermediate' | 'advanced',
        goals: formData.goals
      };
      onComplete(profile);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name && formData.age && formData.experience;
      case 1:
        return formData.riskLevel;
      case 2:
        return formData.monthlyBudget && formData.investmentHorizon;
      case 3:
        return formData.interests.length > 0;
      case 4:
        return formData.goals.length > 0;
      default:
        return false;
    }
  };

  const StepComponent = steps[currentStep].component;
  const StepIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <StepIcon className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-gray-500">
                Étape {currentStep + 1} sur {steps.length}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% terminé
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h2>
          </div>

          <StepComponent formData={formData} updateFormData={updateFormData} />

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Précédent
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                isStepValid()
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === steps.length - 1 ? 'Voir mes recommandations' : 'Suivant'}
              <ChevronRight className="h-5 w-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BasicInfoStep({ formData, updateFormData }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Votre prénom
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ex: Thomas"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Votre âge
        </label>
        <input
          type="number"
          min="18"
          max="25"
          value={formData.age}
          onChange={(e) => updateFormData('age', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ex: 22"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Votre expérience en investissement
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { value: 'beginner', label: 'Débutant', desc: 'Je commence tout juste' },
            { value: 'intermediate', label: 'Intermédiaire', desc: 'J\'ai quelques notions' },
            { value: 'advanced', label: 'Confirmé', desc: 'Je connais bien le sujet' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => updateFormData('experience', option.value)}
              className={`p-4 border rounded-lg text-left transition-all ${
                formData.experience === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-medium">{option.label}</div>
              <div className="text-sm text-gray-500 mt-1">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RiskProfileStep({ formData, updateFormData }: any) {
  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Quelle est votre tolérance au risque ? Cela nous aide à vous recommander les bons investissements.
      </p>
      
      <div className="space-y-4">
        {[
          {
            value: 'conservative',
            title: 'Prudent',
            desc: 'Je préfère la sécurité, même si les gains sont plus faibles',
            color: 'green'
          },
          {
            value: 'moderate',
            title: 'Équilibré',
            desc: 'J\'accepte un risque modéré pour de meilleurs rendements',
            color: 'blue'
          },
          {
            value: 'aggressive',
            title: 'Audacieux',
            desc: 'Je suis prêt à prendre des risques pour maximiser les gains',
            color: 'red'
          }
        ].map(option => (
          <button
            key={option.value}
            onClick={() => updateFormData('riskLevel', option.value)}
            className={`w-full p-6 border rounded-xl text-left transition-all hover:shadow-md ${
              formData.riskLevel === option.value
                ? `border-${option.color}-500 bg-${option.color}-50`
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="font-semibold text-lg mb-2">{option.title}</div>
            <div className="text-gray-600">{option.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function BudgetStep({ formData, updateFormData }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Combien pouvez-vous investir par mois ?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {['50', '100', '200', '500'].map(amount => (
            <button
              key={amount}
              onClick={() => updateFormData('monthlyBudget', amount)}
              className={`p-3 border rounded-lg transition-all ${
                formData.monthlyBudget === amount
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {amount}€
            </button>
          ))}
        </div>
        <input
          type="number"
          value={formData.monthlyBudget}
          onChange={(e) => updateFormData('monthlyBudget', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ou saisissez un montant personnalisé"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Sur quelle durée souhaitez-vous investir ?
        </label>
        <div className="space-y-3">
          {[
            { value: 'short', label: '1-3 ans', desc: 'Objectif à court terme' },
            { value: 'medium', label: '3-8 ans', desc: 'Objectif à moyen terme' },
            { value: 'long', label: '8+ ans', desc: 'Préparation retraite, projet long terme' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => updateFormData('investmentHorizon', option.value)}
              className={`w-full p-4 border rounded-lg text-left transition-all ${
                formData.investmentHorizon === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-medium">{option.label}</div>
              <div className="text-sm text-gray-500 mt-1">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function InterestsStep({ formData, updateFormData }: any) {
  const interests = [
    'Écologie & ESG',
    'Technologie',
    'Santé & Biotechs',
    'Immobilier',
    'Dividendes',
    'Croissance',
    'Europe',
    'International',
    'Secteurs défensifs',
    'Innovation'
  ];

  const toggleInterest = (interest: string) => {
    const current = formData.interests || [];
    if (current.includes(interest)) {
      updateFormData('interests', current.filter((i: string) => i !== interest));
    } else {
      updateFormData('interests', [...current, interest]);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Quels secteurs ou thématiques vous intéressent le plus ? (Sélectionnez au moins 1)
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {interests.map(interest => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`p-4 border rounded-lg text-center transition-all ${
              formData.interests?.includes(interest)
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {interest}
          </button>
        ))}
      </div>
    </div>
  );
}

function GoalsStep({ formData, updateFormData }: any) {
  const goals = [
    'Constituer une épargne de précaution',
    'Préparer un projet (achat immobilier, voyage...)',
    'Faire fructifier mon épargne',
    'Préparer ma retraite',
    'Générer des revenus complémentaires',
    'Apprendre à investir'
  ];

  const toggleGoal = (goal: string) => {
    const current = formData.goals || [];
    if (current.includes(goal)) {
      updateFormData('goals', current.filter((g: string) => g !== goal));
    } else {
      updateFormData('goals', [...current, goal]);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Quels sont vos principaux objectifs d'investissement ? (Sélectionnez au moins 1)
      </p>
      
      <div className="space-y-3">
        {goals.map(goal => (
          <button
            key={goal}
            onClick={() => toggleGoal(goal)}
            className={`w-full p-4 border rounded-lg text-left transition-all ${
              formData.goals?.includes(goal)
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {goal}
          </button>
        ))}
      </div>
    </div>
  );
}