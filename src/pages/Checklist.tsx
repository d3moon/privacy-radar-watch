
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Download,
  Users,
  Database,
  Mail
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Checklist = () => {
  const navigate = useNavigate();
  
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const checklistSections = [
    {
      title: "Coleta e Consentimento",
      icon: Users,
      items: [
        {
          id: "consent_checkbox",
          title: "Checkbox de consentimento em formulários",
          description: "Todos os formulários que coletam dados pessoais possuem checkbox de consentimento LGPD",
          priority: "critical"
        },
        {
          id: "clear_purpose",
          title: "Finalidade clara da coleta",
          description: "É informado claramente para que os dados serão utilizados",
          priority: "critical"
        },
        {
          id: "minimal_data",
          title: "Coleta mínima de dados",
          description: "Apenas dados necessários para a finalidade são coletados",
          priority: "warning"
        }
      ]
    },
    {
      title: "Armazenamento e Segurança",
      icon: Database,
      items: [
        {
          id: "data_encryption",
          title: "Criptografia de dados sensíveis",
          description: "Dados pessoais sensíveis são criptografados no banco de dados",
          priority: "critical"
        },
        {
          id: "access_control",
          title: "Controle de acesso",
          description: "Apenas pessoas autorizadas têm acesso aos dados pessoais",
          priority: "critical"
        },
        {
          id: "backup_security",
          title: "Segurança de backups",
          description: "Backups com dados pessoais são protegidos e criptografados",
          priority: "warning"
        }
      ]
    },
    {
      title: "Políticas e Documentação",
      icon: FileText,
      items: [
        {
          id: "privacy_policy",
          title: "Política de privacidade atualizada",
          description: "Política de privacidade existe e está atualizada com a LGPD",
          priority: "critical"
        },
        {
          id: "data_retention",
          title: "Política de retenção de dados",
          description: "Definido por quanto tempo os dados serão armazenados",
          priority: "warning"
        },
        {
          id: "incident_plan",
          title: "Plano de resposta a incidentes",
          description: "Procedimentos definidos para vazamentos de dados",
          priority: "info"
        }
      ]
    },
    {
      title: "Direitos dos Titulares",
      icon: Mail,
      items: [
        {
          id: "data_access",
          title: "Mecanismo de acesso aos dados",
          description: "Usuários podem solicitar acesso aos seus dados pessoais",
          priority: "critical"
        },
        {
          id: "data_deletion",
          title: "Exclusão de dados",
          description: "Processo para exclusão de dados pessoais quando solicitado",
          priority: "critical"
        },
        {
          id: "data_portability",
          title: "Portabilidade de dados",
          description: "Usuários podem exportar seus dados em formato estruturado",
          priority: "warning"
        }
      ]
    }
  ];

  const handleItemCheck = (itemId: string, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: checked
    }));
  };

  const totalItems = checklistSections.reduce((sum, section) => sum + section.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const completionPercentage = Math.round((checkedCount / totalItems) * 100);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-700 border-red-200";
      case "warning": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "info": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "critical": return "Crítico";
      case "warning": return "Importante";
      case "info": return "Recomendado";
      default: return "Normal";
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
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Checklist de Conformidade LGPD</h1>
          <p className="text-gray-600 mb-6">
            Verifique se sua empresa está em conformidade com a Lei Geral de Proteção de Dados
          </p>

          {/* Progress Card */}
          <Card className="bg-gradient-to-r from-white to-blue-50/50 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Progresso da Conformidade</h3>
                  <p className="text-gray-600">
                    {checkedCount} de {totalItems} itens concluídos
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    {completionPercentage}%
                  </div>
                  <Badge variant={completionPercentage >= 80 ? "default" : "destructive"}>
                    {completionPercentage >= 80 ? "Boa conformidade" : "Atenção necessária"}
                  </Badge>
                </div>
              </div>
              <Progress value={completionPercentage} className="h-3" />
            </CardContent>
          </Card>
        </div>

        {/* Checklist Sections */}
        <div className="space-y-6">
          {checklistSections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <section.icon className="h-6 w-6 text-blue-600" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={item.id} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50/50">
                      <Checkbox
                        id={item.id}
                        checked={checkedItems[item.id] || false}
                        onCheckedChange={(checked) => handleItemCheck(item.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <label 
                            htmlFor={item.id}
                            className="font-medium cursor-pointer"
                          >
                            {item.title}
                          </label>
                          <Badge className={getPriorityColor(item.priority)}>
                            {getPriorityText(item.priority)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      {checkedItems[item.id] && (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">
                {completionPercentage >= 80 
                  ? "Parabéns! Sua conformidade está boa" 
                  : "Continue melhorando sua conformidade LGPD"
                }
              </h3>
              <div className="flex justify-center gap-4">
                <Button onClick={() => navigate("/scan")}>
                  <Shield className="h-4 w-4 mr-2" />
                  Escanear Site
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Checklist
                </Button>
                <Button variant="outline" onClick={() => navigate("/dashboard")}>
                  Ver Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="mt-6 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              Dicas Importantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Itens Críticos</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Consentimento explícito é obrigatório</li>
                  <li>• Dados sensíveis devem ser criptografados</li>
                  <li>• Política de privacidade deve existir</li>
                  <li>• Usuários devem poder excluir seus dados</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Boas Práticas</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Documente todos os processos</li>
                  <li>• Monitore regularmente</li>
                  <li>• Treine sua equipe sobre LGPD</li>
                  <li>• Mantenha backups seguros</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checklist;
