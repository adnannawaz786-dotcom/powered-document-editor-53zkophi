// TipTap editor configuration and extensions
import { Extension } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import Focus from '@tiptap/extension-focus'

// Custom slash command extension
const SlashCommand = Extension.create({
  name: 'slashCommand',
  
  addOptions() {
    return {
      suggestion: {
        char: '/',
        startOfLine: false,
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        },
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-/': () => {
        // Trigger AI sidebar when slash is used
        return false
      },
    }
  },
})

// Custom AI command extension for AI integration
const AICommand = Extension.create({
  name: 'aiCommand',
  
  addKeyboardShortcuts() {
    return {
      'Mod-k': ({ editor }) => {
        // Trigger AI sidebar with Cmd+K
        const selection = editor.state.selection
        const selectedText = editor.state.doc.textBetween(selection.from, selection.to)
        
        // Dispatch custom event to open AI sidebar
        window.dispatchEvent(new CustomEvent('openAISidebar', {
          detail: { selectedText, editor }
        }))
        
        return true
      },
      'Mod-Shift-a': ({ editor }) => {
        // Alternative AI trigger
        const selection = editor.state.selection
        const selectedText = editor.state.doc.textBetween(selection.from, selection.to)
        
        window.dispatchEvent(new CustomEvent('openAISidebar', {
          detail: { selectedText, editor }
        }))
        
        return true
      },
    }
  },
})

// Custom block quote extension with enhanced styling
const CustomBlockquote = Extension.create({
  name: 'customBlockquote',
  
  addOptions() {
    return {
      HTMLAttributes: {
        class: 'border-l-4 border-blue-500 pl-4 py-2 my-4 bg-gray-50 italic text-gray-700',
      },
    }
  },
})

// Notion-like heading extension with hover effects
const NotionHeading = Extension.create({
  name: 'notionHeading',
  
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {
        class: 'group relative',
      },
    }
  },
})

// Editor configuration
export const editorConfig = {
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: {
          class: 'font-bold group relative hover:bg-gray-50 rounded px-1 -mx-1 transition-colors',
        },
      },
      blockquote: false, // We'll use our custom blockquote
      codeBlock: {
        HTMLAttributes: {
          class: 'bg-gray-100 rounded-lg p-4 font-mono text-sm border',
        },
      },
      code: {
        HTMLAttributes: {
          class: 'bg-gray-100 px-2 py-1 rounded text-sm font-mono',
        },
      },
      bulletList: {
        HTMLAttributes: {
          class: 'list-disc ml-6 my-2',
        },
      },
      orderedList: {
        HTMLAttributes: {
          class: 'list-decimal ml-6 my-2',
        },
      },
      listItem: {
        HTMLAttributes: {
          class: 'my-1',
        },
      },
    }),
    
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === 'heading') {
          return 'Heading'
        }
        return "Type '/' for commands or press Cmd+K for AI assistance..."
      },
      showOnlyWhenEditable: true,
      showOnlyCurrent: false,
    }),
    
    TaskList.configure({
      HTMLAttributes: {
        class: 'task-list',
      },
    }),
    
    TaskItem.configure({
      nested: true,
      HTMLAttributes: {
        class: 'task-item flex items-start gap-2 my-1',
      },
    }),
    
    Table.configure({
      resizable: true,
      HTMLAttributes: {
        class: 'border-collapse border border-gray-300 my-4',
      },
    }),
    
    TableRow.configure({
      HTMLAttributes: {
        class: 'border border-gray-300',
      },
    }),
    
    TableHeader.configure({
      HTMLAttributes: {
        class: 'border border-gray-300 bg-gray-100 font-semibold p-2',
      },
    }),
    
    TableCell.configure({
      HTMLAttributes: {
        class: 'border border-gray-300 p-2',
      },
    }),
    
    Image.configure({
      HTMLAttributes: {
        class: 'max-w-full h-auto rounded-lg my-4',
      },
    }),
    
    Link.configure({
      HTMLAttributes: {
        class: 'text-blue-600 underline hover:text-blue-800 transition-colors',
        rel: 'noopener noreferrer',
        target: '_blank',
      },
    }),
    
    Highlight.configure({
      HTMLAttributes: {
        class: 'bg-yellow-200 px-1 rounded',
      },
    }),
    
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    
    Underline,
    Subscript,
    Superscript,
    Color,
    TextStyle,
    
    FontFamily.configure({
      types: ['textStyle'],
    }),
    
    Focus.configure({
      className: 'has-focus',
      mode: 'all',
    }),
    
    // Custom extensions
    SlashCommand,
    AICommand,
    CustomBlockquote,
    NotionHeading,
  ],
  
  editorProps: {
    attributes: {
      class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] px-8 py-6',
    },
    handleKeyDown: (view, event) => {
      // Handle special key combinations
      if (event.key === 'Tab') {
        // Custom tab behavior for indentation
        return false
      }
      return false
    },
  },
  
  content: '',
  
  parseOptions: {
    preserveWhitespace: 'full',
  },
}

