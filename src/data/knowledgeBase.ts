export interface RetreatPackage {
  id: string;
  name: string;
  price: string;
  duration: string;
  goal: string;
  tier: string;
  highlights: string[];
  image?: string;
}

export const retreatPackages: RetreatPackage[] = [
  {
    id: 'p0',
    name: 'Day Retreat',
    price: '$999',
    duration: '1 Day',
    goal: 'Quick reset',
    tier: 'Standard',
    highlights: ['Welcome Ceremony', 'BioWell Diagnostics', 'RLX Satori'],
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'p1',
    name: 'Weekend Reset',
    price: '$2000',
    duration: '2 Days',
    goal: 'Deep relaxation',
    tier: 'Standard',
    highlights: ['Thermal Hydrotherapy', 'Regression Hypnotherapy', 'Reiki'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'p2',
    name: 'Deep Healing Immersion',
    price: '$4500',
    duration: '5 Days',
    goal: 'Emotional healing',
    tier: 'Premium',
    highlights: ['Quantum Peak Workshop', 'Tantric Bodywork', 'Shadow Work'],
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'p3',
    name: 'Luxury Conscious Rewire',
    price: '$6500',
    duration: '7 Days',
    goal: 'Total transformation',
    tier: 'Luxury',
    highlights: ['1:1 coaching', 'Acupuncture', 'BioWell analysis'],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800',
  },
];

export interface IndividualSession {
  id: string;
  name: string;
  price: string;
  duration: string;
  benefit: string;
}

export const individualSessions: IndividualSession[] = [
  { id: 's1', name: 'Hypnotherapy', price: '$500', duration: '1 hour', benefit: 'Reprogram subconscious patterns' },
  { id: 's2', name: 'Yoga Therapy', price: '$500', duration: '1 hour', benefit: 'Balance body and mind' },
  { id: 's3', name: 'Acupuncture', price: '$500', duration: '1 hour', benefit: 'Improve energy flow and healing' },
  { id: 's4', name: 'Sound Healing', price: '$500', duration: '1 hour', benefit: 'Deep relaxation through frequencies' },
  { id: 's5', name: 'Reiki', price: '$500', duration: '1 hour', benefit: 'Energy alignment and stress reduction' },
  { id: 's6', name: 'BioWell Analysis', price: '$500', duration: '1 hour', benefit: 'Energy field diagnostics' },
  { id: 's7', name: 'Spiritual Advisory', price: '$500', duration: '1 hour', benefit: 'Clarity and life direction' },
  { id: 's8', name: 'Breathwork', price: '$500', duration: '1 hour', benefit: 'Release tension and increase oxygen flow' },
  { id: 's9', name: 'Beach Meditation', price: '$500', duration: '1 hour', benefit: 'Grounding in nature' },
  { id: 's10', name: 'Thermal Hydrotherapy Circuit', price: '$500', duration: '1 hour', benefit: 'Detoxification and muscle relaxation' },
];

export const faqs = [
  { question: 'What is the pricing?', answer: 'Retreats range from $999 for 1 day to $6500 for 7 days. Individual sessions are $500 per hour.' },
  { question: 'Is there parking available?', answer: 'Yes, complimentary valet parking is included for all retreat guests and session attendees.' },
  { question: 'Do you offer hotel stays?', answer: 'Our retreat packages include luxury accommodation. Individual session guests can book day passes or overnight stays separately.' },
  { question: 'Is there beach access?', answer: 'Yes, our property features private beach access for morning meditations and relaxation.' },
  { question: 'Can I book a spa day?', answer: 'Absolutely. You can book a combination of our individual sessions for a customized spa day experience.' },
  { question: 'What is served for breakfast?', answer: 'We serve an organic, plant-forward breakfast featuring fresh juices, smoothie bowls, and locally sourced ingredients.' },
  { question: 'What is served for lunch?', answer: 'Lunch is a nourishing, balanced meal designed by our holistic nutritionists to sustain your energy.' },
  { question: 'What is served for dinner?', answer: 'Dinner is an elegant, multi-course wellness dining experience, tailored to your dietary needs.' },
  { question: 'What is the cancellation policy?', answer: 'Cancellations made 14 days prior to arrival receive a full refund. Later cancellations may be subject to a fee.' },
  { question: 'What is the booking process?', answer: 'You can book directly through this planner, or contact our staff for a personalized consultation.' },
  { question: 'What are the check-in and check-out times?', answer: 'Check-in is 15 minutes before your first session, and check-out is at closing time of your final day.' },
  { question: 'What should I bring?', answer: 'Comfortable activewear, a swimsuit for hydrotherapy, and an open mind. We provide all necessary equipment and robes.' },
  { question: 'Are sessions beginner friendly?', answer: 'Yes, all our sessions are tailored to your experience level. Beginners are completely welcome.' },
];

export const staffContacts = [
  {
    name: 'Eleanor Vance',
    role: 'Lead Wellness Planner',
    email: 'eleanor@retreatwellness.com',
    phone: '+1 (555) 019-2834',
    officeHours: 'Mon-Fri, 9:00 AM - 7:00 PM EST'
  },
  {
    name: 'Dr. Marcus Chen',
    role: 'Holistic Director',
    email: 'marcus@retreatwellness.com',
    phone: '+1 (555) 019-2835',
    officeHours: 'Thur-Sun, 9:00 AM - 7:00 PM EST'
  }
];

export interface ItineraryItem {
  time: string;
  activity: string;
  type: 'meal' | 'session' | 'free';
}

export interface ItineraryDay {
  day: string;
  schedule: ItineraryItem[];
}

export const itineraryTemplates: Record<string, ItineraryDay[]> = {
  '1 Day': [
    {
      day: 'Day 1',
      schedule: [
        { time: '9:00 AM', activity: 'Welcome Ceremony & Intention Setting', type: 'session' },
        { time: '9:30 AM', activity: 'Biowell Diagnostics & Spiritual Advisory', type: 'session' },
        { time: '11:30 AM', activity: 'RLX Satori - Mind, Body Detox', type: 'session' },
        { time: '12:00 PM', activity: 'Gourmet Lunch', type: 'meal' },
        { time: '1:30 PM', activity: 'Thermal Hydrotherapy Circuits', type: 'free' },
        { time: '2:30 PM', activity: 'Reiki Energy Healing', type: 'session' },
        { time: '3:30 PM', activity: 'Shadow Work', type: 'session' },
        { time: '5:00 PM', activity: 'Sound Healing', type: 'session' },
        { time: '6:00 PM', activity: 'Closing Ceremony', type: 'session' }
      ]
    }
  ],
  '2 Days': [
    {
      day: 'Day 1',
      schedule: [
        { time: '9:00 AM', activity: 'Welcome Ceremony & Intention Setting', type: 'session' },
        { time: '9:30 AM', activity: 'Biowell Diagnostics & Spiritual Advisory (In-body Scan, Chiro)', type: 'session' },
        { time: '11:30 AM', activity: 'RLX Satori - Mind, Body Detox', type: 'session' },
        { time: '12:00 PM', activity: 'Gourmet Lunch', type: 'meal' },
        { time: '1:30 PM', activity: 'Thermal Hydrotherapy Circuits', type: 'free' },
        { time: '2:30 PM', activity: 'Reiki Energy Healing', type: 'session' },
        { time: '3:30 PM', activity: 'Shadow Work', type: 'session' },
        { time: '4:30 PM', activity: 'Hotel Check-in', type: 'free' },
        { time: '5:00 PM', activity: 'Regression Hypnotherapy', type: 'session' },
        { time: '7:00 PM', activity: 'Free time for Dinner', type: 'meal' }
      ]
    },
    {
      day: 'Day 2',
      schedule: [
        { time: '7:00 AM', activity: 'Sunrise Yoga (Deep Stretch/Yin/Restorative)', type: 'session' },
        { time: '8:00 AM', activity: 'Free time for Breakfast', type: 'meal' },
        { time: '9:30 AM', activity: 'Pranayama Breathwork', type: 'session' },
        { time: '11:00 AM', activity: 'Hotel Check Out', type: 'free' },
        { time: '11:45 AM', activity: 'Akashic Records Reading', type: 'session' },
        { time: '12:00 PM', activity: 'Gourmet Lunch', type: 'meal' },
        { time: '3:00 PM', activity: 'Acupuncture & Medical Massage', type: 'session' },
        { time: '5:00 PM', activity: 'Sound Healing', type: 'session' },
        { time: '6:00 PM', activity: 'Closing Ceremony', type: 'session' }
      ]
    }
  ],
  '5 Days': [
    {
      day: 'Day 1',
      schedule: [
        { time: '9:00 AM', activity: 'Welcome Ceremony, Gifts & Intention Setting', type: 'session' },
        { time: '9:30 AM', activity: 'Biowell Diagnostics & Spiritual Advisory Session', type: 'session' },
        { time: '10:30 AM', activity: 'Quantum Peak Workshop', type: 'session' },
        { time: '11:30 AM', activity: 'Regression Hypnotherapy', type: 'session' },
        { time: '1:00 PM', activity: 'Gourmet Lunch', type: 'meal' },
        { time: '2:30 PM', activity: 'Chiro appointment', type: 'session' },
        { time: '3:30 PM', activity: 'Reiki Energy Healing', type: 'session' },
        { time: '4:30 PM', activity: 'RLX Satori - Chakra Balancing', type: 'session' },
        { time: '5:00 PM', activity: 'Sound Healing Journey', type: 'session' },
        { time: '6:00 PM', activity: 'Free time for Dinner', type: 'meal' }
      ]
    },
    {
      day: 'Day 2',
      schedule: [
        { time: '7:00 AM', activity: 'Sunrise Yoga', type: 'session' },
        { time: '8:00 AM', activity: 'Fitness Session', type: 'session' },
        { time: '9:00 AM', activity: 'Rejuvenating Breakfast', type: 'meal' },
        { time: '10:30 AM', activity: 'RLX Satori - Mind, Body Detox', type: 'session' },
        { time: '11:30 AM', activity: 'Quantum Peak Workshop', type: 'session' },
        { time: '12:30 PM', activity: 'Regression Hypnotherapy', type: 'session' },
        { time: '2:00 PM', activity: 'Free time for lunch', type: 'meal' },
        { time: '4:00 PM', activity: 'SRT', type: 'session' },
        { time: '5:00 PM', activity: 'Reiki Energy Healing', type: 'session' },
        { time: '7:00 PM', activity: 'Free time for Dinner', type: 'meal' }
      ]
    },
    {
      day: 'Day 3',
      schedule: [
        { time: '7:00 AM', activity: 'Kundalini Yoga', type: 'session' },
        { time: '8:00 AM', activity: 'Rejuvenating Breakfast', type: 'meal' },
        { time: '9:30 AM', activity: 'Gong Energy Clearing Ceremony', type: 'session' },
        { time: '10:30 AM', activity: 'RLX Satori Mind & Body Detox', type: 'session' },
        { time: '11:00 AM', activity: 'Thermal Hydrotherapy Circuits', type: 'free' },
        { time: '11:30 AM', activity: 'Quantum Peak Workshop', type: 'session' },
        { time: '12:30 PM', activity: 'Gourmet Lunch', type: 'meal' },
        { time: '2:00 PM', activity: 'Hypnotherapy', type: 'session' },
        { time: '3:30 PM', activity: 'Tantric Bodywork', type: 'session' },
        { time: '5:00 PM', activity: 'Reiki Energy Healing', type: 'session' },
        { time: '6:30 PM', activity: 'Free time for Dinner', type: 'meal' }
      ]
    },
    {
      day: 'Day 4',
      schedule: [
        { time: '7:00 AM', activity: 'Sunrise Walking Beach Meditation', type: 'session' },
        { time: '8:00 AM', activity: 'Rejuvenating Breakfast', type: 'meal' },
        { time: '10:00 AM', activity: 'RLX Satori: Recovery', type: 'session' },
        { time: '10:30 AM', activity: 'Shadow Work Session', type: 'session' },
        { time: '11:30 AM', activity: 'Acupuncture', type: 'session' },
        { time: '12:30 PM', activity: 'Gourmet Lunch', type: 'meal' },
        { time: '2:30 PM', activity: 'Reiki', type: 'session' },
        { time: '3:30 PM', activity: 'SRT', type: 'session' },
        { time: '4:30 PM', activity: 'Pranayama Breathwork', type: 'session' },
        { time: '6:30 PM', activity: 'Free time for Dinner', type: 'meal' }
      ]
    },
    {
      day: 'Day 5',
      schedule: [
        { time: '7:00 AM', activity: 'Sunrise Beach Walking Meditation', type: 'session' },
        { time: '8:00 AM', activity: 'Rejuvenating Breakfast', type: 'meal' },
        { time: '9:00 AM', activity: 'Akashic Records Reading', type: 'session' },
        { time: '10:00 AM', activity: 'Hotel Check out', type: 'free' },
        { time: '11:00 AM', activity: 'Acupuncture', type: 'session' },
        { time: '12:00 PM', activity: 'Gourmet Lunch', type: 'meal' },
        { time: '1:30 PM', activity: 'RLX Satori - Recovery', type: 'session' },
        { time: '2:00 PM', activity: 'Leela Game', type: 'session' },
        { time: '5:30 PM', activity: 'Reiki Energy Healing', type: 'session' },
        { time: '6:30 PM', activity: 'Biowell Diagnostics & Spiritual Advisory', type: 'session' },
        { time: '7:30 PM', activity: 'Closing Ceremony', type: 'session' }
      ]
    }
  ],
  '7 Days': [
    {
      day: 'Day 1',
      schedule: [
        { time: '9:00 AM', activity: 'Welcome Ceremony, Gifts & Intention Setting', type: 'session' },
        { time: '9:30 AM', activity: 'Biowell Diagnostics & Spiritual Advisory Session', type: 'session' },
        { time: '10:30 AM', activity: 'Quantum Peak Workshop', type: 'session' },
        { time: '11:30 AM', activity: 'Regression Hypnotherapy', type: 'session' },
        { time: '1:00 PM', activity: 'Gourmet Lunch', type: 'meal' },
        { time: '2:30 PM', activity: 'Chiro appointment', type: 'session' },
        { time: '3:30 PM', activity: 'Reiki Energy Healing', type: 'session' },
        { time: '4:30 PM', activity: 'RLX Satori - Chakra Balancing', type: 'session' },
        { time: '5:00 PM', activity: 'Sound Healing Journey', type: 'session' },
        { time: '6:00 PM', activity: 'Free time for Dinner', type: 'meal' }
      ]
    },
    {
      day: 'Day 2',
      schedule: [
        { time: '7:00 AM', activity: 'Sunrise Yoga', type: 'session' },
        { time: '8:00 AM', activity: 'Fitness Session', type: 'session' },
        { time: '9:00 AM', activity: 'Rejuvenating Breakfast', type: 'meal' },
        { time: '10:30 AM', activity: 'RLX Satori - Mind, Body Detox', type: 'session' },
        { time: '11:30 AM', activity: 'Quantum Peak Workshop', type: 'session' },
        { time: '12:30 PM', activity: 'Regression Hypnotherapy', type: 'session' },
        { time: '2:00 PM', activity: 'Free time for lunch', type: 'meal' },
        { time: '4:00 PM', activity: 'SRT', type: 'session' },
        { time: '5:00 PM', activity: 'Reiki Energy Healing', type: 'session' },
        { time: '7:00 PM', activity: 'Free time for Dinner', type: 'meal' }
      ]
    },
    {
      day: 'Day 3',
      schedule: [
        { time: '7:00 AM', activity: 'Kundalini Yoga', type: 'session' },
        { time: '8:00 AM', activity: 'Rejuvenating Breakfast', type: 'meal' },
        { time: '9:30 AM', activity: 'Gong Energy Clearing Ceremony', type: 'session' },
        { time: '10:30 AM', activity: 'RLX Satori Mind & Body Detox', type: 'session' },
        { time: '11:00 AM', activity: 'Thermal Hydrotherapy Circuits', type: 'free' },
        { time: '11:30 AM', activity: 'Quantum Peak Workshop', type: 'session' },
        { time: '12:30 PM', activity: 'Gourmet Lunch', type: 'meal' },
        { time: '2:00 PM', activity: 'Hypnotherapy', type: 'session' },
        { time: '3:30 PM', activity: 'Tantric Bodywork', type: 'session' },
        { time: '5:00 PM', activity: 'Reiki Energy Healing', type: 'session' },
        { time: '6:30 PM', activity: 'Free time for Dinner', type: 'meal' }
      ]
    },
    {
      day: 'Day 4',
      schedule: [
        { time: '7:00 AM', activity: 'Sunrise Walking Beach Meditation', type: 'session' },
        { time: '8:00 AM', activity: 'Rejuvenating Breakfast', type: 'meal' },
        { time: '10:00 AM', activity: 'RLX Satori: Recovery', type: 'session' },
        { time: '10:30 AM', activity: 'Shadow Work Session', type: 'session' },
        { time: '11:30 AM', activity: 'Acupuncture', type: 'session' },
        { time: '12:30 PM', activity: 'Gourmet Lunch', type: 'meal' },
        { time: '2:30 PM', activity: 'Reiki', type: 'session' },
        { time: '3:30 PM', activity: 'SRT', type: 'session' },
        { time: '4:30 PM', activity: 'Pranayama Breathwork', type: 'session' },
        { time: '6:30 PM', activity: 'Free time for Dinner', type: 'meal' }
      ]
    },
    {
      day: 'Day 5',
      schedule: [
        { time: '7:00 AM', activity: 'Vinyasa Flow Yoga', type: 'session' },
        { time: '8:30 AM', activity: 'Breakfast', type: 'meal' },
        { time: '10:00 AM', activity: 'Art Therapy', type: 'session' },
        { time: '12:00 PM', activity: 'Lunch', type: 'meal' },
        { time: '2:00 PM', activity: 'Nature Immersion Hike', type: 'free' },
        { time: '5:00 PM', activity: 'Restorative Yoga', type: 'session' },
        { time: '7:00 PM', activity: 'Dinner', type: 'meal' }
      ]
    },
    {
      day: 'Day 6',
      schedule: [
        { time: '7:30 AM', activity: 'Meditation & Journaling', type: 'session' },
        { time: '9:00 AM', activity: 'Breakfast', type: 'meal' },
        { time: '10:30 AM', activity: 'Advanced Breathwork', type: 'session' },
        { time: '12:30 PM', activity: 'Lunch', type: 'meal' },
        { time: '2:30 PM', activity: 'Spa & Relaxation', type: 'free' },
        { time: '5:30 PM', activity: 'Sound Bath', type: 'session' },
        { time: '7:30 PM', activity: 'Farewell Dinner', type: 'meal' }
      ]
    },
    {
      day: 'Day 7',
      schedule: [
        { time: '7:00 AM', activity: 'Sunrise Beach Walking Meditation', type: 'session' },
        { time: '8:00 AM', activity: 'Rejuvenating Breakfast', type: 'meal' },
        { time: '9:00 AM', activity: 'Akashic Records Reading', type: 'session' },
        { time: '10:00 AM', activity: 'Hotel Check out', type: 'free' },
        { time: '11:00 AM', activity: 'Acupuncture', type: 'session' },
        { time: '12:00 PM', activity: 'Gourmet Lunch', type: 'meal' },
        { time: '1:30 PM', activity: 'RLX Satori - Recovery', type: 'session' },
        { time: '2:00 PM', activity: 'Leela Game', type: 'session' },
        { time: '5:30 PM', activity: 'Reiki Energy Healing', type: 'session' },
        { time: '6:30 PM', activity: 'Biowell Diagnostics & Spiritual Advisory', type: 'session' },
        { time: '7:30 PM', activity: 'Closing Ceremony', type: 'session' }
      ]
    }
  ]
};
