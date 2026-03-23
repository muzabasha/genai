import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  Cpu, 
  Layers, 
  Zap, 
  Settings, 
  Monitor, 
  Wand2, 
  ChevronRight, 
  ChevronDown,
  Globe,
  Sparkles,
  Trophy,
  Code,
  FlaskConical,
  Activity
} from 'lucide-react';

interface Node {
  id: string;
  label: string;
  sublabel?: string;
  icon: any;
  color: string;
  children?: Node[];
}

const mindMapData: Node = {
  id: 'root',
  label: 'AI Model Benchmarks & Ecosystem',
  sublabel: 'March 2026 Snapshot',
  icon: Network,
  color: 'indigo',
  children: [
    {
      id: 'frontier',
      label: 'Frontier LLM Models',
      icon: Layers,
      color: 'blue',
      children: [
        { id: 'f1', label: 'GPT-5 (Omni-Flow)', icon: Zap, color: 'blue' },
        { id: 'f2', label: 'Claude 4 (Opus+)', icon: Wand2, color: 'blue' },
        { id: 'f3', label: 'Gemini 2.0 Ultra', icon: Globe, color: 'blue' }
      ]
    },
    {
      id: 'opensource',
      label: 'Open Source & Open Weight',
      icon: Cpu,
      color: 'emerald',
      children: [
        { id: 'os1', label: 'DeepSeek-V3.2', sublabel: 'Math & Coding', icon: Code, color: 'emerald' },
        { id: 'os2', label: 'Meta Llama 4', sublabel: 'Scout & Maverick', icon: Cpu, color: 'emerald' },
        { id: 'os3', label: 'Mistral Large 3', sublabel: 'Enterprise MoE', icon: Layers, color: 'emerald' },
        { id: 'os4', label: 'Zhipu AI GLM-5', icon: Globe, color: 'emerald' },
        { id: 'os5', label: 'Alibaba Qwen 3.5', icon: Zap, color: 'emerald' },
        { id: 'os6', label: 'Nvidia Nemotron 3', icon: Activity, color: 'emerald' }
      ]
    },
    {
      id: 'benchmarks',
      label: 'Key Benchmarks',
      icon: Trophy,
      color: 'amber',
      children: [
        { id: 'b1', label: "Humanity's Last Exam", sublabel: 'Expert Reasoning', icon: Trophy, color: 'amber' },
        { id: 'b2', label: 'SWE-bench Verified', sublabel: 'Software Engineering', icon: Code, color: 'amber' },
        { id: 'b3', label: 'ARC-AGI-2', sublabel: 'Visual Pattern Recognition', icon: Monitor, color: 'amber' },
        { id: 'b4', label: 'FrontierMath', sublabel: 'Research-Level Math', icon: FlaskConical, color: 'amber' },
        { id: 'b5', label: 'GPQA Diamond', sublabel: 'PhD Science', icon: FlaskConical, color: 'amber' },
        { id: 'b6', label: 'Terminal-Bench 2.0', sublabel: 'Agentic Execution', icon: Monitor, color: 'amber' }
      ]
    },
    {
      id: 'multimodal',
      label: 'Multimodal & Specialized AI',
      icon: Wand2,
      color: 'purple',
      children: [
        {
          id: 'video',
          label: 'Video Generation',
          icon: Monitor,
          color: 'purple',
          children: [
            { id: 'v1', label: 'OpenAI Sora 2', icon: Monitor, color: 'purple' },
            { id: 'v2', label: 'Google Veo 3.1', icon: Monitor, color: 'purple' },
            { id: 'v3', label: 'Runway Gen-4.5', icon: Monitor, color: 'purple' }
          ]
        },
        {
          id: 'image',
          label: 'Image Generation',
          icon: Wand2,
          color: 'purple',
          children: [
            { id: 'i1', label: 'FLUX.1.1 Pro', sublabel: 'Photorealism', icon: Wand2, color: 'purple' },
            { id: 'i2', label: 'Nano Banana 2', sublabel: 'Text Rendering', icon: Wand2, color: 'purple' },
            { id: 'i3', label: 'Ideogram 2.0', sublabel: 'Typography', icon: Wand2, color: 'purple' }
          ]
        },
        {
          id: 'audio',
          label: 'Audio & Music',
          icon: Activity,
          color: 'purple',
          children: [
            { id: 'a1', label: 'Suno (Song Creation)', icon: Activity, color: 'purple' },
            { id: 'a2', label: 'Udio (High Fidelity)', icon: Activity, color: 'purple' },
            { id: 'a3', label: 'ElevenLabs Music', icon: Activity, color: 'purple' },
            { id: 'a4', label: 'Moshi', sublabel: 'Native Speech-to-Speech', icon: Globe, color: 'purple' }
          ]
        }
      ]
    },
    {
      id: 'trends',
      label: 'Industry Trends',
      icon: Settings,
      color: 'rose',
      children: [
        { id: 't1', label: 'Agentic Autonomy', sublabel: 'Goal-oriented agents', icon: Zap, color: 'rose' },
        { id: 't2', label: 'Vertical AI', sublabel: 'Industry-specific logic', icon: Settings, color: 'rose' },
        { id: 't3', label: 'Omnimodal Intelligence', sublabel: 'Native fusion', icon: Network, color: 'rose' },
        { id: 't4', label: 'Context Moats', sublabel: '10M+ context windows', icon: Layers, color: 'rose' },
        { id: 't5', label: 'GEO', sublabel: 'Generative Engine Optimization', icon: Sparkles, color: 'rose' },
        { id: 't6', label: 'Sovereign AI', sublabel: 'National/Regional stacks', icon: Globe, color: 'rose' }
      ]
    },
    {
      id: 'tools',
      label: 'Development Tools',
      icon: Code,
      color: 'primary',
      children: [
        { id: 'dt1', label: 'Windsurf', sublabel: 'Agentic Workflow', icon: Wand2, color: 'primary' },
        { id: 'dt2', label: 'Antigravity', sublabel: 'Free Disruptor', icon: Sparkles, color: 'primary' },
        { id: 'dt3', label: 'Cursor IDE', sublabel: 'Premium Powerhouse', icon: Code, color: 'primary' },
        { id: 'dt4', label: 'Claude Code', sublabel: 'Quality Tool', icon: Trophy, color: 'primary' },
        { id: 'dt5', label: 'Codex', sublabel: 'Enterprise Agent', icon: Cpu, color: 'primary' }
      ]
    }
  ]
};

