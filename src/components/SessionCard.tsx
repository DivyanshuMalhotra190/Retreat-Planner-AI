import React from 'react';
import { IndividualSession } from '../data/knowledgeBase';
import { Clock, Tag } from 'lucide-react';

interface SessionCardProps {
  session: IndividualSession;
  onAction?: (action: string) => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session, onAction }) => {
  return (
    <div className="w-full max-w-sm rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 my-2 p-4">
      <h4 className="text-sm font-semibold text-gray-900 mb-1">{session.name}</h4>
      <p className="text-xs text-gray-600 mb-3">{session.benefit}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-xs text-gray-500 space-x-4">
          <span className="flex items-center">
            <Tag className="w-3 h-3 mr-1" />
            {session.price}
          </span>
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {session.duration}
          </span>
        </div>
        <button 
          onClick={() => onAction?.(`Book now`)}
          className="px-3 py-1.5 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors">
          Book
        </button>
      </div>
    </div>
  );
};
