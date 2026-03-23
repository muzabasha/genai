import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Search, Send, FileText, Brain, Layout, Settings2, Trophy, Microscope, Beaker, MessageSquare, BookOpen, BrainCircuit, Layers, RefreshCw
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const RAGModule: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState<string | null>(null);
  const [showResearch, setShowResearch] = useState(false);
  
  // Research tools
  const [kNeighbors, setKNeighbors] = useState(3);
  const [diversityPenalty, setDiversityPenalty] = useState(0.5);
  const [similarityThreshold, setSimilarityThreshold] = useState(0.8);

  const stages = [
    { id: 'retrieval', label: 'Retrieval', icon: <Search className="w-4 h-4" />, color: 'bg-blue-500' },
    { id: 'augmentation', label: 'Augmentation', icon: <FileText className="w-4 h-4" />, color: 'bg-indigo-500' },
    { id: 'generation', label: 'Generation', icon: <Brain className="w-4 h-4" />, color: 'bg-purple-500' }
  ];

  const handleQuery = async () => {
    setIsProcessing(true);
    setCurrentStage('retrieval');
    await new Promise(r => setTimeout(r, 1200));
    setCurrentStage('augmentation');
    await new Promise(r => setTimeout(r, 1200));
    setCurrentStage('generation');
    await new Promise(r => setTimeout(r, 1500));
    setIsProcessing(false);
    toast.success("RAG Pipeline Completed!");
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-32 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-xs">
            <Microscope className="w-4 h-4" />
            Knowledge Systems Lab
          </div>
          <h2 className="text-5xl font-display font-black leading-tight text-white">Retrieval Augmented Generation</h2>
          <p className="text-white/40 max-w-2xl text-sm leading-relaxed italic border-none">
             Investigate how factual retrieval "grounds" AI models. Manipulate K-Neighbors and Diversity Penalties to control the quality of the injected knowledge.
          </p>
        </div>
        <button onClick={() => setShowResearch(!showResearch)} className={`px-5 py-2.5 rounded-2xl border transition-all flex items-center gap-2 font-bold text-sm ${showResearch ? 'bg-blue-600 border-blue-500 text-white' : 'glass border-white/5 text-white/60'}`}>
          <Settings2 className="w-4 h-4" />
          Research Mode
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Research Panel */}
        <div className="lg:col-span-1 space-y-6">
          <AnimatePresence>
            {showResearch && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass rounded-[2rem] p-8 border-white/5 space-y-8 shadow-2xl bg-blue-500/[0.02] text-left">
                 <div className="flex items-center gap-2 text-blue-400 text-xs font-black uppercase tracking-widest">
                   <Beaker className="w-4 h-4" />
                   Retrieval Hyperparams
                 </div>
                 
                 <div className="space-y-6 text-left">
                    <div className="space-y-3 text-left">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>K-Neighbors</span>
                          <span className="text-blue-300">{kNeighbors} Docs</span>
                       </div>
                       <input type="range" min="1" max="10" step="1" value={kNeighbors} onChange={(e) => setKNeighbors(parseInt(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-blue-500 shadow-inner" />
                       <p className="text-[10px] text-white/20 italic leading-tight uppercase font-black text-left">Controls how many context documents are retrieved for each query.</p>
                    </div>

                    <div className="space-y-3 text-left">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>Diversity Penalty</span>
                          <span className="text-blue-300">{diversityPenalty.toFixed(1)}</span>
                       </div>
                       <input type="range" min="0" max="1.0" step="0.1" value={diversityPenalty} onChange={(e) => setDiversityPenalty(parseFloat(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-blue-500 shadow-inner" />
                    </div>

                    <div className="space-y-3 text-left">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>Similarity Threshold</span>
                          <span className="text-blue-300">{similarityThreshold.toFixed(2)}</span>
                       </div>
                       <input type="range" min="0.5" max="0.99" step="0.01" value={similarityThreshold} onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-blue-500 shadow-inner" />
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 shadow-2xl bg-blue-500/5">
             <div className="flex items-center gap-2 text-amber-500 text-xs font-black uppercase tracking-widest text-white">
                <Trophy className="w-4 h-4" />
                Mastery Challenges
             </div>
             <div className="space-y-4">
                {[
                  { id: 1, title: 'Context Overload', desc: 'Set K to 10. Does bringing in more documents make the AI more accurate or just confused?' },
                  { id: 2, title: 'Precision Filter', desc: 'Set Threshold to 0.99. Observe how the pipeline often fails to find "good" data. Why is that?' },
                  { id: 3, title: 'The Diversifier', desc: 'Can you find a K and Penalty setting that provides multiple perspectives on a topic?' }
                ].map(c => (
                  <div key={c.id} className="p-4 rounded-[1.5rem] bg-white/5 border border-white/5 hover:border-amber-400/40 transition-colors pointer-events-auto cursor-help group text-left">
                     <div className="text-[10px] font-bold text-amber-500 group-hover:scale-105 transition-transform origin-left">Challenge #{c.id}</div>
                     <div className="text-xs font-bold text-white mt-1">{c.title}</div>
                     <p className="text-[10px] text-white/30 mt-1 leading-relaxed text-left">{c.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Center Visualizer Area */}
        <div className="lg:col-span-3 space-y-8 text-left">
           <div className="glass rounded-[3rem] p-10 border-white/5 min-h-[500px] relative overflow-hidden flex flex-col items-center justify-center gap-10 bg-black/20 shadow-2xl text-white">
              <div className="absolute inset-0 bg-grid-white/[0.03] opacity-40 shadow-inner" />
              
              <div className="w-full max-w-xl space-y-4 relative z-20 text-left">
                 <div className="flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
                    <Database className="w-4 h-4 text-blue-400" />
                    Query Pipeline Trigger
                 </div>
                 <div className="relative group text-left">
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-white/5 border-none rounded-[1.5rem] p-7 pl-16 text-lg font-display font-medium focus:ring-2 ring-blue-400/20 outline-none text-white placeholder:text-white/10" placeholder="Find me facts about..." />
                    <Search className="absolute left-6 top-8 w-6 h-6 text-blue-400" />
                    <button onClick={handleQuery} disabled={isProcessing} className="absolute right-4 top-4 p-4 bg-blue-600 rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40">
                       <Send className="w-5 h-5" />
                    </button>
                 </div>
              </div>

              {/* RAG Visualization */}
              <div className="w-full max-w-3xl flex justify-between gap-4 px-8 relative z-10 text-left">
                 {stages.map((stage) => (
                    <div key={stage.id} className="flex-1 text-center space-y-4 text-left">
                       <motion.div 
                          animate={currentStage === stage.id ? { scale: 1.1, opacity: 1 } : { scale: 1, opacity: 0.3 }}
                          className={`w-full aspect-video rounded-3xl flex flex-col items-center justify-center gap-2 border transition-all ${currentStage === stage.id ? stage.color + ' border-white/20 shadow-[0_0_40px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/5'}`}
                       >
                          {stage.icon}
                          <span className="text-[10px] font-black uppercase tracking-widest">{stage.label}</span>
                       </motion.div>
                    </div>
                 ))}
              </div>

              {/* Pipeline Output */}
              <div className="w-full max-w-3xl glass rounded-[2.5rem] p-8 border-white/5 bg-white/[0.02] flex items-center gap-8 relative z-10 text-left">
                 <div className="flex-none w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                    <Layout className="w-8 h-8 text-blue-500/40" />
                 </div>
                 <div className="flex-1 text-left">
                    <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1 text-left">Augmented Feedback Loop</div>
                    <p className="text-sm text-white/40 leading-relaxed italic text-left">
                       {isProcessing ? `Stage: ${currentStage?.toUpperCase()}... searching across ${kNeighbors} neighbor indices...` : 
                       currentStage ? `Grounding locked. System prompt augmented with ${kNeighbors} fact strings.` : 
                       'Enter a query to start the data retrieval process.'}
                    </p>
                 </div>
              </div>
           </div>

           {/* --- Discussion & Equations Section --- */}
           <div className="space-y-8 mt-12 text-left">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <MessageSquare className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Interactive Discussion Session</h3>
                    <p className="text-sm text-white/40 italic">Open-ended research questions and mathematical term interpretations.</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                 {/* Research Discussion 1 */}
                 <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 bg-blue-500/[0.02] shadow-xl text-left">
                    <div className="flex items-center gap-3 text-blue-400 font-black text-xs uppercase tracking-widest font-black">
                       <BookOpen className="w-4 h-4" />
                       Topic 1: Semantic Distance
                    </div>
                    <div className="space-y-4">
                       <blockquote className="text-sm text-white/60 italic border-l-2 border-blue-500/30 pl-4 py-1 leading-relaxed text-left">
                          "How does a computer 'find' similar text if the words are different? For example, 'I am happy' vs 'My mood is joyful'?"
                       </blockquote>
                       <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4 text-left">
                          <div className="flex justify-center text-xl font-mono text-blue-300 py-2">
                             Sim(A, B) = cos(θ) = (A·B) / (||A|| ||B||)
                          </div>
                          <div className="grid grid-cols-1 gap-3 text-[10px] uppercase font-black text-white/40 border-t border-white/5 pt-4 text-left">
                             <div className="flex justify-between">
                                <span>A, B</span>
                                <span className="text-blue-400">Word/Chunk Embeddings (High-dim Vectors)</span>
                             </div>
                             <div className="flex justify-between">
                                <span>θ (Theta)</span>
                                <span className="text-blue-400">The Angle between two concepts</span>
                             </div>
                             <div className="flex justify-between">
                                <span>cos(θ)</span>
                                <span className="text-blue-400">1.0 = Same; 0.0 = Unrelated</span>
                             </div>
                          </div>
                       </div>
                       <p className="text-[11px] text-white/30 leading-relaxed text-left underline-offset-4">
                          <strong className="text-white/60">Illustration:</strong> Think of a Library Card Catalog. Instead of sorted by title, books are floating in air. "Joy" and "Happiness" are floating 2 inches apart. "Joy" and "Tire Iron" are floating on opposite sides of the room. Cosine similarity is simply the distance between them.
                       </p>
                    </div>
                 </div>

                 {/* Research Discussion 2 */}
                 <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 bg-blue-500/[0.02] shadow-xl text-left">
                    <div className="flex items-center gap-3 text-blue-400 font-black text-xs uppercase tracking-widest font-black">
                       <BrainCircuit className="w-4 h-4" />
                       Topic 2: The Context Injection Problem
                    </div>
                    <div className="space-y-4">
                       <blockquote className="text-sm text-white/60 italic border-l-2 border-blue-500/30 pl-4 py-1 leading-relaxed text-left text-left">
                          "If we find 100 relevant documents, can we just give them all to the AI? What if they contradict each other?"
                       </blockquote>
                       <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4 text-left">
                          <div className="flex justify-center text-xl font-mono text-amber-300 py-2">
                             P(y | x, C) = ∏<sub>t</sub> P(y<sub>t</sub> | y<sub>&lt;t</sub>, x, C<sub>1::k</sub>)
                          </div>
                          <div className="grid grid-cols-1 gap-3 text-[10px] uppercase font-black text-white/40 border-t border-white/5 pt-4 text-left">
                             <div className="flex justify-between">
                                <span>C<sub>1::k</sub></span>
                                <span className="text-amber-400">The "k" context chunks retrieved</span>
                             </div>
                             <div className="flex justify-between">
                                <span>y<sub>t</sub></span>
                                <span className="text-amber-400">The final answer generated</span>
                             </div>
                          </div>
                       </div>
                       <p className="text-[11px] text-white/30 leading-relaxed text-left font-black">
                          <strong className="text-white/60">Illustration:</strong> Imagine a Megaphone. The Query is you shouting. The RAG system is a team of assistants running to a library, finding facts, and whispering them into the megaphone with you. If too many assistants talk at once, the output becomes distorted noise.
                       </p>
                    </div>
                 </div>
              </div>

              {/* Interaction Call-to-Action */}
              <div className="p-8 rounded-[3rem] bg-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.2)] border border-white/10 text-center space-y-4">
                 <h4 className="text-lg font-black uppercase tracking-widest text-white">Interactive Session Prompt</h4>
                 <p className="text-sm text-blue-100/70 max-w-xl mx-auto leading-relaxed">
                   "Try setting the 'Similarity Threshold' to 0.95. Discuss why the AI might claim 'I don't know' even if the data is in the database. How does a strict factual filter affect the usability of the system?"
                 </p>
              </div>
           </div>

           {/* --- Advanced Research Vault --- */}
           <div className="mt-16 space-y-8 text-left text-white font-black">
              <div className="flex items-center gap-3 font-black">
                 <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Database className="w-6 h-6" />
                 </div>
                 <div className="text-left font-black">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">RAG Systems Research Vault</h3>
                    <p className="text-sm text-white/40 italic">Benchmarking Knowledge Retrieval and Hallucination Suppression.</p>
                 </div>
              </div>

              <div className="glass rounded-[2.5rem] border-white/5 overflow-hidden shadow-2xl bg-blue-500/5 text-left font-black">
                 <div className="overflow-x-auto text-left font-black">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-blue-400 font-black">
                             <th className="p-6">Architecture</th>
                             <th className="p-6">Retrieval Complexity</th>
                             <th className="p-6">Eval Parameters</th>
                             <th className="p-6">Technical Execution</th>
                             <th className="p-6">Experimental Setup</th>
                             <th className="p-6">Current Gaps</th>
                          </tr>
                       </thead>
                       <tbody className="text-[11px] text-white/60 font-medium leading-relaxed font-black">
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">Naive RAG</td>
                             <td className="p-6 font-mono text-blue-400">O(log N) via HNSW</td>
                             <td className="p-6 italic">Recall@10, Hit Rate</td>
                             <td className="p-6">Vector search (FAISS); Flat index; Prompt-stuffing; Cosine similarity.</td>
                             <td className="p-6 text-white/30 truncate max-w-[150px]">LlamaIndex base; 512 Chunk size; Recursive split; BGE-Large.</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1">
                                <span>- Context Fragmentation</span>
                                <span>- Hallucination Noise</span>
                             </td>
                          </tr>
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">Hybrid Search</td>
                             <td className="p-6 font-mono text-emerald-400">O(BM25 + log N)</td>
                             <td className="p-6 italic">NDCG (Ranking Score)</td>
                             <td className="p-6">Dense (Embeddings) + Sparse (BM25/Keyword). Reciprocal Rank Fusion (RRF).</td>
                             <td className="p-6 text-white/30">Pinecone/Milvus; Cross-encoders; RRF reranking fusion layers.</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1">
                                <span>- Key-term Overtriggering</span>
                                <span>- Multi-step latency wall</span>
                             </td>
                          </tr>
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">GraphRAG</td>
                             <td className="p-6 font-mono text-amber-400">O(V + E) Traversal</td>
                             <td className="p-6 italic">Faithfulness, Factuality</td>
                             <td className="p-6">Knowledge Graph extraction; Community detection; LLM-based entity resolution.</td>
                             <td className="p-6 text-white/30 truncate max-w-[150px]">Neo4j; Microsoft GraphRAG; GPT-4 extraction; Communities.</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1">
                                <span>- Extreme Token Cost</span>
                                <span>- Indexing pipeline complexity</span>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>

               {/* --- Architectural Block Diagram --- */}
               <div className="space-y-8 mt-12 text-left">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-black">
                        <Layers className="w-5 h-5" />
                     </div>
                     <h4 className="text-xl font-black text-white uppercase tracking-tight">RAG Operational Architecture</h4>
                  </div>

                  <div className="relative overflow-hidden glass rounded-[3rem] border-white/5 p-10 bg-blue-500/[0.03] text-left">
                     <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 text-left">
                        {/* Block 1: Retrieval */}
                        <div className="w-full md:w-48 p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2 text-left">
                           <div className="text-[10px] font-black text-blue-400 uppercase">Step 1: Retrieval</div>
                           <div className="text-sm font-bold text-white text-left font-black">Vector DB Engine</div>
                           <div className="text-[9px] text-white/40 leading-tight text-left">Embeds query and performs Approximate Nearest Neighbor (ANN) search to find context.</div>
                        </div>

                        <div className="hidden md:block text-blue-500/30">
                           <RefreshCw className="w-6 h-6 animate-spin-slow" />
                        </div>

                        {/* Block 2: Augmentation */}
                        <div className="w-full md:w-72 p-6 rounded-3xl bg-blue-500/10 border border-white/10 text-center space-y-4 shadow-2xl relative overflow-hidden text-left">
                           <div className="absolute top-0 right-0 p-2 opacity-10">
                              <BrainCircuit className="w-12 h-12" />
                           </div>
                           <div className="text-[10px] font-black text-blue-400 uppercase">Step 2: Augmentation</div>
                           <div className="text-sm font-black text-white text-left">Prompt Engineering Core</div>
                           <div className="space-y-2 text-left">
                              <div className="p-2 rounded-lg bg-black/40 text-[9px] text-white/60">Context Refinement (Reranking)</div>
                              <div className="p-2 rounded-lg bg-black/40 text-[9px] text-white/60">Template Injection (LLM Prompt)</div>
                           </div>
                        </div>

                        <div className="hidden md:block text-blue-500/30">
                           <RefreshCw className="w-6 h-6 animate-spin-slow" />
                        </div>

                        {/* Block 3: Generation */}
                        <div className="w-full md:w-48 p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2 text-left">
                           <div className="text-[10px] font-black text-blue-400 uppercase">Step 3: Generation</div>
                           <div className="text-sm font-bold text-white text-left">Grounded Generation</div>
                           <div className="text-[9px] text-white/40 leading-tight text-left">LLM produces an answer that is restricted/constrained by the injected facts.</div>
                        </div>
                     </div>

                     {/* Equations & Data Flow */}
                     <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-10 text-left">
                        <div className="space-y-6 text-left font-black">
                           <div className="text-xs font-black text-blue-400 uppercase tracking-widest text-left">The Grounded Probabilty Flow</div>
                           <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                              <div className="text-sm md:text-lg font-mono text-center text-white leading-relaxed">
                                 Context = argmax<sub>k</sub> cos(e(q), e(d<sub>k</sub>)) <br/>
                                 Answer = f<sub>LLM</sub> (Query + Context)
                              </div>
                           </div>
                           <div className="space-y-3 font-black text-left">
                              <div className="flex items-start gap-3">
                                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                                 <p className="text-[10px] text-white/40 leading-relaxed font-black uppercase italic text-left">
                                    <strong className="text-white">Interpretation:</strong> We convert words to vectors (e), find the closest facts (argmax cos), and let the LLM synthesize them.
                                 </p>
                              </div>
                              <div className="flex items-start gap-3">
                                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                                 <p className="text-[10px] text-white/40 leading-relaxed font-black uppercase italic text-left">
                                    <strong className="text-white font-black text-left underline-offset-4">Equation Term (e(q)):</strong> The query embedding, a mathematical point in a 1536-dimensional conceptual map.
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6 text-left font-black">
                           <div className="text-xs font-black text-blue-400 uppercase tracking-widest text-left">Block Responsibilities</div>
                           <div className="grid grid-cols-1 gap-4 font-black">
                              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                 <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex-shrink-0 flex items-center justify-center text-blue-400 font-black text-[10px]">HNSW</div>
                                 <div className="text-left font-black">
                                    <div className="text-[10px] font-black text-white uppercase text-left">Indexing Strategy</div>
                                    <div className="text-[9px] text-white/30 leading-tight">Hierarchical Navigable Small Worlds allows searching billions of facts in milliseconds.</div>
                                 </div>
                              </div>
                              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                 <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex-shrink-0 flex items-center justify-center text-blue-400 font-black text-[10px]">REANK</div>
                                 <div className="text-left font-black text-left">
                                    <div className="text-[10px] font-black text-white uppercase text-left">Reranking Logic</div>
                                    <div className="text-[9px] text-white/30 leading-tight text-left">Uses a smarter, slower model to verify if the retrieved docs are truly relevant to the answer.</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-12 pb-12 font-black">
                  <div className="p-6 glass rounded-3xl border-white/5 bg-blue-500/5 space-y-2 text-left font-black">
                     <div className="text-[9px] font-black text-blue-400 uppercase tracking-widest text-left">Parameter Interpretation</div>
                     <div className="text-xs font-bold text-white text-left font-black">Recall@K</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black text-left">Did we find the correct document in the top 'K' results? High recall is critical for specialized medical/legal fields.</p>
                  </div>
                  <div className="p-6 glass rounded-3xl border-white/5 bg-blue-500/5 space-y-2 text-left font-black">
                     <div className="text-[9px] font-black text-blue-400 uppercase tracking-widest text-left">Experimental Limitation</div>
                     <div className="text-xs font-bold text-white text-left font-black text-left">Lost in the Middle</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black text-left">LLMs often ignore document context placed in the middle of a massive retrieved block (u-shaped attention curve).</p>
                  </div>
                  <div className="p-6 glass rounded-3xl border-white/5 bg-blue-500/5 space-y-2 text-left font-black">
                     <div className="text-[9px] font-black text-blue-400 uppercase tracking-widest text-left">Research Roadmap</div>
                     <div className="text-xs font-bold text-white text-left font-black">Agentic Retrieval</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black text-left">Building AI agents that "decide" which database to search based on the query, rather than searching blindly.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default RAGModule;
