import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  darkMode: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, darkMode }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !isLoading) {
        onSendMessage(message);
        setMessage('');
      }
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className={`flex items-center border-t w-full p-4 transition-all duration-300 ${
        darkMode 
          ? 'border-gray-700 bg-gray-800/80 shadow-lg backdrop-blur-md' 
          : 'border-gray-200 bg-white/80 shadow-md backdrop-blur-lg'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask a how-to question about CDPs..."
        className={`flex-1 py-3 px-4 rounded-l-lg transition-all duration-300 focus:outline-none focus:ring-2 ${
          darkMode
            ? 'bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-400 border-gray-600'
            : 'bg-white text-gray-800 placeholder-gray-500 focus:ring-blue-500 border-gray-300'
        } border`}
        disabled={isLoading}
        whileFocus={{ scale: 1.02 }}
      />
      <motion.button
        type="submit"
        className={`relative flex items-center justify-center rounded-r-lg py-3 px-5 h-full transition-all duration-300 ${
          isLoading ? 'opacity-50 cursor-not-allowed bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isLoading ? (
          <motion.div 
            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Send size={20} />
          </motion.div>
        )}
      </motion.button>
    </motion.form>
  );
};

export default ChatInput;
