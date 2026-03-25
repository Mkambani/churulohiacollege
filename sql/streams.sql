-- Create streams table
CREATE TABLE IF NOT EXISTS streams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL DEFAULT 'Monitor',
  color TEXT NOT NULL DEFAULT 'text-emerald-600',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE streams ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON streams
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON streams
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON streams
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON streams
  FOR DELETE USING (true);

-- Insert initial data
INSERT INTO streams (name, icon, color) VALUES
  ('Art', 'Palette', 'text-amber-600'),
  ('Science', 'Atom', 'text-blue-600'),
  ('Commerce', 'ShoppingCart', 'text-blue-500'),
  ('Computer', 'Monitor', 'text-slate-800 dark:text-slate-200'),
  ('Mathematics', 'Calculator', 'text-pink-500'),
  ('Biology', 'Dna', 'text-green-600'),
  ('Physics', 'Lightbulb', 'text-slate-700 dark:text-slate-300'),
  ('Chemistry', 'FlaskConical', 'text-slate-800 dark:text-slate-200'),
  ('Business Studies', 'BookOpen', 'text-indigo-500')
ON CONFLICT (name) DO NOTHING;
