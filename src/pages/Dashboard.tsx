
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  FileSearch, 
  Database,
  Mail,
  Plus,
  Eye,
  Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [complianceScore, setComplianceScore] = useState(0);
  
  useEffect(() => {
    // Animate score on mount
    const timer = setTimeout(() => setComplianceScore(73), 500);
    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return { text: "Boa conformidade", variant: "default" as const };
    if (score >= 60) return { text: "Atenção necessária", variant: "destructive" as const };
    return { text: "Risco alto", variant: "destructive" as const };
  };

  const recentScans = [
    { url: "https://minhaempresa.com.br", status: "completed", issues: 3, date: "2024-12-20" },
    { url: "https://app.minhaempresa.com.br/contato", status: "completed", issues: 1, date: "2024-12-19" },
    { url: "https://checkout.minhaempresa.com.br", status: "scanning", issues: 0, date: "2024-12-20" }
  ];

  const alerts = [
    { 
      type: "critical", 
      message: "CPF coletado sem consentimento explícito em /cadastro", 
      time: "2 horas atrás" 
    },
    { 
      type: "warning", 
      message: "Planilha com emails de clientes detectada em pasta pública", 
      time: "4 horas atrás" 
    },
    { 
      type: "info", 
      message: "Novo formulário detectado para análise em /newsletter", 
      time: "1 dia atrás" 
    }
  ];

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
            <Button variant="ghost" onClick={() => navigate("/pricing")}>Preços</Button>
            <Button onClick={() => navigate("/scan")}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Scan
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard de Conformidade LGPD</h1>
          <p className="text-gray-600">Monitore e mantenha sua empresa em conformidade com a Lei Geral de Proteção de Dados</p>
        </div>

        {/* Score Card */}
        <Card className="mb-8 bg-gradient-to-r from-white to-blue-50/50 border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                Score de Conformidade LGPD
              </CardTitle>
              <Badge {...getScoreStatus(complianceScore)}>
                {getScoreStatus(complianceScore).text}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className={`text-4xl font-bold ${getScoreColor(complianceScore)}`}>
                    {complianceScore}
                  </span>
                  <span className="text-gray-500">/100</span>
                </div>
                <Progress value={complianceScore} className="h-3 mb-4" />
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    12 verificações OK
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    3 atenções
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    2 críticos
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Button onClick={() => navigate("/scan")}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Melhorar Score
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">URLs Escaneadas</CardTitle>
              <FileSearch className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 desde ontem</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dados Sensíveis</CardTitle>
              <Database className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">Encontrados esta semana</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
              <Mail className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 críticos</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Scans */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Scans Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentScans.map((scan, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{scan.url}</p>
                      <p className="text-xs text-gray-500">{scan.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {scan.status === "completed" ? (
                        <Badge variant={scan.issues > 0 ? "destructive" : "default"}>
                          {scan.issues} issues
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Escaneando...</Badge>
                      )}
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" onClick={() => navigate("/scan")}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Scan
              </Button>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Alertas Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50/50">
                    <div className="mt-0.5">
                      {alert.type === "critical" && <AlertTriangle className="h-4 w-4 text-red-600" />}
                      {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                      {alert.type === "info" && <CheckCircle className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Ver Todos os Alertas
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="h-auto p-6 flex-col gap-2" onClick={() => navigate("/scan")}>
                <FileSearch className="h-6 w-6" />
                <span>Escanear Site</span>
              </Button>
              <Button variant="outline" className="h-auto p-6 flex-col gap-2">
                <Download className="h-6 w-6" />
                <span>Relatório PDF</span>
              </Button>
              <Button variant="outline" className="h-auto p-6 flex-col gap-2" onClick={() => navigate("/checklist")}>
                <CheckCircle className="h-6 w-6" />
                <span>Checklist LGPD</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