// Toolbar configuration for formatting options
export const toolbarConfig = {
  formatting: [
    {
      name: 'bold',
      icon: 'Bold',
      command: 'toggleBold',
      isActive: 'bold',
      shortcut: 'Cmd+B',
    },
    {
      name: 'italic',
      icon: 'Italic',
      command: 'toggleItalic',
      isActive: 'italic',
      shortcut: 'Cmd+I',
    },
    {
      name: 'underline',
      icon: 'Underline',
      command: 'toggleUnderline',
      isActive: 'underline',
      shortcut: 'Cmd+U',
    },
    {
      name: 'strike',
      icon: 'Strikethrough',
      command: 'toggleStrike',
      isActive: 'strike',
      shortcut: 'Cmd+Shift+S',
    },
    {
      name: 'code',
      icon: 'Code',
      command: 'toggleCode',
      isActive: 'code',
      shortcut: 'Cmd+E',
    },
  ],
  
  headings: [
    {
      name: 'heading1',
      label: 'Heading 1',
      command: () => ({ level: 1 }),
      isActive: { name: 'heading', attributes: { level: 1 } },
    },
    {
      name: 'heading2',
      label: 'Heading 2',
      command: () => ({ level: 2 }),
      isActive: { name: 'heading', attributes: { level: 2 } },
    },
    {
      name: 'heading3',
      label: 'Heading 3',
      command: () => ({ level: 3 }),
      isActive: { name: 'heading', attributes: { level: 3 } },
    },
    {
      name: 'paragraph',
      label: 'Paragraph',
      command: 'setParagraph',
      isActive: 'paragraph',
    },
  ],
  
  lists: [
    {
      name: 'bulletList',
      icon: 'List',
      command: 'toggleBulletList',
      isActive: 'bulletList',
    },
    {
      name: 'orderedList',
      icon: 'ListOrdered',
      command: 'toggleOrderedList',
      isActive: 'orderedList',
    },
    {
      name: 'taskList',
      icon: 'CheckSquare',
      command: 'toggleTaskList',
      isActive: 'taskList',
    },
  ],
  
  blocks: [
    {
      name: 'blockquote',
      icon: 'Quote',
      command: 'toggleBlockquote',
      isActive: 'blockquote',
    },
    {
      name: 'codeBlock',
      icon: 'Code2',
      command: 'toggleCodeBlock',
      isActive: 'codeBlock',
    },
    {
      name: 'horizontalRule',
      icon: 'Minus',
      command: 'setHorizontalRule',
      isActive: false,
    },
  ],
}

// AI integration helpers
export const aiHelpers = {
  getSelectedText: (editor) => {
    const { from, to } = editor.state.selection
    return editor.state.doc.textBetween(from, to)
  },
  
  getDocumentContent: (editor) => {
    return editor.getHTML()
  },
  
  insertTextAtCursor: (editor, text) => {
    editor.chain().focus().insertContent(text).run()
  },
  
  replaceSelection: (editor, text) => {
    editor.chain().focus().deleteSelection().insertContent(text).run()
  },
  
  replaceDocument: (editor, content) => {
    editor.commands.setContent(content)
  },
}