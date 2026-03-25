-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- null means broadcast to all
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info',
    is_read BOOLEAN DEFAULT false,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for notifications table
-- Anyone can read notifications (they will be filtered by user_id or user_id IS NULL in the app)
DROP POLICY IF EXISTS "Notifications are viewable by everyone" ON public.notifications;
CREATE POLICY "Notifications are viewable by everyone" 
ON public.notifications FOR SELECT 
USING (true);

-- Authenticated users can insert notifications (Admins will use this)
DROP POLICY IF EXISTS "Users can insert notifications" ON public.notifications;
CREATE POLICY "Users can insert notifications" 
ON public.notifications FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Users can update their own notifications (to mark as read)
DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;
CREATE POLICY "Users can update their own notifications" 
ON public.notifications FOR UPDATE 
USING (auth.uid() = user_id OR user_id IS NULL);

-- Users can delete notifications (Admins will use this)
DROP POLICY IF EXISTS "Users can delete notifications" ON public.notifications;
CREATE POLICY "Users can delete notifications" 
ON public.notifications FOR DELETE 
USING (auth.role() = 'authenticated');
