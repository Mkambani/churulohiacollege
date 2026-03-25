-- Create Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    type TEXT CHECK (type IN ('image', 'video')) DEFAULT 'image',
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Create Policy for Public Read Access
CREATE POLICY "Allow public read access" ON gallery
    FOR SELECT USING (true);

-- Create Policy for Admin Write Access (Restricted to users in the 'admins' table)
CREATE POLICY "Allow admins to manage gallery" ON gallery
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.id = auth.uid()
        )
    );

-- Insert some sample data
INSERT INTO gallery (title, description, url, category, type)
VALUES 
('Main Campus View', 'A beautiful sunset view of the main building.', 'https://picsum.photos/seed/campus1/1200/800', 'Campus', 'image'),
('Annual Sports Day', 'Students participating in the 100m sprint.', 'https://picsum.photos/seed/sports1/1200/800', 'Sports', 'image'),
('Convocation Ceremony', 'The graduating class of 2025.', 'https://picsum.photos/seed/event1/1200/800', 'Events', 'image'),
('Campus Life Highlights', 'A short video showing daily life at Lohia College.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Campus', 'video'),
('Science Lab', 'Students performing experiments in the chemistry lab.', 'https://picsum.photos/seed/academic1/1200/800', 'Academic', 'image'),
('Cultural Fest 2024', 'A vibrant dance performance during the cultural fest.', 'https://picsum.photos/seed/cultural1/1200/800', 'Cultural', 'image');
