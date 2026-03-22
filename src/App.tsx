/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChatWidget } from './components/ChatWidget';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-gray-200/50 to-transparent rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tl from-gray-300/30 to-transparent rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* Main Content Placeholder */}
      <div className="z-10 text-center max-w-2xl px-6">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight text-black mb-6">
          Find Your Center.
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-light mb-10 leading-relaxed">
          Experience world-class wellness retreats designed to restore balance to your mind, body, and soul.
        </p>
        <button className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          Explore Retreats
        </button>
      </div>

      {/* Chatbot Widget */}
      <ChatWidget />
    </div>
  );
}
