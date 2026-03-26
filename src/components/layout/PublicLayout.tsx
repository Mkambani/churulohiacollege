import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { BottomNav } from './BottomNav';

export const PublicLayout = () => {
  const [showScroll, setShowScroll] = React.useState(false);

  React.useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  return (
    <div className="text-neutral-600 dark:text-neutral-300 text-base not-italic normal-nums font-normal accent-auto bg-[#F5F5F5] dark:bg-slate-950 box-border flex flex-col min-h-screen break-words overflow-x-hidden pointer-events-auto text-start indent-[0px] normal-case visible border-separate font-inter pb-16 md:pb-0 transition-colors">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      <BottomNav />

      {/* Scroll to top button */}
      {showScroll && (
        <div className="fixed bg-sky-900 shadow-[rgba(0,0,0,0.3)_0px_0px_20px_0px] box-border h-10 break-words w-10 z-[999999] rounded-[50%] right-[30px] bottom-[80px] md:bottom-[30px] flex items-center justify-center cursor-pointer transition-opacity duration-300" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/assets/icon-50.svg" alt="Icon" className="absolute text-white box-border h-4 align-baseline w-4" />
        </div>
      )}
    </div>
  );
};
