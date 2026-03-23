import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Search, 
  FileText, 
  BrainCircuit, 
  ArrowRight,
  Info,
  CheckCircle,
  Zap
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const RAGModule: React.FC = () => {
  const [query, setQuery] = useState("Explain Earth's climate change");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const steps = [
    { title: 'Vector Retrieval', icon: <Search />, desc: 'Finding relevant knowledge chunks.' },
    { title: 'Augmentation', icon: <FileText />, desc: 'Injecting facts into the prompt.' },
    { title: 'Generation', icon: <BrainCircuit />, desc: 'AI reason with new information.' }
  ];

  const runRAG = async () => {
    setIsProcessing(true);
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise(r => setTimeout(r, 1200));
    }
    setIsProcessing(false);
    toast.success("RAG Pipeline Successful!");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-xs">
            <Database className="w-4 h-4" />
            Knowledge Lab
          </div>
          <h2 className="text-4xl font-display font-black text-white">The RAG Engine</h2>
          <p className="text-white/50 max-w-xl text-sm leading-relaxed">
             Retrieval-Augmented Generation. How AI bridges the gap between pre-training and real-world knowledge.
          </p>
        </div>
        <button 
           onClick={() => setShowExplanation(!showExplanation)}
           className="px-4 py-2 glass rounded-xl border-white/5 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2 text-white"
        >
          <Info className="w-4 h-4" />
          {showExplanation ? 'Hide RAG Logic' : 'Show RAG Math'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
        {/* Input */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6">
            <div className="text-xs font-bold uppercase tracking-widest text-white/30">Query Input</div>
            <div className="relative">
               <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 focus:border-blue-500/50 outline-none transition-all"
               />
               <Search className="absolute left-4 top-4 w-5 h-5 text-white/20" />
            </div>
            <button 
               onClick={runRAG}
               disabled={isProcessing}
               className="w-full py-4 bg-blue-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors"
            >
               {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
               Run Knowledge Injection
            </button>
          </div>

          <div className="p-6 glass rounded-[2rem] border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase">
                <CheckCircle className="w-4 h-4" />
                Benefit
             </div>
             <p className="text-xs text-white/40 leading-relaxed">
                RAG prevents AI hallucinations by forcing it to read specific documents before answering. It's like an "Open Book Exam".
             </p>
          </div>
        </div>

        {/* Pipeline */}
        <div className="lg:col-span-2 space-y-6">
           <div className="glass rounded-[2.5rem] p-10 border-white/5 min-h-[400px] flex flex-col items-center justify-between">
              <div className="w-full flex items-center gap-4">
                 {steps.map((step, i) => (
                   <React.Fragment key={i}>
                      <motion.div 
                        animate={{ 
                           scale: currentStep === i ? 1.1 : 1,
                           backgroundColor: currentStep === i ? 'rgba(37, 99, 235, 1)' : 'rgba(255, 255, 255, 0.05)',
                           borderColor: currentStep === i ? 'rgba(37, 99, 235, 0.5)' : 'rgba(255, 255, 255, 0.1)'
                        }}
                        className="flex-1 p-6 rounded-3xl border text-center space-y-3 transition-colors"
                      >
                         <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center ${currentStep === i ? 'bg-white/20' : 'bg-white/5 text-white/30'}`}>
                            {step.icon}
                         </div>
                         <div className={`text-[10px] font-bold uppercase tracking-tight ${currentStep === i ? 'text-white' : 'text-white/20'}`}>{step.title}</div>
                      </motion.div>
                      {i < steps.length - 1 && <ArrowRight className="w-4 h-4 text-white/10" />}
                   </React.Fragment>
                 ))}
              </div>

              <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md gap-4">
                 <AnimatePresence mode="wait">
                    {currentStep !== null ? (
                       <motion.div 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                       >
                          <h3 className="text-xl font-bold mb-2">{steps[currentStep].title}</h3>
                          <p className="text-sm text-white/50">{steps[currentStep].desc}</p>
                       </motion.div>
                    ) : (
                       <div className="text-white/10">
                          <Database className="w-16 h-16 mx-auto mb-4 opacity-10" />
                          <p>Analyze how the AI retrieves data.</p>
                       </div>
                    )}
                 </AnimatePresence>
              </div>
           </div>

           <AnimatePresence>
             {showExplanation && (
                <motion.div 
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                   className="p-10 glass rounded-[2.5rem] border-blue-500/20 space-y-8 relative overflow-hidden text-white"
                >
                   <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-500 to-indigo-500" />
                   
                   <div className="bg-black/40 p-6 rounded-2xl flex items-center justify-center gap-4 font-mono text-lg md:text-2xl border border-white/5 flex-wrap">
                      <span className="text-blue-400">Response</span>
                      <span className="text-white/30">=</span>
                      <span className="text-white">LLM(Query + Knowledge<sub>retrieved</sub>)</span>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <h4 className="text-sm font-bold text-blue-400 uppercase">Equation Interpretation</h4>
                        <ul className="space-y-3 text-xs text-white/60">
                           <li className="flex gap-2">
                              <span className="text-white font-bold">Query:</span> 
                              <span>What the user asks (the prompt).</span>
                           </li>
                           <li className="flex gap-2">
                              <span className="text-white font-bold">Knowledge<sub>retrieved</sub>:</span> 
                              <span>Facts found in the external database that are most relevant to the query.</span>
                           </li>
                           <li className="flex gap-2">
                              <span className="text-white font-bold">LLM:</span> 
                              <span>The "brain" that reads both pieces and synthesizes a new, factual answer.</span>
                           </li>
                        </ul>
                     </div>
                     <div className="space-y-4 border-l border-white/5 pl-8">
                        <h4 className="text-sm font-bold text-blue-500 uppercase">Illustration: Open Book Exam</h4>
                        <p className="text-xs text-white/50 leading-relaxed text-left">
                           Standard AI is like a student trying to remember everything. RAG is like an "Open Book Exam". The student doesn't have to memorize; they use a search engine (Retrieval) to find the right page (Knowledge<sub>retrieved</sub>), and then write the answer (LLM).
                        </p>
                     </div>
                   </div>

                   <div className="mt-8 p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 text-left">
                      <h4 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-3 text-left">Open-Ended Research Question</h4>
                      <p className="text-sm italic text-white/80 leading-relaxed text-left">
                        "If RAG allows AI to read any new document, can we really say the AI is 'learning'? Or is it just acting like a sophisticated photocopier that knows how to read?"
                      </p>
                   </div>
                </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const RefreshCw = ({ className }: { className: string }) => (
  <motion.svg animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
     xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} >
     <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/> <path d="M21 3v5h-5"/> <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/> <path d="M3 21v-5h5"/>
  </motion.svg>
);

export default RAGModule;
