import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, 
  Target, 
  Layers, 
  Waves, 
  Zap, 
  RefreshCw,
  Volume2,
  Mic2,
  Play,
  Pause,
  Filter
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AudioLab: React.FC = () => {
  const [text, setText] = useState("Hello, I am a generative voice model.");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveform, setWaveform] = useState<number[]>([]);
  const [showEquation, setShowEquation] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  const generateAudio = async () => {
    setIsGenerating(true);
    setWaveform([]);
    setGenerationStep(1); // Phoneme analysis
    await new Promise(r => setTimeout(r, 1200));
    
    setGenerationStep(2); // Spectrogram prediction
    await new Promise(r => setTimeout(r, 1200));

    setGenerationStep(3); // Waveform synthesis (Vocoding)
    const points: number[] = [];
    for (let i = 0; i < 60; i++) {
      points.push(Math.sin(i * 0.4) * 50 + (Math.random() - 0.5) * 20 + 50);
      setWaveform([...points]);
      await new Promise(r => setTimeout(r, 30));
    }

    setIsGenerating(false);
    toast.success("Voice Synthesis Complete!");
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast.success("Playing synthetic sample...", { icon: '🔊' });
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-orange-400 font-bold uppercase tracking-widest text-xs">
            <Volume2 className="w-4 h-4" />
            Acoustic Lab
          </div>
          <h2 className="text-4xl font-display font-black">Waveform Synthesis</h2>
          <p className="text-white/50 max-w-xl">
             Teaching machines to speak. From text to phonemes to raw audio waves, witness the synthesis process.
          </p>
        </div>
        <button 
           onClick={() => setShowEquation(!showEquation)}
           className="px-4 py-2 glass rounded-xl border-white/5 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <Target className="w-4 h-4" />
          {showEquation ? 'Hide Audio Architecture' : 'Show Concepts'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-3xl p-6 border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
              <Mic2 className="w-4 h-4" />
              Speech Text
            </div>
            
            <textarea 
               value={text}
               onChange={(e) => setText(e.target.value)}
               placeholder="Write something for the AI to speak..."
               className="w-full h-24 bg-white/5 rounded-2xl p-4 border border-white/10 focus:border-orange-500/50 outline-none resize-none transition-all placeholder:text-white/20"
            />

            <div className="flex gap-4">
               <button 
                  onClick={generateAudio}
                  disabled={isGenerating}
                  className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isGenerating ? 'bg-white/5 text-white/20' : 'bg-orange-500 hover:shadow-lg hover:shadow-orange-500/20 active:scale-95'}`}
               >
                 {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                 {isGenerating ? 'Synthesizing...' : 'Generate Voice'}
               </button>
               {waveform.length > 0 && !isGenerating && (
                 <button 
                   onClick={togglePlay}
                   className="w-16 h-16 rounded-2xl glass border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
                 >
                    {isPlaying ? <Pause className="text-orange-400" /> : <Play className="text-orange-400" />}
                 </button>
               )}
            </div>
          </div>

          <div className="glass rounded-3xl p-6 border-white/5 space-y-4">
             <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
                <Waves className="w-4 h-4" />
                Concept: Phonemes
             </div>
             <p className="text-xs text-white/50 leading-relaxed">
                Before generating audio, the AI breaks text into the smallest sounds (phonemes). It then predicts the vibration patterns needed to create those sounds.
             </p>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-3xl p-8 border-white/5 min-h-[400px] relative overflow-hidden flex flex-col items-center justify-center gap-8">
             <div className="absolute inset-0 bg-grid-white/5" />
             
             {/* Waveform Visualization */}
             <div className="relative w-full h-48 flex items-center justify-center gap-1">
                {waveform.length > 0 ? (
                  waveform.map((h, i) => (
                    <motion.div 
                      key={i}
                      animate={{ 
                        height: isPlaying ? [h, h*1.5, h*0.8, h] : h,
                        opacity: isGenerating ? [0.2, 1, 0.2] : 1 
                      }}
                      transition={{ 
                        repeat: isPlaying ? Infinity : 0, 
                        duration: 0.5, 
                        delay: i * 0.01 
                      }}
                      className="w-1 bg-gradient-to-t from-orange-400 to-orange-600 rounded-full"
                      style={{ height: `${h}%` }}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center gap-3 text-white/10">
                     <Waves className="w-12 h-12" />
                     <span className="text-xs font-bold uppercase tracking-widest">Silence</span>
                  </div>
                )}
             </div>

             {/* Synthesis Pipeline */}
             <div className="w-full max-w-md grid grid-cols-3 gap-4 relative z-10">
                {[
                  { label: 'Phonemes', icon: <Filter className="w-4 h-4" />, order: 1 },
                  { label: 'Spectrogram', icon: <Layers className="w-4 h-4" />, order: 2 },
                  { label: 'Waveform', icon: <Waves className="w-4 h-4" />, order: 3 }
                ].map((s) => (
                  <div 
                    key={s.label} 
                    className={`p-4 rounded-2xl glass border transition-all duration-700 flex flex-col items-center gap-2 ${generationStep >= s.order ? 'border-orange-500/40 bg-orange-500/10' : 'border-white/5'}`}
                  >
                     <div className={`${generationStep >= s.order ? 'text-orange-400' : 'text-white/20'}`}>{s.icon}</div>
                     <span className={`text-[10px] font-bold uppercase tracking-tight text-center ${generationStep >= s.order ? 'text-white' : 'text-white/20'}`}>{s.label}</span>
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
                 className="p-8 glass rounded-3xl border-orange-500/20 space-y-6"
              >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                      <Music className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                       <h3 className="font-bold">Acoustic Auto-Regression</h3>
                       <p className="text-xs text-white/40">Predicting raw samples one by one.</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/40 p-6 rounded-2xl flex items-center justify-center gap-4 font-mono text-lg border border-white/5">
                     <span className="text-orange-400">P(x)</span>
                     <span className="text-white/30">=</span>
                     <span className="text-white">∏ P(x<sub>t</sub> | x<sub>&lt;t</sub>, h)</span>
                  </div>
                  
                  <p className="text-[10px] text-white/40 text-center leading-relaxed">
                     Modern models like WaveNet predict the probability of each raw audio sample based on all previous samples and high-level linguistic features (h). This creates the natural "breathing" and "pitch" of human speech.
                  </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AudioLab;
