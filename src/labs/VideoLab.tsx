import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play,
  Film,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const VideoLab: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showConcepts, setShowConcepts] = useState(false);

  const generateVideo = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate generation of 16 frames
    for (let i = 0; i <= 100; i += 6.25) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 200));
    }

    setIsGenerating(false);
    toast.success("Temporal Synthesis Complete!");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-xs">
            <Film className="w-4 h-4" />
            Video Lab
          </div>
          <h2 className="text-4xl font-display font-black">Temporal Story Engine</h2>
          <p className="text-white/50 max-w-xl">
             Beyond static images. Witness how AI keeps "Temporal Coherence"—ensuring objects don't morph or teleport between frames.
          </p>
        </div>
        <button 
           onClick={() => setShowConcepts(!showConcepts)}
           className="px-4 py-2 glass rounded-xl border-white/5 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <Info className="w-4 h-4" />
          {showConcepts ? 'Hide Temporal Math' : 'Show Concept'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-3xl p-6 border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              Video Settings
            </div>
            
            <div className="space-y-4">
               <div className="p-4 bg-white/5 rounded-2xl space-y-3">
                  <div className="flex justify-between text-xs font-bold uppercase text-white/40">
                    <span>Frame Count</span>
                    <span className="text-indigo-400">16</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold uppercase text-white/40">
                    <span>FPS</span>
                    <span className="text-indigo-400">8</span>
                  </div>
               </div>
            </div>

            <button 
               onClick={generateVideo}
               disabled={isGenerating}
               className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isGenerating ? 'bg-white/5 text-white/20' : 'bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95'}`}
            >
              {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
              {isGenerating ? 'Synthesizing...' : 'Generate Scene'}
            </button>
          </div>

          <div className="glass rounded-3xl p-6 border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
                <ChevronRight className="w-4 h-4" />
                Concept: temporal attention
             </div>
             <p className="text-xs text-white/50 leading-relaxed">
                Just like images use spatial attention to see what's where, video models use temporal attention to see what's when. It looks back and forward to keep things consistent.
             </p>
          </div>
        </div>

        {/* Frame Stack Visualizer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-3xl p-12 border-white/5 min-h-[400px] relative overflow-hidden flex flex-col items-center justify-center gap-12">
             <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-none" />
             
             <div className="flex -space-x-12 perspective-lg">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={isGenerating ? {
                       scale: [1, 1.05, 1],
                       rotateY: [-20, -25, -20],
                       opacity: [0.1, 0.4, 0.1]
                    } : {
                       opacity: progress > (i * 12.5) ? 1 : 0.1,
                       rotateY: -20,
                       scale: 1,
                       translateZ: i * 20
                    }}
                    transition={{
                       duration: 2,
                       repeat: isGenerating ? Infinity : 0,
                       delay: i * 0.2
                    }}
                    className="w-40 h-56 glass rounded-2xl border-white/20 relative overflow-hidden shadow-2xl flex items-center justify-center"
                  >
                     {progress > (i * 12.5) ? (
                        <div className="w-full h-full bg-linear-to-br from-indigo-500/40 to-purple-500/40 opacity-40 animate-pulse" />
                     ) : (
                        <Film className="w-8 h-8 text-white/10" />
                     )}
                     <span className="absolute bottom-4 right-4 text-[9px] font-black text-white/20">FRAME 0{i+1}</span>
                  </motion.div>
                ))}
             </div>

             <div className="w-full max-w-lg space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
                   <span>Temporal Coherence Training</span>
                   <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-linear-to-r from-indigo-500 to-purple-500" 
                     animate={{ width: `${progress}%` }}
                   />
                </div>
             </div>
          </div>

          <AnimatePresence>
            {showConcepts && (
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 20 }}
                 className="p-8 glass rounded-3xl border-indigo-500/20 space-y-6"
              >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                      <Film className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                       <h3 className="font-bold">Temporal Attention Mapping</h3>
                       <p className="text-xs text-white/40">Ensuring object persistence across the timeline.</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/40 p-6 rounded-2xl flex items-center justify-center gap-4 font-mono text-lg border border-white/5 flex-wrap">
                     <span className="text-indigo-400">x<sub>t</sub></span>
                     <span className="text-white/30">=</span>
                     <span className="text-white">Attention(x<sub>t</sub>, {`{x_{t-1}, ..., x_{t-n}}`})</span>
                  </div>
                  
                  <p className="text-[10px] text-white/40 text-center leading-relaxed">
                     The model doesn't just look at the current frame <i>x<sub>t</sub></i>. It performs an attention operation over all previous frames to ensure that the character or object remains the same across time.
                  </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const RefreshCw = ({ className }: { className: string }) => (
  <motion.svg 
     xmlns="http://www.w3.org/2000/svg" 
     width="24" 
     height="24" 
     viewBox="0 0 24 24" 
     fill="none" 
     stroke="currentColor" 
     strokeWidth="2" 
     strokeLinecap="round" 
     strokeLinejoin="round" 
     className={className}
     animate={{ rotate: 360 }}
     transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  >
     <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
     <path d="M21 3v5h-5"/>
     <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
     <path d="M3 21v-5h5"/>
  </motion.svg>
);

export default VideoLab;
