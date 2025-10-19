'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { icon: '🏠', label: 'Dashboard', href: '/portal' },
  { icon: '📅', label: 'Subscription', href: '/portal/subscription' },
  { icon: '📚', label: 'Resources', href: '/portal/resources' },
  { icon: '📅', label: 'Events', href: '/portal/events' },
  { icon: '🎁', label: 'Perks', href: '/portal/perks' },
  { icon: '⚙️', label: 'Settings', href: '/portal/settings' },
];

export default function PortalNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 z-50">
      {navItems.map(item => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition ${
              isActive ? 'text-sage-green' : 'text-gray-400 hover:text-sage-green'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
