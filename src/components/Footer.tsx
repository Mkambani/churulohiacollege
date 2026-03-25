import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="box-border min-h-[auto] min-w-[auto] break-words">
      <div className="box-border break-words">
        <div className="relative bg-[linear-gradient(rgb(15,100,135)_0%,rgb(12,87,118)_100%)] box-border flex flex-col max-w-full break-words w-full overflow-hidden mx-auto px-2.5 md:bg-[linear-gradient(90deg,rgb(15,100,135)_28.5%,rgb(12,87,118)_0%)] md:px-5">
          <div className="box-border gap-x-0 flex flex-col grow flex-wrap h-full max-w-[520px] min-h-[auto] min-w-[auto] break-words gap-y-0 w-full mx-auto md:flex-row md:flex-nowrap md:max-w-[min(100%,1300px)]">
            <div className="absolute box-border gap-x-0 hidden max-w-full break-words gap-y-0 z-0 right-10 bottom-[55px] md:block">
              <div className="relative box-border h-full break-words text-left w-full">
                <img
                  alt="testimonial-shape-2.png"
                  className="relative box-border inline max-w-full break-words z-[1]"
                  src="/assets/testimonial-shape-2.webp"
                />
              </div>
            </div>
            <div className="relative box-border gap-x-5 flex flex-col flex-wrap justify-start min-h-[auto] break-words gap-y-5 w-full pt-[60px] pb-0 px-2.5 md:flex-nowrap md:justify-normal md:w-[43%] md:pl-0 md:pt-[100px] md:pb-[30px]">
              <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
                <div className="relative text-white text-[32px] font-bold items-center box-border gap-x-[15px] flex leading-8 break-words gap-y-[15px]">
                  <Link
                    to="/"
                    className="text-white font-bold text-2xl md:text-3xl tracking-tight"
                  >
                    Lohia College
                  </Link>
                </div>
              </div>
              <div className="relative items-start self-start box-border gap-x-5 flex flex-wrap justify-start min-h-[auto] break-words gap-y-5 w-full my-0 md:items-center md:gap-x-10 md:flex-nowrap md:justify-normal md:gap-y-0 md:mt-[15px] md:mb-[5px]">
                <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5 md:gap-x-10 md:gap-y-0">
                  <div className="box-border break-words">
                    <div className="relative box-border gap-x-[15px] flex break-words gap-y-[15px] text-left overflow-hidden md:text-start">
                      <div className="box-border min-h-[auto] min-w-[auto] break-words text-left md:text-start">
                        <h4 className="text-white/80 text-sm font-semibold box-border leading-6 break-words text-left font-bitter md:text-start">
                          {" "}
                          Email:{" "}
                        </h4>
                        <p className="text-white text-sm box-border break-words text-left md:text-start">
                          {" "}
                          info@lohiacollege.edu{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5 md:gap-x-10 md:gap-y-0">
                  <div className="box-border break-words">
                    <div className="relative box-border gap-x-[15px] flex break-words gap-y-[15px] text-left overflow-hidden md:text-start">
                      <div className="box-border min-h-[auto] min-w-[auto] break-words text-left md:text-start">
                        <p className="text-white/80 text-sm box-border leading-6 break-words text-left md:text-start">
                          {" "}
                          Phone:{" "}
                        </p>
                        <p className="text-white text-sm box-border break-words text-left md:text-start">
                          {" "}
                          + 91 9587826831{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative items-start self-start box-border gap-x-[15px] flex flex-wrap justify-start min-h-[auto] break-words gap-y-[15px] w-full md:items-center md:gap-x-4 md:flex-nowrap md:justify-normal md:gap-y-0">
                <div className="relative box-border gap-x-[15px] max-w-full min-h-[auto] break-words gap-y-[15px] md:gap-x-4 md:gap-y-0">
                  <div className="relative box-border h-full break-words text-left w-full">
                    <img
                      alt="store-1"
                      className="relative box-border inline max-w-[120px] break-words z-[1] md:max-w-full"
                      src="/assets/store-1.webp"
                    />
                  </div>
                </div>
                <div className="relative box-border gap-x-[15px] max-w-full min-h-[auto] break-words gap-y-[15px] md:gap-x-4 md:gap-y-0">
                  <div className="relative box-border h-full break-words text-left w-full">
                    <img
                      alt="store-2"
                      className="relative box-border inline max-w-[120px] break-words z-[1] md:max-w-full"
                      src="/assets/store-2.webp"
                    />
                  </div>
                </div>
              </div>
              <div className="relative items-center self-start box-border gap-x-[15px] flex flex-wrap justify-start min-h-[auto] break-words gap-y-[15px] w-full mt-0 md:gap-x-4 md:flex-nowrap md:justify-normal md:gap-y-0 md:mt-[75px]">
                <div className="relative box-border gap-x-[15px] max-w-full min-h-[auto] break-words gap-y-[15px] md:gap-x-4 md:gap-y-0">
                  <div className="box-border break-words">
                    <div className="relative box-border break-words">
                      <span className="relative text-white font-medium items-center box-border inline-flex leading-[26px] break-words">
                        {" "}
                        Social Link{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative self-start box-border gap-x-[15px] max-w-full min-h-[auto] break-words gap-y-[15px] md:gap-x-4 md:gap-y-0">
                  <div className="box-border break-words">
                    <div className="box-border gap-x-2 flex break-words gap-y-2">
                      <Link
                        className="items-center box-border gap-x-2 flex flex-wrap min-h-[auto] min-w-[auto] break-words gap-y-2 border border-cyan-800 border-solid"
                        to="/"
                      >
                        <div className="items-center bg-cyan-800 box-border flex h-9 justify-center min-h-[auto] min-w-[auto] break-words w-9">
                          <img
                            alt="Icon"
                            className="relative box-border shrink-0 h-4 align-baseline w-4"
                            src="/assets/twitter.svg"
                          />
                        </div>
                      </Link>
                      <Link
                        className="items-center box-border gap-x-2 flex flex-wrap min-h-[auto] min-w-[auto] break-words gap-y-2 border border-cyan-800 border-solid"
                        to="/"
                      >
                        <div className="items-center bg-cyan-800 box-border flex h-9 justify-center min-h-[auto] min-w-[auto] break-words w-9">
                          <img
                            alt="Icon"
                            className="relative box-border shrink-0 h-4 align-baseline w-4"
                            src="/assets/facebook.svg"
                          />
                        </div>
                      </Link>
                      <Link
                        className="items-center box-border gap-x-2 flex flex-wrap min-h-[auto] min-w-[auto] break-words gap-y-2 border border-cyan-800 border-solid"
                        to="/"
                      >
                        <div className="items-center bg-cyan-800 box-border flex h-9 justify-center min-h-[auto] min-w-[auto] break-words w-9">
                          <img
                            alt="Icon"
                            className="relative box-border shrink-0 h-4 align-baseline w-4"
                            src="/assets/instagram.svg"
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative box-border gap-x-0 flex flex-col flex-wrap min-h-[auto] break-words gap-y-0 w-full pt-[30px] md:flex-nowrap md:pt-[84px]">
              <div className="relative box-border gap-x-5 flex flex-wrap justify-between min-h-[auto] break-words gap-y-0 w-full pb-10 md:gap-x-0 md:flex-nowrap md:pb-[82px]">
                <div className="relative box-border gap-x-0 flex flex-col flex-wrap min-h-[auto] break-words gap-y-0 w-full p-2.5 md:flex-nowrap md:w-[41%] md:px-0">
                  <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-0 w-full">
                    <div className="box-border break-words">
                      <div className="relative box-border break-words">
                        <h4 className="text-white text-lg font-semibold box-border leading-[23.4px] break-words stroke-slate-900 pb-2.5 font-bitter md:text-2xl md:leading-[34px]">
                          {" "}
                          Our Campus{" "}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="relative box-border gap-x-0 h-px max-w-full min-h-[auto] break-words gap-y-0 w-full md:w-[51%]">
                    <div className="relative items-center bg-white dark:bg-slate-900/10 box-border flex h-full justify-center break-words w-full before:accent-auto before:bg-white dark:bg-slate-900 before:box-border before:text-neutral-600 dark:text-neutral-400 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-[0.5px] before:tracking-[normal] before:leading-7 before:list-outside before:list-disc before:break-words before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:translate-y-[-0.25px] before:visible before:w-[70px] before:border-separate before:left-0 before:top-2/4 before:font-inter after:accent-auto after:bg-white dark:bg-slate-900 after:box-border after:text-neutral-600 dark:text-neutral-400 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:h-[0.5px] after:tracking-[normal] after:leading-7 after:list-outside after:list-disc after:break-words after:pointer-events-auto after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:translate-y-[-0.25px] after:visible after:w-[70px] after:border-separate after:top-2/4 after:inset-x-0 after:font-inter">
                      <span className="relative text-[10px] box-border block min-h-[auto] min-w-[auto] break-words"></span>
                    </div>
                  </div>
                  <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-0 pt-[25px]">
                    <div className="relative box-border break-words">
                      <ul className="relative box-border flex flex-col flex-wrap justify-center list-none break-words w-full pl-0">
                        <li className="box-border min-h-[auto] min-w-[auto] break-words">
                          <Link
                            className="relative text-neutral-200/80 items-center box-border flex break-words mb-2.5"
                            to="/about"
                          >
                            <span className="box-border block grow min-h-[auto] min-w-[auto] break-words">
                              {" "}
                              About Lohia College{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="box-border min-h-[auto] min-w-[auto] break-words">
                          <Link
                            className="relative text-neutral-200/80 items-center box-border flex break-words mb-2.5"
                            to="/terms"
                          >
                            <span className="box-border block grow min-h-[auto] min-w-[auto] break-words">
                              {" "}
                              Term Condition{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="box-border min-h-[auto] min-w-[auto] break-words">
                          <Link
                            className="relative text-neutral-200/80 items-center box-border flex break-words mb-2.5"
                            to="/refund"
                          >
                            <span className="box-border block grow min-h-[auto] min-w-[auto] break-words">
                              {" "}
                              Refund Policy{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="box-border min-h-[auto] min-w-[auto] break-words">
                          <Link
                            className="relative text-neutral-200/80 items-center box-border flex break-words"
                            to="/contact"
                          >
                            <span className="box-border block grow min-h-[auto] min-w-[auto] break-words">
                              {" "}
                              Contact{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="relative box-border gap-x-0 flex flex-col flex-wrap min-h-[auto] break-words gap-y-0 w-full pt-[30px] pb-2.5 px-2.5 md:flex-nowrap md:w-[41%] md:pt-2.5 md:px-0">
                  <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-0 w-full">
                    <div className="box-border break-words">
                      <div className="relative box-border break-words">
                        <h4 className="text-white text-lg font-semibold box-border leading-[23.4px] break-words stroke-slate-900 pb-2.5 font-bitter md:text-2xl md:leading-[34px]">
                          {" "}
                          Useful Links{" "}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="relative box-border gap-x-0 h-px max-w-full min-h-[auto] break-words gap-y-0 w-full md:w-[51%]">
                    <div className="relative items-center bg-white dark:bg-slate-900/10 box-border flex h-full justify-center break-words w-full before:accent-auto before:bg-white dark:bg-slate-900 before:box-border before:text-neutral-600 dark:text-neutral-400 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-[0.5px] before:tracking-[normal] before:leading-7 before:list-outside before:list-disc before:break-words before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:translate-y-[-0.25px] before:visible before:w-[70px] before:border-separate before:left-0 before:top-2/4 before:font-inter after:accent-auto after:bg-white dark:bg-slate-900 after:box-border after:text-neutral-600 dark:text-neutral-400 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:h-[0.5px] after:tracking-[normal] after:leading-7 after:list-outside after:list-disc after:break-words after:pointer-events-auto after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:translate-y-[-0.25px] after:visible after:w-[70px] after:border-separate after:top-2/4 after:inset-x-0 after:font-inter">
                      <span className="relative text-[10px] box-border block min-h-[auto] min-w-[auto] break-words"></span>
                    </div>
                  </div>
                  <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-0 pt-[25px]">
                    <div className="relative box-border break-words">
                      <ul className="relative box-border flex flex-col flex-wrap justify-center list-none break-words w-full pl-0">
                        <li className="box-border min-h-[auto] min-w-[auto] break-words">
                          <Link
                            className="relative text-neutral-200/80 items-center box-border flex break-words mb-2.5"
                            to="/"
                          >
                            <span className="box-border block grow min-h-[auto] min-w-[auto] break-words">
                              {" "}
                              Home{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="box-border min-h-[auto] min-w-[auto] break-words">
                          <Link
                            className="relative text-neutral-200/80 items-center box-border flex break-words mb-2.5"
                            to="/about"
                          >
                            <span className="box-border block grow min-h-[auto] min-w-[auto] break-words">
                              {" "}
                              About{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="box-border min-h-[auto] min-w-[auto] break-words">
                          <Link
                            className="relative text-neutral-200/80 items-center box-border flex break-words mb-2.5"
                            to="/events"
                          >
                            <span className="box-border block grow min-h-[auto] min-w-[auto] break-words">
                              {" "}
                              Event{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="box-border min-h-[auto] min-w-[auto] break-words">
                          <Link
                            className="relative text-neutral-200/80 items-center box-border flex break-words"
                            to="/donate"
                          >
                            <span className="box-border block grow min-h-[auto] min-w-[auto] break-words">
                              {" "}
                              Donate{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="relative box-border gap-x-0 flex flex-col flex-wrap min-h-[auto] break-words gap-y-0 w-full pt-[30px] px-2.5 md:flex-nowrap md:w-6/12 md:pt-2.5 md:px-0">
                  <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-0">
                    <div className="box-border break-words">
                      <div className="relative box-border break-words">
                        <h4 className="text-white text-lg font-semibold box-border leading-[23.4px] break-words stroke-slate-900 pb-2.5 font-bitter md:text-2xl md:leading-[34px]">
                          {" "}
                          Newsletter{" "}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="relative box-border gap-x-0 h-px max-w-full min-h-[auto] break-words gap-y-0 w-full md:w-[51%]">
                    <div className="relative items-center bg-white dark:bg-slate-900/10 box-border flex h-full justify-center break-words w-full before:accent-auto before:bg-white dark:bg-slate-900 before:box-border before:text-neutral-600 dark:text-neutral-400 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-[0.5px] before:tracking-[normal] before:leading-7 before:list-outside before:list-disc before:break-words before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:translate-y-[-0.25px] before:visible before:w-[70px] before:border-separate before:left-0 before:top-2/4 before:font-inter after:accent-auto after:bg-white dark:bg-slate-900 after:box-border after:text-neutral-600 dark:text-neutral-400 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:h-[0.5px] after:tracking-[normal] after:leading-7 after:list-outside after:list-disc after:break-words after:pointer-events-auto after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:translate-y-[-0.25px] after:visible after:w-[70px] after:border-separate after:top-2/4 after:inset-x-0 after:font-inter">
                      <span className="relative text-[10px] box-border block min-h-[auto] min-w-[auto] break-words"></span>
                    </div>
                  </div>
                  <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-0 mt-[30px]">
                    <div className="box-border break-words">
                      <form
                        aria-label="Contact form"
                        className="box-border break-words"
                      >
                        <fieldset className="box-border hidden break-words p-0"></fieldset>
                        <p className="box-border break-words mb-5">
                          <span className="relative box-border block break-words">
                            <input
                              className="text-white text-sm bg-sky-800"
                              name="your-email"
                              placeholder="Your email address"
                              type="email"
                              defaultValue=""
                            />
                          </span>
                        </p>
                        <div className="absolute box-border break-words w-[46px] z-[1] right-[5px] top-[5px]">
                          <p className="box-border break-words">
                            <input
                              className="text-white text-[0px] font-semibold bg-cyan-800 box-border block h-[46px] leading-[0px] break-words capitalize text-nowrap w-[46px] p-0 rounded-lg"
                              type="submit"
                              value="submit"
                            />
                            <br className="box-border hidden break-words" />
                            <em className="absolute italic box-border block shrink-0 h-[18px] leading-5 break-words pointer-events-none w-[18px] overflow-hidden right-[13px] top-[15px]">
                              <img
                                alt="Icon"
                                className="absolute text-lg box-border h-4 align-baseline w-4 left-0 top-0"
                                src="/assets/footericon.svg"
                              />
                              <br className="absolute text-lg box-border hidden h-[18px] break-words w-[18px] left-0 top-0" />
                              <img
                                alt="Icon"
                                className="absolute text-lg box-border h-4 translate-x-[-150.0%] align-baseline w-4 left-0 top-0"
                                src="/assets/ffootericon2.svg"
                              />
                            </em>
                          </p>
                        </div>
                        <p className="box-border break-words mb-5">
                          <span className="relative box-border block break-words">
                            <span className="box-border inline-block break-words">
                              <span className="box-border inline-block break-words">
                                <label className="text-slate-900 dark:text-white font-medium items-center box-border gap-x-2 flex leading-[26px] break-words gap-y-2 mb-2.5">
                                  <input
                                    className="relative appearance-none text-neutral-600 dark:text-neutral-400 font-normal bg-transparent box-border block h-[18px] leading-[normal] min-h-[auto] min-w-[auto] break-words align-middle w-[18px] border overflow-hidden bg-[position:0px_0px] p-0 rounded-[3px] border-solid border-white"
                                    name="your-consent"
                                    type="checkbox"
                                    defaultValue="1"
                                  />
                                  <span className="text-stone-300/60 box-border block min-h-[auto] min-w-[auto] break-words before:accent-auto before:box-border before:text-stone-300/60 before:text-base before:not-italic before:normal-nums before:font-medium before:tracking-[normal] before:leading-[26px] before:list-outside before:list-disc before:break-words before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border-separate before:font-inter after:accent-auto after:box-border after:text-stone-300/60 after:text-base after:not-italic after:normal-nums after:font-medium after:tracking-[normal] after:leading-[26px] after:list-outside after:list-disc after:break-words after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:border-separate after:font-inter">
                                    I agree to the
                                    <Link
                                      className="text-white/70 text-[15px] box-border inline-block break-words underline"
                                      to="/"
                                    >
                                      Privacy Policy.
                                    </Link>
                                  </span>
                                </label>
                              </span>
                            </span>
                          </span>
                        </p>
                        <div className="relative box-border hidden break-words ml-1.5 mt-2.5 px-4 py-[3.2px]"></div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative items-center box-border gap-x-0 flex flex-col flex-wrap justify-center min-h-[auto] break-words gap-y-2.5 w-full px-2.5 py-[13px] border-t border-solid border-white/10 md:gap-x-5 md:flex-row md:flex-nowrap md:justify-between md:gap-y-5 md:px-0 md:py-[25px]">
                <div className="relative box-border gap-x-5 flex flex-col flex-wrap justify-center min-h-[auto] break-words gap-y-5 w-full md:flex-nowrap md:justify-normal">
                  <div className="relative self-center box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5 md:self-start">
                    <p className="text-white box-border leading-[26px] break-words text-center md:text-left">
                      © 2026 Lohia College. Designed By Lohia College.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
