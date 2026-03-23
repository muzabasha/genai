import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Target, 
  Brush, 
  Wind, 
  RefreshCw,
  Image as ImageIcon,
  Layers,
  Camera
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const ImageLab: React.FC = () => {
  const [prompt, setPrompt] = useState("A futuristic city floating in the sky");
  const [isGenerating, setIsGenerating] = useState(false);
  const [noiseLevel, setNoiseLevel] = useState(100);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [showEquation, setShowEquation] = useState(false);

  const generateImage = async () => {
    setIsGenerating(true);
    setGeneratedImg(null);
    setNoiseLevel(100);
    
    // Step 1: CLIP Embedding (Input)
    await new Promise(r => setTimeout(r, 1000));
    
    // Step 2: Reverse Diffusion Process (Noise to Image)
    for (let i = 100; i >= 0; i -= 10) {
      setNoiseLevel(i);
      await new Promise(r => setTimeout(r, 400));
    }

    setGeneratedImg("https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=600&auto=format&fit=crop");
    setIsGenerating(false);
    toast.success("Image Sculpting Complete!");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-purple-400 font-bold uppercase tracking-widest text-xs">
            <Brush className="w-4 h-4" />
            Visual Lab
          </div>
          <h2 className="text-4xl font-display font-black">Diffusion Art Studio</h2>
          <p className="text-white/50 max-w-xl">
             From chaos to clarity. Witness how AI "sculpts" images by reversing noise step-by-step.
          </p>
        </div>
        <button 
           onClick={() => setShowEquation(!showEquation)}
           className="px-4 py-2 glass rounded-xl border-white/5 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <Target className="w-4 h-4" />
          {showEquation ? 'Hide Diffusion Math' : 'Show Math View'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-3xl p-6 border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Creative Prompt
            </div>
            
            <textarea 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               placeholder="What should I paint?"
               className="w-full h-24 bg-white/5 rounded-2xl p-4 border border-white/10 focus:border-purple-500/50 outline-none resize-none transition-all placeholder:text-white/20"
            />

            <div className="space-y-4">
               <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tighter">
                 <span>Iteration Steps</span>
                 <span className="text-purple-400">50</span>
               </div>
               <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tighter">
                 <span>Guidance Scale</span>
                 <span className="text-purple-400">7.5</span>
               </div>
            </div>

            <button 
               onClick={generateImage}
               disabled={isGenerating}
               className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isGenerating ? 'bg-white/5 text-white/20' : 'bg-purple-500 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95'}`}
            >
              {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
              {isGenerating ? 'Denoising...' : 'Start Sculpting'}
            </button>
          </div>

          <div className="glass rounded-3xl p-6 border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
                <Wind className="w-4 h-4" />
                Concept: Denoising
             </div>
             <p className="text-xs text-white/50 leading-relaxed">
                Diffusion models start with pure static (noise) and learn to remove it piece by piece based on your text prompt. It's like finding a statue inside a block of marble.
             </p>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-3xl p-8 border-white/5 min-h-[450px] relative overflow-hidden flex flex-col items-center justify-center gap-8">
             <div className="absolute inset-0 bg-grid-white/5" />
             
             <div className="relative w-full max-w-sm aspect-square glass rounded-2xl border-white/10 overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div 
                      key="noise"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm"
                    >
                       <div className="w-full h-full relative overflow-hidden opacity-30">
                          {Array.from({ length: 400 }).map((_, i) => (
                            <motion.div 
                               key={i}
                               animate={{ opacity: [0.1, 0.4, 0.1], x: [0, (Math.random()-0.5)*10, 0] }}
                               transition={{ duration: 0.1, repeat: Infinity }}
                               style={{ 
                                  position: 'absolute', 
                                  left: `${Math.random()*100}%`, 
                                  top: `${Math.random()*100}%`, 
                                  width: '2px', 
                                  height: '2px', 
                                  backgroundColor: 'white' 
                               }}
                            />
                          ))}
                       </div>
                       <motion.div 
                         className="absolute bottom-8 left-0 right-0 px-8"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                       >
                         <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2">
                           <span>Refining Details</span>
                           <span>{100 - noiseLevel}% Clean</span>
                         </div>
                         <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                           <motion.div 
                             className="h-full bg-purple-500 shadow-[0_0_10px_#a855f7]" 
                             animate={{ width: `${100 - noiseLevel}%` }}
                           />
                         </div>
                       </motion.div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {!isGenerating && generatedImg ? (
                  <motion.img 
                    initial={{ scale: 1.1, filter: 'blur(10px) brightness(0.5)' }}
                    animate={{ scale: 1, filter: 'blur(0px) brightness(1)' }}
                    transition={{ duration: 1 }}
                    src={generatedImg} 
                    className="w-full h-full object-cover" 
                    alt="Generated" 
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center text-white/20">
                     <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                     <p>Final image will appear here after noise reduction.</p>
                  </div>
                )}
             </div>

             <div className="flex gap-4">
                {['Input', 'Embedding', 'UNet', 'VAE Decoder'].map((step, i) => (
                  <div key={step} className="flex flex-col items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${noiseLevel <= (100 - i*25) ? 'bg-purple-500 shadow-[0_0_8px_#a855f7]' : 'bg-white/10'}`} />
                    <span className="text-[10px] font-bold text-white/40 uppercase">{step}</span>
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
                 className="p-8 glass rounded-3xl border-purple-500/20 space-y-6"
              >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                       <h3 className="font-bold">The Diffusion Formula</h3>
                       <p className="text-xs text-white/40">Mathematical basis of latent diffusion.</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/40 p-6 rounded-2xl flex items-center justify-center gap-4 font-mono text-lg border border-white/5 flex-wrap">
                     <span className="text-purple-400">x<sub>t</sub></span>
                     <span className="text-white/30">=</span>
                     <span className="text-white">√α<sub>t</sub> x<sub>0</sub></span>
                     <span className="text-white/30">+</span>
                     <span className="text-white">√(1-α<sub>t</sub>)</span>
                     <span className="text-purple-500 animate-pulse">ε</span>
                  </div>
                  
                  <p className="text-[10px] text-white/40 text-center leading-relaxed">
                     This equation allows the model to predict how much noise (ε) was added at time <i>t</i>. By subtracting this predicted noise, the AI slowly uncovers the original image x<sub>0</sub>.
                  </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ImageLab;
