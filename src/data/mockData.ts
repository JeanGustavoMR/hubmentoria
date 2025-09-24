import { Course, User, WatchProgress } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'Carlos Eduardo Silva',
  email: 'carlos@empresa.com',
  role: 'mentorado',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  cohort: 'Executive_2024_Q4',
  plan: 'Premium'
};

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Liderança Estratégica para CEOs',
    description: 'Desenvolva suas habilidades de liderança estratégica e tome decisões que transformam organizações.',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
    category: 'Liderança',
    mentor: {
      id: 'm1',
      name: 'Dr. Marina Oliveira',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face'
    },
    modules: [
      {
        id: 'mod1',
        title: 'Fundamentos da Liderança',
        description: 'Base conceitual da liderança moderna',
        courseId: '1',
        order: 1,
        lessons: [
          {
            id: 'les1',
            title: 'O que é Liderança Estratégica',
            description: 'Conceitos fundamentais e pilares da liderança estratégica',
            moduleId: 'mod1',
            order: 1,
            videoAsset: {
              id: 'vid1',
              title: 'O que é Liderança Estratégica',
              description: 'Introdução aos conceitos',
              thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
              duration: 1240, // 20min 40s
              hlsUrl: '/api/video/signed-url/vid1',
              createdAt: '2024-01-15'
            }
          },
          {
            id: 'les2',
            title: 'Visão Sistêmica nos Negócios',
            description: 'Como desenvolver uma visão ampla da organização',
            moduleId: 'mod1',
            order: 2,
            videoAsset: {
              id: 'vid2',
              title: 'Visão Sistêmica nos Negócios',
              description: 'Pensamento sistêmico',
              thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop',
              duration: 1580, // 26min 20s
              hlsUrl: '/api/video/signed-url/vid2',
              createdAt: '2024-01-16'
            }
          }
        ]
      }
    ],
    tags: ['CEO', 'Estratégia', 'Liderança'],
    difficulty: 'Avançado',
    cohorts: ['Executive_2024_Q4'],
    plans: ['Premium', 'Enterprise'],
    isPublished: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    title: 'Growth Hacking para Scaleups',
    description: 'Estratégias avançadas de crescimento para empresas em fase de expansão.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    category: 'Growth',
    mentor: {
      id: 'm2',
      name: 'Roberto Santos',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    },
    modules: [],
    tags: ['Growth', 'Marketing', 'Métricas'],
    difficulty: 'Intermediário',
    cohorts: ['Executive_2024_Q4', 'Growth_2024_Q4'],
    plans: ['Premium', 'Enterprise'],
    isPublished: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    title: 'Finanças Corporativas Avançadas',
    description: 'Gestão financeira estratégica e análise de investimentos para grandes corporações.',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop',
    category: 'Finanças',
    mentor: {
      id: 'm3',
      name: 'Ana Carolina Ferreira',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face'
    },
    modules: [],
    tags: ['CFO', 'Finanças', 'Investimentos'],
    difficulty: 'Avançado',
    cohorts: ['Executive_2024_Q4'],
    plans: ['Enterprise'],
    isPublished: true,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-15'
  }
];

export const mockWatchProgress: WatchProgress[] = [
  {
    userId: '1',
    lessonId: 'les1',
    progressPercentage: 75,
    lastWatchedAt: '2024-01-22T14:30:00Z',
    completed: false
  },
  {
    userId: '1', 
    lessonId: 'les2',
    progressPercentage: 100,
    lastWatchedAt: '2024-01-21T10:15:00Z',
    completed: true
  }
];

export const categories = [
  'Liderança',
  'Growth', 
  'Finanças',
  'Estratégia',
  'Inovação',
  'Marketing',
  'Operações'
];