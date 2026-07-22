'use client';

import { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowPrompt(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  // Show nothing if already installed or not on a compatible device
  if (!showPrompt || (!deferredPrompt && !isIOS)) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-slate-900 via-slate-900 to-transparent p-4 md:p-6">
      <div className="max-w-md mx-auto bg-slate-800 rounded-lg border border-slate-700 shadow-lg p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Download className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm md:text-base">
                Install MatricPrep AI
              </h3>
              <p className="text-slate-300 text-xs md:text-sm mt-1">
                {isIOS
                  ? 'Tap the share button and select "Add to Home Screen"'
                  : 'Get quick access to your study app on your device'}
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-white transition-colors p-1 -mr-1 -mt-1"
            aria-label="Close install prompt"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isIOS && deferredPrompt && (
          <button
            onClick={handleInstall}
            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm md:text-base"
          >
            Install App
          </button>
        )}
      </div>
    </div>
  );
}
