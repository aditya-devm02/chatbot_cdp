import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import ChatMessage from './ChatMessage';
import { motion } from 'framer-motion';

interface ChatHistoryProps {
  messages: Message[];
  isLoading: boolean;
  darkMode: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isLoading, darkMode }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <motion.div 
      className={`flex-1 overflow-y-auto p-4 transition-all duration-500 ${
        darkMode 
          ? 'bg-gradient-to-b from-gray-900 to-blue-900 text-white'  // 🌙 Dark Mode (Blue-Black)
          : 'bg-gradient-to-b from-gray-100 to-blue-200 text-gray-900' // ☀️ Light Mode (Soft Blue-Gray)
      }`}
      style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {messages.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center h-full text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-bold mb-2">CDP Support Assistant</h2>
          <p className="max-w-md">
            Ask me how-to questions about Segment, mParticle, Lytics, or Zeotap. I'll help you find the information you need.
          </p>
          
          <motion.div 
            className="mt-4 grid grid-cols-2 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {["How do I set up a new source in Segment?", 
              "How can I create a user profile in mParticle?", 
              "How do I build an audience segment in Lytics?", 
              "How can I integrate my data with Zeotap?"].map((text, index) => (
              <motion.div
                key={index}
                className={`p-3 rounded-lg text-sm shadow-md transition-colors ${
                  darkMode ? 'bg-blue-800 hover:bg-blue-700' : 'bg-blue-300 hover:bg-blue-400'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {text}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <>
          {messages.map((message, index) => (
            <motion.div 
              key={message.id} 
              initial={{ opacity: 0, x: message.isUser ? 50 : -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <ChatMessage message={message} darkMode={darkMode} />
            </motion.div>
          ))}

          {isLoading && (
            <motion.div 
              className="flex justify-start mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 mr-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className={`py-3 px-4 rounded-lg ${darkMode ? 'bg-blue-800' : 'bg-blue-300'}`}>
                  <div className="flex space-x-2">
                    <motion.div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <motion.div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <motion.div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </motion.div>
  );
};

export default ChatHistory;
