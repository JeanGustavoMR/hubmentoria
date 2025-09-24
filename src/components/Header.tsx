import React, { useState } from 'react';
import { Search, Bell, User, Menu, X, Play, Star, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { User as UserType } from '@/types';

interface HeaderProps {
  user: UserType;
  onSearch?: (query: string) => void;
  onNavigate?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onSearch, onNavigate }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Início', path: '/', icon: Play },
    { label: 'Meus Cursos', path: '/my-courses', icon: Star },
    { label: 'Categorias', path: '/categories', icon: Menu }
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onNavigate?.('/')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <span className="text-sm font-bold text-primary-foreground">M</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                MentorIA
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => onNavigate?.(item.path)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Buscar cursos..."
                    className="w-64 bg-background-elevated border-border/50 focus:border-primary"
                    onChange={(e) => onSearch?.(e.target.value)}
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden md:flex"
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon-sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-accent rounded-full animate-pulse" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {user.role === 'master_admin' ? 'Admin' : 
                         user.role === 'mentor' ? 'Mentor' : 'Executivo'}
                      </Badge>
                      {user.plan && (
                        <Badge variant="outline" className="text-xs border-accent/50">
                          {user.plan}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background-elevated border-border/50">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem onClick={() => onNavigate?.('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate?.('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </DropdownMenuItem>
                {user.role === 'master_admin' && (
                  <>
                    <DropdownMenuSeparator className="bg-border/50" />
                    <DropdownMenuItem onClick={() => onNavigate?.('/admin')}>
                      <Menu className="mr-2 h-4 w-4" />
                      Painel Admin
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem className="text-destructive">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg md:hidden">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  MentorIA
                </span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <nav className="flex-1 p-4 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      onNavigate?.(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-4 p-3 text-left hover:bg-muted-hover rounded-lg transition-colors"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};