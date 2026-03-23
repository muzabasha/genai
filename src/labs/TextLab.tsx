import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Layers, Database, BrainCircuit, Sparkles, Type, MapPin, RefreshCw, Target, BookOpen
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
  const [tokens, setTokens] = useState<string[]>([]);
  const [showMath, setShowMath] = useState(false);
  
  // Intermediate data
  const [vectors, setVectors] = useState<number[]>([]);
  const [retrievedFact, setRetrievedFact] = useState("");
  const [probs, setProbs] = useState<{word: string, p: number}[]>([]);

  const handleGenerate = async () => {
    if (!input) return;
    setIsGenerating(true);
    setCurrentStep('input');
    setOutput("");
    setRetrievedFact("");
    setProbs([]);
    setVectors([]);

    await new Promise(r => setTimeout(r, 800));
    
    setCurrentStep('encoding');
    const newTokens = input.split(/\s+/).map(t => t.toLowerCase().replace(/[^\w]/g, ''));
    setTokens(newTokens);
    await new Promise(r => setTimeout(r, 1000));

    setCurrentStep('representation');
    setVectors(Array.from({ length: 4 }, () => parseFloat((Math.random() * 2 - 1).toFixed(2))));
    await new Promise(r => setTimeout(r, 1000));

    setCurrentStep('retrieval');
    setRetrievedFact("FACT: Starships in the vacuum of space use ion-thrusters for propulsion.");
    await new Promise(r => setTimeout(r, 1000));

    setCurrentStep('decision');
    setProbs([
      { word: "astronauts", p: 82 },
      { word: "aliens", p: 12 },
      { word: "robots", p: 6 }
    ]);
    await new Promise(r => setTimeout(r, 1000));

    setCurrentStep('output');
    const story = " astronauts discovered a floating starship that looked like a giant glowing jellyfish.";
    let currentOutput = "";
    for (const char of story) {
      currentOutput += char;
      setOutput(currentOutput);
      await new Promise(r => setTimeout(r, 20));
    }
    
    setIsGenerating(false);
    toast.success("Generation Complete!");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 text-white">
          <div className="flex items-center gap-2 text-primary-400 font-bold uppercase tracking-widest text-xs">
            <Sparkles className="w-4 h-4" />
            Language Lab
          </div>
          <h2 className="text-4xl font-display font-black">How do LLMs think?</h2>
          <p className="text-white/50 max-w-xl text-sm italic">
             Witness the "Intermediate Representations" — the data changing from words to numbers and back.
          </p>
        </div>
        <button onClick={() => setShowMath(!showMath)} className="px-4 py-2 glass rounded-xl border-white/5 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2 text-white">
          <Target className="w-4 h-4" />
          {showMath ? 'Hide Math Research' : 'Explore Math Theory'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-[2rem] p-6 border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              Your Prompt
            </div>
            
            <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-24 bg-white/5 rounded-2xl p-4 border border-white/10 focus:border-primary-500/50 outline-none resize-none transition-all placeholder:text-white/20 text-sm" placeholder="Write a starting sentence..." />

            <button onClick={handleGenerate} disabled={isGenerating} className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isGenerating ? 'bg-white/5 text-white/20' : 'bg-primary-500 hover:shadow-lg hover:shadow-primary-500/20 active:scale-95'}`}>
              {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              {isGenerating ? 'Processing Stages...' : 'Start Pipeline'}
            </button>
          </div>

          <div className="glass rounded-2xl p-6 border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-primary-400 text-xs font-bold uppercase tracking-wider">
                <Target className="w-4 h-4" />
                Data Transformation
             </div>
             <p className="text-xs text-white/40 leading-relaxed italic">
                In this lab, you don't just see the result. You see the **Hidden Vectors**, the **Retrieval Hits**, and the **Softmax Probabilities** as they happen.
             </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
           <div className="glass rounded-[2.5rem] p-8 border-white/5 min-h-[450px] relative overflow-hidden flex flex-col items-center">
                <div className="w-full flex items-center justify-between px-4 relative z-10 mb-8">
                  {steps.map((step, idx) => (
                    <div key={step.id} className="relative flex flex-col items-center gap-3">
                      <motion.div animate={{ scale: currentStep === step.id ? 1.2 : 1, opacity: currentStep === step.id || !currentStep ? 1 : 0.4, boxShadow: currentStep === step.id ? `0 0 20px rgba(59, 130, 246, 0.4)` : 'none' }} className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${step.color} flex items-center justify-center shadow-lg transition-all duration-500`}>
                         {step.icon}
                      </motion.div>
                      <span className={`text-[8px] md:text-[10px] uppercase font-bold tracking-tighter text-center transition-colors duration-500 ${currentStep === step.id ? 'text-white' : 'text-white/20'}`}>{step.label}</span>
                      {idx < steps.length - 1 && <div className="hidden md:block absolute top-7 left-[65%] w-[70%] h-[1px] bg-white/5" />}
                    </div>
                  ))}
               </div>

               <div className="flex-1 w-full flex flex-col items-center justify-center py-6">
                  <AnimatePresence mode="wait">
                    {currentStep === 'encoding' ? (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4 text-center">
                          <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Intermediate Representation: Tokens</div>
                          <div className="flex flex-wrap justify-center gap-2 max-w-md">
                            {tokens.map((token, i) => (
                              <motion.span key={i} initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-xs font-mono text-indigo-300">
                                 {token}
                              </motion.span>
                            ))}
                          </div>
                       </motion.div>
                    ) : currentStep === 'representation' ? (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4 text-center">
                          <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Intermediate Representation: Embedding Vector</div>
                          <div className="flex items-center gap-4 bg-purple-500/10 border border-purple-500/20 p-6 rounded-3xl font-mono text-xl text-purple-300">
                             [{vectors.join(', ')}]
                          </div>
                          <p className="text-[10px] text-white/40 italic">This is how the AI "sees" your sentence — as a point in a 512D galaxy.</p>
                       </motion.div>
                    ) : currentStep === 'retrieval' ? (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4 text-center max-w-sm">
                          <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Intermediate Representation: Retrieved Context</div>
                          <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl text-sm italic text-emerald-300 leading-relaxed">
                             "{retrievedFact}"
                          </div>
                          <p className="text-[10px] text-white/40 mt-2">Augmenting the original prompt with external truth.</p>
                       </motion.div>
                    ) : currentStep === 'decision' ? (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6 w-full max-w-xs">
                          <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] text-center mb-4">Intermediate Representation: Softmax Probabilities</div>
                          <div className="space-y-3">
                             {probs.map((p, i) => (
                               <div key={i} className="space-y-1">
                                  <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                                     <span className="text-rose-300">{p.word}</span>
                                     <span className="text-white/40">{p.p}%</span>
                                  </div>
                                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                     <motion.div initial={{ width: 0 }} animate={{ width: `${p.p}%` }} className="h-full bg-rose-500" />
                                  </div>
                               </div>
                             ))}
                          </div>
                       </motion.div>
                    ) : currentStep === 'output' || output ? (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 backdrop-blur-md">
                          <p className="text-xl md:text-2xl font-display font-medium leading-relaxed">
                             <span className="text-white/30">{input}</span>
                             <span className="text-primary-400">{output}</span>
                             {isGenerating && <motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity }} className="inline-block w-1.5 h-6 bg-primary-500 ml-1 translate-y-1" />}
                          </p>
                       </motion.div>
                    ) : (
                       <div className="text-white/10 flex flex-col items-center gap-4">
                          <Zap className="w-16 h-16 opacity-5" />
                          <p className="text-sm font-medium opacity-40">Start the pipeline to witness data metamorphosis.</p>
                       </div>
                    )}
                  </AnimatePresence>
               </div>
           </div>

           <AnimatePresence>
             {showMath && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-black/20 border border-white/10 rounded-[2.5rem] p-10 space-y-10 overflow-hidden relative">
                  <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary-500 via-purple-500 to-amber-500 shadow-[0_5px_15px_rgba(59,130,246,0.3)]" />
                  
                  <div className="bg-black/60 p-8 rounded-3xl flex items-center justify-center gap-6 font-mono text-xl md:text-3xl border border-white/10 flex-wrap text-white shadow-inner">
                     <span className="text-primary-400">P(w<sub>i</sub> | w<sub>1</sub>...w<sub>i-1</sub>)</span>
                     <span className="text-white/30">≈</span>
                     <span className="text-white">Softmax(Attention(w<sub>i-1</sub>))</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
                    <div className="space-y-6 text-left">
                      <h4 className="text-sm font-black text-primary-400 uppercase tracking-[0.2em]">The Mathematical Logic</h4>
                      <ul className="space-y-5 text-sm text-white/60">
                        <li className="flex gap-4">
                          <span className="text-primary-400 font-black">P(...) :</span> 
                          <span>Likelihood of the next token in the sequence.</span>
                        </li>
                        <li className="flex gap-4">
                          <span className="text-primary-400 font-black">Attention :</span> 
                          <span>The weights that prioritize past words for context.</span>
                        </li>
                        <li className="flex gap-4">
                          <span className="text-primary-400 font-black">Softmax :</span> 
                          <span>Scaling output scores into a probability sum of 1.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-6 border-l border-white/5 pl-10 text-left">
                       <h4 className="text-sm font-black text-amber-500 uppercase tracking-[0.2em]">The LEGO Analogy</h4>
                       <p className="text-sm text-white/50 leading-relaxed italic">
                         "Each word is a brick. The AI doesn't guess randomly; it checks the architecture of all the bricks you've already placed and finds the most stable next piece."
                       </p>
                    </div>
                  </div>

                  <div className="mt-4 p-8 bg-primary-500/[0.03] rounded-3xl border border-primary-500/10 text-left transition-all hover:bg-primary-500/[0.05]">
                    <h4 className="text-xs font-black text-primary-400 uppercase tracking-[0.2em] mb-4">Open Research Question</h4>
                    <p className="text-md italic text-white/80 leading-relaxed">
                      "Why does increasing 'Temperature' make the AI pick lower probability words? Is this how we program 'Surprise' and 'Originality'?"
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

export default TextLab;
