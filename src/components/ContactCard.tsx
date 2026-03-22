import React from 'react';
import { Mail, Phone, Clock } from 'lucide-react';

interface ContactCardProps {
  contact: {
    name: string;
    role: string;
    email: string;
    phone: string;
    officeHours?: string;
  };
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <div className="w-full max-w-sm rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 my-2 p-4">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-semibold text-sm mr-3">
          {contact.name.charAt(0)}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{contact.name}</h4>
          <p className="text-xs text-gray-500">{contact.role}</p>
        </div>
      </div>
      
      <div className="space-y-2 mt-4">
        <div className="flex items-center text-xs text-gray-600">
          <Mail className="w-3.5 h-3.5 mr-2 text-gray-400" />
          <a href={`mailto:${contact.email}`} className="hover:text-black transition-colors">{contact.email}</a>
        </div>
        <div className="flex items-center text-xs text-gray-600">
          <Phone className="w-3.5 h-3.5 mr-2 text-gray-400" />
          <a href={`tel:${contact.phone}`} className="hover:text-black transition-colors">{contact.phone}</a>
        </div>
        {contact.officeHours && (
          <div className="flex items-center text-xs text-gray-600">
            <Clock className="w-3.5 h-3.5 mr-2 text-gray-400" />
            <span>{contact.officeHours}</span>
          </div>
        )}
      </div>
    </div>
  );
};
