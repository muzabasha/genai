import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Settings, 
  BrainCircuit, 
  Play, 
  Square,
  Zap,
  CheckCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip
} from 'recharts';
import { toast } from 'react-hot-toast';

const RLPlayground: React.FC = () => {
  const [learningRate, setLearningRate] = useState(0.01);
  const [isRunning, setIsRunning] = useState(false);
  const [rewardHistory, setRewardHistory] = useState<{i: number, r: number}[]>([]);
  const [iteration, setIteration] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setIteration(prev => prev + 1);
        const nextReward = Math.min(100, (rewardHistory[rewardHistory.length-1]?.r || 0) + (Math.random() * learningRate * 50));
        setRewardHistory(prev => [...prev.slice(-49), { i: iteration, r: nextReward }]);
        
        if (nextReward >= 99) {
          setIsRunning(false);
          toast.success("AI Model Converged! Agent has mastered the task.");
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning, iteration, learningRate, rewardHistory]);

  const startTraining = () => {
    setIteration(0);
    setRewardHistory([{i: 0, r: 10}]);
    setIsRunning(true);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-widest text-xs">
            <Trophy className="w-4 h-4" />
            Reinforcement Lab
          </div>
          <h2 className="text-4xl font-display font-black">Train Your Own AI</h2>
          <p className="text-white/50 max-w-xl text-sm leading-relaxed">
             Trial and error at scale. How AI agents learn to maximize rewards and discover winning strategies.
          </p>
        </div>
        <button 
           onClick={() => setShowExplanation(!showExplanation)}
           className="px-4 py-2 glass rounded-xl border-white/5 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <HelpCircle className="w-4 h-4" />
          {showExplanation ? 'Hide Strategy Math' : 'Show Math View'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-[2rem] p-8 border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-wider text-white">
              <Settings className="w-4 h-4" />
              Agent Hyperparameters
            </div>
            
            <div className="space-y-6">
               <div className="space-y-2">
                 <div className="flex justify-between text-[11px] font-bold uppercase text-white/40">
                   <span>Learning Rate (alpha)</span>
                   <span className="text-rose-400">{learningRate.toFixed(3)}</span>
                 </div>
                 <input 
                   type="range" min="0.001" max="0.1" step="0.001" 
                   value={learningRate} onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                   className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-rose-500"
                 />
                 <p className="text-[10px] text-white/30 italic text-left">How aggressively the agent updates its knowledge.</p>
               </div>
            </div>

            <button 
               onClick={isRunning ? () => setIsRunning(false) : startTraining}
               className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isRunning ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-rose-500 hover:shadow-lg hover:shadow-rose-500/20 active:scale-95 text-white'}`}
            >
              {isRunning ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5 text-white" />}
              {isRunning ? 'Stop Training' : 'Launch Trainer'}
            </button>
          </div>

          <div className="p-6 glass rounded-[1.5rem] border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase">
                <CheckCircle className="w-4 h-4" />
                Scenario: The Maze
             </div>
             <p className="text-xs text-white/40 leading-relaxed text-left">
                The agent is in a maze. Every time it finds cheese, it gets a 'Reward'. Every time it hits a wall, it gets a 'Penalty'. Eventually, it learns the perfect path.
             </p>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-[2.5rem] p-4 lg:p-8 border-white/5 min-h-[400px] flex flex-col gap-6 relative overflow-hidden">
             <div className="flex items-center justify-between">
                <div>
                   <h3 className="text-lg font-bold text-white">Convergence History</h3>
                   <p className="text-xs text-secondary-300">Reward curve over training cycles.</p>
                </div>
                {isRunning && <motion.div animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity }} className="flex items-center gap-2 text-rose-400 text-[10px] font-bold uppercase border border-rose-500/20 px-2 py-1 rounded">
                   Live Learning
                </motion.div>}
             </div>

             <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height={300}>
                   <LineChart data={rewardHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="i" hide />
                      <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.2)" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', fontSize: '10px' }} />
                      <Line type="monotone" dataKey="r" stroke="#f43f5e" strokeWidth={3} dot={false} isAnimationActive={false} />
                   </LineChart>
                </ResponsiveContainer>
             </div>
          </div>

          <AnimatePresence>
            {showExplanation && (
               <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                  className="p-10 glass rounded-[2.5rem] border-rose-500/20 space-y-8 relative overflow-hidden"
               >
                  <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-rose-500 to-orange-500" />
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
                      <BrainCircuit className="w-5 h-5" />
                    </div>
                    <div>
                       <h3 className="font-bold">The Bellman Equation</h3>
                       <p className="text-xs text-white/40">Calculating the long-term value of a decision.</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/40 p-6 rounded-2xl flex items-center justify-center gap-4 font-mono text-lg md:text-2xl border border-white/5 flex-wrap text-white">
                     <span className="text-rose-400">Q(s,a)</span>
                     <span className="text-white/30">=</span>
                     <span className="text-white">R + γ max[Q(s',a')]</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div className="space-y-4">
                       <h4 className="text-sm font-bold text-rose-400 uppercase">Equation Interpretation</h4>
                       <ul className="space-y-3 text-xs text-white/60">
                          <li className="flex gap-2">
                             <span className="text-white font-bold">Q(s,a):</span> 
                             <span>The "Score" of taking a specific action (a) in a specific situation (s).</span>
                          </li>
                          <li className="flex gap-2">
                             <span className="text-white font-bold">R:</span> 
                             <span>The "Reward" received immediately after the action.</span>
                          </li>
                          <li className="flex gap-2">
                             <span className="text-white font-bold">γ max[Q]:</span> 
                             <span>Discounted future rewards. The agent cares about winning the whole game, not just the next step.</span>
                          </li>
                       </ul>
                    </div>
                    <div className="space-y-4 border-l border-white/5 pl-8">
                       <h4 className="text-sm font-bold text-orange-500 uppercase">Illustration: Playing Video Games</h4>
                       <p className="text-xs text-white/50 leading-relaxed text-left">
                          Imagine an AI playing Mario. It learns that jumping over a pit gives no immediate points (R=0). But it pays 'Attention' to the fact that failing to jump ends the game, while jumping leads to the level finish (γ max[Q]). The value Q(pit, jump) becomes high because it leads to future success.
                       </p>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-rose-500/5 rounded-2xl border border-rose-500/10 text-left">
                     <h4 className="text-xs font-black text-rose-400 uppercase tracking-[0.2em] mb-3 text-left">Open-Ended Research Question</h4>
                     <p className="text-sm italic text-white/80 leading-relaxed text-left">
                       "If we give an AI agent the 'Reward' of human approval, will it eventually learn to manipulate or lie to us just to keep its 'Reward' score high? How do we define 'Good' in math?"
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

export default RLPlayground;
