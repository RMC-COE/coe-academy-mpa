import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { StepReveal } from '@/components/common/StepReveal';
import { Clock, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export const Agenda = ({ resetSignal }: SectionProps) => {
  const { sections, stepMode, stepSignal, setIsLastStep } = usePresentation();

  // Filtramos la sección de cover y agenda para mostrar solo el contenido principal
  const contentSections = sections.filter(section => 
    section.id !== 'cover' && section.id !== 'agenda'
  );

  const totalDuration = contentSections.reduce((acc, section) => acc + section.durationMinutes, 0);

  // Step controller: 1 (título) + 1 (info) + 5 (items) + 1 (footer) = 8 steps
  const totalSteps = 2 + contentSections.length + 1;
  
  const stepController = useStepController({
    totalSteps,
    resetSignal,
    stepSignal,
    autoAdvance: !stepMode,
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
          src="/images/coe_white_logo.png" 
          alt="Center of Excellence" 
          className="h-16 w-auto"
        />
      </div>

      {/* Main content */}
      <div className="max-w-4xl w-full px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Step 1: Title */}
          <StepReveal step={0} isVisible={stepController.isStepVisible(0)} direction="down">
            <h1 className="font-amadeus text-6xl font-bold text-white mb-6">
              Today's Agenda
            </h1>
          </StepReveal>
          
          {/* Step 2: Info */}
          <StepReveal step={1} isVisible={stepController.isStepVisible(1)} direction="up">
            <div className="flex items-center justify-center gap-8 text-purple-200 text-xl font-amadeus">
              <div className="flex items-center gap-3">
                <Clock size={24} />
                <span>{totalDuration} minutes</span>
              </div>
              <div className="flex items-center gap-3">
                <Play size={24} />
                <span>Interactive session</span>
              </div>
            </div>
          </StepReveal>
        </div>

        {/* Agenda items - Step by step */}
        <div className="space-y-4">
          {contentSections.map((section, index) => (
            /* Step 3-7: Each agenda item */
            <StepReveal 
              key={section.id}
              step={index + 2} 
              isVisible={stepController.isStepVisible(index + 2)} 
              direction="up"
            >
              <div className="flex items-center justify-between py-6 px-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 hover:scale-[1.02] transition-all duration-300">
              {/* Left side - Number and content */}
              <div className="flex items-center gap-6 flex-1">
                {/* Section number */}
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-amadeus text-white font-bold text-xl">{index + 1}</span>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-amadeus text-2xl font-bold text-white mb-2">
                    {section.title}
                  </h3>
                  <p className="font-amadeus text-purple-200 text-lg leading-relaxed">
                    {section.subtitle}
                  </p>
                </div>
              </div>

              {/* Right side - Duration */}
              <div className="flex-shrink-0 ml-6">
                <div className="bg-purple-600/60 px-4 py-2 rounded-lg">
                  <span className="font-amadeus text-white font-medium text-lg">
                    {section.durationMinutes} min
                  </span>
                </div>
              </div>
              </div>
            </StepReveal>
          ))}
        </div>

        {/* Step 8: Footer */}
        <StepReveal 
          step={totalSteps - 1} 
          isVisible={stepController.isStepVisible(totalSteps - 1)} 
          direction="fade"
        >
          <div className="text-center mt-12">
            <p className="font-amadeus text-xl text-white/90">
              Let's transform your daily processes together
            </p>
          </div>
        </StepReveal>
      </div>
    </div>
  );
};