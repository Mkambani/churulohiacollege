import React, { useState, useRef, useEffect } from "react";
import { Rocket, CheckCircle2, Upload, ArrowLeft, ChevronDown, Loader2, Calendar } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from "../../../lib/supabase";

const degreeLevels = ["Graduate", "Post Graduate"];
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

// Custom Select Component
const CustomSelect = ({ 
  label, 
  options, 
  value, 
  onChange, 
  placeholder 
}: { 
  label: string; 
  options: (string | number)[]; 
  value: string | number; 
  onChange: (val: string | number) => void; 
  placeholder: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-2 relative" ref={dropdownRef}>
      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{label} *</label>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-5 py-4 rounded-xl border ${isOpen ? 'border-[#063970] dark:border-blue-500 ring-1 ring-[#063970] dark:ring-blue-500' : 'border-slate-200 dark:border-slate-700'} bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white cursor-pointer flex justify-between items-center transition-all`}
      >
        <span className={value ? '' : 'text-slate-400 dark:text-slate-500'}>{value || placeholder}</span>
        <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''} text-slate-500`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-60 overflow-y-auto"
          >
            {options.map((opt) => (
              <li 
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className="px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer text-slate-700 dark:text-slate-200 transition-colors"
              >
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SubscriptionFormPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const planName = queryParams.get("plan") || "Standard Plan";
  const planPrice = queryParams.get("price") || "500";
  const mode = queryParams.get("mode") || "new";

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [academicStreams, setAcademicStreams] = useState<string[]>([]);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const { data, error } = await supabase.from('streams').select('name').order('name');
        if (error) throw error;
        setAcademicStreams(data.map(s => s.name));
      } catch (error) {
        console.error('Error fetching streams:', error);
        // Fallback
        setAcademicStreams(["Art", "Science", "Commerce", "Computer", "Mathematics", "Biology", "Physics", "Chemistry", "Business Studies"]);
      }
    };
    fetchStreams();
  }, []);

  // OTP & Password State
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");

  // Form State
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('enrollment_form_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved form data:", e);
      }
    }
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      academicStream: '',
      degreeLevel: '',
      graduationYear: '',
      state: '',
      currentCity: '',
      gender: ''
    };
  });

  useEffect(() => {
    localStorage.setItem('enrollment_form_data', JSON.stringify(formData));
  }, [formData]);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [documents, setDocuments] = useState<FileList | null>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1970 + 1 }, (_, i) => currentYear - i);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // If email changes, reset verification
    if (name === 'email') {
      setIsEmailVerified(false);
      setOtpSent(false);
    }
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      alert("Please enter your email first.");
      return;
    }
    setIsSendingOtp(true);
    setOtpError("");
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          shouldCreateUser: true,
        },
      });
      if (error) throw error;
      setOtpSent(true);
      alert("OTP sent to your email. Please check your inbox.");
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      alert(error.message || "Failed to send OTP.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setOtpError("Please enter the OTP.");
      return;
    }
    setIsVerifyingOtp(true);
    setOtpError("");
    try {
      // Try 'email' type first (standard for signInWithOtp)
      const { error } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: otp,
        type: 'email',
      });
      
      if (error) {
        // If 'email' fails, try 'signup' (common for new users when Confirm Email is ON)
        const { error: signupError } = await supabase.auth.verifyOtp({
          email: formData.email,
          token: otp,
          type: 'signup',
        });
        
        if (signupError) {
          // If both fail, it's truly an invalid OTP
          throw new Error("Invalid or expired OTP. Please check and try again.");
        }
      }
      
      setIsEmailVerified(true);
      setOtpError("");
      alert("Email verified successfully! Now you can set your password.");
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      setOtpError(error.message || "Invalid OTP. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'new' && (!formData.academicStream || !formData.degreeLevel || !formData.graduationYear || !formData.state)) {
      alert("Please fill all required dropdown fields.");
      return;
    }

    if (mode === 'new' && !isEmailVerified) {
      alert("Please verify your email with OTP first.");
      return;
    }

    if (mode === 'new' && password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload files to Supabase (Optional/Graceful fail) - ONLY FOR NEW ENROLLMENTS
      let profilePhotoUrl = '';
      let documentsUrls: string[] = [];

      if (mode === 'new') {
        try {
          if (profilePhoto) {
            const fileExt = profilePhoto.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const { error } = await supabase.storage.from('enrollments').upload(`profiles/${fileName}`, profilePhoto);
            if (!error) {
              profilePhotoUrl = supabase.storage.from('enrollments').getPublicUrl(`profiles/${fileName}`).data.publicUrl;
            } else {
              console.warn("Profile photo upload failed:", error);
            }
          }

          if (documents) {
            for (let i = 0; i < documents.length; i++) {
              const file = documents[i];
              const fileExt = file.name.split('.').pop();
              const fileName = `${Math.random()}.${fileExt}`;
              const { error } = await supabase.storage.from('enrollments').upload(`documents/${fileName}`, file);
              if (!error) {
                documentsUrls.push(supabase.storage.from('enrollments').getPublicUrl(`documents/${fileName}`).data.publicUrl);
              } else {
                console.warn("Document upload failed:", error);
              }
            }
          }
        } catch (uploadEx) {
          console.warn("Supabase upload failed, continuing to payment:", uploadEx);
        }
      }

      // 2. Load Razorpay
      const res = await loadRazorpayScript();
      if (!res) {
        throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
      }

      // 3. Open Razorpay
      const amountInPaise = parseInt(planPrice) * 100;
      const options = {
        key: "rzp_test_STxD0hWZp99yN6",
        amount: amountInPaise.toString(),
        currency: "INR",
        name: "Lohia College",
        description: mode === 'upgrade' ? `Upgrade to ${planName}` : `Enrollment Fee for ${planName}`,
        handler: async function (response: any) {
          // 4. Insert or Update record on success
          try {
            // Update password in Supabase Auth (since user is already logged in via OTP)
            if (mode === 'new') {
              const { error: authError } = await supabase.auth.updateUser({
                password: password
              });
              if (authError) {
                console.warn("Failed to set password, but payment was successful:", authError);
              }
            }

            if (mode === 'upgrade') {
              // Update existing record and make it alumni (is_verified: true)
              const { error: dbError } = await supabase
                .from('enrollments')
                .update({
                  subscription_plan: planName,
                  payment_status: 'paid',
                  is_verified: true, // Automatically become alumni on upgrade
                  razorpay_payment_id: response.razorpay_payment_id
                })
                .eq('email', formData.email);

              if (dbError) throw dbError;
            } else {
              // New enrollment
              const { error: dbError } = await supabase
                .from('enrollments')
                .insert([
                  {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    academic_stream: formData.academicStream,
                    degree_level: formData.degreeLevel,
                    graduation_year: parseInt(formData.graduationYear as string),
                    state: formData.state,
                    current_city: formData.currentCity,
                    profile_photo_url: profilePhotoUrl,
                    document_url: documentsUrls[0] || null,
                    gender: formData.gender,
                    dob: formData.dob,
                    payment_status: 'paid',
                    is_verified: false,
                    subscription_plan: planName,
                    razorpay_payment_id: response.razorpay_payment_id
                  }
                ]);

              if (dbError) throw dbError;
            }
          } catch (dbEx: any) {
            console.error("Database operation failed after payment:", dbEx);
            alert("Payment successful, but failed to update records. Payment ID: " + response.razorpay_payment_id);
          }

          setIsSubmitting(false);
          setIsSubmitted(true);
          localStorage.setItem('active_subscription_plan', planName);
          if (mode === 'new') {
            localStorage.removeItem('enrollment_form_data');
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => {
            navigate("/profile");
          }, 3000);
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#063970"
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on('payment.failed', function () {
        alert("Payment failed or was cancelled. Please try again.");
        setIsSubmitting(false);
      });
      paymentObject.open();

    } catch (error: any) {
      console.error("Error during submission:", error);
      alert(`An error occurred: ${error?.message || JSON.stringify(error) || "Unknown error"}. Please check console for details.`);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-white dark:bg-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100">
      
      {/* Left Side - Full Height Hero */}
      <div className="w-full lg:w-[40%] relative flex flex-col justify-between bg-slate-900 text-white p-8 lg:p-16 min-h-[40vh] lg:min-h-screen lg:sticky lg:top-0 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/college.png"
            alt="University Campus"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Subtle dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10">
          <Link
            to="/subscription"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold"
          >
            <ArrowLeft size={16} /> Back to Plans
          </Link>
        </div>
      </div>

      {/* Right Side - Form Area */}
      <div className="w-full lg:w-[60%] bg-white dark:bg-slate-900 p-6 py-12 lg:p-20 flex flex-col justify-center min-h-screen relative z-20">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto py-20"
          >
            <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-8 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
              <CheckCircle2 size={48} strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {mode === 'upgrade' ? 'Upgrade Successful!' : 'Payment Successful!'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-10 text-lg">
              {mode === 'upgrade' 
                ? `Your plan has been upgraded to ${planName}. You are now an official verified alumni member.`
                : `Your enrollment request for the ${planName} has been successfully submitted and paid. Our team will review your credentials shortly.`
              }
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#063970] dark:bg-blue-600 text-white rounded-xl text-base font-bold hover:bg-[#052e5a] dark:hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20"
            >
              Return to Homepage
            </Link>
          </motion.div>
        ) : mode === 'upgrade' ? (
          <motion.div
            key="upgrade-confirm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-2xl mx-auto"
          >
            <div className="mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Confirm Your Upgrade
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base">
                You're upgrading to the <span className="text-slate-900 dark:text-white font-bold">{planName}</span>. 
                We've already saved your details from your previous enrollment.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 mb-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-slate-500 dark:text-slate-400 font-medium">New Plan</span>
                <span className="text-slate-900 dark:text-white font-bold">{planName}</span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Amount to Pay</span>
                <span className="text-2xl font-black text-[#063970] dark:text-blue-400">₹{planPrice}</span>
              </div>
              <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <span>Automatic verification as Alumni</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 mt-2">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <span>Instant access to premium features</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-[#063970] dark:bg-blue-600 text-white px-12 py-4 rounded-xl font-bold text-base hover:bg-[#052e5a] dark:hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Rocket size={20} />
                    Confirm & Pay ₹{planPrice}
                  </>
                )}
              </button>
              <Link 
                to="/subscription"
                className="w-full sm:w-auto text-center px-8 py-4 text-slate-500 dark:text-slate-400 font-bold hover:text-slate-700 dark:hover:text-white transition-colors"
              >
                Cancel
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Apply for Enrollment
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base">
                Please fill in your details accurately to process your application.
              </p>
            </div>

            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">First Name *</label>
                    <input 
                      required 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      type="text" 
                      placeholder="e.g. John" 
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-[#063970] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#063970] dark:focus:ring-blue-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Last Name *</label>
                    <input 
                      required 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      type="text" 
                      placeholder="e.g. Doe" 
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-[#063970] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#063970] dark:focus:ring-blue-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Your Email *</label>
                    <div className="flex gap-2">
                      <input 
                        required 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isEmailVerified}
                        type="email" 
                        placeholder="john@example.com" 
                        className="flex-1 px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-[#063970] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#063970] dark:focus:ring-blue-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-70" 
                      />
                      {!isEmailVerified && (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={isSendingOtp || !formData.email}
                          className="px-4 py-2 bg-[#063970] text-white rounded-xl font-bold text-xs hover:bg-[#052e5a] transition-colors disabled:opacity-50"
                        >
                          {isSendingOtp ? "Sending..." : otpSent ? "Resend" : "Send OTP"}
                        </button>
                      )}
                      {isEmailVerified && (
                        <div className="flex items-center text-emerald-500 px-2">
                          <CheckCircle2 size={24} />
                        </div>
                      )}
                    </div>
                  </div>

                  {otpSent && !isEmailVerified && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Enter OTP *</label>
                      <div className="flex gap-2">
                        <input 
                          required 
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          type="text" 
                          placeholder="6-digit code" 
                          className="flex-1 px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-[#063970] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#063970] dark:focus:ring-blue-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500" 
                        />
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          disabled={isVerifyingOtp || !otp}
                          className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 transition-colors disabled:opacity-50"
                        >
                          {isVerifyingOtp ? "Verifying..." : "Verify"}
                        </button>
                      </div>
                      {otpError && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs font-bold mt-1"
                        >
                          {otpError}
                        </motion.p>
                      )}
                    </div>
                  )}

                  {isEmailVerified && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Set Password *</label>
                      <input 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" 
                        placeholder="Minimum 6 characters" 
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-[#063970] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#063970] dark:focus:ring-blue-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500" 
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Your Phone *</label>
                    <input 
                      required 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-[#063970] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#063970] dark:focus:ring-blue-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Date of Birth *</label>
                    <div className="relative">
                      <DatePicker
                        selected={formData.dob ? new Date(formData.dob) : null}
                        onChange={(date) => setFormData(prev => ({ ...prev, dob: date ? date.toISOString().split('T')[0] : '' }))}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select Date"
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-[#063970] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#063970] dark:focus:ring-blue-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        maxDate={new Date()}
                      />
                      <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <CustomSelect 
                    label="Academic Stream"
                    options={academicStreams}
                    value={formData.academicStream}
                    onChange={(val) => setFormData(prev => ({ ...prev, academicStream: val.toString() }))}
                    placeholder="Select Stream"
                  />

                  <CustomSelect 
                    label="Degree Level"
                    options={degreeLevels}
                    value={formData.degreeLevel}
                    onChange={(val) => setFormData(prev => ({ ...prev, degreeLevel: val.toString() }))}
                    placeholder="Select Level"
                  />
                  
                  <CustomSelect 
                    label="Graduation Year"
                    options={years}
                    value={formData.graduationYear}
                    onChange={(val) => setFormData(prev => ({ ...prev, graduationYear: val.toString() }))}
                    placeholder="Select Year"
                  />

                  <CustomSelect 
                    label="State"
                    options={indianStates}
                    value={formData.state}
                    onChange={(val) => setFormData(prev => ({ ...prev, state: val.toString() }))}
                    placeholder="Select State"
                  />

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Current City *</label>
                    <input 
                      required 
                      name="currentCity"
                      value={formData.currentCity}
                      onChange={handleInputChange}
                      type="text" 
                      placeholder="e.g. Jaipur" 
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-[#063970] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#063970] dark:focus:ring-blue-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500" 
                    />
                  </div>
                </div>

                {/* File Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="relative group">
                    <input 
                      type="file" 
                      required 
                      accept="image/*" 
                      onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    <div className={`w-full px-5 py-6 rounded-xl border-2 border-dashed ${profilePhoto ? 'border-[#063970] bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30'} text-slate-500 dark:text-slate-400 text-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-[#063970] dark:group-hover:border-blue-500 transition-all flex flex-col items-center justify-center gap-3`}>
                      <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-[#063970] dark:group-hover:text-blue-400 group-hover:scale-110 transition-transform">
                        {profilePhoto ? <CheckCircle2 size={18} className="text-[#063970] dark:text-blue-400" /> : <Upload size={18} />}
                      </div>
                      <span className="text-sm font-bold">{profilePhoto ? profilePhoto.name : 'Upload Profile Photo *'}</span>
                    </div>
                  </div>
                  <div className="relative group">
                    <input 
                      type="file" 
                      required 
                      multiple 
                      accept=".pdf,image/*" 
                      onChange={(e) => setDocuments(e.target.files)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    <div className={`w-full px-5 py-6 rounded-xl border-2 border-dashed ${documents && documents.length > 0 ? 'border-[#063970] bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30'} text-slate-500 dark:text-slate-400 text-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-[#063970] dark:group-hover:border-blue-500 transition-all flex flex-col items-center justify-center gap-3`}>
                      <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-[#063970] dark:group-hover:text-blue-400 group-hover:scale-110 transition-transform">
                        {documents && documents.length > 0 ? <CheckCircle2 size={18} className="text-[#063970] dark:text-blue-400" /> : <Upload size={18} />}
                      </div>
                      <span className="text-sm font-bold">{documents && documents.length > 0 ? `${documents.length} file(s) selected` : 'Upload Documents *'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 pt-2">
                  <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer font-bold">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="male" 
                      required 
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#063970] dark:text-blue-500 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-[#063970] dark:focus:ring-blue-500" 
                    /> Male
                  </label>
                  <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer font-bold">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="female" 
                      required 
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#063970] dark:text-blue-500 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-[#063970] dark:focus:ring-blue-500" 
                    /> Female
                  </label>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-[#063970] dark:bg-blue-600 text-white px-12 py-4 rounded-xl font-bold text-base hover:bg-[#052e5a] dark:hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> Processing...
                      </>
                    ) : (
                      "Register & Pay"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
        )}
      </div>
    </main>
  );
};

