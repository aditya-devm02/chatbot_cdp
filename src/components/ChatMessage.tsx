import React from 'react';
import { Message } from '../types';
import { MessageSquare, Bot } from 'lucide-react';
import { marked } from 'marked';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: Message;
  darkMode: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, darkMode }) => {
  const isUser = message.role === 'user';

  // Configure markdown renderer
  const renderer = new marked.Renderer();

  renderer.code = (code, language) => {
    const darkModeClass = darkMode
      ? 'bg-gray-800 text-gray-100 border-gray-700'
      : 'bg-gray-100 text-gray-800 border-gray-300';
    return `<pre class="p-3 rounded-md my-2 border ${darkModeClass}"><code class="${language}">${code}</code></pre>`;
  };

  renderer.link = (href, title, text) => {
    const linkClass = darkMode
      ? 'text-blue-400 hover:text-blue-300'
      : 'text-blue-600 hover:text-blue-800';
    return `<a href="${href}" title="${title || ''}" class="${linkClass} underline" target="_blank" rel="noopener noreferrer">${text}</a>`;
  };

  // Markdown options
  const markedOptions = {
    renderer,
    breaks: true,
    gfm: true
  };

  const content = isUser 
    ? message.content 
    : <div dangerouslySetInnerHTML={{ __html: marked(message.content, markedOptions as any) }} />;

  return (
    <motion.div
      className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, scale: 0.9, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar Icon */}
        <motion.div 
          className={`flex items-center justify-center h-10 w-10 rounded-full ${
            isUser ? 'bg-blue-500 ml-3 shadow-lg' : 'bg-gray-600 mr-3 shadow-md'
          }`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isUser ? <MessageSquare size={20} className="text-white" /> : <Bot size={20} className="text-white" />}
        </motion.div>

        {/* Chat Bubble */}
        <motion.div
          className={`relative py-3 px-4 rounded-lg shadow-lg ${
            isUser
              ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white'
              : darkMode
                ? 'bg-gray-800 text-gray-100'
                : 'bg-gray-100 text-gray-800'
          }`}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {content}
          {/* Typing Animation for AI Messages */}
          {!isUser && message.content === '...' && (
            <div className="flex space-x-1 mt-2">
              <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [-2, 2, -2] }} transition={{ duration: 0.6, repeat: Infinity }} />
              <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [-2, 2, -2] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
              <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [-2, 2, -2] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
            </div>
          )}

          {/* Chat Bubble Tail */}
          <div
            className={`absolute bottom-0 w-4 h-4 ${
              isUser ? '-right-2 bg-blue-500' : '-left-2 bg-gray-800'
            } transform rotate-45`}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
