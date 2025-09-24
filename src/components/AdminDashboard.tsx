import React, { useState } from 'react';
import { 
  Users, 
  Play, 
  Upload, 
  BarChart3, 
  Settings, 
  Calendar, 
  Shield,
  Eye,
  EyeOff,
  Lock,
  Unlock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { mockCourses, mockUser } from '@/data/mockData';
import { Course } from '@/types';

export const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'courses' | 'upload' | 'users' | 'analytics'>('overview');
  const [courses, setCourses] = useState<Course[]>(mockCourses);

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'courses', label: 'Cursos', icon: Play },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ] as const;

  const toggleCoursePublication = (courseId: string) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, isPublished: !course.isPublished }
        : course
    ));
  };

  const handleCourseVisibilityToggle = (courseId: string, cohort: string) => {
    // In real app, this would update course visibility settings
    console.log(`Toggling visibility for course ${courseId}, cohort ${cohort}`);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Total de Cursos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{courses.length}</div>
            <div className="text-sm text-success">+2 este mês</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Cursos Publicados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {courses.filter(c => c.isPublished).length}
            </div>
            <div className="text-sm text-accent">Ativos agora</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Executivos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">247</div>
            <div className="text-sm text-success">+15% vs mês anterior</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Horas Assistidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1.2k</div>
            <div className="text-sm text-accent">Esta semana</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="premium" className="h-20 flex-col gap-2">
              <Upload className="h-6 w-6" />
              Novo Upload
            </Button>
            <Button variant="secondary" className="h-20 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              Agendar Publicação
            </Button>
            <Button variant="secondary" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              Gerenciar Coortes
            </Button>
            <Button variant="secondary" className="h-20 flex-col gap-2">
              <Shield className="h-6 w-6" />
              Auditoria
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestão de Cursos</h2>
        <Button variant="premium">
          <Upload className="mr-2 h-4 w-4" />
          Novo Curso
        </Button>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <Card key={course.id} className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-24 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <p className="text-muted-foreground text-sm">{course.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={course.isPublished ? "default" : "secondary"}>
                        {course.isPublished ? "Publicado" : "Rascunho"}
                      </Badge>
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Por {course.mentor.name}</span>
                    <span>•</span>
                    <span>{course.modules.length} módulos</span>
                    <span>•</span>
                    <span>Atualizado em {new Date(course.updatedAt).toLocaleDateString('pt-BR')}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Publicado:</span>
                        <Switch
                          checked={course.isPublished}
                          onCheckedChange={() => toggleCoursePublication(course.id)}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        {course.cohorts.map(cohort => (
                          <Badge key={cohort} variant="secondary" className="text-xs">
                            {cohort}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleCourseVisibilityToggle(course.id, course.cohorts[0])}
                      >
                        {course.isPublished ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Upload de Novo Conteúdo</h2>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Informações do Curso</CardTitle>
            <CardDescription>Defina os metadados e configurações básicas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Título do Curso</label>
              <Input placeholder="Ex: Liderança Estratégica Avançada" />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Descrição</label>
              <Textarea placeholder="Descreva o conteúdo e objetivos do curso..." />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Categoria</label>
              <select className="w-full p-2 border border-border rounded-md bg-background">
                <option>Liderança</option>
                <option>Growth</option>
                <option>Finanças</option>
                <option>Estratégia</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Nível de Dificuldade</label>
              <select className="w-full p-2 border border-border rounded-md bg-background">
                <option>Iniciante</option>
                <option>Intermediário</option>
                <option>Avançado</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Upload de Vídeo</CardTitle>
            <CardDescription>Envie o arquivo de vídeo para processamento HLS</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-2">Arraste o arquivo de vídeo aqui</p>
              <p className="text-sm text-muted-foreground mb-4">ou clique para selecionar</p>
              <Button variant="outline">Selecionar Arquivo</Button>
            </div>
            
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Formatos suportados: MP4, MOV, AVI</p>
              <p>• Tamanho máximo: 5GB</p>
              <p>• Resolução recomendada: 1080p ou superior</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Configurações de Acesso</CardTitle>
          <CardDescription>Defina quem pode acessar este conteúdo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Coortes Permitidas</label>
              <div className="space-y-2">
                {['Executive_2024_Q4', 'Growth_2024_Q4', 'Leadership_Advanced'].map(cohort => (
                  <div key={cohort} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{cohort}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Planos de Assinatura</label>
              <div className="space-y-2">
                {['Premium', 'Enterprise', 'Executive'].map(plan => (
                  <div key={plan} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{plan}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <Button variant="premium" size="lg">
              Fazer Upload e Processar
            </Button>
            <Button variant="secondary" size="lg">
              Salvar Rascunho
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return renderOverview();
      case 'courses':
        return renderCourses();
      case 'upload':
        return renderUpload();
      case 'users':
        return <div className="p-8 text-center text-muted-foreground">Gestão de usuários em desenvolvimento...</div>;
      case 'analytics':
        return <div className="p-8 text-center text-muted-foreground">Dashboard de analytics em desenvolvimento...</div>;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background-elevated">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">Painel de controle MentorIA</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-accent/50">
                {mockUser.role === 'master_admin' ? 'Master Admin' : 'Admin'}
              </Badge>
              <div className="text-right">
                <p className="font-medium">{mockUser.name}</p>
                <p className="text-sm text-muted-foreground">Último acesso: hoje</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted-hover text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};