import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RefreshCw, Image as ImageIcon, Camera, Settings2, Trophy, Microscope, Beaker, MessageSquare, BookOpen, BrainCircuit, Database, Layers
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const ImageLab: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prompt, setPrompt] = useState("A futuristic city in the clouds");
  const [showResearch, setShowResearch] = useState(false);
  
  // Research tools
  const [cfgGuidance, setCfgGuidance] = useState(7.5);
  const [inferenceSteps, setInferenceSteps] = useState(30);
  const [seed, setSeed] = useState(42);

  const startGeneration = async () => {
    setIsGenerating(true);
    setProgress(0);
    // Simulate diffusion steps
    const stepDuration = 3000 / inferenceSteps;
    for (let i = 0; i <= 100; i += (100 / inferenceSteps)) {
      setProgress(Math.min(100, i));
      await new Promise(r => setTimeout(r, stepDuration));
    }
    setIsGenerating(false);
    toast.success("Latent Diffusion Stabilized!");
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-32 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-xs">
            <Microscope className="w-4 h-4" />
            Visual Synthesis Lab
          </div>
          <h2 className="text-5xl font-display font-black leading-tight text-white">Mastering Stable Diffusion</h2>
          <p className="text-white/40 max-w-2xl text-sm leading-relaxed italic">
             Investigate the denosing process through Classifier-Free Guidance. Control CFG and Inference Steps to master prompt adherence.
          </p>
        </div>
        <button onClick={() => setShowResearch(!showResearch)} className={`px-5 py-2.5 rounded-2xl border transition-all flex items-center gap-2 font-bold text-sm ${showResearch ? 'bg-indigo-600 border-indigo-500 text-white' : 'glass border-white/5 text-white/60'}`}>
          <Settings2 className="w-4 h-4" />
          Research Mode
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Research Panel */}
        <div className="lg:col-span-1 space-y-6">
          <AnimatePresence>
            {showResearch && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass rounded-4xl p-8 border-white/5 space-y-8 shadow-2xl bg-indigo-500/[0.02]">
                 <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-widest">
                   <Beaker className="w-4 h-4" />
                   Latent Sampler Config
                 </div>
                 
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>CFG Guidance</span>
                          <span className="text-indigo-300">{cfgGuidance}</span>
                       </div>
                       <input type="range" min="1" max="25" step="0.5" value={cfgGuidance} onChange={(e) => setCfgGuidance(parseFloat(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-indigo-500 shadow-inner" />
                       <p className="text-[10px] text-white/20 italic leading-tight uppercase font-black">Controls how strictly the AI follows the text prompt.</p>
                    </div>

                    <div className="space-y-3">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>Inference Steps</span>
                          <span className="text-indigo-300">{inferenceSteps}</span>
                       </div>
                       <input type="range" min="10" max="100" step="1" value={inferenceSteps} onChange={(e) => setInferenceSteps(parseInt(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-indigo-500 shadow-inner" />
                    </div>

                    <div className="space-y-3">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>Random Seed</span>
                          <span className="text-indigo-300">{seed}</span>
                       </div>
                       <input type="number" value={seed} onChange={(e) => setSeed(parseInt(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs font-mono outline-none focus:ring-1 ring-indigo-500" />
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="glass rounded-4xl p-8 border-white/5 space-y-6 shadow-2xl bg-indigo-500/5">
             <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-widest text-white">
                <Trophy className="w-4 h-4" />
                Mastery Challenges
             </div>
             <div className="space-y-4">
                {[
                  { id: 1, title: 'Inference Minimalism', desc: 'Set steps to 10. Can the AI produce a coherent structure? Why does it look like blurry fog?' },
                  { id: 2, title: 'Deep Denoising', desc: 'Set steps to 100. Does the extra math actually improve the detail, or just waste time?' },
                  { id: 3, title: 'Prompt Adherence', desc: 'Set CFG to 25. Observe the high contrast and saturated colors. Why does it look "fried"?' }
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
           <div className="glass rounded-[3rem] p-10 border-white/5 min-h-[500px] relative overflow-hidden flex flex-col items-center justify-center gap-10 bg-black/20 shadow-2xl text-white">
              <div className="absolute inset-0 bg-grid-white/[0.03] opacity-40 shadow-inner" />
              
              <div className="w-full max-w-xl space-y-4">
                 <div className="flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
                    <ImageIcon className="w-4 h-4 text-indigo-400" />
                    Latent Space Trigger
                 </div>
                 <div className="relative group">
                    <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-white/5 border-none rounded-[1.5rem] p-7 pl-16 text-lg font-display font-medium focus:ring-2 ring-indigo-400/20 outline-none text-white placeholder:text-white/10" placeholder="A scene through time..." />
                    <Camera className="absolute left-6 top-7 w-6 h-6 text-indigo-400" />
                 </div>
              </div>

              <div className="relative w-full max-w-lg aspect-square glass rounded-[3rem] border-white/10 overflow-hidden shadow-[0_0_100px_rgba(99,102,241,0.1)]">
                 <div className="absolute inset-0 z-0 bg-white/[0.02]" />
                 {isGenerating ? (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl">
                      <div className="w-24 h-24 rounded-full border-b-4 border-indigo-500 animate-spin" />
                      <div className="mt-8 text-center space-y-1">
                         <div className="text-[10px] font-black text-indigo-400 tracking-[0.5em] uppercase">Subtracting Noise ε</div>
                         <div className="text-2xl font-display font-black text-white">{Math.floor(progress)}% Logic Locked</div>
                      </div>
                   </motion.div>
                 ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center text-white/5 group-hover:text-indigo-400/20 transition-all cursor-pointer" onClick={startGeneration}>
                       <ImageIcon className="w-20 h-20 mb-6 opacity-10 group-hover:opacity-20 transition-all fill-current" />
                       <p className="text-xs font-black uppercase tracking-[0.3em]">Static Latent Field</p>
                    </div>
                 )}
                 {progress > 0 && (
                    <motion.div animate={{ opacity: progress / 100 }} className="absolute inset-0 z-10 bg-linear-to-br from-indigo-900/40 to-black pointer-events-none" />
                 )}
              </div>

              <div className="w-full flex justify-between gap-12 px-12 relative z-20 mb-8 items-center">
                 <div className="flex-1 space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase text-white/40 tracking-widest mb-1.5">
                       <span>Inference Schedule</span>
                       <span className="text-indigo-400">{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <motion.div className="h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]" animate={{ width: `${progress}%` }} />
                    </div>
                 </div>
                 <button onClick={startGeneration} disabled={isGenerating} className={`px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl transition-all ${isGenerating ? 'bg-white/5 text-white/10' : 'bg-indigo-600 shadow-indigo-900/40 hover:scale-105 active:scale-95 text-white font-bold'}`}>
                    {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Render Final Frame'}
                 </button>
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
                 <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 bg-indigo-500/[0.02] shadow-xl text-left">
                    <div className="flex items-center gap-3 text-indigo-400 font-black text-xs uppercase tracking-widest">
                       <BookOpen className="w-4 h-4" />
                       Topic 1: Classifier-Free Guidance (CFG)
                    </div>
                    <div className="space-y-4">
                       <blockquote className="text-sm text-white/60 italic border-l-2 border-indigo-500/30 pl-4 py-1 leading-relaxed text-left">
                          "How does the AI 'subtract' the wrong features to find our Futuristic City? What happens if CFG is too low?"
                       </blockquote>
                       <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                          <div className="flex justify-center text-xl font-mono text-indigo-300 py-2">
                             ε<sub>cfg</sub> = ε<sub>uncond</sub> + s ⊙ (ε<sub>cond</sub> - ε<sub>uncond</sub>)
                          </div>
                          <div className="grid grid-cols-1 gap-3 text-[10px] uppercase font-black text-white/40 border-t border-white/5 pt-4 text-left">
                             <div className="flex justify-between">
                                <span>ε<sub>uncond</sub></span>
                                <span className="text-indigo-400">Noise without a Prompt (Pure Luck)</span>
                             </div>
                             <div className="flex justify-between">
                                <span>ε<sub>cond</sub></span>
                                <span className="text-indigo-400">Noise following the Prompt</span>
                             </div>
                             <div className="flex justify-between">
                                <span>s (Scale)</span>
                                <span className="text-indigo-400">CFG Scale (7.5 is the Sweet Spot)</span>
                             </div>
                          </div>
                       </div>
                       <p className="text-[11px] text-white/30 leading-relaxed text-left">
                          <strong className="text-white/60">Illustration:</strong> Think of a sculptor. ε<sub>uncond</sub> is the block of marble. ε<sub>cond</sub> is the sculptor's hand. The CFG Scale (s) is how much *pressure* the sculptor applies. Too little pressure, and you get a generic rock. Too much pressure, and you crack the marble (over-saturated pixels).
                       </p>
                    </div>
                 </div>

                 {/* Research Discussion 2 */}
                 <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 bg-indigo-500/[0.02] shadow-xl text-left">
                    <div className="flex items-center gap-3 text-indigo-400 font-black text-xs uppercase tracking-widest">
                       <BrainCircuit className="w-4 h-4" />
                       Topic 2: The Denoising Timeline
                    </div>
                    <div className="space-y-4">
                       <blockquote className="text-sm text-white/60 italic border-l-2 border-indigo-500/30 pl-4 py-1 leading-relaxed text-left">
                          "Why does the AI always start with static? How does it 'know' what a cat looks like from random fog?"
                       </blockquote>
                       <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4 text-left">
                          <div className="flex justify-center text-xl font-mono text-amber-300 py-2">
                             x<sub>t-1</sub> = f(x<sub>t</sub>, ε<sub>θ</sub>(x<sub>t</sub>, t))
                          </div>
                          <div className="grid grid-cols-1 gap-3 text-[10px] uppercase font-black text-white/40 border-t border-white/5 pt-4">
                             <div className="flex justify-between">
                                <span>x<sub>t</sub></span>
                                <span className="text-amber-400">The current noisy image at step t</span>
                             </div>
                             <div className="flex justify-between">
                                <span>ε<sub>θ</sub></span>
                                <span className="text-amber-400">The U-Net's guess of the noise</span>
                             </div>
                          </div>
                       </div>
                       <p className="text-[11px] text-white/30 leading-relaxed text-left">
                          <strong className="text-white/60">Illustration:</strong> Imagine looking at a foggy window. You know there is a tree behind it. Each diffusion step is like wiping away a tiny bit of fog. The U-Net (ε<sub>θ</sub>) has memorized millions of tree patterns, so it "guesses" where the branches should be even when the fog is thick.
                       </p>
                    </div>
                 </div>
              </div>

              {/* Interaction Call-to-Action */}
              <div className="p-8 rounded-[3rem] bg-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.2)] border border-white/10 text-center space-y-4">
                 <h4 className="text-lg font-black uppercase tracking-widest text-white">Interactive Session Prompt</h4>
                 <p className="text-sm text-indigo-100/70 max-w-xl mx-auto leading-relaxed">
                   "Set the Random Seed to '123' and generate. Now change it to '456'. Discuss why the entire composition changes even though the prompt is identical. How does this 'stochastic seed' affect the research reproducibility?"
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
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">SOTA Image Synthesis Research Vault</h3>
                    <p className="text-sm text-white/40 italic">Benchmarking Generative Image models and hardware requirements.</p>
                 </div>
              </div>

              <div className="glass rounded-[2.5rem] border-white/5 overflow-hidden shadow-2xl bg-indigo-500/5">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                             <th className="p-6">Model Paradigm</th>
                             <th className="p-6">Latent Dim / Complexity</th>
                             <th className="p-6">Eval Parameters</th>
                             <th className="p-6">Technical Execution</th>
                             <th className="p-6">Experimental Setup</th>
                             <th className="p-6">Current Gaps</th>
                          </tr>
                       </thead>
                       <tbody className="text-[11px] text-white/60 leading-relaxed font-medium">
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">GAN (StyleGAN-3)</td>
                             <td className="p-6 font-mono text-indigo-400">512-dim (Z)</td>
                             <td className="p-6 italic">FID (0.8 ~ 1.2), Inception Score</td>
                             <td className="p-6">Aliasing-free synthesis; Equivariant architecture using Fourier features.</td>
                             <td className="p-6 text-white/30 truncate max-w-[150px]">NVIDIA FFHQ; 8x V100; Fixed mapping network.</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1">
                                <span>- Mode Collapse</span>
                                <span>- Poor Compositionality</span>
                             </td>
                          </tr>
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">Diffusion (LDM/SDXL)</td>
                             <td className="p-6 font-mono text-emerald-400">4x64x64 (Latent)</td>
                             <td className="p-6 italic">CLIP-Score, FID (2.1)</td>
                             <td className="p-6">UNet / DiT backbone; Cross-entropy CLIP guidance; Euler-A/DDIM solvers.</td>
                             <td className="p-6 text-white/30">LAION-5B Dataset; 1k+ A100 days; VAE perceptual compression.</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1">
                                <span>- Temporal Inconsistency</span>
                                <span>- Iterative Speed Bottleneck</span>
                             </td>
                          </tr>
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">Consistency Models</td>
                             <td className="p-6 font-mono text-amber-400">O(1) Step Mapping</td>
                             <td className="p-6 italic">Inference Latency (ms)</td>
                             <td className="p-6">Direct mapping to data manifold; Unified distillation from diffusion.</td>
                             <td className="p-6 text-white/30">LPIPS Loss; Student-Teacher distillation; 1-step sampling.</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1">
                                <span>- Detail Loss vs Diffusion</span>
                                <span>- Training Instability</span>
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
                        <Layers className="w-5 h-5" />
                     </div>
                     <h4 className="text-xl font-black text-white uppercase tracking-tight">Latent Diffusion Architecture (SDXL)</h4>
                  </div>

                  <div className="relative overflow-hidden glass rounded-[3rem] border-white/5 p-10 bg-indigo-500/[0.03]">
                     <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        {/* Block 1: VAE Encoder */}
                        <div className="w-full md:w-48 p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
                           <div className="text-[10px] font-black text-indigo-400 uppercase">Input Compression</div>
                           <div className="text-sm font-bold text-white">VAE Encoder</div>
                           <div className="text-[9px] text-white/40 leading-tight text-left">Compresses 512x512 pixels into an 8x8 latent grid to reduce compute cost.</div>
                        </div>

                        <div className="hidden md:block text-indigo-500/30">
                           <RefreshCw className="w-6 h-6 animate-spin-slow" />
                        </div>

                        {/* Block 2: Denoising Core */}
                        <div className="w-full md:w-72 p-6 rounded-3xl bg-indigo-500/10 border border-white/10 text-center space-y-4 shadow-2xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-2 opacity-10">
                              <BrainCircuit className="w-12 h-12" />
                           </div>
                           <div className="text-[10px] font-black text-indigo-400 uppercase">Denoising Engine</div>
                           <div className="text-sm font-black text-white">U-Net / DiT Backbone</div>
                           <div className="space-y-2">
                              <div className="p-2 rounded-lg bg-black/40 text-[9px] text-white/60 text-left">Cross-Attention (Prompt Binding)</div>
                              <div className="p-2 rounded-lg bg-black/40 text-[9px] text-white/60 text-left">ResNet blocks (Feature Extraction)</div>
                           </div>
                        </div>

                        <div className="hidden md:block text-indigo-500/30">
                           <RefreshCw className="w-6 h-6 animate-spin-slow" />
                        </div>

                        {/* Block 3: VAE Decoder */}
                        <div className="w-full md:w-48 p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
                           <div className="text-[10px] font-black text-indigo-400 uppercase">Reconstruction</div>
                           <div className="text-sm font-bold text-white">VAE Decoder</div>
                           <div className="text-[9px] text-white/40 leading-tight text-left">Inverts the latent space back into a full-resolution pixel image.</div>
                        </div>
                     </div>

                     {/* Equations & Data Flow */}
                     <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-10">
                        <div className="space-y-6">
                           <div className="text-xs font-black text-indigo-400 uppercase tracking-widest text-left">The Generative Flow Equation</div>
                           <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                              <div className="text-sm md:text-lg font-mono text-center text-white leading-relaxed">
                                 z<sub>t-1</sub> = z<sub>t</sub> - ε<sub>θ</sub>(z<sub>t</sub>, t, C) <br/>
                                 x<sub>final</sub> = VAE_Decode(z<sub>0</sub>)
                              </div>
                           </div>
                           <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]" />
                                 <p className="text-[10px] text-white/40 leading-relaxed font-black uppercase italic text-left">
                                    <strong className="text-white">Interpretation:</strong> The latent variable (z) is refined iteratively. Each step "sculpts" the noise based on the text conditioning (C).
                                 </p>
                              </div>
                              <div className="flex items-start gap-3">
                                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]" />
                                 <p className="text-[10px] text-white/40 leading-relaxed font-black uppercase italic text-left">
                                    <strong className="text-white">Equation Term (ε<sub>θ</sub>):</strong> The learned neural network that predicts which part of the image is "noise" that needs to be removed.
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <div className="text-xs font-black text-indigo-400 uppercase tracking-widest text-left">Block Responsibilities</div>
                           <div className="grid grid-cols-1 gap-4">
                              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                 <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex-shrink-0 flex items-center justify-center text-indigo-400 font-black text-[10px]">CLIP</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black text-white uppercase">CLIP Text Encoder</div>
                                    <div className="text-[9px] text-white/30 leading-tight">Translates English words into high-dim mathematical "meaning" vectors for the U-Net.</div>
                                 </div>
                              </div>
                              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                 <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex-shrink-0 flex items-center justify-center text-indigo-400 font-black text-[10px]">ODE</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black text-white uppercase">Numerical Solver</div>
                                    <div className="text-[9px] text-white/30 leading-tight">Heun / Euler-A solvers that decide the "path" from pure noise to a specific image.</div>
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
                     <div className="text-xs font-bold text-white">FID Score</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black">Measures the Fréchet distance between feature distributions of real and fake images. Lower is better.</p>
                  </div>
                  <div className="p-6 glass rounded-3xl border-white/5 bg-indigo-500/5 space-y-2">
                     <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Experimental Setup</div>
                     <div className="text-xs font-bold text-white">The VAE Bottleneck</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black">Latent diffusion relies on a compressed 8x or 16x latent field to make training computationally feasible.</p>
                  </div>
                  <div className="p-6 glass rounded-3xl border-white/5 bg-indigo-500/5 space-y-2">
                     <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Research Roadmap</div>
                     <div className="text-xs font-bold text-white">Fine-grained Layout</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black">Solving for exact spatial control (text in images, hand anatomy) without reference control-nets.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ImageLab;
