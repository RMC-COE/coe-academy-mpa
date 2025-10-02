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
  CheckCircle2,
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
  ArrowLeft
} from 'lucide-react';

export const FlowBuilder = ({ resetSignal }: SectionProps) => {
  const { stepMode, stepSignal, setIsLastStep } = usePresentation();
  const [selectedConnector, setSelectedConnector] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
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
    autoAdvance: !stepMode,
    stepDuration: 10000,
    onLastStepChange: setIsLastStep
  });

  // Simplified AUTTP flow steps
  const flowSteps = [
    {
      id: 'trigger',
      title: 'Email Trigger',
      connector: 'Outlook',
      icon: Mail,
      color: 'from-blue-500 to-blue-600',
      description: 'When a new email arrives with AUTTP attachment',
      config: {
        subject: 'Contains "AUTTP"',
        hasAttachment: 'Yes',
        mailbox: 'Shared mailbox'
      }
    },
    {
      id: 'attachment',
      title: 'Get Attachment',
      connector: 'Files',
      icon: Download,
      color: 'from-green-500 to-green-600',
      description: 'Extract the Excel file from email',
      config: {
        fileType: '*.xlsx',
        saveLocation: 'Temp folder',
        validation: 'Check file format'
      }
    },
    {
      id: 'process',
      title: 'Process Data',
      connector: 'Excel/Script',
      icon: FileSpreadsheet,
      color: 'from-purple-500 to-purple-600',
      description: 'Extract data from regional sheets',
      config: {
        sheets: 'Gulf, Egypt, Iraq, Algeria...',
        extractFields: 'Unit Price, Comments',
        validation: 'Check for missing values'
      }
    },
    {
      id: 'save',
      title: 'Save Results',
      connector: 'SharePoint',
      icon: Database,
      color: 'from-orange-500 to-orange-600',
      description: 'Create/update the Manual File',
      config: {
        location: 'Manual Files folder',
        filename: 'AUTTP Manual File {YYYY-MM}',
        append: 'To Sheet1'
      }
    },
    {
      id: 'notify',
      title: 'Send Notification',
      connector: 'Teams/Email',
      icon: MessageCircle,
      color: 'from-teal-500 to-teal-600',
      description: 'Alert user and log activity',
      config: {
        recipients: 'SME team',
        include: 'Summary & file link',
        log: 'SharePoint audit list'
      }
    }
  ];

  const connectorCategories = [
    {
      category: 'Communication',
      connectors: [
        { name: 'Outlook', icon: Mail, color: 'from-blue-500 to-blue-600', popular: true },
        { name: 'Teams', icon: MessageCircle, color: 'from-purple-500 to-purple-600', popular: true }
      ]
    },
    {
      category: 'Data & Files',
      connectors: [
        { name: 'Excel Online', icon: FileSpreadsheet, color: 'from-green-500 to-green-600', popular: true },
        { name: 'SharePoint', icon: Database, color: 'from-orange-500 to-orange-600', popular: true }
      ]
    },
    {
      category: 'Automation',
      connectors: [
        { name: 'Office Scripts', icon: Code, color: 'from-indigo-500 to-indigo-600', popular: false },
        { name: 'HTTP', icon: Zap, color: 'from-yellow-500 to-yellow-600', popular: false }
      ]
    }
  ];

  // Screenshots for step 3
  const screenshots = [
    {
      id: 'step1',
      title: 'Power Automate Home',
      description: 'Navigate to make.powerautomate.com and start creating your automation',
      url: '/images/screenshots/power-automate-1.png'
    },
    {
      id: 'step2',
      title: 'Creating a New Flow',
      description: 'Select "Create" to start a new automated flow',
      url: '/images/screenshots/power-automate-2.png'
    },
    {
      id: 'step3',
      title: 'Setting up Email Trigger',
      description: 'Configure the conditions that will trigger your flow automatically',
      url: '/images/screenshots/power-automate-3.png'
    }
  ];

  // Reset states when step changes
  useEffect(() => {
    if (stepController.currentStep === 4) {
      setActiveStep(null);
    }
  }, [stepController.currentStep]);

  // Handle blueprint sub-steps
  useEffect(() => {
    if (stepController.currentStep === 2) {
      if (!stepMode) {
        // Auto-advance sub-steps
        const interval = setInterval(() => {
          setBlueprintSubStep((prev) => {
            if (prev < blueprintComponents.length - 1) {
              return prev + 1;
            }
            return prev;
          });
        }, 3000);

        return () => clearInterval(interval);
      }
    } else {
      // Reset sub-step when leaving step 2
      setBlueprintSubStep(0);
    }
  }, [stepController.currentStep, stepMode, blueprintComponents.length]);

  // Handle keyboard navigation for blueprint sub-steps
  useEffect(() => {
    if (stepController.currentStep === 2 && stepMode) {
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
  }, [stepController.currentStep, stepMode, blueprintComponents.length]);

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
        {/* Step 0: Main Title */}
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
            <div className="text-center max-w-4xl">
              <h2 className="font-amadeus text-5xl font-bold text-white mb-6">
                Designing Our First Flow
              </h2>
              <h3 className="font-amadeus text-3xl text-purple-400 mb-20">From problem to automated solution</h3>

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
                    Learn how to transform manual processes into automated workflows.
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
                    Explore real case studies and practical implementation steps.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex items-start gap-6 text-left max-w-3xl mx-auto"
                >
                  <div className="text-purple-400 mt-1">
                    <div className="w-1 h-12 bg-purple-400 rounded-full"></div>
                  </div>
                  <p className="font-amadeus text-2xl text-white/80 leading-relaxed">
                    Build your first automation using the AUTTP case study.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 1: The Real Problem */}
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
                src="/images/coe_white_logo.png"
                alt="Center of Excellence"
                className="h-16 w-auto"
              />
            </div>
            <h2 className="font-amadeus text-5xl font-bold text-white text-center mb-20">
              The Real Problem
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
              {/* Current Manual Process */}
              <div className="bg-red-900/20 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <Clock size={24} className="text-red-400" />
                  </div>
                  <h3 className="font-amadeus text-2xl font-bold text-white">
                    Current Manual Process
                  </h3>
                </div>
                <ul className="space-y-4 text-white/80">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Wait for monthly AUTTP file via email</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Download and open Excel file manually</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Extract data from 12+ regional sheets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Consolidate information manually</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Create file for billing team</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-red-800/30 rounded-lg">
                  <div className="text-red-300 text-lg font-bold">⏱️ 2 hours/month</div>
                  <div className="text-red-200 text-sm">Total time invested</div>
                </div>
              </div>

              {/* The Automated Vision */}
              <div className="bg-green-900/20 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Zap size={24} className="text-green-400" />
                  </div>
                  <h3 className="font-amadeus text-2xl font-bold text-white">
                    The Automated Vision
                  </h3>
                </div>
                <ul className="space-y-4 text-white/80">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Automatic AUTTP email detection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Data extraction without intervention</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Automatic regional consolidation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Automatic final file generation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Automatic delivery to billing team</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-green-800/30 rounded-lg">
                  <div className="text-green-300 text-lg font-bold">⚡ 5 minutes</div>
                  <div className="text-green-200 text-sm">Flow development time</div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 bg-blue-600/20 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-500/30">
                <Target size={20} className="text-blue-400" />
                <span className="font-amadeus text-white font-medium">
                  Goal: Transform 2 manual hours into complete automation
                </span>
              </div>
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
                src="/images/coe_white_logo.png"
                alt="Center of Excellence"
                className="h-16 w-auto"
              />
            </div>
            <h2 className="font-amadeus text-5xl font-bold text-white text-center mb-8">
              Designing the Workflow Blueprint
            </h2>
            <p className="font-amadeus text-xl text-white/70 text-center mb-16 max-w-4xl">
              Planning our automation schema before implementation • Technical specifications for each component
            </p>

            <div className="relative max-w-6xl w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10">

                <div className="flex items-center justify-between mb-12">
                  <h3 className="font-amadeus text-2xl text-white/80">AUTTP Automation Schema</h3>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Target size={16} />
                    <span>Component {blueprintSubStep + 1} of {blueprintComponents.length}</span>
                  </div>
                </div>

                {/* Workflow Overview - All components in a row */}
                <div className="flex items-center justify-center mb-12">
                  {blueprintComponents.map((component, index) => (
                    <div key={component.name} className="flex items-center">
                      <motion.div
                        animate={{
                          scale: index === blueprintSubStep ? 1.1 : 0.9,
                          opacity: index <= blueprintSubStep ? 1 : 0.4
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                      >
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl mx-auto bg-gradient-to-br ${component.color} shadow-lg ${index === blueprintSubStep ? 'ring-4 ring-white/30' : ''}`}>
                          {component.icon}
                        </div>
                        <p className="font-amadeus text-xs font-bold text-white/90 mt-2">{component.name}</p>
                      </motion.div>

                      {/* Connection arrow */}
                      {index < blueprintComponents.length - 1 && (
                        <motion.div
                          animate={{
                            opacity: index < blueprintSubStep ? 1 : 0.3
                          }}
                          className="w-8 h-0.5 bg-gradient-to-r from-white/60 to-white/30 mx-4"
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
                    <div className="mb-6">
                      <h3 className="font-amadeus text-3xl font-bold text-white">
                        {blueprintComponents[blueprintSubStep].name}
                      </h3>
                    </div>

                    {/* Technical Specifications */}
                    <div className="max-w-2xl mx-auto">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                        <h4 className="font-amadeus text-xl font-bold text-white/90 mb-6 flex items-center justify-center gap-3">
                          <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                          Technical Specifications
                          <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {blueprintComponents[blueprintSubStep].specs.map((spec, specIndex) => (
                            <motion.div
                              key={specIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: specIndex * 0.2, duration: 0.4 }}
                              className="flex items-center gap-3 bg-white/5 rounded-lg p-4"
                            >
                              <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                              <span className="font-amadeus text-sm text-white/80 font-medium">{spec}</span>
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
                  className="mt-12 text-center"
                >
                  <div className="inline-flex items-center gap-3 bg-blue-600/20 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-500/30">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="font-amadeus text-white/90 text-sm font-medium">
                      {stepMode ? 'Use arrow keys to navigate components' : 'Components will advance automatically'}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Power Automate Flow Creation */}
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
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation only */}
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