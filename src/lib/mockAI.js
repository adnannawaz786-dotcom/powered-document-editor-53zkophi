// Mock AI service for document editing suggestions and responses
export class MockAI {
  constructor() {
    this.isProcessing = false;
    this.delay = 1000; // Simulate network delay
  }

  // Simulate AI processing delay
  async _simulateDelay(customDelay = this.delay) {
    return new Promise(resolve => setTimeout(resolve, customDelay));
  }

  // Generate suggestions based on selected text
  async generateSuggestions(selectedText, documentContent, context = {}) {
    this.isProcessing = true;
    await this._simulateDelay();
    
    const suggestions = [];
    
    if (selectedText.length === 0) {
      // No selection - provide general writing suggestions
      suggestions.push(
        {
          id: 'continue-writing',
          type: 'generate',
          title: 'Continue Writing',
          description: 'Generate the next paragraph based on your content',
          icon: '✍️',
          action: 'continue'
        },
        {
          id: 'improve-structure',
          type: 'restructure',
          title: 'Improve Structure',
          description: 'Reorganize content for better flow',
          icon: '📋',
          action: 'structure'
        },
        {
          id: 'add-summary',
          type: 'generate',
          title: 'Add Summary',
          description: 'Generate a summary of your document',
          icon: '📝',
          action: 'summary'
        }
      );
    } else {
      // Text is selected - provide context-specific suggestions
      if (selectedText.length < 50) {
        // Short selection - word/phrase level suggestions
        suggestions.push(
          {
            id: 'expand-idea',
            type: 'expand',
            title: 'Expand This Idea',
            description: 'Add more detail and context',
            icon: '🔍',
            action: 'expand'
          },
          {
            id: 'find-synonyms',
            type: 'replace',
            title: 'Find Synonyms',
            description: 'Suggest alternative words',
            icon: '🔄',
            action: 'synonyms'
          }
        );
      } else {
        // Longer selection - paragraph level suggestions
        suggestions.push(
          {
            id: 'rewrite-professional',
            type: 'replace',
            title: 'Make More Professional',
            description: 'Rewrite in a professional tone',
            icon: '💼',
            action: 'professional'
          },
          {
            id: 'simplify-text',
            type: 'replace',
            title: 'Simplify',
            description: 'Make the text clearer and easier to read',
            icon: '✨',
            action: 'simplify'
          },
          {
            id: 'add-examples',
            type: 'expand',
            title: 'Add Examples',
            description: 'Include relevant examples or case studies',
            icon: '💡',
            action: 'examples'
          }
        );
      }
      
      // Common suggestions for any selection
      suggestions.push(
        {
          id: 'grammar-check',
          type: 'replace',
          title: 'Fix Grammar',
          description: 'Check and correct grammar issues',
          icon: '✅',
          action: 'grammar'
        }
      );
    }

    this.isProcessing = false;
    return suggestions;
  }

  // Execute a specific AI action
  async executeAction(action, selectedText, documentContent, context = {}) {
    this.isProcessing = true;
    await this._simulateDelay(1500);

    let result = {
      success: true,
      type: 'replace', // 'replace', 'insert', 'append'
      content: '',
      position: context.position || 0
    };

    switch (action) {
      case 'continue':
        result.type = 'append';
        result.content = this._generateContinuation(documentContent);
        break;

      case 'expand':
        result.type = 'replace';
        result.content = this._expandText(selectedText);
        break;

      case 'professional':
        result.type = 'replace';
        result.content = this._makeProfessional(selectedText);
        break;

      case 'simplify':
        result.type = 'replace';
        result.content = this._simplifyText(selectedText);
        break;

      case 'synonyms':
        result.type = 'replace';
        result.content = this._findSynonyms(selectedText);
        break;

      case 'grammar':
        result.type = 'replace';
        result.content = this._fixGrammar(selectedText);
        break;

      case 'examples':
        result.type = 'insert';
        result.content = this._addExamples(selectedText);
        break;

      case 'summary':
        result.type = 'append';
        result.content = this._generateSummary(documentContent);
        break;

      case 'structure':
        result.type = 'replace';
        result.content = this._improveStructure(documentContent);
        break;

      default:
        result.success = false;
        result.error = 'Unknown action';
    }

    this.isProcessing = false;
    return result;
  }

  // Generate chat response for conversational AI
  async generateChatResponse(message, context = {}) {
    this.isProcessing = true;
    await this._simulateDelay(800);

    const responses = [
      "I can help you improve your writing! Try selecting some text and I'll suggest ways to enhance it.",
      "Would you like me to help you continue writing, or do you have specific text you'd like me to review?",
      "I'm here to assist with your document. I can help with grammar, style, expanding ideas, or generating new content.",
      "What would you like to work on? I can help make your writing more professional, clearer, or more engaging.",
      "Feel free to ask me anything about your document. I can suggest improvements, generate content, or help with structure."
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];
    
    this.isProcessing = false;
    return {
      success: true,
      message: response,
      timestamp: new Date().toISOString()
    };
  }

