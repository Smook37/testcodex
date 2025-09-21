export interface InvestorProfile {
  name: string;
  age: number;
  riskLevel: 'conservative' | 'moderate' | 'aggressive';
  investmentHorizon: 'short' | 'medium' | 'long';
  monthlyBudget: number;
  interests: string[];
  experience: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
}