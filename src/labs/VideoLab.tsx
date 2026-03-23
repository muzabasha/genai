import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Film, Play, Sparkles, Settings2, Trophy, Microscope, Beaker, RefreshCw, MessageSquare, BookOpen, BrainCircuit, Database, Layers
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const VideoLab: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prompt, setPrompt] = useState("A golden retriever puppy jumping into a pool");
  const [showResearch, setShowResearch] = useState(false);
  
  // Research tools
  const [inferenceSteps, setInferenceSteps] = useState(25);
  const [motionScale, setMotionScale] = useState(1.0);
  const [frameWindow, setFrameWindow] = useState(16);

  const startGeneration = async () => {
    setIsGenerating(true);
    setProgress(0);
    const stepDuration = 5000 / inferenceSteps;
    for (let i = 0; i <= 100; i += (100 / inferenceSteps)) {
      setProgress(Math.min(100, i));
      await new Promise(r => setTimeout(r, stepDuration));
    }
    setIsGenerating(false);
    toast.success("Temporal Synthesis Complete!");
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-32 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 text-left border-none">
          <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-xs font-black text-left">
            <Microscope className="w-4 h-4" />
            Temporal Dynamics Lab
          </div>
          <h2 className="text-5xl font-display font-black leading-tight text-white text-left">Mastering Generative Video</h2>
          <p className="text-white/40 max-w-2xl text-sm leading-relaxed italic text-left underline-offset-4">
             Investigate Temporal Attention and Frame Consistency. Control the Motion Scale and Frame Window to master the physics of AI-generated time.
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
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass rounded-[2rem] p-8 border-white/5 space-y-8 shadow-2xl bg-indigo-500/[0.02]">
                 <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-widest text-left">
                   <Beaker className="w-4 h-4" />
                   Temporal Sampler
                 </div>
                 
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>Motion Scale</span>
                          <span className="text-indigo-300">{motionScale}x</span>
                       </div>
                       <input type="range" min="0.1" max="2.0" step="0.1" value={motionScale} onChange={(e) => setMotionScale(parseFloat(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-indigo-500 shadow-inner" />
                       <p className="text-[10px] text-white/20 italic leading-tight uppercase font-black text-left">Controls the magnitude of pixel transformation between frames (Velocity).</p>
                    </div>

                    <div className="space-y-3">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>Frame Window</span>
                          <span className="text-indigo-300">{frameWindow} Frames</span>
                       </div>
                       <input type="range" min="8" max="48" step="8" value={frameWindow} onChange={(e) => setFrameWindow(parseInt(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-indigo-500 shadow-inner" />
                    </div>

                    <div className="space-y-3">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>Sampler Steps</span>
                          <span className="text-indigo-300">{inferenceSteps}</span>
                       </div>
                       <input type="range" min="10" max="100" step="5" value={inferenceSteps} onChange={(e) => setInferenceSteps(parseInt(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-indigo-500 shadow-inner" />
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 shadow-2xl bg-indigo-500/5">
             <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-widest text-white">
                <Trophy className="w-4 h-4" />
                Mastery Challenges
             </div>
             <div className="space-y-4">
                {[
                  { id: 1, title: 'Temporal Flickering', desc: 'Set Frame Window to 8 and Motion Scale to 2.0. Observe how the objects "glitch" between frames.' },
                  { id: 2, title: 'Cinematic Persistence', desc: 'Set Frame Window to 48 and Motion Scale to 0.5. Can you achieve perfectly smooth motion?' },
                  { id: 3, title: 'The Static Void', desc: 'What happens if you set Motion Scale to 0? Does the Video become a single static Image?' }
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

        {/* Center Visualizer Area */}
        <div className="lg:col-span-3 space-y-8 text-left">
           <div className="glass rounded-[3rem] p-10 border-white/5 min-h-[500px] relative overflow-hidden flex flex-col items-center justify-center gap-10 bg-black/20 shadow-2xl text-white">
              <div className="absolute inset-0 bg-grid-white/[0.03] opacity-40 shadow-inner" />
              
              <div className="w-full max-w-xl space-y-4">
                 <div className="flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    Latent Animation Trigger
                 </div>
                 <div className="relative group">
                    <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-white/5 border-none rounded-[1.5rem] p-7 pl-16 text-lg font-display font-medium focus:ring-2 ring-indigo-400/20 outline-none text-white placeholder:text-white/10" placeholder="A scene through time..." />
                    <Film className="absolute left-6 top-7 w-6 h-6 text-indigo-400" />
                 </div>
              </div>

              <div className="relative w-full max-w-2xl aspect-video glass rounded-[3rem] border-white/10 overflow-hidden shadow-[0_0_100px_rgba(99,102,241,0.1)] group">
                 {isGenerating ? (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-md">
                      <div className="flex gap-2">
                         {Array.from({ length: 8 }).map((_, i) => (
                           <motion.div key={i} animate={{ scaleY: [1, 1.5, 1], opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, delay: i * 0.1, duration: 0.8 }} className="w-3 h-12 bg-indigo-500 rounded-full" />
                         ))}
                      </div>
                      <div className="mt-8 text-center">
                         <div className="text-[10px] font-black text-indigo-400 tracking-[0.5em] mb-2 uppercase">Temporal Attention Mapping</div>
                         <div className="text-2xl font-display font-black text-white">{Math.floor(progress)}% Complete</div>
                      </div>
                   </motion.div>
                 ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center text-white/5 group-hover:text-indigo-400/20 transition-all cursor-pointer" onClick={startGeneration}>
                       <Play className="w-20 h-20 mb-6 opacity-10 group-hover:opacity-20 transition-all fill-current" />
                       <p className="text-xs font-black uppercase tracking-[0.3em]">Sync Latent Timeline</p>
                    </div>
                 )}
              </div>

              <div className="w-full flex justify-between gap-12 px-12 relative z-20 mb-8 items-center">
                 <div className="flex-1 space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase text-white/40 tracking-widest mb-1.5">
                       <span>Synthesis Bandwidth</span>
                       <span className="text-indigo-400">{(progress * (motionScale + 1)).toFixed(0)} MB/s</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                       <motion.div className="h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]" animate={{ width: `${progress}%` }} />
                    </div>
                 </div>
                 <button onClick={startGeneration} disabled={isGenerating} className={`px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl transition-all ${isGenerating ? 'bg-white/5 text-white/10' : 'bg-indigo-600 shadow-indigo-900/40 hover:scale-105 active:scale-95 text-white font-bold'}`}>
                    {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Render Dynamic Video'}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                 {/* Research Discussion 1 */}
                 <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 bg-indigo-500/[0.02] shadow-xl text-left">
                    <div className="flex items-center gap-3 text-indigo-400 font-black text-xs uppercase tracking-widest">
                       <BookOpen className="w-4 h-4" />
                       Topic 1: Spatio-Temporal Attention
                    </div>
                    <div className="space-y-4">
                       <blockquote className="text-sm text-white/60 italic border-l-2 border-indigo-500/30 pl-4 py-1 leading-relaxed text-left">
                          "How does the AI keep the puppy's spots in the same place across 30 frames? Is it just copying the previous frame?"
                       </blockquote>
                       <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4 text-left">
                          <div className="flex justify-center text-xl font-mono text-indigo-300 py-2">
                             x<sub>t</sub> = Attn(x<sub>t-k:t</sub>, Q, K, V)
                          </div>
                          <div className="grid grid-cols-1 gap-3 text-[10px] uppercase font-black text-white/40 border-t border-white/5 pt-4">
                             <div className="flex justify-between">
                                <span>x<sub>t</sub></span>
                                <span className="text-indigo-400">Current frame being generated</span>
                             </div>
                             <div className="flex justify-between">
                                <span>x<sub>t-k:t</sub></span>
                                <span className="text-indigo-400">Previous k frames in the "Window"</span>
                             </div>
                             <div className="flex justify-between">
                                <span>Attn</span>
                                <span className="text-indigo-400">Inter-frame consistency logic</span>
                             </div>
                          </div>
                       </div>
                       <p className="text-[11px] text-white/30 leading-relaxed text-left">
                          <strong className="text-white/60">Illustration:</strong> It's like a Flip-Book. The AI doesn't just draw frame 2; it looks *through* frame 1 using tracing paper (Temporal Attention). It ensures the eyes and spots from the trace match the new drawing exactly.
                       </p>
                    </div>
                 </div>

                 {/* Research Discussion 2 */}
                 <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 bg-indigo-500/[0.02] shadow-xl text-left">
                    <div className="flex items-center gap-3 text-indigo-400 font-black text-xs uppercase tracking-widest font-black">
                       <BrainCircuit className="w-4 h-4" />
                       Topic 2: Optical Flow & Motion
                    </div>
                    <div className="space-y-4">
                       <blockquote className="text-sm text-white/60 italic border-l-2 border-indigo-500/30 pl-4 py-1 leading-relaxed text-left">
                          "Why does high 'Motion Scale' create artifacts? Does the AI lose track of physics?"
                       </blockquote>
                       <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                          <div className="flex justify-center text-xl font-mono text-amber-300 py-2">
                             Flow(F<sub>1</sub>, F<sub>2</sub>) = argmin<sub>Δ</sub> ||F<sub>1</sub>(x) - F<sub>2</sub>(x+Δ)||
                          </div>
                          <div className="grid grid-cols-1 gap-3 text-[10px] uppercase font-black text-white/40 border-t border-white/5 pt-4 text-left">
                             <div className="flex justify-between">
                                <span>Δ (Delta)</span>
                                <span className="text-amber-400">Movement vector of a pixel</span>
                             </div>
                             <div className="flex justify-between">
                                <span>Flow</span>
                                <span className="text-amber-400">Optical flow between two frames</span>
                             </div>
                          </div>
                       </div>
                       <p className="text-[11px] text-white/30 leading-relaxed text-left">
                          <strong className="text-white/60">Illustration:</strong> Think of a "Sticky Note" on a sliding glass door. As the door moves, the note (the puppy) moves with it. If the door moves TOO fast (High Motion Scale), the note might fly off (artifact), and the AI will try to redraw a new note on a different part of the glass.
                       </p>
                    </div>
                 </div>
              </div>

              {/* Interaction Call-to-Action */}
              <div className="p-8 rounded-[3rem] bg-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.2)] border border-white/10 text-center space-y-4">
                 <h4 className="text-lg font-black uppercase tracking-widest text-white">Interactive Session Prompt</h4>
                 <p className="text-sm text-indigo-100/70 max-w-xl mx-auto leading-relaxed">
                   "Watch the synthesis bandwidth carefully. If we increase 'Frame Window' to 48, how much slower does the generation become? Discuss if a 24-frame-per-second AI movie is feasible on current consumer hardware based on this latency."
                 </p>
              </div>
           </div>

           {/* --- Advanced Research Vault --- */}
           <div className="mt-16 space-y-8 text-left text-white">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Database className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Video Synthesis Research Vault</h3>
                    <p className="text-sm text-white/40 italic">Benchmarking Temporal Consistency and Motion Fidelity.</p>
                 </div>
              </div>

              <div className="glass rounded-[2.5rem] border-white/5 overflow-hidden shadow-2xl bg-indigo-500/5">
                 <div className="overflow-x-auto text-left">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-indigo-400 font-black">
                             <th className="p-6">Video Model</th>
                             <th className="p-6">Temporal Complexity</th>
                             <th className="p-6">Eval Parameters</th>
                             <th className="p-6">Technical Execution</th>
                             <th className="p-6">Experimental Setup</th>
                             <th className="p-6">Current Gaps</th>
                          </tr>
                       </thead>
                       <tbody className="text-[11px] text-white/60 font-medium leading-relaxed">
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">VideoGPT</td>
                             <td className="p-6 font-mono text-indigo-400">O(T · N · d) + VQ</td>
                             <td className="p-6 italic">FVD (200 ~ 400)</td>
                             <td className="p-6">VQ-VAE (Discrete codebook) + GPT-like autoregressive transformer.</td>
                             <td className="p-6 text-white/30 truncate max-w-[150px]">UCF-101; 64x A100 GPUs; 16-frame window.</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1">
                                <span>- Blocky Artifacts</span>
                                <span>- Poor Continuity</span>
                             </td>
                          </tr>
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">SVD (Diffusion)</td>
                             <td className="p-6 font-mono text-emerald-400">Iterative T-Denoise</td>
                             <td className="p-6 italic">CLIPS-Video score</td>
                             <td className="p-6">3D-UNet with temporal layers; Latent Video Diffusion; Motion buckets.</td>
                             <td className="p-6 text-white/30">Stable Diffusion base; 1k+ NVIDIA H100 GPU days.</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1">
                                <span>- Object Morphing</span>
                                <span>- 2-4s Length Wall</span>
                             </td>
                          </tr>
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">Sora-style (DiT)</td>
                             <td className="p-6 font-mono text-amber-400">Spatio-Temporal DiT</td>
                             <td className="p-6 italic">Aesthetic & Physics Score</td>
                             <td className="p-6">Diffusion Transformers (DiT); Spatio-temporal patchification (3D patches).</td>
                             <td className="p-6 text-white/30 truncate max-w-[150px]">10B+ Video frames; proprietary tagging; massive DiT-XL.</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1">
                                <span>- Complex Interaction Physics</span>
                                <span>- Causal Hallucination</span>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>

               {/* --- Architectural Block Diagram --- */}
               <div className="space-y-8 mt-12 text-left">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-black">
                        <Layers className="w-5 h-5" />
                     </div>
                     <h4 className="text-xl font-black text-white uppercase tracking-tight">Spatio-Temporal DiT Architecture</h4>
                  </div>

                  <div className="relative overflow-hidden glass rounded-[3rem] border-white/5 p-10 bg-indigo-500/[0.03]">
                     <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 text-left">
                        {/* Block 1: 3D VAE */}
                        <div className="w-full md:w-48 p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
                           <div className="text-[10px] font-black text-indigo-400 uppercase">Input Engine</div>
                           <div className="text-sm font-bold text-white">Video VAE (3D)</div>
                           <div className="text-[9px] text-white/40 leading-tight text-left">Compresses raw pixels across X, Y, and Time (T) into a compact latent cube.</div>
                        </div>

                        <div className="hidden md:block text-indigo-500/30">
                           <RefreshCw className="w-6 h-6 animate-spin-slow" />
                        </div>

                        {/* Block 2: Patchifier & DiT */}
                        <div className="w-full md:w-72 p-6 rounded-3xl bg-indigo-500/10 border border-white/10 text-center space-y-4 shadow-2xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-2 opacity-10">
                              <BrainCircuit className="w-12 h-12" />
                           </div>
                           <div className="text-[10px] font-black text-indigo-400 uppercase">Temporal Engine</div>
                           <div className="text-sm font-black text-white">3D Patchify + DiT Blocks</div>
                           <div className="space-y-2 text-left">
                              <div className="p-2 rounded-lg bg-black/40 text-[9px] text-white/60">Spatio-Temporal Self-Attention</div>
                              <div className="p-2 rounded-lg bg-black/40 text-[9px] text-white/60">Cross-Attention (LLM Guidance)</div>
                           </div>
                        </div>

                        <div className="hidden md:block text-indigo-500/30">
                           <RefreshCw className="w-6 h-6 animate-spin-slow" />
                        </div>

                        {/* Block 3: Unpatchify */}
                        <div className="w-full md:w-48 p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
                           <div className="text-[10px] font-black text-indigo-400 uppercase">Frame Projection</div>
                           <div className="text-sm font-bold text-white">VAE Decoder</div>
                           <div className="text-[9px] text-white/40 leading-tight text-left">Decodes the refined latent cube into a sequence of high-res pixels.</div>
                        </div>
                     </div>

                     {/* Equations & Data Flow */}
                     <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-10 text-left">
                        <div className="space-y-6">
                           <div className="text-xs font-black text-indigo-400 uppercase tracking-widest text-left">The Temporal Flow Equation</div>
                           <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                              <div className="text-sm md:text-lg font-mono text-center text-white leading-relaxed">
                                 z<sub>t,T</sub> = DiT_Transformer(z<sub>noise</sub>, text_tokens) <br/>
                                 Video = ∏<sub>f</sub> VAE_Decode(z<sub>t,f</sub>)
                              </div>
                           </div>
                           <div className="space-y-3 font-black underline-offset-4">
                              <div className="flex items-start gap-3">
                                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
                                 <p className="text-[10px] text-white/40 leading-relaxed font-black uppercase italic text-left">
                                    <strong className="text-white">Interpretation:</strong> The video is treated as a "static" 3D object in latent space. The AI sculpts the entire time-chunk simultaneously.
                                 </p>
                              </div>
                              <div className="flex items-start gap-3">
                                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
                                 <p className="text-[10px] text-white/40 leading-relaxed font-black uppercase italic text-left">
                                    <strong className="text-white">Equation Term (z<sub>t,T</sub>):</strong> Represents the latent cube at diffusion step `t` across time range `T`.
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6 text-left font-black">
                           <div className="text-xs font-black text-indigo-400 uppercase tracking-widest text-left">Block Responsibilities</div>
                           <div className="grid grid-cols-1 gap-4">
                              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                 <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex-shrink-0 flex items-center justify-center text-indigo-400 font-black text-[10px]">P3D</div>
                                 <div className="text-left font-black">
                                    <div className="text-[10px] font-black text-white uppercase">3D Patchification</div>
                                    <div className="text-[9px] text-white/30 leading-tight">Treats 8 consecutive frames of a 16x16 patch as a single "token" for the transformer to process.</div>
                                 </div>
                              </div>
                              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                 <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex-shrink-0 flex items-center justify-center text-indigo-400 font-black text-[10px]">T-ATT</div>
                                 <div className="text-left font-black">
                                    <div className="text-[10px] font-black text-white uppercase">Temporal Attention</div>
                                    <div className="text-[9px] text-white/30 leading-tight">Specifically calculates the relationship between the same spatial spot across different time patches.</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-12">
                  <div className="p-6 glass rounded-3xl border-white/5 bg-indigo-500/5 space-y-2 text-left">
                     <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest text-left">Parameter Interpretation</div>
                     <div className="text-xs font-bold text-white text-left">Fréchet Video Distance (FVD)</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black text-left">Measures the similarity between real video distributions and generated ones. High FVD = erratic "shaky" motion.</p>
                  </div>
                  <div className="p-6 glass rounded-3xl border-white/5 bg-indigo-500/5 space-y-2 text-left">
                     <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Experimental Setup</div>
                     <div className="text-xs font-bold text-white">Space-Time Patching</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black text-left">Advanced video models treat 16x16 pixel blocks across 8 frames as a single 3D "patch" for the Transformer.</p>
                  </div>
                  <div className="p-6 glass rounded-3xl border-white/5 bg-indigo-500/5 space-y-2 text-left font-black underline-offset-4">
                     <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest text-left">Research Roadmap</div>
                     <div className="text-xs font-bold text-white text-left">World Models</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black text-left">Moving from "predicting next frame" to "simulating physics laws" (gravity, collisions) within the latent space.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default VideoLab;
