
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, FileSearch, Database, Mail, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");

  const handleGetStarted = () => {
    if (!email) {
      toast({
        title: "Email obrigatório",
        description: "Digite seu email para começar o scan gratuito",
        variant: "destructive",
      });
      return;
    }
    navigate("/dashboard");
  };

  const handleQuickScan = () => {
    if (!url) {
      toast({
        title: "URL obrigatória",
        description: "Digite a URL do seu site para escanear",
        variant: "destructive",
      });
      return;
    }
    navigate(`/scan?url=${encodeURIComponent(url)}`);
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
            <Button variant="ghost" onClick={() => navigate("/pricing")}>Preços</Button>
            <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-6 bg-red-100 text-red-700 border-red-200 hover:bg-red-100">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Risco LGPD Detectado
        </Badge>
        
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
          Você não vai saber que vazou dados
          <br />
          <span className="text-red-600">até a multa chegar</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          O LGPDWatch encontra e te avisa antes. Monitore sua aplicação, formulários e banco de dados 
          em busca de dados pessoais sensíveis com alertas em tempo real.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-12">
          <Input
            placeholder="Digite a URL do seu site"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleQuickScan} size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <FileSearch className="h-4 w-4 mr-2" />
            Escanear Grátis
          </Button>
        </div>

        <p className="text-sm text-gray-500 mb-16">
          ✓ Scan gratuito • ✓ Sem cartão • ✓ Resultado em 30 segundos
        </p>
      </section>

      {/* Problem Section */}
      <section className="bg-white/60 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Sua empresa está em risco?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pequenas empresas estão expostas à LGPD sem nem saber. Veja os riscos mais comuns:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Database,
                title: "Dados sem controle",
                description: "CPF, email e telefone armazenados sem política de retenção",
                risk: "Alto"
              },
              {
                icon: FileSearch,
                title: "Vazamentos comuns",
                description: "Planilhas e backups expostos no GDrive ou S3 público",
                risk: "Crítico"
              },
              {
                icon: AlertTriangle,
                title: "Multa de até 2%",
                description: "Do faturamento anual por não conformidade com LGPD",
                risk: "Financeiro"
              }
            ].map((item, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <item.icon className="h-8 w-8 text-red-600" />
                    <Badge variant="destructive">{item.risk}</Badge>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Como o LGPDWatch protege sua empresa</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Monitoramento automático e alertas em tempo real para manter sua empresa em conformidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FileSearch,
                title: "Scanner Web",
                description: "Identifica coleta de dados pessoais em formulários e páginas"
              },
              {
                icon: Database,
                title: "Análise de BD",
                description: "Escaneia MySQL, PostgreSQL e Firebase em busca de dados sensíveis"
              },
              {
                icon: Shield,
                title: "Monitoramento",
                description: "Detecta vazamentos de arquivos públicos e backups expostos"
              },
              {
                icon: Mail,
                title: "Alertas",
                description: "Notificações em tempo real via email ou webhook"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 rounded-lg bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Comece seu monitoramento LGPD agora
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Escaneie seu site gratuitamente e descubra vulnerabilidades em 30 segundos
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Seu email profissional"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70"
            />
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Começar Grátis
            </Button>
          </div>
          
          <p className="text-sm mt-4 opacity-75">
            ✓ Setup em 2 minutos • ✓ Sem compromisso • ✓ Suporte em português
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LGPDWatch
              </span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <button onClick={() => navigate("/pricing")}>Preços</button>
              <button onClick={() => navigate("/dashboard")}>Dashboard</button>
              <a href="mailto:contato@lgpdwatch.com">Contato</a>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
            <p>© 2024 LGPDWatch. Protegendo empresas brasileiras da LGPD.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
