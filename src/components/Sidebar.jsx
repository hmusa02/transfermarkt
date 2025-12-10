import { 
  Home, Trophy, TrendingUp, Heart, Brain, FolderOpen, Euro, CreditCard,
  Menu, X 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Leagues', href: '/lige', icon: Trophy },
    { name: 'Transfers', href: '/transferi', icon: TrendingUp },
    { name: 'Watchlist', href: '/watchlist', icon: Heart },
    { name: 'AI Predictions', href: '/ai-predikcije', icon: Brain },
    { name: 'Scouting', href: '/scouting', icon: FolderOpen },
    { name: 'Valuation', href: '/valuation', icon: Euro },
    { name: 'Subscriptions', href: '/pretplate', icon: CreditCard },
  ];

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md shadow-sm"
      >
        {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-[#1a1a1a] border-r border-[#2a2a2a]
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
        pt-16 lg:pt-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-6 border-b border-[#2a2a2a]">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-sm">TH</span>
              </div>
              <div>
                <span className="text-lg font-semibold text-white block">TransferHub</span>
                <span className="text-xs text-gray-400">Premium Platform</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`sidebar-link ${active ? 'sidebar-link-active' : ''}`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-[#2a2a2a]">
            <div className="px-4 py-3 bg-[#2a2a2a] rounded-lg">
              <p className="text-xs font-medium text-white mb-1">Premium Plan</p>
              <p className="text-xs text-gray-400">Active until 31.12.2025</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
