import React from 'react';
import { RetreatPackage } from '../data/knowledgeBase';
import { Clock, Tag, CheckCircle2 } from 'lucide-react';

interface PackageCardProps {
  pkg: RetreatPackage;
  onAction?: (action: string) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, onAction }) => {
  return (
    <div className="w-full max-w-sm rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 my-2">
      <div className="h-32 w-full relative">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="object-cover w-full h-full"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-white text-xs font-medium px-2 py-1 rounded-full">
          {pkg.tier}
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-1">{pkg.name}</h4>
        <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
          <span className="flex items-center">
            <Tag className="w-3 h-3 mr-1" />
            {pkg.price}
          </span>
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {pkg.duration}
          </span>
        </div>
        <ul className="space-y-1.5 mb-4">
          {pkg.highlights.map((highlight, idx) => (
            <li key={idx} className="flex items-start text-xs text-gray-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-gray-400 mr-1.5 shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <div className="flex space-x-2">
          <button 
            onClick={() => onAction?.(`Show itinerary for ${pkg.name}`)}
            className="flex-1 py-2 bg-gray-100 text-gray-900 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors">
            View Details
          </button>
          <button 
            onClick={() => onAction?.(`Book now`)}
            className="flex-1 py-2 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
