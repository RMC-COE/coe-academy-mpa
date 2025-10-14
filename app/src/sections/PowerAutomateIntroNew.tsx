import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { motion } from 'framer-motion';
import React from 'react';
import {
  Zap,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Users,
  Clock,
  Shield,
  Cpu,
  Mail,
  FileSpreadsheet,
  Database,
  Target,
  Send,
  Code,
  MousePointer,
  MessageCircle
} from 'lucide-react';
import { logos } from '@/utils/assets';

export const PowerAutomateIntroNew = ({ resetSignal }: SectionProps) => {
  const { stepMode, stepSignal, setIsLastStep } = usePresentation();
  
  const stepController = useStepController({
    totalSteps: 8,
    resetSignal,
    stepSignal,
    autoAdvance: false,
    stepDuration: 5000,
    onLastStepChange: setIsLastStep
  });

  const capabilities = [
    {
      icon: Users,
      title: "Citizen Development",
      description: "You build it, you own it",
      gradient: "from-blue-500 to-indigo-600",
      detail: "Finance professionals can build their own solutions"
    },
    {
      icon: Clock,
      title: "Instant Automation",
      description: "Build in a day avoiding development backlogs",
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
      description: "Copilot as your partner planning flow logics",
      gradient: "from-orange-500 to-red-600",
      detail: "AI helps build better flows faster"
    }
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
          {[...Array(8)].map((_, index) => (
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
          src={logos.coeWhite}
          alt="Center of Excellence"
          className="h-16 w-auto"
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
                Automate your work, transform your future
              </motion.p>
            </div>
          </motion.div>
        )}
        
        {/* Step 1: Why This Matters to You */}
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
              <h3 className="font-amadeus text-3xl text-purple-400 mb-20">Why This Matters to You</h3>

              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex items-start gap-6 text-left max-w-3xl mx-auto"
                >
                  <div className="text-purple-400 mt-1">
                    <ArrowRight size={32} className="text-purple-400" />
                  </div>
                  <p className="font-amadeus text-2xl text-white/80 leading-relaxed">
                    Reclaim 5-10 hours per week from repetitive tasks
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex items-start gap-6 text-left max-w-3xl mx-auto"
                >
                  <div className="text-purple-400 mt-1">
                    <ArrowRight size={32} className="text-purple-400" />
                  </div>
                  <p className="font-amadeus text-2xl text-white/80 leading-relaxed">
                    Build solutions without waiting for others to do it for you
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
            <h2 className="font-amadeus text-5xl font-bold text-white text-center mb-16">
              What is Power Automate?
            </h2>

            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative mb-12"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10 text-center">
                  <p className="font-amadeus text-2xl text-white/90 leading-relaxed mb-6">
                    A <span className="text-blue-400 font-bold">workflow automation platform</span> that
                    <span className="text-purple-400 font-bold"> connects your daily tools</span> and eliminates repetitive work.
                  </p>
                  <p className="font-amadeus text-lg text-white/70">
                    Built for you to automate the tasks that consume your day
                  </p>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-teal-600/20 blur-2xl"></div>
                  <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center">
                        <Mail size={28} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-amadeus text-xl font-bold text-white">Email Approvals</h3>
                        <p className="font-amadeus text-sm text-white/60">Outlook → SharePoint → Teams</p>
                      </div>
                    </div>
                    <p className="font-amadeus text-sm text-white/70">
                      Invoice arrives by email → Extract attachment → Save to SharePoint → Request approval → Notify team on Teams
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-600/20 blur-2xl"></div>
                  <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                        <FileSpreadsheet size={28} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-amadeus text-xl font-bold text-white">Data Consolidation</h3>
                        <p className="font-amadeus text-sm text-white/60">SAP → Excel → SharePoint</p>
                      </div>
                    </div>
                    <p className="font-amadeus text-sm text-white/70">
                      Extract SAP report daily → Transform data in Excel → Update SharePoint list → Generate summary for management
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-12 text-center bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
              >
                <p className="font-amadeus text-lg text-white/90 mb-2">
                  🔗 Connect the tools <span className="text-blue-400 font-bold">you already use every day</span>
                </p>
                <p className="font-amadeus text-sm text-white/70">
                  SAP, Excel, Outlook, Teams, SharePoint, Workday, Coupa, and 500+ more
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 4: What can you do with Power Automate? */}
        {stepController.currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-12 py-12"
          >
            <h2 className="font-amadeus text-5xl font-bold text-white text-center mb-6">
              What can you do with Power Automate?
            </h2>

            <div className="max-w-6xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-10"
              >
                <p className="font-amadeus text-lg text-white/80 max-w-4xl mx-auto leading-relaxed">
                  Connect any tool, automate any process, save hours every week
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-pink-600/20 blur-2xl"></div>
                  <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center">
                        <Zap size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-amadeus text-lg font-bold text-white">Instant Notifications</h3>
                        <p className="font-amadeus text-xs text-white/60">High-priority alerts</p>
                      </div>
                    </div>
                    <p className="font-amadeus text-sm text-white/80 mb-4 leading-relaxed flex-1">
                      When SAP billing error occurs, automatically send a Teams alert to CF.AIR lead for immediate triage and resolution.
                    </p>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="font-amadeus text-xs text-white/70">Example: SAP error → Teams alert to lead</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 blur-2xl"></div>
                  <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                        <FileSpreadsheet size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-amadeus text-lg font-bold text-white">Data Collection</h3>
                        <p className="font-amadeus text-xs text-white/60">Track & analyze</p>
                      </div>
                    </div>
                    <p className="font-amadeus text-sm text-white/80 mb-4 leading-relaxed flex-1">
                      Monitor SAP report generation and automatically save to SharePoint, tracking metrics for month-end analysis.
                    </p>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="font-amadeus text-xs text-white/70">Example: SAP reports → SharePoint tracking</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20 blur-2xl"></div>
                  <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                        <Database size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-amadeus text-lg font-bold text-white">File Management</h3>
                        <p className="font-amadeus text-xs text-white/60">Sync & organize</p>
                      </div>
                    </div>
                    <p className="font-amadeus text-sm text-white/80 mb-4 leading-relaxed flex-1">
                      Invoice arrives by email, automatically extract attachment, save to SharePoint, and log in tracking system.
                    </p>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="font-amadeus text-xs text-white/70">Example: Email invoice → SharePoint + logging</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-violet-600/20 blur-2xl"></div>
                  <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center">
                        <Users size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-amadeus text-lg font-bold text-white">Approval Workflows</h3>
                        <p className="font-amadeus text-xs text-white/60">Streamline decisions</p>
                      </div>
                    </div>
                    <p className="font-amadeus text-sm text-white/80 mb-4 leading-relaxed flex-1">
                      Manual billing load request triggers Adaptive Card approval to team lead. 4-eyes validation flow already live!
                    </p>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="font-amadeus text-xs text-white/70">Example: Manual billing → Adaptive Card approval</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 5: Triggers and Actions */}
        {stepController.currentStep === 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-12 py-8"
          >
            <h2 className="font-amadeus text-4xl font-bold text-white text-center mb-12">
              Every Flow has Two Parts
            </h2>

            <div className="grid grid-cols-2 gap-10 max-w-6xl w-full mb-8">
              {/* Triggers Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 blur-3xl"></div>
                <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 h-full">
                  <div className="text-center mb-6">
                    <h3 className="font-amadeus text-2xl font-bold text-white mb-2">Triggers</h3>
                    <p className="font-amadeus text-sm text-white/70">The starting action for your flow</p>
                  </div>

                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/5 rounded-xl p-3 border border-white/20"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Mail size={18} className="text-blue-400" />
                        <span className="font-amadeus font-bold text-white text-sm">When email arrives</span>
                      </div>
                      <p className="font-amadeus text-xs text-white/60">New message with specific subject</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white/5 rounded-xl p-3 border border-white/20"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <FileSpreadsheet size={18} className="text-green-400" />
                        <span className="font-amadeus font-bold text-white text-sm">When file is created</span>
                      </div>
                      <p className="font-amadeus text-xs text-white/60">New item added to SharePoint</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="bg-white/5 rounded-xl p-3 border border-white/20"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Clock size={18} className="text-purple-400" />
                        <span className="font-amadeus font-bold text-white text-sm">On a schedule</span>
                      </div>
                      <p className="font-amadeus text-xs text-white/60">Daily, weekly, or monthly</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Actions Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-3xl"></div>
                <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 h-full">
                  <div className="text-center mb-6">
                    <h3 className="font-amadeus text-2xl font-bold text-white mb-2">Actions</h3>
                    <p className="font-amadeus text-sm text-white/70">What happens when triggered</p>
                  </div>

                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white/5 rounded-xl p-3 border border-white/20"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Send size={18} className="text-blue-400" />
                        <span className="font-amadeus font-bold text-white text-sm">Send notification</span>
                      </div>
                      <p className="font-amadeus text-xs text-white/60">Email, Teams, or mobile alert</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="bg-white/5 rounded-xl p-3 border border-white/20"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Database size={18} className="text-orange-400" />
                        <span className="font-amadeus font-bold text-white text-sm">Create file</span>
                      </div>
                      <p className="font-amadeus text-xs text-white/60">Save to OneDrive or SharePoint</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="bg-white/5 rounded-xl p-3 border border-white/20"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Users size={18} className="text-green-400" />
                        <span className="font-amadeus font-bold text-white text-sm">Start approval</span>
                      </div>
                      <p className="font-amadeus text-xs text-white/60">Request manager approval</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-gradient-to-br from-green-600/10 to-teal-600/10 backdrop-blur-md rounded-2xl p-5 border border-green-500/30 max-w-5xl"
            >
              <div className="text-center mb-4">
                <p className="font-amadeus text-lg text-white/90 font-bold">
                  💡 Example Flow
                </p>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <FileSpreadsheet size={16} className="text-blue-400" />
                    <span className="font-amadeus font-bold text-white text-xs">TRIGGER</span>
                  </div>
                  <p className="font-amadeus text-xs text-white/80">When a new manual billing file is uploaded to SharePoint</p>
                </div>

                <ArrowRight size={20} className="text-white/40 flex-shrink-0" />

                <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Users size={16} className="text-purple-400" />
                    <span className="font-amadeus font-bold text-white text-xs">ACTION 1</span>
                  </div>
                  <p className="font-amadeus text-xs text-white/80">Send approval request to team lead via Adaptive Card</p>
                </div>

                <ArrowRight size={20} className="text-white/40 flex-shrink-0" />

                <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Database size={16} className="text-orange-400" />
                    <span className="font-amadeus font-bold text-white text-xs">ACTION 2</span>
                  </div>
                  <p className="font-amadeus text-xs text-white/80">If approved, log entry in Month-End App</p>
                </div>

                <ArrowRight size={20} className="text-white/40 flex-shrink-0" />

                <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail size={16} className="text-green-400" />
                    <span className="font-amadeus font-bold text-white text-xs">ACTION 3</span>
                  </div>
                  <p className="font-amadeus text-xs text-white/80">Send confirmation email to uploader</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="mt-6 text-center bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 max-w-4xl"
            >
              <p className="font-amadeus text-base text-white/90 mb-1">
                ⚡ Every flow has <span className="text-blue-400 font-bold">one trigger</span> and <span className="text-purple-400 font-bold">one or more actions</span>
              </p>
              <p className="font-amadeus text-xs text-white/70">
                Connect any trigger to any action across 500+ services
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Step 6: Where to Create Flows */}
        {stepController.currentStep === 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full px-12"
          >
            <h2 className="font-amadeus text-5xl font-bold text-white text-center mb-20">
              Where to Create Flows
            </h2>

            <div className="grid grid-cols-3 gap-8 max-w-6xl w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/30 to-emerald-600/30 blur-2xl"></div>
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center h-full flex flex-col">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MousePointer size={32} className="text-white" />
                  </div>
                  <div className="mb-2">
                    <span className="font-amadeus text-xs font-bold text-green-400 bg-green-500/20 px-3 py-1 rounded-full">EASIEST</span>
                  </div>
                  <h3 className="font-amadeus text-xl font-bold text-white mb-4">Templates</h3>
                  <p className="font-amadeus text-sm text-white/70 mb-4 flex-1">
                    Start with 500+ pre-built templates for common Finance scenarios
                  </p>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="font-amadeus text-xs text-white/80">Browse → Customize → Deploy</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 blur-2xl"></div>
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center h-full flex flex-col">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FileSpreadsheet size={32} className="text-white" />
                  </div>
                  <div className="mb-2">
                    <span className="font-amadeus text-xs font-bold text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full">MEDIUM</span>
                  </div>
                  <h3 className="font-amadeus text-xl font-bold text-white mb-4">From Your Apps</h3>
                  <p className="font-amadeus text-sm text-white/70 mb-4 flex-1">
                    Build flows directly from Excel, SharePoint, Teams—right where you work
                  </p>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="font-amadeus text-xs text-white/80">Automate → Create flow</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-indigo-600/30 blur-2xl"></div>
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center h-full flex flex-col">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Code size={32} className="text-white" />
                  </div>
                  <div className="mb-2">
                    <span className="font-amadeus text-xs font-bold text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">ADVANCED</span>
                  </div>
                  <h3 className="font-amadeus text-xl font-bold text-white mb-4">Power Automate Portal</h3>
                  <p className="font-amadeus text-sm text-white/70 mb-4 flex-1">
                    Full builder interface for complex multi-step automations
                  </p>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="font-amadeus text-xs text-white/80">make.powerautomate.com</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 text-center bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-w-4xl"
            >
              <p className="font-amadeus text-lg text-white/90 mb-2">
                🚀 Start with templates, grow into custom flows
              </p>
              <p className="font-amadeus text-sm text-white/70">
                All paths lead to the same powerful automation capabilities
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Step 7: The Power of Automation */}
        {stepController.currentStep === 7 && (
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
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10 text-center h-full flex flex-col">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="inline-block mb-6"
                  >
                    <Sparkles size={48} className="text-blue-400" />
                  </motion.div>
                  <div className="font-amadeus text-6xl font-bold text-white mb-4">500+</div>
                  <div className="font-amadeus text-xl text-white/70 mb-3">Connectors</div>
                  <div className="font-amadeus text-sm text-white/60 leading-relaxed flex-1">
                    Connect the tools you already use daily
                  </div>
                  <div className="font-amadeus text-xs text-white/40 mt-3">SAP, Excel, Outlook, SharePoint, Teams...</div>
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
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10 text-center h-full flex flex-col">
                  <div className="inline-block mb-6">
                    <RefreshCw size={48} className="text-purple-400" />
                  </div>
                  <div className="font-amadeus text-6xl font-bold text-white mb-4">24/7</div>
                  <div className="font-amadeus text-xl text-white/70 mb-3">Automation</div>
                  <div className="font-amadeus text-sm text-white/60 leading-relaxed flex-1">
                    Month-end runs even when you're asleep
                  </div>
                  <div className="font-amadeus text-xs text-white/40 mt-3">Never stops, never forgets</div>
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
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10 text-center h-full flex flex-col">
                  <div className="inline-block mb-6">
                    <Zap size={48} className="text-pink-400" />
                  </div>
                  <div className="font-amadeus text-6xl font-bold text-white mb-4">10x</div>
                  <div className="font-amadeus text-xl text-white/70 mb-3">Faster</div>
                  <div className="font-amadeus text-sm text-white/60 leading-relaxed flex-1">
                    Reclaim your time for strategic work
                  </div>
                  <div className="font-amadeus text-xs text-white/40 mt-3">Tasks that took hours now take minutes</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 8: Call to action */}
        {stepController.currentStep === 8 && (
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