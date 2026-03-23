import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  Film, 
  Layers, 
  Play,
  Settings,
  Info,
  Sparkles
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const VideoLab: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showConcepts, setShowConcepts] = useState(false);

  const generateVideo = async () => {
    setIsGenerating(true);
    setProgress(0);
    for (let i = 0; i <= 100; i += 2) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 60));
    }
    setIsGenerating(false);
    toast.success("Temporal Synthesis Complete!");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-xs">
            <Video className="w-4 h-4" />
            Video Lab
          </div>
          <h2 className="text-4xl font-display font-black text-white">Temporal Diffusion Engine</h2>
          <p className="text-white/50 max-w-xl text-sm leading-relaxed">
             Beyond static images. Witness how AI keeps "Temporal Coherence"—ensuring objects don't morph or teleport between frames.
          </p>
        </div>
        <button 
           onClick={() => setShowConcepts(!showConcepts)}
           className="px-4 py-2 glass rounded-xl border-white/5 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2 text-white"
        >
          <Info className="w-4 h-4" />
          {showConcepts ? 'Hide Temporal Math' : 'Show Math View'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-3xl p-6 border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              Video Settings
            </div>
            
            <div className="space-y-4">
               <div className="p-4 bg-white/5 rounded-2xl space-y-3">
                  <div className="flex justify-between text-xs font-bold uppercase text-white/40 tracking-tighter">
                    <span>Frame Count</span>
                    <span className="text-indigo-400">16 Frames</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold uppercase text-white/40 tracking-tighter">
                    <span>FPS</span>
                    <span className="text-indigo-400">8 FPS</span>
                  </div>
               </div>
            </div>

            <button 
               onClick={generateVideo}
               disabled={isGenerating}
               className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isGenerating ? 'bg-white/5 text-white/20' : 'bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 text-white'}`}
            >
              {isGenerating ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}> <Settings className="w-5 h-5" /> </motion.div> : <Play className="w-5 h-5" />}
              {isGenerating ? 'Synthesizing...' : 'Generate Scene'}
            </button>
          </div>

          <div className="glass rounded-3xl p-6 border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider text-white">
                <Sparkles className="w-4 h-4" />
                Concept: Coherence
             </div>
             <p className="text-xs text-white/50 leading-relaxed">
                While image AI creates one frame, Video AI must remember every frame before it so things don't flicker or change randomly. This is called "Global Attention".
             </p>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-3xl p-8 border-white/5 min-h-[400px] relative overflow-hidden flex flex-col items-center justify-center gap-12">
             <div className="absolute inset-0 bg-grid-white/5" />
             
             <div className="w-full flex justify-center gap-2 relative">
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div 
                    key={i} transition={{ duration: 0.5, delay: i * 0.1 }}
                    animate={{ rotateY: i * 15, z: i * -20, opacity: i * 20 < progress ? 1 : 0.1, scale: i * 20 < progress ? 1 : 0.8 }}
                    className="w-24 h-32 glass border-white/10 rounded-xl flex items-center justify-center relative shadow-2xl overflow-hidden"
                  >
                     <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/10" />
                     <Film className="w-8 h-8 opacity-20" />
                     <span className="absolute bottom-2 right-2 text-[8px] font-bold text-white/20">Frame {i+1}</span>
                  </motion.div>
                ))}
             </div>

             <div className="relative z-10 w-full max-w-md">
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-white/40 mb-3">
                   <span>Temporal Smoothing Pipeline</span>
                   <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                   <motion.div className="h-full bg-linear-to-r from-indigo-600 to-indigo-400 shadow-[0_0_15px_#4f46e5]" animate={{ width: `${progress}%` }} />
                </div>
             </div>
          </div>

          <AnimatePresence>
            {showConcepts && (
              <motion.div 
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                 className="p-8 glass rounded-[2rem] border-indigo-500/20 space-y-6 relative overflow-hidden"
              >
                  <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-purple-500" />
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <Film className="w-5 h-5" />
                    </div>
                    <div>
                       <h3 className="font-bold text-white">Temporal Attention Mapping</h3>
                       <p className="text-xs text-white/40">Ensuring object persistence across the timeline.</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/40 p-6 rounded-2xl flex items-center justify-center gap-4 font-mono text-lg md:text-2xl border border-white/5 text-white flex-wrap">
                     <span className="text-indigo-400">x<sub>t</sub></span>
                     <span className="text-white/30">=</span>
                     <span className="text-white">Attention(x<sub>t</sub>, {`{x_{t-1}...x_{0}}`})</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-tight">Equation Interpretation</h4>
                      <ul className="space-y-3 text-xs text-white/60">
                        <li className="flex gap-2">
                          <span className="text-white font-bold">x<sub>t</sub>:</span> 
                          <span>The frame the AI is currently painting.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-white font-bold">Attention:</span> 
                          <span>A mechanism that lets the AI "look" at all previous frames to copy features.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-white font-bold">x<sub>t-n</sub>:</span> 
                          <span>History. If frame 1 has a cat, frame 2 must pay 'Attention' to frame 1.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4 border-l border-white/5 pl-8">
                       <h4 className="text-sm font-bold text-indigo-500 uppercase tracking-tight">Illustration: The Flipbook</h4>
                       <p className="text-xs text-white/50 leading-relaxed text-left">
                         Imagine drawing a flipbook. If you draw a bird in the middle of page 1, you need to see where page 1 was when drawing page 2. Otherwise, the bird will jump around! The AI uses "Temporal Attention" to look through the pages of its own flipbook.
                       </p>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
                    <h4 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-3">Open-Ended Research Question</h4>
                    <p className="text-sm italic text-white/80 leading-relaxed text-left">
                      "If AI can create perfect temporal coherence, will we ever be able to trust 'video evidence' in court again? How can a human distinguish between a real person and an AI puppet?"
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

export default VideoLab;
