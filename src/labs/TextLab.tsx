import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  MessageSquare, 
  Layers, 
  Database, 
  BrainCircuit, 
  ChevronRight, 
  Sparkles,
  Type,
  MapPin,
  Eye,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Target
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
  const [showEquation, setShowEquation] = useState(false);
  const [rlScore, setRlScore] = useState(0);

  const handleGenerate = async () => {
    if (!input) return;
    setIsGenerating(true);
    setCurrentStep('input');
    setOutput("");
    
    // Step 1: Input (Immediate)
    await new Promise(r => setTimeout(r, 800));
    
    // Step 2: Encoding (Tokenization)
    setCurrentStep('encoding');
    const newTokens = input.split(/\s+/).map(t => t.toLowerCase().replace(/[^\w]/g, ''));
    setTokens(newTokens);
    await new Promise(r => setTimeout(r, 1200));

    // Step 3: Representation (Embeddings)
    setCurrentStep('representation');
    await new Promise(r => setTimeout(r, 1000));

    // Step 4: Retrieval (RAG)
    setCurrentStep('retrieval');
    await new Promise(r => setTimeout(r, 1200));

    // Step 5: Decision (RL)
    setCurrentStep('decision');
    await new Promise(r => setTimeout(r, 1000));

    // Step 6: Output
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

  const handleReward = (type: 'up' | 'down') => {
    setRlScore(prev => type === 'up' ? prev + 1 : prev - 1);
    toast.success(type === 'up' ? "RL Reward Positive! Model will learn." : "RL Reward Negative! Model will adjust.", {
      icon: type === 'up' ? '👍' : '👎'
    });
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
          <h2 className="text-4xl font-display font-black">How do LLMs think?</h2>
          <p className="text-white/50 max-w-xl">
             Explore how computers generate text. It's not just magic – it's tokens, coordinates, and smart guesses!
          </p>
        </div>
        <button 
           onClick={() => setShowEquation(!showEquation)}
           className="px-4 py-2 glass rounded-xl border-white/5 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <Target className="w-4 h-4" />
          {showEquation ? 'Hide Equations' : 'Show Math View'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input and Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-3xl p-6 border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" />
              Your Prompt
            </div>
            <textarea 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Enter a story starter..."
               className="w-full h-32 bg-white/5 rounded-2xl p-4 border border-white/10 focus:border-primary-500/50 outline-none resize-none transition-all placeholder:text-white/20"
            />
            <button 
               onClick={handleGenerate}
               disabled={isGenerating}
               className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isGenerating ? 'bg-white/5 text-white/20' : 'bg-primary-500 hover:shadow-lg hover:shadow-primary-500/20 active:scale-95'}`}
            >
              {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              {isGenerating ? 'Computing...' : 'Generate Next Words'}
            </button>
          </div>

          <div className="glass rounded-3xl p-6 border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
                <BrainCircuit className="w-4 h-4" />
                RL Reward Signal
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${rlScore >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                Score: {rlScore}
              </span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-xs text-white/60 space-y-2">
               The model learns from your feedback! Correct it if it's wrong.
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => handleReward('up')}
                className="flex-1 py-3 glass rounded-xl border-white/5 hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all flex items-center justify-center gap-2"
              >
                <ThumbsUp className="w-4 h-4" />
                Good
              </button>
              <button 
                onClick={() => handleReward('down')}
                className="flex-1 py-3 glass rounded-xl border-white/5 hover:bg-rose-500/20 hover:border-rose-500/30 transition-all flex items-center justify-center gap-2"
              >
                <ThumbsDown className="w-4 h-4" />
                Bad
              </button>
            </div>
          </div>
        </div>

        {/* Visual Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-3xl p-8 border-white/5 min-h-[500px] flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
            
            {/* Pipeline Visualization */}
            <div className="relative z-10 flex-1 flex flex-col justify-center gap-12">
               <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
                  {steps.map((step, idx) => (
                    <div key={step.id} className="relative flex-1 flex flex-col items-center gap-3">
                      <motion.div 
                        initial={false}
                        animate={{ 
                          boxShadow: currentStep === step.id ? `0 0 20px rgba(59, 130, 246, 0.4)` : 'none'
                        }}
                        className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${step.color} flex items-center justify-center shadow-lg transition-all duration-500`}
                      >
                         {step.icon}
                      </motion.div>
                      <span className={`text-[10px] md:text-xs font-bold uppercase tracking-tighter text-center transition-colors duration-500 ${currentStep === step.id ? 'text-white' : 'text-white/30'}`}>
                         {step.label}
                      </span>
                      {idx < steps.length - 1 && (
                        <div className="hidden md:block absolute top-[2.5rem] left-[60%] w-[80%] h-[2px] bg-white/10">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: currentStep === step.id ? '100%' : 0 }}
                             transition={{ duration: 1 }}
                             className="h-full bg-gradient-to-r from-primary-400 to-primary-600"
                           />
                        </div>
                      )}
                    </div>
                  ))}
               </div>

               {/* Step Specific Visuals */}
               <div className="min-h-[200px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {currentStep === 'encoding' && (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 1.1 }}
                         className="flex flex-wrap justify-center gap-2 max-w-md"
                       >
                          {tokens.map((token, i) => (
                            <motion.div 
                               key={i}
                               initial={{ y: 20, opacity: 0 }}
                               animate={{ y: 0, opacity: 1 }}
                               transition={{ delay: i * 0.1 }}
                               className="px-3 py-1.5 bg-indigo-500/20 border border-indigo-500/40 rounded-lg text-xs font-mono"
                            >
                               {token}
                            </motion.div>
                          ))}
                       </motion.div>
                    )}
                    {currentStep === 'representation' && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center gap-4"
                        >
                           <div className="w-32 h-32 border-2 border-dashed border-purple-500/30 rounded-full flex items-center justify-center relative">
                              {[1,2,3,4].map(i => (
                                <motion.div 
                                  key={i}
                                  animate={{ 
                                    x: [0, (i%2?20:-20), 0], 
                                    y: [0, (i>2?20:-20), 0],
                                    scale: [1, 1.2, 1] 
                                  }}
                                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                                  className="absolute w-3 h-3 bg-purple-500 rounded-full blur-[2px]"
                                />
                              ))}
                              <MapPin className="w-8 h-8 text-purple-400" />
                           </div>
                           <p className="text-xs text-purple-300 font-medium">Embedding: High Dimensional Vector Space</p>
                        </motion.div>
                    )}
                    {currentStep === 'retrieval' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-center gap-4"
                        >
                           <div className="flex items-center gap-4">
                              <div className="p-4 glass rounded-2xl border-emerald-500/20">
                                 <Database className="w-8 h-8 text-emerald-400" />
                              </div>
                              <ChevronRight className="w-6 h-6 text-emerald-500 opacity-30" />
                              <div className="p-4 glass rounded-2xl border-emerald-500/20">
                                 <Layers className="w-8 h-8 text-emerald-400" />
                              </div>
                           </div>
                           <div className="text-center">
                              <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">RAG Injection</p>
                              <p className="text-[10px] text-white/40">Searching 12.5M vectors for context...</p>
                           </div>
                        </motion.div>
                    )}
                    {currentStep === 'decision' && (
                        <motion.div 
                          className="relative flex items-center justify-center scale-150"
                        >
                           <motion.div 
                             animate={{ rotate: 360 }}
                             transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                             className="w-24 h-24 border border-rose-500/20 rounded-full absolute"
                           />
                           <BrainCircuit className="w-12 h-12 text-rose-500 animate-pulse" />
                        </motion.div>
                    )}
                    {currentStep === 'output' && !isGenerating && output && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-white/5 p-6 rounded-2xl border border-white/10 max-w-sm"
                        >
                           <p className="text-sm italic leading-relaxed text-white/80">
                              {output}
                           </p>
                        </motion.div>
                    )}
                    {!currentStep && (
                       <div className="text-white/20 text-center space-y-2">
                          <Eye className="w-12 h-12 mx-auto mb-4 opacity-20" />
                          <p className="font-medium">Ready to Visualize</p>
                          <p className="text-xs">Press Generate to see the pipeline in action</p>
                       </div>
                    )}
                  </AnimatePresence>
               </div>

               {/* Equation Overlay */}
               <AnimatePresence>
                  {showEquation && (
                    <motion.div 
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: 20 }}
                       className="absolute top-8 right-8 p-4 glass rounded-2xl border-primary-500/20 max-w-xs z-50 text-[10px] space-y-4"
                    >
                       <div className="space-y-1">
                          <span className="text-primary-400 font-bold">The Math Behind It</span>
                          <div className="bg-black/50 p-3 rounded-lg font-mono text-center border border-white/5">
                             P(w<sub>i</sub> | w<sub>1</sub>, ..., w<sub>i-1</sub>)
                          </div>
                       </div>
                       <p className="text-white/40 leading-snug">
                          The model predicts the probability of the next word given all previous words in the sequence. Each step in the pipeline refines this probability.
                       </p>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextLab;
