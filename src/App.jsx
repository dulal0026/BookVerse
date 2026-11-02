import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  ChevronDown,
  Search,
  Heart,
  ShoppingCart,
  User,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  GraduationCap,
  TrendingUp,
  HeartPulse,
  Code2,
  Leaf,
  Smile,
  Landmark,
  Compass,
  Palette,
  Star,
  X,
  Minus,
  Plus,
  Menu,
  Check
} from 'lucide-react';

const categories = [
  { name: 'Fiction', icon: BookOpen, color: '#0ea5e9', bg: '#f0f9ff' },
  { name: 'Education', icon: GraduationCap, color: '#6366f1', bg: '#eef2ff' },
  { name: 'Business & Finance', icon: TrendingUp, color: '#10b981', bg: '#ecfdf5' },
  { name: 'Health & Wellness', icon: HeartPulse, color: '#ef4444', bg: '#fef2f2' },
  { name: 'Technology', icon: Code2, color: '#3b82f6', bg: '#eff6ff' },
  { name: 'Self-Help', icon: Leaf, color: '#84cc16', bg: '#f7fee7' },
  { name: 'Children\'s Books', icon: Smile, color: '#ec4899', bg: '#fdf2f8' },
  { name: 'History', icon: Landmark, color: '#f59e0b', bg: '#fffbeb' },
  { name: 'Religion', icon: Compass, color: '#0284c7', bg: '#f0f9ff' },
  { name: 'Arts & Design', icon: Palette, color: '#f97316', bg: '#fff7ed' },
];

const initialBooks = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    rating: 4.8,
    reviews: '12,340',
    price: 699,
    oldPrice: 899,
    category: 'Self-Help',
    tag: 'bestseller',
    image: '/books/atomic.jpg',
  },
  {
    id: 2,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    rating: 4.7,
    reviews: '8,921',
    price: 649,
    oldPrice: 799,
    category: 'Business & Finance',
    tag: 'bestseller',
    image: '/books/psychology.jpg',
  },
  {
    id: 3,
    title: 'Ikigai',
    author: 'Héctor García',
    rating: 4.7,
    reviews: '6,514',
    price: 599,
    oldPrice: 749,
    category: 'Self-Help',
    tag: 'bestseller',
    image: '/books/ikigai.jpg',
  },
  {
    id: 4,
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    rating: 4.6,
    reviews: '7,903',
    price: 799,
    oldPrice: 999,
    category: 'Education',
    tag: 'bestseller',
    image: '/books/thinking-fast-slow.jpg',
  },
  {
    id: 5,
    title: 'Deep Work',
    author: 'Cal Newport',
    rating: 4.7,
    reviews: '5,620',
    price: 679,
    oldPrice: 849,
    category: 'Technology',
    tag: 'bestseller',
    image: '/books/deep-work.jpg',
  },
  {
    id: 6,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    rating: 4.8,
    reviews: '14,200',
    price: 899,
    oldPrice: 1099,
    category: 'History',
    tag: 'bestseller',
    image: '/books/sapiens.jpg',
  },
  {
    id: 7,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    rating: 4.7,
    reviews: '18,450',
    price: 499,
    oldPrice: 650,
    category: 'Fiction',
    tag: 'new',
    image: '/books/alchemist.jpg',
  },
  {
    id: 8,
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    rating: 4.8,
    reviews: '21,100',
    price: 550,
    oldPrice: 720,
    category: 'Business & Finance',
    tag: 'coming',
    image: '/books/richdad.jpg',
  }
];

