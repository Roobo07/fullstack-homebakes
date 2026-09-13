'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! 👋 I'm the HomeBakes assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { id: Date.now(), text: userMsg, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    // Simple keyword matching - TODO: Replace with AI API integration
    setTimeout(() => {
      let botResponse = "I'm still learning! For complex queries, please contact us at +91 98765 43210";
      const lowerInput = userMsg.toLowerCase();

      if (lowerInput.match(/menu|products|cakes/)) {
        botResponse = "Check out our menu at /shop!";
      } else if (lowerInput.match(/order|track/)) {
        botResponse = "You can track your order at /orders";
      } else if (lowerInput.match(/custom|birthday|wedding/)) {
        botResponse = "Design your dream cake at /custom-cake!";
      } else if (lowerInput.match(/delivery|deliver/)) {
        botResponse = "We deliver within 10km. Fees: 0-3km ₹30, 3-5km ₹50, 5-8km ₹80";
      } else if (lowerInput.match(/hours|open|time/)) {
        botResponse = "We're open Mon-Sat 9AM-8PM, Sun 10AM-6PM";
      } else if (lowerInput.match(/phone|call|contact/)) {
        botResponse = "Call us: +91 98765 43210 or WhatsApp: +91 98765 43210";
      }

      setMessages(prev => [...prev, { id: Date.now(), text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (text: string) => {
    setInput(text);
    // Use setTimeout to ensure state updates before sending
    setTimeout(() => {
      document.getElementById('chat-send-btn')?.click();
    }, 0);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-pink-700 transition-transform hover:scale-105 z-50 flex items-center justify-center"
          aria-label="Open Chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-pink-600 text-white p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2 font-medium">
              <Bot size={20} />
              <span>HomeBakes Assistant 🧁</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-pink-100 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm ${
                  msg.sender === 'user' ? 'bg-pink-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start w-full">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex gap-1 items-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions (only show if few messages) */}
          {messages.length < 3 && (
            <div className="px-4 py-2 bg-white flex flex-wrap gap-2 border-t border-gray-50 shrink-0">
              {['View Menu', 'Track Order', 'Custom Cake'].map(action => (
                <button
                  key={action}
                  onClick={() => handleQuickAction(action)}
                  className="text-xs bg-pink-50 text-pink-700 px-3 py-1.5 rounded-full hover:bg-pink-100 transition-colors border border-pink-100"
                >
                  {action}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
            <button
              id="chat-send-btn"
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 disabled:opacity-50 disabled:hover:bg-pink-600 transition-colors shrink-0"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
