/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Folder, 
  PlayCircle, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Info,
  Award,
  BarChart3,
  Monitor,
  Bell,
  MessageSquare,
  Search,
  Users,
  Eye,
  ArrowLeft,
  Download,
  ExternalLink,
  Menu,
  ChevronLeft,
  Video,
  Mic,
  Package,
  ClipboardCheck,
  FileDown,
  List
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Course, Lesson } from './types';
import { MOCK_COURSE } from './constants';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell 
} from 'recharts';

const PERFORMANCE_DATA = [
  { name: 'Módulo 1', score: 100 },
  { name: 'Módulo 2', score: 85 },
  { name: 'Módulo 3', score: 90 },
  { name: 'Módulo 4', score: 21 },
  { name: 'Módulo 5', score: 0 },
];

export default function App() {
  const [course, setCourse] = useState<Course>(MOCK_COURSE);
  const [activeTab, setActiveTab] = useState('trilhas');
  const [mainNav, setMainNav] = useState<'trilhas' | 'treinamentos' | 'trilha2'>('trilhas');
  const [trainingSidebarTab, setTrainingSidebarTab] = useState<'conteudo' | 'desempenho' | 'info'>('conteudo');
  const [isTrainingSidebarOpen, setIsTrainingSidebarOpen] = useState(true);
  const [lessonInfoTab, setLessonInfoTab] = useState<'descricao' | 'resumo' | 'material' | 'autor'>('descricao');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const closeLesson = () => {
    setSelectedLesson(null);
  };

  const toggleLessonComplete = (lessonId: string) => {
    setCourse(prevCourse => {
      const newModules = prevCourse.modules.map(module => ({
        ...module,
        lessons: module.lessons.map(lesson => {
          if (lesson.id === lessonId) {
            const updated = { ...lesson, completed: !lesson.completed };
            if (selectedLesson?.id === lessonId) {
              setSelectedLesson(updated);
            }
            return updated;
          }
          if (lesson.type === 'training' && lesson.lessons) {
            const updatedSubLessons = lesson.lessons.map(sub => {
              if (sub.id === lessonId) {
                const subUpdated = { ...sub, completed: !sub.completed };
                if (selectedLesson?.id === lessonId) {
                  setSelectedLesson(subUpdated);
                }
                return subUpdated;
              }
              return sub;
            });
            return { ...lesson, lessons: updatedSubLessons };
          }
          return lesson;
        })
      }));
      return { ...prevCourse, modules: newModules };
    });
  };

  return (
    <div className="min-h-screen bg-app-background font-sans text-app-on-surface">
      {/* Header (Navbar) */}
      <header className={cn(
          "z-50 w-full transition-all duration-300",
          selectedLesson && (mainNav === 'treinamentos' || mainNav === 'trilha2') 
          ? "md:fixed md:top-0 md:left-0 md:right-0 md:h-2 md:group sticky top-0 bg-[#00254e] border-b border-white/10 shadow-sm" 
          : "sticky top-0 bg-[#00254e] border-b border-white/10 shadow-sm"
        )}>
          <div className={cn(
            "px-4 md:px-6 py-2 flex items-center justify-between transition-all duration-300",
            selectedLesson && (mainNav === 'treinamentos' || mainNav === 'trilha2') 
            ? "md:absolute md:top-0 md:left-0 md:right-0 md:-translate-y-full md:group-hover:translate-y-0 md:shadow-2xl bg-[#00254e]" 
            : "bg-[#00254e]"
          )}>
        <div className="flex items-center gap-4 md:gap-8">
          {/* Logo */}
          <div className="text-white font-bold text-lg md:text-xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-app-tertiary rounded flex items-center justify-center">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            Lector
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            <button 
              onClick={() => setMainNav('trilhas')}
              className={cn(
                "px-4 py-2 rounded-lg font-semibold text-sm transition-colors",
                mainNav === 'trilhas' ? "bg-white/10 text-app-tertiary" : "text-app-on-primary-container hover:text-white"
              )}
            >
              Trilhas
            </button>
            <button 
              onClick={() => setMainNav('treinamentos')}
              className={cn(
                "px-4 py-2 rounded-lg font-semibold text-sm transition-colors",
                mainNav === 'treinamentos' ? "bg-white/10 text-app-tertiary" : "text-app-on-primary-container hover:text-white"
              )}
            >
              Treinamentos
            </button>
            <button 
              onClick={() => setMainNav('trilha2')}
              className={cn(
                "px-4 py-2 rounded-lg font-semibold text-sm transition-colors",
                mainNav === 'trilha2' ? "bg-white/10 text-app-tertiary" : "text-app-on-primary-container hover:text-white"
              )}
            >
              Trilha 2
            </button>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 md:mx-8 hidden lg:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-on-primary-container group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              placeholder="Pesquisar trilhas..." 
              className="w-full bg-white/10 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-app-on-primary-container focus:outline-none focus:ring-2 focus:ring-app-tertiary/50 focus:bg-white/20 transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <button className="p-2 text-app-on-primary-container hover:text-white hover:bg-white/10 rounded-lg transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 md:w-4 md:h-4 bg-app-tertiary text-white text-[9px] md:text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#00254e]">
              3
            </span>
          </button>
          <button className="p-2 text-app-on-primary-container hover:text-white hover:bg-white/10 rounded-lg transition-all">
            <MessageSquare className="w-5 h-5" />
          </button>
          <div className="ml-1 md:ml-2 w-8 h-8 md:w-9 md:h-9 bg-app-tertiary rounded-lg flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg shadow-app-tertiary/20">
            CG
          </div>
        </div>
      </div>
      </header>

      {/* Breadcrumbs */}
      {!(selectedLesson && (mainNav === 'treinamentos' || mainNav === 'trilha2')) && (
        <div className="px-4 md:px-6 py-3 bg-app-surface border-b border-app-outline-variant overflow-x-auto scrollbar-none">
          <div className="min-w-max">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="flex items-center gap-1 text-app-on-surface-variant hover:text-app-tertiary">
                    <Home className="w-4 h-4" />
                    Início
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4 text-app-outline-variant" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/sala-de-aula" className="text-app-on-surface-variant hover:text-app-tertiary">
                    Sala de Aula
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4 text-app-outline-variant" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); closeLesson(); }}
                    className={cn(
                      "text-app-on-surface-variant hover:text-app-tertiary",
                      !selectedLesson && "font-medium text-app-on-surface pointer-events-none"
                    )}
                  >
                    {course.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {selectedLesson && (
                  <>
                    <BreadcrumbSeparator>
                      <ChevronRight className="w-4 h-4 text-app-outline-variant" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="font-medium text-app-on-surface">
                        {selectedLesson?.title}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      )}

      <main className={cn(
        "mx-auto",
        selectedLesson && (mainNav === 'treinamentos' || mainNav === 'trilha2') ? "w-full p-0" : "max-w-[1400px] p-4 md:p-6"
      )}>
        <AnimatePresence mode="wait">
          {selectedLesson ? (
            (mainNav === 'treinamentos' || mainNav === 'trilha2') ? (
              <motion.div
                key="training-lesson-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-screen overflow-hidden bg-[#f8f9fa]"
              >
                {/* Sidebar */}
                <AnimatePresence initial={false}>
                  {isTrainingSidebarOpen && (
                    <motion.aside 
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 320, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                      className="hidden md:flex bg-white border-r border-app-outline-variant flex-col h-full shadow-xl z-20 overflow-hidden shrink-0"
                    >
                      <div className="w-[320px] flex flex-col h-full">
                        <div className="p-6 bg-[#00254e] text-white space-y-6">
                          <div className="space-y-4">
                            <button 
                              onClick={() => setIsTrainingSidebarOpen(false)}
                              className="p-1.5 bg-white/10 rounded transition-colors hover:bg-white/20"
                            >
                              <Menu className="w-5 h-5" />
                            </button>
                            <h2 className="font-bold text-lg leading-tight text-left font-heading tracking-tight">{course.title}</h2>
                          </div>
                    <div className="space-y-4">
                      {/* Progresso Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.1em] font-heading">
                          <span className="text-white/60">Progresso</span>
                          <span className="text-app-tertiary bg-app-tertiary/10 px-1.5 py-0.5 rounded font-heading">{course.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-app-tertiary transition-all duration-1000" 
                            style={{ width: `${course.progress}%` }} 
                          />
                        </div>
                      </div>

                      {/* Aproveitamento Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.1em] font-heading">
                          <span className="text-white/60">Aproveitamento</span>
                          <span className="text-app-tertiary bg-app-tertiary/10 px-1.5 py-0.5 rounded font-heading">{course.performance}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-app-tertiary transition-all duration-1000" 
                            style={{ width: `${course.performance}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex border-b border-app-outline-variant bg-app-surface font-heading">
                    <button 
                      onClick={() => setTrainingSidebarTab('conteudo')}
                      className={cn(
                        "flex-1 py-4 text-[10px] font-bold uppercase tracking-[0.1em] border-b-2 flex flex-col items-center gap-1.5 transition-colors font-heading",
                        trainingSidebarTab === 'conteudo' ? "border-app-tertiary text-app-tertiary" : "border-transparent text-app-on-surface-variant hover:text-app-on-surface"
                      )}
                    >
                      <Folder className="w-4 h-4" />
                      Conteúdo
                    </button>
                    <button 
                      onClick={() => setTrainingSidebarTab('desempenho')}
                      className={cn(
                        "flex-1 py-4 text-[10px] font-bold uppercase tracking-[0.1em] border-b-2 flex flex-col items-center gap-1.5 transition-colors font-heading",
                        trainingSidebarTab === 'desempenho' ? "border-app-tertiary text-app-tertiary" : "border-transparent text-app-on-surface-variant hover:text-app-on-surface"
                      )}
                    >
                      <BarChart3 className="w-4 h-4" />
                      Desempenho
                    </button>
                    <button 
                      onClick={() => setTrainingSidebarTab('info')}
                      className={cn(
                        "flex-1 py-4 text-[10px] font-bold uppercase tracking-[0.1em] border-b-2 flex flex-col items-center gap-1.5 transition-colors font-heading",
                        trainingSidebarTab === 'info' ? "border-app-tertiary text-app-tertiary" : "border-transparent text-app-on-surface-variant hover:text-app-on-surface"
                      )}
                    >
                      <Info className="w-4 h-4" />
                      Info
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-app-outline-variant bg-white">
                    {trainingSidebarTab === 'conteudo' ? (
                      mainNav === 'trilha2' ? (
                        <Accordion type="multiple" defaultValue={course.modules.map(m => m.id)} className="w-full border-none">
                          {course.modules.map((module, index) => {
                            const isModuleCompleted = module.lessons.every(lesson => {
                              if (lesson.type === 'training' && lesson.lessons) {
                                return lesson.lessons.every(sub => sub.completed);
                              }
                              return lesson.completed;
                            });

                            return (
                              <AccordionItem key={module.id} value={module.id} className="border-none relative">
                                {/* Linha da Trilha */}
                                {index < course.modules.length - 1 && (
                                  <div className="absolute left-[39px] top-12 bottom-0 w-0.5 bg-app-outline-variant/30 z-0" />
                                )}
                                <AccordionTrigger className="px-6 py-4 bg-gray-50/50 hover:bg-gray-100/50 hover:no-underline border-b border-app-outline-variant/10 group relative z-10">
                                  <div className="flex items-center gap-3 text-left">
                                    <div className={cn(
                                      "w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center text-[10px] font-bold transition-all shadow-sm",
                                      isModuleCompleted 
                                        ? "border-green-500 text-green-500 bg-green-50" 
                                        : "border-app-outline-variant text-app-on-surface-variant group-data-[state=open]:border-app-tertiary group-data-[state=open]:text-app-tertiary"
                                    )}>
                                      {index + 1}
                                    </div>
                                    <span className={cn(
                                      "text-xs font-bold uppercase tracking-widest font-heading",
                                      isModuleCompleted ? "text-green-600" : "text-app-on-surface"
                                    )}>{module.title}</span>
                                  </div>
                                </AccordionTrigger>
                              <AccordionContent className="p-0 border-b border-app-outline-variant/10">
                                {module.lessons.map((lesson) => (
                                  <div key={lesson.id}>
                                    {lesson.type === 'training' ? (
                                      <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="training-sub" className="border-none">
                                          <AccordionTrigger className="w-full px-8 py-4 hover:bg-app-background/50 hover:no-underline group/train">
                                            <div className="flex items-center gap-3">
                                              <div className="mt-1 shrink-0 text-[#eb6200]">
                                                 <PlayCircle className="w-5 h-5" />
                                              </div>
                                              <div className="text-left">
                                                <p className="text-sm font-bold text-app-on-surface group-hover/train:text-[#eb6200] transition-colors">{lesson.title}</p>
                                                <p className="text-[10px] font-bold text-app-on-surface-variant/40 uppercase tracking-widest">Treinamento</p>
                                              </div>
                                            </div>
                                          </AccordionTrigger>
                                          <AccordionContent className="p-0 bg-gray-50/30">
                                            {lesson.lessons?.map((subLesson) => (
                                              <button 
                                                key={subLesson.id}
                                                onClick={() => setSelectedLesson(subLesson)}
                                                className={cn(
                                                  "w-full py-3.5 pl-16 pr-6 text-left hover:bg-white transition-colors flex items-center gap-3 border-l-4 border-l-transparent",
                                                  selectedLesson?.id === subLesson.id ? "bg-white border-l-[#eb6200]" : ""
                                                )}
                                              >
                                                <div 
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleLessonComplete(subLesson.id);
                                                  }}
                                                  className={cn(
                                                    "shrink-0 cursor-pointer hover:scale-110 transition-transform",
                                                    selectedLesson?.id === subLesson.id ? "text-[#eb6200]" : subLesson.completed ? "text-green-500" : "text-app-on-surface-variant/30"
                                                  )}
                                                >
                                                  {subLesson.completed ? <CheckCircle2 className="w-4 h-4" /> : (subLesson.type === 'video' ? <PlayCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />)}
                                                </div>
                                                <span className={cn(
                                                  "text-xs font-medium truncate",
                                                  selectedLesson?.id === subLesson.id ? "text-app-on-surface font-bold" : "text-app-on-surface-variant"
                                                )}>{subLesson.title}</span>
                                              </button>
                                            ))}
                                          </AccordionContent>
                                        </AccordionItem>
                                      </Accordion>
                                    ) : (
                                      <button 
                                        onClick={() => setSelectedLesson(lesson)}
                                        className={cn(
                                          "w-full px-8 py-5 text-left transition-all relative group flex items-start gap-4 border-l-4",
                                          lesson.id === selectedLesson?.id ? "bg-[#fff5eb] border-l-[#eb6200]" : "hover:bg-gray-50 border-l-transparent"
                                        )}
                                      >
                                        <div 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLessonComplete(lesson.id);
                                          }}
                                          className={cn(
                                            "mt-1 shrink-0 cursor-pointer hover:scale-110 transition-transform",
                                            lesson.id === selectedLesson?.id ? "text-[#eb6200]" : lesson.completed ? "text-green-500" : "text-gray-300"
                                          )}
                                        >
                                          {lesson.completed ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-current opacity-30" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className={cn(
                                            "text-sm font-bold tracking-tight font-heading",
                                            lesson.id === selectedLesson?.id ? "text-[#eb6200]" : "text-[#1a1a1a]"
                                          )}>{lesson.title}</p>
                                          <div className="flex gap-2 mt-1">
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-app-on-surface-variant/40">{lesson.type}</span>
                                          </div>
                                        </div>
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </AccordionContent>
                            </AccordionItem>
                            );
                          })}
                        </Accordion>
                      ) : (
                        course.modules.flatMap(m => m.lessons).map((lesson, idx) => {
                          const isActive = lesson.id === selectedLesson?.id;
                          
                          const getTypeLabel = (type: string) => {
                            switch(type) {
                              case 'video': return 'Vídeo';
                              case 'document': return 'Documento';
                              case 'evaluation': return 'Avaliação';
                              case 'scorm': return 'Scorm';
                              case 'webconference': return 'Webconferência';
                              case 'in-person': return 'Aula Presencial';
                              case 'recording': return 'Gravação';
                              case 'training': return 'Treinamento';
                              default: return 'Conteúdo';
                            }
                          };

                          const getStatusLabel = (status?: string) => {
                            switch(status) {
                              case 'completed': return 'Concluído';
                              case 'in-progress': return 'Em andamento';
                              case 'not-viewed': return 'Não visualizado';
                              default: return 'Não visualizado';
                            }
                          };

                          const getStatusColor = (status?: string) => {
                            switch(status) {
                              case 'completed': return 'bg-green-100 text-green-700';
                              case 'in-progress': return 'bg-blue-100 text-blue-700';
                              case 'not-viewed': return 'bg-gray-100 text-gray-600';
                              default: return 'bg-gray-100 text-gray-600';
                            }
                          };

                          const getTypeIcon = (type: string) => {
                            switch(type) {
                              case 'video': return <PlayCircle className="w-4 h-4" />;
                              case 'document': return <FileDown className="w-4 h-4" />;
                              case 'evaluation': return <ClipboardCheck className="w-4 h-4" />;
                              case 'scorm': return <Package className="w-4 h-4" />;
                              case 'webconference': return <Video className="w-4 h-4" />;
                              case 'in-person': return <Users className="w-4 h-4" />;
                              case 'recording': return <Mic className="w-4 h-4" />;
                              case 'training': return <Award className="w-4 h-4" />;
                              default: return <FileText className="w-4 h-4" />;
                            }
                          };

                          return (
                            <button 
                              key={lesson.id}
                              onClick={() => setSelectedLesson(lesson)}
                              className={cn(
                                "w-full p-5 text-left border-b border-app-outline-variant/20 transition-all relative group",
                                isActive ? "bg-[#fff5eb] border-l-4 border-l-[#eb6200]" : "hover:bg-gray-50 border-l-4 border-l-transparent"
                              )}
                            >
                              <div className="flex items-start gap-4">
                                <div 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLessonComplete(lesson.id);
                                  }}
                                  className={cn(
                                    "mt-1 shrink-0 cursor-pointer hover:scale-110 transition-transform",
                                    isActive ? "text-[#eb6200]" : lesson.completed ? "text-green-500" : "text-gray-300"
                                  )}>
                                  {lesson.completed ? (
                                    <CheckCircle2 className="w-5 h-5" />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-current opacity-30" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0 space-y-2">
                                  <p className={cn(
                                    "text-[15px] font-semibold leading-tight tracking-tight font-heading",
                                    isActive ? "text-[#eb6200]" : "text-[#1a1a1a]"
                                  )}>
                                    {lesson.title}
                                  </p>
                                  <div className="flex flex-wrap gap-2 font-heading">
                                    <span className={cn(
                                      "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-[0.05em] font-heading",
                                      isActive ? "bg-[#eb6200]/10 text-[#eb6200]" : "bg-gray-100 text-gray-500"
                                    )}>
                                      {getTypeIcon(lesson.type)}
                                      {getTypeLabel(lesson.type)}
                                    </span>
                                    <span className={cn(
                                      "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-[0.05em] font-heading",
                                      getStatusColor(lesson.status)
                                    )}>
                                      {getStatusLabel(lesson.status)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </button>
                          );
                        })
                      )
                    ) : trainingSidebarTab === 'desempenho' ? (
                      <div className="p-6 space-y-8">
                        {/* Highlights */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-app-background p-4 rounded-2xl border border-app-outline-variant/20">
                            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-app-on-surface-variant mb-1 font-heading">Aproveitamento</p>
                            <p className="text-2xl font-black text-app-tertiary font-heading tracking-tight">100%</p>
                          </div>
                          <div className="bg-app-background p-4 rounded-2xl border border-app-outline-variant/20">
                            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-app-on-surface-variant mb-1 font-heading">Tempo Online</p>
                            <p className="text-2xl font-black text-app-primary font-heading tracking-tight">02:45h</p>
                          </div>
                        </div>

                        {/* Mini Chart */}
                        <div className="space-y-4">
                          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-app-on-surface-variant font-heading">Evolução de Notas</p>
                          <div className="h-32 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={PERFORMANCE_DATA}>
                                <Bar 
                                  dataKey="score" 
                                  radius={[4, 4, 0, 0]}
                                >
                                  {PERFORMANCE_DATA.map((entry, index) => (
                                    <Cell 
                                      key={`cell-${index}`} 
                                      fill={entry.score >= 70 ? '#eb6200' : '#00254e'} 
                                      fillOpacity={0.8}
                                    />
                                  ))}
                                </Bar>
                                <Tooltip 
                                  cursor={{ fill: 'transparent' }}
                                  content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                      return (
                                        <div className="bg-white p-2 border border-app-outline-variant/20 rounded shadow-sm text-[10px] font-bold font-heading">
                                          {payload[0].value}%
                                        </div>
                                      );
                                    }
                                    return null;
                                  }}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Content List */}
                        <div className="space-y-4">
                          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-app-on-surface-variant font-heading">Detalhamento por Conteúdo</p>
                          <div className="space-y-3">
                            {course.modules.flatMap(m => m.lessons).map((lesson) => (
                              <div key={lesson.id} className="p-4 rounded-2xl border border-app-outline-variant/10 bg-gray-50/50 space-y-3">
                                <p className="text-xs font-bold text-app-on-surface font-heading tracking-tight">{lesson.title}</p>
                                <div className="flex flex-wrap gap-2 font-heading">
                                  <span className="px-2 py-0.5 rounded bg-white border border-app-outline-variant/20 text-[9px] font-bold uppercase tracking-[0.05em] text-app-tertiary font-heading">
                                    Aprov: 100%
                                  </span>
                                  <span className="px-2 py-0.5 rounded bg-white border border-app-outline-variant/20 text-[9px] font-bold uppercase tracking-[0.05em] text-app-primary font-heading">
                                    Prog: {lesson.completed ? '100%' : '0%'}
                                  </span>
                                  <span className={cn(
                                    "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-[0.05em] font-heading",
                                    lesson.completed ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                                  )}>
                                    {lesson.completed ? 'Concluído' : 'Pendente'}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 text-center space-y-4">
                        <Info className="w-12 h-12 text-app-outline-variant mx-auto opacity-20" />
                        <p className="text-sm font-medium text-app-on-surface-variant font-heading">Informações do curso em breve.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.aside>
              )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-[#f8f9fa] scrollbar-thin scrollbar-thumb-app-outline-variant relative min-w-0">
                  <div className={cn(
                    "mx-auto transition-all duration-500 ease-in-out",
                    isTrainingSidebarOpen ? "max-w-7xl" : "max-w-7xl",
                    "pt-0 md:pt-4 px-0 md:px-10 pb-12 space-y-0 md:space-y-6"
                  )}>
                    {/* Breadcrumb & Navigation (Desktop Only) */}
                    <div className="hidden md:flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        {!isTrainingSidebarOpen && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => setIsTrainingSidebarOpen(true)}
                            className="p-2 bg-white border border-app-outline-variant/30 rounded-xl shadow-sm text-app-on-surface-variant hover:text-app-tertiary hover:border-app-tertiary/30 transition-all group"
                          >
                            <Menu className="w-5 h-5 flex-shrink-0" />
                          </motion.button>
                        )}
                        <nav className="flex items-center flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.2em] font-heading">
                          <button 
                            onClick={closeLesson}
                            className="text-app-on-surface-variant/60 hover:text-app-tertiary transition-colors"
                          >
                            {mainNav === 'treinamentos' ? 'Treinamentos' : 'Trilha 2'}
                          </button>
                          <ChevronRight className="w-3 h-3 text-app-on-surface-variant/30" />
                          <span className="text-app-on-surface-variant/40 truncate max-w-[250px]">{course.title}</span>
                          <ChevronRight className="w-3 h-3 text-app-on-surface-variant/30" />
                          <span className="text-app-tertiary">{selectedLesson?.title}</span>
                        </nav>
                      </div>
                      
                      <button 
                        onClick={closeLesson}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-app-outline-variant/30 text-[10px] font-bold uppercase tracking-[0.15em] font-heading text-app-on-surface-variant hover:text-app-tertiary hover:border-app-tertiary/30 transition-all shadow-sm group"
                      >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Voltar para o curso
                      </button>
                    </div>

                    {/* Video Player Section */}
                    <div className="relative aspect-video md:rounded-3xl overflow-hidden bg-black md:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] group z-20">
                      {selectedLesson?.fileUrl ? (
                        <div className="w-full h-full bg-white relative">
                          <iframe
                            src={selectedLesson?.fileUrl}
                            className="w-full h-full border-none pointer-events-auto"
                            title="Document Viewer"
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                             <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl pointer-events-auto flex items-center gap-4">
                               <p className="text-xs font-bold text-app-on-surface uppercase tracking-wider">Problemas ao visualizar?</p>
                               <a 
                                 href={selectedLesson?.fileUrl} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="px-4 py-2 bg-app-tertiary text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-app-tertiary-hover transition-colors"
                               >
                                 Abrir em nova aba
                               </a>
                             </div>
                          </div>
                        </div>
                      ) : selectedLesson?.videoUrl ? (
                        selectedLesson?.videoUrl?.includes('youtube.com') || selectedLesson?.videoUrl?.includes('youtu.be') ? (
                          <iframe
                            src={selectedLesson?.videoUrl}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video 
                            src={selectedLesson?.videoUrl} 
                            controls 
                            className="w-full h-full object-contain"
                          />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                          {selectedLesson?.type === 'document' ? (
                            <FileText className="w-20 md:w-24 h-20 md:h-24 text-white/30 group-hover:text-white/60 transition-all duration-500 scale-90 group-hover:scale-100" />
                          ) : (
                            <PlayCircle className="w-20 md:w-24 h-20 md:h-24 text-white/30 group-hover:text-white/60 transition-all duration-500 scale-90 group-hover:scale-100" />
                          )}
                        </div>
                      )}
                      
                      {/* Navigation Overlays (Desktop Only) */}
                      <div className="hidden md:flex absolute inset-0 pointer-events-none">
                        {/* Area de Hover Esquerda */}
                        <div className="flex-1 h-full flex items-center justify-start pl-2 group/nav-left pointer-events-auto">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const all = course.modules.flatMap(m => m.lessons);
                              const idx = all.findIndex(l => l.id === selectedLesson?.id);
                              if (idx > 0) setSelectedLesson(all[idx - 1]);
                            }}
                            className="opacity-0 group-hover/nav-left:opacity-100 w-36 h-36 bg-[#eb6200]/90 hover:bg-[#eb6200] text-white rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl backdrop-blur-sm group/btn"
                          >
                            <ChevronLeft className="w-12 h-12 transition-transform group-hover/btn:-translate-x-1" />
                            <span className="text-xs font-black uppercase tracking-[0.2em] font-heading">Anterior</span>
                          </button>
                        </div>
                        
                        {/* Espaço Central */}
                        <div className="w-1/2" />

                        {/* Area de Hover Direita */}
                        <div className="flex-1 h-full flex items-center justify-end pr-2 group/nav-right pointer-events-auto">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const all = course.modules.flatMap(m => m.lessons);
                              const idx = all.findIndex(l => l.id === selectedLesson?.id);
                              if (idx < all.length - 1) setSelectedLesson(all[idx + 1]);
                            }}
                            className="opacity-0 group-hover/nav-right:opacity-100 w-36 h-36 bg-[#eb6200]/90 hover:bg-[#eb6200] text-white rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl backdrop-blur-sm group/btn"
                          >
                            <ChevronRight className="w-12 h-12 transition-transform group-hover/btn:translate-x-1" />
                            <span className="text-xs font-black uppercase tracking-[0.2em] font-heading">Próximo</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Lesson Info Section */}
                    <div className="space-y-6 md:space-y-10 px-4 md:px-0 pt-4 md:pt-0">
                      <div className="flex flex-col gap-1 md:gap-4">
                        <div className="md:hidden flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-app-tertiary uppercase tracking-widest">
                            {course.modules.find(m => m.lessons.some(l => l.id === selectedLesson?.id))?.title}
                          </span>
                          <button onClick={closeLesson} className="p-1 text-app-on-surface-variant/40 hover:text-app-tertiary">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <h1 className="text-xl md:text-5xl font-bold md:font-black text-app-on-surface tracking-tight leading-tight md:leading-[0.9] font-heading max-w-4xl">
                          {selectedLesson?.title}
                        </h1>
                      </div>
                      
                      <div className="space-y-6 md:space-y-8">
                        {/* Sticky Tabs Bar */}
                        <div className="sticky top-0 z-30 -mx-4 px-4 py-2 bg-[#f8f9fa] md:bg-[#f8f9fa]/80 md:backdrop-blur-md">
                          <div className="md:bg-white md:rounded-2xl md:border md:border-app-outline-variant/30 md:shadow-lg md:shadow-black/[0.03] overflow-hidden">
                            <div className="flex overflow-x-auto scrollbar-none gap-2 md:gap-0 md:bg-gray-50/30 py-2 md:py-0">
                              <button 
                                onClick={() => setLessonInfoTab('descricao')}
                                className={cn(
                                  "shrink-0 flex items-center gap-2 transition-all font-heading font-bold uppercase tracking-[0.15em] text-[10px]",
                                  "md:px-8 md:py-5 md:border-b-2",
                                  "px-5 py-2.5 rounded-full border md:rounded-none",
                                  lessonInfoTab === 'descricao' 
                                    ? "bg-app-tertiary text-white border-app-tertiary md:bg-white md:text-app-tertiary md:border-app-tertiary" 
                                    : "bg-white text-app-on-surface-variant/60 border-app-outline-variant md:bg-transparent md:border-transparent md:hover:text-app-on-surface"
                                )}
                              >
                                <Info className="w-3.5 h-3.5" />
                                Descrição
                              </button>
                              <button 
                                onClick={() => setLessonInfoTab('conteudo')}
                                className={cn(
                                  "md:hidden shrink-0 flex items-center gap-2 transition-all font-heading font-bold uppercase tracking-[0.15em] text-[10px]",
                                  "px-5 py-2.5 rounded-full border",
                                  lessonInfoTab === 'conteudo' 
                                    ? "bg-app-tertiary text-white border-app-tertiary" 
                                    : "bg-white text-app-on-surface-variant/60 border-app-outline-variant"
                                )}
                              >
                                <List className="w-3.5 h-3.5" />
                                Conteúdo
                              </button>
                              <button 
                                onClick={() => setLessonInfoTab('resumo')}
                                className={cn(
                                  "shrink-0 flex items-center gap-2 transition-all font-heading font-bold uppercase tracking-[0.15em] text-[10px]",
                                  "md:px-8 md:py-5 md:border-b-2",
                                  "px-5 py-2.5 rounded-full border md:rounded-none",
                                  lessonInfoTab === 'resumo' 
                                    ? "bg-app-tertiary text-white border-app-tertiary md:bg-white md:text-app-tertiary md:border-app-tertiary" 
                                    : "bg-white text-app-on-surface-variant/60 border-app-outline-variant md:bg-transparent md:border-transparent md:hover:text-app-on-surface"
                                )}
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                Resumo
                              </button>
                              <button 
                                onClick={() => setLessonInfoTab('material')}
                                className={cn(
                                  "shrink-0 flex items-center gap-2 transition-all font-heading font-bold uppercase tracking-[0.15em] text-[10px]",
                                  "md:px-8 md:py-5 md:border-b-2",
                                  "px-5 py-2.5 rounded-full border md:rounded-none",
                                  lessonInfoTab === 'material' 
                                    ? "bg-app-tertiary text-white border-app-tertiary md:bg-white md:text-app-tertiary md:border-app-tertiary" 
                                    : "bg-white text-app-on-surface-variant/60 border-app-outline-variant md:bg-transparent md:border-transparent md:hover:text-app-on-surface"
                                )}
                              >
                                <FileDown className="w-3.5 h-3.5" />
                                Material Complementar
                              </button>
                              <button 
                                onClick={() => setLessonInfoTab('autor')}
                                className={cn(
                                  "shrink-0 flex items-center gap-2 transition-all font-heading font-bold uppercase tracking-[0.15em] text-[10px]",
                                  "md:px-8 md:py-5 md:border-b-2",
                                  "px-5 py-2.5 rounded-full border md:rounded-none",
                                  lessonInfoTab === 'autor' 
                                    ? "bg-app-tertiary text-white border-app-tertiary md:bg-white md:text-app-tertiary md:border-app-tertiary" 
                                    : "bg-white text-app-on-surface-variant/60 border-app-outline-variant md:bg-transparent md:border-transparent md:hover:text-app-on-surface"
                                )}
                              >
                                <Users className="w-3.5 h-3.5" />
                                Autor
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="min-h-[200px] py-4 md:py-8">
                          <AnimatePresence mode="wait">
                            {lessonInfoTab === 'conteudo' && (
                              <motion.div
                                key="conteudo"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="space-y-8"
                              >
                                {/* Progress Section */}
                                <div className="p-6 bg-white rounded-[2rem] border border-app-outline-variant/10 shadow-sm space-y-6">
                                  <div className="space-y-1">
                                    <h3 className="text-xl font-black text-app-on-surface font-heading tracking-tight italic">Configurando o seu Movidesk</h3>
                                    <p className="text-[10px] font-bold text-app-on-surface-variant/40 uppercase tracking-widest font-heading">Visão Geral do Desempenho</p>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest font-heading">
                                        <span className="text-app-on-surface-variant/60">Progresso</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <div className="flex-1 h-1.5 bg-app-outline-variant/10 rounded-full overflow-hidden">
                                          <div 
                                            className="h-full bg-app-tertiary" 
                                            style={{ width: `${course.progress}%` }} 
                                          />
                                        </div>
                                        <span className="text-[10px] font-black text-app-tertiary font-heading">{course.progress}%</span>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-1.5">
                                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest font-heading">
                                        <span className="text-app-on-surface-variant/60">Aproveitamento</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <div className="flex-1 h-1.5 bg-[#eb6200]/10 rounded-full overflow-hidden">
                                          <div 
                                            className="h-full bg-gradient-to-r from-[#eb6200] to-[#ff914d]" 
                                            style={{ width: `${course.performance}%` }} 
                                          />
                                        </div>
                                        <span className="text-[10px] font-black text-[#eb6200] font-heading">{course.performance}%</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Modules List Replicated from Sidebar */}
                                <div className="space-y-4">
                                  {course.modules.map((module, mIdx) => (
                                    <div key={module.id} className="space-y-3">
                                      <div className="flex items-center gap-3 px-4">
                                        <div className="w-6 h-6 rounded-full bg-app-tertiary/10 flex items-center justify-center text-[10px] font-black text-app-tertiary font-heading">
                                          {mIdx + 1}
                                        </div>
                                        <h4 className="text-xs font-black uppercase tracking-widest text-app-on-surface/60 font-heading">{module.title}</h4>
                                      </div>
                                      <div className="bg-white rounded-[1.5rem] border border-app-outline-variant/10 shadow-sm overflow-hidden">
                                        {module.lessons.map((lesson) => (
                                          <button
                                            key={lesson.id}
                                            onClick={() => setSelectedLesson(lesson)}
                                            className={cn(
                                              "w-full p-4 text-left transition-all flex items-center justify-between group border-b border-app-outline-variant/5 last:border-b-0",
                                              selectedLesson?.id === lesson.id ? "bg-[#fff5eb]" : "hover:bg-gray-50/50"
                                            )}
                                          >
                                            <div className="flex items-center gap-3">
                                              <div className={cn(
                                                "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                                                selectedLesson?.id === lesson.id ? "bg-app-tertiary text-white" : lesson.completed ? "bg-green-100 text-green-600" : "bg-app-outline-variant/10 text-app-on-surface-variant"
                                              )}>
                                                {lesson.completed ? <CheckCircle2 className="w-4 h-4" /> : (lesson.type === 'video' ? <PlayCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />)}
                                              </div>
                                              <div className="min-w-0">
                                                <p className={cn(
                                                  "text-[13px] font-bold tracking-tight truncate",
                                                  selectedLesson?.id === lesson.id ? "text-app-tertiary" : "text-app-on-surface"
                                                )}>{lesson.title}</p>
                                                <div className="flex gap-2">
                                                  <span className="text-[8px] font-black text-app-on-surface-variant/40 uppercase tracking-widest">{lesson.type}</span>
                                                </div>
                                              </div>
                                            </div>
                                            {selectedLesson?.id === lesson.id && (
                                              <div className="w-1.5 h-1.5 rounded-full bg-app-tertiary animate-pulse" />
                                            )}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}

                            {lessonInfoTab === 'descricao' && (
                              <motion.div
                                key="descricao"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="max-w-4xl"
                              >
                                <div className="prose prose-sm max-w-none text-app-on-surface-variant leading-relaxed font-sans">
                                  {selectedLesson?.content ? (
                                    <p className="text-lg font-medium whitespace-pre-line text-app-on-surface-variant/80">{selectedLesson?.content}</p>
                                  ) : (
                                    <p className="text-lg font-medium italic text-app-on-surface-variant/40">{selectedLesson?.description || "Nenhuma descrição detalhada disponível."}</p>
                                  )}
                                </div>
                              </motion.div>
                            )}

                            {lessonInfoTab === 'resumo' && (
                              <motion.div
                                key="resumo"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="max-w-4xl"
                              >
                                <div className="prose prose-sm max-w-none text-app-on-surface-variant leading-relaxed font-sans">
                                  {selectedLesson?.description ? (
                                    <p className="text-lg font-medium whitespace-pre-line text-app-on-surface-variant/80 italic">
                                      {selectedLesson?.description}
                                    </p>
                                  ) : (
                                    <p className="text-lg font-medium italic text-app-on-surface-variant/40">Nenhum resumo disponível para este conteúdo.</p>
                                  )}
                                </div>
                              </motion.div>
                            )}
                            
                            {lessonInfoTab === 'material' && (
                              <motion.div
                                key="material"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-8"
                              >
                                <div className="flex items-center justify-between">
                                  <h3 className="text-xl font-bold text-app-on-surface font-heading">Arquivos para download</h3>
                                  <Badge className="bg-app-tertiary/10 text-app-tertiary border-none">2 Arquivos</Badge>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                  <button className="flex flex-col gap-4 p-6 rounded-3xl bg-white border border-app-outline-variant/20 hover:border-app-tertiary/40 hover:shadow-2xl hover:shadow-app-tertiary/10 transition-all group text-left relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                      <FileDown className="w-20 h-20 -mr-6 -mt-6 rotate-12" />
                                    </div>
                                    <div className="w-14 h-14 rounded-2xl bg-app-tertiary/10 flex items-center justify-center text-app-tertiary group-hover:scale-110 transition-transform relative z-10">
                                      <FileDown className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1 relative z-10">
                                      <p className="text-sm font-bold text-app-on-surface font-heading tracking-tight">Guia de Configuração.pdf</p>
                                      <p className="text-[10px] font-black text-app-on-surface-variant/40 uppercase tracking-widest font-heading">2.4 MB • Suporte ao Módulo</p>
                                    </div>
                                  </button>
                                  
                                  <button className="flex flex-col gap-4 p-6 rounded-3xl bg-white border border-app-outline-variant/20 hover:border-app-tertiary/40 hover:shadow-2xl hover:shadow-app-tertiary/10 transition-all group text-left relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                      <ExternalLink className="w-20 h-20 -mr-6 -mt-6 rotate-12" />
                                    </div>
                                    <div className="w-14 h-14 rounded-2xl bg-app-tertiary/10 flex items-center justify-center text-app-tertiary group-hover:scale-110 transition-transform relative z-10">
                                      <ExternalLink className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1 relative z-10">
                                      <p className="text-sm font-bold text-app-on-surface font-heading tracking-tight">Base de Conhecimento</p>
                                      <p className="text-[10px] font-black text-app-on-surface-variant/40 uppercase tracking-widest font-heading">Link Externo • Documentação</p>
                                    </div>
                                  </button>
                                </div>
                              </motion.div>
                            )}
                            
                            {lessonInfoTab === 'autor' && (
                              <motion.div
                                key="autor"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col md:flex-row items-center md:items-start gap-10 bg-white p-10 rounded-[2.5rem] border border-app-outline-variant/10 shadow-sm"
                              >
                                <div className="w-32 h-32 rounded-3xl overflow-hidden bg-app-outline-variant/10 shrink-0 shadow-2xl rotate-3">
                                  <img 
                                    src="https://picsum.photos/seed/author/400/400" 
                                    alt="Autor" 
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <div className="space-y-6 text-center md:text-left">
                                  <div className="space-y-1">
                                    <p className="text-3xl font-black text-app-on-surface font-heading tracking-tighter italic">Equipe Movidesk</p>
                                    <p className="text-[11px] font-bold text-app-tertiary font-heading uppercase tracking-[0.25em]">Especialistas em CS</p>
                                  </div>
                                  <p className="text-lg text-app-on-surface-variant/80 leading-relaxed font-sans font-medium max-w-2xl italic">
                                    "Nossa missão é garantir que cada detalhe da sua plataforma esteja perfeitamente alinhado com o sucesso do seu cliente. Estamos aqui para guiar sua jornada de configuração."
                                  </p>
                                  <div className="flex justify-center md:justify-start gap-3">
                                    <button className="px-4 py-2 bg-app-tertiary/10 text-app-tertiary text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-app-tertiary hover:text-white transition-all">Perfil</button>
                                    <button className="px-4 py-2 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-all">Mentoria</button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </motion.div>
            ) : (
              <motion.div
                key="lesson-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={closeLesson} className="flex items-center gap-2 text-app-on-surface-variant hover:text-app-tertiary">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar para a trilha
                </Button>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-app-surface border-app-outline-variant">
                    {selectedLesson?.type?.toUpperCase()}
                  </Badge>
                  {selectedLesson?.duration && (
                    <div className="flex items-center gap-1 text-xs text-app-on-surface-variant">
                      <Clock className="w-3 h-3" />
                      {selectedLesson?.duration}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
                <div className="space-y-6">
                  <Card className="overflow-hidden border-app-outline-variant bg-black aspect-video flex items-center justify-center relative group">
                    {selectedLesson?.type === 'video' ? (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                        <PlayCircle className="w-16 h-16 text-white/50 group-hover:text-app-tertiary transition-colors cursor-pointer" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-sm font-medium">{selectedLesson?.title}</p>
                        </div>
                      </div>
                    ) : selectedLesson?.type === 'evaluation' ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 p-8 text-center space-y-4">
                        <FileText className="w-16 h-16 text-app-tertiary" />
                        <h3 className="text-xl font-bold text-app-on-surface">Avaliação de Reação</h3>
                        <p className="text-app-on-surface-variant max-w-md">
                          Esta é uma avaliação para sabermos sua opinião sobre o curso até agora.
                        </p>
                        <Button className="bg-app-tertiary hover:bg-app-tertiary-hover text-white">
                          Iniciar Avaliação
                        </Button>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 p-8 text-center space-y-4">
                        <Folder className="w-16 h-16 text-app-primary" />
                        <h3 className="text-xl font-bold text-app-on-surface">Documento de Apoio</h3>
                        <p className="text-app-on-surface-variant max-w-md">
                          Clique no botão abaixo para baixar ou visualizar o documento.
                        </p>
                        <div className="flex gap-3">
                          <Button variant="outline" className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Baixar PDF
                          </Button>
                          <Button className="bg-app-primary hover:bg-app-primary-container text-white flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Visualizar
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h1 className="text-2xl font-bold text-app-on-surface">{selectedLesson?.title}</h1>
                      <p className="text-sm text-app-on-surface-variant">
                        Módulo: {course.modules.find(m => m.lessons.some(l => l.id === selectedLesson?.id))?.title}
                      </p>
                    </div>
                    <Button 
                      className="bg-app-tertiary hover:bg-app-tertiary-hover text-white flex items-center gap-2"
                      onClick={() => {
                        const currentModule = course.modules.find(m => m.lessons.some(l => l.id === selectedLesson?.id));
                        if (currentModule) {
                          const currentIndex = currentModule.lessons.findIndex(l => l.id === selectedLesson?.id);
                          if (currentIndex < currentModule.lessons.length - 1) {
                            setSelectedLesson(currentModule.lessons[currentIndex + 1]);
                          } else {
                            // Try next module
                            const moduleIndex = course.modules.findIndex(m => m.id === currentModule.id);
                            if (moduleIndex < course.modules.length - 1) {
                              const nextModule = course.modules[moduleIndex + 1];
                              if (nextModule.lessons.length > 0) {
                                setSelectedLesson(nextModule.lessons[0]);
                              }
                            }
                          }
                        }
                      }}
                    >
                      Próxima Aula
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="prose prose-sm max-w-none text-app-on-surface-variant pt-4 border-t border-app-outline-variant">
                    <p className="whitespace-pre-line">{selectedLesson?.description || 'Sem descrição disponível para esta aula.'}</p>
                  </div>
                </div>

                <aside className="space-y-6">
                  <Card className="border-app-outline-variant bg-app-surface">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-bold uppercase tracking-wider text-app-on-surface-variant">Conteúdo do Módulo</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-app-outline-variant">
                        {course.modules.find(m => m.lessons.some(l => l.id === selectedLesson?.id))?.lessons.map((lesson) => (
                          <button
                            key={lesson.id}
                            onClick={() => handleLessonClick(lesson)}
                            className={cn(
                              "w-full p-4 flex items-start gap-3 text-left transition-colors hover:bg-app-background",
                              lesson.id === selectedLesson?.id ? "bg-app-tertiary/5 border-l-4 border-app-tertiary" : "pl-5"
                            )}
                          >
                            <div className={cn(
                              "mt-0.5",
                              lesson.completed ? "text-green-500" : "text-app-on-surface-variant"
                            )}>
                              {lesson.type === 'video' ? <PlayCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={cn(
                                "text-sm font-medium truncate",
                                lesson.id === selectedLesson?.id ? "text-app-tertiary" : "text-app-on-surface"
                              )}>
                                {lesson.title}
                              </p>
                              <p className="text-xs text-app-on-surface-variant">{lesson.duration || 'Sem duração'}</p>
                            </div>
                            {lesson.completed && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </aside>
              </div>
            </motion.div>
          )
        ) : (
          <motion.div
              key="course-overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 md:gap-8"
            >
              {/* Sidebar */}
              <aside className="space-y-6">
                <Card className="overflow-hidden border-none shadow-sm bg-app-surface">
                  <div className="aspect-video w-full relative overflow-hidden">
                    <img 
                      src={course.image || "https://picsum.photos/seed/movidesk/600/400"} 
                      alt="Course Thumbnail" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                  <CardContent className="p-6 space-y-6 bg-app-primary-container">
                    <h2 className="text-center font-semibold text-white text-lg">
                      {course.title}
                    </h2>
                    
                    <div className="space-y-2">
                      <p className="text-xs text-center text-app-on-primary-container font-medium uppercase tracking-wider">
                        Andamento:
                      </p>
                      <div className="flex flex-col items-center gap-2">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="transparent"
                              className="text-white/10"
                            />
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="transparent"
                              strokeDasharray={251.2}
                              strokeDashoffset={251.2 - (251.2 * course.progress) / 100}
                              className="text-app-tertiary transition-all duration-1000 ease-out"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute text-sm font-bold text-white">
                            {course.progress}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <button 
                      className="w-full flex items-center justify-between p-3 bg-white/10 rounded-md border border-white/20 text-white hover:bg-white/20 transition-colors group"
                      onClick={() => {
                        setSelectedLesson(null);
                        setActiveTab('trilhas');
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Monitor className="w-4 h-4 text-app-on-primary-container group-hover:text-app-tertiary" />
                        <span className="text-sm font-medium">Sala de Aula</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-app-on-primary-container" />
                    </button>
                  </CardContent>
                </Card>
              </aside>

              {/* Main Content */}
              <div className="space-y-6 overflow-hidden">
                <Tabs defaultValue="conteudos" className="w-full" onValueChange={setActiveTab}>
                  <div className="border-b border-app-outline-variant overflow-x-auto scrollbar-none">
                    <TabsList className="w-full justify-start bg-transparent rounded-none h-auto p-0 gap-6 md:gap-8 min-w-max">
                      <TabsTrigger 
                        value="conteudos" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-app-tertiary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-app-on-surface-variant data-[state=active]:text-app-tertiary flex items-center gap-2"
                      >
                        <Folder className="w-4 h-4" />
                        Conteúdos
                      </TabsTrigger>
                      <TabsTrigger 
                        value="desempenho" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-app-tertiary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-app-on-surface-variant data-[state=active]:text-app-tertiary flex items-center gap-2"
                      >
                        <BarChart3 className="w-4 h-4" />
                        Desempenho
                      </TabsTrigger>
                      <TabsTrigger 
                        value="informacoes" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-app-tertiary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-app-on-surface-variant data-[state=active]:text-app-tertiary flex items-center gap-2"
                      >
                        <Info className="w-4 h-4" />
                        Informações
                      </TabsTrigger>
                      <TabsTrigger 
                        value="certificado" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-app-tertiary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-app-on-surface-variant data-[state=active]:text-app-tertiary flex items-center gap-2"
                      >
                        <Award className="w-4 h-4" />
                        Certificado
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="conteudos" className="mt-6 space-y-4">
                    {mainNav === 'trilhas' ? (
                      <Accordion type="single" collapsible defaultValue={"m4" as any} className="space-y-3">
                        {course.modules.map((module) => (
                          <AccordionItem 
                            key={module.id} 
                            value={module.id}
                            className="border border-app-outline-variant rounded-lg bg-app-surface overflow-hidden shadow-sm"
                          >
                            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-app-background transition-colors group">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-md bg-app-background flex items-center justify-center text-app-on-surface-variant group-data-[state=open]:bg-app-tertiary/10 group-data-[state=open]:text-app-tertiary">
                                  <Folder className="w-5 h-5" />
                                </div>
                                <span className="text-base font-semibold text-app-on-surface">
                                  {module.title}
                                </span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-0 pb-0 border-t border-app-outline-variant">
                              <div className="bg-app-background/30">
                                {module.lessons.length > 0 ? (
                                  <div className="divide-y divide-app-outline-variant">
                                    {module.lessons.map((lesson) => (
                                      <button 
                                        key={lesson.id}
                                        onClick={() => handleLessonClick(lesson)}
                                        className={cn(
                                          "w-full text-left p-6 pl-12 flex flex-col gap-1 transition-colors relative group",
                                          lesson.lastVisited ? "bg-green-50/30" : "hover:bg-app-surface"
                                        )}
                                      >
                                        {lesson.lastVisited && (
                                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />
                                        )}
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                          <div className="flex items-start gap-4">
                                            <div className={cn(
                                              "mt-1",
                                              lesson.completed ? "text-green-500" : "text-app-on-surface-variant group-hover:text-app-tertiary"
                                            )}>
                                              {lesson.type === 'video' ? (
                                                <PlayCircle className="w-5 h-5" />
                                              ) : lesson.type === 'evaluation' ? (
                                                <FileText className="w-5 h-5" />
                                              ) : (
                                                <CheckCircle2 className="w-5 h-5" />
                                              )}
                                            </div>
                                            <div>
                                              <h4 className={cn(
                                                "text-sm font-semibold group-hover:text-app-tertiary transition-colors",
                                                lesson.lastVisited ? "text-green-700" : "text-app-on-surface"
                                              )}>
                                                {lesson.title}
                                                {lesson.lastVisited && (
                                                  <span className="ml-2 italic font-normal text-xs text-green-600">
                                                    (último tópico visitado)
                                                  </span>
                                                )}
                                              </h4>
                                              {lesson.description && (
                                                <p className="text-xs text-app-on-surface-variant mt-1 whitespace-pre-line leading-relaxed line-clamp-2">
                                                  {lesson.description}
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                          
                                          <div className="flex items-center gap-4 pl-9 sm:pl-0">
                                            <div className="w-32 sm:w-24 h-1.5 bg-app-outline-variant rounded-full overflow-hidden">
                                              <div 
                                                className={cn(
                                                  "h-full rounded-full",
                                                  lesson.completed ? "bg-green-500 w-full" : "bg-app-on-surface-variant/20 w-0"
                                                )} 
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="p-8 text-center text-app-on-surface-variant text-sm italic">
                                    Nenhum conteúdo disponível neste módulo.
                                  </div>
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <div className="border border-app-outline-variant rounded-lg bg-app-surface overflow-hidden shadow-sm">
                        <div className="divide-y divide-app-outline-variant">
                          {course.modules.flatMap(m => m.lessons).map((lesson) => (
                            <button 
                              key={lesson.id}
                              onClick={() => handleLessonClick(lesson)}
                              className={cn(
                                "w-full text-left p-6 pl-8 flex flex-col gap-1 transition-colors relative group",
                                lesson.lastVisited ? "bg-green-50/30" : "hover:bg-app-background"
                              )}
                            >
                              {lesson.lastVisited && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />
                              )}
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                  <div className={cn(
                                    "mt-1",
                                    lesson.completed ? "text-green-500" : "text-app-on-surface-variant group-hover:text-app-tertiary"
                                  )}>
                                    {lesson.type === 'video' ? (
                                      <PlayCircle className="w-5 h-5" />
                                    ) : lesson.type === 'evaluation' ? (
                                      <FileText className="w-5 h-5" />
                                    ) : (
                                      <CheckCircle2 className="w-5 h-5" />
                                    )}
                                  </div>
                                  <div>
                                    <h4 className={cn(
                                      "text-sm font-semibold group-hover:text-app-tertiary transition-colors",
                                      lesson.lastVisited ? "text-green-700" : "text-app-on-surface"
                                    )}>
                                      {lesson.title}
                                      {lesson.lastVisited && (
                                        <span className="ml-2 italic font-normal text-xs text-green-600">
                                          (último tópico visitado)
                                        </span>
                                      )}
                                    </h4>
                                    {lesson.description && (
                                      <p className="text-xs text-app-on-surface-variant mt-1 whitespace-pre-line leading-relaxed line-clamp-2">
                                        {lesson.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-4 pl-9 sm:pl-0">
                                  <div className="w-32 sm:w-24 h-1.5 bg-app-outline-variant rounded-full overflow-hidden">
                                    <div 
                                      className={cn(
                                        "h-full rounded-full",
                                        lesson.completed ? "bg-green-500 w-full" : "bg-app-on-surface-variant/20 w-0"
                                      )} 
                                    />
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="desempenho" className="mt-6 space-y-6">
                    {/* Dashboard Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="border-app-outline-variant bg-white shadow-sm overflow-hidden">
                        <div className="h-1 bg-app-tertiary w-full" />
                        <CardContent className="p-6">
                          <p className="text-[10px] font-bold text-app-on-surface-variant uppercase tracking-wider mb-1">Aproveitamento Requerido</p>
                          <h4 className="text-2xl font-black text-app-on-surface">100,00%</h4>
                        </CardContent>
                      </Card>

                      <Card className="border-app-outline-variant bg-white shadow-sm overflow-hidden">
                        <div className="h-1 bg-app-tertiary w-full" />
                        <CardContent className="p-6">
                          <p className="text-[10px] font-bold text-app-on-surface-variant uppercase tracking-wider mb-1">Aproveitamento Parcial</p>
                          <h4 className="text-2xl font-black text-app-on-surface">100,00%</h4>
                        </CardContent>
                      </Card>

                      <Card className="border-app-outline-variant bg-white shadow-sm overflow-hidden">
                        <div className="h-1 bg-red-500 w-full" />
                        <CardContent className="p-6">
                          <p className="text-[10px] font-bold text-app-on-surface-variant uppercase tracking-wider mb-1">Status Atual</p>
                          <h4 className="text-2xl font-black text-red-600">REPROVADO</h4>
                        </CardContent>
                      </Card>

                      <Card className="border-app-outline-variant bg-white shadow-sm overflow-hidden">
                        <div className="h-1 bg-app-primary w-full" />
                        <CardContent className="p-6">
                          <p className="text-[10px] font-bold text-app-on-surface-variant uppercase tracking-wider mb-1">Carga Horária</p>
                          <h4 className="text-2xl font-black text-app-on-surface">02:00</h4>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <Card className="lg:col-span-2 border-app-outline-variant">
                        <CardHeader>
                          <CardTitle className="text-sm font-bold text-app-on-surface uppercase tracking-wider">Desempenho por Módulo</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={PERFORMANCE_DATA}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                              <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#434750', fontSize: 10 }}
                                dy={10}
                              />
                              <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#434750', fontSize: 10 }}
                                domain={[0, 100]}
                              />
                              <Tooltip 
                                cursor={{ fill: '#f7f9fc' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                              />
                              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                                {PERFORMANCE_DATA.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.score >= 70 ? '#eb6200' : '#00254e'} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      <Card className="border-app-outline-variant">
                        <CardHeader>
                          <CardTitle className="text-sm font-bold text-app-on-surface uppercase tracking-wider">Resumo de Tempo</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-app-on-surface-variant">Tempo Total Online</span>
                              <span className="font-bold text-app-on-surface">00:04:24</span>
                            </div>
                            <Progress value={15} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-app-on-surface-variant">Média por Acesso</span>
                              <span className="font-bold text-app-on-surface">00:01:08</span>
                            </div>
                            <Progress value={45} className="h-2" />
                          </div>
                          <div className="pt-4 border-t border-app-outline-variant">
                            <p className="text-[10px] text-app-on-surface-variant uppercase font-bold mb-2">Último Acesso</p>
                            <p className="text-sm font-semibold text-app-on-surface">27/02/2026 03:00</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="informacoes" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold text-app-on-surface">
                          {course.title}
                        </h2>
                        <Card className="border-app-outline-variant">
                          <CardContent className="p-8 space-y-4">
                            <h3 className="text-lg font-bold text-app-on-surface">Sobre este curso</h3>
                            <p className="text-app-on-surface-variant leading-relaxed">
                              Este curso foi desenvolvido para ajudar você a configurar e otimizar o uso do Movidesk em sua organização. 
                              Aprenda desde os conceitos básicos até as configurações avançadas de fluxo de trabalho e atendimento.
                            </p>
                            <div className="pt-4 flex gap-4">
                              <div className="flex items-center gap-2 text-xs text-app-on-surface-variant">
                                <Monitor className="w-4 h-4" />
                                <span>100% Online</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-app-on-surface-variant">
                                <Clock className="w-4 h-4" />
                                <span>Carga horária: 02:00</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-[#f1f3f5] rounded-sm p-6 space-y-6 border-l-4 border-app-tertiary shadow-sm">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-app-on-surface-variant">
                              <Users className="w-4 h-4" />
                              <span className="text-[11px] font-medium uppercase">Nome da turma:</span>
                            </div>
                            <p className="text-sm font-semibold text-app-on-surface">{course.title}</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-app-on-surface-variant">
                              <Calendar className="w-4 h-4" />
                              <span className="text-[11px] font-medium uppercase">Período da turma:</span>
                            </div>
                            <p className="text-sm font-semibold text-app-on-surface">De 20/01/2025 até 04/11/2298</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-app-on-surface-variant">
                              <Eye className="w-4 h-4" />
                              <span className="text-[11px] font-medium uppercase">Último acesso às trilhas:</span>
                            </div>
                            <p className="text-sm font-semibold text-app-on-surface">27/02/2026 03:00</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-app-on-surface-variant">
                              <Clock className="w-4 h-4" />
                              <span className="text-[11px] font-medium uppercase">Tempo on-line nas trilhas:</span>
                            </div>
                            <p className="text-sm font-semibold text-app-on-surface">00:04:24 horas</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="certificado" className="mt-6">
                    <Card className="border-app-outline-variant">
                      <CardContent className="p-12 text-center space-y-4">
                        <Award className="w-12 h-12 text-app-outline-variant mx-auto" />
                        <p className="text-app-on-surface-variant">O certificado estará disponível após a conclusão de 100% do curso.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
