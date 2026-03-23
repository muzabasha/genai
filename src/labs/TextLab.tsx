import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Layers, Database, BrainCircuit, Type, MapPin, Sparkles, RefreshCw, Quote,
  Settings2, Trophy, Microscope, Beaker, MessageSquare, BookOpen
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const steps = [
  { id: 'input', label: 'Input', icon: <Type className="w-4 h-4" />, color: 'bg-blue-500', desc: 'Raw sentences shared by you.' },
  { id: 'encoding', label: 'Encoding', icon: <Layers className="w-4 h-4" />, color: 'bg-indigo-500', desc: 'Breaking text into LEGO-like tokens.' },
  { id: 'representation', label: 'Representation', icon: <MapPin className="w-4 h-4" />, color: 'bg-purple-500', desc: 'Finding word coordinates in space.' },
  { id: 'retrieval', label: 'Retrieval (RAG)', icon: <Database className="w-4 h-4" />, color: 'bg-emerald-500', desc: 'Injecting knowledge from external sources.' },
  { id: 'decision', label: 'Decision (RL)', icon: <BrainCircuit className="w-4 h-4" />, color: 'bg-rose-500', desc: 'Learning what makes a good response.' },
  { id: 'output', label: 'Output', icon: <Zap className="w-4 h-4" />, color: 'bg-amber-500', desc: 'Generating the final magic result.' }
];

