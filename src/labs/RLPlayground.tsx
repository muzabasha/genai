import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RefreshCw, Play, Pause, Settings2, Trophy, Microscope, Beaker, MessageSquare, BookOpen, BrainCircuit, Database, Layers
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { toast } from 'react-hot-toast';

const RLPlayground: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [episodes, setEpisodes] = useState(0);
  const [rewardHistory, setRewardHistory] = useState<{ep: number, reward: number}[]>([]);
  const [currentReward, setCurrentReward] = useState(0);
  const [showResearch, setShowResearch] = useState(false);
  
  // Research tools
  const [gamma, setGamma] = useState(0.95);
  const [epsilon, setEpsilon] = useState(0.1);
  const [learningRate, setLR] = useState(0.01);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setEpisodes(prev => prev + 1);
        const newReward = Math.min(100, Math.floor(episodes * 0.5 + Math.random() * 20 * (1 - epsilon)));
        setCurrentReward(newReward);
        setRewardHistory(prev => [...prev.slice(-19), { ep: episodes, reward: newReward }]);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isRunning, episodes, epsilon]);

  const toggleTraining = () => {
    setIsRunning(!isRunning);
    if (!isRunning) toast.success("Policy Optimization Started!");
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-32 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-widest text-xs">
            <Microscope className="w-4 h-4" />
            Decision Systems Lab
          </div>
          <h2 className="text-5xl font-display font-black leading-tight text-white">Reinforcement Learning Policy</h2>
          <p className="text-white/40 max-w-2xl text-sm leading-relaxed italic border-none text-left">
             Investigate Reward Functions and Policy Gradients. Manipulate Epsilon and Gamma to control the agent's curiosity and long-term planning.
          </p>
        </div>
        <button onClick={() => setShowResearch(!showResearch)} className={`px-5 py-2.5 rounded-2xl border transition-all flex items-center gap-2 font-bold text-sm ${showResearch ? 'bg-rose-600 border-rose-500 text-white' : 'glass border-white/5 text-white/60'}`}>
          <Settings2 className="w-4 h-4" />
          Research Mode
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Research Panel */}
        <div className="lg:col-span-1 space-y-6">
          <AnimatePresence>
            {showResearch && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass rounded-[2rem] p-8 border-white/5 space-y-8 shadow-2xl bg-rose-500/[0.02] text-left">
                 <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-widest text-left">
                   <Beaker className="w-4 h-4" />
                   Agent Strategy Config
                 </div>
                 
                 <div className="space-y-6 text-left">
                    <div className="space-y-3 text-left">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>Discount (γ)</span>
                          <span className="text-rose-300">{gamma}</span>
                       </div>
                       <input type="range" min="0.5" max="0.99" step="0.01" value={gamma} onChange={(e) => setGamma(parseFloat(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-rose-500 shadow-inner" />
                       <p className="text-[10px] text-white/20 italic leading-tight uppercase font-black text-left">How much the agent cares about future results vs immediate points.</p>
                    </div>

                    <div className="space-y-3 text-left">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>Curiosity (ε)</span>
                          <span className="text-rose-300">{epsilon.toFixed(2)}</span>
                       </div>
                       <input type="range" min="0" max="1.0" step="0.05" value={epsilon} onChange={(e) => setEpsilon(parseFloat(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-rose-500 shadow-inner" />
                       <p className="text-[10px] text-white/20 italic text-left uppercase font-black">Exploration rate. 1.0 = Pure curiosity; 0.0 = Boredom.</p>
                    </div>

                    <div className="space-y-3 text-left">
                       <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                          <span>Learning Rate</span>
                          <span className="text-rose-300">{learningRate}</span>
                       </div>
                       <input type="range" min="0.001" max="0.1" step="0.001" value={learningRate} onChange={(e) => setLR(parseFloat(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-rose-500 shadow-inner" />
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 shadow-2xl bg-rose-500/5">
             <div className="flex items-center gap-2 text-amber-500 text-xs font-black uppercase tracking-widest text-white">
                <Trophy className="w-4 h-4" />
                Mastery Challenges
             </div>
             <div className="space-y-4 text-left">
                {[
                  { id: 1, title: 'The Greedy Agent', desc: 'Set ε to 0. Does the reward curve plateau instantly? Why does the agent stop learning?' },
                  { id: 2, title: 'Future Planner', desc: 'Set γ to 0.99. Observe how the agent is willing to lose points early to win big later.' },
                  { id: 3, title: 'The Chaos Lord', desc: 'Set ε to 1.0. Why does the reward jitter wildly even after thousands of episodes?' }
                ].map(c => (
                  <div key={c.id} className="p-4 rounded-[1.5rem] bg-white/5 border border-white/5 hover:border-amber-400/40 transition-colors pointer-events-auto cursor-help group text-left">
                     <div className="text-[10px] font-bold text-amber-500 group-hover:scale-105 transition-transform origin-left text-left">Challenge #{c.id}</div>
                     <div className="text-xs font-bold text-white mt-1 text-left">{c.title}</div>
                     <p className="text-[10px] text-white/30 mt-1 leading-relaxed text-left">{c.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Center Main Stage */}
        <div className="lg:col-span-3 space-y-8 text-left">
           <div className="glass rounded-[3rem] p-10 border-white/5 min-h-[450px] relative overflow-hidden flex flex-col items-center justify-center gap-10 bg-black/20 shadow-2xl text-white">
              <div className="absolute inset-0 bg-grid-white/[0.03] opacity-40 shadow-inner" />
              
              <div className="grid grid-cols-2 gap-8 w-full px-8 relative z-20 text-left">
                 <div className="p-6 glass rounded-[2rem] border-rose-500/10 space-y-2 text-left bg-black/40">
                    <div className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Target Reward Achieved</div>
                    <div className="font-mono text-5xl font-black text-rose-500">{currentReward}%</div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div animate={{ width: `${currentReward}%` }} className="h-full bg-rose-500 shadow-[0_0_20px_#f43f5e]" />
                    </div>
                 </div>
                 <div className="p-6 glass rounded-[2rem] border-rose-500/10 space-y-2 text-left bg-black/40">
                    <div className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Total Policy Episodes</div>
                    <div className="font-mono text-5xl font-black text-white">{episodes.toLocaleString()}</div>
                    <div className="text-[10px] text-white/20 uppercase font-black italic">Iterations of Experience</div>
                 </div>
              </div>

              <div className="w-full h-64 px-12 relative z-20 text-left">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={rewardHistory}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                       <XAxis dataKey="ep" hide />
                       <YAxis hide domain={[0, 100]} />
                       <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', fontSize: '10px' }} />
                       <Line type="stepAfter" dataKey="reward" stroke="#f43f5e" strokeWidth={4} dot={false} isAnimationActive={false} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>

              <div className="flex gap-4 relative z-20 text-left">
                 <button onClick={toggleTraining} className={`px-12 py-5 rounded-2xl font-black uppercase text-sm tracking-widest flex items-center gap-4 transition-all ${isRunning ? 'bg-rose-500 text-white shadow-[0_0_30px_rgba(244,63,94,0.4)]' : 'bg-white/5 text-rose-400 hover:bg-white/10'}`}>
                    {isRunning ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5" />}
                    {isRunning ? 'Pause Policy Evolution' : 'Initialize Agent Life'}
                 </button>
                 <button onClick={() => { setEpisodes(0); setRewardHistory([]); setCurrentReward(0); }} className="px-5 py-5 glass border-white/5 rounded-2xl text-white/30 hover:text-white transition-all"><RefreshCw className="w-5 h-5" /></button>
              </div>
           </div>

           {/* --- Discussion & Equations Section --- */}
           <div className="space-y-8 mt-12 text-left">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400">
                    <MessageSquare className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Interactive Discussion Session</h3>
                    <p className="text-sm text-white/40 italic text-left">Open-ended research questions and mathematical term interpretations.</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                 {/* Research Discussion 1 */}
                 <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 bg-rose-500/[0.02] shadow-xl text-left">
                    <div className="flex items-center gap-3 text-rose-400 font-black text-xs uppercase tracking-widest font-black">
                       <BookOpen className="w-4 h-4" />
                       Topic 1: Exploration-Exploitation Tradeoff
                    </div>
                    <div className="space-y-4 text-left">
                       <blockquote className="text-sm text-white/60 italic border-l-2 border-rose-500/30 pl-4 py-1 leading-relaxed text-left text-left">
                          "If an agent finds a $10 reward, should it stop looking? What if there is a $1,000 reward 2 blocks away?"
                       </blockquote>
                       <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                          <div className="flex justify-center text-xl font-mono text-rose-300 py-2">
                             π(a|s) = (1 - ε) · argmax<sub>a</sub> Q(s,a) + ε · P(a)
                          </div>
                          <div className="grid grid-cols-1 gap-3 text-[10px] uppercase font-black text-white/40 border-t border-white/5 pt-4 text-left font-black">
                             <div className="flex justify-between">
                                <span>(1 - ε)</span>
                                <span className="text-rose-400">Exploitation (Learned)</span>
                             </div>
                             <div className="flex justify-between">
                                <span>ε · P(a)</span>
                                <span className="text-rose-400">Exploration (Curiosity)</span>
                             </div>
                          </div>
                       </div>
                       <p className="text-[11px] text-white/30 leading-relaxed text-left font-black">
                          <strong className="text-white/60">Illustration:</strong> Imagine you are at a food court. Exploitation is going to your favorite pizza place. Exploration is trying the new sushi stand. If you NEVER explore (ε=0), you'll never find out that you actually like sushi more than pizza.
                       </p>
                    </div>
                 </div>

                 {/* Research Discussion 2 */}
                 <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6 bg-rose-500/[0.02] shadow-xl text-left">
                    <div className="flex items-center gap-3 text-rose-400 font-black text-xs uppercase tracking-widest font-black text-left">
                       <BrainCircuit className="w-4 h-4" />
                       Topic 2: The Bellman Prophecy
                    </div>
                    <div className="space-y-4 text-left">
                       <blockquote className="text-sm text-white/60 italic border-l-2 border-rose-500/30 pl-4 py-1 leading-relaxed text-left">
                          "How does the agent know that a 'Green Light' is good if the actual point only comes 10 seconds later?"
                       </blockquote>
                       <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
                          <div className="flex justify-center text-lg font-mono text-rose-100 py-2">
                             Q(s,a) ← R + γ · max Q(s', a')
                          </div>
                          <div className="grid grid-cols-1 gap-3 text-[10px] uppercase font-black text-white/40 border-t border-white/5 pt-4 text-left font-black">
                             <div className="flex justify-between">
                                <span>R</span>
                                <span className="text-rose-400">Immediate Reward</span>
                             </div>
                             <div className="flex justify-between">
                                <span>γ (Gamma)</span>
                                <span className="text-rose-400">Discount factor (Patience)</span>
                             </div>
                             <div className="flex justify-between text-left">
                                <span>max Q(s',a')</span>
                                <span className="text-rose-400">Best possible future points</span>
                             </div>
                          </div>
                       </div>
                       <p className="text-[11px] text-white/30 leading-relaxed text-left font-black">
                          <strong className="text-white/60">Illustration:</strong> This is the "Marshmallow Test" for AI. γ represents the patience of the agent. If γ=0.99, the agent treats a future reward as almost as good as an immediate one. It effectively "sees into the future" to plan its path.
                       </p>
                    </div>
                 </div>
              </div>

              {/* Interaction Call-to-Action */}
              <div className="p-8 rounded-[3rem] bg-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.2)] border border-white/10 text-center space-y-4">
                 <h4 className="text-lg font-black uppercase tracking-widest text-white">Interactive Session Prompt</h4>
                 <p className="text-sm text-rose-100/70 max-w-xl mx-auto leading-relaxed">
                   "Set ε to 0.5 and observe the reward graph. Is it stable? Now slowly drop ε to 0.05. Does the agent 'settle' into a high-scoring pattern? Discuss if an AI can ever truly stop learning and still be safe in a changing world."
                 </p>
              </div>
           </div>

           {/* --- Advanced Research Vault --- */}
           <div className="mt-16 space-y-8 text-left text-white font-black">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400 font-black">
                    <Database className="w-6 h-6" />
                 </div>
                 <div className="text-left font-black">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Reinforcement Learning Research Vault</h3>
                    <p className="text-sm text-white/40 italic">Benchmarking Policy Optimization and Sample Efficiency.</p>
                 </div>
              </div>

              <div className="glass rounded-[2.5rem] border-white/5 overflow-hidden shadow-2xl bg-rose-500/5 text-left font-black">
                 <div className="overflow-x-auto text-left font-black">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-rose-400 font-black">
                             <th className="p-6">Algorithm</th>
                             <th className="p-6">Convergence Depth</th>
                             <th className="p-6">Eval Parameters</th>
                             <th className="p-6">Technical Execution</th>
                             <th className="p-6">Experimental Setup</th>
                             <th className="p-6">Current Gaps</th>
                          </tr>
                       </thead>
                       <tbody className="text-[11px] text-white/60 font-medium leading-relaxed font-black">
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">DQN (Value-based)</td>
                             <td className="p-6 font-mono text-rose-400">Offline Plateau</td>
                             <td className="p-6 italic">Q-Loss, Reward Stability</td>
                             <td className="p-6">Off-policy; Experience Replay; Target Networks; Temporal Difference (TD) error.</td>
                             <td className="p-6 text-white/30 truncate max-w-[150px]">Atari-57 Suite; Frame Stacking; ε-Greedy (1.0 to 0.1 annealing).</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1">
                                <span>- Q-Value Overestimation</span>
                                <span>- Brittle Convergence</span>
                             </td>
                          </tr>
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide">PPO (Policy-based)</td>
                             <td className="p-6 font-mono text-emerald-400">Trust-Region (KL)</td>
                             <td className="p-6 italic">KL-Divergence, Entropy loss</td>
                             <td className="p-6">On-policy; Proximal clipping (1±ε); Surrogate objective function.</td>
                             <td className="p-6 text-white/30">MuJoCo Physics; 32x Parallel Env; GAE (Advantage).</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1">
                                <span>- Hyperparameter sensitivity</span>
                                <span>- Data Inefficiency</span>
                             </td>
                          </tr>
                          <tr className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                             <td className="p-6 font-bold text-white uppercase tracking-wide underline-offset-4">SAC (Actor-Critic)</td>
                             <td className="p-6 font-mono text-amber-400">Max-Entropy Curve</td>
                             <td className="p-6 italic">Entropy (H), Q1/Q2 Variance</td>
                             <td className="p-6">Off-policy; Stochastic Policy; Learns to maximize Reward + Entropy.</td>
                             <td className="p-6 text-white/30 truncate max-w-[150px]">Robotic Locomotion; Continuous control (DOF); Buffer.</td>
                             <td className="p-6 font-bold text-red-400/60 uppercase text-[9px] flex flex-col gap-1">
                                <span>- Biased Q-targets</span>
                                <span>- High Computational Cost</span>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>

               {/* --- Architectural Block Diagram --- */}
               <div className="space-y-8 mt-12 text-left">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
                        <Layers className="w-5 h-5" />
                     </div>
                     <h4 className="text-xl font-black text-white uppercase tracking-tight">RL Policy-Agent Loop Architecture</h4>
                  </div>

                  <div className="relative overflow-hidden glass rounded-[3rem] border-white/5 p-10 bg-rose-500/[0.03] text-left">
                     <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 text-left">
                        {/* Block 1: The Agent */}
                        <div className="w-full md:w-56 p-6 rounded-3xl bg-rose-500/10 border border-white/10 text-center space-y-4 shadow-2xl relative overflow-hidden text-left font-black">
                           <div className="absolute top-0 right-0 p-2 opacity-10 font-black">
                              <BrainCircuit className="w-12 h-12" />
                           </div>
                           <div className="text-[10px] font-black text-rose-400 uppercase text-left">The Brain (Policy π)</div>
                           <div className="text-sm font-black text-white text-left font-black">Actor-Critic Network</div>
                           <div className="space-y-2 text-left font-black">
                              <div className="p-2 rounded-lg bg-black/40 text-[9px] text-white/60 text-left">Output: Action (a)</div>
                              <div className="p-2 rounded-lg bg-black/40 text-[9px] text-white/60 text-left">Goal: Maximize Return (G<sub>t</sub>)</div>
                           </div>
                        </div>

                        <div className="hidden md:block text-rose-500/30 font-black text-left">
                           <RefreshCw className="w-8 h-8 animate-spin-slow" />
                        </div>

                        {/* Block 2: The Environment */}
                        <div className="w-full md:w-56 p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2 text-left font-black">
                           <div className="text-[10px] font-black text-rose-400 uppercase text-left font-black">The World (Env)</div>
                           <div className="text-sm font-bold text-white text-left font-black">State Transition f(s,a)</div>
                           <div className="text-[9px] text-white/40 leading-tight text-left font-black">Calculates the physics, reward, and the resulting new state (s') for the agent.</div>
                        </div>
                     </div>

                     {/* Equations & Data Flow */}
                     <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-10 text-left">
                        <div className="space-y-6 text-left font-black">
                           <div className="text-xs font-black text-rose-400 uppercase tracking-widest text-left font-black">The Policy Gradient Objective</div>
                           <div className="p-6 bg-black/40 rounded-3xl border border-white/5 text-left font-black">
                              <div className="text-sm md:text-lg font-mono text-center text-white leading-relaxed text-left font-black">
                                 J(θ) = E<sub>τ~π</sub> [∑<sub>t</sub> γ<sup>t</sup> R(s<sub>t</sub>, a<sub>t</sub>)]
                              </div>
                           </div>
                           <div className="space-y-3 text-left font-black">
                              <div className="flex items-start gap-3 text-left font-black">
                                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e] font-black" />
                                 <p className="text-[10px] text-white/40 leading-relaxed font-black uppercase italic text-left font-black">
                                    <strong className="text-white text-left font-black">Interpretation:</strong> The "Value" (J) is the sum of rewards across time, discounted by patience (γ).
                                 </p>
                              </div>
                              <div className="flex items-start gap-3 text-left font-black">
                                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e] font-black" />
                                 <p className="text-[10px] text-white/40 leading-relaxed font-black uppercase italic text-left font-black">
                                    <strong className="text-white text-left font-black italic underline-offset-4 tracking-tighter">Term (τ~π):</strong> "Trajectory" (τ) sampled from following the current "Policy" (π).
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6 text-left font-black">
                           <div className="text-xs font-black text-rose-400 uppercase tracking-widest text-left font-black">System Responsibilities</div>
                           <div className="grid grid-cols-1 gap-4 font-black">
                              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 font-black text-left">
                                 <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex-shrink-0 flex items-center justify-center text-rose-400 font-black text-[10px]">REPLAY</div>
                                 <div className="text-left font-black text-left">
                                    <div className="text-[10px] font-black text-white uppercase text-left font-black">Experience Buffer</div>
                                    <div className="text-[9px] text-white/30 leading-tight text-left font-black">Records interactions (s, a, r, s') to "replay" them later, preventing the AI from forgetting past lessons.</div>
                                 </div>
                              </div>
                              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 font-black text-left">
                                 <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex-shrink-0 flex items-center justify-center text-rose-400 font-black text-[10px]">CRITIC</div>
                                 <div className="text-left font-black text-left">
                                    <div className="text-[10px] font-black text-white uppercase text-left font-black">Value Head</div>
                                    <div className="text-[9px] text-white/30 leading-tight text-left font-black">Predicts how much future reward is possible from the current state, guiding the "Actor" towards better decisions.</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-12 pb-12 font-black">
                  <div className="p-6 glass rounded-3xl border-white/5 bg-rose-500/5 space-y-2 text-left font-black">
                     <div className="text-[9px] font-black text-rose-400 uppercase tracking-widest text-left">Parameter Interpretation</div>
                     <div className="text-xs font-bold text-white text-left font-black">Cumulative Reward</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black text-left">Sum of all points an agent gets. In research, we look for the "Area under the Curve" to see how fast the agent improved.</p>
                  </div>
                  <div className="p-6 glass rounded-3xl border-white/5 bg-rose-500/5 space-y-2 text-left font-black text-left">
                     <div className="text-[9px] font-black text-rose-400 uppercase tracking-widest text-left text-left font-black">Experimental Setup</div>
                     <div className="text-xs font-bold text-white text-left font-black text-left underline-offset-4">Experience Replay</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black text-left text-left font-black">A bank of memories (States, Actions, Rewards) that the AI keeps to "relive" successes even when offline.</p>
                  </div>
                  <div className="p-6 glass rounded-3xl border-white/5 bg-rose-500/5 space-y-2 text-left font-black">
                     <div className="text-[9px] font-black text-rose-400 uppercase tracking-widest text-left">Research Roadmap</div>
                     <div className="text-xs font-bold text-white text-left font-black">Transfer Learning</div>
                     <p className="text-[10px] text-white/30 leading-relaxed italic uppercase font-black text-left">Solving for how an agent trained on "driving a car" can use 90% of that logic to "fly a drone" without starting from ε=1.0.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default RLPlayground;
