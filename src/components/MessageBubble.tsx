import React from 'react';
import { motion } from 'motion/react';
import { PackageCard } from './PackageCard';
import { SessionCard } from './SessionCard';
import { ItineraryTimeline } from './ItineraryTimeline';
import { ContactCard } from './ContactCard';
import { RetreatPackage, IndividualSession, ItineraryDay } from '../data/knowledgeBase';
import { Sparkles, User } from 'lucide-react';

export interface Message {
  id: string;
  role: 'user' | 'bot';
  text?: string;
  packages?: RetreatPackage[];
  sessions?: IndividualSession[];
  itinerary?: ItineraryDay[];
  contacts?: any[];
  metrics?: { label: string; value: string }[];
  isTyping?: boolean;
  isError?: boolean;
}

interface MessageBubbleProps {
  message: Message;
  onAction?: (action: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onAction }) => {
  const isBot = message.role === 'bot';
  const isError = message.isError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 flex items-end ${isBot ? 'mr-2' : 'ml-2'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isBot ? (isError ? 'bg-red-100 text-red-600' : 'bg-black text-white') : 'bg-gray-200 text-gray-600'}`}>
            {isBot ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          {message.text && (
            <div
              className={`px-4 py-3 text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                isBot
                  ? isError 
                    ? 'bg-red-50 border border-red-100 text-red-800 rounded-2xl rounded-bl-sm'
                    : 'bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-bl-sm'
                  : 'bg-black text-white rounded-2xl rounded-br-sm'
              }`}
            >
              {message.text}
            </div>
          )}
          
          {/* Metrics */}
          {message.metrics && message.metrics.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.metrics.map((metric, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-100 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">{metric.label}</span>
                  <span className="text-sm font-bold text-black">{metric.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Packages */}
          {message.packages && message.packages.length > 0 && (
            <div className="mt-2 space-y-3">
              {message.packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} onAction={onAction} />
              ))}
            </div>
          )}

          {/* Sessions */}
          {message.sessions && message.sessions.length > 0 && (
            <div className="mt-2 space-y-3">
              {message.sessions.map((session) => (
                <SessionCard key={session.id} session={session} onAction={onAction} />
              ))}
            </div>
          )}

          {/* Itinerary */}
          {message.itinerary && message.itinerary.length > 0 && (
            <div className="mt-2">
              <ItineraryTimeline itinerary={message.itinerary} />
            </div>
          )}

          {/* Contacts */}
          {message.contacts && message.contacts.length > 0 && (
            <div className="mt-2 space-y-3">
              {message.contacts.map((contact, idx) => (
                <ContactCard key={idx} contact={contact} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
