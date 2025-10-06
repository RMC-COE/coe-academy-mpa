import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Bot,
  CheckCircle2,
  AlertTriangle,
  Settings,
  Monitor,
  Zap,
  Target,
  Users,
  Shield,
  RefreshCw,
  Search,
  Code,
  Database,
  Play,
  Pause,
  RotateCcw,
  Laptop,
  Cloud,
  ArrowRight,
  Lightbulb,
  Book,
  Wrench,
  ChevronUp,
  ChevronDown,
  Globe
} from 'lucide-react';

export const AdvancedPowerAutomate = ({ resetSignal }: SectionProps) => {
  const { stepMode, stepSignal, setIsLastStep } = usePresentation();
  const [activeTab, setActiveTab] = useState(0);
  const [currentCopilotScreenshot, setCurrentCopilotScreenshot] = useState(0);

  // Auto-generate copilot screenshots based on available images
  const generateCopilotScreenshots = () => {
    const stepTitles = [
      'Describing your flow in natural language',
      'AI-generated flow structure',
      'Reviewing and refining suggestions',
      'Configuring flow parameters',
      'Testing the Copilot-created flow'
    ];

    const stepDescriptions = [
      'Type flow requirements in plain English: "Monitor AUTTP emails and process attachments"',
      'Copilot automatically creates the complete flow structure based on your description',
      'Review the generated flow and make adjustments or accept the AI suggestions',
      'Configure specific parameters and customize the flow to your needs',
      'Test your AI-created flow to ensure it works as expected before deployment'
    ];

    return Array.from({ length: 5 }, (_, index) => ({
      id: `copilot${index + 1}`,
      title: stepTitles[index],
      description: stepDescriptions[index],
      url: `/assets/screenshots/flow-steps-2/${index + 1}.png`
    }));
  };

  const copilotScreenshots = generateCopilotScreenshots();

  const stepController = useStepController({
    totalSteps: 5,
    resetSignal,
    stepSignal,
    autoAdvance: !stepMode,
    stepDuration: 12000,
    onLastStepChange: setIsLastStep
  });

  // Handle keyboard navigation for copilot screenshots in step 2
  useEffect(() => {
    if (stepController.currentStep === 2) {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp' && currentCopilotScreenshot > 0) {
          setCurrentCopilotScreenshot(currentCopilotScreenshot - 1);
        } else if (event.key === 'ArrowDown' && currentCopilotScreenshot < copilotScreenshots.length - 1) {
          setCurrentCopilotScreenshot(currentCopilotScreenshot + 1);
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    } else {
      // Reset screenshot when leaving step 2
      setCurrentCopilotScreenshot(0);
    }
  }, [stepController.currentStep, currentCopilotScreenshot, copilotScreenshots.length]);

  const currentStep = stepController.currentStep;

  return (
    <div className="relative h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 overflow-hidden">
      {/* Static background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid-advanced" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="currentColor" className="text-white/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-advanced)" />
        </svg>
      </div>

      {/* Step Progress Indicator */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, index) => (
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

      <AnimatePresence mode="wait">
        {/* Step 0: Title */}
        {stepController.currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-12"
          >
            {/* COE branding */}
            <div className="absolute left-6 top-6 z-10">
              <img
                src="/images/coe_white_logo.png"
                alt="Center of Excellence"
                className="h-16 w-auto"
              />
            </div>

            <div className="text-center max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-amadeus text-5xl font-bold text-white mb-8">
                  🚀 Advanced Power Automate
                </h2>
                <h3 className="font-amadeus text-3xl text-purple-400 mb-20">
                  Copilot, Best Practices & Enterprise Readiness
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Bot className="text-blue-400" size={32} />,
                    title: 'AI-Powered Creation',
                    description: 'Build flows using natural language with Copilot'
                  },
                  {
                    icon: <Shield className="text-green-400" size={32} />,
                    title: 'Production Best Practices',
                    description: 'Enterprise-grade patterns and governance'
                  },
                  {
                    icon: <Wrench className="text-orange-400" size={32} />,
                    title: 'Troubleshooting & Desktop',
                    description: 'Debug flows and extend with desktop automation'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (index * 0.2), duration: 0.6 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                  >
                    <div className="flex justify-center mb-4">
                      {item.icon}
                    </div>
                    <h4 className="font-amadeus text-xl font-bold text-white mb-3">
                      {item.title}
                    </h4>
                    <p className="font-amadeus text-white/80 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 1: Copilot Demo */}
        {stepController.currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-8"
          >
            {/* COE branding */}
            <div className="absolute left-6 top-6 z-10">
              <img
                src="/images/coe_white_logo.png"
                alt="Center of Excellence"
                className="h-16 w-auto"
              />
            </div>

            <div className="text-center max-w-7xl w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="font-amadeus text-4xl font-bold text-white mb-4">
                  🤖 Flow Creation with Copilot
                </h2>
                <p className="font-amadeus text-xl text-purple-400">
                  From natural language to production-ready automation
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Traditional vs Copilot */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="space-y-6"
                >
                  {/* Traditional Way */}
                  <div className="bg-red-900/20 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
                    <div className="flex items-center gap-3 mb-4">
                      <Settings className="text-red-400" size={24} />
                      <h3 className="font-amadeus text-xl font-bold text-white">Traditional Method</h3>
                    </div>
                    <ul className="space-y-3 text-white/80">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="font-amadeus text-sm">Navigate through connector menus</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="font-amadeus text-sm">Configure each action manually</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="font-amadeus text-sm">Trial and error approach</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="font-amadeus text-sm">Time: 30-45 minutes</span>
                      </li>
                    </ul>
                  </div>

                  {/* Copilot Way */}
                  <div className="bg-green-900/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                    <div className="flex items-center gap-3 mb-4">
                      <Bot className="text-green-400" size={24} />
                      <h3 className="font-amadeus text-xl font-bold text-white">With Copilot</h3>
                    </div>
                    <ul className="space-y-3 text-white/80">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="font-amadeus text-sm">Describe what you want in plain English</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="font-amadeus text-sm">AI generates the complete flow</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="font-amadeus text-sm">Review and refine suggestions</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="font-amadeus text-sm">Time: 5-10 minutes</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Copilot Example */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="text-yellow-400" size={24} />
                    <h3 className="font-amadeus text-xl font-bold text-white">Copilot Example</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-600/20 rounded-lg p-4 border border-blue-500/30">
                      <div className="text-blue-300 font-bold text-sm mb-2">💬 Your prompt:</div>
                      <p className="font-amadeus text-blue-100 text-sm italic">
                        "Create a flow that monitors our shared mailbox for AUTTP billing reports, extracts the Excel attachments, and saves them to our SharePoint folder with a notification to the finance team."
                      </p>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="flex items-center gap-2 text-purple-400">
                        <div className="animate-spin">⚡</div>
                        <span className="font-amadeus text-sm">AI Processing...</span>
                      </div>
                    </div>

                    <div className="bg-green-600/20 rounded-lg p-4 border border-green-500/30">
                      <div className="text-green-300 font-bold text-sm mb-2">🤖 Copilot generates:</div>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-400" size={16} />
                          <span className="font-amadeus text-green-100 text-sm">Email trigger with AUTTP filter</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-400" size={16} />
                          <span className="font-amadeus text-green-100 text-sm">Get attachment action</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-400" size={16} />
                          <span className="font-amadeus text-green-100 text-sm">Create file in SharePoint</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-400" size={16} />
                          <span className="font-amadeus text-green-100 text-sm">Send Teams notification</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Copilot Screenshots */}
        {stepController.currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-4 py-4"
          >
            {/* COE branding */}
            <div className="absolute left-6 top-6 z-10">
              <img
                src="/images/coe_white_logo.png"
                alt="Center of Excellence"
                className="h-16 w-auto"
              />
            </div>

            {/* Browser Frame - Dynamic size */}
            <div className="max-w-7xl w-full flex flex-col">
              <div className="bg-gray-800 rounded-lg shadow-2xl flex flex-col">
                {/* Browser Header */}
                <div className="bg-gray-700 px-4 py-3 flex items-center justify-between rounded-t-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex-1 mx-4">
                    <div className="bg-gray-600 rounded px-3 py-2 flex items-center text-sm text-gray-300">
                      <Shield className="w-4 h-4 mr-2 text-green-400" />
                      <Globe className="w-4 h-4 mr-2" />
                      <span className="font-mono">make.powerautomate.com</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                    <Monitor className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Browser Content - Dynamic height based on image */}
                <div className="bg-white text-black relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentCopilotScreenshot}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <img
                        src={copilotScreenshots[currentCopilotScreenshot].url}
                        alt={copilotScreenshots[currentCopilotScreenshot].title}
                        className="w-full h-auto max-h-[70vh] object-contain"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const placeholder = target.nextElementSibling as HTMLElement;
                          if (placeholder) placeholder.style.display = 'flex';
                        }}
                      />
                      {/* Fallback placeholder (hidden by default) */}
                      <div style={{ display: 'none' }} className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                        <div className="text-center p-8">
                          <div className="w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                            <Bot className="text-blue-600" size={48} />
                          </div>
                          <h3 className="text-xl font-bold mb-3 text-gray-800">{copilotScreenshots[currentCopilotScreenshot].title}</h3>
                          <p className="text-gray-600 mb-4 max-w-lg text-sm">{copilotScreenshots[currentCopilotScreenshot].description}</p>
                        </div>
                      </div>
                      {/* Overlay with step info - less intrusive */}
                      <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 max-w-2xl">
                        <h3 className="text-lg font-bold mb-2 text-white">{copilotScreenshots[currentCopilotScreenshot].title}</h3>
                        <p className="text-gray-200 text-sm leading-relaxed">{copilotScreenshots[currentCopilotScreenshot].description}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation only */}
                <div className="bg-gray-900 rounded-b-lg p-3">
                  <div className="flex items-center justify-between">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentCopilotScreenshot(Math.max(0, currentCopilotScreenshot - 1))}
                      disabled={currentCopilotScreenshot === 0}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        currentCopilotScreenshot === 0
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      }`}
                    >
                      <ChevronUp className="w-4 h-4" />
                      <span className="font-amadeus text-sm">Previous</span>
                    </button>

                    {/* Step Indicators */}
                    <div className="flex space-x-2">
                      {copilotScreenshots.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentCopilotScreenshot(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentCopilotScreenshot
                              ? 'bg-blue-400 ring-2 ring-blue-300 ring-opacity-50'
                              : 'bg-gray-600 hover:bg-gray-500'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentCopilotScreenshot(Math.min(copilotScreenshots.length - 1, currentCopilotScreenshot + 1))}
                      disabled={currentCopilotScreenshot === copilotScreenshots.length - 1}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        currentCopilotScreenshot === copilotScreenshots.length - 1
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      }`}
                    >
                      <span className="font-amadeus text-sm">Next</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Best Practices */}
        {stepController.currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-8"
          >
            {/* COE branding */}
            <div className="absolute left-6 top-6 z-10">
              <img
                src="/images/coe_white_logo.png"
                alt="Center of Excellence"
                className="h-16 w-auto"
              />
            </div>

            <div className="text-center max-w-7xl w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                <h2 className="font-amadeus text-4xl font-bold text-white mb-4">
                  🛡️ Production Best Practices
                </h2>
                <p className="font-amadeus text-xl text-purple-400">
                  Enterprise-grade patterns for reliable automation
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Target className="text-blue-400" size={28} />,
                    title: 'Error Handling',
                    items: [
                      'Use "Configure run after" settings',
                      'Implement try-catch patterns',
                      'Set up failure notifications',
                      'Log errors to monitoring system'
                    ]
                  },
                  {
                    icon: <Users className="text-green-400" size={28} />,
                    title: 'Governance',
                    items: [
                      'Use consistent naming conventions',
                      'Document flow purpose and contacts',
                      'Implement approval workflows',
                      'Regular access reviews'
                    ]
                  },
                  {
                    icon: <Shield className="text-purple-400" size={28} />,
                    title: 'Security',
                    items: [
                      'Use managed identities where possible',
                      'Avoid hardcoded credentials',
                      'Implement least privilege access',
                      'Encrypt sensitive data'
                    ]
                  },
                  {
                    icon: <RefreshCw className="text-orange-400" size={28} />,
                    title: 'Performance',
                    items: [
                      'Use parallel branches when possible',
                      'Implement pagination for large datasets',
                      'Cache frequently used data',
                      'Monitor execution times'
                    ]
                  },
                  {
                    icon: <Monitor className="text-cyan-400" size={28} />,
                    title: 'Monitoring',
                    items: [
                      'Set up flow analytics',
                      'Create dashboards for key metrics',
                      'Configure alerts for failures',
                      'Regular performance reviews'
                    ]
                  },
                  {
                    icon: <Database className="text-yellow-400" size={28} />,
                    title: 'Data Management',
                    items: [
                      'Validate input data format',
                      'Handle null/empty values',
                      'Implement data retention policies',
                      'Use proper data types'
                    ]
                  }
                ].map((practice, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (index * 0.1), duration: 0.4 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {practice.icon}
                      <h3 className="font-amadeus text-lg font-bold text-white">{practice.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {practice.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="font-amadeus text-white/80 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Troubleshooting & Desktop */}
        {stepController.currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-8"
          >
            {/* COE branding */}
            <div className="absolute left-6 top-6 z-10">
              <img
                src="/images/coe_white_logo.png"
                alt="Center of Excellence"
                className="h-16 w-auto"
              />
            </div>

            <div className="text-center max-w-7xl w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                <h2 className="font-amadeus text-4xl font-bold text-white mb-4">
                  🔧 Troubleshooting & Desktop Automation
                </h2>
                <p className="font-amadeus text-xl text-purple-400">
                  Debug flows and extend automation to desktop applications
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Troubleshooting */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Search className="text-blue-400" size={28} />
                    <h3 className="font-amadeus text-2xl font-bold text-white">Flow Troubleshooting</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-red-600/20 rounded-lg p-4 border border-red-500/30">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="text-red-400" size={20} />
                        <span className="font-amadeus text-red-300 font-bold">Common Issues</span>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2"></div>
                          <span className="font-amadeus text-red-100 text-sm">Authentication failures (401/403)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2"></div>
                          <span className="font-amadeus text-red-100 text-sm">Rate limiting and throttling</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2"></div>
                          <span className="font-amadeus text-red-100 text-sm">Data type mismatches</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2"></div>
                          <span className="font-amadeus text-red-100 text-sm">Timeout errors</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-green-600/20 rounded-lg p-4 border border-green-500/30">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="text-green-400" size={20} />
                        <span className="font-amadeus text-green-300 font-bold">Debug Tools</span>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
                          <span className="font-amadeus text-green-100 text-sm">Flow run history and details</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
                          <span className="font-amadeus text-green-100 text-sm">Test flow with sample data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
                          <span className="font-amadeus text-green-100 text-sm">Connection status monitoring</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
                          <span className="font-amadeus text-green-100 text-sm">Analytics and performance metrics</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Power Automate Desktop */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Laptop className="text-purple-400" size={28} />
                    <h3 className="font-amadeus text-2xl font-bold text-white">Power Automate Desktop</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-purple-600/20 rounded-lg p-4 border border-purple-500/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="text-purple-400" size={20} />
                        <span className="font-amadeus text-purple-300 font-bold">Use Cases</span>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"></div>
                          <span className="font-amadeus text-purple-100 text-sm">Legacy application automation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"></div>
                          <span className="font-amadeus text-purple-100 text-sm">File system operations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"></div>
                          <span className="font-amadeus text-purple-100 text-sm">Screen scraping and UI automation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"></div>
                          <span className="font-amadeus text-purple-100 text-sm">Desktop app integration</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-600/20 rounded-lg p-4 border border-blue-500/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Cloud className="text-blue-400" size={20} />
                        <span className="font-amadeus text-blue-300 font-bold">Cloud + Desktop</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-500 rounded-lg p-2">
                            <Cloud className="text-white" size={16} />
                          </div>
                          <ArrowRight className="text-blue-400" size={16} />
                          <div className="bg-purple-500 rounded-lg p-2">
                            <Laptop className="text-white" size={16} />
                          </div>
                          <span className="font-amadeus text-blue-100 text-sm">Trigger desktop actions from cloud</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-purple-500 rounded-lg p-2">
                            <Laptop className="text-white" size={16} />
                          </div>
                          <ArrowRight className="text-blue-400" size={16} />
                          <div className="bg-blue-500 rounded-lg p-2">
                            <Cloud className="text-white" size={16} />
                          </div>
                          <span className="font-amadeus text-blue-100 text-sm">Send desktop data to cloud flows</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Quick Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-8 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <h4 className="font-amadeus text-lg font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
                  <Book className="text-cyan-400" size={20} />
                  Quick Reference
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-cyan-400 font-bold mb-1">Debug</div>
                    <div className="font-amadeus text-white/80 text-sm">Check run history first</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-bold mb-1">Test</div>
                    <div className="font-amadeus text-white/80 text-sm">Always test with sample data</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 font-bold mb-1">Desktop</div>
                    <div className="font-amadeus text-white/80 text-sm">Bridge cloud and legacy systems</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};