const NodeComponent: React.FC<{ node: Node, isRoot?: boolean, depth: number }> = ({ node, isRoot, depth }) => {
  const [isExpanded, setIsExpanded] = useState(isRoot || depth < 1);
  const Icon = node.icon;

  return (
    <div className={`flex flex-col ${isRoot ? 'items-center' : 'items-start'} gap-4`}>
       <motion.div 
         layout
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         whileHover={{ scale: 1.05, y: -2 }}
         onClick={() => node.children && setIsExpanded(!isExpanded)}
         className={`
           relative group cursor-pointer
           px-6 py-4 rounded-[1.5rem] glass border-white/10
           ${isRoot ? 'bg-indigo-500/10 border-indigo-500/20 py-8 px-12' : ''}
           ${!isRoot && node.color === 'blue' ? 'bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/20' : ''}
           ${!isRoot && node.color === 'emerald' ? 'bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20' : ''}
           ${!isRoot && node.color === 'amber' ? 'bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/20' : ''}
           ${!isRoot && node.color === 'purple' ? 'bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/20' : ''}
           ${!isRoot && node.color === 'rose' ? 'bg-rose-500/5 hover:bg-rose-500/10 border-rose-500/20' : ''}
           ${!isRoot && node.color === 'primary' ? 'bg-primary-500/5 hover:bg-primary-500/10 border-primary-500/20' : ''}
           shadow-xl transition-all min-w-[200px]
         `}
       >
         {isRoot && (
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-500/20 blur-[40px] rounded-full animate-pulse" />
         )}
         
         <div className="flex items-center gap-4 relative">
            <div className={`
              p-3 rounded-xl 
              ${isRoot ? 'bg-indigo-500/20 text-indigo-400' : ''}
              ${!isRoot && node.color === 'blue' ? 'bg-blue-500/20 text-blue-400' : ''}
              ${!isRoot && node.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' : ''}
              ${!isRoot && node.color === 'amber' ? 'bg-amber-500/20 text-amber-400' : ''}
              ${!isRoot && node.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
              ${!isRoot && node.color === 'rose' ? 'bg-rose-500/20 text-rose-400' : ''}
              ${!isRoot && node.color === 'primary' ? 'bg-primary-500/20 text-primary-400' : ''}
              transition-transform group-hover:scale-110
            `}>
               <Icon className="w-6 h-6" />
            </div>
            <div>
               <h4 className={`font-display font-bold text-white ${isRoot ? 'text-2xl' : 'text-sm'}`}>
                 {node.label}
               </h4>
               {node.sublabel && (
                 <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-0.5 whitespace-nowrap">
                   {node.sublabel}
                 </p>
               )}
            </div>
            {node.children && (
              <div className="ml-2 text-white/20 group-hover:text-white/40 transition-colors">
                 {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
            )}
         </div>
       </motion.div>

       <AnimatePresence>
         {isExpanded && node.children && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className={`flex ${depth === 0 ? 'flex-row' : 'flex-col items-start ml-8'} gap-8 relative`}
            >
               {/* Vertical/Horizontal lines */}
               <div className={`
                 absolute bg-white/5 pointer-events-none transition-all
                 ${depth === 0 ? 'top-[-32px] left-1/2 w-px h-8 -translate-x-1/2' : 'left-[-32px] top-4 h-px w-8'}
               `} />
               
               {node.children.map((child, i) => (
                 <div key={child.id} className="relative">
                    {/* Connecting lines for multiple children */}
                    {depth > 0 && i > 0 && (
                      <div className="absolute left-[-32px] top-[-32px] w-px h-[33px] bg-white/5" />
                    )}
                    {depth === 0 && i > 0 && (
                      <div className="absolute top-[-32px] left-[-32px] h-px w-[33px] bg-white/5" />
                    )}
                    <NodeComponent node={child} depth={depth + 1} />
                 </div>
               ))}
            </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
};

export const EcosystemMindMap: React.FC = () => {
  return (
    <div className="w-full py-20 px-4">
       <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
             <h2 className="text-4xl font-display font-black text-white tracking-tight">
               AI Model Benchmarks & <span className="text-indigo-400">Ecosystem</span>
             </h2>
             <p className="text-white/40 text-lg max-w-2xl mx-auto">
               Interactive visual mapping of the current frontier in Generative AI, benchmarks, and development tooling.
             </p>
          </div>

          <div className="p-12 glass rounded-[4rem] border-white/5 bg-white/[0.01] shadow-inner overflow-x-auto min-h-[600px] flex justify-center items-start">
             <div className="inline-block p-10">
                <NodeComponent node={mindMapData} isRoot depth={0} />
             </div>
          </div>
       </div>
    </div>
  );
};

export default EcosystemMindMap;
