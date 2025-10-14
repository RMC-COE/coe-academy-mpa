import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { StepReveal } from '@/components/common/StepReveal';
import { motion } from 'framer-motion';
import { logos } from '@/utils/assets';

export const Agenda = ({ resetSignal }: SectionProps) => {
  const { stepMode, stepSignal, setIsLastStep } = usePresentation();

  // Contenido de la agenda con títulos actualizados
  const agendaItems = [
    { title: 'The Daily Reality', subtitle: 'Our scale vs our manual processes' },
    { title: 'Automation Momentum', subtitle: "What we've already accomplished" },
    { title: 'Power Automate Introduction', subtitle: 'Democratize automation without depending on IT' },
    { title: 'Building Your First Flow', subtitle: 'Step by step - From idea to automation' },
    { title: 'Advanced Power Automate', subtitle: 'Copilot, Best Practices, and Troubleshooting' }
  ];

  // Step controller: 1 (título) + 5 (items) = 6 steps
  const totalSteps = 1 + agendaItems.length;

  const stepController = useStepController({
    totalSteps,
    resetSignal,
    stepSignal,
    autoAdvance: false,
    stepDuration: 1500,
    onLastStepChange: setIsLastStep
  });

  const currentStep = stepController.currentStep;

  return (
    <div className="relative h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 overflow-hidden flex items-center justify-center">
      {/* Static background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-indigo-600/20 to-pink-600/20"></div>
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid-agenda" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="currentColor" className="text-white/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-agenda)" />
        </svg>
      </div>

      {/* Step Progress Indicator */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-2">
          {[...Array(totalSteps)].map((_, index) => (
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
          src={logos.coeWhite}
          alt="Center of Excellence"
          className="h-16 w-auto"
        />
      </div>

      {/* Main content - Centered */}
      <div className="max-w-3xl w-full px-8">
        {/* Header */}
        <StepReveal step={0} isVisible={stepController.isStepVisible(0)} direction="down">
          <div className="text-center mb-20">
            <h1 className="font-amadeus text-7xl font-bold text-white mb-4 tracking-tight">
              Today's Agenda
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
        </StepReveal>

        {/* Agenda items - Minimal list style */}
        <div className="space-y-8">
          {agendaItems.map((item, index) => (
            <StepReveal
              key={index}
              step={index + 1}
              isVisible={stepController.isStepVisible(index + 1)}
              direction="up"
            >
              <div className="flex items-start gap-6 group">
                {/* Number - Adjusted to match real slide numbers (starting at 3) */}
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                  <span className="font-amadeus text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-400">
                    {index + 3}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3 className="font-amadeus text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-amadeus text-lg text-purple-200/80 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </StepReveal>
          ))}
        </div>
      </div>
    </div>
  );
};