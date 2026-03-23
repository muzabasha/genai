import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Target, Brush, Wind, RefreshCw, Image as ImageIcon, Layers, Camera
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const ImageLab: React.FC = () => {
  const [prompt, setPrompt] = useState("A futuristic city floating in the sky");
  const [isGenerating, setIsGenerating] = useState(false);
  const [noiseLevel, setNoiseLevel] = useState(100);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [showEquation, setShowEquation] = useState(false);
  
  // Intermediate data
  const [embedding, setEmbedding] = useState<number[]>([]);
  const [mse, setMse] = useState(0);

  const generateImage = async () => {
    setIsGenerating(true);
    setGeneratedImg(null);
    setNoiseLevel(100);
    setMse(0);
    
    // Step 1: CLIP Embedding (Input Representation)
    const newEmbedding = Array.from({ length: 4 }, () => parseFloat((Math.random() * 2 - 1).toFixed(3)));
    setEmbedding(newEmbedding);
    await new Promise(r => setTimeout(r, 1200));
    
    // Step 2: Reverse Diffusion Process (Noise to Image)
    for (let i = 100; i >= 0; i -= 10) {
      setNoiseLevel(i);
      setMse(parseFloat((Math.random() * 0.1).toFixed(4)));
      await new Promise(r => setTimeout(r, 400));
    }

    setGeneratedImg("https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=600&auto=format&fit=crop");
    setIsGenerating(false);
    toast.success("Image Sculpting Complete!");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 text-white">
          <div className="flex items-center gap-2 text-purple-400 font-bold uppercase tracking-widest text-xs">
            <Brush className="w-4 h-4" />
            Visual Lab
          </div>
          <h2 className="text-4xl font-display font-black">Diffusion Art Studio</h2>
          <p className="text-white/50 max-w-xl text-sm italic">
             Witness the "Noise Metamorphosis" — the data changing from static to structured pixels.
          </p>
        </div>
        <button onClick={() => setShowEquation(!showEquation)} className="px-4 py-2 glass rounded-xl border-white/5 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2 text-white">
          <Target className="w-4 h-4" />
          {showEquation ? 'Hide Diffusion Math' : 'Show Diffusion Theory'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-[2.5rem] p-8 border-white/5 space-y-6 shadow-2xl">
            <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Creative Prompt
            </div>
            
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full h-24 bg-white/5 rounded-2xl p-4 border border-white/10 focus:border-purple-500/50 outline-none resize-none transition-all placeholder:text-white/20 text-sm" placeholder="What should I paint?" />

            <button onClick={generateImage} disabled={isGenerating} className={`w-full py-4 rounded-3xl font-bold flex items-center justify-center gap-2 transition-all ${isGenerating ? 'bg-white/5 text-white/20' : 'bg-purple-500 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95'}`}>
              {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
              {isGenerating ? 'Synthesizing...' : 'Start Sculpting'}
            </button>
          </div>

          <div className="glass rounded-[2rem] p-6 border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase">
                <Wind className="w-4 h-4" />
                Data Step: Denoising
             </div>
             <p className="text-xs text-white/50 leading-relaxed italic">
                In this lab, you don't just see the final image. You see the **CLIP Prompt Vectors** and the **Mean Squared Error (MSE)** score as the AI removes noise.
             </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
           <div className="glass rounded-[3rem] p-8 border-white/5 min-h-[500px] relative overflow-hidden flex flex-col items-center justify-center gap-8">
             <div className="absolute inset-0 bg-grid-white/5 opacity-50" />
             
             {/* Intermediate Representation: CLIP Vector */}
             <AnimatePresence>
                {embedding.length > 0 && noiseLevel > 90 && (
                   <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute top-8 left-8 p-4 glass rounded-2xl border-purple-500/10 text-center z-30">
                      <div className="text-[8px] font-bold text-white/40 uppercase mb-2">Intermediate: CLIP Prompt Embedding</div>
                      <div className="font-mono text-[10px] text-purple-400">[{embedding.join(', ')}]</div>
                   </motion.div>
                )}
             </AnimatePresence>

             {/* Intermediate Representation: MSE Score */}
             <AnimatePresence>
                {isGenerating && noiseLevel < 90 && (
                   <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="absolute top-8 right-8 p-4 glass rounded-2xl border-purple-500/10 text-center z-30">
                      <div className="text-[8px] font-bold text-white/40 uppercase mb-2">Intermediate: Denoise Loss (MSE)</div>
                      <div className="font-mono text-xl text-purple-400">{mse}</div>
                   </motion.div>
                )}
             </AnimatePresence>

             <div className="relative w-full max-w-sm aspect-square glass rounded-[2.5rem] border-white/10 overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.1)]">
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div key="noise" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                       <div className="w-full h-full relative overflow-hidden opacity-30">
                          {Array.from({ length: 400 }).map((_, i) => (
                            <motion.div key={i} animate={{ opacity: [0.1, 0.4, 0.1], x: [0, (Math.random()-0.5)*10, 0] }} transition={{ duration: 0.1, repeat: Infinity }} style={{ position: 'absolute', left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, width: '2px', height: '2px', backgroundColor: 'white' }} />
                          ))}
                       </div>
                       <motion.div className="absolute bottom-8 left-0 right-0 px-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                         <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2">
                           <span>Refining Details</span>
                           <span>{100 - noiseLevel}% Clean</span>
                         </div>
                         <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                           <motion.div className="h-full bg-purple-500 shadow-[0_0_10px_#a855f7]" animate={{ width: `${100 - noiseLevel}%` }} />
                         </div>
                       </motion.div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {!isGenerating && generatedImg ? (
                  <motion.img initial={{ scale: 1.1, filter: 'blur(10px) brightness(0.5)' }} animate={{ scale: 1, filter: 'blur(0px) brightness(1)' }} transition={{ duration: 1 }} src={generatedImg} className="w-full h-full object-cover" alt="Generated" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center text-white/20">
                     <ImageIcon className="w-16 h-16 mb-4 opacity-10" />
                     <p className="text-sm font-medium">Final image will emerge from the noise.</p>
                  </div>
                )}
             </div>

             <div className="flex gap-4">
                {['CLIP', 'Latent', 'UNet', 'VAE'].map((step, i) => (
                  <div key={step} className="flex flex-col items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${noiseLevel <= (100 - i*25) ? 'bg-purple-500 shadow-[0_0_8px_#a855f7]' : 'bg-white/10'}`} />
                    <span className={`text-[10px] font-bold uppercase ${noiseLevel <= (100 - i*25) ? 'text-white' : 'text-white/20'}`}>{step}</span>
                  </div>
                ))}
             </div>
          </div>

          <AnimatePresence>
            {showEquation && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="p-10 glass rounded-[3rem] border-purple-500/20 space-y-10 relative overflow-hidden text-left bg-black/20">
                  <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-purple-500 via-pink-500 to-indigo-500 shadow-[0_5px_15px_rgba(168,85,247,0.3)]" />
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                      <Layers className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-white px-0.5">The Forward & Reverse Noising Process</h3>
                       <p className="text-sm text-white/40">The diffusion probabilistic foundation (DDPM).</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/60 p-8 rounded-3xl flex items-center justify-center gap-6 font-mono text-xl md:text-4xl border border-white/10 flex-wrap text-white shadow-inner">
                     <span className="text-purple-400">x<sub>t</sub></span>
                     <span className="text-white/30">=</span>
                     <span className="text-white">√α<sub>t</sub> x<sub>0</sub></span>
                     <span className="text-white/30">+</span>
                     <span className="text-white">√(1-α<sub>t</sub>)</span>
                     <span className="text-purple-500 animate-pulse">ε</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
                    <div className="space-y-6">
                      <h4 className="text-sm font-black text-purple-400 uppercase tracking-[0.2em]">The Mathematical Logic</h4>
                      <ul className="space-y-5 text-sm text-white/60">
                        <li className="flex gap-4">
                          <span className="text-purple-400 font-bold">x<sub>0</sub> :</span> 
                          <span>The original, sharp image (the ground truth).</span>
                        </li>
                        <li className="flex gap-4">
                          <span className="text-purple-400 font-bold">α<sub>t</sub> :</span> 
                          <span>The variance schedule at step t, determining the signal-to-noise ratio.</span>
                        </li>
                        <li className="flex gap-4">
                          <span className="text-purple-400 font-bold">ε :</span> 
                          <span>Pure Gaussian noise that is modeled and then subtracted during recovery.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-6 border-l border-white/5 pl-10">
                       <h4 className="text-sm font-black text-purple-500 uppercase tracking-[0.2em]">The Ice Sculpture Illustration</h4>
                       <p className="text-sm text-white/50 leading-relaxed italic">
                         "Imagine an artist with a block of ice. At the start, it's just a rough shape without details. At every step, the artist chips away a tiny, specific bit of noise until the swan is finally visible."
                       </p>
                    </div>
                  </div>

                  <div className="p-8 bg-purple-500/[0.03] rounded-3xl border border-purple-500/10 transition-all hover:bg-purple-500/[0.05]">
                    <h4 className="text-xs font-black text-purple-400 uppercase tracking-[0.2em] mb-4">Open Research Question</h4>
                    <p className="text-md italic text-white/80 leading-relaxed text-left">
                      "If a diffusion model learns by reversing noise found in real paintings, does it possess actual artistic intent, or is it just calculating the 'least noisy' path to a human-like image?"
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

export default ImageLab;
