import React, { useState, useEffect } from 'react';
import { X, Play, Star, Settings, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WelcomeOverlayProps {
  onDismiss: () => void;
  userRole: string;
}

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ onDismiss, userRole }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const features = [
    {
      icon: Play,
      title: "Catálogo Netflix-Style",
      description: "Interface elegante com navegação intuitiva, busca e categorias organizadas",
      demo: "Explore os cursos abaixo"
    },
    {
      icon: Star,
      title: "Sistema de Progresso",
      description: "Acompanhe seu progresso, marque favoritos e continue de onde parou",
      demo: "Clique no ❤️ dos cards para favoritar"
    },
    {
      icon: Settings,
      title: "RBAC Completo",
      description: "Controle de acesso por roles, coortes e planos de assinatura",
      demo: userRole === 'master_admin' ? "Acesse o Admin Dashboard pelo menu" : "Você tem acesso como executivo"
    },
    {
      icon: Upload,
      title: "Gestão de Conteúdo",
      description: "Upload, organização e controle de visibilidade do conteúdo",
      demo: userRole === 'master_admin' ? "Disponível no painel admin" : "Apenas para administradores"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [features.length]);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-gradient-card border-primary/20 shadow-glow animate-scale-in">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <span className="text-lg font-bold text-primary-foreground">M</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                MentorIA
              </span>
            </div>
            <Button variant="ghost" size="icon-sm" onClick={onDismiss}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <CardTitle className="text-3xl mb-2">
            Bem-vindo ao MentorIA! 🚀
          </CardTitle>
          <CardDescription className="text-lg">
            Plataforma Premium de Mentoria Executiva
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Role Badge */}
          <div className="flex justify-center">
            <Badge variant="secondary" className="px-4 py-2 bg-gradient-primary text-primary-foreground border-primary/20">
              {userRole === 'master_admin' ? '👑 Master Admin' : 
               userRole === 'mentor' ? '🎓 Mentor' : '💼 Executivo Premium'}
            </Badge>
          </div>

          {/* Features Showcase */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = currentStep === index;
              
              return (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border transition-all duration-500 ${
                    isActive 
                      ? 'border-primary/50 bg-primary/5 shadow-md' 
                      : 'border-border/30 bg-background-elevated/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg transition-colors ${
                      isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold transition-colors ${
                        isActive ? 'text-primary' : 'text-foreground'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {feature.description}
                      </p>
                      <p className={`text-sm font-medium transition-colors ${
                        isActive ? 'text-accent' : 'text-muted-foreground'
                      }`}>
                        💡 {feature.demo}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  currentStep === index ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={onDismiss}
              className="flex-1"
            >
              <Play className="mr-2 h-5 w-5" />
              Começar Exploração
            </Button>
            
            {userRole === 'master_admin' && (
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => window.location.href = '/admin'}
                className="flex-1"
              >
                <Settings className="mr-2 h-5 w-5" />
                Painel Admin
              </Button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{userRole === 'master_admin' ? '247' : '12'}</div>
              <div className="text-sm text-muted-foreground">
                {userRole === 'master_admin' ? 'Executivos' : 'Cursos'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">1.2k</div>
              <div className="text-sm text-muted-foreground">Horas de Conteúdo</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">4.9</div>
              <div className="text-sm text-muted-foreground">Avaliação</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};