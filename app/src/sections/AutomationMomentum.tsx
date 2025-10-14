import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { StepReveal } from '@/components/common/StepReveal';
import { CheckCircle, Zap, TrendingUp, ArrowRight, X, ExternalLink, AlertTriangle, Shield, Target, Rocket, FileCheck } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { logos } from '@/utils/assets';

export const AutomationMomentum = ({ resetSignal, isPaused }: SectionProps) => {
  const { stepMode, stepSignal, setIsLastStep } = usePresentation();
  const [selectedWin, setSelectedWin] = useState<number | null>(null);
  
  const stepController = useStepController({
    totalSteps: 6,
    resetSignal,
    stepSignal,
    autoAdvance: false,
    stepDuration: 4000,
    onLastStepChange: setIsLastStep
  });

  const currentStep = stepController.currentStep;


  const automationWins = [
    {
      title: "Manual Billing Validation",
      value: "Zero Risk",
      iconComponent: Shield,
      description: "Power Automate flow validates every manual load",
      impact: "100% compliance achieved",
      details: {
        challenge: "Manual billing loads required team lead approval for every system entry, creating bottlenecks and compliance risks.",
        solution: "Power Automate flow automatically routes each manual billing load to the appropriate team lead for validation before system processing.",
        results: [
          "100% compliance with 4-eyes principle",
          "Traceable approval audit trail",
          "Reduced manual oversight burden",
          "Faster processing with built-in controls"
        ]
      }
    },
    {
      title: "Month-End Orchestration",
      value: "Full Visibility",
      iconComponent: Target,
      description: "Power Apps automates tasks & notifications",
      impact: "Real-time management view",
      details: {
        challenge: "Month-end closing relied on Excel spreadsheets with no automation, limited visibility for management, and manual task tracking across multiple teams.",
        solution: "Power Apps application with integrated flows that automates the entire month-end process - users access centralized tasks, mark progress, receive automated notifications, while management gains real-time visibility.",
        results: [
          "Automated task notifications & reminders",
          "Real-time visibility for management",
          "Centralized audit trail for compliance",
          "From Excel chaos to automated workflow"
        ]
      }
    },
    {
      title: "Center of Excellence",
      value: "Scaling Fast",
      iconComponent: Rocket,
      description: "Automation demand growing faster than we can build",
      impact: "Empowering Finance to build their own solutions",
      details: {
        challenge: "Automation requests from Finance teams are increasing exponentially. Continuous Improvement teams can't keep up with the demand. We need a new model where Finance professionals build their own solutions.",
        solution: "Power Automate enables Finance employees to become citizen developers—automating their own processes without waiting for IT queues. Training programs and a Center of Excellence support this transformation.",
        results: [
          "Reduce the number of small size automation requests",
          "Shift from 'Technical teams builds for us' to 'we build ourselves'",
          "More and better documentation and training expanding to 100+ Finance users",
          "Faster time-to-automation with low-code solutions"
        ]
      }
    },
    {
      title: "RMC Task Management",
      value: "Data Integrity",
      iconComponent: FileCheck,
      description: "Centralized registry with approval workflows",
      impact: "Structured data for 80 users",
      details: {
        challenge: "Not all tasks were registered, teams lacked visibility across departments, fragmented tools resulted in unstructured data, impacting ~80 users in Revenue Management & Collection.",
        solution: "COE-85 RMC Task Management Tool - a centralized Power Apps solution with integrated approval workflows, automated validations, and structured data capture for complete task visibility.",
        results: [
          "Centralized task registry for all RMC activities",
          "Automated approval workflows with audit trails",
          "Structured data replacing fragmented tools",
          "Complete visibility for management & teams"
        ]
      }
    }
  ];

  return (
    <div className="relative h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-purple-100 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 overflow-hidden">
      {/* Step Progress Indicator */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-2">
          {[...Array(6)].map((_, index) => (
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
              We're Already Building Momentum
            </h1>
            <p className="font-amadeus text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Our Finance Operations has already begun the automation journey.
              <br />Let's see what we've accomplished and where we're heading.
            </p>
          </div>
        </StepReveal>

        {/* Steps 2-5: Automation Wins Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {automationWins.map((win, index) => {
            const IconComponent = win.iconComponent;
            return (
              <StepReveal key={win.title} step={index + 1} isVisible={stepController.isStepVisible(index + 1)} direction="up">
                <div
                  className="text-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:scale-105 transition-all duration-300 cursor-pointer relative group h-[200px] flex flex-col"
                  onClick={() => setSelectedWin(index)}
                >
                  <div className="mb-2 flex justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#5b7fdb]/10 to-[#8b5cf6]/10 rounded-lg flex items-center justify-center">
                      <IconComponent size={24} className="text-[#6a5acd]" />
                    </div>
                  </div>
                  <div className="font-amadeus text-base font-bold text-slate-900 dark:text-white mb-1.5">
                    {win.value}
                  </div>
                  <div className="font-amadeus text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                    {win.title}
                  </div>
                  <div className="font-amadeus text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-2 flex-grow">
                    {win.impact}
                  </div>

                  {/* Click indicator */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-5 h-5 bg-gradient-to-r from-[#5b7fdb] to-[#8b5cf6] rounded-full flex items-center justify-center">
                      <ExternalLink size={10} className="text-white" />
                    </div>
                  </div>

                  {/* Click hint */}
                  <div className="font-amadeus text-[10px] text-[#6a5acd] dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-7 left-1/2 transform -translate-x-1/2">
                    Click for details
                  </div>
                </div>
              </StepReveal>
            );
          })}
        </div>

        {/* Step 6: Power Automate Callout */}
        <StepReveal step={5} isVisible={stepController.isStepVisible(5)} direction="fade">
          <div className="text-center">
            <div className="mb-4">
              <h3 className="font-amadeus text-2xl font-bold text-slate-900 dark:text-white mb-3">
                But We Can Do More
              </h3>
            </div>

            <div className="bg-gradient-to-r from-[#1a237e] to-[#6a1b9a] rounded-2xl p-6 text-white shadow-xl">
              <p className="font-amadeus text-base mb-4 opacity-90">
                Build automation in minutes, not months. Over 500 pre-built connectors. No coding required.
              </p>

              <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mb-5">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2.5">
                  <div className="font-amadeus text-xl font-bold mb-0.5">500+</div>
                  <div className="font-amadeus text-xs opacity-90">Connectors</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2.5">
                  <div className="font-amadeus text-xl font-bold mb-0.5">Build in</div>
                  <div className="font-amadeus text-xs opacity-90">Minutes</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2.5">
                  <div className="font-amadeus text-xl font-bold mb-0.5">You</div>
                  <div className="font-amadeus text-xs opacity-90">Own It</div>
                </div>
              </div>

              <button
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-full transition-all duration-300"
                type="button"
              >
                <span className="font-amadeus text-sm font-medium">See What's Possible</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </StepReveal>

      </div>

      {/* Modal for detailed automation information */}
      {selectedWin !== null && (() => {
        const ModalIcon = automationWins[selectedWin].iconComponent;
        return (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0075C9]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ModalIcon size={28} className="text-[#0075C9]" />
                    </div>
                    <div>
                      <h3 className="font-amadeus text-2xl font-bold text-slate-900 dark:text-white">
                        {automationWins[selectedWin].title}
                      </h3>
                      <p className="font-amadeus text-lg text-slate-600 dark:text-slate-400">
                        {automationWins[selectedWin].description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedWin(null)}
                    className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    type="button"
                  >
                    <X size={16} className="text-slate-600 dark:text-slate-400" />
                  </button>
                </div>

              {/* Challenge */}
              <div className="mb-6">
                <h4 className="font-amadeus text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-red-500" />
                  Challenge
                </h4>
                <p className="font-amadeus text-slate-700 dark:text-slate-300 leading-relaxed">
                  {automationWins[selectedWin].details.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-6">
                <h4 className="font-amadeus text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-500" />
                  Solution
                </h4>
                <p className="font-amadeus text-slate-700 dark:text-slate-300 leading-relaxed">
                  {automationWins[selectedWin].details.solution}
                </p>
              </div>

              {/* Results */}
              <div className="mb-6">
                <h4 className="font-amadeus text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={20} className="text-blue-500" />
                  Results
                </h4>
                <ul className="space-y-2">
                  {automationWins[selectedWin].details.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="font-amadeus text-slate-700 dark:text-slate-300">
                        {result}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};