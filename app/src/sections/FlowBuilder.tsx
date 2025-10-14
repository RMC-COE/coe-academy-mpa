import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Mail,
  FileSpreadsheet,
  Database,
  MessageCircle,
  Play,
  ArrowRight,
  Zap,
  Download,
  Code,
  Save,
  Send,
  Target,
  MousePointer,
  Sparkles,
  RefreshCw,
  Clock,
  ChevronUp,
  ChevronDown,
  Globe,
  Shield,
  Monitor,
  ArrowLeft,
  TrendingDown,
  Award
} from 'lucide-react';
import { logos } from '@/utils/assets';

export const FlowBuilder = ({ resetSignal }: SectionProps) => {
  const { stepMode, stepSignal, setIsLastStep } = usePresentation();
  const [blueprintSubStep, setBlueprintSubStep] = useState<number>(0);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  // Blueprint workflow components
  const blueprintComponents = [
    {
      name: 'Email Trigger',
      icon: '📧',
      color: 'from-blue-500 to-blue-600',
      specs: [
        'Subject: "AUTT billing report*"',
        'Attachment: Required',
        'Mailbox: Team shared',
        'Frequency: Monthly'
      ]
    },
    {
      name: 'Extract Data',
      icon: '📊',
      color: 'from-green-500 to-green-600',
      specs: [
        'Sheets: Gulf, Egypt, Iraq, Algeria',
        'Cell J7: Total amount',
        'Cell G10: Comment',
        'Format: Excel (.xlsx)'
      ]
    },
    {
      name: 'Paste Data',
      icon: '📁',
      color: 'from-orange-500 to-orange-600',
      specs: [
        'Location: SharePoint folder',
        'File: Monthly_{YYYY-MM}.xlsx',
        'Action: Create if not exists',
        'Access: Team permissions'
      ]
    },
    {
      name: 'Notify & Log',
      icon: '✅',
      color: 'from-purple-500 to-purple-600',
      specs: [
        'Email: Process owner',
        'Log: SharePoint audit folder',
        'Data: Timestamp, status, KPIs',
        'Backup: Error handling'
      ]
    }
  ];

  const stepController = useStepController({
    totalSteps: 4,
    resetSignal,
    stepSignal,
    autoAdvance: false,
    stepDuration: 10000,
    onLastStepChange: setIsLastStep
  });

  // Screenshots for step 3 (The Flow) - Generate all 10 automatically
  const generateScreenshots = () => {
    const stepTitles = [
      'Accessing Power Automate',
      'Choosing flow creation method',
      'Setting up the initial trigger',
      'Configuring email trigger settings',
      'Applying advanced email filters',
      'Adding the first action',
      'Selecting the right connector',
      'Configuring action parameters',
      'Adding conditional logic',
      'Saving and testing the flow'
    ];

    const stepDescriptions = [
      'Navigate to make.powerautomate.com to start creating your automated flow',
      'Choose "Automated cloud flow" from the available flow creation options',
      'Set up the event that will automatically trigger your flow execution',
      'Define specific parameters for the email trigger including mailbox and conditions',
      'Apply specific filters such as subject containing "AUTTP" and attachment requirements',
      'Add the first action that will execute when the trigger fires',
      'Choose the appropriate connector for your automation needs',
      'Configure the specific parameters and settings for the selected action',
      'Implement conditional logic to control the flow execution path',
      'Save your configuration and test the automated flow before deployment'
    ];

    return Array.from({ length: 10 }, (_, index) => ({
      id: `step${index + 1}`,
      title: stepTitles[index],
      description: stepDescriptions[index],
      url: `${import.meta.env.BASE_URL}images/screenshots/power-automate-${index + 1}.png`
    }));
  };

  const screenshots = generateScreenshots();

  // Reset blueprint sub-step when leaving step 2
  useEffect(() => {
    if (stepController.currentStep !== 2) {
      setBlueprintSubStep(0);
    }
  }, [stepController.currentStep]);

  // Handle keyboard navigation for blueprint sub-steps - Always enabled
  useEffect(() => {
    if (stepController.currentStep === 2) {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          setBlueprintSubStep(prev => Math.min(prev + 1, blueprintComponents.length - 1));
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          setBlueprintSubStep(prev => Math.max(prev - 1, 0));
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [stepController.currentStep, blueprintComponents.length]);

  // Handle keyboard navigation for screenshots in step 3
  useEffect(() => {
    if (stepController.currentStep === 3) {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp' && currentScreenshot > 0) {
          setCurrentScreenshot(currentScreenshot - 1);
        } else if (event.key === 'ArrowDown' && currentScreenshot < screenshots.length - 1) {
          setCurrentScreenshot(currentScreenshot + 1);
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    } else {
      // Reset screenshot when leaving step 3
      setCurrentScreenshot(0);
    }
  }, [stepController.currentStep, currentScreenshot, screenshots.length]);

  const currentStep = stepController.currentStep;

  return (
    <div className="relative h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 overflow-hidden">
      {/* Static background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid-flow" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="currentColor" className="text-white/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-flow)" />
        </svg>
      </div>

      {/* Step Progress Indicator */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-2">
          {[...Array(4)].map((_, index) => (
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
        {/* Step 0: Title Slide - Anatomy of an Automated Solution */}
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
                src={logos.coeWhite}
                alt="Center of Excellence"
                className="h-16 w-auto"
              />
            </div>

            <div className="text-center">
              <h1 className="font-amadeus text-5xl md:text-6xl font-bold text-white mb-6">
                Anatomy of an Automated Solution
              </h1>
              <p className="font-amadeus text-2xl text-purple-300">
                From manual process to automated flow
              </p>
            </div>
          </motion.div>
        )}

        {/* Step 1: The Problem - AUTTP Case Study */}
        {stepController.currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-12"
          >
            {/* COE branding */}
            <div className="absolute left-6 top-6 z-10">
              <img
                src={logos.coeWhite}
                alt="Center of Excellence"
                className="h-16 w-auto"
              />
            </div>

            <div className="text-center mb-10">
              <h2 className="font-amadeus text-4xl md:text-5xl font-bold text-white mb-3">
                The Problem
              </h2>
              <p className="font-amadeus text-lg text-purple-300">
                AUTTP case study: Manual vs Automated
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mb-8">
              {/* Current Manual Process */}
              <div className="bg-red-900/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <Clock size={20} className="text-red-400" />
                  </div>
                  <h3 className="font-amadeus text-xl font-bold text-white">
                    The Manual Process
                  </h3>
                </div>
                <ul className="space-y-3 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Wait for monthly AUTTP file via email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Download and open Excel file manually</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Extract data from 12+ regional sheets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Consolidate information manually</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Create file for billing team</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-red-800/30 rounded-lg">
                  <div className="text-red-300 text-base font-bold">⏱️ 15-20 minutes</div>
                  <div className="text-red-200 text-xs">Manual processing time</div>
                </div>
              </div>

              {/* The Automated Solution */}
              <div className="bg-green-900/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Zap size={20} className="text-green-400" />
                  </div>
                  <h3 className="font-amadeus text-xl font-bold text-white">
                    The Automated Solution
                  </h3>
                </div>
                <ul className="space-y-3 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Automatic AUTTP email detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Data extraction without intervention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Automatic regional consolidation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Automatic final file generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Automatic delivery to billing team</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-green-800/30 rounded-lg">
                  <div className="text-green-300 text-base font-bold">⚡ 30 seconds</div>
                  <div className="text-green-200 text-xs">Automated processing time</div>
                </div>
              </div>
            </div>

            {/* Impact Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-sm px-5 py-3 rounded-full border border-blue-500/40">
              <Award size={18} className="text-yellow-400" />
              <span className="font-amadeus text-white font-medium text-sm">
                98% time reduction • From 20 min to 30 sec
              </span>
            </div>
          </motion.div>
        )}

        {/* Step 2: The Blueprint */}
        {stepController.currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-12"
          >
            {/* COE branding */}
            <div className="absolute left-6 top-6 z-10">
              <img
                src={logos.coeWhite}
                alt="Center of Excellence"
                className="h-16 w-auto"
              />
            </div>
            <h2 className="font-amadeus text-3xl font-bold text-white text-center mb-4">
              The Blueprint
            </h2>
            <p className="font-amadeus text-base text-white/70 text-center mb-8 max-w-3xl">
              Planning our automation schema before implementation • Technical specifications for each component
            </p>

            <div className="relative max-w-5xl w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">

                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-amadeus text-lg text-white/80">AUTTP Automation Schema</h3>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Target size={14} />
                    <span>Component {blueprintSubStep + 1} of {blueprintComponents.length}</span>
                  </div>
                </div>

                {/* Workflow Overview - All components in a row */}
                <div className="flex items-center justify-center mb-8">
                  {blueprintComponents.map((component, index) => (
                    <div key={component.name} className="flex items-center">
                      <motion.div
                        animate={{
                          scale: index === blueprintSubStep ? 1.05 : 0.9,
                          opacity: index <= blueprintSubStep ? 1 : 0.4
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                      >
                        <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-xl mx-auto bg-gradient-to-br ${component.color} shadow-lg ${index === blueprintSubStep ? 'ring-3 ring-white/30' : ''}`}>
                          {component.icon}
                        </div>
                        <p className="font-amadeus text-[10px] font-bold text-white/90 mt-1.5">{component.name}</p>
                      </motion.div>

                      {/* Connection arrow */}
                      {index < blueprintComponents.length - 1 && (
                        <motion.div
                          animate={{
                            opacity: index < blueprintSubStep ? 1 : 0.3
                          }}
                          className="w-6 h-0.5 bg-gradient-to-r from-white/60 to-white/30 mx-3"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Current Component Details */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={blueprintSubStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    {/* Component Name Only */}
                    <div className="mb-4">
                      <h3 className="font-amadeus text-2xl font-bold text-white">
                        {blueprintComponents[blueprintSubStep].name}
                      </h3>
                    </div>

                    {/* Technical Specifications */}
                    <div className="max-w-xl mx-auto">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h4 className="font-amadeus text-base font-bold text-white/90 mb-4 flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          Technical Specifications
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {blueprintComponents[blueprintSubStep].specs.map((spec, specIndex) => (
                            <motion.div
                              key={specIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: specIndex * 0.2, duration: 0.4 }}
                              className="flex items-center gap-2 bg-white/5 rounded-lg p-3"
                            >
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></div>
                              <span className="font-amadeus text-xs text-white/80 font-medium">{spec}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-8 text-center"
                >
                  <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="font-amadeus text-white/90 text-xs font-medium">
                      Use arrow keys to navigate components
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: The Flow - Real Implementation */}
        {stepController.currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-4 py-4"
          >
            {/* COE branding */}
            <div className="absolute left-6 top-6 z-10">
              <img
                src={logos.coeWhite}
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
                      key={currentScreenshot}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <img
                        src={screenshots[currentScreenshot].url}
                        alt={screenshots[currentScreenshot].title}
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
                            <span className="text-6xl">📸</span>
                          </div>
                          <h3 className="text-xl font-bold mb-3 text-gray-800">{screenshots[currentScreenshot].title}</h3>
                          <p className="text-gray-600 mb-4 max-w-lg text-sm">{screenshots[currentScreenshot].description}</p>
                        </div>
                      </div>
                      {/* Overlay with step info - less intrusive */}
                      <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 max-w-2xl">
                        <h3 className="text-lg font-bold mb-2 text-white">{screenshots[currentScreenshot].title}</h3>
                        <p className="text-gray-200 text-sm leading-relaxed">{screenshots[currentScreenshot].description}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation only - Session 2 CTA removed */}
                <div className="bg-gray-900 rounded-b-lg p-3">
                  <div className="flex items-center justify-between">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentScreenshot(Math.max(0, currentScreenshot - 1))}
                      disabled={currentScreenshot === 0}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        currentScreenshot === 0
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      }`}
                    >
                      <ChevronUp className="w-4 h-4" />
                      <span className="font-amadeus text-sm">Previous</span>
                    </button>

                    {/* Step Indicators */}
                    <div className="flex space-x-2">
                      {screenshots.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentScreenshot(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentScreenshot
                              ? 'bg-blue-400 ring-2 ring-blue-300 ring-opacity-50'
                              : 'bg-gray-600 hover:bg-gray-500'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentScreenshot(Math.min(screenshots.length - 1, currentScreenshot + 1))}
                      disabled={currentScreenshot === screenshots.length - 1}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        currentScreenshot === screenshots.length - 1
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

      </AnimatePresence>
    </div>
  );
};