export default function App() {
  // Preset 3 items in cart to match badge "3" in design screenshot
  const [cart, setCart] = useState({ 1: 1, 2: 1, 3: 1 });
  const [wishlist, setWishlist] = useState([1]);
  const [activeTab, setActiveTab] = useState('Bestsellers');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const cartTotalCount = useMemo(() => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2400);
  };

  const addToCart = (book) => {
    setCart((prev) => ({
      ...prev,
      [book.id]: (prev[book.id] || 0) + 1,
    }));
    showToast(`"${book.title}" added to cart`);
  };

  const updateCartQty = (bookId, delta) => {
    setCart((prev) => {
      const current = prev[bookId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[bookId];
        return copy;
      }
      return { ...prev, [bookId]: next };
    });
  };

  const toggleWishlist = (bookId, e) => {
    e?.stopPropagation();
    setWishlist((prev) => {
      const exists = prev.includes(bookId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== bookId);
      } else {
        showToast('Saved to wishlist');
        return [...prev, bookId];
      }
    });
  };

  // Filtered books
  const displayedBooks = useMemo(() => {
    return initialBooks.filter((book) => {
      // Search matching
      const matchesSearch =
        searchQuery.trim() === '' ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Category filter if selected
      if (selectedCategory && book.category !== selectedCategory) {
        return false;
      }

      // Tab filter
      if (activeTab === 'Bestsellers') {
        return book.tag === 'bestseller';
      } else if (activeTab === 'New Arrivals') {
        return book.tag === 'new' || book.id === 1 || book.id === 4;
      } else if (activeTab === 'Coming Soon') {
        return book.tag === 'coming' || book.id === 2 || book.id === 5;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, activeTab]);

  const cartSubtotal = useMemo(() => {
    return initialBooks.reduce((sum, book) => {
      const qty = cart[book.id] || 0;
      return sum + book.price * qty;
    }, 0);
  }, [cart]);

  const scrollToBestsellers = () => {
    document.getElementById('bestsellers-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="page-wrapper">
      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="container nav-container">
          {/* Brand Logo */}
          <a href="#" className="brand-wrapper">
            <div className="brand-icon-box">
              <BookOpen size={24} strokeWidth={2.2} />
            </div>
            <div className="brand-text">
              <span className="brand-title">BookVerse</span>
              <span className="brand-subtitle">Online Book Store</span>
            </div>
          </a>

          {/* Navigation links */}
          <nav className="nav-links">
            <a href="#" className="nav-item active">
              Home
              <span className="active-bar" />
            </a>
            <a href="#bestsellers-section" className="nav-item" onClick={scrollToBestsellers}>
              Books <ChevronDown size={14} />
            </a>
            <a href="#categories-section" className="nav-item" onClick={scrollToCategories}>
              Categories <ChevronDown size={14} />
            </a>
            <a href="#bestsellers-section" className="nav-item" onClick={() => { setActiveTab('Bestsellers'); scrollToBestsellers(); }}>
              Bestsellers
            </a>
            <a href="#bestsellers-section" className="nav-item" onClick={() => { setActiveTab('New Arrivals'); scrollToBestsellers(); }}>
              New Arrivals
            </a>
            <a href="#bestsellers-section" className="nav-item" onClick={() => { setSelectedCategory(null); scrollToBestsellers(); }}>
              Offers
            </a>
          </nav>

          {/* Search bar */}
          <div className="search-bar-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search books, authors, ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && scrollToBestsellers()}
            />
            <button className="search-submit-btn" onClick={scrollToBestsellers} aria-label="Search">
              <Search size={17} />
            </button>
          </div>

          {/* Right Header Actions */}
          <div className="header-actions">
            <button
              className="action-btn"
              onClick={() => showToast(`You have ${wishlist.length} item(s) in your Wishlist`)}
            >
              <div className="action-icon-wrap">
                <Heart size={21} strokeWidth={1.8} />
              </div>
              <span>Wishlist</span>
            </button>

            <button className="action-btn" onClick={() => setIsCartOpen(true)}>
              <div className="action-icon-wrap">
                <ShoppingCart size={21} strokeWidth={1.8} />
                {cartTotalCount > 0 && <span className="badge-count">{cartTotalCount}</span>}
              </div>
              <span>Cart</span>
            </button>

            <button
              className="profile-avatar"
              onClick={() => showToast('My Profile & Account settings')}
              aria-label="User Profile"
            >
              <User size={20} />
            </button>

            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO BANNER ================= */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-layout">
            {/* Left Content */}
            <div className="hero-content">
              <h1 className="hero-heading">
                Discover Your<br />
                Next <span className="highlight-purple">Great Read</span>
              </h1>
              <p className="hero-description">
                A vast collection of books across all genres — fiction, non-fiction, education, and more.
              </p>
              <div className="hero-cta-group">
                <button className="btn-primary" onClick={scrollToBestsellers}>
                  Shop Now <ArrowRight size={16} />
                </button>
                <button className="btn-secondary" onClick={scrollToCategories}>
                  Browse Categories
                </button>
              </div>

              {/* 4 Feature Badges */}
              <div className="hero-features-bar">
                <div className="feature-item">
                  <div className="feature-icon">
                    <Truck size={22} strokeWidth={1.9} />
                  </div>
                  <div className="feature-texts">
                    <span className="feature-title">Fast Delivery</span>
                    <span className="feature-sub">Across Bangladesh</span>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <ShieldCheck size={22} strokeWidth={1.9} />
                  </div>
                  <div className="feature-texts">
                    <span className="feature-title">Secure Payment</span>
                    <span className="feature-sub">100% Protected</span>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <RotateCcw size={22} strokeWidth={1.9} />
                  </div>
                  <div className="feature-texts">
                    <span className="feature-title">Easy Returns</span>
                    <span className="feature-sub">Hassle-Free</span>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <Headphones size={22} strokeWidth={1.9} />
                  </div>
                  <div className="feature-texts">
                    <span className="feature-title">Customer Support</span>
                    <span className="feature-sub">7 Days a Week</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="hero-visual-wrapper">
              <img
                src="/hero-books.png"
                alt="Atomic Habits and collection of books on study table"
                className="hero-visual-img"
              />
            </div>
          </div>

          {/* Slider indicator dots */}
          <div className="hero-dots-container">
            <span
              className={`hero-dot ${activeSlide === 0 ? 'active' : ''}`}
              onClick={() => setActiveSlide(0)}
            />
            <span
              className={`hero-dot ${activeSlide === 1 ? 'active' : ''}`}
              onClick={() => setActiveSlide(1)}
            />
            <span
              className={`hero-dot ${activeSlide === 2 ? 'active' : ''}`}
              onClick={() => setActiveSlide(2)}
            />
          </div>
        </div>
      </section>

      {/* ================= SHOP BY CATEGORY ================= */}
      <section id="categories-section" className="section-wrapper">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <button
              className="section-view-all-link"
              onClick={() => {
                setSelectedCategory(null);
                scrollToBestsellers();
              }}
            >
              View All Categories <ArrowRight size={16} />
            </button>
          </div>

          <div className="categories-carousel">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.name;
              return (
                <div
                  key={cat.name}
                  className={`category-card ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(isSelected ? null : cat.name);
                    scrollToBestsellers();
                  }}
                >
                  <div
                    className="category-icon-box"
                    style={{ backgroundColor: cat.bg, color: cat.color }}
                  >
                    <IconComp size={24} strokeWidth={1.9} />
                  </div>
                  <span className="category-name">{cat.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= BESTSELLERS SECTION ================= */}
      <section id="bestsellers-section" className="section-wrapper">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {selectedCategory ? `${selectedCategory} Books` : 'Bestsellers'}
            </h2>

            <div className="bestsellers-header-right">
              <div className="filter-pills-group">
                {['Bestsellers', 'New Arrivals', 'Coming Soon'].map((tab) => (
                  <button
                    key={tab}
                    className={`filter-pill ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(tab);
                      setSelectedCategory(null);
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                className="section-view-all-link"
                onClick={() => {
                  setSelectedCategory(null);
                  setActiveTab('Bestsellers');
                  setSearchQuery('');
                }}
              >
                View All <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Book Cards Grid */}
          <div className="books-grid">
            {displayedBooks.length > 0 ? (
              displayedBooks.map((book) => {
                const isWishlisted = wishlist.includes(book.id);
                return (
                  <article key={book.id} className="book-card-item">
                    <div className="book-cover-area">
                      <img
                        src={book.image}
                        alt={`${book.title} cover`}
                        className="book-cover-img"
                      />
                    </div>

                    <div className="book-meta">
                      <h3 className="book-title" title={book.title}>
                        {book.title}
                      </h3>
                      <p className="book-author" title={book.author}>
                        {book.author}
                      </p>

                      <div className="book-rating-row">
                        <Star size={13} fill="#f59e0b" className="star-icon" />
                        <span>{book.rating}</span>
                        <span className="rating-count">({book.reviews})</span>
                      </div>

                      <div className="book-bottom-row">
                        <div className="price-box">
                          <span className="current-price">৳ {book.price}</span>
                          {book.oldPrice && (
                            <span className="old-price">৳ {book.oldPrice}</span>
                          )}
                        </div>

                        <button
                          className="card-cart-btn"
                          onClick={() => addToCart(book)}
                          aria-label={`Add ${book.title} to cart`}
                          title="Add to Cart"
                        >
                          <ShoppingCart size={16} strokeWidth={2.2} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="empty-state">
                <p>No books found for the selected filter or search term.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                    setActiveTab('Bestsellers');
                  }}
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="site-footer">
        <div className="container footer-content">
          <div className="brand-wrapper">
            <div className="brand-icon-box" style={{ width: '32px', height: '32px' }}>
              <BookOpen size={18} />
            </div>
            <span className="brand-title" style={{ fontSize: '16px' }}>
              BookVerse
            </span>
          </div>

          <p>© {new Date().getFullYear()} BookVerse Online Book Store. All rights reserved.</p>

          <div className="footer-links">
            <a href="#">About Us</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Help Center</a>
          </div>
        </div>
      </footer>

      {/* ================= TOAST NOTIFICATION ================= */}
      {toastMessage && (
        <div className="toast-notice" role="alert">
          <Check size={16} color="#4ade80" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= CART SLIDE-OVER DRAWER ================= */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer-header">
              <h2 className="cart-drawer-title">Shopping Cart ({cartTotalCount})</h2>
              <button
                className="close-btn"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            <div className="cart-items-list">
              {cartTotalCount === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 10px', color: '#6b7280' }}>
                  <ShoppingCart size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
                  <p style={{ fontWeight: 600 }}>Your cart is empty</p>
                  <p style={{ fontSize: '13px', marginTop: '6px' }}>
                    Explore our collection and add your favorite books!
                  </p>
                </div>
              ) : (
                initialBooks
                  .filter((b) => cart[b.id])
                  .map((book) => {
                    const qty = cart[book.id];
                    return (
                      <div key={book.id} className="cart-item-row">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="cart-item-thumb"
                        />
                        <div className="cart-item-info">
                          <h4 className="cart-item-title">{book.title}</h4>
                          <p className="cart-item-price">৳ {book.price}</p>
                          <div className="qty-control">
                            <button
                              className="qty-btn"
                              onClick={() => updateCartQty(book.id, -1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="qty-val">{qty}</span>
                            <button
                              className="qty-btn"
                              onClick={() => updateCartQty(book.id, 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>

            {cartTotalCount > 0 && (
              <div className="cart-drawer-footer">
                <div className="cart-subtotal-row">
                  <span style={{ fontWeight: 600, color: '#4b5563' }}>Subtotal:</span>
                  <span className="cart-subtotal-amount">৳ {cartSubtotal}</span>
                </div>
                <button
                  className="btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => {
                    showToast('Proceeding to Checkout...');
                    setTimeout(() => setIsCartOpen(false), 1200);
                  }}
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
