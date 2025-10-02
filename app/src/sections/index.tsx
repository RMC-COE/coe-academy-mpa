import { lazy } from 'react';
import { SectionConfig } from '@/types';

const CoverSection = lazy(() => import('./CoverPage').then((module) => ({ default: module.CoverPage })));
const AgendaSection = lazy(() => import('./Agenda').then((module) => ({ default: module.Agenda })));
const RealitySection = lazy(() => import('./TheDailyReality').then((module) => ({ default: module.TheDailyReality })));
const MomentumSection = lazy(() => import('./AutomationMomentum').then((module) => ({ default: module.AutomationMomentum })));
const IntroSection = lazy(() => import('./PowerAutomateIntroNew').then((module) => ({ default: module.PowerAutomateIntroNew })));
const FlowBuilderSection = lazy(() => import('./FlowBuilder').then((module) => ({ default: module.FlowBuilder })));
const RoiSection = lazy(() => import('./RoiAndSuccess').then((module) => ({ default: module.RoiAndSuccess })));
const JourneySection = lazy(() => import('./YourJourney').then((module) => ({ default: module.YourJourney })));

export const sections: SectionConfig[] = [
  {
    id: 'cover',
    title: 'Power Automate by COE Academy',
    subtitle: 'Welcome to the session - October 2025',
    durationMinutes: 0,
    presenterNotes: [
      'Welcome everyone while they join the session.',
      'Remind that this session will be recorded but encourage participation.',
      'Show the agenda and what we will build together.'
    ],
    analyticsKey: 'section_cover',
    component: CoverSection
  },
  {
    id: 'agenda',
    title: 'Session Agenda',
    subtitle: 'Overview of today\'s interactive workshop',
    durationMinutes: 2,
    presenterNotes: [
      'Present the agenda to set expectations.',
      'Highlight that this is an interactive workshop, not just theory.',
      'Mention the total duration and what they will achieve.',
      'Ask if there are any specific questions about the agenda.'
    ],
    analyticsKey: 'section_agenda',
    component: AgendaSection
  },
  {
    id: 'reality',
    title: 'The Daily Reality',
    subtitle: 'Our scale vs our manual processes.',
    durationMinutes: 10,
    presenterNotes: [
      'Show the contrast: massive scale (470M bookings, 2.2B passengers) vs manual tasks.',
      'Highlight internal pain points: 1.6M manual billing items, 2,700+ finance requests.',
      'Quote from COE-85: "Information is not structured or standardized."'
    ],
    analyticsKey: 'section_reality',
    component: RealitySection
  },
  {
    id: 'momentum',
    title: 'Automation Momentum',
    subtitle: 'What we\'ve already accomplished.',
    durationMinutes: 8,
    presenterNotes: [
      'Show existing successes: Manual Billing 4-eyes flow, Month-End App, ARPA pipeline.',
      'Emphasize we\'ve proven automation works in our environment.',
      'Connect ARPA capacity constraints to Power Automate citizen developer opportunity.'
    ],
    analyticsKey: 'section_momentum',
    component: MomentumSection
  },
  {
    id: 'intro',
    title: 'Power Automate Introduction',
    subtitle: 'Democratize automation without depending on IT.',
    durationMinutes: 20,
    presenterNotes: [
      'Emphasize that Power Automate is part of the known suite.',
      'Connect each case with real examples in Amadeus.',
      'Encourage dragging blocks: goal <30 seconds.'
    ],
    analyticsKey: 'section_intro',
    component: IntroSection
  },
  {
    id: 'flowbuilder',
    title: 'Building Your First Flow',
    subtitle: 'Step by step - From idea to automation',
    durationMinutes: 15,
    presenterNotes: [
      'Show the simplified AUTTP flow blueprint for educational purposes.',
      'Demonstrate connector selection process and highlight popular ones.',
      'Walk through the flow building process step by step.',
      'Emphasize the testing and deployment phase for confidence.'
    ],
    analyticsKey: 'section_flowbuilder',
    component: FlowBuilderSection
  },
  {
    id: 'roi',
    title: 'ROI Calculator & Success Stories',
    subtitle: 'From insight to business case in minutes.',
    durationMinutes: 10,
    presenterNotes: [
      'Ask someone to share their numbers to personalize ROI.',
      'Explain real metrics from CoE projects.',
      'Connect adoption curve with internal roadmap.'
    ],
    analyticsKey: 'section_roi',
    component: RoiSection
  },
  {
    id: 'journey',
    title: 'Your Journey Starts Now',
    subtitle: 'From idea to tangible automation in 60 minutes.',
    durationMinutes: 5,
    presenterNotes: [
      'Remember next steps and CoE support.',
      'Emphasize concrete results from practical session.',
      'Invite to connect and request accompaniment.'
    ],
    analyticsKey: 'section_journey',
    component: JourneySection
  }
];
