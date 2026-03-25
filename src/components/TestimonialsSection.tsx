import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // Fetch reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (reviewsError) throw reviewsError;

      if (reviewsData && reviewsData.length > 0) {
        // Fetch enrollments for these users
        const userIds = reviewsData.map(r => r.user_id);
        const { data: enrollmentsData, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select('user_id, first_name, last_name, profile_photo_url, academic_stream')
          .in('user_id', userIds);

        if (enrollmentsError) {
          console.error("Error fetching enrollments:", enrollmentsError);
        }

        const formattedTestimonials = reviewsData.map((review: any) => {
          const enrollment = enrollmentsData?.find(e => e.user_id === review.user_id);
          return {
            id: review.id,
            name: enrollment ? `${enrollment.first_name} ${enrollment.last_name}` : 'Anonymous Student',
            role: enrollment?.academic_stream || 'Student',
            rating: review.rating,
            quote: review.comment,
            img: enrollment?.profile_photo_url || "https://i.pravatar.cc/150?u=" + review.user_id
          };
        });
        setTestimonials(formattedTestimonials);
      } else {
        setFallbackTestimonials();
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setFallbackTestimonials();
    } finally {
      setIsLoading(false);
    }
  };

  const setFallbackTestimonials = () => {
    setTestimonials([
      {
        id: 1,
        name: "Abdur Rashid",
        role: "Founder & CEO",
        rating: 5.0,
        quote: "At Lohia College, our students are at the heart of everything. Their stories reflect our mission to empower, inspire and prepare them for a rapidly changing world.",
        img: "/src/assets/img1.webp"
      }
    ]);
  };

  const nextSlide = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (isHovered || testimonials.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, testimonials.length]);

  if (isLoading) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-[#FAFAFA]">
        <Loader2 className="animate-spin text-cyan-800" size={40} />
      </div>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section 
      className="pt-5 pb-12 md:pt-8 md:pb-16 bg-[#FAFAFA] relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Massive Background Typography */}
      <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center z-0">
        <span className="text-[18vw] font-black text-slate-100 leading-none whitespace-nowrap tracking-tighter">
          FEEDBACK
        </span>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Editorial Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50 bg-slate-200">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={testimonials[currentIndex].img}
                  alt={testimonials[currentIndex].name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            
            {/* Floating Rating Badge */}
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-cyan-900 text-white p-6 md:p-8 rounded-full w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center text-center shadow-xl shadow-cyan-900/20 z-20">
              <span className="text-3xl md:text-4xl font-space font-bold mb-1">4.9</span>
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] opacity-80 leading-tight mt-1">Average<br/>Rating</span>
            </div>
          </div>

          {/* Right Column: Typography & Controls */}
          <div className="lg:col-span-7 flex flex-col justify-center pt-8 lg:pt-0">
            
            {/* Section Subtitle */}
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-12 bg-cyan-800"></div>
              <span className="uppercase tracking-[0.25em] text-sm font-semibold text-cyan-800 dark:text-cyan-400">Student Voices</span>
            </div>

            {/* Testimonial Content */}
            <div className="relative min-h-[320px] md:min-h-[280px]">
              <Quote className="w-20 h-20 md:w-32 md:h-32 text-slate-200 absolute -top-10 -left-6 md:-top-16 md:-left-12 -z-10 rotate-180 opacity-50" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-space text-slate-900 dark:text-white leading-[1.3] md:leading-[1.2] mb-12">
                    "{testimonials[currentIndex].quote}"
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white font-space">{testimonials[currentIndex].name}</p>
                      <p className="text-cyan-800 dark:text-cyan-400 font-medium mt-1.5 tracking-widest uppercase text-xs">{testimonials[currentIndex].role}</p>
                    </div>
                    <div className="flex gap-1 bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(testimonials[currentIndex].rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls & Progress */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-8 mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
              <div className="flex gap-3">
                <button 
                  onClick={prevSlide}
                  className="w-14 h-14 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:bg-cyan-900 hover:text-white hover:border-cyan-900 transition-all duration-300 group"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-14 h-14 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:bg-cyan-900 hover:text-white hover:border-cyan-900 transition-all duration-300 group"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              {/* Animated Progress Lines */}
              <div className="flex gap-2 flex-1 max-w-[200px]">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className="h-1 rounded-full overflow-hidden flex-1 bg-slate-200 relative"
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    <div 
                      className={`absolute top-0 left-0 h-full bg-cyan-800 transition-all duration-500 ${idx === currentIndex ? 'w-full' : 'w-0'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