  // Private helper methods for generating mock content
  _generateContinuation(content) {
    const continuations = [
      "\n\nBuilding on this foundation, we can explore several key areas that warrant further investigation. These insights provide a roadmap for understanding the broader implications of our current approach.",
      "\n\nThe next logical step involves examining the practical applications of these concepts. By doing so, we can better understand how theory translates into real-world scenarios.",
      "\n\nMoving forward, it's important to consider the various factors that influence outcomes in this domain. This comprehensive view will help us develop more effective strategies."
    ];
    
    return continuations[Math.floor(Math.random() * continuations.length)];
  }

  _expandText(text) {
    return `${text} This concept deserves deeper exploration, as it encompasses several important dimensions that are worth considering. The implications extend beyond the immediate scope and touch on broader themes that resonate throughout the field.`;
  }

  _makeProfessional(text) {
    // Simple mock transformation
    return text
      .replace(/\bkinda\b/g, 'somewhat')
      .replace(/\bgonna\b/g, 'going to')
      .replace(/\bwanna\b/g, 'want to')
      .replace(/\byeah\b/g, 'yes')
      .replace(/\bokay\b/g, 'acceptable')
      + ' Furthermore, this approach demonstrates a commitment to excellence and attention to detail.';
  }

  _simplifyText(text) {
    // Mock simplification
    const simplified = text
      .replace(/utilize/g, 'use')
      .replace(/demonstrate/g, 'show')
      .replace(/facilitate/g, 'help')
      .replace(/subsequently/g, 'then')
      .replace(/accordingly/g, 'so');
    
    return simplified.length < text.length ? simplified : `Here's a clearer version: ${text.substring(0, 100)}...`;
  }

  _findSynonyms(text) {
    const synonymMap = {
      'good': 'excellent',
      'bad': 'poor',
      'big': 'large',
      'small': 'compact',
      'important': 'crucial',
      'interesting': 'compelling'
    };

    let result = text;
    Object.entries(synonymMap).forEach(([word, synonym]) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      result = result.replace(regex, synonym);
    });

    return result !== text ? result : `${text} (enhanced with stronger vocabulary)`;
  }

  _fixGrammar(text) {
    // Mock grammar fixes
    return text
      .replace(/\bi\b/g, 'I')
      .replace(/\bits\b/g, "it's")
      .replace(/\bthier\b/g, 'their')
      .replace(/\byour\b(?=\s+going)/g, "you're")
      .trim() + (text.endsWith('.') ? '' : '.');
  }

  _addExamples(text) {
    return `\n\nFor example, consider how this applies in real-world scenarios. A practical illustration would be the way leading organizations have successfully implemented similar approaches, resulting in measurable improvements in efficiency and outcomes.`;
  }

  _generateSummary(content) {
    return `\n\n## Summary\n\nThis document covers key concepts and insights related to the main topic. The content explores various aspects and provides a comprehensive overview of the subject matter, offering valuable perspectives for readers interested in understanding the fundamental principles and practical applications.`;
  }

  _improveStructure(content) {
    // Mock structure improvement
    const sections = content.split('\n\n');
    if (sections.length < 2) return content;

    return `# Introduction\n\n${sections[0]}\n\n# Main Content\n\n${sections.slice(1).join('\n\n')}\n\n# Conclusion\n\nIn summary, these points highlight the key aspects of our discussion.`;
  }

  // Get processing status
  getProcessingStatus() {
    return this.isProcessing;
  }

  // Mock document analysis
  async analyzeDocument(content) {
    this.isProcessing = true;
    await this._simulateDelay(2000);

    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    
    const analysis = {
      wordCount,
      readingTime,
      tone: 'Professional',
      readability: 'Good',
      suggestions: [
        'Consider adding more examples to illustrate key points',
        'Some paragraphs could be broken down for better readability',
        'The conclusion could be strengthened with a call to action'
      ]
    };

    this.isProcessing = false;
    return analysis;
  }
}

// Export a singleton instance
export const mockAI = new MockAI();

// Export helper functions for common AI operations
export const aiHelpers = {
  // Format suggestions for UI display
  formatSuggestions: (suggestions) => {
    return suggestions.map(suggestion => ({
      ...suggestion,
      formattedTitle: `${suggestion.icon} ${suggestion.title}`,
      category: suggestion.type
    }));
  },

  // Validate AI response
  validateResponse: (response) => {
    return response && 
           typeof response === 'object' && 
           response.hasOwnProperty('success') &&
           (response.success === false || response.hasOwnProperty('content') || response.hasOwnProperty('message'));
  },

  // Generate typing effect for AI responses
  createTypingEffect: (text, callback, speed = 50) => {
    let index = 0;
    const timer = setInterval(() => {
      callback(text.substring(0, index + 1));
      index++;
      
      if (index >= text.length) {
        clearInterval(timer);
      }
    }, speed);
    
    return timer;
  },

  // Mock AI confidence scoring
  getConfidenceScore: (action, textLength) => {
    const baseScores = {
      'grammar': 0.95,
      'professional': 0.88,
      'simplify': 0.92,
      'expand': 0.85,
      'continue': 0.78,
      'synonyms': 0.90
    };
    
    const score = baseScores[action] || 0.80;
    const lengthFactor = Math.min(textLength / 100, 1);
    
    return Math.round((score * (0.8 + lengthFactor * 0.2)) * 100);
  }
};