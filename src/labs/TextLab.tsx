import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Layers, 
  Database, 
  BrainCircuit, 
  ChevronRight, 
  Sparkles,
  Type,
  MapPin,
  RefreshCw,
  Target,
  BookOpen
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Visual Pipeline Steps
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

  const handleGenerate = async () => {
    if (!input) return;
    setIsGenerating(true);
    setCurrentStep('input');
    setOutput("");
    
    await new Promise(r => setTimeout(r, 800));
    setCurrentStep('encoding');
    const newTokens = input.split(/\s+/).map(t => t.toLowerCase().replace(/[^\w]/g, ''));
    setTokens(newTokens);
    await new Promise(r => setTimeout(r, 1200));

    setCurrentStep('representation');
    await new Promise(r => setTimeout(r, 1000));

    setCurrentStep('retrieval');
    await new Promise(r => setTimeout(r, 1200));

    setCurrentStep('decision');
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary-400 font-bold uppercase tracking-widest text-xs">
            <Sparkles className="w-4 h-4" />
            Language Lab
          </div>
          <h2 className="text-4xl font-display font-black text-white">How do LLMs think?</h2>
          <p className="text-white/50 max-w-xl text-sm">
             Explore how computers generate text. It's not just magic – it's tokens, coordinates, and smart guesses!
          </p>
        </div>
        <button 
           onClick={() => setShowMath(!showMath)}
           className="px-4 py-2 glass rounded-xl border-white/5 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2 text-white"
        >
          <Target className="w-4 h-4" />
          {showMath ? 'Hide Math Exploration' : 'Show Math View'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-3xl p-6 border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              Your Prompt
            </div>
            
            <textarea 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               className="w-full h-32 bg-white/5 rounded-2xl p-4 border border-white/10 focus:border-primary-500/50 outline-none resize-none transition-all placeholder:text-white/20 text-white text-sm"
               placeholder="Write a starting sentence..."
            />

            <button 
               onClick={handleGenerate}
               disabled={isGenerating}
               className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isGenerating ? 'bg-white/5 text-white/20' : 'bg-primary-500 hover:shadow-lg hover:shadow-primary-500/20 active:scale-95 text-white'}`}
            >
              {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              {isGenerating ? 'Computing...' : 'Generate Magic'}
            </button>
          </div>

          <div className="glass rounded-3xl p-6 border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                Pipeline Overview
             </div>
             <p className="text-xs text-white/50 leading-relaxed">
                Tokens are like LEGO bricks. The AI finds their position in a giant universe of meanings, looks up relevant facts (RAG), and decides the best next brick to place.
             </p>
          </div>
        </div>

        {/* Visualizer Area */}
        <div className="lg:col-span-2 space-y-6">
           <div className="glass rounded-[2rem] p-8 border-white/5 min-h-[400px] relative overflow-hidden flex flex-col items-center justify-between">
                {/* Pipeline Flow */}
                <div className="w-full flex items-center justify-between px-4 relative z-10">
                  {steps.map((step, idx) => (
                    <div key={step.id} className="relative flex flex-col items-center gap-3">
                      <motion.div 
                        animate={{ 
                          scale: currentStep === step.id ? 1.2 : 1,
                          opacity: currentStep === step.id || !currentStep ? 1 : 0.4,
                          boxShadow: currentStep === step.id ? `0 0 20px rgba(59, 130, 246, 0.4)` : 'none'
                        }}
                        className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${step.color} flex items-center justify-center shadow-lg transition-all duration-500 text-white`}
                      >
                         {step.icon}
                      </motion.div>
                      <span className={`text-[9px] md:text-xs font-bold uppercase tracking-tighter text-center transition-colors duration-500 ${currentStep === step.id ? 'text-white' : 'text-white/30'}`}>
                         {step.label}
                      </span>
                      {idx < steps.length - 1 && (
                        <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-[2px] bg-white/10">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: currentStep === step.id ? '100%' : 0 }}
                              transition={{ duration: 1 }}
                              className="h-full bg-linear-to-r from-primary-400 to-primary-600"
                            />
                        </div>
                      )}
                    </div>
                  ))}
               </div>

               {/* Central Content */}
               <div className="flex-1 flex flex-col items-center justify-center w-full py-12">
                  <AnimatePresence mode="wait">
                    {currentStep === 'encoding' ? (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                         className="flex flex-wrap justify-center gap-2 max-w-md"
                       >
                          {tokens.map((token, i) => (
                            <motion.span 
                               key={i} initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                               className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-primary-300"
                            >
                               {token}
                            </motion.span>
                          ))}
                       </motion.div>
                    ) : currentStep === 'output' || output ? (
                       <motion.div 
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="w-full bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-md"
                       >
                          <p className="text-xl md:text-2xl font-display font-medium leading-relaxed text-white">
                             <span className="text-white/30">{input}</span>
                             <span className="text-primary-400">{output}</span>
                             {isGenerating && <motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity }} className="inline-block w-1.5 h-6 bg-primary-500 ml-1 translate-y-1" />}
                          </p>
                       </motion.div>
                    ) : (
                       <div className="text-white/10 flex flex-col items-center gap-4">
                          <Zap className="w-16 h-16 opacity-10" />
                          <p className="text-sm font-medium">Start generation to see the internal magic.</p>
                       </div>
                    )}
                  </AnimatePresence>
               </div>
           </div>

           {/* Math section */}
           <AnimatePresence>
             {showMath && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                  className="bg-black/20 border border-white/10 rounded-[2rem] p-8 space-y-6 overflow-hidden relative"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary-500 via-purple-500 to-amber-500" />
                  
                  <div className="bg-black/40 p-6 rounded-2xl flex items-center justify-center gap-4 font-mono text-lg md:text-2xl border border-white/5 flex-wrap text-white">
                     <span className="text-primary-400">P(w<sub>i</sub> | w<sub>1</sub>...w<sub>i-1</sub>)</span>
                     <span className="text-white/30">≈</span>
                     <span className="text-white">Softmax(Attention(w<sub>i-1</sub>))</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-primary-400 uppercase tracking-tight">Equation Interpretation</h4>
                      <ul className="space-y-3 text-xs text-white/60">
                        <li className="flex gap-2">
                          <span className="text-white font-bold">P(w<sub>i</sub> | ...):</span> 
                          <span>The probability of picking the next word, given all the words seen before.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-white font-bold">Attention:</span> 
                          <span>How much the AI "looks back" at specific words (like the subject of a sentence) to maintain context.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-white font-bold">Softmax:</span> 
                          <span>A mathematical filter that turns scores into percentages so the total adds up to 100%.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4 border-l border-white/5 pl-8">
                       <h4 className="text-sm font-bold text-amber-400 uppercase tracking-tight">Illustration: The LEGO Storyteller</h4>
                       <p className="text-xs text-white/50 leading-relaxed">
                         Imagine building a LEGO castle. If you’ve already placed "Grey Stone" and "Drawbridge", the AI calculates that the most likely "next block" is a "Castle Gate". It doesn't guess – it uses the pattern of the blocks already placed.
                       </p>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-primary-500/5 rounded-2xl border border-primary-500/10">
                    <h4 className="text-xs font-black text-primary-400 uppercase tracking-[0.2em] mb-3">Open-Ended Research Question</h4>
                    <p className="text-sm italic text-white/80 leading-relaxed">
                      "If an AI is only predicting the most probable next word, how can we prevent it from repeating itself indefinitely? Why does 'creativity' in AI require picking a less-probable word sometimes?"
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
