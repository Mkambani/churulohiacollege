import React from 'react';
import { Hero } from './Hero';
import { DonateSection } from './DonateSection';
import { AboutSection } from './AboutSection';
import { ProfessorsSection } from './ProfessorsSection';
import { ApplicationFormSection } from './ApplicationFormSection';
import { TestimonialsSection } from './TestimonialsSection';
import { BlogSection } from './BlogSection';
import { ProgramsStudyCards } from './ProgramsStudyCards';
import { CampusLifeSection } from './CampusLifeSection';
import { UpcomingEventsSection } from './UpcomingEventsSection';

export const HomePage: React.FC = () => {
  return (
    <main className="min-h-[auto] min-w-[auto] break-words">
      <Hero />
      <DonateSection />
      <AboutSection />
       <UpcomingEventsSection />
      <ApplicationFormSection />
      <ProgramsStudyCards />
      <CampusLifeSection />
     <ProfessorsSection />
      <TestimonialsSection />
      <BlogSection />
    </main>
  );
};