const TextLab: React.FC = () => {
  const [input, setInput] = useState("Once upon a time in space...");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [output, setOutput] = useState("");
  const [showResearch, setShowResearch] = useState(false);
  
  // Research tools
  const [temperature, setTemperature] = useState(0.7);
  const [topK, setTopK] = useState(50);
  
  // Intermediate data for visualization
  const [tokens, setTokens] = useState<string[]>([]);
  const [embeddings, setEmbeddings] = useState<number[]>([]);
  const [ragFacts, setRagFacts] = useState<string[]>([]);

  const generateResponse = async () => {
    setIsGenerating(true);
    setCurrentStep('input');
    setOutput("");
    
    // Step 1: Tokenization
    await new Promise(r => setTimeout(r, 800));
    setTokens(input.split(" "));
    setCurrentStep('encoding');

    // Step 2: Embedding
    await new Promise(r => setTimeout(r, 800));
    setEmbeddings(Array.from({ length: 8 }, () => parseFloat((Math.random() * 2 - 1).toFixed(2))));
    setCurrentStep('representation');

    // Step 3: RAG
    await new Promise(r => setTimeout(r, 1000));
    setRagFacts(["The Andromeda galaxy is 2.5M light years away.", "Space is a near-perfect vacuum."]);
    setCurrentStep('retrieval');

    // Step 4: Logic Decision
    await new Promise(r => setTimeout(r, 800));
    setCurrentStep('decision');

    // Step 5: Output Generation
    await new Promise(r => setTimeout(r, 500));
    setCurrentStep('output');
    
    const responses = [
      "...the stars whispered secrets of a forgotten galaxy.",
      "...a small robot realized its battery was at 1%.",
      "...nothing happened, as physics is quite strict."
    ];
    setOutput(responses[Math.floor(Math.random() * responses.length)]);
    setIsGenerating(false);
    toast.success("Response Synthesized!");
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-32 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary-400 font-bold uppercase tracking-widest text-xs">
            <Microscope className="w-4 h-4" />
            Linguistic Research Lab
          </div>
          <h2 className="text-5xl font-display font-black leading-tight text-white">Language Transformers Deep Dive</h2>
          <p className="text-white/40 max-w-2xl text-sm leading-relaxed italic">
             Investigate how machines "understand" through Attention and Latent Vectors. Manipulate Temperature and Top-K Sampling to control stochasticity.
          </p>
        </div>
        <button onClick={() => setShowResearch(!showResearch)} className={`px-5 py-2.5 rounded-2xl border transition-all flex items-center gap-2 font-bold text-sm ${showResearch ? 'bg-primary-600 border-primary-500 text-white' : 'glass border-white/5 text-white/60'}`}>
          <Settings2 className="w-4 h-4" />
          Research Mode
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Research Panel */}
        <div className="lg:col-span-1 space-y-6">
          <AnimatePresence>
            {showResearch && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass rounded-4xl p-8 border-white/5 space-y-8 shadow-2xl bg-primary-500/[0.02]">
                 <div className="flex items-center gap-2 text-primary-400 text-xs font-black uppercase tracking-widest">
                   <Beaker className="w-4 h-4" />
                   Sampler Hyperparams
                 </div>
                 
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>Temperature</span>
                          <span className="text-primary-300">{temperature}</span>
                       </div>
                       <input type="range" min="0.1" max="2.0" step="0.1" value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-primary-500 shadow-inner" />
                       <p className="text-[10px] text-white/20 italic leading-tight">High temperature makes the AI "randomly explore" low-probability tokens.</p>
                    </div>

                    <div className="space-y-3">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>Top-K Sampling</span>
                          <span className="text-primary-300">{topK}</span>
                       </div>
                       <input type="range" min="1" max="100" step="1" value={topK} onChange={(e) => setTopK(parseInt(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-primary-500 shadow-inner" />
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="glass rounded-4xl p-8 border-white/5 space-y-6 shadow-2xl bg-primary-500/5">
             <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-widest">
                <Trophy className="w-4 h-4" />
                Mastery Challenges
             </div>
             <div className="space-y-4">
                {[
                  { id: 1, title: 'The Hallucination Test', desc: 'Set temperature to 2.0 and generate a response. Can you spot facts turning into nonsense?' },
                  { id: 2, title: 'The Rigid Poet', desc: 'Set temperature to 0.1 and generate multiple times. Why is the response always the same?' },
                  { id: 3, title: 'Knowledge Injector', desc: 'Check the RAG step. How does external data change the "Andromeda" result?' }
                ].map(c => (
                  <div key={c.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-amber-400/40 transition-colors pointer-events-auto cursor-help group text-left">
                     <div className="text-[10px] font-bold text-amber-500 group-hover:scale-105 transition-transform origin-left">Challenge #{c.id}</div>
                     <div className="text-xs font-bold text-white mt-1">{c.title}</div>
                     <p className="text-[10px] text-white/30 mt-1 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Center Main Stage */}
        <div className="lg:col-span-3 space-y-8 text-left">
           <div className="glass rounded-[3rem] p-10 border-white/5 min-h-[500px] flex flex-col items-center justify-center gap-12 relative overflow-hidden bg-black/20 text-white shadow-2xl">
              <div className="absolute inset-0 bg-grid-white/[0.02] shadow-inner" />
              
              <div className="w-full max-w-xl space-y-6 relative z-20">
                 <div className="flex items-center gap-3 text-primary-400 text-[10px] font-black uppercase tracking-[0.4em]">
                    <Quote className="w-4 h-4" />
                    Conversation Prompt
                 </div>
                 <div className="relative group">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="w-full bg-white/5 border-none rounded-[1.5rem] p-8 pl-14 text-xl font-display font-medium focus:ring-2 ring-primary-500/20 outline-none placeholder:text-white/10 text-white" placeholder="Type a research seed..." />
                    <Sparkles className="absolute left-6 top-9 w-6 h-6 text-white/20 group-focus-within:text-primary-500 transition-colors" />
                 </div>
                 <button onClick={generateResponse} disabled={isGenerating} className={`w-full py-5 rounded-2xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 transition-all ${isGenerating ? 'bg-white/5 text-white/10' : 'bg-primary-600 shadow-2xl shadow-primary-900/40 hover:scale-105 active:scale-95 text-white'}`}>
                    {isGenerating ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><RefreshCw className="w-5 h-5" /></motion.div> : <Zap className="w-5 h-5" />}
                    {isGenerating ? 'Simulating Transformer Paths...' : 'Execute Full Investigation'}
                 </button>
              </div>

              {/* Progress Pipeline */}
              <div className="w-full flex justify-between px-12 relative z-20 h-24 items-end">
                 {steps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center group relative cursor-help">
                       <AnimatePresence>
                          {currentStep === step.id && (
                             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute -top-14 bg-primary-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-black whitespace-nowrap shadow-xl">
                                IN PROGRESS
                             </motion.div>
                          )}
                       </AnimatePresence>
                       <motion.div animate={{ scale: currentStep === step.id ? 1.2 : 1, opacity: currentStep === step.id ? 1 : 0.3 }} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${currentStep === step.id ? step.color + ' shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/10'}`}>
                          {step.icon}
                       </motion.div>
                       <span className={`text-[9px] font-black uppercase mt-3 tracking-wider ${currentStep === step.id ? 'text-primary-400' : 'text-white/20'}`}>{step.label}</span>
                    </div>
                 ))}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[2px] bg-white/5 -z-10" />
              </div>

              {/* Intermediate Data Display */}
              <div className="w-full min-h-[120px] glass rounded-3xl border-white/5 bg-white/[0.02] p-8 flex items-center justify-center relative z-20">
                  <AnimatePresence mode="wait">
                    {currentStep === 'encoding' ? (
                       <motion.div key="enc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2 text-primary-200">
                          {tokens.map((t, i) => (
                             <div key={i} className="px-3 py-1 bg-primary-500/20 rounded border border-primary-500/30 text-xs font-mono">[{t}]</div>
                          ))}
                       </motion.div>
                    ) : currentStep === 'representation' ? (
                       <motion.div key="rep" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex gap-4 items-center">
                          <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">Latent Vector Dimensions:</div>
                          <div className="flex gap-1">
                             {embeddings.map((e, i) => (
                                <motion.div key={i} animate={{ height: [10, Math.abs(e * 40), 10] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }} className="w-2 bg-indigo-500 rounded-full" title={e.toString()} />
                             ))}
                          </div>
                          <div className="font-mono text-[10px] text-indigo-400">[{embeddings.join(", ")}]</div>
                       </motion.div>
                    ) : currentStep === 'retrieval' ? (
                       <motion.div key="rag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 w-full">
                          <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                             <Database className="w-4 h-4" /> Vector Store Injection
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             {ragFacts.map((f, i) => (
                                <div key={i} className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-[10px] italic leading-relaxed text-emerald-100">"{f}"</div>
                             ))}
                          </div>
                       </motion.div>
                    ) : currentStep === 'decision' ? (
                       <motion.div key="dec" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex items-center justify-center gap-10">
                          <div className="text-center space-y-2">
                             <div className="w-12 h-12 rounded-full border-4 border-rose-500 border-t-transparent animate-spin mx-auto" />
                             <div className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Self-Attention Mapping</div>
                          </div>
                          <div className="text-left space-y-2">
                             <div className="text-[10px] text-white/40 font-black uppercase tracking-widest">Softmax(QK<sup>T</sup> / sqrt(dk)) V</div>
                             <div className="h-1.5 w-48 bg-white/10 rounded-full overflow-hidden">
                                <motion.div animate={{ x: [-100, 200] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1/2 h-full bg-rose-500 shadow-[0_0_15px_#f43f5e]" />
                             </div>
                          </div>
                       </motion.div>
                    ) : currentStep === 'output' || output ? (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full text-center p-12 text-white">
                          <p className="text-2xl md:text-3xl font-display font-medium leading-normal max-w-3xl mx-auto">
                             <span className="text-white/30">{input}</span>
                             <span className="text-primary-400">{output}</span>
                             {isGenerating && <motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity }} className="inline-block w-2 h-8 bg-primary-500 ml-2 translate-y-1.5" />}
                          </p>
                          {!isGenerating && (
                            <motion.button onClick={() => setCurrentStep('input')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 px-8 py-3 glass rounded-xl border-white/10 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">Reset Investigation</motion.button>
                          )}
                       </motion.div>
                    ) : (
                       <div className="flex flex-col items-center gap-6">
                          <div className="w-20 h-20 rounded-4xl bg-white/5 flex items-center justify-center">
                            <Zap className="w-10 h-10 text-white/10" />
                          </div>
                          <p className="text-xs font-bold text-white/20 uppercase tracking-[0.3em]">Initialize Inference to see internal state</p>
                       </div>
                    )}
                  </AnimatePresence>
              </div>
           </div>

           {/* --- Discussion & Equations Section --- */}
           <div className="space-y-8 mt-12 text-left">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <MessageSquare className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Interactive Discussion Session</h3>
                    <p className="text-sm text-white/40 italic">Open-ended research questions and mathematical term interpretations.</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Research Discussion 1 */}
                 <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 bg-indigo-500/[0.02] shadow-xl">
                    <div className="flex items-center gap-3 text-indigo-400 font-black text-xs uppercase tracking-widest">
                       <BookOpen className="w-4 h-4" />
                       Topic 1: Stochastic Sampling
                    </div>
                    <div className="space-y-4">
                       <blockquote className="text-sm text-white/60 italic border-l-2 border-indigo-500/30 pl-4 py-1 leading-relaxed">
                          "Does a higher Temperature improve creativity, or just increase the probability of factual errors (hallucinations)?"
                       </blockquote>
                       <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                          <div className="flex justify-center text-xl font-mono text-indigo-300 py-2">
                             P(w<sub>i</sub>) = exp(z<sub>i</sub>/T) / ∑ exp(z<sub>j</sub>/T)
                          </div>
                          <div className="grid grid-cols-1 gap-3 text-[10px] uppercase font-black text-white/40 border-t border-white/5 pt-4">
                             <div className="flex justify-between">
                                <span>T</span>
                                <span className="text-indigo-400">Temperature (Hyperparameter)</span>
                             </div>
                             <div className="flex justify-between">
                                <span>z<sub>i</sub></span>
                                <span className="text-indigo-400">Logit Score (Core model output)</span>
                             </div>
                             <div className="flex justify-between">
                                <span>P(w<sub>i</sub>)</span>
                                <span className="text-indigo-400">Final Probability of selecting a word</span>
                             </div>
                          </div>
                       </div>
                       <p className="text-[11px] text-white/30 leading-relaxed">
                          <strong className="text-white/60">Illustration:</strong> Imagine a hilly landscape where peaks are "likely words". As T increases, the hills "flatten". This makes the AI less likely to stick to the highest peak (greedy) and more likely to wander into the valleys (less likely words), which often results in poetic but factually shaky responses.
                       </p>
                    </div>
                 </div>

                 {/* Research Discussion 2 */}
                 <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 bg-indigo-500/[0.02] shadow-xl">
                    <div className="flex items-center gap-3 text-indigo-400 font-black text-xs uppercase tracking-widest">
                       <BrainCircuit className="w-4 h-4" />
                       Topic 2: Self-Attention Context
                    </div>
                    <div className="space-y-4">
                       <blockquote className="text-sm text-white/60 italic border-l-2 border-indigo-500/30 pl-4 py-1 leading-relaxed text-left">
                          "How does a Transformer 'know' that 'it' refers to 'The Andromeda Galaxy' even if they are 50 words apart?"
                       </blockquote>
                       <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                          <div className="flex justify-center text-xl font-mono text-rose-300 py-2">
                             Attention(Q,K,V) = softmax(QK<sup>T</sup> / √d<sub>k</sub>) V
                          </div>
                          <div className="grid grid-cols-1 gap-3 text-[10px] uppercase font-black text-white/40 border-t border-white/5 pt-4">
                             <div className="flex justify-between">
                                <span>Q (Query)</span>
                                <span className="text-rose-400">"What am I looking for?"</span>
                             </div>
                             <div className="flex justify-between">
                                <span>K (Keys)</span>
                                <span className="text-rose-400">"What information do I have?"</span>
                             </div>
                             <div className="flex justify-between">
                                <span>V (Values)</span>
                                <span className="text-rose-400">The actual data being weighted</span>
                             </div>
                          </div>
                       </div>
                       <p className="text-[11px] text-white/30 leading-relaxed text-left">
                          <strong className="text-white/60">Illustration:</strong> Think of a highlighted spotlight. The Query (Q) is the spotlight beam. The Keys (K) are objects on stage. The Dot Product (QK<sup>T</sup>) measures how well the beam hits each object. If the beam hits "Andromeda" perfectly, the AI gives high weight (V) to that concept when processing the word "it".
                       </p>
                    </div>
                 </div>
              </div>

              {/* Interaction Call-to-Action */}
              <div className="p-8 rounded-[3rem] bg-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.2)] border border-white/10 text-center space-y-4">
                 <h4 className="text-lg font-black uppercase tracking-widest">Interactive Session Prompt</h4>
                 <p className="text-sm text-indigo-100/70 max-w-xl mx-auto leading-relaxed">
                   "If we had a context window of only 10 tokens, how would a long scientific paper lose its factual consistency? Try setting extreme Top-K values (e.g., K=1 vs K=100) and discuss the difference in response repetition."
                 </p>
              </div>
           </div>

           {/* --- Advanced Research Vault --- */}
           <div className="mt-16 space-y-8 text-left">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Database className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">SOTA Model Research Vault</h3>
                    <p className="text-sm text-white/40 italic">Technical benchmarking, experimental setups, and open research gaps.</p>
                 </div>
              </div>

              <div className="glass rounded-[2.5rem] border-white/5 overflow-hidden shadow-2xl bg-indigo-500/5">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-indigo-400 font-black">
                             <th className="p-6">Model Architecture</th>
                             <th className="p-6">Complexity O(.)</th>
                             <th className="p-6">Eval Parameters</th>
                             <th className="p-6">Technical Execution</th>
                             <th className="p-6">Experimental Setup</th>
                             <th className="p-6">Current Gaps</th>
                          </tr>
                       </thead>
                       <tbody className="text-[11px] text-white/60 leading-relaxed font-medium">
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">Transformer (Llama-3)</td>
                             <td className="p-6 font-mono text-indigo-400">O(L² · d)</td>
                             <td className="p-6 italic">PPL, BPC, Human-Eval (75.4%)</td>
                             <td className="p-6">Multi-Head Attention (MHA) + RoPE Positional Embeddings + GQA (Grouped Query).</td>
                             <td className="p-6 text-white/30 truncate max-w-[200px]">15.6T Tokens (Refined Pile); 24k H100 Cluster; 800GB/s I/O bandwidth.</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] leading-tight flex flex-col gap-1">
                                <span>- Context Quadratic Wall</span>
                                <span>- Logical Consistency Drift</span>
                             </td>
                          </tr>
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">Mamba (SSM)</td>
                             <td className="p-6 font-mono text-emerald-400">O(L · d)</td>
                             <td className="p-6 italic">Recall@Context 128k</td>
                             <td className="p-6">Selectivity Scan (S6); Discretized Linear ODEs via Associative Scan.</td>
                             <td className="p-6 text-white/30">1.2T Tokens; Triton Kernel Optimization; No KV-Cache required.</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] leading-tight flex flex-col gap-1">
                                <span>- State Collapse in Loop</span>
                                <span>- Rare Token Retrieval Failure</span>
                             </td>
                          </tr>
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">RWKV (RNN-mode)</td>
                             <td className="p-6 font-mono text-amber-400">O(L · d)</td>
                             <td className="p-6 italic">Throughput (Tokens/sec)</td>
                             <td className="p-6">Time-Mix & Channel-Mix Gates; Zero KV-cache growth; RNN scalability.</td>
                             <td className="p-6 text-white/30">Pile v1; 500B Tokens; 8x A100 training; BF16 Precision.</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] leading-tight flex flex-col gap-1">
                                <span>- Vanishing Gradient in Depth</span>
                                <span>- Weak Multi-Head Dynamics</span>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>

               {/* --- Architectural Block Diagram --- */}
               <div className="space-y-8 mt-12">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                        <Microscope className="w-5 h-5" />
                     </div>
                     <h4 className="text-xl font-black text-white uppercase tracking-tight">Decoder-Only Architecture (Llama-3)</h4>
                  </div>

                  <div className="relative overflow-hidden glass rounded-[3rem] border-white/5 p-10 bg-indigo-500/[0.03]">
                     <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        {/* Block 1: Input */}
                        <div className="w-full md:w-48 p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
                           <div className="text-[10px] font-black text-indigo-400 uppercase">Input Layer</div>
                           <div className="text-sm font-bold text-white">Tokenizer & Embeds</div>
                           <div className="text-[9px] text-white/40 leading-tight">Converts discrete tokens into high-dim vectors (d_model).</div>
                        </div>

                        <div className="hidden md:block text-indigo-500/30">
                           <RefreshCw className="w-6 h-6 animate-spin-slow" />
                        </div>

                        {/* Block 2: Transformer Block */}
                        <div className="w-full md:w-64 p-6 rounded-3xl bg-indigo-500/10 border border-white/10 text-center space-y-4 shadow-2xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-2 opacity-10">
                              <BrainCircuit className="w-12 h-12" />
                           </div>
                           <div className="text-[10px] font-black text-indigo-400 uppercase">Hidden Core</div>
                           <div className="text-sm font-black text-white">N × Transformer Blocks</div>
                           <div className="space-y-2">
                              <div className="p-2 rounded-lg bg-black/40 text-[9px] text-white/60">GQA Architecture (Attention)</div>
                              <div className="p-2 rounded-lg bg-black/40 text-[9px] text-white/60">SwiGLU FFN (Feed-Forward)</div>
                           </div>
                        </div>

                        <div className="hidden md:block text-indigo-500/30">
                           <RefreshCw className="w-6 h-6 animate-spin-slow" />
                        </div>

                        {/* Block 3: Output */}
                        <div className="w-full md:w-48 p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
                           <div className="text-[10px] font-black text-indigo-400 uppercase">Output Layer</div>
                           <div className="text-sm font-bold text-white">Softmax & Logits</div>
                           <div className="text-[9px] text-white/40 leading-tight">Predicts probability distribution over vocabulary.</div>
                        </div>
                     </div>

                     {/* Equations & Data Flow */}
                     <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-10">
                        <div className="space-y-6">
                           <div className="text-xs font-black text-indigo-400 uppercase tracking-widest text-left">The Data Flow Equation</div>
                           <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                              <div className="text-sm md:text-lg font-mono text-center text-white leading-relaxed">
                                 H<sub>l+1</sub> = Norm(x + MHA(x)) <br/>
                                 x<sub>out</sub> = Norm(H<sub>l+1</sub> + FFN(H<sub>l+1</sub>))
                              </div>
                           </div>
                           <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]" />
                                 <p className="text-[10px] text-white/40 leading-relaxed font-black uppercase italic text-left">
                                    <strong className="text-white">Interpretation:</strong> The data flows in "Residual Streams". Each layer doesn't rewrite the data; it only adds tiny bits of logic (Attention) to the existing stream.
                                 </p>
                              </div>
                              <div className="flex items-start gap-3">
                                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]" />
                                 <p className="text-[10px] text-white/40 leading-relaxed font-black uppercase italic text-left">
                                    <strong className="text-white">Equation Term (MHA):</strong> Multi-Head Attention allows the vector to "look" at other tokens to gain context before passing to the next block.
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <div className="text-xs font-black text-indigo-400 uppercase tracking-widest text-left">Block Responsibilities</div>
                           <div className="grid grid-cols-1 gap-4">
                              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                 <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex-shrink-0 flex items-center justify-center text-indigo-400 font-black text-[10px]">RMS</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black text-white uppercase">RMSNorm</div>
                                    <div className="text-[9px] text-white/30 leading-tight">Stabilizes gradients by keeping vector magnitudes constant throughout the 128 layers.</div>
                                 </div>
                              </div>
                              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                 <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex-shrink-0 flex items-center justify-center text-indigo-400 font-black text-[10px]">RoPE</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black text-white uppercase">Positional Encoding</div>
                                    <div className="text-[9px] text-white/30 leading-tight">Rotates the vector space physically to tell the AI "where" a word is, relative to others.</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-12">
                  <div className="p-6 glass rounded-3xl border-white/5 bg-indigo-500/5 space-y-2">
                     <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Parameter Interpretation</div>
                     <div className="text-xs font-bold text-white">Perplexity (PPL)</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black">Inverse probability of the test set; measures how "uncertain" the AI is during prediction.</p>
                  </div>
                  <div className="p-6 glass rounded-3xl border-white/5 bg-indigo-500/5 space-y-2">
                     <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Experimental Limitation</div>
                     <div className="text-xs font-bold text-white">The Quadratic Wall</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black">Transformers cannot process context beyond 2M tokens without O(N²) memory overflow.</p>
                  </div>
                  <div className="p-6 glass rounded-3xl border-white/5 bg-indigo-500/5 space-y-2">
                     <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Research Roadmap</div>
                     <div className="text-xs font-bold text-white">Logical Grounding</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black">Solve for System 2 thinking: making the AI verify its own logic before outputting text.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default TextLab;
