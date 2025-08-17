import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Copy, RefreshCw, ThumbsUp, ThumbsDown, MessageSquare, Edit3, Wand2 } from 'lucide-react';
import { cn } from '../lib/utils';

const AISidebar = ({ isOpen, onClose, selectedText = '', documentContent = '', onInsertText, onReplaceText }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && selectedText) {
      setActiveTab('enhance');
      setInput(`Improve this text: "${selectedText}"`);
    }
  }, [isOpen, selectedText]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateMockResponse(userMessage.content),
        timestamp: new Date(),
        actions: ['copy', 'insert', 'replace']
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockResponse = (prompt) => {
    const responses = [
      "Here's an improved version of your text with better clarity and flow.",
      "I've enhanced the content to be more engaging and professional.",
      "This revision maintains your original meaning while improving readability.",
      "Here's a more polished version that addresses your requirements."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleQuickAction = (action, text = '') => {
    const prompts = {
      summarize: `Summarize this document: ${documentContent.slice(0, 500)}...`,
      improve: selectedText ? `Improve this text: "${selectedText}"` : 'Help me improve my writing',
      expand: selectedText ? `Expand on this: "${selectedText}"` : 'Help me expand my ideas',
      grammar: selectedText ? `Check grammar: "${selectedText}"` : 'Check my document for grammar issues'
    };
    
    setInput(prompts[action] || text);
    setActiveTab('chat');
    inputRef.current?.focus();
  };

  const handleMessageAction = (action, content) => {
    switch (action) {
      case 'copy':
        navigator.clipboard.writeText(content);
        break;
      case 'insert':
        onInsertText?.(content);
        break;
      case 'replace':
        onReplaceText?.(content);
        break;
    }
  };

  const quickActions = [
    { id: 'summarize', label: 'Summarize', icon: MessageSquare },
    { id: 'improve', label: 'Improve Writing', icon: Edit3 },
    { id: 'expand', label: 'Expand Ideas', icon: Wand2 },
    { id: 'grammar', label: 'Check Grammar', icon: RefreshCw }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h2 className="font-semibold text-gray-900">AI Assistant</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('chat')}
          className={cn(
            "flex-1 px-4 py-2 text-sm font-medium transition-colors",
            activeTab === 'chat'
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab('enhance')}
          className={cn(
            "flex-1 px-4 py-2 text-sm font-medium transition-colors",
            activeTab === 'enhance'
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          Enhance
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'chat' ? (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <Sparkles className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">
                    Start a conversation with AI to get help with your document.
                  </p>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.type === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                      message.type === 'user'
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    )}
                  >
                    <p>{message.content}</p>
                    {message.actions && (
                      <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-gray-200">
                        <button
                          onClick={() => handleMessageAction('copy', message.content)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                          title="Copy"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleMessageAction('insert', message.content)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                          title="Insert"
                        >
                          <Send className="w-3 h-3" />
                        </button>
                        {selectedText && (
                          <button
                            onClick={() => handleMessageAction('replace', message.content)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title="Replace"
                          >
                            <RefreshCw className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask AI anything..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 p-4">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 mb-4">Quick Actions</h3>
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id)}
                    className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                  >
                    <Icon className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-700">{action.label}</span>
                  </button>
                );
              })}
            </div>

            {selectedText && (
              <div className="mt-6 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-2">Selected Text</h4>
                <p className="text-sm text-purple-800 italic">"{selectedText}"</p>
                <button
                  onClick={() => handleQuickAction('improve')}
                  className="mt-2 text-xs text-purple-600 hover:text-purple-700 font-medium"
                >
                  Improve this text →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AISidebar;