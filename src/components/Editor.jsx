import React, { useState, useEffect, useRef } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Quote, Code, Link, Image, MoreHorizontal } from 'lucide-react';

const Editor = ({ content, onChange, onSelectionChange, className = '' }) => {
  const editorRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const handleInput = (e) => {
    const newContent = e.target.innerHTML;
    onChange?.(newContent);
  };

  const handleSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString();
    
    if (text.length > 0) {
      setSelectedText(text);
      setShowToolbar(true);
      
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      setToolbarPosition({
        top: rect.top - 50,
        left: rect.left + rect.width / 2
      });
      
      onSelectionChange?.(text);
    } else {
      setShowToolbar(false);
      setSelectedText('');
    }
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertBlock = (type) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    
    let element;
    switch (type) {
      case 'heading1':
        element = document.createElement('h1');
        element.className = 'text-3xl font-bold mb-4';
        element.textContent = 'Heading 1';
        break;
      case 'heading2':
        element = document.createElement('h2');
        element.className = 'text-2xl font-semibold mb-3';
        element.textContent = 'Heading 2';
        break;
      case 'heading3':
        element = document.createElement('h3');
        element.className = 'text-xl font-medium mb-2';
        element.textContent = 'Heading 3';
        break;
      case 'divider':
        element = document.createElement('hr');
        element.className = 'my-6 border-gray-300';
        break;
      case 'code-block':
        element = document.createElement('pre');
        element.className = 'bg-gray-100 p-4 rounded-lg font-mono text-sm my-4';
        element.innerHTML = '<code>// Your code here</code>';
        break;
      default:
        return;
    }
    
    range.insertNode(element);
    range.setStartAfter(element);
    selection.removeAllRanges();
    selection.addRange(range);
    
    handleInput({ target: editorRef.current });
  };

  const ToolbarButton = ({ icon: Icon, onClick, title, isActive = false }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
        isActive ? 'bg-gray-200' : ''
      }`}
    >
      <Icon size={16} />
    </button>
  );

  const FloatingToolbar = () => {
    if (!showToolbar) return null;

    return (
      <div
        className="fixed bg-white shadow-lg border rounded-lg p-2 flex items-center gap-1 z-50"
        style={{
          top: toolbarPosition.top,
          left: toolbarPosition.left,
          transform: 'translateX(-50%)'
        }}
      >
        <ToolbarButton
          icon={Bold}
          onClick={() => execCommand('bold')}
          title="Bold"
        />
        <ToolbarButton
          icon={Italic}
          onClick={() => execCommand('italic')}
          title="Italic"
        />
        <ToolbarButton
          icon={Underline}
          onClick={() => execCommand('underline')}
          title="Underline"
        />
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <ToolbarButton
          icon={Link}
          onClick={() => {
            const url = prompt('Enter URL:');
            if (url) execCommand('createLink', url);
          }}
          title="Link"
        />
        <ToolbarButton
          icon={Code}
          onClick={() => execCommand('formatBlock', 'pre')}
          title="Code"
        />
      </div>
    );
  };

  const BlockMenu = ({ onInsert }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className="w-8 h-8 rounded hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600"
        >
          +
        </button>
        
        {showMenu && (
          <div className="absolute left-0 top-full mt-2 bg-white shadow-lg border rounded-lg py-2 w-48 z-10">
            <button
              type="button"
              onClick={() => {
                onInsert('heading1');
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-3xl font-bold"
            >
              Heading 1
            </button>
            <button
              type="button"
              onClick={() => {
                onInsert('heading2');
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-2xl font-semibold"
            >
              Heading 2
            </button>
            <button
              type="button"
              onClick={() => {
                onInsert('heading3');
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xl font-medium"
            >
              Heading 3
            </button>
            <div className="border-t my-2" />
            <button
              type="button"
              onClick={() => {
                execCommand('insertUnorderedList');
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
            >
              <List size={16} />
              Bullet List
            </button>
            <button
              type="button"
              onClick={() => {
                execCommand('insertOrderedList');
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
            >
              <ListOrdered size={16} />
              Numbered List
            </button>
            <button
              type="button"
              onClick={() => {
                execCommand('formatBlock', 'blockquote');
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
            >
              <Quote size={16} />
              Quote
            </button>
            <button
              type="button"
              onClick={() => {
                onInsert('code-block');
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
            >
              <Code size={16} />
              Code Block
            </button>
            <div className="border-t my-2" />
            <button
              type="button"
              onClick={() => {
                onInsert('divider');
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50"
            >
              Divider
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`relative ${className}`}>
      <FloatingToolbar />
      
      <div className="flex items-start gap-2 group">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity pt-1">
          <BlockMenu onInsert={insertBlock} />
        </div>
        
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onMouseUp={handleSelection}
          onKeyUp={handleSelection}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          className="flex-1 min-h-[200px] outline-none prose prose-lg max-w-none"
          style={{
            lineHeight: '1.6',
            fontSize: '16px'
          }}
        />
      </div>
      
      <style jsx>{`
        [contenteditable] h1 {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        
        [contenteditable] h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        
        [contenteditable] h3 {
          font-size: 1.25rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        
        [contenteditable] p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        
        [contenteditable] blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        [contenteditable] pre {
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }
        
        [contenteditable] li {
          margin-bottom: 0.5rem;
        }
        
        [contenteditable] hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 2rem 0;
        }
        
        [contenteditable]:focus {
          outline: none;
        }
        
        [contenteditable]:empty:before {
          content: "Start writing...";
          color: #9ca3af;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default Editor;