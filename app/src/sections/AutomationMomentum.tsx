import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { StepReveal } from '@/components/common/StepReveal';
import { CheckCircle, Zap, TrendingUp, ArrowRight, X, ExternalLink, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export const AutomationMomentum = ({ resetSignal, isPaused }: SectionProps) => {
  const { stepMode, stepSignal, setIsLastStep } = usePresentation();
  const [selectedWin, setSelectedWin] = useState<number | null>(null);
  
  const stepController = useStepController({
    totalSteps: 6,
    resetSignal,
    stepSignal,
    autoAdvance: !stepMode,
    stepDuration: 4000,
    onLastStepChange: setIsLastStep
  });


  const automationWins = [
    { 
      title: "Manual Billing Validation", 
      value: "Zero Risk", 
      icon: "✅", 
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
      icon: "🎯", 
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
      title: "ARPA Process Pipeline", 
      value: "Scaling Fast", 
      icon: "⚡", 
      description: "CF&B and AR automation portfolio expanding",
      impact: "Demand exceeds capacity",
      details: {
        challenge: "Critical finance processes in Contract Fulfilment & Billing and Accounts Receivable were entirely manual and error-prone.",
        solution: "CFA Hyperautomation initiative using ARPA (robotic process automation) to automate key processes across CF&B and AR domains.",
        results: [
          "Multiple processes automated (CFA-P27, CFA-P30)",
          "Reduced manual intervention",
          "Improved process consistency",
          "Capacity constraints highlighting demand"
        ]
      }
    },
    { 
      title: "RMC Task Management", 
      value: "Data Integrity", 
      icon: "📋", 
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
          <div className="text-center mb-12">
            <h1 className="font-amadeus text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              We're Already Building Momentum
            </h1>
            <p className="font-amadeus text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Our Finance Operations has already begun the automation journey.
              <br />Let's see what we've accomplished and where we're heading.
            </p>
          </div>
        </StepReveal>

        {/* Steps 2-5: Automation Wins Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {automationWins.map((win, index) => (
            <StepReveal key={win.title} step={index + 1} isVisible={stepController.isStepVisible(index + 1)} direction="up">
              <div 
                className="text-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:scale-105 transition-all duration-300 cursor-pointer relative group"
                onClick={() => setSelectedWin(index)}
              >
                <div className="text-3xl mb-3">{win.icon}</div>
                <div className="font-amadeus text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {win.value}
                </div>
                <div className="font-amadeus text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                  {win.title}
                </div>
                <div className="font-amadeus text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                  {win.impact}
                </div>
                
                {/* Click indicator */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <ExternalLink size={12} className="text-white" />
                  </div>
                </div>
                
                {/* Click hint */}
                <div className="font-amadeus text-xs text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click for details
                </div>
              </div>
            </StepReveal>
          ))}
        </div>

        {/* Step 6: Introducing Power Automate */}
        <StepReveal step={5} isVisible={stepController.isStepVisible(5)} direction="fade">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="font-amadeus text-3xl font-bold text-slate-900 dark:text-white mb-4">
                But We Can Do More
              </h3>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 text-white">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Zap size={24} className="text-white" />
                </div>
                <h2 className="font-amadeus text-3xl font-bold">
                  Introducing Power Automate
                </h2>
              </div>
              
              <p className="font-amadeus text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                The citizen developer platform that puts automation power directly in your hands.
                No coding required. No IT bottlenecks. Just solutions.
              </p>
              
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="font-amadeus text-2xl font-bold mb-1">500+</div>
                  <div className="font-amadeus text-xs opacity-80">Pre-built Connectors</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="font-amadeus text-2xl font-bold mb-1">Minutes</div>
                  <div className="font-amadeus text-xs opacity-80">To Build First Flow</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="font-amadeus text-2xl font-bold mb-1">You</div>
                  <div className="font-amadeus text-xs opacity-80">Are The Developer</div>
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full">
                <span className="font-amadeus text-sm font-medium">Let's explore what's possible</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </StepReveal>

      </div>

      {/* Modal for detailed automation information */}
      {selectedWin !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{automationWins[selectedWin].icon}</div>
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
      )}
    </div>
  );
};