import React, { useState, useEffect } from "react";
import { Message, CDP } from "./types";
import { createMessage } from "./utils/chatUtils";
import { processUserMessage } from "./services/chatService";
import ChatHistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput";
import CDPSelector from "./components/CDPSelector";
import { Database, Bot, HelpCircle, Moon, Sun, PlusCircle } from "lucide-react";
import { commonQuestions } from "./data/commonQuestions";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCDP, setSelectedCDP] = useState<CDP | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [customCDPs, setCustomCDPs] = useState<CDP[]>([]);

  useEffect(() => {
    const welcomeMessage = createMessage(
      "👋 Hello! I'm your CDP Support Assistant. What can I help you with today?",
      "assistant"
    );
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async (content: string) => {
    const userMessage = createMessage(content, "user");
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);
    try {
      const assistantMessage = await processUserMessage(content, messages, selectedCDP);
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, createMessage("Oops! Something went wrong.", "assistant")]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCDP = (cdp: CDP | null) => {
    setSelectedCDP(cdp);
    if (cdp) {
      handleSendMessage(`Tell me about ${cdp.name} CDP.`);
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addCustomCDP = () => {
    const name = prompt("Enter the name of the new CDP:");
    if (name) {
      const newCDP = { name };
      setCustomCDPs((prev) => [...prev, newCDP]);
    }
  };

  return (
    <motion.div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header className="header">
        <div className="header-left">
          <Database className="icon" size={24} />
          <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>CHATBOT</motion.h1>
        </div>
        <div className="header-right">
          <button className="help-button" onClick={() => handleSendMessage("What can you help me with?")}>
            <HelpCircle size={16} /> Help
          </button>
          <button onClick={toggleDarkMode} className="toggle-theme">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      <div className="main-content">
        {/* Sidebar */}
        <motion.aside 
          className={`sidebar ${darkMode ? "bg-blue-900 text-white" : "bg-white text-gray-900 shadow-md"}`} 
          initial={{ x: -50 }} 
          animate={{ x: 0 }} 
          transition={{ duration: 0.4 }}
        >
          <h2 className="sidebar-title">Select a CDP Platform</h2>
          
          {/* CDP Selector */}
          <CDPSelector selectedCDP={selectedCDP} onSelectCDP={handleSelectCDP} darkMode={darkMode} />

          {/* Custom CDPs */}
          {customCDPs.length > 0 && (
            <div className="custom-cdp-section">
              <h3>Custom CDPs</h3>
              <ul>
                {customCDPs.map((cdp, index) => (
                  <li key={index} onClick={() => handleSelectCDP(cdp)} className="custom-cdp">
                    {cdp.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button className="add-cdp-button" onClick={addCustomCDP}>
            <PlusCircle size={16} /> Add Custom CDP
          </button>

          {/* Common Questions */}
          <h3 className="sidebar-subtitle">Common Questions</h3>
          <ul className="question-list">
            {commonQuestions.map((question, index) => (
              <li key={index}>
                <motion.button 
                  className="question-button" 
                  onClick={() => handleSendMessage(question)}
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  {question}
                </motion.button>
              </li>
            ))}
          </ul>
        </motion.aside>

        {/* Chat Section */}
        <motion.div className="chat-container" initial={{ y: 30 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
          <ChatHistory messages={messages} isLoading={isLoading} darkMode={darkMode} />
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} darkMode={darkMode} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default App;
