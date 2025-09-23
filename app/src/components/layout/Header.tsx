import { ProgressBar } from '@/components/common/ProgressBar';
import { TimeDisplay } from '@/components/common/TimeDisplay';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { usePresentation } from '@/context/PresentationContext';
import {
  FileDown,
  Moon,
  Pause,
  Play,
  RefreshCcw,
  Sun,
  Upload,
  Users
} from 'lucide-react';
import { ChangeEvent, useRef } from 'react';

interface Props {
  progress: number;
  elapsedSeconds: number;
  remainingSeconds: number;
  onToggleTheme: () => void;
  theme: 'light' | 'dark';
  onTogglePresenter: () => void;
  presenterMode: boolean;
  onToggleTimer: () => void;
  isRunning: boolean;
  onResetSection: () => void;
  onExportResources: () => void;
  onLoadData: (file: File) => void;
  onClearData: () => void;
  hasCustomData: boolean;
  stepMode?: boolean;
}

export const Header = ({
  progress,
  elapsedSeconds,
  remainingSeconds,
  onToggleTheme,
  theme,
  onTogglePresenter,
  presenterMode,
  onToggleTimer,
  isRunning,
  onResetSection,
  onExportResources,
  onLoadData,
  onClearData,
  hasCustomData,
  stepMode = false
}: Props) => {
  const { sections } = usePresentation();
  const uploadRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onLoadData(file);
      event.target.value = '';
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white/80 py-2 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6">
        <ProgressBar value={progress} />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <img 
                src="/images/coe_color_logo.png" 
                alt="COE Logo" 
                className="h-6 w-auto dark:hidden"
              />
              <img 
                src="/images/coe_white_logo.png" 
                alt="COE Logo" 
                className="h-6 w-auto hidden dark:block"
              />
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500 dark:text-brand-300">
                Center of Excellence (CFA-FOP-COE) · COE Academy Sessions: Microsoft Power Automate
              </div>
            </div>
            <Breadcrumbs />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
            <span>{sections.length} sections</span>
            <span className="text-slate-400">•</span>
            <span className="font-semibold text-brand-600 dark:text-brand-300">Quick keys:</span>
            <span>←/→ navigate</span>
            <span>•</span>
            <span>Space pause</span>
            <span>•</span>
            <span>P notes</span>
            <span>•</span>
            <span>R restart</span>
            <span>•</span>
            <span>H hide header</span>
            <span>•</span>
            <span className={stepMode ? 'text-brand-500 font-semibold' : ''}>S step mode{stepMode ? ' (ON)' : ''}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <TimeDisplay elapsedSeconds={elapsedSeconds} remainingSeconds={remainingSeconds} />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onToggleTimer}
              className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-400"
            >
              {isRunning ? <Pause size={16} /> : <Play size={16} />}
              {isRunning ? 'Pause' : 'Resume'}
            </button>
            <button
              type="button"
              onClick={onResetSection}
              className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200"
            >
              <RefreshCcw size={16} /> Restart section
            </button>
            <button
              type="button"
              onClick={onExportResources}
              className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200"
            >
              <FileDown size={16} /> Export resources
            </button>
            <div className="flex items-center gap-1">
              <input
                ref={uploadRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => uploadRef.current?.click()}
                className="flex items-center gap-2 rounded-full border border-dashed border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200"
              >
                <Upload size={16} /> Load data
              </button>
              {hasCustomData && (
                <button
                  type="button"
                  onClick={onClearData}
                  className="text-xs text-brand-500 hover:underline"
                >
                  clear
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={onTogglePresenter}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                presenterMode
                  ? 'border-brand-400 bg-brand-50 text-brand-600 dark:border-brand-300 dark:bg-brand-900/30 dark:text-brand-200'
                  : 'border-slate-200 text-slate-700 hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200'
              }`}
            >
              <Users size={16} /> Presenter mode
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-brand-400 hover:text-brand-500 dark:border-slate-700 dark:text-slate-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
