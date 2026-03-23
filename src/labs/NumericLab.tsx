import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, RefreshCw, Zap, Activity, Settings2, Trophy, Microscope, Beaker, MessageSquare, BookOpen, BrainCircuit, Database
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Scatter, ScatterChart as ReScatter, ZAxis
} from 'recharts';
import { toast } from 'react-hot-toast';

const NumericLab: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResearch, setShowResearch] = useState(false);
  
  // Research tools (VAE)
  const [mean, setMean] = useState(0);
  const [variance, setVariance] = useState(1.0);
  const [epsilonScale, setEpsilonScale] = useState(1.0);
  
  // Synthetic Data for visualization
  const [latentPoint, setLatentPoint] = useState({ x: 0, y: 0 });
  const [decodedSignal, setDecodedSignal] = useState<{t: number, v: number}[]>([]);

  const generateData = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Step 1: Reparameterization Simulation
    const epsilon = (Math.random() * 2 - 1) * epsilonScale;
    const z_x = mean + variance * epsilon;
    const z_y = mean + variance * (Math.random() * 2 - 1) * epsilonScale;
    
    setLatentPoint({ x: z_x, y: z_y });
    
    for (let i = 0; i <= 100; i += 5) {
      setProgress(i);
      const newSignal = Array.from({ length: 20 }, (_, idx) => ({
        t: idx,
        v: Math.sin(idx * 0.5 + z_x) * (1 + z_y * 0.5)
      }));
      setDecodedSignal(newSignal);
      await new Promise(r => setTimeout(r, 100));
    }
    
    setIsGenerating(false);
    toast.success("Latent Sample Decoded!");
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-32 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 text-left">
          <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-xs">
            <Microscope className="w-4 h-4" />
            Latent Research Lab
          </div>
          <h2 className="text-5xl font-display font-black leading-tight text-white">VAE Latent Manifolds</h2>
          <p className="text-white/40 max-w-2xl text-sm leading-relaxed italic">
             Investigate how VAEs map complex data into a Gaussian distribution. Manipulate the mean (μ) and variance (σ) to explore the Decoded Output space.
          </p>
        </div>
        <button onClick={() => setShowResearch(!showResearch)} className={`px-5 py-2.5 rounded-2xl border transition-all flex items-center gap-2 font-bold text-sm ${showResearch ? 'bg-emerald-600 border-emerald-500 text-white' : 'glass border-white/5 text-white/60'}`}>
          <Settings2 className="w-4 h-4" />
          Research Mode
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Research Panel */}
        <div className="lg:col-span-1 space-y-6">
          <AnimatePresence>
            {showResearch && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass rounded-4xl p-8 border-white/5 space-y-8 shadow-2xl bg-emerald-500/[0.02]">
                 <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest text-left">
                   <Beaker className="w-4 h-4" />
                   Gaussian Sampler
                 </div>
                 
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>Mean (μ)</span>
                          <span className="text-emerald-300">{mean}</span>
                       </div>
                       <input type="range" min="-5" max="5" step="0.5" value={mean} onChange={(e) => setMean(parseFloat(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-emerald-500 shadow-inner" />
                       <p className="text-[10px] text-white/20 italic leading-tight uppercase font-black text-left">Shifts the entire latent space center.</p>
                    </div>

                    <div className="space-y-3">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>Variance (σ)</span>
                          <span className="text-emerald-300">{variance}</span>
                       </div>
                       <input type="range" min="0.1" max="5.0" step="0.1" value={variance} onChange={(e) => setVariance(parseFloat(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-emerald-500 shadow-inner" />
                    </div>

                    <div className="space-y-3">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>Random Spark (ε)</span>
                          <span className="text-emerald-300">{epsilonScale}</span>
                       </div>
                       <input type="range" min="0" max="2.0" step="0.1" value={epsilonScale} onChange={(e) => setEpsilonScale(parseFloat(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-emerald-500 shadow-inner" />
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="glass rounded-4xl p-8 border-white/5 space-y-6 shadow-2xl bg-emerald-500/5">
             <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-widest text-white">
                <Trophy className="w-4 h-4" />
                Mastery Challenges
             </div>
             <div className="space-y-4">
                {[
                  { id: 1, title: 'Zero Drift', desc: 'Set μ to 0 and σ to 0.1. Generate output. Why is the signal almost perfectly static?' },
                  { id: 2, title: 'High Entropy', desc: 'Set σ to 5.0. Observe how the latent point jumps wildly. Can you find a pattern?' },
                  { id: 3, title: 'Domain Shift', desc: 'Change μ from -5 to +5. How does this "shift" the phase of the decoded signal?' }
                ].map(c => (
                  <div key={c.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-amber-400/40 transition-colors pointer-events-auto cursor-help group text-left">
                     <div className="text-[10px] font-bold text-amber-500 group-hover:scale-105 transition-transform origin-left">Challenge #{c.id}</div>
                     <div className="text-xs font-bold text-white mt-1">{c.title}</div>
                     <p className="text-[10px] text-white/30 mt-1 leading-relaxed text-left">{c.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Center Main Stage */}
        <div className="lg:col-span-3 space-y-8 text-left">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass rounded-[3rem] p-10 border-white/5 min-h-[400px] relative overflow-hidden bg-black/20 text-white shadow-2xl">
                 <div className="absolute inset-0 bg-grid-white/[0.02] shadow-inner" />
                 <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3 text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">
                       <Layers className="w-4 h-4" />
                       Latent Space (z)
                    </div>
                    <div className="h-64 w-full bg-black/40 rounded-3xl p-4 relative border border-white/5 shadow-inner">
                       <ResponsiveContainer width="100%" height="100%">
                          <ReScatter>
                             <XAxis type="number" dataKey="x" domain={[-10, 10]} hide />
                             <YAxis type="number" dataKey="y" domain={[-10, 10]} hide />
                             <ZAxis type="number" range={[400, 400]} />
                             <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                             <Scatter name="Latent Code" data={[latentPoint]} fill="#10b981" />
                          </ReScatter>
                       </ResponsiveContainer>
                       {/* Distribution visualization */}
                       <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                          <div className="w-32 h-32 rounded-full border-4 border-emerald-500 animate-ping" />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="glass rounded-[3rem] p-10 border-white/5 min-h-[400px] relative overflow-hidden bg-black/20 shadow-2xl">
                 <div className="absolute inset-0 bg-grid-white/[0.02] shadow-inner" />
                 <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3 text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] text-white">
                       <Activity className="w-4 h-4" />
                       Decoded Synthetic Signal
                    </div>
                    <div className="h-64 w-full bg-black/40 rounded-3xl p-4 border border-white/5 shadow-inner">
                       <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={decodedSignal}>
                           <defs>
                             <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                               <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                             </linearGradient>
                           </defs>
                           <XAxis dataKey="t" hide />
                           <YAxis hide />
                           <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }} />
                           <Area type="monotone" dataKey="v" stroke="#10b981" fillOpacity={1} fill="url(#colorV)" isAnimationActive={false} strokeWidth={3} />
                         </AreaChart>
                       </ResponsiveContainer>
                    </div>
                 </div>
              </div>
           </div>

           <div className="glass rounded-[3rem] p-10 border-white/5 flex flex-col items-center justify-center gap-6 relative overflow-hidden bg-black/20 shadow-2xl">
              <div className="absolute inset-0 bg-grid-white/[0.02]" />
              <div className="relative z-10 w-full max-w-xl">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4 px-2">
                    <span>Reconstruction Loop</span>
                    <span className="text-emerald-400">{progress}%</span>
                 </div>
                 <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5 shadow-inner">
                    <motion.div className="h-full bg-linear-to-r from-emerald-700 to-emerald-400 shadow-[0_0_20px_#10b981]" animate={{ width: `${progress}%` }} />
                 </div>
              </div>
              <button onClick={generateData} disabled={isGenerating} className={`px-12 py-5 rounded-2xl font-black uppercase text-sm tracking-widest flex items-center gap-4 transition-all relative z-10 ${isGenerating ? 'bg-white/5 text-white/10' : 'bg-emerald-600 shadow-2xl shadow-emerald-900/40 hover:scale-105 active:scale-95 text-white'}`}>
                 {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                 {isGenerating ? 'Sampling Distribution...' : 'Reconstruct from Latent'}
              </button>
           </div>

           {/* --- Discussion & Equations Section --- */}
           <div className="space-y-8 mt-12 text-left">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Interactive Discussion Session</h3>
                    <p className="text-sm text-white/40 italic">Open-ended research questions and mathematical term interpretations.</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                 {/* Research Discussion 1 */}
                 <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 bg-emerald-500/[0.02] shadow-xl text-left">
                    <div className="flex items-center gap-3 text-emerald-400 font-black text-xs uppercase tracking-widest font-black">
                       <BookOpen className="w-4 h-4" />
                       Topic 1: The Reparameterization Trick
                    </div>
                    <div className="space-y-4">
                       <blockquote className="text-sm text-white/60 italic border-l-2 border-emerald-500/30 pl-4 py-1 leading-relaxed text-left">
                          "Why can't we just pick a random point in the Latent Space? Why do we need μ and σ?"
                       </blockquote>
                       <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4 text-left">
                          <div className="flex justify-center text-xl font-mono text-emerald-300 py-2">
                             z = μ + σ ⊙ ε
                          </div>
                          <div className="grid grid-cols-1 gap-3 text-[10px] uppercase font-black text-white/40 border-t border-white/5 pt-4">
                             <div className="flex justify-between">
                                <span>z</span>
                                <span className="text-emerald-400">The sampled latent vector</span>
                             </div>
                             <div className="flex justify-between">
                                <span>μ</span>
                                <span className="text-emerald-400">Mean (Learned central position)</span>
                             </div>
                             <div className="flex justify-between">
                                <span>σ</span>
                                <span className="text-emerald-400">Standard Dev (Learned spread)</span>
                             </div>
                             <div className="flex justify-between">
                                <span>ε (Epsilon)</span>
                                <span className="text-emerald-400">Random Noise (The "Spark")</span>
                             </div>
                          </div>
                       </div>
                       <p className="text-[11px] text-white/30 leading-relaxed text-left">
                          <strong className="text-white/60">Illustration:</strong> In standard neural networks, gradients cannot flow through a "random choice". The trick is like splitting a wild horse (random ε) from its rider (learned μ/σ). The rider tells the horse where to be, allowing the network to "learn" how to steer randomness.
                       </p>
                    </div>
                 </div>

                 {/* Research Discussion 2 */}
                 <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 bg-emerald-500/[0.02] shadow-xl text-left">
                    <div className="flex items-center gap-3 text-emerald-400 font-black text-xs uppercase tracking-widest font-black">
                       <BrainCircuit className="w-4 h-4" />
                       Topic 2: KL-Divergence & Loss
                    </div>
                    <div className="space-y-4 text-left">
                       <blockquote className="text-sm text-white/60 italic border-l-2 border-emerald-500/30 pl-4 py-1 leading-relaxed text-left underline-offset-4">
                          "What happens if the model ignores the KL Divergence term and only focuses on reconstruction?"
                       </blockquote>
                       <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                          <div className="flex justify-center text-xl font-mono text-amber-300 py-2">
                             L = L<sub>recon</sub> + KL(q(z|x) || p(z))
                          </div>
                          <div className="grid grid-cols-1 gap-3 text-[10px] uppercase font-black text-white/40 border-t border-white/5 pt-4 text-left">
                             <div className="flex justify-between">
                                <span>L<sub>recon</sub></span>
                                <span className="text-amber-400">How well the output matches input</span>
                             </div>
                             <div className="flex justify-between">
                                <span>KL Term</span>
                                <span className="text-amber-400">Pressure to keep z Gaussian</span>
                             </div>
                          </div>
                       </div>
                       <p className="text-[11px] text-white/30 leading-relaxed text-left font-black">
                          <strong className="text-white/60">Illustration:</strong> Think of the KL Divergence as a rubber band. Without it, the model would spread data points (latent vectors) across a massive, infinite space, making it impossible to "generate" new data by picking a point in between. The KL rubber band pulls everything into a tight, organized ball.
                       </p>
                    </div>
                 </div>
              </div>

              {/* Interaction Call-to-Action */}
              <div className="p-8 rounded-[3rem] bg-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.2)] border border-white/10 text-center space-y-4">
                 <h4 className="text-lg font-black uppercase tracking-widest text-white">Interactive Session Prompt</h4>
                 <p className="text-sm text-emerald-100/70 max-w-xl mx-auto leading-relaxed">
                   "Watch the Latent Point scatter plot and the Decoded Signal simultaneously. When you increase Variance (σ), how does the 'frequency' of the signal changes? Discuss if a VAE could ever output a perfectly sharp image if σ is set too high."
                 </p>
              </div>
           </div>

           {/* --- Advanced Research Vault --- */}
           <div className="mt-16 space-y-8 text-left text-white font-black">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Database className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Latent Space Research Vault</h3>
                    <p className="text-sm text-white/40 italic">Benchmarking Representation Learning and Manifold Stability.</p>
                 </div>
              </div>

              <div className="glass rounded-[2.5rem] border-white/5 overflow-hidden shadow-2xl bg-emerald-500/5">
                 <div className="overflow-x-auto text-left">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-emerald-400 font-black">
                             <th className="p-6">Latent Model</th>
                             <th className="p-6">Complexity / Scaling</th>
                             <th className="p-6">Eval Parameters</th>
                             <th className="p-6">Technical Execution</th>
                             <th className="p-6">Experimental Setup</th>
                             <th className="p-6">Current Gaps</th>
                          </tr>
                       </thead>
                       <tbody className="text-[11px] text-white/60 font-medium leading-relaxed font-black">
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">VAE (Variational)</td>
                             <td className="p-6 font-mono text-indigo-400">O(dim(Z) · N)</td>
                             <td className="p-6 italic">ELBO Elevation, PSNR</td>
                             <td className="p-6">Reparameterization Trick; Gaussian Latent priors; Information Bottleneck.</td>
                             <td className="p-6 text-white/30 truncate max-w-[150px]">MNIST/CIFAR; β-VAE annealing; ADAM optimizer.</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1">
                                <span>- Blurry Reconstruction</span>
                                <span>- Posterior Collapse</span>
                             </td>
                          </tr>
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">GAN (Adversarial)</td>
                             <td className="p-6 font-mono text-emerald-400">Non-convex Minimax</td>
                             <td className="p-6 italic">FID (Sharpness), Inception Score</td>
                             <td className="p-6">Zero-sum game; Discriminator vs Generator; Nash Equilibrium instability.</td>
                             <td className="p-6 text-white/30">WGAN-GP; Spectral Normalization; Minibatch Discrimination.</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1">
                                <span>- Mode Collapse</span>
                                <span>- Nash Equilibrium stability</span>
                             </td>
                          </tr>
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">Normalizing Flows</td>
                             <td className="p-6 font-mono text-amber-400">O(det(Jacobian))</td>
                             <td className="p-6 italic">Negative Log-Likelihood (Exact)</td>
                             <td className="p-6">Invertible mappings; Change of Variables formula; Bijective transformations.</td>
                             <td className="p-6 text-white/30 truncate max-w-[150px]">Glow; Real-NVP blocks; Coupling layers; 1x1 convs.</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1 underline-offset-4">
                                <span>- Computationally Heavy</span>
                                <span>- Manifold Dimensionality wall</span>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>

               {/* --- Architectural Block Diagram --- */}
               <div className="space-y-8 mt-12 text-left">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        <Layers className="w-5 h-5" />
                     </div>
                     <h4 className="text-xl font-black text-white uppercase tracking-tight">Variational Autoencoder (VAE) Architecture</h4>
                  </div>

                  <div className="relative overflow-hidden glass rounded-[3rem] border-white/5 p-10 bg-emerald-500/[0.03]">
                     <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 text-left">
                        {/* Block 1: Encoder */}
                        <div className="w-full md:w-48 p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
                           <div className="text-[10px] font-black text-emerald-400 uppercase">Input Compression</div>
                           <div className="text-sm font-bold text-white text-left">Inference Network q(z|x)</div>
                           <div className="text-[9px] text-white/40 leading-tight text-left">Maps raw numeric features into two vectors: μ (Mean) and σ (Standard Deviation).</div>
                        </div>

                        <div className="hidden md:block text-emerald-500/30">
                           <RefreshCw className="w-6 h-6 animate-spin-slow" />
                        </div>

                        {/* Block 2: Bottleneck */}
                        <div className="w-full md:w-72 p-6 rounded-3xl bg-emerald-500/10 border border-white/10 text-center space-y-4 shadow-2xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-2 opacity-10">
                              <BrainCircuit className="w-12 h-12" />
                           </div>
                           <div className="text-[10px] font-black text-emerald-400 uppercase">Information Bottleneck</div>
                           <div className="text-sm font-black text-white">Stochastic Sampling Layer</div>
                           <div className="space-y-2 text-left">
                              <div className="p-2 rounded-lg bg-black/40 text-[9px] text-white/60">Reparameterization (z = μ + σ · ε)</div>
                              <div className="p-2 rounded-lg bg-black/40 text-[9px] text-white/60">Normal Distribution N(0, I)</div>
                           </div>
                        </div>

                        <div className="hidden md:block text-emerald-500/30">
                           <RefreshCw className="w-6 h-6 animate-spin-slow" />
                        </div>

                        {/* Block 3: Decoder */}
                        <div className="w-full md:w-48 p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
                           <div className="text-[10px] font-black text-emerald-400 uppercase">Reconstruction</div>
                           <div className="text-sm font-bold text-white text-left">Generative Network p(x|z)</div>
                           <div className="text-[9px] text-white/40 leading-tight text-left">Decodes the latent sample back into the original numeric feature space.</div>
                        </div>
                     </div>

                     {/* Equations & Data Flow */}
                     <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-10 text-left">
                        <div className="space-y-6">
                           <div className="text-xs font-black text-emerald-400 uppercase tracking-widest text-left">The Variational ELBO Equation</div>
                           <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                              <div className="text-sm md:text-lg font-mono text-center text-white leading-relaxed">
                                 L(θ, φ; x) = E<sub>q<sub>φ</sub>(z|x)</sub>[log p<sub>θ</sub>(x|z)] <br/>
                                 - KL(q<sub>φ</sub>(z|x) || p(z))
                              </div>
                           </div>
                           <div className="space-y-3 font-black">
                              <div className="flex items-start gap-3">
                                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                                 <p className="text-[10px] text-white/40 leading-relaxed font-black uppercase italic text-left">
                                    <strong className="text-white">Interpretation:</strong> The first term measures how well the latent code represents the data; the second term keeps the code organized.
                                 </p>
                              </div>
                              <div className="flex items-start gap-3">
                                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                                 <p className="text-[10px] text-white/40 leading-relaxed font-black uppercase italic text-left">
                                    <strong className="text-white">Equation Term (E<sub>q</sub>):</strong> The expected value over all possible latent points sampled from the encoder.
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6 text-left">
                           <div className="text-xs font-black text-emerald-400 uppercase tracking-widest text-left">Block Responsibilities</div>
                           <div className="grid grid-cols-1 gap-4 font-black">
                              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                 <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex-shrink-0 flex items-center justify-center text-emerald-400 font-black text-[10px]">INF</div>
                                 <div className="text-left font-black">
                                    <div className="text-[10px] font-black text-white uppercase">Inference Network</div>
                                    <div className="text-[9px] text-white/30 leading-tight">Must learn to recognize patterns and compress them into a distribution, not a single point.</div>
                                 </div>
                              </div>
                              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                 <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex-shrink-0 flex items-center justify-center text-emerald-400 font-black text-[10px]">GEN</div>
                                 <div className="text-left font-black">
                                    <div className="text-[10px] font-black text-white uppercase">Generative Network</div>
                                    <div className="text-[9px] text-white/30 leading-tight">Must learn to interpret any sample from the Gaussian ball as a valid piece of data.</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-12 pb-12">
                  <div className="p-6 glass rounded-3xl border-white/5 bg-emerald-500/5 space-y-2 text-left font-black">
                     <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest text-left">Parameter Interpretation</div>
                     <div className="text-xs font-bold text-white text-left">ELBO (Evidence LB)</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black text-left">A lower bound on the probability of the data. Higher ELBO means the AI's "map" (z) fits the terrain perfectly.</p>
                  </div>
                  <div className="p-6 glass rounded-3xl border-white/5 bg-emerald-500/5 space-y-2 text-left font-black">
                     <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest text-left">Experimental Limitation</div>
                     <div className="text-xs font-bold text-white text-left">Latent Entanglement</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black text-left">Current models struggle to separate features (e.g., separating "glasses" from "eyes") into clean, independent vectors.</p>
                  </div>
                  <div className="p-6 glass rounded-3xl border-white/5 bg-emerald-500/5 space-y-2 text-left font-black">
                     <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest text-left">Research Roadmap</div>
                     <div className="text-xs font-bold text-white text-left">Discrete Latents (VQ-VAE)</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black text-left">Moving from continuous Gaussian noise to "vocabulary-like" discrete tokens for more robust representation.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default NumericLab;
