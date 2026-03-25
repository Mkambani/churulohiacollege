import React from 'react';
import { PageBanner } from './PageBanner';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const [activePlan, setActivePlan] = React.useState<string | null>(null);

  React.useEffect(() => {
    const savedPlan = localStorage.getItem('active_subscription_plan');
    if (savedPlan) {
      setActivePlan(savedPlan);
    }
  }, []);

  const handlePlanSelect = (planName: string, price: string) => {
    const mode = activePlan ? 'upgrade' : 'new';
    navigate(`/subscription/register?plan=${encodeURIComponent(planName)}&price=${price}&mode=${mode}`);
  };

  const plans = [
    {
      name: "Basic Plan",
      price: "199",
      period: "Month",
      description: "Perfect for students starting their journey with essential resources.",
      features: [
        "Access to Library Resources",
        "Standard Course Materials",
        "Online Student Portal",
        "Basic Career Counseling",
        "Campus Wi-Fi Access"
      ],
      buttonText: "Choose Basic",
      recommended: false
    },
    {
      name: "Standard Plan",
      price: "299",
      period: "Month",
      description: "Our most popular plan for dedicated students seeking more opportunities.",
      features: [
        "All Basic Plan Features",
        "Premium Research Databases",
        "Priority Lab Access",
        "Monthly Workshop Entry",
        "One-on-One Mentorship",
        "Internship Assistance"
      ],
      buttonText: "Choose Standard",
      recommended: true
    },
    {
      name: "Premium Plan",
      price: "499",
      period: "Month",
      description: "Comprehensive access for students aiming for the highest academic excellence.",
      features: [
        "All Standard Plan Features",
        "Unlimited Lab Access",
        "Exclusive Seminar Invites",
        "Advanced Research Support",
        "Personal Academic Advisor",
        "Global Alumni Network Access"
      ],
      buttonText: "Choose Premium",
      recommended: false
    }
  ];

  const activePlanData = plans.find(p => p.name === activePlan);
  const activePlanPrice = activePlanData ? parseInt(activePlanData.price) : 0;

  const visiblePlans = plans.filter(plan => {
    if (!activePlan) return true;
    return parseInt(plan.price) > activePlanPrice;
  });

  if (activePlan === "Premium Plan") {
    return (
      <main className="min-h-[auto] min-w-[auto] break-words">
        <PageBanner 
          title="Subscription Plans" 
          breadcrumb="Subscription" 
          bgImage="/assets/page-bnr-img1-4-min.webp"
          description="You are already on our best plan! Enjoy your premium benefits."
        />
        <div className="relative flex flex-col max-w-full break-words w-full mx-auto px-5 bg-stone-100 dark:bg-slate-800 py-[70px] md:py-[110px] text-center">
          <div className="max-w-[1300px] mx-auto w-full">
            <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">You have the Premium Plan!</h2>
            <p className="text-slate-600 dark:text-slate-400">Thank you for being a premium member of Lohia College.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[auto] min-w-[auto] break-words">
      <PageBanner 
        title="Subscription Plans" 
        breadcrumb="Subscription" 
        bgImage="/assets/page-bnr-img1-4-min.webp"
        description={activePlan ? "Upgrade your plan to unlock even more academic potential at Lohia College." : "Choose the plan that best fits your academic goals and unlock your full potential at Lohia College."}
      />
      
      <div className="relative flex flex-col max-w-full break-words w-full mx-auto px-5 bg-stone-100 dark:bg-slate-800 py-[70px] md:py-[110px]">
        <div className="max-w-[1300px] mx-auto w-full">
          <div className="text-center mb-16">
            <span className="relative text-cyan-800 dark:text-cyan-400 text-[15px] font-semibold items-center inline-flex break-words uppercase mb-3.5">
              <img alt="Icon" className="relative h-6 align-baseline w-6 mr-2.5" src="/assets/success-cap-color.svg" />
              {activePlan ? 'Upgrade Your Plan' : 'Our Pricing'}
            </span>
            <h2 className="text-black dark:text-white text-[26px] font-semibold leading-[33.8px] break-words stroke-slate-900 font-bitter md:text-[42px] md:leading-[52px]">
              {activePlan ? 'Unlock More Benefits' : 'Affordable Academic Plans'}
            </h2>
          </div>

          <div className={`grid grid-cols-1 ${visiblePlans.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' : visiblePlans.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-3'} gap-8`}>
            {visiblePlans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-[rgba(0,0,0,0.06)_0px_4px_30px_0px] flex flex-col transition-transform hover:-translate-y-2 duration-300 ${plan.recommended ? 'border-2 border-sky-500' : ''}`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-500 text-white px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">
                    Recommended
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-black dark:text-white mb-2 font-bitter">{plan.name}</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm">{plan.description}</p>
                </div>

                <div className="mb-8 flex items-baseline">
                  <span className="text-4xl font-bold text-sky-500">₹{plan.price}</span>
                  <span className="text-neutral-500 dark:text-neutral-400 ml-2">/ {plan.period}</span>
                </div>

                <div className="flex-grow mb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                        <Check className="text-sky-500 shrink-0" size={18} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => handlePlanSelect(plan.name, plan.price)}
                  className={`w-full py-4 rounded-xl font-semibold transition-colors duration-300 ${
                    plan.recommended 
                      ? 'bg-sky-500 text-white hover:bg-sky-600' 
                      : 'bg-stone-100 dark:bg-slate-800 text-black dark:text-white hover:bg-stone-200'
                  }`}
                >
                  {activePlan ? 'Upgrade' : plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
