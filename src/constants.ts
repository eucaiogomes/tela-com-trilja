import { Course } from './types';

export const MOCK_COURSE: Course = {
  id: '1',
  title: 'Configurando o seu Movidesk',
  image: 'https://picsum.photos/seed/movidesk/800/450',
  progress: 21.43,
  performance: 100,
  modules: [
    {
      id: 'm1',
      title: 'Introdução',
      lessons: [
        { 
          id: 'l1', 
          title: 'Boas-vindas', 
          type: 'video', 
          status: 'completed',
          completed: true, 
          videoUrl: 'https://www.youtube.com/embed/-QDkKLqWX9o',
          description: 'Seja bem-vindo ao curso de configuração do Movidesk!',
          content: 'Nesta aula de boas-vindas, vamos explorar os objetivos deste treinamento e como você pode tirar o melhor proveito de cada módulo para configurar sua plataforma Movidesk com sucesso.'
        },
        { 
          id: 'l2', 
          title: 'Visão Geral', 
          type: 'video', 
          status: 'completed',
          completed: true, 
          videoUrl: 'https://www.w3schools.com/html/movie.mp4',
          description: 'Uma visão geral de todas as funcionalidades que vamos cobrir.'
        },
        { 
          id: 'l3', 
          title: 'Manual de Trilhas', 
          type: 'document', 
          status: 'in-progress',
          completed: false,
          fileUrl: '/ebook_tecnologia_ead_styled.pdf',
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
          title: 'Treinamento de Fluxos', 
          type: 'training', 
          status: 'not-viewed',
          completed: false,
          description: 'Um treinamento completo sobre fluxos de aprovação.',
          lessons: [
            { id: 'l4-1', title: 'Documento de Referência', type: 'document', completed: false, status: 'not-viewed' },
            { id: 'l4-2', title: 'Vídeo da Aula', type: 'video', completed: false, status: 'not-viewed' },
            { id: 'l4-3', title: 'Live de Dúvidas', type: 'webconference', completed: false, status: 'not-viewed' },
          ]
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
          type: 'webconference', 
          status: 'not-viewed',
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
          title: 'Contrato Presencial', 
          type: 'in-person', 
          status: 'not-viewed',
          completed: false, 
          description: 'Tipo: Aula Presencial\nEntenda como funcionam os contratos de horas no sistema.'
        },
        { 
          id: 'l7', 
          title: 'Avaliação de Desempenho', 
          type: 'evaluation', 
          status: 'not-viewed',
          completed: false,
          description: 'Tipo: Avaliação de reação\nNão iniciou\nAntes de continuarmos com o conteúdo, gostaríamos de saber como está sendo sua experiência conosco nesse curso!?'
        },
        { 
          id: 'l8', 
          title: 'Gravação da Mentoria', 
          type: 'recording', 
          status: 'not-viewed',
          completed: false,
          description: 'Gravação da última mentoria sobre contratos.'
        },
      ],
    },
  ],
};
