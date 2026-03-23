import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RefreshCw, Play, Pause, Activity, Settings2, Trophy, Microscope, Beaker, MessageSquare, BookOpen, BrainCircuit, Database, Layers
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AudioLab: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResearch, setShowResearch] = useState(false);
  
  // Research tools
  const [windowSize, setWindowSize] = useState(4096);
  const [probabilitySpread, setProbabilitySpread] = useState(0.5);
  const [pitchBias, setPitchBias] = useState(1.0);
  
  // Intermediate data
  const [sampleVal, setSampleVal] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);

  const generateAudio = async () => {
    setIsGenerating(true);
    setProgress(0);
    setHistoryCount(0);
    
    // WaveNet-style synthesis simulation
    for (let i = 0; i <= 100; i += 5) {
      setProgress(i);
      setSampleVal(parseFloat(((Math.random() * 2 - 1) * pitchBias * probabilitySpread).toFixed(4)));
      setHistoryCount(prev => prev + (windowSize / 4));
      await new Promise(r => setTimeout(r, 150));
    }
    setIsGenerating(false);
    toast.success("Hifi Synthesis Result Locked!");
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-32 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 text-left">
          <div className="flex items-center gap-2 text-orange-400 font-bold uppercase tracking-widest text-xs">
            <Microscope className="w-4 h-4" />
            Vocal Research Lab
          </div>
          <h2 className="text-5xl font-display font-black leading-tight text-white">Mastering Neural Voice Synthesis</h2>
          <p className="text-white/40 max-w-2xl text-sm leading-relaxed italic">
             Investigate WaveNet and Vocoders. Manipulate the Window Size and Probability Spread to control vocal fidelity and pitch stability.
          </p>
        </div>
        <button onClick={() => setShowResearch(!showResearch)} className={`px-5 py-2.5 rounded-2xl border transition-all flex items-center gap-2 font-bold text-sm ${showResearch ? 'bg-orange-600 border-orange-500 text-white' : 'glass border-white/5 text-white/60'}`}>
          <Settings2 className="w-4 h-4" />
          Research Mode
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Research Panel */}
        <div className="lg:col-span-1 space-y-6">
          <AnimatePresence>
            {showResearch && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass rounded-[2rem] p-8 border-white/5 space-y-8 shadow-2xl bg-orange-500/[0.02]">
                 <div className="flex items-center gap-2 text-orange-400 text-xs font-black uppercase tracking-widest text-left">
                   <Beaker className="w-4 h-4" />
                   Neural Vocoder Config
                 </div>
                 
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>History Window</span>
                          <span className="text-orange-300">{windowSize} Samples</span>
                       </div>
                       <input type="range" min="1024" max="16384" step="1024" value={windowSize} onChange={(e) => setWindowSize(parseInt(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-orange-500 shadow-inner" />
                       <p className="text-[10px] text-white/20 italic leading-tight uppercase font-black text-left">Larger windows allow the model to maintain long-term prosody and rhythm.</p>
                    </div>

                    <div className="space-y-3">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>Prob. Spread</span>
                          <span className="text-orange-300">{probabilitySpread.toFixed(1)}</span>
                       </div>
                       <input type="range" min="0.1" max="1.0" step="0.1" value={probabilitySpread} onChange={(e) => setProbabilitySpread(parseFloat(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-orange-500 shadow-inner" />
                       <p className="text-[10px] text-white/20 italic text-left">High spread creates more breathy, whisper-like voices.</p>
                    </div>

                    <div className="space-y-3">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>Pitch Bias</span>
                          <span className="text-orange-300">{pitchBias.toFixed(1)}x</span>
                       </div>
                       <input type="range" min="0.5" max="2.0" step="0.1" value={pitchBias} onChange={(e) => setPitchBias(parseFloat(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-orange-500 shadow-inner" />
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 shadow-2xl bg-orange-500/5">
             <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-widest text-white">
                <Trophy className="w-4 h-4" />
                Mastery Challenges
             </div>
             <div className="space-y-4">
                {[
                  { id: 1, title: 'The Robotic Tonal', desc: 'Set window size to 1024 and Prob Spread to 0.1. Generate output. Does it sound mechanical?' },
                  { id: 2, title: 'Vocal Entrophy', desc: 'Set Prob Spread to 1.0. How much "breath noise" is added to the synthesis?' },
                  { id: 3, title: 'Long-term Memory', desc: 'Compare prosody between 1024 and 16384 window sizes. Which feels more natural?' }
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
           <div className="glass rounded-[3rem] p-10 border-white/5 min-h-[450px] relative overflow-hidden flex flex-col items-center justify-center gap-10 bg-black/20 shadow-2xl text-white">
              <div className="absolute inset-0 bg-grid-white/[0.03] opacity-40 shadow-inner" />
              
              <div className="grid grid-cols-2 gap-8 w-full px-8 relative z-20">
                 <div className="p-6 glass rounded-2xl border-orange-500/10 space-y-2 text-left">
                    <div className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Intermediate: Current Magnitude</div>
                    <div className="font-mono text-3xl font-black text-white">{sampleVal > 0 ? '+' : ''}{sampleVal}</div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div animate={{ width: `${Math.abs(sampleVal) * 100}%` }} className="h-full bg-orange-500 shadow-[0_0_15px_#f97316]" />
                    </div>
                 </div>
                 <div className="p-6 glass rounded-2xl border-orange-500/10 space-y-2 text-left">
                    <div className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Intermediate: Cumulative Mass</div>
                    <div className="font-mono text-3xl font-black text-white">{historyCount.toLocaleString()}</div>
                    <div className="text-[10px] text-white/20 uppercase font-black text-left">Samples Accumulated</div>
                 </div>
              </div>

              <div className="w-full h-40 flex items-center justify-center gap-1.5 px-12 group">
                 {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div 
                      key={i} animate={isGenerating || isPlaying ? { height: ['10%', `${10 + Math.random() * 80}%`, `${5 + Math.random() * 40}%`, '10%'] } : { height: '10%' }}
                      transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.02, ease: "easeInOut" }}
                      className={`w-3 rounded-full transition-all duration-300 ${isGenerating ? 'bg-orange-500/30' : i*2 < progress ? 'bg-orange-600 shadow-[0_0_25px_rgba(234,88,12,0.6)]' : 'bg-white/5'}`}
                    />
                 ))}
              </div>

              <div className="relative z-10 w-full max-w-xl">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4 px-2">
                    <div className="flex items-center gap-2 uppercase tracking-widest">
                       <Activity className="w-4 h-4 text-orange-400" />
                       Sample Pipeline (Freq: 24kHz)
                    </div>
                    <span className="text-orange-400">{progress}% Logic Locked</span>
                 </div>
                 <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5 shadow-inner text-left">
                    <motion.div className="h-full bg-linear-to-r from-orange-700 to-orange-400 shadow-[0_0_30px_#f97316]" animate={{ width: `${progress}%` }} />
                 </div>
              </div>

              <div className="flex gap-4">
                 <button onClick={generateAudio} disabled={isGenerating} className={`px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest flex items-center gap-3 transition-all relative z-10 ${isGenerating ? 'bg-white/5 text-white/10' : 'bg-orange-600 shadow-2xl shadow-orange-900/40 hover:scale-105 active:scale-95 text-white underline-offset-4'}`}>
                    {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
                    {isGenerating ? 'Encoding...' : 'Execute Synthesis'}
                 </button>
                 {!isGenerating && progress === 100 && (
                    <button onClick={() => setIsPlaying(!isPlaying)} className="px-10 py-4 glass rounded-2xl border-white/10 flex items-center gap-3 font-black uppercase text-sm tracking-widest hover:bg-white/10 transition-all text-white relative z-10">
                       {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                       {isPlaying ? 'Freeze' : 'Playback'}
                    </button>
                 )}
              </div>
           </div>

           {/* --- Discussion & Equations Section --- */}
           <div className="space-y-8 mt-12 text-left">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <MessageSquare className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Interactive Discussion Session</h3>
                    <p className="text-sm text-white/40 italic">Open-ended research questions and mathematical term interpretations.</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Research Discussion 1 */}
                 <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 bg-orange-500/[0.02] shadow-xl text-left">
                    <div className="flex items-center gap-3 text-orange-400 font-black text-xs uppercase tracking-widest">
                       <BookOpen className="w-4 h-4" />
                       Topic 1: Auto-Regressive Timeline
                    </div>
                    <div className="space-y-4">
                       <blockquote className="text-sm text-white/60 italic border-l-2 border-orange-500/30 pl-4 py-1 leading-relaxed text-left">
                          "Does the AI hear the current vibration before choosing the next? How does a single wrong sample break the voice?"
                       </blockquote>
                       <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4 text-left">
                          <div className="flex justify-center text-xl font-mono text-orange-400 py-2">
                             P(x) = ∏<sub>t</sub> P(x<sub>t</sub> | x<sub>&lt;t</sub>)
                          </div>
                          <div className="grid grid-cols-1 gap-3 text-[10px] uppercase font-black text-white/40 border-t border-white/5 pt-4 text-left">
                             <div className="flex justify-between">
                                <span>x<sub>t</sub></span>
                                <span className="text-orange-400">The current sound vibration (Sample)</span>
                             </div>
                             <div className="flex justify-between">
                                <span>x<sub>&lt;t</sub></span>
                                <span className="text-orange-400">All samples that came before it</span>
                             </div>
                             <div className="flex justify-between">
                                <span>P(x)</span>
                                <span className="text-orange-400">Total probability of a sound wave</span>
                             </div>
                          </div>
                       </div>
                       <p className="text-[11px] text-white/30 leading-relaxed text-left">
                          <strong className="text-white/60">Illustration:</strong> It's like a line of Dominos. If one domino (P(x<sub>t</sub>)) falls wrongly, the entire melody collapses into noise. The model uses its previous vibrations as ground-truth for the future.
                       </p>
                    </div>
                 </div>

                 {/* Research Discussion 2 */}
                 <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 bg-orange-500/[0.02] shadow-xl text-left">
                    <div className="flex items-center gap-3 text-orange-400 font-black text-xs uppercase tracking-widest">
                       <BrainCircuit className="w-4 h-4" />
                       Topic 2: μ-law Companding
                    </div>
                    <div className="space-y-4">
                       <blockquote className="text-sm text-white/60 italic border-l-2 border-orange-500/30 pl-4 py-1 leading-relaxed text-left">
                          "Humans can hear subtle sound changes better than loud ones. How does the AI focus its brain power on these details?"
                       </blockquote>
                       <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4 text-left">
                          <div className="flex justify-center text-xl font-mono text-orange-300 py-2">
                             F(x) = sgn(x) · ln(1+μ|x|) / ln(1+μ)
                          </div>
                          <div className="grid grid-cols-1 gap-3 text-[10px] uppercase font-black text-white/40 border-t border-white/5 pt-4">
                             <div className="flex justify-between">
                                <span>x</span>
                                <span className="text-orange-400">Original Amplitude (-1 to 1)</span>
                             </div>
                             <div className="flex justify-between">
                                <span>μ (Mu)</span>
                                <span className="text-orange-400">Compression value (usually 255)</span>
                             </div>
                          </div>
                       </div>
                       <p className="text-[11px] text-white/30 leading-relaxed text-left">
                          <strong className="text-white/60">Illustration:</strong> Imagine a rubber band where the middle (quiet sounds) is very soft and the ends (loud sounds) are very stiff. We stretch the middle more than the ends. This gives the AI more "discrete slots" to store quiet vocal nuances, which are critical for emotion.
                       </p>
                    </div>
                 </div>
              </div>

              {/* Interaction Call-to-Action */}
              <div className="p-8 rounded-[3rem] bg-orange-500 shadow-[0_0_50px_rgba(234,88,12,0.2)] border border-white/10 text-center space-y-4">
                 <h4 className="text-lg font-black uppercase tracking-widest text-white">Interactive Session Prompt</h4>
                 <p className="text-sm text-amber-100/70 max-w-xl mx-auto leading-relaxed">
                   "Set the 'Probability Spread' to 0.9 and observe the waveform. Does the voice sound breathy? Discuss if this randomness is a sign of a bad model or if it's necessary for sounding realistic like a human."
                 </p>
              </div>
           </div>

           {/* --- Advanced Research Vault --- */}
           <div className="mt-16 space-y-8 text-left text-white">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <Database className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Audio Synthesis Research Vault</h3>
                    <p className="text-sm text-white/40 italic">Benchmarking Neural Vocoders and Temporal Consistency.</p>
                 </div>
              </div>

              <div className="glass rounded-[2.5rem] border-white/5 overflow-hidden shadow-2xl bg-orange-500/5">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-orange-400 font-black">
                             <th className="p-6">Vocoder Model</th>
                             <th className="p-6">RTF / Complexity</th>
                             <th className="p-6">Eval Parameters</th>
                             <th className="p-6">Technical Execution</th>
                             <th className="p-6">Experimental Setup</th>
                             <th className="p-6">Current Gaps</th>
                          </tr>
                       </thead>
                       <tbody className="text-[11px] text-white/60 font-medium">
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">WaveNet</td>
                             <td className="p-6 font-mono text-orange-400">RTF &lt; 0.01 (Slow)</td>
                             <td className="p-6 italic">MOS (4.2 ~ 4.5), Log-Loss</td>
                             <td className="p-6">Dilated causal convolutions; Autoregressive sample-by-sample; 8-bit Mu-law.</td>
                             <td className="p-6 text-white/30 truncate max-w-[150px]">Google TTS Dataset; TPUs (NV-Wavenet optimized kernels).</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1">
                                <span>- Infinite Inference Latency</span>
                                <span>- Data Sequentiality Wall</span>
                             </td>
                          </tr>
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">WaveGlow</td>
                             <td className="p-6 font-mono text-emerald-400">Parallel O(1)</td>
                             <td className="p-6 italic">Log-Likelihood (Exact)</td>
                             <td className="p-6">Flow-based; Affine coupling layers; Zero-mean Gaussian transform.</td>
                             <td className="p-6 text-white/30">NVIDIA LJS-Speech; 8x A100 GPUs; FP16 mixed precision.</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1">
                                <span>- VRAM consumption (8GB+)</span>
                                <span>- Squeezing bottleneck</span>
                             </td>
                          </tr>
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">BigVGAN</td>
                             <td className="p-6 font-mono text-amber-400">RTF &gt; 100 (Fast)</td>
                             <td className="p-6 italic">PESQ, STOI, F0 Loss</td>
                             <td className="p-6">Periodic Activation (Snake); Multi-period discriminator (MPD); Adversarial.</td>
                             <td className="p-6 text-white/30 truncate max-w-[150px]">24kHz - 44kHz Audio; Single consumer GPU (RTX 3070).</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1">
                                <span>- Phase Mismatch artifacts</span>
                                <span>- Spectral Leakage</span>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>

               {/* --- Architectural Block Diagram --- */}
               <div className="space-y-8 mt-12 text-left">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                        <Layers className="w-5 h-5" />
                     </div>
                     <h4 className="text-xl font-black text-white uppercase tracking-tight">Audio Vocoder Architecture (Hifi-GAN)</h4>
                  </div>

                  <div className="relative overflow-hidden glass rounded-[3rem] border-white/5 p-10 bg-orange-500/[0.03]">
                     <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        {/* Block 1: Mel Encoder */}
                        <div className="w-full md:w-48 p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2 text-left">
                           <div className="text-[10px] font-black text-orange-400 uppercase">Input Conditioning</div>
                           <div className="text-sm font-bold text-white">Mel-Spectrogram</div>
                           <div className="text-[9px] text-white/40 leading-tight">Translates audio frequency "images" into raw temporal control vectors.</div>
                        </div>

                        <div className="hidden md:block text-orange-500/30">
                           <RefreshCw className="w-6 h-6 animate-spin-slow" />
                        </div>

                        {/* Block 2: Generator Core */}
                        <div className="w-full md:w-72 p-6 rounded-3xl bg-orange-500/10 border border-white/10 text-center space-y-4 shadow-2xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-2 opacity-10">
                              <BrainCircuit className="w-12 h-12" />
                           </div>
                           <div className="text-[10px] font-black text-orange-400 uppercase">Temporal Generator</div>
                           <div className="text-sm font-black text-white">Multi-Receptive Block (MRB)</div>
                           <div className="space-y-2">
                              <div className="p-2 rounded-lg bg-black/40 text-[9px] text-white/60 text-left underline-offset-4">Snake Activation (Periodic Signal)</div>
                              <div className="p-2 rounded-lg bg-black/40 text-[9px] text-white/60 text-left underline-offset-4">Dilated Convolutions (Long Context)</div>
                           </div>
                        </div>

                        <div className="hidden md:block text-orange-500/30">
                           <RefreshCw className="w-6 h-6 animate-spin-slow" />
                        </div>

                        {/* Block 3: Waveform */}
                        <div className="w-full md:w-48 p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
                           <div className="text-[10px] font-black text-orange-400 uppercase">Output Signal</div>
                           <div className="text-sm font-bold text-white">Raw Waveform</div>
                           <div className="text-[9px] text-white/40 leading-tight text-left">Continuity-preserved 1D signal ready for playback at 24kHz.</div>
                        </div>
                     </div>

                     {/* Equations & Data Flow */}
                     <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-10 text-left">
                        <div className="space-y-6">
                           <div className="text-xs font-black text-orange-400 uppercase tracking-widest">The Spectral-to-Wave Equation</div>
                           <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                              <div className="text-sm md:text-lg font-mono text-center text-white leading-relaxed">
                                 H<sub>out</sub> = ResBlock(ConvTranspose(S<sub>mel</sub>)) <br/>
                                 y = ∑<sub>k</sub> w<sub>k</sub> · f(H<sub>out</sub>, snake<sub>α</sub>)
                              </div>
                           </div>
                           <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]" />
                                 <p className="text-[10px] text-white/40 leading-relaxed font-black uppercase italic text-left">
                                    <strong className="text-white">Interpretation:</strong> The spectrogram (S<sub>mel</sub>) acts as a low-res blueprint. The generator fills in the "high-frequency harmonics" using learnable periodic functions.
                                 </p>
                              </div>
                              <div className="flex items-start gap-3">
                                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]" />
                                 <p className="text-[10px] text-white/40 leading-relaxed font-black uppercase italic">
                                    <strong className="text-white">Equation Term (snake<sub>α</sub>):</strong> A specialized activation function `x + sin²(αx)/α` that allows the AI to learn frequency and phase information natively.
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6 text-left">
                           <div className="text-xs font-black text-orange-400 uppercase tracking-widest">Block Responsibilities</div>
                           <div className="grid grid-cols-1 gap-4">
                              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                 <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex-shrink-0 flex items-center justify-center text-orange-400 font-black text-[10px]">MPD</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black text-white uppercase">Multi-Period Discriminator</div>
                                    <div className="text-[9px] text-white/30 leading-tight">Checks if the voice "repeats" correctly in time, ensuring no metallic artifacts.</div>
                                 </div>
                              </div>
                              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                 <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex-shrink-0 flex items-center justify-center text-orange-400 font-black text-[10px]">MSD</div>
                                 <div className="text-left">
                                    <div className="text-[10px] font-black text-white uppercase">Multi-Scale Discriminator</div>
                                    <div className="text-[9px] text-white/30 leading-tight">Analyzes the audio at different resolution zooms to ensure local and global consistency.</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-12 pb-12">
                  <div className="p-6 glass rounded-3xl border-white/5 bg-orange-500/5 space-y-2 text-left">
                     <div className="text-[9px] font-black text-orange-400 uppercase tracking-widest text-left">Parameter Interpretation</div>
                     <div className="text-xs font-bold text-white text-left">Mean Opinion Score (MOS)</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black text-left">A human-judged quality metric from 1-5. It remains the gold standard because AI metrics often miss subtle vocal "soul" and rhythm.</p>
                  </div>
                  <div className="p-6 glass rounded-3xl border-white/5 bg-orange-500/5 space-y-2 text-left">
                     <div className="text-[9px] font-black text-orange-400 uppercase tracking-widest">Experimental Limitation</div>
                     <div className="text-xs font-bold text-white">The TPU Bottleneck</div>
                     <div className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black block text-left">Autoregressive models like WaveNet require specialized hardware or kernels (NV-Wavenet) to reach even 1/2 real-time speeds.</div>
                  </div>
                  <div className="p-6 glass rounded-3xl border-white/5 bg-orange-500/5 space-y-2 text-left">
                     <div className="text-[9px] font-black text-orange-400 uppercase tracking-widest">Research Roadmap</div>
                     <div className="text-xs font-bold text-white text-left">Emotional Prosody</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black text-left">Solving for mid-sentence emotional shifts and "laughter" within the neural synthesis pipeline.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AudioLab;
