
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Check, 
  Star,
  FileSearch,
  Database,
  Mail,
  Users,
  Download,
  Zap
} from "lucide-react";

const Pricing = () => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Free",
      description: "Ideal para testar o LGPDWatch",
      price: { monthly: 0, yearly: 0 },
      features: [
        "Scanner de 1 URL",
        "Checklist LGPD básico",
        "Relatório básico",
        "Suporte por email"
      ],
      limitations: [
        "Apenas 1 scan por mês",
        "Sem monitoramento contínuo",
        "Sem alertas automáticos"
      ],
      buttonText: "Começar Grátis",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      description: "Para pequenas empresas se protegerem",
      price: { monthly: 59, yearly: 590 },
      features: [
        "Scanner de até 5 URLs",
        "Escaneamento de banco de dados",
        "Monitoramento de backups",
        "Alertas por email",
        "Relatórios PDF",
        "Checklist personalizado",
        "Dashboard completo",
        "Suporte prioritário"
      ],
      limitations: [],
      buttonText: "Assinar Pro",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Enterprise",
      description: "Para empresas com necessidades avançadas",
      price: { monthly: 199, yearly: 1990 },
      features: [
        "URLs ilimitadas",
        "Múltiplos bancos de dados",
        "Integrações via webhook",
        "Alertas customizados",
        "Relatórios personalizados",
        "Multi-usuário",
        "API completa",
        "Suporte 24/7",
        "Consultoria LGPD inclusa"
      ],
      limitations: [],
      buttonText: "Assinar Enterprise",
      buttonVariant: "default" as const,
      popular: false
    }
  ];

  const handlePlanSelect = (planName: string) => {
    if (planName === "Free") {
      navigate("/dashboard");
    } else {
      // Navigate to checkout or payment flow
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              LGPDWatch
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")}>Início</Button>
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>Dashboard</Button>
            <Button onClick={() => navigate("/dashboard")}>Começar</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Escolha o plano ideal para proteger sua empresa
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Monitore sua conformidade LGPD com ferramentas profissionais e alertas em tempo real
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingPeriod === "monthly"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingPeriod === "yearly"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Anual
              <Badge className="ml-2 bg-green-100 text-green-700 border-green-200">
                -17%
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all hover:shadow-xl ${
                plan.popular ? "ring-2 ring-blue-600 bg-white" : "bg-white/80 backdrop-blur-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 text-sm font-medium">
                  <Star className="inline h-4 w-4 mr-1" />
                  Mais Popular
                </div>
              )}
              
              <CardHeader className={plan.popular ? "pt-12" : ""}>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <p className="text-gray-600">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    R$ {plan.price[billingPeriod]}
                  </span>
                  {plan.price[billingPeriod] > 0 && (
                    <span className="text-gray-500">
                      /{billingPeriod === "monthly" ? "mês" : "ano"}
                    </span>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-700">✓ Incluído</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-500">Limitações</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="text-sm text-gray-500">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full"
                  variant={plan.buttonVariant}
                  size="lg"
                  onClick={() => handlePlanSelect(plan.name)}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Compare todos os recursos
          </h2>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4">Recurso</th>
                      <th className="text-center py-4 px-4">Free</th>
                      <th className="text-center py-4 px-4 bg-blue-50 rounded-t">Pro</th>
                      <th className="text-center py-4 px-4">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "URLs para scan", free: "1", pro: "5", enterprise: "Ilimitado" },
                      { feature: "Scanner de banco de dados", free: "✗", pro: "✓", enterprise: "✓" },
                      { feature: "Alertas automáticos", free: "✗", pro: "✓", enterprise: "✓" },
                      { feature: "Relatórios PDF", free: "✗", pro: "✓", enterprise: "✓" },
                      { feature: "Multi-usuário", free: "✗", pro: "✗", enterprise: "✓" },
                      { feature: "API e webhooks", free: "✗", pro: "✗", enterprise: "✓" },
                      { feature: "Suporte", free: "Email", pro: "Prioritário", enterprise: "24/7" }
                    ].map((row, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-4 px-4 font-medium">{row.feature}</td>
                        <td className="text-center py-4 px-4">{row.free}</td>
                        <td className="text-center py-4 px-4 bg-blue-50">{row.pro}</td>
                        <td className="text-center py-4 px-4">{row.enterprise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Perguntas Frequentes
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "O que acontece se eu encontrar dados sensíveis?",
                answer: "O LGPDWatch gera relatórios detalhados com recomendações específicas para cada vulnerabilidade encontrada. No plano Pro e Enterprise, você recebe alertas automáticos por email."
              },
              {
                question: "Posso cancelar a qualquer momento?",
                answer: "Sim, você pode cancelar sua assinatura a qualquer momento. Não há multas ou taxas de cancelamento."
              },
              {
                question: "Os dados do meu site ficam seguros?",
                answer: "Sim, fazemos apenas análise superficial dos formulários e nunca armazenamos dados pessoais dos seus usuários. Seguimos as melhores práticas de segurança."
              },
              {
                question: "Quanto tempo leva um scan completo?",
                answer: "Um scan básico leva entre 30 segundos a 2 minutos, dependendo do tamanho do site. Scans de banco de dados podem levar alguns minutos."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Comece a proteger sua empresa hoje
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Não espere a multa chegar. Monitore sua conformidade LGPD agora.
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => navigate("/dashboard")}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Começar Grátis
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate("/scan")}
                >
                  <FileSearch className="h-4 w-4 mr-2" />
                  Testar Scanner
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
