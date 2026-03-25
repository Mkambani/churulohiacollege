-- Create memories table
CREATE TABLE IF NOT EXISTS public.memories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;

-- Create policies for memories table
-- Anyone can read memories
DROP POLICY IF EXISTS "Memories are viewable by everyone" ON public.memories;
CREATE POLICY "Memories are viewable by everyone" 
ON public.memories FOR SELECT 
USING (true);

-- Users can insert their own memories
DROP POLICY IF EXISTS "Users can insert their own memories" ON public.memories;
CREATE POLICY "Users can insert their own memories" 
ON public.memories FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own memories
DROP POLICY IF EXISTS "Users can update their own memories" ON public.memories;
CREATE POLICY "Users can update their own memories" 
ON public.memories FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own memories
DROP POLICY IF EXISTS "Users can delete their own memories" ON public.memories;
CREATE POLICY "Users can delete their own memories" 
ON public.memories FOR DELETE 
USING (auth.uid() = user_id);

-- Create storage bucket for memories if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('memories', 'memories', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for memories bucket
-- Anyone can view memories images
DROP POLICY IF EXISTS "Memories images are publicly accessible" ON storage.objects;
CREATE POLICY "Memories images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'memories');

-- Authenticated users can upload memories images
DROP POLICY IF EXISTS "Users can upload memories images" ON storage.objects;
CREATE POLICY "Users can upload memories images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'memories' 
  AND auth.role() = 'authenticated'
);

-- Users can update their own memories images
DROP POLICY IF EXISTS "Users can update their own memories images" ON storage.objects;
CREATE POLICY "Users can update their own memories images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'memories' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can delete their own memories images
DROP POLICY IF EXISTS "Users can delete their own memories images" ON storage.objects;
CREATE POLICY "Users can delete their own memories images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'memories' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
