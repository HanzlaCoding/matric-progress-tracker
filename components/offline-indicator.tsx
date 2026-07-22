'use client';

import { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      // Show brief notification when coming back online
      setTimeout(() => {
        setIsOnline(true);
      }, 2000);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!mounted || isOnline) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-orange-600 text-white py-2 px-4 flex items-center gap-2 justify-center text-sm md:text-base">
      <WifiOff className="w-4 h-4 md:w-5 md:h-5" />
      <span>You&apos;re offline - using cached data</span>
    </div>
  );
}
