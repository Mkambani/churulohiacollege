-- Create the enrollments table
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    academic_stream TEXT NOT NULL,
    graduation_year INTEGER NOT NULL,
    state TEXT NOT NULL,
    current_city TEXT NOT NULL,
    profile_photo_url TEXT,
    document_url TEXT,
    gender TEXT NOT NULL,
    dob DATE,
    payment_status TEXT DEFAULT 'pending',
    razorpay_payment_id TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow insert for anyone (since it's a public enrollment form)
CREATE POLICY "Allow public insert on enrollments" 
ON public.enrollments FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow read for authenticated users (admin panel)
CREATE POLICY "Allow authenticated read on enrollments" 
ON public.enrollments FOR SELECT 
TO authenticated 
USING (true);

-- Allow update for authenticated users
CREATE POLICY "Allow authenticated update on enrollments" 
ON public.enrollments FOR UPDATE 
TO authenticated 
USING (true);

-- Allow delete for authenticated users
CREATE POLICY "Allow authenticated delete on enrollments" 
ON public.enrollments FOR DELETE 
TO authenticated 
USING (true);
