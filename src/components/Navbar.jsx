import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Plus, 
  Search, 
  Settings, 
  User, 
  Moon, 
  Sun,
  Menu,
  Home,
  Folder,
  Star,
  Clock
} from 'lucide-react';
import { useTheme } from 'next-themes';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../lib/utils';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const isDocumentPage = location.pathname.includes('/document/');
  const documentTitle = isDocumentPage ? 'Untitled Document' : null;

  const handleNewDocument = () => {
    navigate('/new');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Mock search functionality
    console.log('Searching for:', searchQuery);
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <nav className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-4 sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Logo/Brand */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <FileText className="w-6 h-6" />
          <span className="font-semibold text-lg hidden sm:block">DocEditor</span>
        </Link>

        {/* Document Title (only on document pages) */}
        {isDocumentPage && (
          <>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300 max-w-48 truncate">
                {documentTitle}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-4">
        <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
          <Dialog.Trigger asChild>
            <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Search className="w-4 h-4" />
              <span className="flex-1 text-left">Search documents...</span>
              <kbd className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded border">
                ⌘K
              </kbd>
            </button>
          </Dialog.Trigger>
          
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 z-50">
              <div className="p-4">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1">
                      Quick Actions
                    </div>
                    <button
                      type="button"
                      onClick={handleNewDocument}
                      className="w-full flex items-center space-x-3 px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create new document</span>
                    </button>
                  </div>
                </form>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* New Document Button */}
        <button
          onClick={handleNewDocument}
          className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:block">New</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>

        {/* User Menu */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center space-x-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
              <User className="w-4 h-4" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-800 p-1 z-50"
              align="end"
              sideOffset={5}
            >
              <DropdownMenu.Item className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer outline-none">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </DropdownMenu.Item>
              
              <DropdownMenu.Item className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer outline-none">
                <Folder className="w-4 h-4" />
                <span>My Documents</span>
              </DropdownMenu.Item>
              
              <DropdownMenu.Item className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer outline-none">
                <Star className="w-4 h-4" />
                <span>Favorites</span>
              </DropdownMenu.Item>
              
              <DropdownMenu.Item className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer outline-none">
                <Clock className="w-4 h-4" />
                <span>Recent</span>
              </DropdownMenu.Item>
              
              <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-800 my-1" />
              
              <DropdownMenu.Item className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer outline-none">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </nav>
  );
};

export default Navbar;