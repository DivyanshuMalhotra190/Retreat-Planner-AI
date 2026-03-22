import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageBubble, Message } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { retreatPackages, individualSessions, faqs, staffContacts, itineraryTemplates } from '../data/knowledgeBase';
import { MessageSquare, X, Maximize2, Minimize2, Sparkles, Trash2 } from 'lucide-react';

const INITIAL_SUGGESTIONS = [
  "What services do you provide?",
  "Pricing",
  "Contact Staff",
  "Is there parking available?",
  "What should I bring?",
  "Do you offer hotel stays?"
];

type FlowState = 
  | 'idle' 
  | 'asking_service_type' 
  | 'asking_retreat_days' 
  | 'asking_retreat_budget' 
  | 'recommending_retreat'
  | 'showing_itinerary'
  | 'showing_sessions';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const hour = new Date().getHours();
    let greeting = "Good evening";
    if (hour < 12) greeting = "Good morning";
    else if (hour < 18) greeting = "Good afternoon";
    
    return [
      {
        id: 'welcome',
        role: 'bot',
        text: `${greeting}! I am Aria, your Wellness Planner. How can I assist you in finding your perfect wellness journey today?`
      }
    ];
  });
  const [isTyping, setIsTyping] = useState(false);
  const [flowState, setFlowState] = useState<FlowState>('idle');
  const [suggestedQuestions, setSuggestedQuestions] = useState(INITIAL_SUGGESTIONS);
  const [userPreferences, setUserPreferences] = useState<{ days?: string; budget?: string; selectedPackageId?: string }>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);

    // Simulate network delay
    setTimeout(() => {
      processMessage(text);
    }, 1000);
  };

  const handleAction = (action: string) => {
    handleSend(action);
  };

  const clearChat = () => {
    setMessages([]);
    setFlowState('idle');
    setSuggestedQuestions(INITIAL_SUGGESTIONS);
  };

  const processMessage = (text: string) => {
    const lowerText = text.toLowerCase();
    let botResponse: Message = { id: (Date.now() + 1).toString(), role: 'bot' };
    let nextSuggestions = INITIAL_SUGGESTIONS;

    const isServiceInquiry = lowerText.includes('service') || lowerText.includes('provide') || lowerText.includes('what do you do');
    const isContactInquiry = lowerText.includes('contact') || lowerText.includes('staff') || lowerText.includes('speak');

    // Action Handling
    if (lowerText === 'error' || lowerText === 'fail') {
      botResponse.text = "I'm sorry, I'm having trouble connecting to my wellness database right now. Please try again in a moment.";
      botResponse.isError = true;
      setFlowState('idle');
      nextSuggestions = ["Try again", "Contact Staff"];
    }
    else if (lowerText.startsWith('show itinerary for')) {
      const packageName = lowerText.replace('show itinerary for', '').trim();
      const pkg = retreatPackages.find(p => p.name.toLowerCase() === packageName) || retreatPackages[0];
      const itinerary = itineraryTemplates[pkg.duration] || itineraryTemplates['2 Days'];

      setFlowState('showing_itinerary');
      botResponse.text = `Here is a sample itinerary for the ${pkg.name}. Please note that itineraries are flexible and can be adjusted to your needs. 
      
Retreat Details:
• Hotel: Luxury accommodation is included in your stay.
• Parking: Complimentary valet parking is provided.
• Beach & Spa: Enjoy private beach access and full use of our spa facilities (including thermal hydrotherapy circuits).
• Check-in/out: Check-in is 15 minutes before your first session, and check-out is at closing time on your final day.
• What to Bring: We recommend bringing comfortable activewear, a swimsuit for hydrotherapy, and an open mind. We provide all necessary equipment and robes.`;
      botResponse.itinerary = itinerary;

      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'bot',
          text: "Would you like to book this retreat, schedule a pre-retreat call, or explore other options?"
        }]);
      }, 800);

      nextSuggestions = ["Book this retreat", "Schedule a pre-retreat call", "Other retreat packages", "Individual sessions", "Contact Staff"];
    }
    else if (lowerText.includes('book this retreat') || lowerText.includes('book now')) {
      botResponse.text = "Wonderful! To finalize your booking and select your dates, I will connect you with one of our wellness planners.";
      botResponse.contacts = staffContacts;
      setFlowState('idle');
      nextSuggestions = ["What services do you provide?", "Pricing", "Contact Staff"];
    }
    else if (lowerText.includes('schedule a pre-retreat call') || lowerText.includes('schedule call')) {
      botResponse.text = "Your pre-retreat call has been scheduled! Our team will reach out to you shortly with the meeting details.";
      setFlowState('idle');
      nextSuggestions = ["What services do you provide?", "Pricing", "Contact Staff"];
    }
    // Contact Staff Flow
    else if (isContactInquiry) {
      botResponse.text = "I'd be happy to connect you with our team. Here are our lead planners who can assist you further:";
      botResponse.contacts = staffContacts;
      setFlowState('idle');
    }
    // Primary Workflow Trigger
    else if (isServiceInquiry) {
      setFlowState('asking_retreat_preferences');
      botResponse.text = "We offer comprehensive wellness experiences. Would you like to plan a retreat or explore individual sessions?";
      nextSuggestions = ["Plan a retreat", "Individual sessions"];
    }
    // Active Flow States
    else if (flowState === 'asking_retreat_preferences') {
      if (lowerText.includes('retreat')) {
        setFlowState('processing_retreat_preferences');
        botResponse.text = "Excellent choice. How many days would you like to stay and what is your approximate budget? We offer 1, 2, 5, and 7-day retreats.";
        nextSuggestions = ["1 day ($999)", "2 days ($2000)", "5 days ($4500)", "7 days ($6500)"];
      } else if (lowerText.includes('session') || lowerText.includes('individual')) {
        setFlowState('showing_sessions');
        botResponse.text = "We offer a variety of individual healing sessions, each priced at $500 for 1 hour. Here are some of our most popular options:";
        botResponse.sessions = individualSessions.slice(0, 5); // Show top 5 to avoid overwhelming
        nextSuggestions = ["Show more sessions", "Plan a retreat", "Contact Staff"];
      } else {
        botResponse.text = "I didn't quite catch that. Would you prefer to look at our retreat packages or our individual healing sessions?";
        nextSuggestions = ["Plan a retreat", "Individual sessions"];
      }
    }
    else if (flowState === 'processing_retreat_preferences') {
      const input = lowerText;
      let matchedPackage = retreatPackages[1]; // Default 2 days

      if (input.includes('7') || input.includes('seven') || input.includes('6500')) {
        matchedPackage = retreatPackages[3];
      } else if (input.includes('5') || input.includes('five') || input.includes('4500')) {
        matchedPackage = retreatPackages[2];
      } else if (input.includes('2') || input.includes('two') || input.includes('2000')) {
        matchedPackage = retreatPackages[1];
      } else if (input.includes('1') || input.includes('one') || input.includes('999')) {
        matchedPackage = retreatPackages[0];
      }

      setUserPreferences(prev => ({ ...prev, selectedPackageId: matchedPackage.id }));
      setFlowState('recommending_retreat');

      botResponse.text = "Based on your preferences, I highly recommend this package:";
      botResponse.packages = [matchedPackage];
      botResponse.metrics = [
        { label: "Guest Satisfaction", value: "98%" },
        { label: "Reported Improved Relaxation", value: "92%" }
      ];
      
      // Add a follow-up message after a short delay
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'bot',
          text: "Would you like to see what's included in this retreat?"
        }]);
      }, 800);

      nextSuggestions = ["Yes, show itinerary", "No, show other options"];
    }
    else if (flowState === 'recommending_retreat') {
      if (lowerText.includes('yes') || lowerText.includes('itinerary') || lowerText.includes('include')) {
        setFlowState('showing_itinerary');
        
        const pkg = retreatPackages.find(p => p.id === userPreferences.selectedPackageId) || retreatPackages[0];
        const itinerary = itineraryTemplates[pkg.duration] || itineraryTemplates['2 Days'];

        botResponse.text = `Here is a sample itinerary for the ${pkg.name}. Please note that itineraries are flexible and can be adjusted to your needs. 
        
Retreat Details:
• Hotel: Luxury accommodation is included in your stay.
• Parking: Complimentary valet parking is provided.
• Beach & Spa: Enjoy private beach access and full use of our spa facilities (including thermal hydrotherapy circuits).
• Check-in/out: Check-in is 15 minutes before your first session, and check-out is at closing time on your final day.
• What to Bring: We recommend bringing comfortable activewear, a swimsuit for hydrotherapy, and an open mind. We provide all necessary equipment and robes.`;
        botResponse.itinerary = itinerary;

        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'bot',
            text: "Would you like to book this retreat, schedule a pre-retreat call, or explore other options?"
          }]);
        }, 800);

        nextSuggestions = ["Book this retreat", "Schedule a pre-retreat call", "Other retreat packages", "Individual sessions", "Contact Staff"];
      } else {
        setFlowState('asking_retreat_preferences');
        botResponse.text = "No problem. Would you like to explore other retreat lengths or look at individual sessions?";
        nextSuggestions = ["1 day ($999)", "2 days ($2000)", "5 days ($4500)", "7 days ($6500)", "Individual sessions"];
      }
    }
    else if (flowState === 'showing_itinerary') {
      if (lowerText.includes('retreat') || lowerText.includes('other')) {
        setFlowState('processing_retreat_preferences');
        botResponse.text = "How many days would you like to stay and what is your budget? We offer 1, 2, 5, or 7 days.";
        nextSuggestions = ["1 day ($999)", "2 days ($2000)", "5 days ($4500)", "7 days ($6500)"];
      } else if (lowerText.includes('session')) {
        setFlowState('showing_sessions');
        botResponse.text = "Here are our individual healing sessions ($500 / 1 hour):";
        botResponse.sessions = individualSessions.slice(0, 5);
        nextSuggestions = ["Show more sessions", "Contact Staff"];
      } else {
        setFlowState('idle');
        botResponse.text = "Is there anything else I can help you with?";
      }
    }
    else if (flowState === 'showing_sessions') {
      if (lowerText.includes('more')) {
        botResponse.text = "Here are additional sessions we offer:";
        botResponse.sessions = individualSessions.slice(5);
        nextSuggestions = ["Plan a retreat", "Contact Staff"];
      } else if (lowerText.includes('retreat')) {
        setFlowState('processing_retreat_preferences');
        botResponse.text = "Let's plan a retreat. How many days would you like to stay and what is your budget? (1, 2, 5, or 7 days)";
        nextSuggestions = ["1 day ($999)", "2 days ($2000)", "5 days ($4500)", "7 days ($6500)"];
      } else {
        setFlowState('idle');
        botResponse.text = "Let me know if you need help booking any of these sessions.";
      }
    }
    // FAQ Matching
    else {
      const faqKeywords = ['pricing', 'cost', 'parking', 'hotel', 'stay', 'beach', 'spa', 'breakfast', 'lunch', 'dinner', 'cancel', 'book', 'check-in', 'check out', 'bring', 'pack', 'beginner'];
      const hasFaqKeyword = faqKeywords.some(kw => lowerText.includes(kw));
      
      if (hasFaqKeyword) {
        const faqMatch = faqs.find(f => {
          const q = f.question.toLowerCase();
          if (lowerText.includes('pricing') || lowerText.includes('cost')) return q.includes('pricing');
          if (lowerText.includes('parking')) return q.includes('parking');
          if (lowerText.includes('hotel') || lowerText.includes('stay')) return q.includes('hotel');
          if (lowerText.includes('beach')) return q.includes('beach');
          if (lowerText.includes('spa')) return q.includes('spa');
          if (lowerText.includes('breakfast')) return q.includes('breakfast');
          if (lowerText.includes('lunch')) return q.includes('lunch');
          if (lowerText.includes('dinner')) return q.includes('dinner');
          if (lowerText.includes('cancel')) return q.includes('cancel');
          if (lowerText.includes('book')) return q.includes('book');
          if (lowerText.includes('check')) return q.includes('check');
          if (lowerText.includes('bring') || lowerText.includes('pack')) return q.includes('bring');
          if (lowerText.includes('beginner')) return q.includes('beginner');
          return false;
        });
        
        if (faqMatch) {
          botResponse.text = faqMatch.answer;
        } else {
          botResponse.text = "I can help answer questions about pricing, parking, hotel stays, meals, and more. What would you like to know?";
        }
      } else {
        botResponse.text = "I'm not quite sure I understand. I'm here to help you explore our wellness retreats and answer any questions you might have. You can ask me 'What services do you provide?', check pricing, or ask to contact our staff.";
      }
      setFlowState('idle');
    }

    setIsTyping(false);
    setMessages(prev => [...prev, botResponse]);
    setSuggestedQuestions(nextSuggestions);
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors z-50"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              width: isExpanded ? '50vw' : '380px',
              height: isExpanded ? '100vh' : '650px',
              maxHeight: isExpanded ? '100vh' : 'calc(100vh - 48px)',
              bottom: isExpanded ? '0' : '24px',
              right: isExpanded ? '0' : '24px',
              borderRadius: isExpanded ? '0' : '1rem'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bg-white shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-50 origin-bottom-right ${isExpanded ? '' : 'rounded-2xl bottom-6 right-6'}`}
          >
            {/* Header */}
            <div className="px-5 py-4 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                    <Sparkles className="w-5 h-5 text-black" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Aria, Wellness Planner</h3>
                  <p className="text-xs text-gray-500">Online &bull; Ready to assist</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-gray-400">
                <button 
                  onClick={clearChat}
                  className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                  title="Clear Chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 bg-gray-50/50 scroll-smooth">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">How can I help you?</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    I'm Aria, your Wellness Planner. Ask me about our retreats, pricing, or individual sessions.
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} onAction={handleAction} />
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex w-full mb-4 justify-start"
                    >
                      <div className="flex max-w-[85%] flex-row">
                        <div className="flex-shrink-0 flex items-end mr-2">
                          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                            <Sparkles className="w-4 h-4" />
                          </div>
                        </div>
                        <TypingIndicator />
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
              {/* Suggested Questions */}
              <div className="flex overflow-x-auto pb-3 space-x-2 scrollbar-hide">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    disabled={isTyping}
                    className="whitespace-nowrap px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium rounded-full transition-colors disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <ChatInput onSend={handleSend} disabled={isTyping} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
