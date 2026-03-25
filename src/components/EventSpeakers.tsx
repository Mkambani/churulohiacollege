import React from 'react';

interface Speaker {
  name: string;
  role: string;
  imageUrl: string;
}

interface EventSpeakersProps {
  speakers?: Speaker[];
}

export const EventSpeakers: React.FC<EventSpeakersProps> = ({ speakers }) => {
  const defaultSpeakers = [
    { name: "Dr. A. Sharma", role: "Professor", imageUrl: "https://img.freepik.com/premium-photo/indian-male-teacher_981168-3023.jpg?semt=ais_hybrid&w=740&q=80" },
    { name: "Dr. E. Reddy", role: "Director", imageUrl: "https://thumbs.dreamstime.com/b/portrait-young-indian-male-teacher-headset-sitting-office-front-camera-teaching-talking-online-290833072.jpg" },
    { name: "Prof. S. Iyer", role: "Lecturer", imageUrl: "https://thumbs.dreamstime.com/b/portrait-young-happy-indian-business-man-executive-looking-camera-portrait-young-happy-indian-business-man-executive-214230764.jpg" },
    { name: "Dr. M. Desai", role: "Associate Professor", imageUrl: "https://thumbs.dreamstime.com/b/serious-indian-professional-business-man-office-portrait-serious-young-ambitious-indian-businessman-project-leader-dressed-367980912.jpg" },
    { name: "Sneha L. Gupta", role: "Guest Speaker", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrYJR5TncyvYXnqz-KZcCGtNIm1RtF8Br1Xg&s" },
    { name: "Rohan L. Joshi", role: "Guest Speaker", imageUrl: "https://thumbs.dreamstime.com/b/male-school-teacher-9719348.jpg" },
  ];

  const displaySpeakers = speakers && speakers.length > 0 ? speakers : defaultSpeakers;

  return (
    <div className="relative box-border gap-x-[18px] max-w-full min-h-[auto] break-words gap-y-[18px] md:gap-x-0 md:gap-y-0">
      <div className="box-border break-words">
        <div className="box-border gap-x-[30px] grid grid-cols-[repeat(1,minmax(0px,1fr))] break-words gap-y-[30px] md:grid-cols-[repeat(3,minmax(0px,1fr))]">
          {displaySpeakers.map((speaker, index) => (
            <div key={index} className="relative bg-white dark:bg-slate-900 shadow-[rgba(0,0,0,0.06)_0px_4px_30px_0px] box-border min-h-[auto] min-w-[auto] break-words text-center rounded-[10px]">
              <div className="relative box-border break-words overflow-hidden rounded-t-[10px]">
                <img src={speaker.imageUrl || 'https://via.placeholder.com/400'} alt={speaker.name} className="aspect-square box-border inline max-w-full object-cover break-words w-full rounded-t-[10px]" />
              </div>
              <div className="box-border break-words px-[15px] py-[18px]">
                <h5 className="text-black dark:text-white text-base font-semibold box-border leading-[20.8px] break-words font-bitter md:text-xl md:leading-[30px]">{speaker.name}</h5>
                <span className="text-[15px] box-border block break-words text-slate-500 dark:text-slate-400">{speaker.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
