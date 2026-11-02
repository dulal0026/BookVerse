import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  Check,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  ChevronRight,
  Filter,
  SlidersHorizontal,
  CheckCircle2,
  MapPin,
  Phone,
  CreditCard,
  Package,
  Tag,
  ChevronLeft,
  Printer,
  Clock,
  Receipt
} from 'lucide-react';

const categories = [
  {
    name: 'Fiction',
    icon: BookOpen,
    color: '#0ea5e9',
    bg: '#f0f9ff',
    subtitle: 'Novels & Sci-Fi',
    description: 'Dive into imaginative worlds, captivating storytelling, timeless classics, and thrilling literary adventures.',
    gradient: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)',
    coverGradient: 'linear-gradient(145deg, #0284c7, #0369a1)',
  },
  {
    name: 'Education',
    icon: GraduationCap,
    color: '#6366f1',
    bg: '#eef2ff',
    subtitle: 'Textbooks & Guides',
    description: 'Deepen your knowledge with psychology, scientific inquiries, academic reference, and critical thinking essentials.',
    gradient: 'linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%)',
    coverGradient: 'linear-gradient(145deg, #6366f1, #4338ca)',
  },
  {
    name: 'Business & Finance',
    icon: TrendingUp,
    color: '#10b981',
    bg: '#ecfdf5',
    subtitle: 'Money & Investing',
    description: 'Master investing principles, economics, financial freedom, corporate leadership, and startup success.',
    gradient: 'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)',
    coverGradient: 'linear-gradient(145deg, #059669, #047857)',
  },
  {
    name: 'Health & Wellness',
    icon: HeartPulse,
    color: '#ef4444',
    bg: '#fef2f2',
    subtitle: 'Mind & Wellness',
    description: 'Empower your body and mind with scientific research on restorative sleep, longevity, mindfulness, and nutrition.',
    gradient: 'linear-gradient(135deg, #ffe4e6 0%, #fff1f2 100%)',
    coverGradient: 'linear-gradient(145deg, #e11d48, #be123c)',
  },
  {
    name: 'Technology',
    icon: Code2,
    color: '#3b82f6',
    bg: '#eff6ff',
    subtitle: 'Coding & AI',
    description: 'Stay ahead of the curve with software architecture, artificial intelligence, deep work, and engineering craft.',
    gradient: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)',
    coverGradient: 'linear-gradient(145deg, #2563eb, #1d4ed8)',
  },
  {
    name: 'Self-Help',
    icon: Leaf,
    color: '#84cc16',
    bg: '#f7fee7',
    subtitle: 'Habits & Growth',
    description: 'Unlock your potential, build unbreakable daily habits, find purpose, and master emotional resilience.',
    gradient: 'linear-gradient(135deg, #ecfccb 0%, #f7fee7 100%)',
    coverGradient: 'linear-gradient(145deg, #65a30d, #4d7c0f)',
  },
  {
    name: 'Children\'s Books',
    icon: Smile,
    color: '#ec4899',
    bg: '#fdf2f8',
    subtitle: 'Stories & Comics',
    description: 'Spark wonder and imagination in young minds with delightful bedtime tales, illustrated journeys, and morals.',
    gradient: 'linear-gradient(135deg, #fce7f3 0%, #fdf2f8 100%)',
    coverGradient: 'linear-gradient(145deg, #db2777, #be185d)',
  },
  {
    name: 'History',
    icon: Landmark,
    color: '#f59e0b',
    bg: '#fffbeb',
    subtitle: 'World & Biographies',
    description: 'Uncover the story of humankind, ancient empires, monumental revolutions, and the leaders who shaped today.',
    gradient: 'linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)',
    coverGradient: 'linear-gradient(145deg, #d97706, #b45309)',
  },
  {
    name: 'Religion',
    icon: Compass,
    color: '#0284c7',
    bg: '#f0f9ff',
    subtitle: 'Faith & Philosophy',
    description: 'Explore timeless spiritual revelations, sacred translations, comparative religion, and moral philosophy.',
    gradient: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)',
    coverGradient: 'linear-gradient(145deg, #0284c7, #075985)',
  },
  {
    name: 'Arts & Design',
    icon: Palette,
    color: '#f97316',
    bg: '#fff7ed',
    subtitle: 'Creativity & Arts',
    description: 'Ignite your artistic vision with principles of user-centered design, architecture, visual aesthetics, and creative craft.',
    gradient: 'linear-gradient(135deg, #ffedd5 0%, #fff7ed 100%)',
    coverGradient: 'linear-gradient(145deg, #ea580c, #c2410c)',
  },
];

