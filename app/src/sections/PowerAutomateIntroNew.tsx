import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Zap, Sparkles, ArrowRight, Play, Pause, RefreshCw, Users, Clock, Shield, Cpu } from 'lucide-react';

export const PowerAutomateIntroNew = ({ resetSignal, isPaused }: SectionProps) => {
  const { stepMode, stepSignal, setIsLastStep } = usePresentation();
  const [activeFlow, setActiveFlow] = useState(0);
  const [isFlowAnimating, setIsFlowAnimating] = useState(true);
  
  const stepController = useStepController({
    totalSteps: 7,
    resetSignal,
    stepSignal,
    autoAdvance: !stepMode,
    stepDuration: 5000,
    onLastStepChange: setIsLastStep
  });

  // Animate flow visualization
  useEffect(() => {
    if (!isFlowAnimating || isPaused) return;
    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, [isFlowAnimating, isPaused]);

  const capabilities = [
    {
      icon: Users,
      title: "Citizen Development",
      description: "No coding skills required",
      gradient: "from-blue-500 to-indigo-600",
      detail: "Finance professionals can build their own solutions"
    },
    {
      icon: Clock,
      title: "Instant Automation",
      description: "Deploy in minutes, not months",
      gradient: "from-purple-500 to-pink-600",
      detail: "From idea to production in less than 30 minutes"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "IT-approved & compliant",
      gradient: "from-green-500 to-teal-600",
      detail: "Built on Microsoft's secure cloud infrastructure"
    },
    {
      icon: Cpu,
      title: "AI-Powered",
      description: "Smart suggestions & optimization",
      gradient: "from-orange-500 to-red-600",
      detail: "AI helps build better flows faster"
    }
  ];

  const flowSteps = [
    { name: "Trigger", icon: "📧", description: "Email arrives" },
    { name: "Extract", icon: "📊", description: "Get data" },
    { name: "Process", icon: "⚙️", description: "Apply rules" },
    { name: "Action", icon: "✅", description: "Update systems" }
  ];

  const currentStep = stepController.currentStep;

  return (
    <div className="relative h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 overflow-hidden">
      {/* Static background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="currentColor" className="text-white/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Step Progress Indicator */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-2">
          {[...Array(7)].map((_, index) => (
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

      {/* COE branding */}
      <div className="absolute left-6 top-6 z-10">
        <img 
          src="/images/coe_white_logo.png" 
          alt="Center of Excellence" 
          className="h-12 w-auto"
        />
      </div>

      <div className="relative z-10 h-full">
        
        {/* Step 0: Title Only */}
        {stepController.currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center h-full"
          >
            <div className="text-center">
              <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, type: "spring" }}
                className="font-amadeus text-7xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                Power Automate
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="font-amadeus text-xl text-white/60 mt-4"
              >
                Transform your work, automate your future
              </motion.p>
            </div>
          </motion.div>
        )}
        
        {/* Step 1: The Goals */}
        {stepController.currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-12"
          >
            <div className="text-center max-w-4xl">
              <h2 className="font-amadeus text-5xl font-bold text-white mb-6">
                Introduction to Power Automate
              </h2>
              <h3 className="font-amadeus text-3xl text-purple-400 mb-20">The goals</h3>
              
              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex items-start gap-6 text-left max-w-3xl mx-auto"
                >
                  <div className="text-purple-400 mt-1">
                    <div className="w-1 h-12 bg-purple-400 rounded-full"></div>
                  </div>
                  <p className="font-amadeus text-2xl text-white/80 leading-relaxed">
                    Explore the basics of Power Automate to simplify process automation.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex items-start gap-6 text-left max-w-3xl mx-auto"
                >
                  <div className="text-purple-400 mt-1">
                    <div className="w-1 h-12 bg-purple-400 rounded-full"></div>
                  </div>
                  <p className="font-amadeus text-2xl text-white/80 leading-relaxed">
                    Enhance your automation capabilities, making tasks more efficient.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Why is Power Automate Important? */}
        {stepController.currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-12"
          >
            <h2 className="font-amadeus text-5xl font-bold text-white mb-20 text-center">
              Why is Power Automate Important?
            </h2>
            <div className="grid grid-cols-2 gap-12 max-w-4xl">
              {capabilities.slice(0, 4).map((capability, index) => {
                const IconComponent = capability.icon;
                return (
                  <motion.div
                    key={capability.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative group cursor-pointer"
                  >
                    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 h-full transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
                      <div className={`w-16 h-16 bg-gradient-to-br ${capability.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent size={32} className="text-white" />
                      </div>
                      <h3 className="font-amadeus text-2xl font-bold text-white mb-3">
                        {capability.title}
                      </h3>
                      <p className="font-amadeus text-lg text-white/60">
                        {capability.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 3: What is Power Automate? */}
        {stepController.currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-12"
          >
            <div className="text-center max-w-5xl">
              <h2 className="font-amadeus text-5xl font-bold text-white mb-8">
                What is Power Automate?
              </h2>
              <h3 className="font-amadeus text-2xl text-purple-400 mb-16">Understanding Power Automate</h3>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl"></div>
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-16 border border-white/10">
                  <p className="font-amadeus text-2xl text-white/90 leading-relaxed">
                    Power Automate is a <span className="text-purple-400 font-bold">low-code automation platform</span> that 
                    enables you to create automated workflows between your apps and services to 
                    <span className="text-blue-400 font-bold"> synchronize files</span>, 
                    <span className="text-green-400 font-bold"> get notifications</span>, 
                    <span className="text-yellow-400 font-bold"> collect data</span>, and more.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Live flow visualization */}
        {stepController.currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-12"
          >
            <h2 className="font-amadeus text-5xl font-bold text-white text-center mb-16">
              See It In Action
            </h2>
            <div className="relative max-w-6xl w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
                <div className="flex items-center justify-between mb-12">
                  <h3 className="font-amadeus text-2xl text-white/80">Invoice Processing Flow</h3>
                  <button
                    onClick={() => setIsFlowAnimating(!isFlowAnimating)}
                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    {isFlowAnimating ? <Pause size={20} /> : <Play size={20} />}
                    <span className="font-amadeus text-lg text-white">
                      {isFlowAnimating ? 'Pause' : 'Play'}
                    </span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  {flowSteps.map((step, index) => (
                    <div key={step.name} className="flex items-center flex-1">
                      <motion.div
                        animate={{
                          scale: activeFlow === index ? 1.15 : 1,
                          opacity: activeFlow >= index ? 1 : 0.4
                        }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                      >
                        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-4xl mx-auto
                          ${activeFlow === index ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl shadow-purple-500/50' : 'bg-white/10'}
                          transition-all duration-500`}
                        >
                          {step.icon}
                        </div>
                        <p className="font-amadeus text-lg font-bold text-white/90 mt-4">{step.name}</p>
                        <p className="font-amadeus text-sm text-white/60">{step.description}</p>
                      </motion.div>
                      
                      {index < flowSteps.length - 1 && (
                        <div className="flex-1 h-1 mx-6 relative">
                          <div className="absolute inset-0 bg-white/10 rounded-full"></div>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: activeFlow > index ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ transformOrigin: 'left' }}
                          ></motion.div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 5: Impact metrics */}
        {stepController.currentStep === 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-12"
          >
            <h2 className="font-amadeus text-5xl font-bold text-white text-center mb-20">
              The Power of Automation
            </h2>
            <div className="grid grid-cols-3 gap-8 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 blur-2xl"></div>
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10 text-center h-full">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="inline-block mb-6"
                  >
                    <Sparkles size={48} className="text-blue-400" />
                  </motion.div>
                  <div className="font-amadeus text-6xl font-bold text-white mb-4">500+</div>
                  <div className="font-amadeus text-xl text-white/70">Ready Connectors</div>
                  <div className="font-amadeus text-base text-white/50 mt-3">SAP, Excel, Teams...</div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 blur-2xl"></div>
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10 text-center h-full">
                  <div className="inline-block mb-6">
                    <RefreshCw size={48} className="text-purple-400" />
                  </div>
                  <div className="font-amadeus text-6xl font-bold text-white mb-4">24/7</div>
                  <div className="font-amadeus text-xl text-white/70">Always Running</div>
                  <div className="font-amadeus text-base text-white/50 mt-3">Cloud reliability</div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600/30 to-orange-600/30 blur-2xl"></div>
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10 text-center h-full">
                  <div className="inline-block mb-6">
                    <Zap size={48} className="text-pink-400" />
                  </div>
                  <div className="font-amadeus text-6xl font-bold text-white mb-4">10x</div>
                  <div className="font-amadeus text-xl text-white/70">Faster Processing</div>
                  <div className="font-amadeus text-base text-white/50 mt-3">vs. manual work</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 6: Call to action */}
        {stepController.currentStep === 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center h-full px-12"
          >
            <div className="text-center max-w-4xl">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-20">
                  <h3 className="font-amadeus text-5xl font-bold text-white mb-8">
                    Ready to Transform Your Work?
                  </h3>
                  <p className="font-amadeus text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
                    Join thousands of professionals who've automated their tasks
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-4 bg-white text-purple-600 px-10 py-5 rounded-full font-amadeus font-bold text-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Let's Build Your First Flow
                    <ArrowRight size={28} />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};