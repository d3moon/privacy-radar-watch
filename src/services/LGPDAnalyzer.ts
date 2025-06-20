
import { Issue, ScanResult, DataTypeFound } from '../types/scanner';
import { PersonalDataDetector } from './PersonalDataDetector';
import { WebScrapingService } from './WebScrapingService';

export class LGPDAnalyzer {
  static async analyzeSite(url: string, onProgress?: (progress: number, message: string) => void): Promise<ScanResult> {
    const issues: Issue[] = [];
    const dataTypes: DataTypeFound[] = [];
    
    try {
      // Step 1: Scrape website
      onProgress?.(20, "Conectando ao site...");
      const { html, forms, cookies, privacyPolicy } = await WebScrapingService.scrapeWebsite(url);
      
      // Step 2: Analyze forms
      onProgress?.(40, "Analisando formulários...");
      const formIssues = this.analyzeFormCompliance(forms);
      issues.push(...formIssues);
      
      // Step 3: Detect personal data
      onProgress?.(60, "Detectando campos de dados pessoais...");
      const detectedData = PersonalDataDetector.detectInText(html);
      dataTypes.push(...this.mapDetectedDataToTypes(detectedData));
      
      // Step 4: Check privacy policy
      onProgress?.(80, "Verificando políticas de privacidade...");
      const privacyIssues = this.analyzePrivacyPolicy(privacyPolicy);
      issues.push(...privacyIssues);
      
      // Step 5: Analyze cookies
      onProgress?.(90, "Analisando cookies e tracking...");
      const cookieIssues = this.analyzeCookies(cookies);
      issues.push(...cookieIssues);
      
      onProgress?.(100, "Gerando relatório final...");
      
      const overallScore = this.calculateOverallScore(issues, dataTypes, privacyPolicy);
      
      return {
        url,
        scanDate: new Date().toISOString(),
        overallScore,
        issues,
        dataTypes,
        forms,
        cookies,
        privacyPolicy
      };
      
    } catch (error) {
      console.error('Erro na análise LGPD:', error);
      throw new Error('Falha na análise do site');
    }
  }

  private static analyzeFormCompliance(forms: any[]): Issue[] {
    const issues: Issue[] = [];
    
    forms.forEach((form, index) => {
      // Check for sensitive data collection without consent
      const sensitiveFields = form.fields.filter((field: any) => field.dataType === 'sensitive');
      if (sensitiveFields.length > 0 && !form.hasConsentCheckbox) {
        issues.push({
          severity: 'critical',
          type: 'consent',
          title: 'Dados sensíveis coletados sem consentimento',
          description: `Formulário coleta ${sensitiveFields.map((f: any) => f.label).join(', ')} sem checkbox de consentimento LGPD`,
          location: `${form.action} - Formulário ${index + 1}`,
          recommendation: 'Adicionar checkbox de consentimento específico para coleta de dados sensíveis'
        });
      }

      // Check for privacy policy link
      if (!form.hasPrivacyPolicyLink && form.fields.some((f: any) => f.dataType === 'personal')) {
        issues.push({
          severity: 'warning',
          type: 'privacy_policy',
          title: 'Ausência de link para política de privacidade',
          description: 'Formulário coleta dados pessoais sem link para política de privacidade',
          location: `${form.action} - Formulário ${index + 1}`,
          recommendation: 'Adicionar link visível para a política de privacidade próximo ao formulário'
        });
      }
    });

    return issues;
  }

  private static analyzePrivacyPolicy(policy: any): Issue[] {
    const issues: Issue[] = [];
    
    if (!policy.found) {
      issues.push({
        severity: 'critical',
        type: 'privacy_policy',
        title: 'Política de privacidade não encontrada',
        description: 'Site não possui política de privacidade acessível',
        location: 'Geral',
        recommendation: 'Criar e publicar política de privacidade conforme LGPD'
      });
    } else {
      if (!policy.hasDataRetention) {
        issues.push({
          severity: 'warning',
          type: 'data_retention',
          title: 'Período de retenção não especificado',
          description: 'Política de privacidade não especifica por quanto tempo os dados serão mantidos',
          location: policy.url || '/privacidade',
          recommendation: 'Definir e comunicar períodos específicos de retenção para cada tipo de dado'
        });
      }

      if (!policy.hasCookiePolicy) {
        issues.push({
          severity: 'info',
          type: 'cookies',
          title: 'Política de cookies incompleta',
          description: 'Política não detalha o uso de cookies e tecnologias de rastreamento',
          location: policy.url || '/privacidade',
          recommendation: 'Adicionar seção específica sobre cookies, incluindo finalidade e como desativá-los'
        });
      }
    }

    return issues;
  }

  private static analyzeCookies(cookies: any[]): Issue[] {
    const issues: Issue[] = [];
    
    const trackingCookies = cookies.filter(cookie => cookie.isTracking);
    if (trackingCookies.length > 0) {
      issues.push({
        severity: 'warning',
        type: 'cookies',
        title: 'Cookies de rastreamento sem consentimento',
        description: `Detectados ${trackingCookies.length} cookies de rastreamento que podem exigir consentimento`,
        location: 'Cookies do site',
        recommendation: 'Implementar banner de cookies com opção de aceitar/rejeitar cookies não essenciais'
      });
    }

    const insecureCookies = cookies.filter(cookie => !cookie.secure);
    if (insecureCookies.length > 0) {
      issues.push({
        severity: 'info',
        type: 'security',
        title: 'Cookies sem flag Secure',
        description: `${insecureCookies.length} cookies não possuem flag Secure`,
        location: 'Configuração de cookies',
        recommendation: 'Configurar cookies com flag Secure para conexões HTTPS'
      });
    }

    return issues;
  }

  private static mapDetectedDataToTypes(detectedData: any[]): DataTypeFound[] {
    const typeMap: { [key: string]: DataTypeFound } = {};
    
    detectedData.forEach(data => {
      const typeName = this.getDataTypeName(data.type);
      if (!typeMap[typeName]) {
        typeMap[typeName] = {
          type: typeName,
          count: 0,
          locations: [],
          severity: data.severity
        };
      }
      typeMap[typeName].count += data.matches.length;
      typeMap[typeName].locations.push('Conteúdo da página');
    });

    return Object.values(typeMap);
  }

  private static getDataTypeName(type: string): string {
    const nameMap: { [key: string]: string } = {
      cpf: 'CPF',
      email: 'Email',
      phone: 'Telefone',
      fullName: 'Nome completo',
      cep: 'CEP',
      ip: 'Endereço IP'
    };
    return nameMap[type] || type;
  }

  private static calculateOverallScore(issues: Issue[], dataTypes: DataTypeFound[], privacyPolicy: any): number {
    let score = 100;
    
    // Penalize for issues
    issues.forEach(issue => {
      switch (issue.severity) {
        case 'critical':
          score -= 25;
          break;
        case 'warning':
          score -= 15;
          break;
        case 'info':
          score -= 5;
          break;
      }
    });

    // Penalize for high-severity data types
    dataTypes.forEach(dataType => {
      if (dataType.severity === 'high') {
        score -= 10;
      }
    });

    // Bonus for having privacy policy
    if (privacyPolicy.found) {
      score += 10;
    }

    return Math.max(0, Math.min(100, score));
  }
}