const allBooksCatalog = [
  // --- SELF-HELP ---
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
    id: 101,
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen R. Covey',
    rating: 4.8,
    reviews: '9,410',
    price: 640,
    oldPrice: 820,
    category: 'Self-Help',
    tag: 'popular',
    coverGradient: 'linear-gradient(145deg, #4d7c0f, #365314)',
  },
  {
    id: 102,
    title: 'Can\'t Hurt Me',
    author: 'David Goggins',
    rating: 4.9,
    reviews: '15,200',
    price: 720,
    oldPrice: 900,
    category: 'Self-Help',
    tag: 'new',
    coverGradient: 'linear-gradient(145deg, #1f2937, #111827)',
  },
  {
    id: 103,
    title: 'The Mountain Is You',
    author: 'Brianna Wiest',
    rating: 4.7,
    reviews: '5,890',
    price: 580,
    oldPrice: 730,
    category: 'Self-Help',
    tag: 'trending',
    coverGradient: 'linear-gradient(145deg, #65a30d, #4d7c0f)',
  },

  // --- BUSINESS & FINANCE ---
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
    id: 8,
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    rating: 4.8,
    reviews: '21,100',
    price: 550,
    oldPrice: 720,
    category: 'Business & Finance',
    tag: 'bestseller',
    image: '/books/richdad.jpg',
  },
  {
    id: 201,
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    rating: 4.8,
    reviews: '11,230',
    price: 820,
    oldPrice: 1050,
    category: 'Business & Finance',
    tag: 'classic',
    coverGradient: 'linear-gradient(145deg, #065f46, #047857)',
  },
  {
    id: 202,
    title: 'Zero to One',
    author: 'Peter Thiel',
    rating: 4.7,
    reviews: '7,840',
    price: 590,
    oldPrice: 750,
    category: 'Business & Finance',
    tag: 'popular',
    coverGradient: 'linear-gradient(145deg, #047857, #064e3b)',
  },
  {
    id: 203,
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    rating: 4.6,
    reviews: '16,500',
    price: 480,
    oldPrice: 620,
    category: 'Business & Finance',
    tag: 'classic',
    image: '/books/think.jpg',
  },

  // --- EDUCATION ---
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
    id: 301,
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    rating: 4.8,
    reviews: '13,400',
    price: 680,
    oldPrice: 850,
    category: 'Education',
    tag: 'popular',
    coverGradient: 'linear-gradient(145deg, #4338ca, #312e81)',
  },
  {
    id: 302,
    title: 'Guns, Germs, and Steel',
    author: 'Jared Diamond',
    rating: 4.7,
    reviews: '8,200',
    price: 720,
    oldPrice: 890,
    category: 'Education',
    tag: 'academic',
    coverGradient: 'linear-gradient(145deg, #4f46e5, #3730a3)',
  },
  {
    id: 303,
    title: 'How to Read a Book',
    author: 'Mortimer J. Adler',
    rating: 4.6,
    reviews: '4,100',
    price: 540,
    oldPrice: 690,
    category: 'Education',
    tag: 'essential',
    coverGradient: 'linear-gradient(145deg, #6366f1, #4f46e5)',
  },

  // --- TECHNOLOGY ---
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
    id: 401,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    rating: 4.8,
    reviews: '14,800',
    price: 890,
    oldPrice: 1150,
    category: 'Technology',
    tag: 'developer-choice',
    coverGradient: 'linear-gradient(145deg, #1d4ed8, #1e3a8a)',
  },
  {
    id: 402,
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    rating: 4.9,
    reviews: '9,340',
    price: 920,
    oldPrice: 1200,
    category: 'Technology',
    tag: 'masterpiece',
    coverGradient: 'linear-gradient(145deg, #2563eb, #1e40af)',
  },
  {
    id: 403,
    title: 'Life 3.0: Being Human in AI',
    author: 'Max Tegmark',
    rating: 4.7,
    reviews: '6,200',
    price: 720,
    oldPrice: 890,
    category: 'Technology',
    tag: 'ai-trend',
    coverGradient: 'linear-gradient(145deg, #0284c7, #0369a1)',
  },

  // --- HISTORY ---
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
    id: 501,
    title: 'Homo Deus',
    author: 'Yuval Noah Harari',
    rating: 4.7,
    reviews: '9,800',
    price: 850,
    oldPrice: 1050,
    category: 'History',
    tag: 'popular',
    coverGradient: 'linear-gradient(145deg, #b45309, #78350f)',
  },
  {
    id: 502,
    title: 'The Silk Roads',
    author: 'Peter Frankopan',
    rating: 4.8,
    reviews: '7,150',
    price: 790,
    oldPrice: 980,
    category: 'History',
    tag: 'world-history',
    coverGradient: 'linear-gradient(145deg, #d97706, #92400e)',
  },
  {
    id: 503,
    title: 'SPQR: History of Ancient Rome',
    author: 'Mary Beard',
    rating: 4.7,
    reviews: '5,300',
    price: 740,
    oldPrice: 920,
    category: 'History',
    tag: 'ancient',
    coverGradient: 'linear-gradient(145deg, #92400e, #78350f)',
  },

  // --- FICTION ---
  {
    id: 7,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    rating: 4.7,
    reviews: '18,450',
    price: 499,
    oldPrice: 650,
    category: 'Fiction',
    tag: 'classic',
    image: '/books/alchemist.jpg',
  },
  {
    id: 601,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    rating: 4.8,
    reviews: '22,100',
    price: 580,
    oldPrice: 720,
    category: 'Fiction',
    tag: 'legendary',
    coverGradient: 'linear-gradient(145deg, #0284c7, #075985)',
  },
  {
    id: 602,
    title: '1984',
    author: 'George Orwell',
    rating: 4.8,
    reviews: '26,700',
    price: 520,
    oldPrice: 650,
    category: 'Fiction',
    tag: 'dystopian',
    coverGradient: 'linear-gradient(145deg, #0f172a, #334155)',
  },
  {
    id: 603,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    rating: 4.6,
    reviews: '14,300',
    price: 450,
    oldPrice: 590,
    category: 'Fiction',
    tag: 'classic',
    coverGradient: 'linear-gradient(145deg, #0369a1, #0c4a6e)',
  },

  // --- HEALTH & WELLNESS ---
  {
    id: 701,
    title: 'Why We Sleep',
    author: 'Matthew Walker',
    rating: 4.8,
    reviews: '11,400',
    price: 690,
    oldPrice: 850,
    category: 'Health & Wellness',
    tag: 'bestseller',
    coverGradient: 'linear-gradient(145deg, #be123c, #881337)',
  },
  {
    id: 702,
    title: 'The Body Keeps the Score',
    author: 'Bessel van der Kolk',
    rating: 4.9,
    reviews: '19,300',
    price: 750,
    oldPrice: 920,
    category: 'Health & Wellness',
    tag: 'acclaimed',
    coverGradient: 'linear-gradient(145deg, #e11d48, #9f1239)',
  },
  {
    id: 703,
    title: 'Breath: The New Science',
    author: 'James Nestor',
    rating: 4.7,
    reviews: '6,800',
    price: 620,
    oldPrice: 780,
    category: 'Health & Wellness',
    tag: 'popular',
    coverGradient: 'linear-gradient(145deg, #f43f5e, #be123c)',
  },

  // --- CHILDREN'S BOOKS ---
  {
    id: 801,
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    rating: 4.9,
    reviews: '24,500',
    price: 420,
    oldPrice: 550,
    category: 'Children\'s Books',
    tag: 'masterpiece',
    coverGradient: 'linear-gradient(145deg, #db2777, #9d174d)',
  },
  {
    id: 802,
    title: 'Charlotte\'s Web',
    author: 'E.B. White',
    rating: 4.8,
    reviews: '12,900',
    price: 450,
    oldPrice: 580,
    category: 'Children\'s Books',
    tag: 'timeless',
    coverGradient: 'linear-gradient(145deg, #ec4899, #be185d)',
  },
  {
    id: 803,
    title: 'Matilda',
    author: 'Roald Dahl',
    rating: 4.8,
    reviews: '16,200',
    price: 510,
    oldPrice: 650,
    category: 'Children\'s Books',
    tag: 'classic',
    coverGradient: 'linear-gradient(145deg, #be185d, #831843)',
  },

  // --- RELIGION ---
  {
    id: 901,
    title: 'The Quran (English Translation)',
    author: 'M.A.S. Abdel Haleem',
    rating: 4.9,
    reviews: '31,200',
    price: 650,
    oldPrice: 850,
    category: 'Religion',
    tag: 'sacred',
    coverGradient: 'linear-gradient(145deg, #0284c7, #0369a1)',
  },
  {
    id: 902,
    title: 'The Prophet',
    author: 'Kahlil Gibran',
    rating: 4.8,
    reviews: '14,700',
    price: 390,
    oldPrice: 500,
    category: 'Religion',
    tag: 'spiritual',
    coverGradient: 'linear-gradient(145deg, #0369a1, #0c4a6e)',
  },
  {
    id: 903,
    title: 'The Bhagavad Gita',
    author: 'Eknath Easwaran',
    rating: 4.8,
    reviews: '9,800',
    price: 520,
    oldPrice: 660,
    category: 'Religion',
    tag: 'wisdom',
    coverGradient: 'linear-gradient(145deg, #0284c7, #075985)',
  },

  // --- ARTS & DESIGN ---
  {
    id: 1001,
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    rating: 4.8,
    reviews: '18,600',
    price: 750,
    oldPrice: 950,
    category: 'Arts & Design',
    tag: 'must-read',
    coverGradient: 'linear-gradient(145deg, #ea580c, #9a3412)',
  },
  {
    id: 1002,
    title: 'Steal Like an Artist',
    author: 'Austin Kleon',
    rating: 4.7,
    reviews: '12,400',
    price: 460,
    oldPrice: 590,
    category: 'Arts & Design',
    tag: 'creativity',
    coverGradient: 'linear-gradient(145deg, #c2410c, #7c2d12)',
  },
  {
    id: 1003,
    title: 'Ways of Seeing',
    author: 'John Berger',
    rating: 4.6,
    reviews: '5,800',
    price: 520,
    oldPrice: 670,
    category: 'Arts & Design',
    tag: 'visual-theory',
    coverGradient: 'linear-gradient(145deg, #f97316, #c2410c)',
  },
];

// Google and Apple SVG Icons
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.42c.64-.78 1.08-1.87.96-2.96-.93.04-2.07.62-2.73 1.4-.58.67-1.09 1.76-.95 2.82 1.04.08 2.09-.49 2.72-1.26" />
  </svg>
);

