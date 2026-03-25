-- 1. Create the 'gallery' bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Set up Storage Policies for the 'gallery' bucket with UNIQUE names (Safe Creation)

DO $$ 
BEGIN
    -- Allow anyone to view images in the gallery bucket
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Gallery Public Access') THEN
        CREATE POLICY "Gallery Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');
    END IF;

    -- Allow admins to upload images to the gallery bucket
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Gallery Admin Upload') THEN
        CREATE POLICY "Gallery Admin Upload" ON storage.objects FOR INSERT WITH CHECK ( 
            bucket_id = 'gallery' AND 
            EXISTS (SELECT 1 FROM public.admins WHERE admins.id = auth.uid())
        );
    END IF;

    -- Allow admins to update their images in the gallery bucket
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Gallery Admin Update') THEN
        CREATE POLICY "Gallery Admin Update" ON storage.objects FOR UPDATE WITH CHECK ( 
            bucket_id = 'gallery' AND 
            EXISTS (SELECT 1 FROM public.admins WHERE admins.id = auth.uid())
        );
    END IF;

    -- Allow admins to delete their images from the gallery bucket
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Gallery Admin Delete') THEN
        CREATE POLICY "Gallery Admin Delete" ON storage.objects FOR DELETE USING ( 
            bucket_id = 'gallery' AND 
            EXISTS (SELECT 1 FROM public.admins WHERE admins.id = auth.uid())
        );
    END IF;
END $$;
