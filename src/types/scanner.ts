
export interface ScanResult {
  url: string;
  scanDate: string;
  overallScore: number;
  issues: Issue[];
  dataTypes: DataTypeFound[];
  forms: FormAnalysis[];
  cookies: CookieAnalysis[];
  privacyPolicy: PrivacyPolicyAnalysis;
}

export interface Issue {
  severity: 'critical' | 'warning' | 'info';
  type: 'data_collection' | 'privacy_policy' | 'data_retention' | 'cookies' | 'consent' | 'security';
  title: string;
  description: string;
  location: string;
  recommendation: string;
}

export interface DataTypeFound {
  type: string;
  count: number;
  locations: string[];
  severity: 'high' | 'medium' | 'low';
}

export interface FormAnalysis {
  formId: string;
  action: string;
  method: string;
  fields: FormField[];
  hasConsentCheckbox: boolean;
  hasPrivacyPolicyLink: boolean;
  issues: string[];
}

export interface FormField {
  name: string;
  type: string;
  label: string;
  required: boolean;
  dataType: 'personal' | 'sensitive' | 'regular';
}

export interface CookieAnalysis {
  name: string;
  value: string;
  domain: string;
  secure: boolean;
  httpOnly: boolean;
  sameSite: string;
  purpose: string;
  isTracking: boolean;
}

export interface PrivacyPolicyAnalysis {
  found: boolean;
  url?: string;
  lastUpdated?: string;
  hasDataRetention: boolean;
  hasCookiePolicy: boolean;
  hasContactInfo: boolean;
  score: number;
}
