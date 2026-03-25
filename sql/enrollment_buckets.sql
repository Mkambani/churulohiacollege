-- Create a new storage bucket for enrollments
INSERT INTO storage.buckets (id, name, public) VALUES ('enrollments', 'enrollments', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public uploads to the enrollments bucket
CREATE POLICY "Allow public uploads to enrollments"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'enrollments');

-- Allow public reads from the enrollments bucket
CREATE POLICY "Allow public reads from enrollments"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'enrollments');
