import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
    const savedPlan = localStorage.getItem('active_subscription_plan');
    setActivePlan(savedPlan);

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <header className="relative box-border min-h-[auto] min-w-[auto] break-words z-[9999] dark:bg-slate-900">
      <div className="box-border break-words">
        <div className="relative bg-stone-100 dark:bg-slate-900 box-border gap-x-0 flex flex-col flex-wrap max-w-full break-words gap-y-0 w-full md:flex-nowrap">
          <div className="relative bg-cyan-800 box-border flex flex-col min-h-[auto] break-words w-full px-5">
            <div className="items-center box-border gap-x-0 flex flex-col grow flex-wrap h-full justify-center max-w-[min(100%,767px)] min-h-[auto] min-w-[auto] break-words gap-y-[5px] w-full mx-auto pt-2.5 pb-[15px] md:gap-x-5 md:flex-row md:flex-nowrap md:justify-between md:max-w-[1620px] md:gap-y-5 md:py-2">
              <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-[5px] md:gap-x-5 md:gap-y-5">
                <div className="box-border break-words text-left">
                  <div className="relative box-border break-words">
                  </div>
                </div>
              </div>
              <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-[5px] md:gap-x-5 md:gap-y-5">
                <div className="relative box-border break-words">
                  <ul className="relative items-center box-border flex flex-wrap justify-center list-none break-words pl-0 md:justify-end">
                    <li className="box-border min-h-[auto] min-w-[auto] break-words my-2 md:my-0">
                      <Link to="/about" className="relative text-white text-sm font-medium items-center box-border flex leading-[10px] break-words capitalize">
                        <span className="box-border block grow min-h-[auto] min-w-[auto] break-words">Tuition &amp; Fee</span>
                      </Link>
                    </li>
                    <li className="box-border min-h-[auto] min-w-[auto] break-words my-2 md:my-0">
                      <Link to="/about" className="relative text-white text-sm font-medium items-center box-border flex leading-[10px] break-words capitalize ml-2.5 pl-2.5 border-l border-solid border-white/20 md:ml-3 md:pl-3">
                        <span className="box-border block grow min-h-[auto] min-w-[auto] break-words">How to Apply</span>
                      </Link>
                    </li>
                    <li className="box-border min-h-[auto] min-w-[auto] break-words my-2 md:my-0">
                      <Link to="/about" className="relative text-white text-sm font-medium items-center box-border flex leading-[10px] break-words capitalize ml-2.5 pl-2.5 border-l border-solid border-white/20 md:ml-3 md:pl-3">
                        <span className="box-border block grow min-h-[auto] min-w-[auto] break-words">Requirements</span>
                      </Link>
                    </li>
                    <li className="box-border min-h-[auto] min-w-[auto] break-words my-2 md:my-0">
                      <Link to="/contact" className="relative text-white text-sm font-medium items-center box-border flex leading-[10px] break-words capitalize ml-2.5 pl-2.5 border-l border-solid border-white/20 md:ml-3 md:pl-3">
                        <span className="box-border block grow min-h-[auto] min-w-[auto] break-words">Contact</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="relative bg-stone-100 dark:bg-slate-900 box-border flex flex-col min-h-[auto] break-words w-full px-5">
            <div className="items-center box-border gap-x-5 flex grow h-full justify-between max-w-[min(100%,767px)] min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto py-[15px] md:max-w-[1620px] md:py-0">
              <div className="relative self-start box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5 md:self-auto">
                <div className="relative text-sky-900 dark:text-sky-400 dark:text-white text-[32px] font-bold items-center box-border gap-x-[15px] flex leading-8 break-words gap-y-[15px]">
                  <Link to="/" className="items-center box-border gap-x-[15px] flex min-h-[auto] min-w-[auto] break-words gap-y-[15px] whitespace-nowrap">
                    <span className="text-sky-900 dark:text-sky-400 dark:text-white font-bold text-2xl md:text-3xl tracking-tight whitespace-nowrap">Lohia College</span>
                  </Link>
                </div>
              </div>
              <div className="relative items-center box-border gap-x-3 flex flex-wrap justify-end min-h-[auto] break-words gap-y-2.5 md:flex-nowrap">
                <div className="relative box-border gap-x-3 max-w-full min-h-[auto] break-words gap-y-2.5 pt-1.5 md:pt-0">
                  <div className="relative box-border justify-end break-words md:justify-normal">
                    <ul className="relative items-center box-border hidden md:flex-nowrap justify-center list-none break-words pl-0 md:flex">
                      <li className="box-border min-h-0 min-w-0 break-words mx-1 lg:mx-[11px] md:min-h-[auto] md:min-w-[auto] md:ml-[2px] md:mr-[2px] lg:ml-[15px] lg:mr-[17px]">
                        <Link to="/" className="relative text-cyan-800 dark:text-cyan-400 text-sm items-center box-border flex leading-[19.6px] break-words capitalize py-[25px] md:text-sm lg:text-base md:leading-[22.4px] md:py-[30px]">
                          <span className="text-sm box-border block grow leading-[19.6px] min-h-0 min-w-0 break-words md:text-sm lg:text-base md:leading-[22.4px] md:min-h-[auto] md:min-w-[auto] whitespace-nowrap"> Home </span>
                        </Link>
                      </li>
                    <li className="relative box-border min-h-0 min-w-0 break-words mx-1 lg:mx-[11px] md:min-h-[auto] md:min-w-[auto] md:ml-[2px] md:mr-[2px] lg:ml-[15px] lg:mr-[17px]">
                        <Link to="/about" className="relative text-black dark:text-white text-sm items-center box-border flex leading-[19.6px] break-words capitalize py-[25px] md:text-sm lg:text-base md:leading-[22.4px] md:py-[30px]">
                          <span className="text-sm box-border block grow leading-[19.6px] min-h-0 min-w-0 break-words md:text-sm lg:text-base md:leading-[22.4px] md:min-h-[auto] md:min-w-[auto] whitespace-nowrap"> About Us </span>
                        </Link>
                      </li>
                      <li className="relative box-border min-h-0 min-w-0 break-words mx-1 lg:mx-[11px] md:min-h-[auto] md:min-w-[auto] md:ml-[2px] md:mr-[2px] lg:ml-[15px] lg:mr-[17px]">
                        <Link to="/events" className="relative text-black dark:text-white text-sm items-center box-border flex leading-[19.6px] break-words capitalize py-[25px] md:text-sm lg:text-base md:leading-[22.4px] md:py-[30px]">
                          <span className="text-sm box-border block grow leading-[19.6px] min-h-0 min-w-0 break-words md:text-sm lg:text-base md:leading-[22.4px] md:min-h-[auto] md:min-w-[auto] whitespace-nowrap"> Events </span>
                        </Link>
                      </li>
                      <li className="relative box-border min-h-0 min-w-0 break-words mx-1 lg:mx-[11px] md:min-h-[auto] md:min-w-[auto] md:ml-[2px] md:mr-[2px] lg:ml-[15px] lg:mr-[17px]">
                        <Link to="/blog" className="relative text-black dark:text-white text-sm items-center box-border flex leading-[19.6px] break-words capitalize py-[25px] md:text-sm lg:text-base md:leading-[22.4px] md:py-[30px]">
                          <span className="text-sm box-border block grow leading-[19.6px] min-h-0 min-w-0 break-words md:text-sm lg:text-base md:leading-[22.4px] md:min-h-[auto] md:min-w-[auto] whitespace-nowrap"> Blog </span>
                        </Link>
                      </li>
                      <li className="relative box-border min-h-0 min-w-0 break-words mx-1 lg:mx-[11px] md:min-h-[auto] md:min-w-[auto] md:ml-[2px] md:mr-[2px] lg:ml-[15px] lg:mr-[17px]">
                        <Link to="/gallery" className="relative text-black dark:text-white text-sm items-center box-border flex leading-[19.6px] break-words capitalize py-[25px] md:text-sm lg:text-base md:leading-[22.4px] md:py-[30px]">
                          <span className="text-sm box-border block grow leading-[19.6px] min-h-0 min-w-0 break-words md:text-sm lg:text-base md:leading-[22.4px] md:min-h-[auto] md:min-w-[auto] whitespace-nowrap"> Gallery </span>
                        </Link>
                      </li>
                      <li className="relative box-border min-h-0 min-w-0 break-words mx-1 lg:mx-[11px] md:min-h-[auto] md:min-w-[auto] md:ml-[2px] md:mr-[2px] lg:ml-[15px] lg:mr-[17px]">
                        <Link to="/donate" className="relative text-black dark:text-white text-sm items-center box-border flex leading-[19.6px] break-words capitalize py-[25px] md:text-sm lg:text-base md:leading-[22.4px] md:py-[30px]">
                          <span className="text-sm box-border block grow leading-[19.6px] min-h-0 min-w-0 break-words md:text-sm lg:text-base md:leading-[22.4px] md:min-h-[auto] md:min-w-[auto] whitespace-nowrap"> Donate </span>
                        </Link>
                      </li>
                      <li className="box-border min-h-0 min-w-0 break-words mx-1 lg:mx-[11px] md:min-h-[auto] md:min-w-[auto] md:ml-[2px] md:mr-[2px] lg:ml-[15px] lg:mr-[17px]">
                        <Link to="/contact" className="relative text-black dark:text-white text-sm items-center box-border flex leading-[19.6px] break-words capitalize py-[25px] md:text-sm lg:text-base md:leading-[22.4px] md:py-[30px]">
                          <span className="text-sm box-border block grow leading-[19.6px] min-h-0 min-w-0 break-words md:text-sm lg:text-base md:leading-[22.4px] md:min-h-[auto] md:min-w-[auto] whitespace-nowrap"> Contact </span>
                        </Link>
                      </li>
                    </ul>
                    <div className="box-border break-words">
                      <button className="text-slate-900 dark:text-white text-[25px] font-semibold items-center bg-transparent inline-flex h-auto justify-center leading-[31.25px] break-words text-center capitalize w-auto p-0 rounded-[5px] md:hidden">
                        <span className="items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words md:min-h-0 md:min-w-0">
                          <img alt="Icon" className="relative box-border h-[25px] align-baseline w-[25px] dark:invert" src="/src/assets/menu-icon.svg" />
                        </span>
                        <span className="items-center box-border hidden justify-center break-words">
                          <img alt="Icon" className="relative box-border inline h-[25px] align-baseline w-[25px] dark:invert" src="/src/assets/close.svg" />
                        </span>
                      </button>
                    </div>
                    <div className="box-border break-words"></div>
                  </div>
                </div>
                <div className="relative box-border gap-x-3 max-w-full min-h-[auto] order-[-99999] break-words gap-y-2.5 md:order-none flex items-center">
                  <button onClick={toggleDarkMode} className="text-black dark:text-white mr-3 md:mr-0 lg:mr-3 p-2 rounded-full hover:bg-black/5 dark:hover:bg-slate-800 transition-colors">
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  
                  {user ? (
                    <Link to="/profile" className="flex items-center gap-2 p-2 rounded-full hover:bg-black/5 dark:hover:bg-slate-800 transition-colors text-black dark:text-white">
                      <User size={20} />
                      <span className="hidden lg:block text-sm font-bold">Profile</span>
                    </Link>
                  ) : (
                    <Link to="/login" className="text-sm font-bold text-cyan-800 dark:text-cyan-400 hover:underline px-3 py-2">
                      Login
                    </Link>
                  )}

                  <div className="relative box-border flex flex-col leading-4 break-words hidden lg:flex">
                    <button className="relative text-black dark:text-white text-xl font-semibold items-center bg-transparent gap-x-2.5 flex h-[26px] justify-center leading-[25px] min-h-[auto] min-w-[auto] break-words gap-y-2.5 text-center capitalize w-[26px] p-0">
                      <span className="box-border flex min-h-[auto] min-w-[auto] break-words">
                        <img alt="Icon" className="relative box-border h-5 align-baseline w-5 dark:invert" src="/src/assets/search-icon.svg" />
                      </span>
                      <span className="box-border hidden break-words">
                        <img alt="Icon" className="relative box-border inline h-5 align-baseline w-5 dark:invert" src="/src/assets/close.svg" />
                      </span>
                    </button>
                  </div>
                </div>
                <div className="relative box-border gap-x-3 h-[15px] max-w-full min-h-[auto] order-[-99999] break-words gap-y-2.5 w-px md:order-none hidden lg:block">
                  <div className="relative items-center bg-black dark:bg-slate-700 box-border flex h-full justify-center break-words w-full">
                    <span className="relative text-[10px] box-border block min-h-[auto] min-w-[auto] break-words"></span>
                  </div>
                </div>
                <div className="relative box-border gap-x-3 hidden max-w-full min-h-0 break-words gap-y-2.5 lg:block md:min-h-[auto]">
                  <div className="box-border break-words">
                    <div className="box-border flex break-words">
                      <button className="text-black dark:text-white text-4xl font-semibold items-center bg-transparent flex h-7 justify-center leading-[45px] min-h-0 min-w-0 break-words text-center capitalize w-7 p-0 md:min-h-[auto] md:min-w-[auto]">
                        <img alt="Icon" className="relative box-border h-9 align-baseline w-9 dark:invert" src="/src/assets/menu-icon.svg" />
                      </button>
                    </div>
                  </div>
                </div>
                {activePlan !== "Premium Plan" && (
                  <div className="relative box-border gap-x-3 hidden max-w-full min-h-0 break-words gap-y-2.5 pl-2.5 md:block md:min-h-[auto] md:pl-2 lg:pl-5">
                    <Link to="/subscription" className="relative text-white text-[15px] font-medium items-center bg-sky-500 box-border gap-x-2.5 inline-flex flex-row-reverse justify-center leading-[18px] break-words gap-y-2.5 z-[1] overflow-hidden px-[15px] lg:px-[26px] py-3 lg:py-4 rounded-[30px] whitespace-nowrap">
                      <span className="relative items-center box-border flex h-[15px] justify-center min-h-0 min-w-0 break-words w-[15px] overflow-hidden md:min-h-[auto] md:min-w-[auto]">
                        <img alt="Icon" className="absolute box-border h-[15px] align-baseline w-[15px] left-0 top-0" src="/src/assets/apply-right-icon.svg" />
                        <img alt="Icon" className="absolute box-border h-[15px] transform-none align-baseline w-[15px] left-0 top-0 md:translate-x-[-150.0%]" src="/src/assets/icon-25.svg" />
                      </span>
                      <span className="relative text-transparent items-center box-border flex justify-center min-h-0 min-w-0 break-words overflow-hidden md:min-h-[auto] md:min-w-[auto] before:accent-auto before:box-border before:text-white before:block before:text-[15px] before:not-italic before:normal-nums before:font-medium before:tracking-[normal] before:leading-[18px] before:list-outside before:list-disc before:break-words before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:transform-none before:visible before:border-separate before:inset-0 before:font-inter before:md:translate-y-[27px] after:accent-auto after:box-border after:text-white after:block after:text-[15px] after:not-italic after:normal-nums after:font-medium after:tracking-[normal] after:leading-[18px] after:list-outside after:list-disc after:break-words after:pointer-events-auto after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:border-separate after:inset-0 after:font-inter">
                        {activePlan ? 'Upgrade Plan' : 'Apply Now'}
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
