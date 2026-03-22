import React from 'react';
import { ItineraryDay } from '../data/knowledgeBase';
import { Clock } from 'lucide-react';

interface ItineraryTimelineProps {
  itinerary: ItineraryDay[];
}

const getActivityStyle = (type: string) => {
  if (type === 'session') return 'text-black font-semibold';
  if (type === 'meal') return 'text-emerald-600 font-medium';
  if (type === 'free') return 'text-emerald-500 font-medium';
  return 'text-gray-700';
};

const getDotColor = (type: string) => {
  if (type === 'meal') return 'bg-emerald-500';
  if (type === 'session') return 'bg-black';
  if (type === 'free') return 'bg-emerald-400';
  return 'bg-gray-400';
};

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ itinerary }) => {
  return (
    <div className="w-full max-w-sm bg-white/90 backdrop-blur rounded-2xl border border-gray-200 shadow-md p-4 my-2">
      
      {/* Header */}
      <h4 className="text-sm font-semibold text-gray-900 mb-2">
        Retreat Itinerary
      </h4>
      <p className="text-[11px] text-gray-500 mb-4">
        Structured daily schedule from 9:00 AM – 6:00 PM
      </p>

      <div className="space-y-6">
        {itinerary.map((day, dayIdx) => (
          <div key={dayIdx}>
            
            {/* Day Title */}
            <h5 className="text-sm font-semibold text-gray-900 mb-1">
              {day.day}
            </h5>

            {/* Timeline */}
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              
              {day.schedule.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="relative flex items-center group hover:bg-gray-50 rounded-lg px-2 py-1 transition"
                >
                  
                  {/* Dot */}
                  <div className="flex items-center justify-center w-4 h-4 rounded-full border border-white bg-gray-200 shadow shrink-0 z-10 ml-0.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${getDotColor(item.type)}`}></div>
                  </div>

                  {/* Content */}
                  <div className="w-[calc(100%-2rem)] pl-3">
                    <div className="flex flex-col">
                      
                      {/* Time */}
                      <span className="text-[10px] font-medium text-gray-500 flex items-center">
                        <Clock className="w-2.5 h-2.5 mr-1" />
                        {item.time}
                      </span>

                      {/* Activity */}
                      <div className="flex items-center mt-0.5">
                        <span className={`text-xs ${getActivityStyle(item.type)}`}>
                          {item.activity}
                        </span>

                        {/* Free Tag */}
                        {item.type === 'free' && (
                          <span className="text-[10px] text-emerald-500 ml-2">
                            Included
                          </span>
                        )}
                      </div>

                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};