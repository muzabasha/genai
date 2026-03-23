import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Zap, 
  BookOpen, 
  Image as ImageIcon, 
  Music, 
  Video, 
  Cpu, 
  Globe, 
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Trophy,
  BrainCircuit,
  Database
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

import TextLab from './labs/TextLab';
import NumericLab from './labs/NumericLab';
import ImageLab from './labs/ImageLab';
import AudioLab from './labs/AudioLab';
import VideoLab from './labs/VideoLab';
import RAGModule from './labs/RAGModule';
import RLPlayground from './labs/RLPlayground';
import EcosystemMindMap from './labs/EcosystemMindMap';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeLab, setActiveLab] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [level, setLevel] = useState(2);
  const [exp, setExp] = useState(50);

  const addExp = (amount: number) => {
    setExp(prev => {
      const newExp = prev + amount;
      if (newExp >= 100) {
        setLevel(l => l + 1);
        toast.success(`Level Up! You are now Level ${level + 1}`, {
          icon: '🎉',
          duration: 5000
        });
        return newExp % 100;
      }
      return newExp;
    });
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    toast.success(`Language changed to ${lng.toUpperCase()}`);
  };

  const labs = [
    { id: 'text', name: t('labs.text'), icon: <BookOpen className="w-6 h-6" />, color: 'from-blue-500 to-indigo-600', level: 1 },
    { id: 'numeric', name: t('labs.numeric'), icon: <Cpu className="w-6 h-6" />, color: 'from-emerald-500 to-teal-600', level: 1 },
    { id: 'image', name: t('labs.image'), icon: <ImageIcon className="w-6 h-6" />, color: 'from-purple-500 to-pink-600', level: 1 },
    { id: 'audio', name: t('labs.audio'), icon: <Music className="w-6 h-6" />, color: 'from-orange-500 to-red-600', level: 1 },
    { id: 'video', name: t('labs.video'), icon: <Video className="w-6 h-6" />, color: 'from-indigo-500 to-purple-800', level: 2 }
  ];

  const renderLab = () => {
    switch (activeLab) {
      case 'text': return <TextLab />;
      case 'numeric': return <NumericLab />;
      case 'image': return <ImageLab />;
      case 'audio': return <AudioLab />;
      case 'video': return <VideoLab />;
      case 'rag': return <RAGModule />;
      case 'rl': return <RLPlayground />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen gradient-bg text-white selection:bg-primary-500/30 overflow-x-hidden">
      <Toaster position="top-right" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setActiveLab(null)}
          >
            <div className="p-2 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight gradient-text">GenAI Virtual Lab</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-all cursor-default group">
              <Trophy className="w-4 h-4 text-yellow-400 group-hover:scale-125 transition-transform" />
              <span className="text-sm font-medium">Lvl {level}</span>
              <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500" 
                  initial={{ width: 0 }}
                  animate={{ width: `${exp}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-1">
              {['en', 'hi', 'kn'].map((lng) => (
                <button 
                   key={lng}
                   onClick={() => changeLanguage(lng)} 
                   className={`p-1 px-3 rounded-md transition-colors text-xs font-bold uppercase ${i18n.language.startsWith(lng) ? 'bg-primary-500 text-white' : 'hover:bg-white/10 text-white/40'}`}
                >
                  {lng}
                </button>
              ))}
            </div>
            <a 
              href="https://scholar-sparkle-web.lovable.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-sm flex items-center gap-2 hover:bg-white/10 transition-all group"
            >
              <Globe className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
              {t('resourcePerson')}
              <ExternalLink className="w-3 h-3 opacity-40" />
            </a>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden glass border-b border-white/10 p-4 space-y-4"
          >
             <div className="grid grid-cols-3 gap-2">
                {['en', 'hi', 'kn'].map((lng) => (
                   <button 
                      key={lng}
                      onClick={() => { changeLanguage(lng); setIsMenuOpen(false); }} 
                      className={`py-2 rounded-lg text-xs font-bold uppercase ${i18n.language === lng ? 'bg-primary-500' : 'bg-white/5'}`}
                   >
                     {lng}
                   </button>
                ))}
             </div>
             <a 
                href="https://scholar-sparkle-web.lovable.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 bg-white/5 rounded-lg border border-white/10 text-sm flex items-center justify-center gap-2"
             >
                {t('resourcePerson')}
                <ExternalLink className="w-3 h-3" />
             </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-[calc(100vh-64px)]">
        <AnimatePresence mode="wait">
          {!activeLab ? (
            <motion.div 
              key="hub"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-16"
            >
              <div className="text-center space-y-6 max-w-3xl mx-auto py-12">
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-bold uppercase tracking-widest text-primary-400"
                >
                   <Sparkles className="w-3 h-3" />
                   New: Temporal Diffusion Available
                </motion.div>
                <h1 className="text-6xl md:text-7xl font-display font-black tracking-tight leading-none">
                  {t('welcome')} <br />
                  <span className="gradient-text">{t('subtitle')}</span>
                </h1>
                <p className="text-white/50 text-xl leading-relaxed">
                   The first intuition-first virtual lab for Generative AI. Master the core modalities through visual simulation and hands-on experimentation.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                   <button 
                     onClick={() => { setActiveLab('text'); addExp(10); }}
                     className="px-8 py-4 bg-primary-500 rounded-2xl font-bold hover:shadow-2xl hover:shadow-primary-500/30 transition-all active:scale-95 flex items-center gap-3"
                   >
                      Get Started <ChevronRight className="w-5 h-5" />
                   </button>
                   <button className="px-8 py-4 glass rounded-2xl font-bold hover:bg-white/10 transition-all">
                      Watch Intro
                   </button>
                </div>
              </div>

              <div className="space-y-8">
                 <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-display font-bold">Multi-Modal Virtual Labs</h2>
                    <div className="text-xs font-bold text-white/30 uppercase tracking-widest">Selected for NEP 2020 Compliance</div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {labs.map((lab, index) => (
                     <motion.button
                       key={lab.id}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: index * 0.1 }}
                       whileHover={{ scale: 1.02, y: -5 }}
                       whileTap={{ scale: 0.98 }}
                       onClick={() => {
                           if (level >= lab.level) {
                             setActiveLab(lab.id);
                             addExp(5);
                           } else {
                             toast.error(`Unlock Level ${lab.level} to access this lab!`);
                           }
                       }}
                       className={`relative p-8 rounded-[2.5rem] text-left overflow-hidden glass group transition-all duration-500 hover:border-white/20 border-white/5 ${level < lab.level ? 'opacity-40 grayscale pointer-events-none' : ''}`}
                     >
                       <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${lab.color} opacity-10 blur-[80px] group-hover:opacity-30 transition-opacity`} />
                       <div className="relative space-y-6">
                         <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${lab.color} flex items-center justify-center shadow-2xl shadow-black/40 group-hover:rotate-6 transition-transform`}>
                           {lab.icon}
                         </div>
                         <div className="space-y-2">
                           <div className="flex items-center gap-2">
                             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Module 0{index + 1}</span>
                             {level < lab.level && (
                               <div className="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-bold text-white/40 flex items-center gap-1">
                                  <ChevronRight className="w-2 h-2" />
                                  Locked at Lvl {lab.level}
                               </div>
                             )}
                           </div>
                           <h3 className="text-2xl font-display font-bold leading-tight group-hover:text-primary-400 transition-colors">{lab.name}</h3>
                         </div>
                         <div className="flex items-center gap-2 text-primary-400 font-bold text-xs group-hover:gap-4 transition-all">
                           <span>Enter Laboratory</span>
                           <ChevronRight className="w-4 h-4" />
                         </div>
                       </div>
                     </motion.button>
                   ))}

                   {/* Core Infrastructure Labs */}
                   <motion.button 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      onClick={() => { setActiveLab('rag'); addExp(10); }}
                      className="p-8 rounded-[2.5rem] glass border-white/5 relative group overflow-hidden text-left"
                   >
                     <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 blur-[80px]" />
                     <div className="relative space-y-6">
                        <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Database className="w-7 h-7 text-blue-400" />
                        </div>
                        <div>
                           <h3 className="text-2xl font-display font-bold">RAG Engine</h3>
                           <p className="text-white/40 text-sm mt-2 leading-relaxed">External memory for LLMs. Master the art of knowledge injection.</p>
                        </div>
                        <div className="text-xs font-bold text-blue-400 flex items-center gap-2">
                           Level 1 Required <CheckCircle className="w-3 h-3" />
                        </div>
                     </div>
                   </motion.button>

                   <motion.button 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      onClick={() => { setActiveLab('rl'); addExp(15); }}
                      className="p-8 rounded-[2.5rem] glass border-white/5 relative group overflow-hidden text-left"
                   >
                     <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-rose-500/20 to-pink-600/20 blur-[80px]" />
                     <div className="relative space-y-6">
                        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
                          <BrainCircuit className="w-7 h-7 text-rose-400" />
                        </div>
                        <div>
                           <h3 className="text-2xl font-display font-bold">RL Playground</h3>
                           <p className="text-white/40 text-sm mt-2 leading-relaxed">Be the reward provider. Train models using feedback loops.</p>
                        </div>
                        <div className="text-xs font-bold text-rose-400 flex items-center gap-2">
                           No-Code Training <Zap className="w-3 h-3" />
                        </div>
                     </div>
                   </motion.button>
                 </div>
              </div>

              {/* Research & Evaluation Section */}
              <div className="space-y-8 pb-10">
                 <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-display font-bold text-white">Research & Evaluation</h2>
                    <div className="text-xs font-bold text-primary-400 uppercase tracking-widest flex items-center gap-2">
                       <Sparkles className="w-3 h-3" />
                       Powered by NotebookLM
                    </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <motion.a 
                       href="https://notebooklm.google.com/notebook/339c9ebf-6094-4bc5-993c-fc3fcdf0a58f?artifactId=1c3819ba-6c52-4b6e-b482-79728dbe6698"
                       target="_blank"
                       rel="noopener noreferrer"
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       whileHover={{ scale: 1.02, y: -5 }}
                       className="p-8 rounded-[2rem] glass border-primary-500/20 relative group overflow-hidden text-left bg-primary-500/5 hover:bg-primary-500/10 transition-all shadow-2xl flex flex-col justify-between"
                    >
                      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary-500/20 to-blue-600/20 blur-[80px]" />
                      <div className="relative space-y-6">
                         <div className="w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                           <Trophy className="w-7 h-7 text-primary-400 font-bold" />
                         </div>
                         <div>
                            <h3 className="text-xl font-display font-bold text-white leading-tight">Mastery Quiz</h3>
                            <p className="text-white/40 text-[11px] mt-2 leading-relaxed text-left">Evaluate your GenAI knowledge via NotebookLM.</p>
                         </div>
                      </div>
                      <div className="relative text-[10px] font-black uppercase tracking-widest text-primary-400 flex items-center gap-2 mt-6">
                         Start <ExternalLink className="w-3 h-3" />
                      </div>
                    </motion.a>

                    <motion.a 
                       href="https://notebooklm.google.com/notebook/339c9ebf-6094-4bc5-993c-fc3fcdf0a58f?artifactId=a83b1bac-cae7-41be-854b-199467076444"
                       target="_blank"
                       rel="noopener noreferrer"
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       whileHover={{ scale: 1.02, y: -5 }}
                       className="p-8 rounded-[2rem] glass border-secondary-500/20 relative group overflow-hidden text-left bg-secondary-500/5 hover:bg-secondary-500/10 transition-all shadow-2xl flex flex-col justify-between"
                    >
                      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-secondary-500/20 to-purple-600/20 blur-[80px]" />
                      <div className="relative space-y-6">
                         <div className="w-16 h-16 rounded-2xl bg-secondary-500/10 border border-secondary-500/20 flex items-center justify-center group-hover:rotate-6 transition-transform">
                           <Video className="w-7 h-7 text-secondary-400 font-bold" />
                         </div>
                         <div>
                            <h3 className="text-xl font-display font-bold text-white leading-tight">English Video</h3>
                            <p className="text-white/40 text-[11px] mt-2 leading-relaxed text-left">Visual walk-through of GenAI architectures.</p>
                         </div>
                      </div>
                      <div className="relative text-[10px] font-black uppercase tracking-widest text-secondary-400 flex items-center gap-2 mt-6">
                         Watch <ExternalLink className="w-3 h-3" />
                      </div>
                    </motion.a>

                    <motion.a 
                       href="https://notebooklm.google.com/notebook/339c9ebf-6094-4bc5-993c-fc3fcdf0a58f?artifactId=9215e93d-602d-402d-9cc2-d6ae4a8db570"
                       target="_blank"
                       rel="noopener noreferrer"
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       whileHover={{ scale: 1.02, y: -5 }}
                       className="p-8 rounded-[2rem] glass border-orange-500/20 relative group overflow-hidden text-left bg-orange-500/5 hover:bg-orange-500/10 transition-all shadow-2xl flex flex-col justify-between"
                    >
                      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-orange-500/20 to-red-600/20 blur-[80px]" />
                      <div className="relative space-y-6">
                         <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center group-hover:-rotate-6 transition-transform">
                           <Globe className="w-7 h-7 text-orange-400 font-bold" />
                         </div>
                         <div>
                            <h3 className="text-xl font-display font-bold text-white leading-tight">Hindi Video</h3>
                            <p className="text-white/40 text-[11px] mt-2 leading-relaxed text-left">हिंदी में जेनरेटिव एआई का वॉक-थ्रू।</p>
                         </div>
                      </div>
                      <div className="relative text-[10px] font-black uppercase tracking-widest text-orange-400 flex items-center gap-2 mt-6">
                         देखें <ExternalLink className="w-3 h-3" />
                      </div>
                    </motion.a>

                    <motion.a 
                       href="https://notebooklm.google.com/notebook/339c9ebf-6094-4bc5-993c-fc3fcdf0a58f?artifactId=ec5b82bb-a668-4a90-8bea-8fe6cbac50b9"
                       target="_blank"
                       rel="noopener noreferrer"
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       whileHover={{ scale: 1.02, y: -5 }}
                       className="p-8 rounded-[2rem] glass border-emerald-500/20 relative group overflow-hidden text-left bg-emerald-500/5 hover:bg-emerald-500/10 transition-all shadow-2xl flex flex-col justify-between"
                    >
                      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 blur-[80px]" />
                      <div className="relative space-y-6">
                         <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                           <Sparkles className="w-7 h-7 text-emerald-400 font-bold" />
                         </div>
                         <div>
                            <h3 className="text-xl font-display font-bold text-white leading-tight">Flash Cards</h3>
                            <p className="text-white/40 text-[11px] mt-2 leading-relaxed text-left">Terminology & Quick Revision.</p>
                         </div>
                      </div>
                      <div className="relative text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2 mt-6">
                         Review <ExternalLink className="w-3 h-3" />
                      </div>
                    </motion.a>

                    <motion.a 
                       href="https://notebooklm.google.com/notebook/339c9ebf-6094-4bc5-993c-fc3fcdf0a58f?artifactId=fbdf480a-eb9a-46b6-9cbf-08bb49f40f3f"
                       target="_blank"
                       rel="noopener noreferrer"
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       whileHover={{ scale: 1.02, y: -5 }}
                       className="p-8 rounded-[2rem] glass border-teal-500/20 relative group overflow-hidden text-left bg-teal-500/5 hover:bg-teal-500/10 transition-all shadow-2xl flex flex-col justify-between"
                    >
                      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-teal-500/20 to-blue-600/20 blur-[80px]" />
                      <div className="relative space-y-6">
                         <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                           <Globe className="w-7 h-7 text-teal-400 font-bold" />
                         </div>
                         <div>
                            <h3 className="text-xl font-display font-bold text-white leading-tight">Kannada Video</h3>
                            <p className="text-white/40 text-[11px] mt-2 leading-relaxed text-left">ಜನರೇಟಿವ್ ಎಐನ ಸಮಗ್ರ ದೃಶ್ಯ ನಡಿಗೆ-ಥ್ರೂ.</p>
                         </div>
                      </div>
                      <div className="relative text-[10px] font-black uppercase tracking-widest text-teal-400 flex items-center gap-2 mt-6">
                         ವೀಕ್ಷಿಸಿ <ExternalLink className="w-3 h-3" />
                      </div>
                    </motion.a>
                 </div>
              </div>

              {/* AI Ecosystem Mind Map */}
              <EcosystemMindMap />
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setActiveLab(null)}
                  className="group flex items-center gap-3 text-white/40 hover:text-white transition-all font-bold uppercase tracking-widest text-xs"
                >
                  <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                     <ArrowLeft className="w-4 h-4" />
                  </div>
                  Back to Hub
                </button>
                
                <div className="flex items-center gap-4">
                   <div className="px-4 py-2 glass rounded-xl border-white/5 text-[10px] font-bold uppercase text-white/40">
                      Module Progress: <span className="text-primary-400">85%</span>
                   </div>
                </div>
              </div>
              
              <div className="glass rounded-[3rem] p-8 md:p-12 border-white/10 relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                 <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 blur-[120px] -z-10" />
                 {renderLab()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-primary-400" />
              <span className="font-display font-bold text-lg opacity-40">GenAI Virtual Lab</span>
           </div>
           <div className="flex gap-8 text-xs font-bold uppercase tracking-[0.2em] text-white/20">
              <a href="#" className="hover:text-primary-400 transition-colors">Documentation</a>
              <a href="#" className="hover:text-primary-400 transition-colors">Community</a>
              <a href="#" className="hover:text-primary-400 transition-colors">Open Source</a>
           </div>
           <p className="text-xs font-medium text-white/20">&copy; 2026 Designed for NEP 2020. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
