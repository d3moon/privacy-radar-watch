
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  FileSearch, 
  Clock,
  Globe,
  Database,
  Eye,
  Copy
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Scan = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialUrl = searchParams.get("url") || "";
  
  const [url, setUrl] = useState(initialUrl);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<any>(null);

  const handleStartScan = async () => {
    if (!url) {
      toast({
        title: "URL necessária",
        description: "Digite uma URL válida para escanear",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setScanResults(null);

    // Simulate scanning process
    const steps = [
      "Conectando ao site...",
      "Analisando formulários...",
      "Detectando campos de dados pessoais...",
      "Verificando políticas de privacidade...",
      "Analisando cookies e tracking...",
      "Gerando relatório final..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setScanProgress((i + 1) * (100 / steps.length));
    }

    // Mock scan results
    setScanResults({
      url: url,
      scanDate: new Date().toISOString(),
      overallScore: 67,
      issues: [
        {
          severity: "critical",
          type: "data_collection",
          title: "CPF coletado sem consentimento explícito",
          description: "Formulário de cadastro coleta CPF sem checkbox de consentimento LGPD",
          location: "/cadastro - Formulário de registro",
          recommendation: "Adicionar checkbox de consentimento antes da coleta de CPF"
        },
        {
          severity: "warning",
          type: "privacy_policy",
          title: "Política de privacidade desatualizada",
          description: "Documento não menciona cookies de terceiros utilizados no site",
          location: "/privacidade",
          recommendation: "Atualizar política incluindo todos os cookies e ferramentas de tracking"
        },
        {
          severity: "info",
          type: "data_retention",
          title: "Período de retenção não especificado",
          description: "Não há informação sobre quanto tempo os dados serão armazenados",
          location: "Geral",
          recommendation: "Definir e comunicar períodos de retenção de dados"
        }
      ],
      dataTypes: [
        { type: "Email", count: 3, locations: ["Newsletter", "Contato", "Cadastro"] },
        { type: "CPF", count: 1, locations: ["Cadastro"] },
        { type: "Telefone", count: 2, locations: ["Contato", "Suporte"] },
        { type: "Nome completo", count: 4, locations: ["Newsletter", "Contato", "Cadastro", "Comentários"] }
      ]
    });

    setIsScanning(false);
    
    toast({
      title: "Scan concluído!",
      description: "Vulnerabilidades LGPD detectadas. Veja o relatório completo abaixo.",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-600 bg-red-50 border-red-200";
      case "warning": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "info": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return <AlertTriangle className="h-4 w-4" />;
      case "warning": return <AlertTriangle className="h-4 w-4" />;
      case "info": return <CheckCircle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
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
            <Button variant="ghost" onClick={() => navigate("/pricing")}>Preços</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Scan Input */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSearch className="h-6 w-6 text-blue-600" />
              Scanner LGPD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="https://seusite.com.br"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
                disabled={isScanning}
              />
              <Button 
                onClick={handleStartScan}
                disabled={isScanning}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {isScanning ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Escaneando...
                  </>
                ) : (
                  <>
                    <FileSearch className="h-4 w-4 mr-2" />
                    Iniciar Scan
                  </>
                )}
              </Button>
            </div>
            
            {isScanning && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progresso do scan</span>
                  <span className="text-sm font-medium">{Math.round(scanProgress)}%</span>
                </div>
                <Progress value={scanProgress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scan Results */}
        {scanResults && (
          <div className="space-y-6">
            {/* Overview */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-6 w-6 text-blue-600" />
                    Resultado do Scan
                  </CardTitle>
                  <Badge variant={scanResults.overallScore >= 80 ? "default" : "destructive"}>
                    Score: {scanResults.overallScore}/100
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">URL Escaneada</h4>
                    <p className="text-sm text-gray-600 mb-4">{scanResults.url}</p>
                    
                    <h4 className="font-semibold mb-2">Resumo de Issues</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Críticos</span>
                        <Badge variant="destructive">
                          {scanResults.issues.filter((i: any) => i.severity === "critical").length}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Atenção</span>
                        <Badge variant="secondary">
                          {scanResults.issues.filter((i: any) => i.severity === "warning").length}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Informativos</span>
                        <Badge variant="outline">
                          {scanResults.issues.filter((i: any) => i.severity === "info").length}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Tipos de Dados Encontrados</h4>
                    <div className="space-y-2">
                      {scanResults.dataTypes.map((dataType: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{dataType.type}</span>
                          <Badge variant="outline">{dataType.count} campos</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Issues Detail */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  Vulnerabilidades Detectadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scanResults.issues.map((issue: any, index: number) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${getSeverityColor(issue.severity)}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getSeverityIcon(issue.severity)}
                          <h4 className="font-semibold">{issue.title}</h4>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {issue.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                      <p className="text-xs text-gray-500 mb-3">
                        <strong>Local:</strong> {issue.location}
                      </p>
                      <div className="bg-white/50 p-3 rounded border">
                        <p className="text-xs font-medium text-gray-700 mb-1">Recomendação:</p>
                        <p className="text-xs text-gray-600">{issue.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Próximos Passos</h3>
                  <p className="text-gray-600 mb-4">
                    Corrija as vulnerabilidades encontradas e monitore continuamente sua conformidade LGPD
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button onClick={() => navigate("/dashboard")}>
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Dashboard
                    </Button>
                    <Button variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar Relatório
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scan;
