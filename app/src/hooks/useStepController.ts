import { useState, useEffect, useCallback, useRef } from 'react';

interface UseStepControllerProps {
  totalSteps: number;
  resetSignal: number;
  stepSignal?: number;
  autoAdvance?: boolean;
  stepDuration?: number;
  onLastStepChange?: (isLast: boolean) => void;
}

export const useStepController = ({ 
  totalSteps, 
  resetSignal,
  stepSignal = 0,
  autoAdvance = false, 
  stepDuration = 1000,
  onLastStepChange
}: UseStepControllerProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoAdvance);

  // Reset steps when section resets
  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(autoAdvance);
  }, [resetSignal, autoAdvance]);

  // Handle manual step signals from context
  const lastStepSignal = useRef(stepSignal);
  useEffect(() => {
    if (stepSignal !== lastStepSignal.current) {
      if (stepSignal > lastStepSignal.current) {
        setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
      } else if (stepSignal < lastStepSignal.current) {
        setCurrentStep(prev => Math.max(prev - 1, 0));
      }
      lastStepSignal.current = stepSignal;
    }
  }, [stepSignal, totalSteps]);

  // Auto advance logic
  useEffect(() => {
    if (!isPlaying || currentStep >= totalSteps - 1) return;

    const timer = setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    }, stepDuration);

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, totalSteps, stepDuration]);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const previousStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, totalSteps - 1)));
  }, [totalSteps]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const isStepVisible = useCallback((step: number) => {
    return step <= currentStep;
  }, [currentStep]);

  const isStepActive = useCallback((step: number) => {
    return step === currentStep;
  }, [currentStep]);

  const isLastStep = currentStep === totalSteps - 1;

  // Notify parent when last step changes
  useEffect(() => {
    onLastStepChange?.(isLastStep);
  }, [isLastStep, onLastStepChange]);

  return {
    currentStep,
    isPlaying,
    nextStep,
    previousStep,
    goToStep,
    togglePlay,
    isStepVisible,
    isStepActive,
    isFirstStep: currentStep === 0,
    isLastStep,
    progress: totalSteps > 0 ? currentStep / (totalSteps - 1) : 0
  };
};