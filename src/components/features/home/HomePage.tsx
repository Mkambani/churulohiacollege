import React from 'react';
import { Hero } from './Hero';
import { DonateSection } from '../donation/DonateSection';
import { AboutSection } from '../about/AboutSection';
import { ProfessorsSection } from '../misc/ProfessorsSection';
import { ApplicationFormSection } from '../misc/ApplicationFormSection';
import { TestimonialsSection } from './TestimonialsSection';
import { BlogSection } from '../blog/BlogSection';
import { ProgramsStudyCards } from '../programs/ProgramsStudyCards';
import { CampusLifeSection } from '../campus/CampusLifeSection';
import { UpcomingEventsSection } from '../events/UpcomingEventsSection';

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
