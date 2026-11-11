import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, LogIn, Menu, X } from 'lucide-react';
import './Navbar.css';
import { brandConfig, navbarData } from '../../data/landingData';

const Navbar = ({
  brand = brandConfig,
  data = navbarData,
  onNavClick,
  onSearch,
  onWishlistClick,
  onCartClick,
  onLoginClick,
}) => {
  const [activeTab, setActiveTab] = useState(data.navLinks[0]?.id || 'men');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Auth state: Default is false (focus on Login button) as requested by user.
  // Can be toggled by clicking the button or passing props.
  const [isLoggedIn, setIsLoggedIn] = useState(data.actions.auth.isLoggedInDefault ?? false);

  // Scroll detection for enhanced shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const handleAuthToggle = () => {
    if (!isLoggedIn) {
      if (onLoginClick) onLoginClick();
      // Interactive demonstration: switches between Login and Profile
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <motion.header
      className={`maaya-navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="maaya-navbar-container">
        {/* Brand Identity / Logo */}
        <a href="#" className="navbar-brand" aria-label={brand.name}>
          <div className="brand-text-group">
            <h1 className="brand-title">
              {brand.name}
              <span className="brand-dot">.</span>
            </h1>
            <span className="brand-telugu-tag">{brand.teluguName}</span>
          </div>
          {brand.logo?.badge}
        </a>

        {/* Primary Categories: Men, Women, Kids */}
        <nav aria-label="Main Navigation">
          <ul className="navbar-nav-links">
            {data.navLinks.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} className="nav-link-item">
                  <button
                    type="button"
                    className="nav-link-btn"
                    onClick={() => {
                      setActiveTab(item.id);
                      if (onNavClick) onNavClick(item);
                    }}
                  >
                    <span>{item.label}</span>

                    {/* Animated Sliding Underline Indicator */}
                    {isActive && (
                      <motion.div
                        className="nav-link-indicator"
                        layoutId="activeNavIndicator"
                        transition={{ type: 'linear', stiffness: 400, damping: 10 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Balanced Spacer */}
        <div className="navbar-spacer" />

        {/* Right-End Actions: Search, Wishlist, Cart, Login / Profile */}
        <div className="navbar-actions">
          {/* Search Bar with Symbol and Text */}
          <form className="navbar-search-box" onSubmit={handleSearchSubmit}>
            <Search className="search-icon-symbol" strokeWidth={2.5} />
            <input
              type="text"
              className="search-input-field"
              placeholder={data.search.placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={data.search.ariaLabel}
            />
          </form>

          {/* Wishlist Heart Symbol */}
          <motion.button
            type="button"
            className="nav-icon-action-btn"
            aria-label={data.actions.wishlist.ariaLabel}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              if (onWishlistClick) onWishlistClick();
            }}
          >
            <Heart size={19} strokeWidth={2} />
          </motion.button>

          {/* Cart Symbol */}
          <motion.button
            type="button"
            className="nav-icon-action-btn"
            aria-label={data.actions.cart.ariaLabel}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              if (onCartClick) onCartClick();
            }}
          >
            <ShoppingBag size={19} strokeWidth={2} />
          </motion.button>

          {/* Auth Button: Login vs Profile Icon toggle */}
          <div className="auth-container">
            <AnimatePresence mode="wait">
              {!isLoggedIn ? (
                /* Primary State: Focus on Login button as requested */
                <motion.button
                  key="login-btn"
                  type="button"
                  className="login-action-btn"
                  onClick={handleAuthToggle}
                  title="Click to toggle logged in / logged out state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <LogIn size={13} strokeWidth={2.4} />
                  <span>{data.actions.auth.loginLabel}</span>
                </motion.button>
              ) : (
                /* After Login State: Profile Icon with User Symbol */
                <motion.button
                  key="profile-btn"
                  type="button"
                  className="profile-avatar-btn"
                  onClick={handleAuthToggle}
                  title="Click to toggle logged in / logged out state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <div className="profile-avatar-circle">
                    <User size={14} strokeWidth={2.4} />
                  </div>
                  <span className="profile-username">{data.actions.auth.profileName}</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Toggle Navigation Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mobile-search-box">
              <Search size={18} color="var(--color-white)" />
              <input
                type="text"
                placeholder={data.search.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ul className="mobile-nav-links">
              {data.navLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label} ({item.teluguLabel})
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
