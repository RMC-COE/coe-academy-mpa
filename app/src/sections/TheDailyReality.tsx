import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { StepReveal } from '@/components/common/StepReveal';
import { Clock, AlertTriangle, TrendingDown, Users, ArrowRight, ExternalLink, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const TheDailyReality = ({ resetSignal, isPaused }: SectionProps) => {
  const { stepMode, stepSignal, setIsLastStep } = usePresentation();
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);
  
  const stepController = useStepController({
    totalSteps: 3,
    resetSignal,
    stepSignal,
    autoAdvance: !stepMode,
    stepDuration: 4000,
    onLastStepChange: setIsLastStep
  });


  const painMetrics = [
    { 
      label: "Manual Billing Items (July 2025)", 
      value: "1.6M", 
      unit: "items", 
      icon: AlertTriangle, 
      color: "text-red-600",
      source: "Internal CF&B Data (2025)",
      context: "Net Ticketed Segment Fee BIT quantity of 1,589,835 items processed manually in July 2025, plus APIS Quick Query messages (363,889 in June). These volumes evidence the scale of manual work.",
      url: "#"
    },
    { 
      label: "Finance Requests from Sales (Since April)", 
      value: "2,700+", 
      unit: "requests", 
      icon: Clock, 
      color: "text-orange-600",
      source: "Internal Sales-Finance Tracker",
      context: "Over 2,700 finance-related requests logged by Sales teams since April - copies of invoices/statements, disputes, address changes - indicating process friction.",
      url: "#"
    },
    { 
      label: "Time Spent on Manual Repetitive Tasks", 
      value: "40%", 
      unit: "of workday", 
      icon: TrendingDown, 
      color: "text-red-700",
      source: "Internal Finance Operations Analysis",
      context: "Finance professionals spend nearly half their time on manual data entry, validation, and repetitive tasks that could be automated.",
      url: "#"
    }
  ];

  return (
    <div className="relative h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-purple-100 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 overflow-hidden">
      {/* COE branding top left */}
      <div className="absolute left-6 top-6 z-10">
        <img 
          src="/images/coe_color_logo.png" 
          alt="Center of Excellence" 
          className="h-12 w-auto dark:hidden"
        />
        <img 
          src="/images/coe_white_logo.png" 
          alt="Center of Excellence" 
          className="h-12 w-auto hidden dark:block"
        />
      </div>

      <div className="flex flex-col justify-center h-full px-8 py-12 max-w-6xl mx-auto">
        
        {/* Step 1: Hero Title */}
        <StepReveal step={0} isVisible={stepController.isStepVisible(0)} direction="down">
          <div className="text-center mb-16">
            <h1 className="font-amadeus text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              The Daily Reality
            </h1>
            <p className="font-amadeus text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              We process <strong>470+ million bookings</strong> and board <strong>2.2 billion passengers</strong> annually across 190+ countries.
              <br />Yet our Finance Operations still rely heavily on manual, repetitive tasks.
            </p>
          </div>
        </StepReveal>

        {/* Step 2: Pain Metrics */}
        <StepReveal step={1} isVisible={stepController.isStepVisible(1)} direction="up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {painMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div 
                  key={metric.label}
                  className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredMetric(index)}
                  onMouseLeave={() => setHoveredMetric(null)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                      <IconComponent size={24} className={metric.color} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-amadeus text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        {metric.label}
                      </h3>
                    </div>
                    <div className="w-6 h-6 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center">
                      <Info size={14} className="text-slate-500 dark:text-slate-400" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-amadeus text-4xl font-bold text-slate-900 dark:text-white">
                      {metric.value}
                    </span>
                    <span className="font-amadeus text-xl text-slate-500 dark:text-slate-400">
                      {metric.unit}
                    </span>
                  </div>

                  {/* Tooltip */}
                  {hoveredMetric === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 max-w-sm"
                    >
                      <div className="bg-slate-900 dark:bg-slate-100 rounded-xl p-4 shadow-2xl border border-slate-700 dark:border-slate-300">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-amadeus text-sm font-bold text-white dark:text-slate-900">
                            {metric.source}
                          </span>
                          <a 
                            href={metric.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 dark:text-blue-600 hover:text-blue-300 dark:hover:text-blue-700 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={12} />
                          </a>
                        </div>
                        <p className="font-amadeus text-xs text-slate-300 dark:text-slate-700 leading-relaxed">
                          {metric.context}
                        </p>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="w-2 h-2 bg-slate-900 dark:bg-slate-100 border-r border-b border-slate-700 dark:border-slate-300 transform rotate-45"></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </StepReveal>

        {/* Step 3: Call to Action */}
        <StepReveal step={2} isVisible={stepController.isStepVisible(2)} direction="fade">
          <div className="text-center bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users size={24} />
              <h3 className="font-amadeus text-2xl font-bold">
                Sound Familiar?
              </h3>
            </div>
            <p className="font-amadeus text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              <strong>"Information is not structured or standardized. Manual processes lead to inefficiencies and errors."</strong>
            </p>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-amadeus text-sm font-medium">But we're already starting to change this...</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </StepReveal>

      </div>
    </div>
  );
};