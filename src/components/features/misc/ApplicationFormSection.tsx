import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Loader2, CheckCircle2 } from 'lucide-react';

export const ApplicationFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: dbError } = await supabase
        .from('applications')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            address: formData.address,
            message: formData.message
          }
        ]);

      if (dbError) throw dbError;

      setIsSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err: any) {
      console.error('Error submitting application:', err);
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative box-border gap-x-5 flex flex-col flex-wrap max-w-full break-words gap-y-5 w-full mx-auto md:flex-nowrap before:accent-auto before:box-border before:text-neutral-600 dark:text-neutral-400 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-[max(100%_+_0px,100%)] before:tracking-[normal] before:leading-7 before:list-outside before:list-disc before:break-words before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-[max(100%_+_0px,100%)] before:border-separate before:left-0 before:top-0 before:font-inter">
      <div className="absolute box-border gap-x-5 max-w-full break-words gap-y-5 z-[1] -left-10 top-[140px]">
        <div className="relative box-border h-full break-words text-left w-full">
          <img alt="contact-left-shape1.png" className="relative box-border inline max-w-full break-words z-[1]" src="/assets/contact-left-shape1.webp" />
        </div>
      </div>
      <div className="relative bg-[linear-gradient(rgb(255,255,255)_74%,rgba(3,3,3,0)_0%)] box-border flex flex-col min-h-[auto] break-words w-full px-0">
        <div className="box-border gap-x-5 flex grow flex-wrap h-full min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto pt-[60px] lg:flex-nowrap max-w-full px-5 md:px-20 md:pt-[120px]">
          <div className="relative items-start box-border gap-x-5 flex shrink-0 flex-wrap justify-between min-h-[auto] break-words gap-y-5 w-full px-0 py-2.5 lg:flex-nowrap lg:w-[52%] md:px-2.5">
            <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
              <div className="box-border break-words text-left">
                <div className="relative box-border break-words">
                  <span className="relative text-black dark:text-white text-[15px] font-semibold items-center box-border inline-flex leading-[25px] break-words uppercase mb-[15px]">
                    <img alt="Icon" className="relative box-border h-6 align-baseline w-6 mr-2.5" src="/assets/success-cap-color.svg" />
                    Apply Today Now
                  </span>
                  <h2 className="text-black dark:text-white text-[26px] font-semibold box-border leading-[33.8px] break-words stroke-slate-900 mb-[15px] font-bitter md:text-[42px] md:leading-[52px]">
                    Start Your Journey with Lohia College
                  </h2>
                </div>
                <div className="box-border break-words">
                  <p className="box-border break-words"> Enroll now to begin your transformative academic journey with us. </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative bg-white dark:bg-slate-900 shadow-[rgba(0,0,0,0.06)_0px_0px_30px_0px] box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full z-[3] px-5 py-[30px] rounded-xl lg:flex-nowrap lg:w-[48%] md:px-[43px] md:py-10">
            <div className="relative self-start box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
              <div className="box-border break-words">
                <div className="relative box-border break-words">
                  <h4 className="text-black dark:text-white text-lg font-semibold box-border leading-[23.4px] break-words stroke-slate-900 mb-1.5 font-bitter md:text-2xl md:leading-[34px]"> Application Form </h4>
                </div>
              </div>
            </div>
            <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
              <div className="box-border break-words">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Application Submitted!</h3>
                    <p className="text-slate-500 dark:text-slate-400">Thank you for applying. We will get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} aria-label="Contact form" className="box-border break-words">
                    {error && (
                      <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-100 dark:border-red-800/30">
                        {error}
                      </div>
                    )}
                    <fieldset className="box-border hidden break-words p-0"></fieldset>
                    <div className="relative box-border gap-x-5 grid grid-cols-[repeat(1,minmax(0px,1fr))] break-words gap-y-5 w-full md:grid-cols-[repeat(2,minmax(0px,1fr))]">
                      <div className="relative box-border min-h-[auto] min-w-[auto] break-words">
                        <p className="box-border break-words">
                          <span className="relative box-border block break-words">
                            <input required value={formData.firstName} onChange={handleInputChange} className="box-border block h-[50px] leading-[normal] break-words w-full border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-5 py-2.5 rounded-lg border-solid outline-none focus:border-sky-500 transition-colors" name="firstName" placeholder="First Name" type="text" />
                          </span>
                        </p>
                      </div>
                      <div className="relative box-border min-h-[auto] min-w-[auto] break-words">
                        <p className="box-border break-words">
                          <span className="relative box-border block break-words">
                            <input required value={formData.lastName} onChange={handleInputChange} className="box-border block h-[50px] leading-[normal] break-words w-full border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-5 py-2.5 rounded-lg border-solid outline-none focus:border-sky-500 transition-colors" name="lastName" placeholder="Last Name" type="text" />
                          </span>
                        </p>
                      </div>
                      <div className="relative box-border min-h-[auto] min-w-[auto] break-words">
                        <p className="box-border break-words">
                          <span className="relative box-border block break-words">
                            <input required value={formData.phone} onChange={handleInputChange} className="box-border block h-[50px] leading-[normal] break-words w-full border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-5 py-2.5 rounded-lg border-solid outline-none focus:border-sky-500 transition-colors" name="phone" placeholder="Phone Number" type="tel" />
                          </span>
                        </p>
                      </div>
                      <div className="relative box-border min-h-[auto] min-w-[auto] break-words">
                        <p className="box-border break-words">
                          <span className="relative box-border block break-words">
                            <input required value={formData.address} onChange={handleInputChange} className="box-border block h-[50px] leading-[normal] break-words w-full border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-5 py-2.5 rounded-lg border-solid outline-none focus:border-sky-500 transition-colors" name="address" placeholder="Address" type="text" />
                          </span>
                        </p>
                      </div>
                      <div className="relative box-border col-end-[span_1] col-start-[span_1] min-h-[auto] min-w-[auto] break-words md:col-end-[span_2] md:col-start-[span_2]">
                        <p className="box-border break-words">
                          <span className="relative box-border block break-words">
                            <textarea required value={formData.message} onChange={handleInputChange} className="box-border block h-[140px] leading-[normal] w-full border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-5 py-2.5 rounded-lg outline-none focus:border-sky-500 transition-colors" name="message" placeholder="Message"></textarea>
                          </span>
                        </p>
                      </div>
                      <div className="relative box-border col-end-[span_1] col-start-[span_1] min-h-[auto] min-w-[auto] break-words md:col-end-[span_2] md:col-start-[span_2]">
                        <div className="relative box-border break-words text-center w-full z-[1]">
                          <p className="box-border break-words">
                            <button disabled={isSubmitting} className="text-white text-[15px] font-medium bg-sky-500 hover:bg-sky-600 transition-colors box-border flex justify-center items-center h-[50px] leading-[18.75px] break-words uppercase text-nowrap w-full p-0 rounded-md disabled:opacity-70" type="submit">
                              {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : "Apply Now"}
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full mt-5 px-5 lg:flex-nowrap lg:mt-[-527px]">
        <div className="relative bg-sky-500 bg-[url('/assets/unversity.png')] bg-no-repeat bg-cover box-border flex flex-col min-h-[400px] break-words w-full z-[2] overflow-hidden bg-center rounded-2xl md:min-h-[600px] before:accent-auto before:bg-[linear-gradient(96.26deg,rgba(0,58,101,0)_0%,rgb(12,87,118)_99.06%)] before:box-border before:text-neutral-600 dark:text-neutral-400 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-[max(100%_+_0px,100%)] before:tracking-[normal] before:leading-7 before:list-outside before:list-disc before:break-words before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-[max(100%_+_0px,100%)] before:rounded-2xl before:border-separate before:left-0 before:top-0 before:font-inter">
          <div className="items-end box-border gap-x-5 flex grow flex-wrap h-full max-w-[min(100%,767px)] min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto md:flex-nowrap md:max-w-[min(100%,1300px)]">
            <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
              <div className="relative box-border h-full break-words text-left w-full">
                <img alt="contact-img1-1-min" className="relative box-border inline max-w-full break-words w-[200px] z-[1] md:w-[355px]" src="/assets/form.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
