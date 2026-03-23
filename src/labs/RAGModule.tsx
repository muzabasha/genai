import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Search, 
  Layers, 
  MessageSquare, 
  Sparkles, 
  ChevronRight, 
  FileText, 
  Zap, 
  RefreshCw,
  Globe,
  Plus
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const RAGModule: React.FC = () => {
  const [query, setQuery] = useState("Explain photosynthesis");
  const [isSearching, setIsSearching] = useState(false);
  const [foundChunks, setFoundChunks] = useState<string[]>([]);
  const [finalOutput, setFinalOutput] = useState("");
  const [step, setStep] = useState(0);

  const mockKnowledge = [
    "Photosynthesis is the process by which green plants use sunlight to synthesize food.",
    "The process involves the conversion of carbon dioxide and water into glucose.",
    "Chlorophyll is the green pigment in plants that absorbs light energy.",
    "Oxygen is released as a byproduct of photosynthesis."
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    setFoundChunks([]);
    setFinalOutput("");
    setStep(1); // Query Embedding
    await new Promise(r => setTimeout(r, 1000));
    
    setStep(2); // Vector Search
    await new Promise(r => setTimeout(r, 1000));
    
    setStep(3); // Result Selection
    setFoundChunks(mockKnowledge.slice(0, 3));
    await new Promise(r => setTimeout(r, 1200));

    setStep(4); // Generation
    const result = "Based on the retrieved context: Photosynthesis is a process where plants use sunlight for food synthesis by converting CO2 and water into glucose with chlorophyll.";
    let currentText = "";
    for (const char of result) {
      currentText += char;
      setFinalOutput(currentText);
      await new Promise(r => setTimeout(r, 15));
    }
    
    setIsSearching(false);
    toast.success("Retrieval-Augmented Answer Ready!");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-xs">
            <Database className="w-4 h-4" />
            Knowledge Lab
          </div>
          <h2 className="text-4xl font-display font-black">RAG Implementation</h2>
          <p className="text-white/50 max-w-xl">
             Teaching models to read. Instead of guessing, the AI "look up" facts from a library (Vector Database).
          </p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 glass rounded-xl text-xs font-bold border-white/5 flex items-center gap-2 hover:bg-white/10 transition-colors">
              <Plus className="w-4 h-4" />
              Upload Source
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input & Retrival View */}
        <div className="space-y-6">
           {/* Search Box */}
           <div className="glass rounded-3xl p-6 border-white/5 space-y-4">
              <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
                <Search className="w-4 h-4" />
                Query Input
              </div>
              <div className="flex gap-4">
                 <input 
                   type="text" 
                   value={query}
                   onChange={(e) => setQuery(e.target.value)}
                   className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 focus:border-blue-500/50 outline-none transition-all placeholder:text-white/20"
                   placeholder="Enter a complex question..."
                 />
                 <button 
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all disabled:bg-white/5 disabled:text-white/20"
                 >
                    {isSearching ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                 </button>
              </div>
           </div>

           {/* Vector Database Visual */}
           <div className="glass rounded-3xl p-6 border-white/5 flex-1 min-h-[400px] flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/5" />
              <div className="relative z-10 flex items-center justify-between">
                 <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
                    <Layers className="w-4 h-4" />
                    Knowledge Chunks
                 </div>
                 <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">12,504 VECTORS</span>
              </div>
              
              <div className="relative z-10 flex-1 grid grid-cols-1 gap-3 overflow-y-auto no-scrollbar pr-2">
                 <AnimatePresence>
                    {foundChunks.length > 0 ? (
                       foundChunks.map((chunk, i) => (
                          <motion.div 
                             key={i}
                             initial={{ opacity: 0, x: -20 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ delay: i * 0.1 }}
                             className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-start gap-4 group hover:bg-blue-500/20 transition-colors"
                          >
                             <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5 text-blue-400" />
                             </div>
                             <div className="space-y-1">
                                <p className="text-xs text-white/80 leading-relaxed font-medium">"{chunk}"</p>
                                <div className="flex gap-2 text-[8px] font-bold text-white/20 uppercase tracking-widest">
                                   <span>Chunk ID: #92{i}</span>
                                   <span>•</span>
                                   <span>Similarity: 0.9{9-i}</span>
                                </div>
                             </div>
                          </motion.div>
                       ))
                    ) : (
                       <div className="flex-1 flex flex-col items-center justify-center gap-4 text-white/10 opacity-50">
                          <Database className="w-20 h-20" />
                          <p className="text-sm font-bold font-display uppercase tracking-widest">Waiting for Retrieval</p>
                       </div>
                    )}
                 </AnimatePresence>
              </div>
           </div>
        </div>

        {/* Output & Process View */}
        <div className="space-y-6">
           {/* Pipeline Animation */}
           <div className="glass rounded-3xl p-8 border-white/5 space-y-8 flex flex-col items-center justify-center relative min-h-[250px]">
              <div className="flex items-center gap-4 w-full justify-between">
                 {[
                   { id: 1, icon: <MessageSquare /> },
                   { id: 2, icon: <Search /> },
                   { id: 3, icon: <Database /> },
                   { id: 4, icon: <Sparkles /> }
                 ].map((s) => (
                   <motion.div 
                     key={s.id}
                     animate={{ 
                        scale: step === s.id ? 1.2 : 1,
                        opacity: step >= s.id ? 1 : 0.2,
                        boxShadow: step === s.id ? '0 0 20px rgba(59, 130, 246, 0.4)' : 'none'
                     }}
                     className={`w-14 h-14 rounded-2xl ${step === s.id ? 'bg-blue-500' : 'bg-white/5'} flex items-center justify-center transition-all duration-500`}
                   >
                     {s.icon}
                   </motion.div>
                 ))}
                 <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -z-10" />
              </div>
              <div className="text-center space-y-1">
                 <p className="text-xs font-bold font-display uppercase tracking-widest text-blue-400">
                    {step === 1 ? 'Query Encoding' : step === 2 ? 'Vector Matching' : step === 3 ? 'Knowledge Injection' : step === 4 ? 'Augmented Generation' : 'System Idle'}
                 </p>
                 <p className="text-[10px] text-white/30 italic">Process: Pipeline interaction simulation</p>
              </div>
           </div>

           {/* Final Output */}
           <div className="glass rounded-3xl p-8 border-white/5 flex-1 min-h-[350px] space-y-6 flex flex-col">
              <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                RAG-Enhanced Output
              </div>
              <div className="flex-1 bg-black/20 rounded-3xl p-8 border border-white/5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                    <Database className="w-12 h-12 text-blue-400" />
                 </div>
                 <AnimatePresence>
                    {finalOutput ? (
                       <motion.p 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         className="text-lg font-display leading-relaxed text-white/90"
                       >
                          {finalOutput}
                       </motion.p>
                    ) : (
                       <div className="h-full flex flex-col items-center justify-center gap-4 text-white/10 italic">
                          <span>Waiting for augmented result...</span>
                       </div>
                    )}
                 </AnimatePresence>
              </div>
              <div className="flex items-center gap-4 justify-center">
                 <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/30 uppercase">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Grounded Answer
                 </div>
                 <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/30 uppercase">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    Zero Hallucination
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RAGModule;
