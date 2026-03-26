import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { StreamSelection } from './alumni/StreamSelection';
import { YearSelection } from './alumni/YearSelection';
import { ProfileList } from './alumni/ProfileList';
import { AlumniProfileDetail } from './alumni/AlumniProfileDetail';

export const AdminAlumni = () => {
  const [view, setView] = useState('streams');
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAlumni, setSelectedAlumni] = useState<any | null>(null);
  
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (view === 'profiles' && selectedStream && year) {
      fetchAlumni();
    }
  }, [view, selectedStream, year]);

  const fetchAlumni = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('is_verified', true)
        .eq('academic_stream', selectedStream)
        .eq('graduation_year', year);

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error("Error fetching alumni:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {view === 'streams' && (
        <div className="w-full py-8">
          <StreamSelection 
            onSelect={(stream) => {
              setSelectedStream(stream);
              setView('years');
            }} 
          />
        </div>
      )}

      {view === 'years' && selectedStream && (
        <div className="w-full py-8">
          <YearSelection 
            selectedStream={selectedStream}
            onSelect={(y) => {
              setYear(y);
              setView('profiles');
            }}
            onBack={() => setView('streams')}
          />
        </div>
      )}

      {view === 'profiles' && selectedStream && year && (
        <div className="w-full py-8">
          <ProfileList 
            year={year}
            selectedStream={selectedStream}
            loading={loading}
            profiles={profiles}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            setViewMode={setViewMode}
            onSelectAlumni={(alumni) => {
              setSelectedAlumni(alumni);
              setView('detail');
            }}
            onBack={() => setView('years')}
            onRefresh={fetchAlumni}
          />
        </div>
      )}

      {view === 'detail' && selectedAlumni && (
        <AlumniProfileDetail 
          selectedAlumni={selectedAlumni}
          selectedStream={selectedStream}
          year={year}
          onBack={() => setView('profiles')}
        />
      )}
    </div>
  );
};

