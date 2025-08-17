import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import DocumentEditor from './components/DocumentEditor'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Router>
        <div className="h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/document/:id" element={<DocumentPage />} />
            <Route path="/new" element={<NewDocumentPage />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  )
}

function HomePage() {
  return (
    <div className="flex h-full">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={20} minSize={15} maxSize={25}>
          <Sidebar />
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={80}>
          <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                Welcome to Document Editor
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Create and edit documents with AI assistance
              </p>
              <button
                onClick={() => window.location.href = '/new'}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create New Document
              </button>
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  )
}

function DocumentPage() {
  return (
    <div className="flex h-full">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={20} minSize={15} maxSize={25}>
          <Sidebar />
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={80}>
          <DocumentEditor />
        </Panel>
      </PanelGroup>
    </div>
  )
}

function NewDocumentPage() {
  return (
    <div className="flex h-full">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={20} minSize={15} maxSize={25}>
          <Sidebar />
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={80}>
          <DocumentEditor isNew={true} />
        </Panel>
      </PanelGroup>
    </div>
  )
}

export default App