import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { StepReveal } from '@/components/common/StepReveal';
import { Clock, AlertTriangle, TrendingDown, Users, ArrowRight, ExternalLink, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { logos } from '@/utils/assets';
import { SourceModal } from '@/components/common/SourceModal';
import { researchSources } from '@/data/researchSources';

export const TheDailyReality = ({ resetSignal, isPaused }: SectionProps) => {
  const { stepMode, stepSignal, setIsLastStep, goToNextSection } = usePresentation();
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState<'manualBilling' | 'financeRequests' | 'manualTasks' | null>(null);

  const stepController = useStepController({
    totalSteps: 3,
    resetSignal,
    stepSignal,
    autoAdvance: false,
    stepDuration: 4000,
    onLastStepChange: setIsLastStep
  });

  const currentStep = stepController.currentStep;


  const painMetrics = [
    {
      label: "Manual Billing Items (July 2025)",
      value: "1.6M",
      unit: "items",
      icon: AlertTriangle,
      color: "text-red-600",
      source: "Internal CF&B Data (2025)",
      context: "Net Ticketed Segment Fee BIT quantity of 1,589,835 items processed manually in July 2025, plus APIS Quick Query messages (363,889 in June). These volumes evidence the scale of manual work.",
      modalKey: 'manualBilling' as const
    },
    {
      label: "Finance Requests from Sales (Since April)",
      value: "2,700+",
      unit: "requests",
      icon: Clock,
      color: "text-orange-600",
      source: "Internal Sales-Finance Tracker",
      context: "Over 2,700 finance-related requests logged by Sales teams since April - copies of invoices/statements, disputes, address changes - indicating process friction.",
      modalKey: 'financeRequests' as const
    },
    {
      label: "Time Spent on Manual Repetitive Tasks",
      value: "40%",
      unit: "of workday",
      icon: TrendingDown,
      color: "text-red-700",
      source: "Internal Finance Operations Analysis",
      context: "Finance professionals spend nearly half their time on manual data entry, validation, and repetitive tasks that could be automated.",
      modalKey: 'manualTasks' as const
    }
  ];

  return (
    <div className="relative h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-purple-100 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 overflow-hidden">
      {/* Step Progress Indicator */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-2">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              animate={{
                width: currentStep === index ? 40 : 8,
                backgroundColor: currentStep >= index ? '#8b5cf6' : '#ffffff30'
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* COE branding top left */}
      <div className="absolute left-6 top-6 z-10">
        <img
          src={logos.coeColor}
          alt="Center of Excellence"
          className="h-16 w-auto dark:hidden"
        />
        <img
          src={logos.coeWhite}
          alt="Center of Excellence"
          className="h-16 w-auto hidden dark:block"
        />
      </div>

      <div className="flex flex-col justify-center h-full px-8 py-12 max-w-5xl mx-auto">

        {/* Step 1: Hero Title */}
        <StepReveal step={0} isVisible={stepController.isStepVisible(0)} direction="down">
          <div className="text-center mb-12">
            <h1 className="font-amadeus text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              The Daily Reality
            </h1>
            <p className="font-amadeus text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We process <strong>470+ million bookings</strong> and board <strong>2.2 billion passengers</strong> annually across 190+ countries.
              <br />Yet our Finance Operations still rely heavily on manual, repetitive tasks.
            </p>
          </div>
        </StepReveal>

        {/* Step 2: Pain Metrics */}
        <StepReveal step={1} isVisible={stepController.isStepVisible(1)} direction="up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {painMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 cursor-pointer flex flex-col h-[220px]"
                  onMouseEnter={() => setHoveredMetric(index)}
                  onMouseLeave={() => setHoveredMetric(null)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#5b7fdb]/10 to-[#8b5cf6]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent size={20} className="text-[#6a5acd]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-amadeus text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        {metric.label}
                      </h3>
                    </div>
                    <div className="w-5 h-5 bg-gradient-to-br from-[#5b7fdb]/20 to-[#8b5cf6]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Info size={12} className="text-[#6a5acd]" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center flex-1 text-center">
                    <span className="font-amadeus text-4xl font-bold text-slate-900 dark:text-white mb-1">
                      {metric.value}
                    </span>
                    <span className="font-amadeus text-base text-slate-500 dark:text-slate-400">
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
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenModal(metric.modalKey);
                            }}
                            className="text-blue-400 dark:text-blue-600 hover:text-blue-300 dark:hover:text-blue-700 transition-colors"
                            aria-label="View source details"
                            type="button"
                          >
                            <ExternalLink size={12} />
                          </button>
                        </div>
                        <p className="font-amadeus text-xs text-slate-300 dark:text-slate-700 leading-relaxed mb-2">
                          {metric.context}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenModal(metric.modalKey);
                          }}
                          className="text-xs text-blue-400 dark:text-blue-600 hover:underline"
                          type="button"
                        >
                          Click to view full research →
                        </button>
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
          <div className="text-center bg-gradient-to-r from-[#1a237e] to-[#6a1b9a] rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Users size={20} />
              <h3 className="font-amadeus text-xl font-bold">
                Sound Familiar?
              </h3>
            </div>
            <p className="font-amadeus text-base mb-4 opacity-90 max-w-xl mx-auto">
              <strong>"Information is not structured or standardized. Manual processes lead to inefficiencies and errors."</strong>
            </p>
            <button
              onClick={goToNextSection}
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer"
              type="button"
            >
              <span className="font-amadeus text-sm font-medium">But we're already starting to change this...</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </StepReveal>

      </div>

      {/* Source Modals */}
      <SourceModal
        isOpen={openModal === 'manualBilling'}
        onClose={() => setOpenModal(null)}
        title={researchSources.manualBilling.title}
      >
        {researchSources.manualBilling.content}
      </SourceModal>

      <SourceModal
        isOpen={openModal === 'financeRequests'}
        onClose={() => setOpenModal(null)}
        title={researchSources.financeRequests.title}
      >
        {researchSources.financeRequests.content}
      </SourceModal>

      <SourceModal
        isOpen={openModal === 'manualTasks'}
        onClose={() => setOpenModal(null)}
        title={researchSources.manualTasks.title}
      >
        {researchSources.manualTasks.content}
      </SourceModal>
    </div>
  );
};