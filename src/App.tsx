import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  ExternalLink, 
  Compass, 
  Layers, 
  Building2, 
  Search, 
  CheckCircle2, 
  ArrowUpRight, 
  Menu, 
  X, 
  ShieldCheck, 
  Clock, 
  HelpCircle,
  FileText,
  Smartphone,
  Navigation,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react';

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Dhaara+Estate+Maninagar/data=!4m7!3m6!1s0x395e8533ecac9a07:0x384439d375539484!8m2!3d22.9979092!4d72.6080284!16s%2Fg%2F11hm0t89bw!19sChIJB5qs7DOFXjkRhJRTddM5RDg?authuser=0&hl=en";
const PHONE_NUMBER = "+91 93282 00172";
const PHONE_TEL = "tel:+919328200172";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('services');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const restoreMenuFocusRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  // Concept requirement builder state for interactive exploration (clearly non-fake)
  const [selectedJourney, setSelectedJourney] = useState<'buying' | 'selling' | 'renting'>('buying');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('Residential Apartment');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        restoreMenuFocusRef.current = true;
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    window.requestAnimationFrame(() => firstMenuLinkRef.current?.focus());
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen || !restoreMenuFocusRef.current) return;

    restoreMenuFocusRef.current = false;
    menuButtonRef.current?.focus();
  }, [mobileMenuOpen]);

  useEffect(() => {
    const sections = ['services', 'why-dhaara', 'local-presence', 'contact']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) setActiveSection(visibleSection.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const navItemClass = (section: string) => `relative text-sm font-medium px-1 rounded-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51] after:absolute after:-bottom-2 after:left-1 after:right-1 after:h-px after:bg-[#C86D51] after:origin-left after:transition-transform after:duration-200 ${
    activeSection === section
      ? 'text-[#18181B] after:scale-x-100'
      : 'text-[#4A4F4B] hover:text-[#18181B] after:scale-x-0 hover:after:scale-x-100'
  }`;
  const reveal = (delay = 0, distance = 20) =>
    prefersReducedMotion
      ? { initial: false }
      : {
          initial: { opacity: 0, y: distance },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as const },
        };
  const cardCornerReveal = (delay = 0) =>
    prefersReducedMotion
      ? { initial: false }
      : {
          initial: { opacity: 0, scaleX: 0 },
          whileInView: { opacity: 1, scaleX: 1 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F2421] selection:bg-[#EAD9C9] selection:text-[#18181B] font-sans">
      {/* Top verified advisory banner */}
      <motion.aside
        aria-label="Website Demo Notice"
        className="bg-[#18181B] text-[#D4B996] text-xs px-4 py-2 border-b border-[#2C302E]"
        initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2 h-2 rounded-full bg-[#C86D51] ${prefersReducedMotion ? '' : 'animate-pulse'}`}></span>
            <span className="font-medium text-[#FAF8F5]">Website Concept:</span>
            <span className="text-[#A1A1AA]">Prepared for Dhaara Estate Maninagar by SiteNerve</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#D4B996]">
            <span>Public Listing Reference</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Maninagar, Ahmedabad</span>
            <a 
              href={PHONE_TEL}
              className="font-semibold text-[#FAF8F5] hover:text-[#D4B996] transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#C86D51]" /> {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </motion.aside>

      {/* 1. Navigation */}
      <motion.header
        className={`sticky top-0 z-50 relative transition-all duration-300 ${
          scrolled 
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-b border-[#E8E2D9]' 
            : 'bg-[#FAF8F5] border-b border-[#EFE9DF]'
        }`}
        initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand */}
            <a 
              href="#" 
              className="flex items-center gap-3 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51] rounded-sm p-1"
              aria-label="Dhaara Estate Maninagar Home"
            >
              <div className="w-10 h-10 rounded-md bg-[#1B2430] flex items-center justify-center border border-[#C86D51]/30 group-hover:border-[#C86D51] transition-colors">
                {/* Architectural Blueprint Mark */}
                <svg className="w-6 h-6 text-[#C86D51]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M3 21V8L12 3L21 8V21H15V14H9V21H3Z" />
                  <circle cx="12" cy="9" r="1.5" fill="#D4B996" stroke="none" />
                </svg>
              </div>
              <div>
                <span className="font-editorial text-xl font-semibold tracking-wider text-[#18181B] block leading-tight">
                  DHAARA ESTATE
                </span>
                <span className="text-xs uppercase tracking-widest text-[#8A7B6B] block">
                  Maninagar • Ahmedabad
                </span>
              </div>
            </a>

            {/* Desktop Navigation Items */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
              <a 
                href="#services" 
                className={navItemClass('services')}
                aria-current={activeSection === 'services' ? 'page' : undefined}
              >
                Services
              </a>
              <a 
                href="#why-dhaara" 
                className={navItemClass('why-dhaara')}
                aria-current={activeSection === 'why-dhaara' ? 'page' : undefined}
              >
                Why Dhaara
              </a>
              <a 
                href="#local-presence" 
                className={navItemClass('local-presence')}
                aria-current={activeSection === 'local-presence' ? 'page' : undefined}
              >
                Local Presence
              </a>
              <a 
                href="#contact" 
                className={navItemClass('contact')}
                aria-current={activeSection === 'contact' ? 'page' : undefined}
              >
                Contact
              </a>
            </nav>

            {/* Header Right Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#4A4F4B] bg-[#EFE9DF] hover:bg-[#E5DDD0] rounded-md border border-[#D8CEBF] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>Google Maps</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1B2430] hover:bg-[#2C3849] rounded-md shadow-xs border border-[#1B2430] hover:border-[#C86D51] transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51]"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4B996]" />
                <span>{PHONE_NUMBER}</span>
              </a>
            </div>

            {/* Mobile Menu & Call Buttons */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href={PHONE_TEL}
                className="inline-flex items-center justify-center w-11 h-11 rounded-md bg-[#1B2430] text-white shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51]"
                aria-label="Call Dhaara Estate"
              >
                <Phone className="w-4 h-4 text-[#D4B996]" />
              </a>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="inline-flex items-center justify-center w-11 h-11 rounded-md border border-[#D8CEBF] bg-[#FAF8F5] text-[#18181B] hover:bg-[#EFE9DF] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51]"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Close navigation menu"
                className="fixed inset-0 top-20 z-40 bg-[#18181B]/15 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeMobileMenu}
              />
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full inset-x-0 z-50 md:hidden border-b border-[#E8E2D9] bg-[#FAF8F5] px-4 pt-3 pb-6 shadow-lg"
              >
              <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
                <a
                  ref={firstMenuLinkRef}
                  href="#services"
                  onClick={closeMobileMenu}
                  className="px-3 py-2 text-base font-medium text-[#18181B] hover:bg-[#EFE9DF] rounded-md transition-colors"
                >
                  Services
                </a>
                <a
                  href="#why-dhaara"
                  onClick={closeMobileMenu}
                  className="px-3 py-2 text-base font-medium text-[#18181B] hover:bg-[#EFE9DF] rounded-md transition-colors"
                >
                  Why Dhaara
                </a>
                <a
                  href="#local-presence"
                  onClick={closeMobileMenu}
                  className="px-3 py-2 text-base font-medium text-[#18181B] hover:bg-[#EFE9DF] rounded-md transition-colors"
                >
                  Local Presence
                </a>
                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="px-3 py-2 text-base font-medium text-[#18181B] hover:bg-[#EFE9DF] rounded-md transition-colors"
                >
                  Contact
                </a>
                <div className="pt-3 border-t border-[#E8E2D9] flex flex-col gap-2">
                  <a
                    href={PHONE_TEL}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#1B2430] text-white rounded-md text-sm font-semibold shadow-xs"
                  >
                    <Phone className="w-4 h-4 text-[#D4B996]" />
                    Call Dhaara Estate: {PHONE_NUMBER}
                  </a>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#EFE9DF] text-[#18181B] rounded-md text-sm font-medium border border-[#D8CEBF]"
                  >
                    <MapPin className="w-4 h-4 text-[#C86D51]" />
                    Open Google Maps Listing
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </div>
              </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      <main id="main-content">
        {/* 2. Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#E8E2D9] bg-[#FAF8F5]">
          {/* Subtle architectural background grid */}
          <div className="absolute inset-0 bg-blueprint-fine pointer-events-none opacity-60" />
          {!prefersReducedMotion && <div aria-hidden="true" className="blueprint-scan absolute inset-y-0 -left-1/3 w-1/3 pointer-events-none" />}
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Headline and Call-to-actions */}
              <div className="lg:col-span-7 space-y-8">
                {/* Editorial Sub-badge */}
                <motion.div {...reveal(0, 12)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFE9DF] border border-[#D8CEBF] text-xs font-medium text-[#6B5E51]">
                  <span className="w-2 h-2 rounded-full bg-[#C86D51]"></span>
                  <span className="tracking-wide uppercase font-semibold">Website Concept</span>
                  <span className="text-[#A1A1AA]">•</span>
                  <span>Maninagar, Ahmedabad</span>
                </motion.div>

                <motion.div {...reveal(0.08, 18)} className="space-y-4">
                  <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#18181B] leading-[1.12]">
                    Property guidance with a clearer next step.
                  </h1>
                  <p className="text-lg sm:text-xl text-[#525753] leading-relaxed max-w-2xl">
                    A website concept for Dhaara Estate Maninagar, built around planned property enquiries and direct communication.
                  </p>
                </motion.div>

                {/* Hero Action Buttons */}
                <motion.div {...reveal(0.16, 16)} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <a
                    href={PHONE_TEL}
                    id="hero-call-button"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-md text-base font-semibold text-white bg-[#1B2430] hover:bg-[#2C3849] border border-[#1B2430] hover:border-[#C86D51] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51]"
                  >
                    <Phone className="w-5 h-5 text-[#D4B996]" />
                    <span>Call Dhaara Estate</span>
                  </a>

                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="hero-maps-button"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-md text-base font-medium text-[#18181B] bg-[#EFE9DF] hover:bg-[#E5DDD0] border border-[#D4C8B5] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51]"
                  >
                    <MapPin className="w-5 h-5 text-[#C86D51]" />
                    <span>Open Google Maps</span>
                    <ArrowUpRight className="w-4 h-4 text-[#8A7B6B]" />
                  </a>
                </motion.div>

                {/* Verified facts teaser */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8E2D9]">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-[#8A7B6B] block">Public Listing Category</span>
                    <p className="text-sm font-semibold text-[#18181B]">Real Estate Agent</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-[#8A7B6B] block">Primary Area</span>
                    <p className="text-sm font-semibold text-[#18181B]">Maninagar, Ahmedabad</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1 space-y-1">
                    <span className="text-xs uppercase tracking-wider text-[#8A7B6B] block">Direct Contact</span>
                    <p className="text-sm font-semibold text-[#18181B] font-mono">{PHONE_NUMBER}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Premium Animated Architectural Composition */}
              <motion.div {...reveal(0.2, 24)} className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none rounded-xl bg-[#F4EFE6] border border-[#D8CEBF] p-6 shadow-xl overflow-hidden">
                  {/* Blueprint Grid Lines & Coordinates */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#D8CEBF] text-[11px] font-mono text-[#8A7B6B]">
                    <span className="flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-[#C86D51]" />
                      ARCHITECTURAL SCHEMATIC
                    </span>
                    <span>22.9979° N, 72.6080° E</span>
                  </div>

                  {/* SVG Abstract Architectural & Plot Composition */}
                  <div className="relative aspect-4/3 rounded-lg bg-[#FAF8F5] border border-[#D8CEBF] p-4 flex items-center justify-center overflow-hidden">
                    <svg
                      className="w-full h-full" 
                      viewBox="0 0 400 300" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="Abstract architectural composition of property plot lines and structural geometries"
                    >
                      {/* Grid background */}
                      <defs>
                        <pattern id="archGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#C86D51" strokeWidth="0.5" strokeOpacity="0.12" />
                        </pattern>
                        <linearGradient id="plotGradient" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#C86D51" stopOpacity="0.08" />
                          <stop offset="100%" stopColor="#D4B996" stopOpacity="0.15" />
                        </linearGradient>
                      </defs>
                      <rect width="400" height="300" fill="url(#archGrid)" />

                      {/* Abstract Cadastral Plot Boundaries */}
                      <motion.path
                        d="M 40 220 L 130 140 L 260 170 L 360 100 L 350 250 L 50 250 Z" 
                        fill="url(#plotGradient)" 
                        stroke="#C86D51" 
                        strokeWidth="1.5" 
                        strokeDasharray="4 4"
                        initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
                        animate={prefersReducedMotion ? undefined : { pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.1, delay: 0.45, ease: 'easeInOut' }}
                      />

                      {/* Structural Building Elevation Lines */}
                      <g stroke="#1B2430" strokeWidth="1.75">
                        {/* Tower A outline */}
                        <rect x="70" y="80" width="70" height="140" fill="#FFFFFF" fillOpacity="0.9" />
                        <line x1="70" y1="110" x2="140" y2="110" stroke="#D8CEBF" strokeWidth="1" />
                        <line x1="70" y1="140" x2="140" y2="140" stroke="#D8CEBF" strokeWidth="1" />
                        <line x1="70" y1="170" x2="140" y2="170" stroke="#D8CEBF" strokeWidth="1" />
                        <line x1="70" y1="200" x2="140" y2="200" stroke="#D8CEBF" strokeWidth="1" />
                        
                        {/* Tower B outline with gable */}
                        <polygon points="160,220 160,110 210,60 260,110 260,220" fill="#FAF8F5" fillOpacity="0.95" />
                        <line x1="210" y1="60" x2="210" y2="220" stroke="#C86D51" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="160" y1="140" x2="260" y2="140" stroke="#D8CEBF" strokeWidth="1" />
                        <line x1="160" y1="180" x2="260" y2="180" stroke="#D8CEBF" strokeWidth="1" />

                        {/* Mid-rise Annex */}
                        <rect x="275" y="130" width="85" height="90" fill="#FFFFFF" fillOpacity="0.9" />
                        <line x1="275" y1="160" x2="360" y2="160" stroke="#D8CEBF" strokeWidth="1" />
                        <line x1="275" y1="190" x2="360" y2="190" stroke="#D8CEBF" strokeWidth="1" />
                      </g>

                      {/* Dimension lines and technical tick marks */}
                      <g stroke="#C86D51" strokeWidth="1">
                        <line x1="40" y1="270" x2="360" y2="270" />
                        <line x1="40" y1="265" x2="40" y2="275" />
                        <line x1="200" y1="265" x2="200" y2="275" />
                        <line x1="360" y1="265" x2="360" y2="275" />
                      </g>
                      <text x="200" y="285" fill="#8A7B6B" fontSize="9" fontFamily="monospace" textAnchor="middle">
                        MANINAGAR SECTOR GRID: 22°59'52" N
                      </text>

                      {/* Map Coordinate Marker Node */}
                      <circle cx="210" cy="60" r="4" fill="#C86D51" />
                      <circle cx="210" cy="60" r="10" stroke="#C86D51" strokeWidth="1" strokeOpacity="0.4" />
                    </svg>

                    {/* Floating architectural caption */}
                    <div className="absolute bottom-3 left-3 bg-[#18181B]/90 backdrop-blur-xs text-[#FAF8F5] text-[10px] px-2.5 py-1 rounded-sm font-mono border border-[#3E423F]">
                      ABSTRACT STRUCTURAL GEOMETRY
                    </div>
                  </div>

                  {/* Clarification note */}
                  <div className="mt-4 flex items-center justify-between text-[11px] text-[#6B5E51]">
                    <span className="font-mono">ID: DHAARA-ESTATE-MANINAGAR</span>
                    <span className="italic">Concept Architecture Graphic</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. Public Listing Snapshot */}
        <section className="py-16 bg-[#F4EFE6] border-b border-[#E8E2D9]" aria-labelledby="snapshot-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] text-xs font-semibold text-[#8A7B6B] border border-[#D8CEBF] uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C86D51]" />
                Public Verification
              </div>
              <h2 id="snapshot-heading" className="font-editorial text-2xl sm:text-3xl font-medium text-[#18181B]">
                Public Listing Snapshot
              </h2>
              <p className="text-xs sm:text-sm text-[#736B5E] italic">
                “Public listing information shown for this website concept.”
              </p>
            </div>

            {/* Verified Snapshot Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Business Name Card */}
              <div className="bg-[#FAF8F5] p-6 rounded-lg border border-[#D8CEBF] shadow-2xs space-y-2">
                <div className="w-8 h-8 rounded-sm bg-[#EFE9DF] flex items-center justify-center text-[#C86D51] mb-3">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-xs uppercase tracking-widest text-[#8A7B6B] font-semibold block">Business Name</span>
                <h3 className="text-lg font-bold text-[#18181B]">Dhaara Estate Maninagar</h3>
                <p className="text-xs text-[#525753]">Website concept reference</p>
              </div>

              {/* Location Card */}
              <div className="bg-[#FAF8F5] p-6 rounded-lg border border-[#D8CEBF] shadow-2xs space-y-2">
                <div className="w-8 h-8 rounded-sm bg-[#EFE9DF] flex items-center justify-center text-[#C86D51] mb-3">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs uppercase tracking-widest text-[#8A7B6B] font-semibold block">Location</span>
                <h3 className="text-lg font-bold text-[#18181B]">Maninagar, Ahmedabad</h3>
                <p className="text-xs text-[#525753]">Gujarat, India (PIN 380008 Area)</p>
              </div>

              {/* Category Card */}
              <div className="bg-[#FAF8F5] p-6 rounded-lg border border-[#D8CEBF] shadow-2xs space-y-2">
                <div className="w-8 h-8 rounded-sm bg-[#EFE9DF] flex items-center justify-center text-[#C86D51] mb-3">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-xs uppercase tracking-widest text-[#8A7B6B] font-semibold block">Public Listing Category</span>
                <h3 className="text-lg font-bold text-[#18181B]">Real Estate Agent</h3>
                <p className="text-xs text-[#525753]">Google Maps listing category</p>
              </div>

              {/* Public Phone Card */}
              <div className="bg-[#FAF8F5] p-6 rounded-lg border border-[#D8CEBF] shadow-2xs space-y-2">
                <div className="w-8 h-8 rounded-sm bg-[#EFE9DF] flex items-center justify-center text-[#C86D51] mb-3">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-xs uppercase tracking-widest text-[#8A7B6B] font-semibold block">Public Phone</span>
                <h3 className="text-lg font-bold text-[#18181B] font-mono">{PHONE_NUMBER}</h3>
                <a 
                  href={PHONE_TEL}
                  className="text-xs font-semibold text-[#C86D51] hover:underline inline-flex items-center gap-1"
                >
                  Direct Call <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Honest verification notes box */}
            <div className="mt-8 p-4 rounded-md bg-[#FAF8F5] border border-[#D8CEBF] text-xs text-[#525753] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#8A7B6B] shrink-0" />
                <span>
                  <strong>Integrity standard:</strong> No fabricated review counts, stars, property details, or unverified claims are rendered. This concept references the public phone number and Google Maps listing category only.
                </span>
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#18181B] hover:text-[#C86D51] inline-flex items-center gap-1 shrink-0 underline"
              >
                Inspect Original Google Maps Listing <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* 4. Services Section */}
        <motion.section {...reveal()} id="services" className="py-20 bg-[#FAF8F5] border-b border-[#E8E2D9]" aria-labelledby="services-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE9DF] text-xs font-semibold text-[#8A7B6B] border border-[#D8CEBF] uppercase tracking-wider">
                Service Framework
              </div>
              <h2 id="services-heading" className="font-editorial text-3xl sm:text-4xl font-medium text-[#18181B]">
                Planned enquiry journeys to confirm with Dhaara Estate
              </h2>
              <p className="text-base text-[#525753] leading-relaxed">
                These planned enquiry journeys show how visitors could outline a requirement and connect through the verified public phone. Details to be confirmed with Dhaara Estate.
              </p>
            </div>

            {/* Three Service Journey Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Property Buying Assistance */}
              <motion.div {...reveal(0)} className="relative overflow-hidden rounded-lg bg-[#FAF8F5] border border-[#D8CEBF] p-8 hover:border-[#C86D51] transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between group">
                <motion.span {...cardCornerReveal(0.1)} aria-hidden="true" className="absolute right-0 top-0 h-px w-16 origin-right bg-[#C86D51]" />
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-md bg-[#1B2430] flex items-center justify-center text-[#D4B996] group-hover:bg-[#C86D51] group-hover:text-white transition-colors">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#8A7B6B] font-mono block mb-1">Journey 01</span>
                    <h3 className="text-xl font-bold text-[#18181B]">Planned Buying Enquiry</h3>
                  </div>
                  <p className="text-sm text-[#525753] leading-relaxed">
                    A planned enquiry journey for people exploring residential, commercial, or land requirements in and around Maninagar.
                  </p>
                  
                  <div className="pt-4 border-t border-[#E8E2D9] space-y-2.5">
                    <span className="text-xs font-semibold text-[#18181B] block">What to outline in this enquiry:</span>
                    <ul className="text-xs text-[#525753] space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C86D51] mt-0.5 shrink-0" />
                        <span>Start a structured property purchase enquiry</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C86D51] mt-0.5 shrink-0" />
                        <span>Share budget, preferred floor, and locality requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C86D51] mt-0.5 shrink-0" />
                        <span>Discuss current availability directly by phone</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E8E2D9]">
                  <a
                    href={PHONE_TEL}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-sm bg-[#EFE9DF] text-[#18181B] hover:bg-[#1B2430] hover:text-white transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Inquire About Buying: {PHONE_NUMBER}
                  </a>
                </div>
              </motion.div>

              {/* Card 2: Property Selling Assistance */}
              <motion.div {...reveal(0.08)} className="relative overflow-hidden rounded-lg bg-[#FAF8F5] border border-[#D8CEBF] p-8 hover:border-[#C86D51] transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between group">
                <motion.span {...cardCornerReveal(0.18)} aria-hidden="true" className="absolute right-0 top-0 h-px w-16 origin-right bg-[#C86D51]" />
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-md bg-[#1B2430] flex items-center justify-center text-[#D4B996] group-hover:bg-[#C86D51] group-hover:text-white transition-colors">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#8A7B6B] font-mono block mb-1">Journey 02</span>
                    <h3 className="text-xl font-bold text-[#18181B]">Planned Selling Enquiry</h3>
                  </div>
                  <p className="text-sm text-[#525753] leading-relaxed">
                    A planned enquiry journey for property owners who want to share details and discuss next steps directly with Dhaara Estate.
                  </p>
                  
                  <div className="pt-4 border-t border-[#E8E2D9] space-y-2.5">
                    <span className="text-xs font-semibold text-[#18181B] block">What to outline in this enquiry:</span>
                    <ul className="text-xs text-[#525753] space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C86D51] mt-0.5 shrink-0" />
                        <span>Share property details for discussion</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C86D51] mt-0.5 shrink-0" />
                        <span>Outline locality and timing considerations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C86D51] mt-0.5 shrink-0" />
                        <span>Discuss next steps by phone</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E8E2D9]">
                  <a
                    href={PHONE_TEL}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-sm bg-[#EFE9DF] text-[#18181B] hover:bg-[#1B2430] hover:text-white transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Inquire About Selling: {PHONE_NUMBER}
                  </a>
                </div>
              </motion.div>

              {/* Card 3: Rental Enquiries */}
              <motion.div {...reveal(0.16)} className="relative overflow-hidden rounded-lg bg-[#FAF8F5] border border-[#D8CEBF] p-8 hover:border-[#C86D51] transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between group">
                <motion.span {...cardCornerReveal(0.26)} aria-hidden="true" className="absolute right-0 top-0 h-px w-16 origin-right bg-[#C86D51]" />
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-md bg-[#1B2430] flex items-center justify-center text-[#D4B996] group-hover:bg-[#C86D51] group-hover:text-white transition-colors">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#8A7B6B] font-mono block mb-1">Journey 03</span>
                    <h3 className="text-xl font-bold text-[#18181B]">Planned Rental Enquiry</h3>
                  </div>
                  <p className="text-sm text-[#525753] leading-relaxed">
                    A planned enquiry journey for people exploring rental requirements in Maninagar.
                  </p>
                  
                  <div className="pt-4 border-t border-[#E8E2D9] space-y-2.5">
                    <span className="text-xs font-semibold text-[#18181B] block">What to outline in this enquiry:</span>
                    <ul className="text-xs text-[#525753] space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C86D51] mt-0.5 shrink-0" />
                        <span>Share occupancy timelines and configuration needs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C86D51] mt-0.5 shrink-0" />
                        <span>Outline rental requirements for discussion</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C86D51] mt-0.5 shrink-0" />
                        <span>Confirm relevant details directly by phone</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E8E2D9]">
                  <a
                    href={PHONE_TEL}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-sm bg-[#EFE9DF] text-[#18181B] hover:bg-[#1B2430] hover:text-white transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Inquire About Rentals: {PHONE_NUMBER}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Note on zero fake inventory */}
            <div className="mt-10 text-center">
              <p className="text-xs text-[#8A7B6B] max-w-xl mx-auto">
                Note: No property listings, availability, prices, or photos are published in this website concept. Details are to be confirmed directly with Dhaara Estate.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 5. Why this website helps */}
        <section id="why-dhaara" className="py-20 bg-[#F4EFE6] border-b border-[#E8E2D9]" aria-labelledby="why-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] text-xs font-semibold text-[#8A7B6B] border border-[#D8CEBF] uppercase tracking-wider">
                Digital Foundation
              </div>
              <h2 id="why-heading" className="font-editorial text-3xl sm:text-4xl font-medium text-[#18181B]">
                Why this website helps
              </h2>
              <p className="text-base text-[#525753] leading-relaxed">
                Practical, factual benefits that a dedicated web presence provides for Dhaara Estate and local property clients in Maninagar.
              </p>
            </div>

            {/* 6 Practical Benefit Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Benefit 1 */}
              <div className="bg-[#FAF8F5] p-7 rounded-lg border border-[#D8CEBF] shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-md bg-[#EFE9DF] flex items-center justify-center text-[#C86D51]">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#18181B]">Clear local business identity</h3>
                <p className="text-sm text-[#525753] leading-relaxed">
                  Creates a clear online destination for this website concept, tied to Maninagar and the public listing reference.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="bg-[#FAF8F5] p-7 rounded-lg border border-[#D8CEBF] shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-md bg-[#EFE9DF] flex items-center justify-center text-[#C86D51]">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#18181B]">Direct call action</h3>
                <p className="text-sm text-[#525753] leading-relaxed">
                  Gives visitors a direct path to the public phone number {PHONE_NUMBER} from the website concept.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="bg-[#FAF8F5] p-7 rounded-lg border border-[#D8CEBF] shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-md bg-[#EFE9DF] flex items-center justify-center text-[#C86D51]">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#18181B]">Google Maps location</h3>
                <p className="text-sm text-[#525753] leading-relaxed">
                  Links to the public Google Maps business listing for location reference and navigation.
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="bg-[#FAF8F5] p-7 rounded-lg border border-[#D8CEBF] shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-md bg-[#EFE9DF] flex items-center justify-center text-[#C86D51]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#18181B]">Mobile-friendly enquiry path</h3>
                <p className="text-sm text-[#525753] leading-relaxed">
                  Engineered specifically for handheld devices so local homebuyers and property owners can initiate enquiries smoothly on their phones.
                </p>
              </div>

              {/* Benefit 5 */}
              <div className="bg-[#FAF8F5] p-7 rounded-lg border border-[#D8CEBF] shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-md bg-[#EFE9DF] flex items-center justify-center text-[#C86D51]">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#18181B]">Future-ready property catalogue</h3>
                <p className="text-sm text-[#525753] leading-relaxed">
                  An architectural framework reserved for future owner-approved property details, if Dhaara Estate chooses to publish them.
                </p>
              </div>

              {/* Benefit 6 */}
              <div className="bg-[#FAF8F5] p-7 rounded-lg border border-[#D8CEBF] shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-md bg-[#EFE9DF] flex items-center justify-center text-[#C86D51]">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#18181B]">Easy-to-update service sections</h3>
                <p className="text-sm text-[#525753] leading-relaxed">
                  A modular structure that can be updated when owner-approved services, contact details, or availability information is supplied.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Local Presence Section */}
        <motion.section {...reveal()} id="local-presence" className="py-20 bg-[#FAF8F5] border-b border-[#E8E2D9]" aria-labelledby="local-presence-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-[#1B2430] text-[#FAF8F5] p-8 sm:p-12 lg:p-16 border border-[#2C3849] relative overflow-hidden shadow-2xl">
              {/* Architectural Contour and Grid Overlay */}
              <div className="absolute inset-0 bg-dark-grid opacity-40 pointer-events-none" />
              
              {/* Decorative Ahmedabad Map Contour SVG Lines */}
              <div className="absolute -right-20 -bottom-20 w-96 h-96 opacity-10 pointer-events-none">
                <svg viewBox="0 0 200 200" fill="none" stroke="#D4B996" strokeWidth="1.5">
                  <circle cx="100" cy="100" r="80" strokeDasharray="6 6" />
                  <circle cx="100" cy="100" r="60" />
                  <circle cx="100" cy="100" r="40" strokeDasharray="3 3" />
                  <path d="M 20 100 Q 80 40 180 100 T 200 180" />
                  <path d="M 100 20 L 100 180" strokeDasharray="2 2" />
                </svg>
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-8 space-y-6">
                  <motion.div {...reveal(0.08, 12)} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C3849] text-xs font-mono text-[#D4B996] border border-[#3E4D61]">
                    <Navigation className="w-3.5 h-3.5 text-[#C86D51]" />
                    AHMEDABAD • MANINAGAR SECTOR
                  </motion.div>

                  <h2 id="local-presence-heading" className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
                    Local property enquiries, made easier to start.
                  </h2>

                  <p className="text-base sm:text-lg text-[#C5CCD6] leading-relaxed max-w-2xl">
                    The public listing places Dhaara Estate in Maninagar, Ahmedabad, Gujarat. Property requirements and business details are to be confirmed directly with Dhaara Estate.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-md text-sm font-semibold text-[#18181B] bg-[#D4B996] hover:bg-[#E5DDD0] transition-colors shadow-sm"
                    >
                      <motion.span initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0 }} whileInView={prefersReducedMotion ? undefined : { scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.35, ease: 'easeOut' }}><MapPin className="w-4 h-4 text-[#C86D51]" /></motion.span>
                      Open Google Maps
                      <ArrowUpRight className="w-4 h-4 text-[#18181B]" />
                    </a>

                    <a
                      href={PHONE_TEL}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md text-sm font-semibold text-white bg-[#C86D51] hover:bg-[#B85D43] transition-colors shadow-sm"
                    >
                      <Phone className="w-4 h-4 text-white" />
                      Call: {PHONE_NUMBER}
                    </a>
                  </div>

                  <div className="pt-4 border-t border-[#2C3849]/60 text-xs text-[#8A95A5] flex flex-wrap items-center gap-x-6 gap-y-2 font-mono">
                    <span>LATITUDE: 22.9979° N</span>
                    <span>LONGITUDE: 72.6080° E</span>
                    <span>MANINAGAR POSTAL AREA</span>
                  </div>
                </div>

                {/* Right Geographic Summary Frame */}
                <div className="lg:col-span-4 bg-[#141B24] border border-[#2C3849] rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#2C3849]">
                    <span className="text-xs uppercase tracking-widest text-[#D4B996] font-mono">Territory Data</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-xs text-[#8A95A5] block">Locality</span>
                      <strong className="text-white">Maninagar, Ahmedabad</strong>
                    </div>
                    <div>
                      <span className="text-xs text-[#8A95A5] block">State</span>
                      <span className="text-[#C5CCD6]">Gujarat, India</span>
                    </div>
                    <div>
                      <span className="text-xs text-[#8A95A5] block">Address Notice</span>
                      <span className="text-xs text-[#A1A1AA] italic">
                        Exact office premises or suite to be confirmed directly with Dhaara Estate. No unverified street number is assumed.
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#2C3849]">
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#D4B996] hover:text-white flex items-center justify-between"
                    >
                      <span>View live location pin</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 7. Contact Section */}
        <motion.section {...reveal()} id="contact" className="py-20 bg-[#FAF8F5]" aria-labelledby="contact-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE9DF] text-xs font-semibold text-[#8A7B6B] border border-[#D8CEBF] uppercase tracking-wider">
                Direct Contact
              </div>
              <h2 id="contact-heading" className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#18181B]">
                Let’s discuss your property requirement.
              </h2>
              <p className="text-base sm:text-lg text-[#525753] max-w-xl mx-auto">
                Use the verified public phone to discuss a planned enquiry journey and confirm relevant details with Dhaara Estate.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Direct Call Cards & Google Maps link */}
              <div className="lg:col-span-5 space-y-6">
                {/* Primary Call Box */}
                <div className="rounded-xl bg-[#FAF8F5] border-2 border-[#1B2430] p-8 shadow-sm space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#1B2430] flex items-center justify-center text-[#D4B996]">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#8A7B6B] font-semibold block">Public Telephone</span>
                      <h3 className="text-2xl font-bold text-[#18181B] font-mono">{PHONE_NUMBER}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-[#525753] leading-relaxed">
                    The public phone number used for this website concept. Tap below to place a direct call.
                  </p>

                  <a
                    href={PHONE_TEL}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-md bg-[#1B2430] hover:bg-[#2C3849] text-white font-semibold text-base shadow-sm border border-[#1B2430] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Phone className="w-5 h-5 text-[#D4B996]" />
                    Call Dhaara Estate Now
                  </a>
                </div>

                {/* Google Maps Box */}
                <div className="rounded-xl bg-[#FAF8F5] border border-[#D8CEBF] p-8 shadow-2xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-[#EFE9DF] flex items-center justify-center text-[#C86D51]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#8A7B6B] font-semibold block">Pinpoint Navigation</span>
                      <h3 className="text-lg font-bold text-[#18181B]">Maninagar, Ahmedabad</h3>
                    </div>
                  </div>

                  <p className="text-sm text-[#525753] leading-relaxed">
                    View the business entry, check proximity, or launch navigation from your current location via Google Maps.
                  </p>

                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-md bg-[#EFE9DF] hover:bg-[#E5DDD0] text-[#18181B] font-medium text-sm border border-[#D8CEBF] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-[#C86D51]" />
                    Open Google Maps Listing
                  </a>
                </div>

                {/* Strict No Fake Email / No Spam Transparency Note */}
                <div className="p-4 rounded-md bg-[#F4EFE6] border border-[#D8CEBF] text-xs text-[#6B5E51] space-y-1">
                  <p className="font-semibold text-[#18181B]">Direct Communication Standard</p>
                  <p>
                    For this website concept, enquiries are routed through the verified public phone. Further contact details are to be confirmed with Dhaara Estate.
                  </p>
                </div>
              </div>

              {/* Right Column: Interactive Requirement Preview Concept */}
              <div className="lg:col-span-7">
                <div className="rounded-xl bg-[#FAF8F5] border border-[#D8CEBF] p-8 sm:p-10 shadow-sm space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9]">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C86D51]" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#8A7B6B]">
                        Interactive Enquiry Builder (Concept)
                      </span>
                    </div>
                    <span className="text-[11px] font-mono bg-[#EFE9DF] px-2.5 py-0.5 rounded-xs text-[#6B5E51]">
                      Preview Only
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#18181B]">
                      Plan your enquiry journey
                    </h3>
                    <p className="text-xs text-[#525753] mt-1">
                      Select an intended goal to preview how a requirement could be organized. This does not submit an enquiry.
                    </p>
                  </div>

                  {/* Step 1: Select Journey */}
                  <div className="space-y-2">
                    <p id="journey-choice-label" className="text-xs font-semibold text-[#18181B] uppercase tracking-wider block">
                      1. Requirement Type
                    </p>
                    <div className="grid grid-cols-3 gap-2" role="group" aria-labelledby="journey-choice-label">
                      {(['buying', 'selling', 'renting'] as const).map((journey) => (
                        <button
                          key={journey}
                          type="button"
                          onClick={() => setSelectedJourney(journey)}
                          aria-pressed={selectedJourney === journey}
                          className={`min-h-11 py-2.5 px-3 rounded-md text-xs font-semibold capitalize border transition-all duration-200 active:scale-[0.98] text-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51] ${
                            selectedJourney === journey
                              ? 'bg-[#1B2430] text-white border-[#1B2430] shadow-xs'
                              : 'bg-[#FAF8F5] text-[#525753] border-[#D8CEBF] hover:border-[#8A7B6B]'
                          }`}
                        >
                          {journey}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Select Property Category */}
                  <div className="space-y-2">
                    <p id="property-choice-label" className="text-xs font-semibold text-[#18181B] uppercase tracking-wider block">
                      2. Property Category
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="group" aria-labelledby="property-choice-label">
                      {[
                        'Residential Apartment',
                        'Tenement / House',
                        'Commercial Shop',
                        'Office Space',
                        'Open Plot / Land',
                        'Other Enquiry'
                      ].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedPropertyType(type)}
                          aria-pressed={selectedPropertyType === type}
                          className={`min-h-11 py-2 px-3 rounded-md text-xs text-left border transition-all duration-200 active:scale-[0.98] truncate focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51] ${
                            selectedPropertyType === type
                              ? 'bg-[#EFE9DF] text-[#18181B] border-[#C86D51] font-semibold'
                              : 'bg-[#FAF8F5] text-[#525753] border-[#D8CEBF] hover:border-[#8A7B6B]'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Summary Card */}
                  <motion.div
                    key={`${selectedJourney}-${selectedPropertyType}`}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                    animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="p-4 rounded-lg bg-[#F4EFE6] border border-[#D8CEBF] space-y-2"
                    aria-live="polite"
                  >
                    <div className="text-xs text-[#8A7B6B] uppercase tracking-wider font-mono">Current Selection</div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-[#18181B] font-medium">
                      <span className="px-2 py-0.5 rounded-sm bg-[#FAF8F5] border border-[#D8CEBF] capitalize">
                        Goal: {selectedJourney}
                      </span>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded-sm bg-[#FAF8F5] border border-[#D8CEBF]">
                        Type: {selectedPropertyType}
                      </span>
                      <span>•</span>
                      <span className="text-xs text-[#6B5E51]">Locality: Maninagar, Ahmedabad</span>
                    </div>
                  </motion.div>

                  {/* Concept Form Disclaimer & Direct Action */}
                  <div className="pt-2 space-y-3">
                    <div className="p-3 rounded-md bg-[#FAF8F5] border border-[#D8CEBF] text-xs text-[#525753] flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                      <div>
                        <strong>Non-functional concept notice:</strong> This website concept does not submit enquiries. To discuss this requirement, call the verified public number.
                      </div>
                    </div>

                    <a
                      href={PHONE_TEL}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-md bg-[#C86D51] hover:bg-[#B85D43] text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-xs"
                    >
                      <Phone className="w-4 h-4 text-white" />
                      Discuss This Requirement: {PHONE_NUMBER}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* 8. Footer */}
      <motion.footer {...reveal()} className="bg-[#18181B] text-[#FAF8F5] border-t border-[#2C302E] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2C302E]">
            {/* Column 1: Identity & Verification */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-[#2C3849] flex items-center justify-center border border-[#C86D51]/50">
                  <Building2 className="w-5 h-5 text-[#D4B996]" />
                </div>
                <div>
                  <span className="font-editorial text-lg font-semibold tracking-wider text-white block leading-tight">
                    DHAARA ESTATE MANINAGAR
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#D4B996]">
                    Real Estate Agent
                  </span>
                </div>
              </div>
              <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-sm">
                A focused digital presence and website concept for Dhaara Estate Maninagar, built around local property enquiries and direct communication.
              </p>
              <div className="pt-2 text-xs font-mono text-[#D4B996]">
                WEBSITE CONCEPT • AHMEDABAD, GUJARAT
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D4B996] block">
                Website Navigation
              </span>
              <ul className="space-y-2 text-sm text-[#A1A1AA]">
                <li>
                  <a href="#services" className="hover:text-white transition-colors rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51]">
                    Services & Journeys
                  </a>
                </li>
                <li>
                  <a href="#why-dhaara" className="hover:text-white transition-colors rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51]">
                    Why This Website Helps
                  </a>
                </li>
                <li>
                  <a href="#local-presence" className="hover:text-white transition-colors rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51]">
                    Local Presence (Maninagar)
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51]">
                    Direct Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Google Maps */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D4B996] block">
                Public Listing Reference
              </span>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-start gap-2.5 text-[#A1A1AA]">
                  <MapPin className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                  <span>Maninagar, Ahmedabad, Gujarat, India</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#A1A1AA]">
                  <Phone className="w-4 h-4 text-[#C86D51] shrink-0" />
                  <a href={PHONE_TEL} className="hover:text-white font-mono font-medium text-white transition-colors rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51]">
                    {PHONE_NUMBER}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#2C302E] hover:bg-[#3E4441] text-xs font-medium text-[#FAF8F5] transition-colors border border-[#444A47] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C86D51]"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#D4B996]" />
                  <span>Open Google Maps Listing</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Attribution & Disclaimers */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#828288]">
            <div>
              © {new Date().getFullYear()} Dhaara Estate Maninagar. All rights reserved.
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#D4B996] font-medium">Website concept prepared by SiteNerve</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-[#2C302E]/60 text-[11px] text-[#6B6B70] leading-relaxed text-center sm:text-left">
            Disclaimer: This website is an independent concept prepared by SiteNerve using publicly available Google Maps listing information for Dhaara Estate Maninagar. Property inventory, photos, prices, services, address, hours, email, reviews, and other details remain to be confirmed by Dhaara Estate.
          </div>
        </div>
      </motion.footer>
    </div>
    </MotionConfig>
  );
}
