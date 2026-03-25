import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (authError) throw authError;

      setIsSent(true);
    } catch (err: any) {
      console.error("Reset error:", err);
      setError(err.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <div className="p-8 lg:p-12">
          <div className="mb-8">
            <Link to="/login" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-[#063970] dark:hover:text-blue-400 transition-colors text-sm font-bold group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Reset Password</h1>
            <p className="text-slate-500 dark:text-slate-400">Enter your email to receive a reset link</p>
          </div>

          {isSent ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-8 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 rounded-3xl"
            >
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-400 mb-2">Reset Link Sent!</h3>
              <p className="text-emerald-700 dark:text-emerald-500 text-sm mb-6">
                We've sent a password reset link to <span className="font-bold">{email}</span>. Please check your inbox.
              </p>
              <button 
                onClick={() => setIsSent(false)}
                className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline text-sm"
              >
                Didn't receive it? Try again
              </button>
            </motion.div>
          ) : (
            <>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm"
                >
                  <AlertCircle size={18} />
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleReset} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-12 pr-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-[#063970] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#063970] dark:focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#063970] dark:bg-blue-600 text-white py-4 rounded-xl font-bold text-base hover:bg-[#052e5a] dark:hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> Sending link...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
