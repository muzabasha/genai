import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Cpu, 
  Target, 
  Layers, 
  RefreshCw,
  Zap,
  Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Scatter, 
  ScatterChart as ReScatter,
  ZAxis
} from 'recharts';
import { toast } from 'react-hot-toast';

const NumericLab: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [data, setData] = useState<{x: number, y: number}[]>([]);
  const [latentSpace, setLatentSpace] = useState<{x: number, y: number, z: number}[]>([]);
  const [showEquation, setShowEquation] = useState(false);
  const [samplingRate, setSamplingRate] = useState(0.5);

  const generateData = async () => {
    setIsGenerating(true);
    setData([]);
    
    // Step 1: Encoder (Representation)
    await new Promise(r => setTimeout(r, 1000));
    
    // Step 2: Sampling from z ~ N(mu, sigma)
    const newLatent = Array.from({ length: 50 }, () => ({
      x: Math.random() * 10 - 5,
      y: Math.random() * 10 - 5,
      z: Math.random() * 10 
    }));
    setLatentSpace(newLatent);
    await new Promise(r => setTimeout(r, 1000));

    // Step 3: Decoder (Generation)
    const newData = Array.from({ length: 20 }, (_, i) => ({
      x: i,
      y: 50 + Math.sin(i * 0.5) * 20 + Math.random() * 10
    }));
    
    let currentData: {x: number, y: number}[] = [];
    for (const point of newData) {
      currentData.push(point);
      setData([...currentData]);
      await new Promise(r => setTimeout(r, 50));
    }
    
    setIsGenerating(false);
    toast.success("Synthetic Data Generated!");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-xs">
            <Activity className="w-4 h-4" />
            Numeric Lab
          </div>
          <h2 className="text-4xl font-display font-black text-white">Synthetic Data Factory</h2>
          <p className="text-white/50 max-w-xl text-sm">
            How do AI models create new numbers? Learn about VAEs and how they map patterns to a "Hidden Space".
          </p>
        </div>
        <button 
           onClick={() => setShowEquation(!showEquation)}
           className="px-4 py-2 glass rounded-xl border-white/5 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2 text-white"
        >
          <Target className="w-4 h-4" />
          {showEquation ? 'Hide VAE Equation' : 'Show Math View'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-3xl p-6 border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              Model Parameters
            </div>
            
            <div className="space-y-4">
               <div className="space-y-2">
                 <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                   <span>Sampling Temperature</span>
                   <span className="text-emerald-400">{(samplingRate * 2).toFixed(1)}</span>
                 </div>
                 <input 
                   type="range" 
                   min="0.1" 
                   max="1" 
                   step="0.1" 
                   value={samplingRate}
                   onChange={(e) => setSamplingRate(parseFloat(e.target.value))}
                   className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                 />
                 <p className="text-[10px] text-white/30 italic">High temperature = more creative/random data.</p>
               </div>
            </div>

            <button 
               onClick={generateData}
               disabled={isGenerating}
               className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isGenerating ? 'bg-white/5 text-white/20' : 'bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 text-white'}`}
            >
              {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              {isGenerating ? 'Sampling...' : 'Generate New Points'}
            </button>
          </div>

          <div className="glass rounded-3xl p-6 border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
                <BarChart3 className="w-4 h-4" />
                Concept: Latent Space
             </div>
             <p className="text-xs text-white/50 leading-relaxed">
                A "Hidden Pattern Space" where the AI organizes similarities. Points close together share patterns. Sampling from this space creates brand new data that looks like the original.
             </p>
          </div>
        </div>

        {/* Visualizations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Latent Space Scatter */}
             <div className="glass rounded-3xl p-6 border-white/5 min-h-[300px] flex flex-col gap-4">
                <div className="text-xs font-bold text-white/40 uppercase">Hidden Space Distribution (z)</div>
                <div className="flex-1">
                   <ResponsiveContainer width="100%" height="100%">
                      <ReScatter margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
                         <XAxis type="number" dataKey="x" hide />
                         <YAxis type="number" dataKey="y" hide />
                         <ZAxis type="number" dataKey="z" range={[50, 400]} />
                         <Scatter name="Latent" data={latentSpace} fill="#10b981" fillOpacity={0.6} />
                      </ReScatter>
                   </ResponsiveContainer>
                </div>
             </div>

             {/* Output Chart */}
             <div className="glass rounded-3xl p-6 border-white/5 min-h-[300px] flex flex-col gap-4">
                <div className="text-xs font-bold text-white/40 uppercase">Generated Output Signal</div>
                <div className="flex-1">
                   <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, bottom: 0, left: -20 }}>
                      <defs>
                        <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="x" hide />
                      <YAxis domain={[0, 100]} hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', fontSize: '10px' }} 
                        itemStyle={{ color: '#10b981' }}
                      />
                      <Area type="monotone" dataKey="y" stroke="#10b981" fillOpacity={1} fill="url(#colorY)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>
          </div>

          <AnimatePresence>
            {showEquation && (
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 20 }}
                 className="p-8 glass rounded-[2rem] border-emerald-500/20 space-y-6 relative overflow-hidden"
              >
                  <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-emerald-500 to-teal-500" />
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                       <h3 className="font-bold text-white">Sampling the Reparameterization Trick</h3>
                       <p className="text-xs text-white/40">How model remains differentiable while sampling.</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/40 p-6 rounded-2xl flex items-center justify-center gap-8 font-mono text-xl md:text-3xl border border-white/5 text-white">
                     <span className="text-emerald-400">z</span>
                     <span className="text-white/30">=</span>
                     <span className="text-white">μ</span>
                     <span className="text-white/30">+</span>
                     <span className="text-white">σ</span>
                     <span className="text-white/30">⊙</span>
                     <span className="text-emerald-500 animate-pulse">ε</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-tight">Equation Interpretation</h4>
                      <ul className="space-y-3 text-xs text-white/60">
                        <li className="flex gap-2">
                          <span className="text-white font-bold">μ (Mu):</span> 
                          <span>The center point (mean) of what the AI knows about a category (like "Human Heartbeat").</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-white font-bold">σ (Sigma):</span> 
                          <span>The standard deviation, describing how much "variety" is allowed in the data.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-white font-bold">ε (Epsilon):</span> 
                          <span>The random "spark" injected to ensure every generation is slightly different.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4 border-l border-white/5 pl-8">
                       <h4 className="text-sm font-bold text-emerald-500 uppercase tracking-tight">Illustration: Health Signal Gen</h4>
                       <p className="text-xs text-white/50 leading-relaxed text-left">
                         If you want to generate health records, the AI knows the average heart rate (μ). To make it look "real" and not always 70BPM, it adds a tiny bit of random noise (ε) scaled by variety (σ). This creates a new, synthetic heart rate that's never existed before.
                       </p>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                    <h4 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-3">Open-Ended Research Question</h4>
                    <p className="text-sm italic text-white/80 leading-relaxed text-left">
                      "If we can generate infinite synthetic data that looks real, how can we ensure the AI isn't accidentally memorizing and leaking the private patterns of the original people in the dataset?"
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

export default NumericLab;
