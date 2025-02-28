import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CDP } from '../types';
import { cdps } from '../data/cdps';
import { Search } from 'lucide-react';

interface CDPSelectorProps {
  selectedCDP: CDP | null;
  onSelectCDP: (cdp: CDP | null) => void;
  darkMode: boolean;
}

const CDPSelector: React.FC<CDPSelectorProps> = ({ selectedCDP, onSelectCDP, darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCDPs = cdps.filter((cdp) =>
    cdp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      className="flex flex-col mb-6 w-full max-w-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h3 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
        Select a CDP Platform
      </h3>

      {/* Search Bar */}
      <motion.div 
        className="relative mb-4"
        whileHover={{ scale: 1.02 }}
      >
        <input
          type="text"
          placeholder="Search CDP..."
          className={`w-full pl-10 pr-3 py-2 rounded-lg border transition-all duration-300 shadow-md focus:ring-2 ${
            darkMode
              ? 'bg-gray-800 text-white border-gray-700 focus:ring-blue-400'
              : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-500'
          }`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      </motion.div>

      {/* CDP List */}
      <div className="grid grid-cols-2 gap-4">
        {filteredCDPs.map((cdp) => (
          <motion.button
            key={cdp.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex items-center px-4 py-2 rounded-lg border transition-all shadow-md overflow-hidden space-x-2 ${
              selectedCDP?.id === cdp.id
                ? `${cdp.color} text-white border-transparent`
                : darkMode
                ? 'bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
            onClick={() => onSelectCDP(selectedCDP?.id === cdp.id ? null : cdp)}
            aria-label={`Select ${cdp.name}`}
          >
            {/* CDP Image */}
            <img src={cdp.logo} alt={cdp.name} className="w-8 h-8 rounded-full" />
            {/* CDP Name */}
            <span className="font-medium">{cdp.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default CDPSelector;
