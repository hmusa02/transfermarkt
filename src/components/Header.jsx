import { Search, User, Bell, Settings, HelpCircle, Moon, Sun, Home, Trophy, TrendingUp, Heart, Brain, FolderOpen, Euro, CreditCard, Menu, X, Users, Building2, Calendar, BarChart3, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useState } from 'react';
import { searchApi } from '../services/searchApi';

export default function Header() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleSearch = async (e, query = null) => {
    e.preventDefault();
    const searchTerm = query || searchQuery || mobileSearchQuery;
    if (!searchTerm.trim()) {
      return;
    }

    setLoading(true);
    try {
      // Navigate to home page with search query
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
      // Scroll to top to see search results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="bg-[#1a1a1a] border-b border-[#2a2a2a] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Logo + Search + Actions */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">TH</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-semibold text-white block">TransferHub</span>
              <span className="text-xs text-gray-400">Premium Platform</span>
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile, shown on larger screens */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search players, clubs, leagues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-sky-500 transition-colors"
                disabled={loading}
              />
              {loading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
              )}
            </form>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-2">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-[#2a2a2a] rounded-md transition-colors"
              aria-label="Toggle menu"
              type="button"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-300" />
              )}
            </button>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-[#2a2a2a] rounded-md transition-colors"
                aria-label="Toggle dark mode"
                type="button"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-300" />
                )}
              </button>
              <Link to="/notifikacije" className="p-2 hover:bg-[#2a2a2a] rounded-md transition-colors relative">
                <Bell className="w-5 h-5 text-gray-300" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-400 rounded-full"></span>
              </Link>
              <button className="p-2 hover:bg-[#2a2a2a] rounded-md transition-colors">
                <HelpCircle className="w-5 h-5 text-gray-300" />
              </button>
              <button className="p-2 hover:bg-[#2a2a2a] rounded-md transition-colors">
                <Settings className="w-5 h-5 text-gray-300" />
              </button>
              <Link to="/pretplate" className="p-2 hover:bg-[#2a2a2a] rounded-md transition-colors">
                <User className="w-5 h-5 text-gray-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Desktop */}
        <nav className="hidden lg:flex items-center justify-start space-x-1 border-t border-[#2a2a2a] relative">
          <div className="flex items-center space-x-1 w-full">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isDropdownOpen = openDropdown === item.name;

              if (hasSubmenu) {
                return (
                  <div
                    key={item.name}
                    className="relative flex-shrink-0"
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="flex items-center">
                      <Link
                        to={item.href}
                      className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                        active
                          ? 'bg-sky-500 text-white'
                          : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-white'
                      }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                      <button
                        onClick={() => setOpenDropdown(isDropdownOpen ? null : item.name)}
                        className={`px-2 py-3 text-sm font-medium transition-colors ${
                          active
                            ? 'text-white'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div 
                        className="absolute top-full left-0 pt-1 w-56 z-[100]"
                      >
                        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg shadow-xl py-2">
                          {item.submenu.map((subItem) => {
                            const subActive = isActive(subItem.href);
                            return (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                onClick={() => setOpenDropdown(null)}
                                className={`block px-4 py-2 text-sm transition-colors ${
                                  subActive
                                    ? 'bg-sky-500 text-white'
                                    : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-white'
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                    active
                      ? 'bg-sky-500 text-white'
                      : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#2a2a2a] py-4">
            {/* Mobile Search */}
            <div className="mb-4 px-2">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search players, clubs, leagues..."
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-sky-500 transition-colors"
                  disabled={loading}
                />
                {loading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                )}
              </form>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                const isMobileDropdownOpen = openDropdown === item.name;

                if (hasSubmenu) {
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => setOpenDropdown(isMobileDropdownOpen ? null : item.name)}
                        className={`w-full flex items-center justify-between space-x-3 px-4 py-3 text-sm font-medium transition-colors ${
                          active
                            ? 'bg-sky-500 text-white'
                            : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isMobileDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isMobileDropdownOpen && (
                        <div className="pl-8 space-y-1">
                          {item.submenu.map((subItem) => {
                            const subActive = isActive(subItem.href);
                            return (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setOpenDropdown(null);
                                }}
                                className={`block px-4 py-2 text-sm transition-colors ${
                                  subActive
                                    ? 'bg-sky-500 text-white'
                                    : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-white'
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-sky-500 text-white'
                        : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Actions */}
            <div className="mt-4 pt-4 border-t border-[#2a2a2a] flex items-center justify-around">
              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-[#2a2a2a] rounded-md transition-colors"
                aria-label="Toggle dark mode"
                type="button"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-300" />
                )}
              </button>
              <Link to="/notifikacije" className="p-2 hover:bg-[#2a2a2a] rounded-md transition-colors relative">
                <Bell className="w-5 h-5 text-gray-300" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-400 rounded-full"></span>
              </Link>
              <button className="p-2 hover:bg-[#2a2a2a] rounded-md transition-colors">
                <HelpCircle className="w-5 h-5 text-gray-300" />
              </button>
              <button className="p-2 hover:bg-[#2a2a2a] rounded-md transition-colors">
                <Settings className="w-5 h-5 text-gray-300" />
              </button>
              <Link to="/pretplate" className="p-2 hover:bg-[#2a2a2a] rounded-md transition-colors">
                <User className="w-5 h-5 text-gray-300" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

