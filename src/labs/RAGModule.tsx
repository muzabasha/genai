import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Search, 
  Zap,
  RefreshCw,
  Library,
  MessageCircle,
  Cpu
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const RAGModule: React.FC = () => {
  const [query, setQuery] = useState("Explain the quantum impact on AI.");
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [showLogic, setShowLogic] = useState(false);
  const [step, setStep] = useState(0);

  const startRAG = async () => {
    setIsRetrieving(true);
    setStep(0);
    
    // Step 1: Mapping
    setStep(1);
    await new Promise(r => setTimeout(r, 1200));
    
    // Step 2: Retrieval
    setStep(2);
    await new Promise(r => setTimeout(r, 1500));
    
    // Step 3: Augmentation
    setStep(3);
    await new Promise(r => setTimeout(r, 1000));
    
    // Step 4: Output
    setStep(4);
    setIsRetrieving(false);
    toast.success("RAG Pipeline Augmentation Successful!");
  };

  const knowledgeChunks = [
    { title: "Quantum Decoherence", content: "AI models struggle with maintaining state during quantum interference cycles." },
    { title: "Qubits in RL", content: "Reinforcement learning can use qubits to explore more actions in parallel." },
    { title: "Error Correction", content: "Surface codes provide a way to build fault-tolerant AI processors." }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-xs">
            <Library className="w-4 h-4" />
            Infrastructure Lab
          </div>
          <h2 className="text-4xl font-display font-black">RAG Pipeline Explorer</h2>
          <p className="text-white/50 max-w-xl">
             Teaching LLMs to remember. Watch how the model finds context from millions of documents to avoid "hallucinations".
          </p>
        </div>
        <button 
           onClick={() => setShowLogic(!showLogic)}
           className="px-4 py-2 glass rounded-xl border-white/5 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <Cpu className="w-4 h-4" />
          {showLogic ? 'Hide Retrieval Logic' : 'Show RAG Math'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-3xl p-6 border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
              <MessageCircle className="w-4 h-4" />
              Incoming Query
            </div>
            
            <textarea 
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               className="w-full h-24 bg-white/5 rounded-2xl p-4 border border-white/10 focus:border-blue-500/50 outline-none resize-none transition-all placeholder:text-white/20 text-sm"
            />

            <button 
               onClick={startRAG}
               disabled={isRetrieving}
               className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isRetrieving ? 'bg-white/5 text-white/20' : 'bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95'}`}
            >
              {isRetrieving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Database className="w-5 h-5" />}
              {isRetrieving ? 'Retrieving Knowledge...' : 'Inject External Context'}
            </button>
          </div>

          <div className="glass rounded-3xl p-6 border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
                <Search className="w-4 h-4" />
                Concept: Cosine Similarity
             </div>
             <p className="text-xs text-white/50 leading-relaxed">
                The model finds context not by keywords, but by meaning. It calculates the mathematical angle between your query and chunks of stored knowledge.
             </p>
          </div>
        </div>

        {/* Pipeline Visualizer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-[2rem] p-10 border-white/5 min-h-[450px] relative overflow-hidden flex flex-col items-center justify-center">
             <div className="absolute inset-0 bg-grid-white/5 opacity-40 z-0" />
             
             <div className="relative z-10 w-full flex flex-col gap-10">
                <div className="flex justify-between items-center px-4">
                  {[
                    { id: 1, label: 'Embed', icon: <Cpu className="w-6 h-6" /> },
                    { id: 2, label: 'Search', icon: <Search className="w-6 h-6" /> },
                    { id: 3, label: 'Augment', icon: <Library className="w-6 h-6" /> },
                    { id: 4, label: 'Output', icon: <Zap className="w-6 h-6" /> }
                  ].map((s) => (
                    <div key={s.id} className="relative flex flex-col items-center gap-3">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${step >= s.id ? 'bg-blue-500 shadow-[0_0_20px_#3b82f6cc]' : 'bg-white/5 border border-white/10 opacity-30'}`}>
                          {s.icon}
                       </div>
                       <span className={`text-[9px] font-black tracking-widest uppercase ${step >= s.id ? 'text-blue-400' : 'text-white/20'}`}>{s.label}</span>
                       {s.id < 4 && (
                          <div className={`absolute top-7 left-[80%] w-[80%] h-[2px] ${step > s.id ? 'bg-blue-500' : 'bg-white/10'}`} />
                       )}
                    </div>
                  ))}
                </div>

                <div className="min-h-[180px] flex items-center justify-center">
                   <AnimatePresence mode="wait">
                      {step === 2 && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full"
                        >
                           {knowledgeChunks.map((chunk, i) => (
                             <motion.div 
                                key={i}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-4 glass rounded-xl border-blue-500/20 space-y-2 bg-blue-500/5"
                             >
                                <div className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">{chunk.title}</div>
                                <div className="text-[10px] text-white/40 leading-snug line-clamp-2">{chunk.content}</div>
                             </motion.div>
                           ))}
                        </motion.div>
                      )}
                      
                      {step === 4 && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="w-full p-6 glass border-blue-500/30 rounded-2xl bg-blue-500/5 space-y-3"
                        >
                           <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                              <Library className="w-3 h-3" />
                              Augmented Context Answer
                           </div>
                           <p className="text-xs leading-relaxed text-white/80 italic">
                             "Based on your query and retrieved quantum state analysis, quantum decoherence in AI processors can be mitigated using fault-tolerant surface codes, as documented in our vector database."
                           </p>
                        </motion.div>
                      )}

                      {!isRetrieving && step === 0 && (
                        <div className="text-white/10 flex flex-col items-center gap-4">
                           <Database className="w-16 h-16 opacity-10" />
                           <p className="text-sm font-medium">Pipeline Idle</p>
                        </div>
                      )}
                   </AnimatePresence>
                </div>
             </div>
          </div>

          <AnimatePresence>
            {showLogic && (
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 20 }}
                 className="p-8 glass rounded-3xl border-blue-500/20 space-y-6"
              >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Search className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                       <h3 className="font-bold">Cosine Similarity Distance</h3>
                       <p className="text-xs text-white/40">Mathematical match in vector space.</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/40 p-6 rounded-2xl flex items-center justify-center gap-4 font-mono text-lg border border-white/5 flex-wrap text-center">
                     <span className="text-blue-400">score</span>
                     <span className="text-white/30">=</span>
                     <div className="flex flex-col items-center">
                        <span className="border-b border-white px-2">A · B</span>
                        <span className="px-2">||A|| ||B||</span>
                     </div>
                  </div>
                  
                  <p className="text-[10px] text-white/40 text-center leading-relaxed">
                     Vector A is your query, and Vector B is a chunk of text from our database. The RAG system calculates this score to see how well they align in multidimensional space.
                  </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RAGModule;