export default function App() {
  // Navigation Page View: 'home' | 'category'
  const [currentView, setCurrentView] = useState('home');
  const [activeCategoryName, setActiveCategoryName] = useState('Fiction');

  // Home page state
  const [cart, setCart] = useState({ 1: 1, 2: 1, 3: 1 });
  const [wishlist, setWishlist] = useState([1]);
  const [homeTab, setHomeTab] = useState('Bestsellers');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Dropdown state
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef(null);

  // Category page specific filters
  const [catPriceFilter, setCatPriceFilter] = useState('all');
  const [catRatingFilter, setCatRatingFilter] = useState(0);
  const [catSortBy, setCatSortBy] = useState('featured');
  const [catSearchQuery, setCatSearchQuery] = useState('');

  // Authentication State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup' | 'both'
  const [currentUser, setCurrentUser] = useState(null);

  // Form input states
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirm, setShowSignUpConfirm] = useState(false);

  // Checkout & Order State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review, 4: Success
  const [shippingName, setShippingName] = useState('Ayesha Rahman');
  const [shippingPhone, setShippingPhone] = useState('+880 1712-849201');
  const [shippingEmail, setShippingEmail] = useState('ayesha.rahman@example.com');
  const [shippingDistrict, setShippingDistrict] = useState('Dhaka');
  const [shippingAddress, setShippingAddress] = useState('House 42, Road 9/A, Dhanmondi');
  const [shippingNote, setShippingNote] = useState('');

  const [deliveryMethod, setDeliveryMethod] = useState('standard'); // 'standard' | 'express'
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'bkash' | 'card'

  const [bkashNumber, setBkashNumber] = useState('01712849201');
  const [bkashTrxId, setBkashTrxId] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('789');

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  const [placedOrders, setPlacedOrders] = useState([]);
  const [latestOrder, setLatestOrder] = useState(null);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    };
    if (isCategoryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isCategoryDropdownOpen]);

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

  // Navigations
  const navigateToHome = () => {
    setCurrentView('home');
    setIsCategoryDropdownOpen(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (catName) => {
    setActiveCategoryName(catName);
    setCurrentView('category');
    setIsCategoryDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setCatPriceFilter('all');
    setCatRatingFilter(0);
    setCatSearchQuery('');
    setCatSortBy('featured');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Opened ${catName} page`);
  };

  // Auth Submissions
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      showToast('Please enter both email and password');
      return;
    }
    const displayName = signInEmail.split('@')[0];
    setCurrentUser({
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      email: signInEmail,
    });
    showToast(`Welcome back, ${displayName}! Signed in successfully.`);
    setIsAuthOpen(false);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!signUpName || !signUpEmail || !signUpPassword) {
      showToast('Please fill in all required fields');
      return;
    }
    if (signUpPassword !== signUpConfirmPassword) {
      showToast('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      showToast('Please accept the Terms of Service & Privacy Policy');
      return;
    }
    setCurrentUser({
      name: signUpName,
      email: signUpEmail,
    });
    showToast(`Account created! Welcome to BookVerse, ${signUpName}.`);
    setIsAuthOpen(false);
  };

  const handleSocialAuth = (provider) => {
    const mockName = provider === 'Google' ? 'Alex Rivera' : 'Jordan Hayes';
    setCurrentUser({
      name: mockName,
      email: `${mockName.toLowerCase().replace(' ', '.')}@example.com`,
    });
    showToast(`Connected via ${provider}. Welcome, ${mockName}!`);
    setIsAuthOpen(false);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    showToast('Signed out of BookVerse');
  };

  // Active Category Meta
  const currentCategoryMeta = useMemo(() => {
    return categories.find((c) => c.name === activeCategoryName) || categories[0];
  }, [activeCategoryName]);

  // Books filtered for Category Dedicated Page
  const categoryPageBooks = useMemo(() => {
    let list = allBooksCatalog.filter((b) => b.category === activeCategoryName);

    // Search filter
    if (catSearchQuery.trim()) {
      const q = catSearchQuery.toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }

    // Price filter
    if (catPriceFilter === 'under500') {
      list = list.filter((b) => b.price < 500);
    } else if (catPriceFilter === '500-700') {
      list = list.filter((b) => b.price >= 500 && b.price <= 700);
    } else if (catPriceFilter === '700-1000') {
      list = list.filter((b) => b.price > 700 && b.price <= 1000);
    } else if (catPriceFilter === 'above1000') {
      list = list.filter((b) => b.price > 1000);
    }

    // Rating filter
    if (catRatingFilter > 0) {
      list = list.filter((b) => b.rating >= catRatingFilter);
    }

    // Sorting
    if (catSortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (catSortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (catSortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (catSortBy === 'newest') {
      list.sort((a, b) => b.id - a.id);
    }

    return list;
  }, [activeCategoryName, catSearchQuery, catPriceFilter, catRatingFilter, catSortBy]);

  // Filtered books on Home Page
  const homeBestsellerBooks = useMemo(() => {
    return allBooksCatalog.filter((book) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (homeTab === 'Bestsellers') {
        return book.tag === 'bestseller';
      } else if (homeTab === 'New Arrivals') {
        return book.tag === 'new' || book.id === 1 || book.id === 4;
      } else if (homeTab === 'Coming Soon') {
        return book.tag === 'coming' || book.id === 2 || book.id === 5;
      }
      return true;
    });
  }, [searchQuery, homeTab]);

  const cartSubtotal = useMemo(() => {
    return allBooksCatalog.reduce((sum, book) => {
      const qty = cart[book.id] || 0;
      return sum + book.price * qty;
    }, 0);
  }, [cart]);

  const deliveryFee = useMemo(() => {
    if (cartTotalCount === 0) return 0;
    if (deliveryMethod === 'express') return 120;
    return cartSubtotal >= 1000 ? 0 : 60;
  }, [deliveryMethod, cartSubtotal, cartTotalCount]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.type === 'percent') {
      return Math.round((cartSubtotal * appliedPromo.value) / 100);
    }
    return appliedPromo.value;
  }, [appliedPromo, cartSubtotal]);

  const grandTotal = useMemo(() => {
    return Math.max(0, cartSubtotal + deliveryFee - discountAmount);
  }, [cartSubtotal, deliveryFee, discountAmount]);

  const handleApplyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;
    if (code === 'BOOKVERSE10' || code === 'WELCOME10') {
      setAppliedPromo({ code, type: 'percent', value: 10, label: '10% Discount' });
      showToast('🎉 Promo code applied! 10% off your order');
    } else if (code === 'BOOKVERSE50') {
      setAppliedPromo({ code, type: 'fixed', value: 50, label: '৳50 Off' });
      showToast('🎉 Promo code applied! ৳50 off your order');
    } else if (code === 'FREESHIP') {
      setAppliedPromo({ code, type: 'percent', value: 0, label: 'Free Shipping' });
      setDeliveryMethod('standard');
      showToast('🎉 Promo code applied! Free Shipping');
    } else {
      showToast('Invalid promo code. Try BOOKVERSE10');
    }
  };

  const openCheckout = () => {
    if (cartTotalCount === 0) {
      showToast('Your cart is empty! Add books to proceed.');
      return;
    }
    setIsCartOpen(false);
    setCheckoutStep(1);
    setIsCheckoutOpen(true);
  };

  const handlePlaceOrder = () => {
    if (!shippingName.trim() || !shippingPhone.trim() || !shippingAddress.trim()) {
      showToast('Please enter your full delivery address and contact info.');
      setCheckoutStep(1);
      return;
    }

    const orderId = `BV-${Math.floor(10000 + Math.random() * 90000)}`;
    const today = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(today.getDate() + (deliveryMethod === 'express' ? 1 : 3));

    const orderRecord = {
      id: orderId,
      date: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      estimatedDelivery: deliveryDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      items: allBooksCatalog
        .filter((b) => cart[b.id])
        .map((b) => ({
          ...b,
          quantity: cart[b.id],
          totalPrice: b.price * cart[b.id],
        })),
      subtotal: cartSubtotal,
      deliveryFee,
      deliverySpeed: deliveryMethod === 'express' ? 'Express Courier (Next Day)' : 'Standard Delivery (2-3 Days)',
      discount: discountAmount,
      promoCode: appliedPromo?.code || null,
      grandTotal,
      paymentMethod:
        paymentMethod === 'cod'
          ? 'Cash on Delivery (COD)'
          : paymentMethod === 'bkash'
          ? 'bKash / Mobile Banking'
          : 'Credit / Debit Card',
      paymentStatus: paymentMethod === 'cod' ? 'Due on Delivery' : 'Paid Online (Verified)',
      shipping: {
        name: shippingName,
        phone: shippingPhone,
        email: shippingEmail,
        district: shippingDistrict,
        address: shippingAddress,
        note: shippingNote,
      },
      status: 'Confirmed',
    };

    setLatestOrder(orderRecord);
    setPlacedOrders((prev) => [orderRecord, ...prev]);
    setCart({});
    setCheckoutStep(4);
    showToast(`Order ${orderId} placed successfully!`);
  };

  const scrollToBestsellers = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        document.getElementById('bestsellers-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('bestsellers-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCategories = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-wrapper">
      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="container nav-container">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={navigateToHome}
            className="brand-wrapper"
            style={{ textAlign: 'left' }}
          >
            <div className="brand-icon-box">
              <BookOpen size={24} strokeWidth={2.2} />
            </div>
            <div className="brand-text">
              <span className="brand-title">BookVerse</span>
              <span className="brand-subtitle">Online Book Store</span>
            </div>
          </button>

          {/* Navigation links */}
          <nav className="nav-links">
            <button
              type="button"
              className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
              onClick={navigateToHome}
            >
              Home
              {currentView === 'home' && <span className="active-bar" />}
            </button>

            <button
              type="button"
              className="nav-item"
              onClick={scrollToBestsellers}
            >
              Books <ChevronDown size={14} />
            </button>

            {/* Categories dropdown */}
            <div className="dropdown-anchor" ref={categoryDropdownRef}>
              <button
                type="button"
                className={`nav-item ${currentView === 'category' || isCategoryDropdownOpen ? 'active' : ''}`}
                onClick={() => setIsCategoryDropdownOpen((prev) => !prev)}
                aria-expanded={isCategoryDropdownOpen}
                aria-haspopup="true"
              >
                Categories{' '}
                <ChevronDown
                  size={14}
                  className={`nav-chevron ${isCategoryDropdownOpen ? 'rotated' : ''}`}
                />
                {currentView === 'category' && <span className="active-bar" />}
              </button>

              {isCategoryDropdownOpen && (
                <div className="categories-dropdown-menu" role="menu">
                  <div className="dropdown-header-row">
                    <span className="dropdown-title">Explore Categories</span>
                    <span className="dropdown-count">Tap to view full page</span>
                  </div>

                  <div className="dropdown-grid">
                    {categories.map((cat) => {
                      const IconComp = cat.icon;
                      const isCurrentCat = currentView === 'category' && activeCategoryName === cat.name;
                      return (
                        <button
                          key={cat.name}
                          type="button"
                          className={`dropdown-cat-item ${isCurrentCat ? 'active' : ''}`}
                          onClick={() => navigateToCategory(cat.name)}
                        >
                          <div
                            className="dropdown-cat-icon"
                            style={{ backgroundColor: cat.bg, color: cat.color }}
                          >
                            <IconComp size={18} strokeWidth={2} />
                          </div>
                          <div className="dropdown-cat-info">
                            <span className="dropdown-cat-name">{cat.name}</span>
                            <span className="dropdown-cat-sub">{cat.subtitle}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="dropdown-footer-row">
                    <button
                      type="button"
                      className="dropdown-footer-link"
                      onClick={scrollToCategories}
                    >
                      View All Categories Grid <ArrowRight size={14} />
                    </button>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                      10 Distinct Genres
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              className="nav-item"
              onClick={() => {
                setHomeTab('Bestsellers');
                scrollToBestsellers();
              }}
            >
              Bestsellers
            </button>
            <button
              type="button"
              className="nav-item"
              onClick={() => {
                setHomeTab('New Arrivals');
                scrollToBestsellers();
              }}
            >
              New Arrivals
            </button>
            <button
              type="button"
              className="nav-item"
              onClick={() => {
                navigateToCategory('Self-Help');
              }}
            >
              Offers
            </button>
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

            {placedOrders.length > 0 && (
              <button
                className="action-btn"
                onClick={() => {
                  setCheckoutStep(4);
                  setIsCheckoutOpen(true);
                }}
                title="View My Placed Orders"
              >
                <div className="action-icon-wrap">
                  <Package size={21} strokeWidth={1.8} />
                  <span className="badge-count" style={{ background: '#10b981' }}>
                    {placedOrders.length}
                  </span>
                </div>
                <span>Orders</span>
              </button>
            )}

            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  className="profile-avatar"
                  onClick={() => setIsAuthOpen(true)}
                  title={`Logged in as ${currentUser.name}`}
                  aria-label="User Profile"
                  style={{ background: '#5046e5' }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
                    {currentUser.name.charAt(0)}
                  </span>
                </button>
                <button
                  onClick={handleSignOut}
                  title="Sign Out"
                  style={{ color: '#6b7280', padding: '4px' }}
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                className="profile-avatar"
                onClick={() => {
                  setAuthMode('signin');
                  setIsAuthOpen(true);
                }}
                aria-label="Sign In / Account"
                title="Sign In"
              >
                <User size={20} />
              </button>
            )}

            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-menu container">
            <button
              type="button"
              className="mobile-nav-item"
              onClick={navigateToHome}
            >
              Home
            </button>
            <button
              type="button"
              className="mobile-nav-item"
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToBestsellers();
              }}
            >
              Books
            </button>
            <div>
              <div
                className="mobile-nav-item"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                style={{ cursor: 'pointer' }}
              >
                <span>Categories</span>
                <ChevronDown
                  size={16}
                  className={`nav-chevron ${isCategoryDropdownOpen ? 'rotated' : ''}`}
                />
              </div>
              {isCategoryDropdownOpen && (
                <div className="mobile-cat-accordion">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      type="button"
                      className="dropdown-cat-item"
                      onClick={() => navigateToCategory(cat.name)}
                    >
                      <div
                        className="dropdown-cat-icon"
                        style={{ backgroundColor: cat.bg, color: cat.color }}
                      >
                        <cat.icon size={16} />
                      </div>
                      <span className="dropdown-cat-name" style={{ fontSize: '12px' }}>
                        {cat.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              className="mobile-nav-item"
              onClick={() => {
                setHomeTab('Bestsellers');
                setIsMobileMenuOpen(false);
                scrollToBestsellers();
              }}
            >
              Bestsellers
            </button>
            <button
              type="button"
              className="mobile-nav-item"
              onClick={() => {
                setHomeTab('New Arrivals');
                setIsMobileMenuOpen(false);
                scrollToBestsellers();
              }}
            >
              New Arrivals
            </button>
          </div>
        )}
      </header>

      {/* ================= PAGE ROUTE CONTENT ================= */}
      {currentView === 'category' ? (
        /* ================= DEDICATED CATEGORY PAGE ================= */
        <main className="category-page-container container">
          {/* Breadcrumbs */}
          <nav className="breadcrumbs-bar" aria-label="Breadcrumb">
            <span className="breadcrumb-item" onClick={navigateToHome}>
              Home
            </span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item" onClick={scrollToCategories}>
              Categories
            </span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-active">{activeCategoryName}</span>
          </nav>

          {/* Category Hero Banner */}
          <div
            className="category-hero-card"
            style={{ background: currentCategoryMeta.gradient }}
          >
            <div className="category-hero-left">
              <div
                className="category-hero-icon"
                style={{
                  backgroundColor: currentCategoryMeta.bg,
                  color: currentCategoryMeta.color,
                }}
              >
                <currentCategoryMeta.icon size={32} strokeWidth={2} />
              </div>
              <div className="category-hero-title-group">
                <h1>{activeCategoryName} Books</h1>
                <p className="category-hero-desc">{currentCategoryMeta.description}</p>
                <div className="category-stats-row">
                  <span className="category-stat-pill">
                    📚 {categoryPageBooks.length} Titles Available
                  </span>
                  <span className="category-stat-pill">
                    ⭐ 4.8 Average Rating
                  </span>
                  <span className="category-stat-pill">
                    🚚 Free Delivery over ৳1,000
                  </span>
                </div>
              </div>
            </div>

            <div className="category-hero-right">
              <button
                type="button"
                className="back-to-home-btn"
                onClick={navigateToHome}
              >
                ← Back to Home
              </button>
            </div>
          </div>

          {/* Content Layout: Sidebar Filters + Products Grid */}
          <div className="category-content-layout">
            {/* Sidebar */}
            <aside className="category-sidebar">
              <div>
                <h3 className="sidebar-block-title">All Categories</h3>
                <div className="sidebar-cat-list">
                  {categories.map((cat) => {
                    const count = allBooksCatalog.filter((b) => b.category === cat.name).length;
                    const isActive = activeCategoryName === cat.name;
                    return (
                      <button
                        key={cat.name}
                        type="button"
                        className={`sidebar-cat-button ${isActive ? 'active' : ''}`}
                        onClick={() => navigateToCategory(cat.name)}
                      >
                        <div className="sidebar-cat-left">
                          <cat.icon size={15} color={cat.color} />
                          <span>{cat.name}</span>
                        </div>
                        <span className="sidebar-cat-badge">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="sidebar-block-title">Price Range</h3>
                <div className="sidebar-filter-options">
                  {[
                    { label: 'All Prices', val: 'all' },
                    { label: 'Under ৳500', val: 'under500' },
                    { label: '৳500 – ৳700', val: '500-700' },
                    { label: '৳700 – ৳1,000', val: '700-1000' },
                    { label: 'Over ৳1,000', val: 'above1000' },
                  ].map((p) => (
                    <label key={p.val} className="sidebar-radio-item">
                      <input
                        type="radio"
                        name="priceFilter"
                        checked={catPriceFilter === p.val}
                        onChange={() => setCatPriceFilter(p.val)}
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="sidebar-block-title">Customer Rating</h3>
                <div className="sidebar-filter-options">
                  {[
                    { label: 'All Ratings', val: 0 },
                    { label: '4.8 ★ & above', val: 4.8 },
                    { label: '4.5 ★ & above', val: 4.5 },
                  ].map((r) => (
                    <label key={r.val} className="sidebar-radio-item">
                      <input
                        type="radio"
                        name="ratingFilter"
                        checked={catRatingFilter === r.val}
                        onChange={() => setCatRatingFilter(r.val)}
                      />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset button */}
              {(catPriceFilter !== 'all' || catRatingFilter !== 0 || catSearchQuery) && (
                <button
                  type="button"
                  className="sidebar-reset-btn"
                  onClick={() => {
                    setCatPriceFilter('all');
                    setCatRatingFilter(0);
                    setCatSearchQuery('');
                  }}
                >
                  Reset Category Filters
                </button>
              )}
            </aside>

            {/* Products Main Section */}
            <section className="category-products-area">
              <div className="products-control-bar">
                <div className="products-result-count">
                  Showing <strong>{categoryPageBooks.length}</strong> products in{' '}
                  <strong>{activeCategoryName}</strong>
                </div>

                <div className="products-filter-actions">
                  <input
                    type="text"
                    className="sort-select"
                    style={{ width: '200px' }}
                    placeholder={`Search in ${activeCategoryName}...`}
                    value={catSearchQuery}
                    onChange={(e) => setCatSearchQuery(e.target.value)}
                  />

                  <div className="sort-dropdown-wrap">
                    <span>Sort by:</span>
                    <select
                      className="sort-select"
                      value={catSortBy}
                      onChange={(e) => setCatSortBy(e.target.value)}
                    >
                      <option value="featured">Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">New Arrivals</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Category Products Grid */}
              <div className="category-books-grid">
                {categoryPageBooks.length > 0 ? (
                  categoryPageBooks.map((book) => {
                    const isWishlisted = wishlist.includes(book.id);
                    return (
                      <article key={book.id} className="book-card-item">
                        <div className="book-cover-area">
                          {book.image ? (
                            <img
                              src={book.image}
                              alt={`${book.title} cover`}
                              className="book-cover-img"
                            />
                          ) : (
                            <div
                              className="book-jacket-cover"
                              style={{ background: book.coverGradient || currentCategoryMeta.coverGradient }}
                            >
                              <span className="book-jacket-genre">{book.category}</span>
                              <h4 className="book-jacket-title">{book.title}</h4>
                              <p className="book-jacket-author">{book.author}</p>
                            </div>
                          )}
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
                    <p>No {activeCategoryName} books match your current filter settings.</p>
                    <button
                      onClick={() => {
                        setCatPriceFilter('all');
                        setCatRatingFilter(0);
                        setCatSearchQuery('');
                      }}
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      ) : (
        /* ================= HOME VIEW ================= */
        <main>
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
                  onClick={() => navigateToCategory('Fiction')}
                >
                  View All Categories <ArrowRight size={16} />
                </button>
              </div>

              <div className="categories-carousel">
                {categories.map((cat) => {
                  const IconComp = cat.icon;
                  return (
                    <div
                      key={cat.name}
                      className="category-card"
                      onClick={() => navigateToCategory(cat.name)}
                      title={`Open ${cat.name} Books Page`}
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
                <h2 className="section-title">Bestsellers</h2>

                <div className="bestsellers-header-right">
                  <div className="filter-pills-group">
                    {['Bestsellers', 'New Arrivals', 'Coming Soon'].map((tab) => (
                      <button
                        key={tab}
                        className={`filter-pill ${homeTab === tab ? 'active' : ''}`}
                        onClick={() => setHomeTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <button
                    className="section-view-all-link"
                    onClick={() => navigateToCategory('Self-Help')}
                  >
                    View All <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Book Cards Grid */}
              <div className="books-grid">
                {homeBestsellerBooks.length > 0 ? (
                  homeBestsellerBooks.map((book) => {
                    return (
                      <article key={book.id} className="book-card-item">
                        <div className="book-cover-area">
                          {book.image ? (
                            <img
                              src={book.image}
                              alt={`${book.title} cover`}
                              className="book-cover-img"
                            />
                          ) : (
                            <div
                              className="book-jacket-cover"
                              style={{ background: book.coverGradient || 'linear-gradient(145deg, #4f46e5, #3730a3)' }}
                            >
                              <span className="book-jacket-genre">{book.category}</span>
                              <h4 className="book-jacket-title">{book.title}</h4>
                              <p className="book-jacket-author">{book.author}</p>
                            </div>
                          )}
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
                    <p>No books found for this tab.</p>
                    <button onClick={() => setHomeTab('Bestsellers')}>
                      Reset to Bestsellers
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="site-footer">
        <div className="container footer-content">
          <div className="brand-wrapper" onClick={navigateToHome} style={{ cursor: 'pointer' }}>
            <div className="brand-icon-box" style={{ width: '32px', height: '32px' }}>
              <BookOpen size={18} />
            </div>
            <span className="brand-title" style={{ fontSize: '16px' }}>
              BookVerse
            </span>
          </div>

          <p>© {new Date().getFullYear()} BookVerse Online Book Store. All rights reserved.</p>

          <div className="footer-links">
            <button type="button" onClick={navigateToHome}>Home</button>
            <button type="button" onClick={() => navigateToCategory('Fiction')}>Fiction</button>
            <button type="button" onClick={() => navigateToCategory('Business & Finance')}>Business</button>
            <button type="button" onClick={() => navigateToCategory('Technology')}>Technology</button>
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
                allBooksCatalog
                  .filter((b) => cart[b.id])
                  .map((book) => {
                    const qty = cart[book.id];
                    return (
                      <div key={book.id} className="cart-item-row">
                        {book.image ? (
                          <img
                            src={book.image}
                            alt={book.title}
                            className="cart-item-thumb"
                          />
                        ) : (
                          <div
                            className="cart-item-thumb"
                            style={{
                              background: book.coverGradient || '#4f46e5',
                              color: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '9px',
                              fontWeight: 'bold',
                              textAlign: 'center',
                              padding: '2px',
                            }}
                          >
                            {book.title.slice(0, 10)}...
                          </div>
                        )}
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
                  onClick={openCheckout}
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= COMPLETE CHECKOUT & ORDER PROCESS MODAL ================= */}
      {isCheckoutOpen && (
        <div className="checkout-backdrop" onClick={() => checkoutStep === 4 ? setIsCheckoutOpen(false) : null}>
          <div className="checkout-card" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="checkout-header">
              <div className="checkout-header-title">
                {checkoutStep === 4 ? (
                  <>
                    <CheckCircle2 size={24} color="#10b981" />
                    <span>Order Confirmed</span>
                  </>
                ) : (
                  <>
                    <Package size={24} color="var(--primary)" />
                    <span>Checkout & Order</span>
                  </>
                )}
              </div>
              <button
                className="close-btn"
                onClick={() => setIsCheckoutOpen(false)}
                aria-label="Close checkout"
              >
                <X size={20} />
              </button>
            </div>

            {/* Stepper (Steps 1, 2, 3) */}
            {checkoutStep < 4 && (
              <div className="checkout-stepper-bar">
                <div className={`step-indicator ${checkoutStep === 1 ? 'active' : checkoutStep > 1 ? 'completed' : ''}`}>
                  <div className="step-circle">
                    {checkoutStep > 1 ? <Check size={14} strokeWidth={3} /> : '1'}
                  </div>
                  <span>Delivery Address</span>
                </div>

                <div className={`step-divider ${checkoutStep >= 2 ? 'active' : ''}`} />

                <div className={`step-indicator ${checkoutStep === 2 ? 'active' : checkoutStep > 2 ? 'completed' : ''}`}>
                  <div className="step-circle">
                    {checkoutStep > 2 ? <Check size={14} strokeWidth={3} /> : '2'}
                  </div>
                  <span>Shipping & Payment</span>
                </div>

                <div className={`step-divider ${checkoutStep >= 3 ? 'active' : ''}`} />

                <div className={`step-indicator ${checkoutStep === 3 ? 'active' : ''}`}>
                  <div className="step-circle">3</div>
                  <span>Review & Order</span>
                </div>
              </div>
            )}

            {/* Modal Body */}
            <div className="checkout-body">
              {/* STEP 1: DELIVERY ADDRESS */}
              {checkoutStep === 1 && (
                <div className="checkout-two-columns">
                  <div className="checkout-form-col">
                    <h3 className="checkout-section-subhead">Customer & Delivery Information</h3>
                    <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>
                      Please provide your accurate delivery address across Bangladesh.
                    </p>

                    <div className="checkout-input-row">
                      <div className="checkout-field">
                        <label className="checkout-label">Full Name *</label>
                        <input
                          type="text"
                          className="checkout-input"
                          placeholder="Your full name"
                          value={shippingName}
                          onChange={(e) => setShippingName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="checkout-field">
                        <label className="checkout-label">Phone Number *</label>
                        <input
                          type="tel"
                          className="checkout-input"
                          placeholder="+880 1712-000000"
                          value={shippingPhone}
                          onChange={(e) => setShippingPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="checkout-input-row">
                      <div className="checkout-field">
                        <label className="checkout-label">Email Address *</label>
                        <input
                          type="email"
                          className="checkout-input"
                          placeholder="name@example.com"
                          value={shippingEmail}
                          onChange={(e) => setShippingEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="checkout-field">
                        <label className="checkout-label">City / District *</label>
                        <select
                          className="checkout-input"
                          value={shippingDistrict}
                          onChange={(e) => setShippingDistrict(e.target.value)}
                        >
                          <option value="Dhaka">Dhaka</option>
                          <option value="Chattogram">Chattogram</option>
                          <option value="Sylhet">Sylhet</option>
                          <option value="Rajshahi">Rajshahi</option>
                          <option value="Khulna">Khulna</option>
                          <option value="Barishal">Barishal</option>
                          <option value="Rangpur">Rangpur</option>
                          <option value="Mymensingh">Mymensingh</option>
                          <option value="Cumilla">Cumilla</option>
                          <option value="Gazipur">Gazipur</option>
                          <option value="Narayanganj">Narayanganj</option>
                        </select>
                      </div>
                    </div>

                    <div className="checkout-field">
                      <label className="checkout-label">Street Address, House / Flat No. *</label>
                      <input
                        type="text"
                        className="checkout-input"
                        placeholder="House no., Road no., Area / Sector"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        required
                      />
                    </div>

                    <div className="checkout-field">
                      <label className="checkout-label">Delivery Notes (Optional)</label>
                      <input
                        type="text"
                        className="checkout-input"
                        placeholder="e.g. Call before delivery, leave with security"
                        value={shippingNote}
                        onChange={(e) => setShippingNote(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="checkout-summary-card">
                    <h4 className="summary-card-title">Order Items ({cartTotalCount})</h4>
                    <div className="summary-items-scroll">
                      {allBooksCatalog.filter(b => cart[b.id]).map(b => (
                        <div key={b.id} className="summary-item-row">
                          <img
                            src={b.image || '/books/atomic.jpg'}
                            alt={b.title}
                            className="summary-item-img"
                          />
                          <div className="summary-item-info">
                            <p className="summary-item-name">{b.title}</p>
                            <p className="summary-item-sub">Qty: {cart[b.id]} × ৳{b.price}</p>
                          </div>
                          <strong>৳{b.price * cart[b.id]}</strong>
                        </div>
                      ))}
                    </div>

                    <div className="checkout-totals-block">
                      <div className="totals-row">
                        <span>Items Subtotal:</span>
                        <span>৳ {cartSubtotal}</span>
                      </div>
                      <div className="totals-row">
                        <span>Estimated Delivery:</span>
                        <span>{deliveryFee === 0 ? 'FREE' : `৳ ${deliveryFee}`}</span>
                      </div>
                      <div className="totals-row grand-total">
                        <span>Estimated Total:</span>
                        <strong>৳ {grandTotal}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: SHIPPING SPEED & PAYMENT METHOD */}
              {checkoutStep === 2 && (
                <div className="checkout-two-columns">
                  <div className="checkout-form-col">
                    <h3 className="checkout-section-subhead">Choose Delivery Speed</h3>
                    <div className="selection-card-group">
                      <div
                        className={`selection-option-card ${deliveryMethod === 'standard' ? 'active' : ''}`}
                        onClick={() => setDeliveryMethod('standard')}
                      >
                        <div className="selection-option-left">
                          <div className="selection-icon-box">
                            <Truck size={18} />
                          </div>
                          <div>
                            <div className="selection-title">Standard Courier Delivery</div>
                            <div className="selection-desc">Delivery in 2 to 3 business days across Bangladesh</div>
                          </div>
                        </div>
                        <div className="selection-price">
                          {cartSubtotal >= 1000 ? <span style={{ color: '#059669' }}>FREE</span> : '৳ 60'}
                        </div>
                      </div>

                      <div
                        className={`selection-option-card ${deliveryMethod === 'express' ? 'active' : ''}`}
                        onClick={() => setDeliveryMethod('express')}
                      >
                        <div className="selection-option-left">
                          <div className="selection-icon-box">
                            <Clock size={18} />
                          </div>
                          <div>
                            <div className="selection-title">Express Next-Day Delivery</div>
                            <div className="selection-desc">Guaranteed priority delivery within 24 hours</div>
                          </div>
                        </div>
                        <div className="selection-price">৳ 120</div>
                      </div>
                    </div>

                    <h3 className="checkout-section-subhead" style={{ marginTop: '14px' }}>Select Payment Method</h3>
                    <div className="selection-card-group">
                      <div
                        className={`selection-option-card ${paymentMethod === 'cod' ? 'active' : ''}`}
                        onClick={() => setPaymentMethod('cod')}
                      >
                        <div className="selection-option-left">
                          <div className="selection-icon-box">
                            <Receipt size={18} />
                          </div>
                          <div>
                            <div className="selection-title">Cash on Delivery (COD)</div>
                            <div className="selection-desc">Pay cash when you receive and inspect your parcel</div>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                        />
                      </div>

                      <div
                        className={`selection-option-card ${paymentMethod === 'bkash' ? 'active' : ''}`}
                        onClick={() => setPaymentMethod('bkash')}
                      >
                        <div className="selection-option-left">
                          <div className="selection-icon-box" style={{ color: '#e11d48' }}>
                            <Phone size={18} />
                          </div>
                          <div>
                            <div className="selection-title">bKash / Nagad / Upay (MFS)</div>
                            <div className="selection-desc">Instant mobile wallet payment</div>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'bkash'}
                          onChange={() => setPaymentMethod('bkash')}
                        />
                      </div>

                      {paymentMethod === 'bkash' && (
                        <div style={{ background: '#fef2f2', padding: '14px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <p style={{ fontSize: '12px', color: '#991b1b', fontWeight: 600 }}>
                            Send Money / Payment to Merchant Number: <strong>01700-123456</strong>
                          </p>
                          <div className="checkout-input-row">
                            <input
                              type="tel"
                              className="checkout-input"
                              placeholder="Your bKash / Nagad Wallet No."
                              value={bkashNumber}
                              onChange={(e) => setBkashNumber(e.target.value)}
                            />
                            <input
                              type="text"
                              className="checkout-input"
                              placeholder="TrxID (e.g. 9J4K2L8)"
                              value={bkashTrxId}
                              onChange={(e) => setBkashTrxId(e.target.value)}
                            />
                          </div>
                        </div>
                      )}

                      <div
                        className={`selection-option-card ${paymentMethod === 'card' ? 'active' : ''}`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <div className="selection-option-left">
                          <div className="selection-icon-box">
                            <CreditCard size={18} />
                          </div>
                          <div>
                            <div className="selection-title">Credit or Debit Card</div>
                            <div className="selection-desc">Visa, Mastercard, American Express</div>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                        />
                      </div>

                      {paymentMethod === 'card' && (
                        <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid #e2e8f0' }}>
                          <input
                            type="text"
                            className="checkout-input"
                            placeholder="Card Number (e.g. 4242 4242 4242 4242)"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                          <div className="checkout-input-row">
                            <input
                              type="text"
                              className="checkout-input"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                            />
                            <input
                              type="text"
                              className="checkout-input"
                              placeholder="CVC"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="checkout-summary-card">
                    <h4 className="summary-card-title">Delivery Summary</h4>
                    <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px', color: '#475569' }}>
                      <p><strong>Deliver to:</strong> {shippingName}</p>
                      <p><strong>Phone:</strong> {shippingPhone}</p>
                      <p><strong>Address:</strong> {shippingAddress}, {shippingDistrict}</p>
                    </div>

                    <div className="checkout-totals-block">
                      <div className="totals-row">
                        <span>Items Total:</span>
                        <span>৳ {cartSubtotal}</span>
                      </div>
                      <div className="totals-row">
                        <span>Shipping ({deliveryMethod}):</span>
                        <span>{deliveryFee === 0 ? 'FREE' : `৳ ${deliveryFee}`}</span>
                      </div>
                      <div className="totals-row grand-total">
                        <span>Payable Amount:</span>
                        <strong>৳ {grandTotal}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: REVIEW & PLACE ORDER */}
              {checkoutStep === 3 && (
                <div className="checkout-two-columns">
                  <div className="checkout-form-col">
                    <h3 className="checkout-section-subhead">Review Your Order Items</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '240px', overflowY: 'auto' }}>
                      {allBooksCatalog.filter(b => cart[b.id]).map(b => (
                        <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #eaecf0' }}>
                          <img
                            src={b.image || '/books/atomic.jpg'}
                            alt={b.title}
                            style={{ width: '40px', height: '56px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e293b' }}>{b.title}</div>
                            <div style={{ fontSize: '11.5px', color: '#64748b' }}>by {b.author}</div>
                            <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>৳ {b.price} × {cart[b.id]}</div>
                          </div>
                          <strong style={{ fontSize: '14px', color: '#1e293b' }}>৳ {b.price * cart[b.id]}</strong>
                        </div>
                      ))}
                    </div>

                    {/* Destination & Payment details badge */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' }}>
                      <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #eaecf0', fontSize: '12px' }}>
                        <span style={{ fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <MapPin size={14} color="var(--primary)" /> Delivery Address
                        </span>
                        <p style={{ marginTop: '4px', color: '#475569' }}>
                          {shippingName}<br />
                          {shippingAddress}, {shippingDistrict}<br />
                          {shippingPhone}
                        </p>
                      </div>

                      <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #eaecf0', fontSize: '12px' }}>
                        <span style={{ fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CreditCard size={14} color="var(--primary)" /> Payment & Speed
                        </span>
                        <p style={{ marginTop: '4px', color: '#475569' }}>
                          Method: <strong>{paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod === 'bkash' ? 'bKash Wallet' : 'Card'}</strong><br />
                          Speed: <strong>{deliveryMethod === 'express' ? 'Express Next-Day' : 'Standard (2-3 Days)'}</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Summary & Promo Box */}
                  <div className="checkout-summary-card">
                    <h4 className="summary-card-title">Order Total</h4>

                    {/* Promo Code Input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Have a Coupon Code?</label>
                      <div className="promo-code-box">
                        <input
                          type="text"
                          className="promo-input"
                          placeholder="e.g. BOOKVERSE10"
                          value={promoCodeInput}
                          onChange={(e) => setPromoCodeInput(e.target.value)}
                        />
                        <button type="button" className="promo-btn" onClick={handleApplyPromo}>
                          Apply
                        </button>
                      </div>
                      <span style={{ fontSize: '10.5px', color: '#64748b' }}>
                        Use <strong>BOOKVERSE10</strong> for 10% discount!
                      </span>
                    </div>

                    <div className="checkout-totals-block">
                      <div className="totals-row">
                        <span>Items Subtotal:</span>
                        <span>৳ {cartSubtotal}</span>
                      </div>
                      <div className="totals-row">
                        <span>Delivery Fee:</span>
                        <span>{deliveryFee === 0 ? <strong style={{ color: '#059669' }}>FREE</strong> : `৳ ${deliveryFee}`}</span>
                      </div>
                      {appliedPromo && (
                        <div className="totals-row" style={{ color: '#059669', fontWeight: 600 }}>
                          <span>Promo Discount ({appliedPromo.code}):</span>
                          <span>-৳ {discountAmount}</span>
                        </div>
                      )}
                      <div className="totals-row grand-total">
                        <span>Total Payable:</span>
                        <strong>৳ {grandTotal}</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#64748b', background: '#ffffff', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <ShieldCheck size={16} color="#059669" />
                      <span>256-Bit SSL Encrypted & 100% Protected</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: ORDER CONFIRMED CELEBRATION */}
              {checkoutStep === 4 && latestOrder && (
                <div className="order-success-container">
                  <div className="success-badge-icon">
                    <CheckCircle2 size={44} strokeWidth={2.4} />
                  </div>
                  <h2 className="order-success-title">Order Confirmed!</h2>
                  <p className="order-success-subtitle">
                    Thank you, <strong>{latestOrder.shipping.name}</strong>! Your order has been placed successfully and is now being processed.
                  </p>

                  <div className="order-id-pill">
                    <Package size={15} color="var(--primary)" />
                    <span>Order Reference ID: <strong>{latestOrder.id}</strong></span>
                  </div>

                  {/* 4-Stage Delivery Tracking Progress Bar */}
                  <div className="order-tracker-timeline">
                    <div className="tracker-step-item done">
                      <div className="tracker-node">✓</div>
                      <span className="tracker-label">Order Placed</span>
                      <span className="tracker-time">Just now</span>
                    </div>

                    <div className="tracker-step-item current">
                      <div className="tracker-node">2</div>
                      <span className="tracker-label">Processing</span>
                      <span className="tracker-time">In Progress</span>
                    </div>

                    <div className="tracker-step-item">
                      <div className="tracker-node">3</div>
                      <span className="tracker-label">Out for Delivery</span>
                      <span className="tracker-time">Scheduled</span>
                    </div>

                    <div className="tracker-step-item">
                      <div className="tracker-node">4</div>
                      <span className="tracker-label">Delivered</span>
                      <span className="tracker-time">{latestOrder.estimatedDelivery}</span>
                    </div>
                  </div>

                  {/* Receipt Details Box */}
                  <div className="receipt-details-box">
                    <div className="receipt-grid">
                      <div>
                        <div className="receipt-label">Customer Contact</div>
                        <div className="receipt-val">{latestOrder.shipping.name}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{latestOrder.shipping.phone}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{latestOrder.shipping.email}</div>
                      </div>

                      <div>
                        <div className="receipt-label">Delivery Destination</div>
                        <div className="receipt-val">{latestOrder.shipping.address}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{latestOrder.shipping.district}, Bangladesh</div>
                      </div>

                      <div>
                        <div className="receipt-label">Payment Method</div>
                        <div className="receipt-val">{latestOrder.paymentMethod}</div>
                        <div style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>{latestOrder.paymentStatus}</div>
                      </div>

                      <div>
                        <div className="receipt-label">Estimated Delivery</div>
                        <div className="receipt-val">{latestOrder.estimatedDelivery}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{latestOrder.deliverySpeed}</div>
                      </div>
                    </div>

                    {/* Items table */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div className="receipt-label">Purchased Books ({latestOrder.items.length})</div>
                      {latestOrder.items.map((item) => (
                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
                          <span>{item.title} <strong style={{ color: '#64748b' }}>× {item.quantity}</strong></span>
                          <strong>৳ {item.totalPrice}</strong>
                        </div>
                      ))}
                    </div>

                    <div style={{ borderTop: '1px dashed #cbd5e1', marginTop: '14px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '15px', color: '#1e293b' }}>Grand Total Paid / Due:</strong>
                      <strong style={{ fontSize: '19px', color: 'var(--primary)' }}>৳ {latestOrder.grandTotal}</strong>
                    </div>
                  </div>

                  {/* Success Actions */}
                  <div className="success-actions-row">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => window.print()}
                    >
                      <Printer size={16} /> Print Receipt
                    </button>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => setIsCheckoutOpen(false)}
                    >
                      Continue Shopping <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions (Steps 1 to 3) */}
            {checkoutStep < 4 && (
              <div className="checkout-footer">
                <div>
                  {checkoutStep > 1 ? (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setCheckoutStep((prev) => prev - 1)}
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setIsCheckoutOpen(false)}
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Payable Total</div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>
                      ৳ {grandTotal}
                    </div>
                  </div>

                  {checkoutStep === 1 && (
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => {
                        if (!shippingName.trim() || !shippingPhone.trim() || !shippingAddress.trim()) {
                          showToast('Please fill in Name, Phone, and Address.');
                          return;
                        }
                        setCheckoutStep(2);
                      }}
                    >
                      Continue to Payment <ArrowRight size={16} />
                    </button>
                  )}

                  {checkoutStep === 2 && (
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => setCheckoutStep(3)}
                    >
                      Review Order <ArrowRight size={16} />
                    </button>
                  )}

                  {checkoutStep === 3 && (
                    <button
                      type="button"
                      className="btn-primary"
                      style={{ background: '#059669', boxShadow: '0 4px 14px rgba(5, 150, 105, 0.35)' }}
                      onClick={handlePlaceOrder}
                    >
                      Confirm & Place Order (৳ {grandTotal}) <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= AUTHENTICATION MODAL (SIGN IN & SIGN UP) ================= */}
      {isAuthOpen && (
        <div className="auth-backdrop" onClick={() => setIsAuthOpen(false)}>
          <div
            className="auth-window-wrapper"
            style={{ maxWidth: authMode === 'both' ? '1080px' : '620px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Window Top Controls */}
            <div className="auth-window-header">
              <div className="auth-tab-switch">
                <button
                  className={`auth-tab-btn ${authMode === 'signin' ? 'active' : ''}`}
                  onClick={() => setAuthMode('signin')}
                >
                  Sign In
                </button>
                <button
                  className={`auth-tab-btn ${authMode === 'signup' ? 'active' : ''}`}
                  onClick={() => setAuthMode('signup')}
                >
                  Sign Up
                </button>
                <button
                  className={`auth-tab-btn ${authMode === 'both' ? 'active' : ''}`}
                  onClick={() => setAuthMode('both')}
                  title="View both cards side by side"
                >
                  Side by Side
                </button>
              </div>

              <button
                className="auth-close-btn"
                onClick={() => setIsAuthOpen(false)}
                aria-label="Close authentication modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Visual plant ornament sitting on stack of books */}
            <img
              src="/auth-books-plant.png"
              alt="Books and Plant"
              className="auth-plant-ornament"
            />

            {/* Container for Cards */}
            <div
              className={`auth-cards-container ${
                authMode === 'both' ? '' : 'single-mode'
              }`}
            >
              {/* ===== SIGN IN CARD ===== */}
              {(authMode === 'signin' || authMode === 'both') && (
                <div className="auth-card">
                  <div className="auth-card-brand">
                    <img
                      src="/auth-logo.png"
                      alt="BookVerse"
                      className="auth-card-logo-img"
                    />
                  </div>

                  <h2 className="auth-card-heading">Sign In</h2>
                  <p className="auth-card-subheading">
                    Welcome back! Please sign in to your account.
                  </p>

                  <form className="auth-form" onSubmit={handleSignInSubmit}>
                    {/* Email address */}
                    <div className="input-field-group">
                      <span className="input-icon-left">
                        <Mail size={18} />
                      </span>
                      <input
                        type="email"
                        className="auth-text-input"
                        placeholder="Email address"
                        required
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                      />
                    </div>

                    {/* Password */}
                    <div className="input-field-group">
                      <span className="input-icon-left">
                        <Lock size={18} />
                      </span>
                      <input
                        type={showSignInPassword ? 'text' : 'password'}
                        className="auth-text-input"
                        placeholder="Password"
                        required
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="input-toggle-right"
                        onClick={() => setShowSignInPassword(!showSignInPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showSignInPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Remember me & Forgot password */}
                    <div className="auth-options-row">
                      <label className="auth-checkbox-label">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span>Remember me</span>
                      </label>
                      <a
                        href="#forgot"
                        className="auth-link"
                        onClick={(e) => {
                          e.preventDefault();
                          showToast('Password reset link has been sent to your email.');
                        }}
                      >
                        Forgot password?
                      </a>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="auth-submit-btn">
                      Sign In
                    </button>
                  </form>

                  {/* Or continue with */}
                  <div className="auth-divider-wrap">
                    <span className="auth-divider-text">Or continue with</span>
                  </div>

                  {/* Social Buttons */}
                  <div className="auth-social-row">
                    <button
                      type="button"
                      className="social-auth-btn"
                      onClick={() => handleSocialAuth('Google')}
                    >
                      <GoogleIcon />
                      <span>Continue with Google</span>
                    </button>
                    <button
                      type="button"
                      className="social-auth-btn"
                      onClick={() => handleSocialAuth('Apple')}
                    >
                      <AppleIcon />
                      <span>Continue with Apple</span>
                    </button>
                  </div>

                  {/* Switch to Sign Up */}
                  <p className="auth-switch-text">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              )}

              {/* ===== SIGN UP CARD ===== */}
              {(authMode === 'signup' || authMode === 'both') && (
                <div className="auth-card">
                  <div className="auth-card-brand">
                    <img
                      src="/auth-logo.png"
                      alt="BookVerse"
                      className="auth-card-logo-img"
                    />
                  </div>

                  <h2 className="auth-card-heading">Sign Up</h2>
                  <p className="auth-card-subheading">
                    Create your BookVerse account and start exploring.
                  </p>

                  <form className="auth-form" onSubmit={handleSignUpSubmit}>
                    {/* Full Name */}
                    <div className="input-field-group">
                      <span className="input-icon-left">
                        <User size={18} />
                      </span>
                      <input
                        type="text"
                        className="auth-text-input"
                        placeholder="Full name"
                        required
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                      />
                    </div>

                    {/* Email Address */}
                    <div className="input-field-group">
                      <span className="input-icon-left">
                        <Mail size={18} />
                      </span>
                      <input
                        type="email"
                        className="auth-text-input"
                        placeholder="Email address"
                        required
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                      />
                    </div>

                    {/* Password */}
                    <div className="input-field-group">
                      <span className="input-icon-left">
                        <Lock size={18} />
                      </span>
                      <input
                        type={showSignUpPassword ? 'text' : 'password'}
                        className="auth-text-input"
                        placeholder="Password"
                        required
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="input-toggle-right"
                        onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showSignUpPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="input-field-group">
                      <span className="input-icon-left">
                        <Lock size={18} />
                      </span>
                      <input
                        type={showSignUpConfirm ? 'text' : 'password'}
                        className="auth-text-input"
                        placeholder="Confirm password"
                        required
                        value={signUpConfirmPassword}
                        onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="input-toggle-right"
                        onClick={() => setShowSignUpConfirm(!showSignUpConfirm)}
                        aria-label="Toggle password visibility"
                      >
                        {showSignUpConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Agree Terms Checkbox */}
                    <div className="auth-options-row">
                      <label className="auth-checkbox-label">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                        />
                        <span className="auth-terms-label">
                          I agree to the{' '}
                          <a
                            href="#terms"
                            className="auth-link"
                            onClick={(e) => {
                              e.preventDefault();
                              showToast('BookVerse Terms of Service: Standard user agreement.');
                            }}
                          >
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a
                            href="#privacy"
                            className="auth-link"
                            onClick={(e) => {
                              e.preventDefault();
                              showToast('BookVerse Privacy Policy: Your data is secure.');
                            }}
                          >
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="auth-submit-btn">
                      Sign Up
                    </button>
                  </form>

                  {/* Or continue with */}
                  <div className="auth-divider-wrap">
                    <span className="auth-divider-text">Or continue with</span>
                  </div>

                  {/* Social Buttons */}
                  <div className="auth-social-row">
                    <button
                      type="button"
                      className="social-auth-btn"
                      onClick={() => handleSocialAuth('Google')}
                    >
                      <GoogleIcon />
                      <span>Continue with Google</span>
                    </button>
                    <button
                      type="button"
                      className="social-auth-btn"
                      onClick={() => handleSocialAuth('Apple')}
                    >
                      <AppleIcon />
                      <span>Continue with Apple</span>
                    </button>
                  </div>

                  {/* Switch to Sign In */}
                  <p className="auth-switch-text">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
