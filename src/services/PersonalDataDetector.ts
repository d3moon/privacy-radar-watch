
export class PersonalDataDetector {
  private static readonly PERSONAL_DATA_PATTERNS = {
    cpf: {
      regex: /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g,
      keywords: ['cpf', 'documento', 'rg', 'identidade'],
      severity: 'high' as const
    },
    email: {
      regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
      keywords: ['email', 'e-mail', 'correio'],
      severity: 'medium' as const
    },
    phone: {
      regex: /\b(?:\+55\s?)?(?:\(\d{2}\)\s?)?(?:9?\d{4}-?\d{4})\b/g,
      keywords: ['telefone', 'celular', 'fone', 'whatsapp'],
      severity: 'medium' as const
    },
    fullName: {
      regex: /\b[A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g,
      keywords: ['nome', 'nome completo', 'razão social'],
      severity: 'medium' as const
    },
    cep: {
      regex: /\b\d{5}-?\d{3}\b/g,
      keywords: ['cep', 'código postal', 'endereço'],
      severity: 'low' as const
    },
    ip: {
      regex: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
      keywords: ['ip', 'endereço ip'],
      severity: 'medium' as const
    }
  };

  static detectInText(text: string): { type: string; matches: string[]; severity: 'high' | 'medium' | 'low' }[] {
    const results: { type: string; matches: string[]; severity: 'high' | 'medium' | 'low' }[] = [];
    
    Object.entries(this.PERSONAL_DATA_PATTERNS).forEach(([type, pattern]) => {
      const matches = text.match(pattern.regex) || [];
      const keywordMatches = pattern.keywords.some(keyword => 
        text.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (matches.length > 0 || keywordMatches) {
        results.push({
          type,
          matches: matches.slice(0, 5), // Limit to 5 matches
          severity: pattern.severity
        });
      }
    });

    return results;
  }

  static detectInFormField(fieldName: string, fieldType: string, label: string): 'personal' | 'sensitive' | 'regular' {
    const fullText = `${fieldName} ${fieldType} ${label}`.toLowerCase();
    
    // Sensitive data
    const sensitiveKeywords = ['cpf', 'rg', 'documento', 'senha', 'password', 'cartao', 'credito'];
    if (sensitiveKeywords.some(keyword => fullText.includes(keyword))) {
      return 'sensitive';
    }

    // Personal data
    const personalKeywords = ['nome', 'email', 'telefone', 'endereco', 'nascimento', 'idade'];
    if (personalKeywords.some(keyword => fullText.includes(keyword))) {
      return 'personal';
    }

    return 'regular';
  }
}
