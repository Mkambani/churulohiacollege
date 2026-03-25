import React from "react";
import { PageBanner } from "./PageBanner";
import { ContactInfoCard } from "./ContactInfoCard";
import { ContactForm } from "./ContactForm";

export const ContactPage: React.FC = () => {
  return (
    <main className="box-border min-h-[auto] min-w-[auto] break-words bg-stone-100 dark:bg-slate-800">
      <PageBanner
        title="Contact"
        breadcrumb="Contact"
        bgImage="/assets/page-bnr-img17-min.webp"
        description="Education goes beyond textbooks and classrooms. We believe in empowering students to explore their passions challenge conventions."
      />

      <div className="box-border break-words">
        {/* Contact Info Cards */}
        <div className="relative bg-stone-100 dark:bg-slate-800 box-border flex flex-col max-w-full break-words w-full mx-auto px-2.5">
          <div className="box-border gap-x-2.5 flex flex-col grow flex-wrap h-full max-w-[min(100%,767px)] min-h-[auto] min-w-[auto] break-words gap-y-2.5 w-full mx-auto py-[70px] md:flex-nowrap md:max-w-[min(100%,1300px)] md:py-[110px]">
            <div className="relative box-border gap-x-[18px] flex flex-wrap justify-center min-h-[auto] break-words gap-y-[18px] w-full p-2.5 md:gap-x-[30px] md:flex-nowrap md:justify-between md:gap-y-[30px]">
              <ContactInfoCard
                title="Support Email"
                icon="/assets/icon-41.svg"
              >
                <a
                  href="mailto:infoexample@lohiacollege.edu"
                  className="hover:text-cyan-800 dark:hover:text-cyan-400 dark:text-cyan-400 transition-colors"
                >
                  infoexample@lohiacollege.edu
                </a>
                <br />
                <a
                  href="mailto:info@lohiacollege.edu"
                  className="hover:text-cyan-800 dark:hover:text-cyan-400 dark:text-cyan-400 transition-colors"
                >
                  info@lohiacollege.edu
                </a>
              </ContactInfoCard>

              <ContactInfoCard
                title="Phone Number"
                icon="/assets/icon-42-2.svg"
              >
                <a
                  href="tel:+91 9587826831"
                  className="hover:text-cyan-800 dark:hover:text-cyan-400 dark:text-cyan-400 transition-colors"
                >
                  (+91) 9521045443
                </a>
                <br />
                <a
                  href="tel: 91 9587826831"
                  className="hover:text-cyan-800 dark:hover:text-cyan-400 dark:text-cyan-400 transition-colors"
                >
                  + 91 9521045443
                </a>
              </ContactInfoCard>

              <ContactInfoCard
                title="Address"
                icon="/assets/icon-43-2.svg"
              >
                <p>Near suncity hotel churu 331001</p>
              </ContactInfoCard>

              <ContactInfoCard
                title="Admission"
                icon="/assets/icon-44-1.svg"
              >
                <a
                  href="mailto:admission@lohiacollege.edu"
                  className="hover:text-cyan-800 dark:hover:text-cyan-400 dark:text-cyan-400 transition-colors"
                >
                  admission@lohiacollege.edu
                </a>
                <br />
                <a
                  href="tel:91 9587826831"
                  className="hover:text-cyan-800 dark:hover:text-cyan-400 dark:text-cyan-400 transition-colors"
                >
                  91 9521045443
                </a>
              </ContactInfoCard>
            </div>

            {/* Form and Map Section */}
            <div className="relative box-border gap-x-[30px] flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full p-2.5 md:flex-row md:flex-nowrap">
              <ContactForm />

              {/* Map */}
              <div className="relative box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full overflow-hidden md:flex-nowrap md:w-6/12">
                <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5 w-full h-full overflow-hidden rounded-xl">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3513.24271954381!2d74.96487707612849!3d28.29097069950809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39149e027346269f%3A0xcd3564d2b0661b08!2sGovernment%20Lohia%20College!5e0!3m2!1sen!2ssg!4v1774436493688!5m2!1sen!2ssg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
