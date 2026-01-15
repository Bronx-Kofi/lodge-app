'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export function MobileNav() {
  const pathname = usePathname();
  
  // Don't show on studio pages
  if (pathname?.startsWith('/studio')) return null;

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-50 safe-area-bottom shadow-lg"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-around py-3">
        <NavItem 
          href="/" 
          icon={<HomeIcon />}
          label="Home" 
          active={pathname === '/'} 
        />
        <NavItem 
          href="/rooms" 
          icon={<SearchIcon />}
          label="Rooms" 
          active={pathname?.startsWith('/rooms') || false} 
        />

        {/* Primary mobile CTA */}
        <Link
          href="/check-in-form"
          className="flex flex-col items-center gap-1 px-4 py-3 min-w-[70px] min-h-[56px] touch-manipulation transition-all relative"
          aria-label="Book now"
        >
          <div className="w-12 h-12 bg-orange text-white rounded-full flex items-center justify-center shadow-brand">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-orange">
            Book
          </span>
        </Link>

        <NavItem 
          href="/explore" 
          icon={<MapIcon />}
          label="Explore" 
          active={pathname?.startsWith('/explore') || false} 
        />
        <NavItem 
          href="/about" 
          icon={<InfoIcon />}
          label="About" 
          active={pathname?.startsWith('/about') || false} 
        />
      </div>
    </motion.nav>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

function NavItem({ href, icon, label, active }: NavItemProps) {
  return (
    <Link 
      href={href}
      className={`flex flex-col items-center gap-1 px-4 py-3 min-w-[70px] min-h-[56px] touch-manipulation transition-all relative ${
        active ? 'text-orange' : 'text-neutral-600'
      }`}
    >
      <div className={`transition-transform ${active ? 'scale-110' : ''}`}>
        {icon}
      </div>
      <span className={`text-xs font-medium ${active ? 'font-semibold' : ''}`}>
        {label}
      </span>
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-1 bg-orange rounded-t-full"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  );
}

// Icon Components
function HomeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
