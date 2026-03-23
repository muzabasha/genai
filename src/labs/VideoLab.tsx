import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  Target, 
  Layers, 
  Zap, 
  RefreshCw,
  Film,
  Clapperboard,
  Play,
  RotateCw,
  Sparkles,
  Timer
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const VideoLab: React.FC = () => {
  const [prompt, setPrompt] = useState("A golden retriever puppy surfing on a cloud");
  const [isGenerating, setIsGenerating] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [frames, setFrames] = useState<string[]>([]);
  const [showEquation, setShowEquation] = useState(false);

  // Mock frames for simulation
  const mockFrames = Array.from({ length: 12 }, (_, i) => `https://images.unsplash.com/photo-1623126389997-72ce454641ba?q=80&w=600&auto=format&fit=crop`);

  const generateVideo = async () => {
    setIsGenerating(true);
    setFrames([]);
    setFrameIndex(0);
    
    // Step 1: Base Frame Generation
    await new Promise(r => setTimeout(r, 1500));
    
    // Step 2: Temporal Coherence (Frame and Frame)
    for (let i = 0; i < mockFrames.length; i++) {
        setFrames(prev => [...prev, mockFrames[i]]);
        setFrameIndex(i);
        await new Promise(r => setTimeout(r, 500));
    }

    setIsGenerating(false);
    toast.success("Temporal Synthesis Complete!", { icon: '🎬' });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-xs">
            <Film className="w-4 h-4" />
            Cinematic Lab
          </div>
          <h2 className="text-4xl font-display font-black">Temporal Diffusion</h2>
          <p className="text-white/50 max-w-xl">
             Adding the 4th dimension: Time. See how AI maintains coherence across multiple frames to create motion.
          </p>
        </div>
        <button 
           onClick={() => setShowEquation(!showEquation)}
           className="px-4 py-2 glass rounded-xl border-white/5 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <Target className="w-4 h-4" />
          {showEquation ? 'Hide Video Concept' : 'Show Concepts'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-3xl p-6 border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
              <Clapperboard className="w-4 h-4" />
              Scene Description
            </div>
            
            <textarea 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               placeholder="Describe a moving scene..."
               className="w-full h-24 bg-white/5 rounded-2xl p-4 border border-white/10 focus:border-indigo-500/50 outline-none resize-none transition-all placeholder:text-white/20"
            />

            <div className="space-y-4">
               <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tighter">
                 <span>Duration</span>
                 <span className="text-indigo-400">4s</span>
               </div>
               <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tighter">
                 <span>FPS</span>
                 <span className="text-indigo-400">24</span>
               </div>
            </div>

            <button 
               onClick={generateVideo}
               disabled={isGenerating}
               className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isGenerating ? 'bg-white/5 text-white/20' : 'bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95'}`}
            >
              {isGenerating ? <RotateCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
              {isGenerating ? 'Rendering Frames...' : 'Generate Scene'}
            </button>
          </div>

          <div className="glass rounded-3xl p-6 border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
                <Timer className="w-4 h-4" />
                Concept: Temporal Coherence
             </div>
             <p className="text-xs text-white/50 leading-relaxed">
                The biggest challenge in video AI is preventing flickering. The model ensures that the cat on frame 1 still looks like the same cat on frame 24. It does this by adding "Time" as a new axis in the latent space.
             </p>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-3xl p-8 border-white/5 min-h-[450px] relative overflow-hidden flex flex-col items-center justify-center gap-8">
             <div className="absolute inset-0 bg-grid-white/5" />
             
             {/* Frame Stack View */}
             <div className="relative w-full h-64 flex items-center justify-center">
                {frames.length > 0 ? (
                  <div className="relative">
                    {frames.map((src, i) => (
                      <motion.div 
                        key={i}
                        animate={{ 
                          x: isGenerating ? (i - frames.length/2) * 40 : 0, 
                          opacity: isGenerating ? (i === frameIndex ? 1 : 0.3) : (i === frameIndex ? 1 : 0),
                          scale: i === frameIndex ? 1 : 0.9,
                          rotateY: isGenerating ? 20 : 0,
                          z: (i - frameIndex) * 10
                        }}
                        transition={{ 
                           duration: isGenerating ? 0.3 : 0.1, 
                           type: 'spring' 
                        }}
                        className={`absolute top-1/2 left-1/2 -mt-24 -ml-32 w-64 h-48 rounded-2xl border-2 border-white/20 overflow-hidden shadow-2xl ${i === frameIndex ? 'z-50' : ''}`}
                        style={{ borderBottomWidth: 6 }}
                      >
                         <img src={src} className="w-full h-full object-cover" alt={`Frame ${i}`} />
                         <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur rounded text-[10px] font-bold">FRAME {i+1}</div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-white/10">
                     <Film className="w-16 h-16" />
                     <span className="text-sm font-bold uppercase tracking-widest text-center">Empty Reel</span>
                  </div>
                )}
             </div>

             {/* Frame Timeline */}
             {frames.length > 0 && (
                <div className="w-full bg-white/5 p-4 rounded-2xl flex items-center gap-2 overflow-x-auto no-scrollbar">
                   {frames.map((_, i) => (
                      <div 
                         key={i} 
                         className={`min-w-4 h-4 rounded-full transition-colors duration-300 ${i === frameIndex ? 'bg-indigo-500' : 'bg-white/10'}`} 
                      />
                   ))}
                </div>
             )}

             <div className="flex gap-4">
                {[
                  { label: '3D Latent Space', color: 'bg-indigo-500' },
                  { label: 'Optical Flow', color: 'bg-indigo-500/50' },
                  { label: 'Consistency Loss', color: 'bg-indigo-500/30' }
                ].map((tag) => (
                  <div key={tag.label} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${tag.color}`} />
                    <span className="text-[10px] font-bold text-white/40 uppercase">{tag.label}</span>
                  </div>
                ))}
             </div>
          </div>

          <AnimatePresence>
            {showEquation && (
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 20 }}
                 className="p-8 glass rounded-3xl border-indigo-500/20 space-y-6"
              >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                       <h3 className="font-bold">Temporal Attention</h3>
                       <p className="text-xs text-white/40">Maintaining consistency across time steps.</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/40 p-6 rounded-2xl flex items-center justify-center gap-4 font-mono text-lg border border-white/5">
                     <span className="text-indigo-400">f(x, t)</span>
                     <span className="text-white/30">=</span>
                     <span className="text-white">Attention(Q<sub>t</sub>, K<sub>t-1</sub>, V<sub>t-1</sub>)</span>
                  </div>
                  
                  <p className="text-[10px] text-white/40 text-center leading-relaxed">
                     The model doesn't just look at one frame; it looks back at previous frames (K<sub>t-1</sub>, V<sub>t-1</sub>) to decide what the current frame should look like. This creates the illusion of smooth, coherent motion.
                  </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default VideoLab;
