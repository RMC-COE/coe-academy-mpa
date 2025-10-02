import { SectionProps } from '@/types';
import { usePresentation } from '@/context/PresentationContext';
import { useStepController } from '@/hooks/useStepController';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  ChevronUp,
  ChevronDown,
  Globe,
  Shield,
  RefreshCw,
  Monitor,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export const PowerAutomateFlow = ({ resetSignal }: SectionProps) => {
  const { stepMode, stepSignal, setIsLastStep } = usePresentation();
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  // Placeholder screenshots - will be replaced with actual images
  const screenshots = [
    {
      id: 'step1',
      title: 'Accediendo a Power Automate',
      description: 'Navegamos a make.powerautomate.com para comenzar a crear nuestro flujo',
      url: 'placeholder1.png',
      tips: [
        'Utiliza tu cuenta corporativa de Microsoft',
        'Asegúrate de tener permisos para crear flujos',
        'La interfaz puede variar según la región'
      ]
    },
    {
      id: 'step2',
      title: 'Creando un nuevo flujo',
      description: 'Seleccionamos la opción "Crear" para iniciar un nuevo flujo automatizado',
      url: 'placeholder2.png',
      tips: [
        'Elige "Flujo automatizado" para trigger por email',
        'Da un nombre descriptivo al flujo',
        'Considera la frecuencia de ejecución'
      ]
    },
    {
      id: 'step3',
      title: 'Configurando el trigger de email',
      description: 'Establecemos las condiciones que dispararán nuestro flujo automáticamente',
      url: 'placeholder3.png',
      tips: [
        'Filtra por asunto que contenga "AUTTP"',
        'Verifica que tenga archivos adjuntos',
        'Configura la carpeta de origen correcta'
      ]
    }
  ];

  const stepController = useStepController({
    totalSteps: 1,
    resetSignal,
    stepSignal,
    autoAdvance: false,
    stepDuration: 0,
    onLastStepChange: setIsLastStep
  });

  // Handle arrow key navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' && currentScreenshot > 0) {
        setCurrentScreenshot(currentScreenshot - 1);
      } else if (event.key === 'ArrowDown' && currentScreenshot < screenshots.length - 1) {
        setCurrentScreenshot(currentScreenshot + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreenshot, screenshots.length]);

  const currentStep = screenshots[currentScreenshot];

  return (
    <div className="relative h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 overflow-hidden">
      {/* Static background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid-flow-pa" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="currentColor" className="text-white/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-flow-pa)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col h-full px-8 py-12"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-amadeus text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Construyendo tu Primer Flujo
          </h1>
          <p className="font-amadeus text-xl text-gray-300">
            Paso a paso: De la idea a la automatización
          </p>
        </div>

        {/* Browser Frame */}
        <div className="flex-1 max-w-7xl mx-auto w-full">
          <div className="bg-gray-800 rounded-t-lg shadow-2xl">
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

            {/* Browser Content */}
            <div className="bg-white text-black relative" style={{ height: '500px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreenshot}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
                >
                  <div className="text-center p-8">
                    <div className="w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <span className="text-6xl">📸</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">{currentStep.title}</h3>
                    <p className="text-gray-600 mb-6 max-w-lg">{currentStep.description}</p>

                    {/* Step indicator */}
                    <div className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-full">
                      <span className="text-blue-600 font-semibold">
                        Paso {currentScreenshot + 1} de {screenshots.length}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation and Info */}
          <div className="bg-gray-900 rounded-b-lg p-6">
            <div className="flex items-center justify-between mb-6">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentScreenshot(Math.max(0, currentScreenshot - 1))}
                disabled={currentScreenshot === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                  currentScreenshot === 0
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                }`}
              >
                <ChevronUp className="w-5 h-5" />
                <span className="font-amadeus">Anterior</span>
              </button>

              {/* Step Indicators */}
              <div className="flex space-x-2">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentScreenshot(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
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
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                  currentScreenshot === screenshots.length - 1
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                }`}
              >
                <span className="font-amadeus">Siguiente</span>
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Current Step Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tips */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-amadeus text-lg font-bold text-white mb-3 flex items-center">
                  💡 Consejos importantes
                </h4>
                <ul className="space-y-2">
                  {currentStep.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-amadeus text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation Instructions */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-amadeus text-lg font-bold text-white mb-3 flex items-center">
                  ⌨️ Navegación
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="flex items-center gap-1">
                      <ArrowLeft className="w-4 h-4" />
                      <span className="font-mono text-xs bg-gray-700 px-2 py-1 rounded">↑</span>
                    </div>
                    <span className="font-amadeus text-sm">Paso anterior</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="flex items-center gap-1">
                      <ArrowRight className="w-4 h-4" />
                      <span className="font-mono text-xs bg-gray-700 px-2 py-1 rounded">↓</span>
                    </div>
                    <span className="font-amadeus text-sm">Siguiente paso</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    También puedes usar los botones o hacer clic en los indicadores
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};