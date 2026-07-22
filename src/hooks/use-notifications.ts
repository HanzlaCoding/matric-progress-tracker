import { useEffect, useCallback } from 'react';

interface NotificationOptions {
  title: string;
  options?: NotificationOptions;
}

export function useNotifications() {
  useEffect(() => {
    // Request notification permission on mount
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, []);

  const sendNotification = useCallback(async (title: string, options?: NotificationOptions['options']) => {
    if (typeof window === 'undefined') return;

    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        if (registration.active) {
          registration.active.postMessage({
            type: 'SHOW_NOTIFICATION',
            title,
            options: options || {},
          });
        }
      } else if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
          icon: '/icon-192.png',
          badge: '/icon-192.png',
          ...options,
        });
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }, []);

  const scheduleNotification = useCallback((
    title: string,
    delayMs: number,
    options?: NotificationOptions['options']
  ) => {
    const timeoutId = setTimeout(() => {
      sendNotification(title, options);
    }, delayMs);

    return () => clearTimeout(timeoutId);
  }, [sendNotification]);

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.warn('Notifications not supported');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }, []);

  return {
    sendNotification,
    scheduleNotification,
    requestPermission,
    isSupported: typeof window !== 'undefined' && 'Notification' in window,
    isGranted: typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted',
  };
}
