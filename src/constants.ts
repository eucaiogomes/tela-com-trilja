import { Course } from './types';

export const MOCK_COURSE: Course = {
  id: '1',
  title: 'Configurando o seu Movidesk',
  image: 'https://picsum.photos/seed/movidesk/800/450',
  progress: 21.43,
  modules: [
    {
      id: 'm1',
      title: 'Introdução',
      lessons: [
        { 
          id: 'l1', 
          title: 'Boas-vindas', 
          duration: '05:00', 
          type: 'video', 
          completed: true, 
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          description: 'Seja bem-vindo ao curso de configuração do Movidesk!'
        },
        { 
          id: 'l2', 
          title: 'Visão Geral', 
          duration: '08:00', 
          type: 'video', 
          completed: true, 
          videoUrl: 'https://www.w3schools.com/html/movie.mp4',
          description: 'Uma visão geral de todas as funcionalidades que vamos cobrir.'
        },
        { 
          id: 'l3', 
          title: 'Manual de Trilhas', 
          duration: '02:00', 
          type: 'document', 
          completed: false,
          description: 'Documento PDF com o guia completo das trilhas de aprendizagem.'
        },
      ],
    },
    {
      id: 'm2',
      title: 'Aprovação de Tickets',
      lessons: [
        { 
          id: 'l4', 
          title: 'Fluxo de Aprovação', 
          duration: '10:00', 
          type: 'video', 
          completed: false,
          description: 'Como configurar e gerenciar fluxos de aprovação de tickets.'
        },
      ],
    },
    {
      id: 'm3',
      title: 'Base de Conhecimento',
      lessons: [
        { 
          id: 'l5', 
          title: 'Criando Artigos', 
          duration: '12:00', 
          type: 'video', 
          completed: false,
          description: 'Passo a passo para criar e organizar sua base de conhecimento.'
        },
      ],
    },
    {
      id: 'm4',
      title: 'Contrato de Horas',
      lessons: [
        { 
          id: 'l6', 
          title: 'Contrato', 
          duration: '15:00', 
          type: 'video', 
          completed: false, 
          lastVisited: true,
          description: 'Tipo: Vídeo\nEntenda como funcionam os contratos de horas no sistema.'
        },
        { 
          id: 'l7', 
          title: 'Até Aqui...', 
          type: 'evaluation', 
          completed: false,
          description: 'Tipo: Avaliação de reação\nNão iniciou\nAntes de continuarmos com o conteúdo, gostaríamos de saber como está sendo sua experiência conosco nesse curso!?'
        },
      ],
    },
    {
      id: 'm5',
      title: 'Apontamento de Horas',
      lessons: [],
    },
    {
      id: 'm6',
      title: 'Agenda',
      lessons: [],
    },
    {
      id: 'm7',
      title: 'Despesas',
      lessons: [],
    },
  ],
};
