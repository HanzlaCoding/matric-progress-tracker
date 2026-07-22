# MatricPrep AI - PWA Deployment Guide

## Overview
MatricPrep AI is now a full Progressive Web App with offline support, installability, and native app-like experience across all devices.

## Quick Start

### Local Development
```bash
pnpm install
pnpm dev
```
Visit `http://localhost:3000`

### Production Build
```bash
pnpm build
pnpm start
```

## PWA Features Activated

### 1. App Installation
Once deployed to production (HTTPS):
- **Android**: "Install" button appears automatically
- **iOS**: Manual "Add to Home Screen" via Safari
- **Desktop**: Browser installation menu

### 2. Offline First
- All cached assets work offline
- Study progress persists locally
- Automatic cache updates
- Smart fallback strategies

### 3. Service Worker
- Automatic registration in production
- Workbox-powered caching
- Smart cache management
- Background sync ready

### 4. Responsive Icons
- 192x192 and 512x512 app icons
- Maskable icons for Android
- Apple touch icons for iOS
- App shortcut icons

### 5. App Manifest
- Complete PWA metadata
- App shortcuts for quick access
- Share target configuration
- Display mode: standalone

## Deployment Steps

### Vercel Deployment (Recommended)

1. **Connect Repository**
   ```bash
   git push
   ```
   or link GitHub repo in Vercel dashboard

2. **Configure Environment** (if needed)
   - No environment variables required for PWA
   - All PWA features work automatically

3. **Deploy**
   - Vercel deploys with HTTPS automatically
   - PWA service worker registers on first visit
   - Caching starts immediately

4. **Verify PWA**
   - Visit your Vercel deployment
   - Check app install prompt
   - DevTools → Application → Manifest (should show)
   - DevTools → Application → Service Workers (should show)

### Other Hosting

**Requirements:**
- HTTPS only (PWA requirement)
- Valid SSL certificate
- Correct MIME types for `.js` files

**Steps:**
1. Build the app: `pnpm build`
2. Deploy `.next` directory with build output
3. Ensure `public/` folder deployed:
   - `manifest.json`
   - `sw.js`
   - All `icon-*.png` files
   - `screenshot-*.png` files

## Monitoring & Analytics

### Lighthouse PWA Score
1. Run Lighthouse audit in Chrome DevTools
2. Check "Progressive Web App" section
3. Score should be 90+ for properly configured PWA

### Key Metrics to Track
- Service Worker registration success
- Cache hit rates
- Offline usage percentage
- Installation completion rate

## Testing

### Test Installation
**Android:**
```
1. Open app in Chrome
2. Wait for install prompt
3. Click "Install"
4. Verify app appears on home screen
```

**iOS:**
```
1. Open app in Safari
2. Tap Share icon
3. Tap "Add to Home Screen"
4. Confirm addition
```

**Desktop:**
```
1. Open app in Chrome/Edge
2. Click install icon in address bar
3. Confirm installation
4. App opens in separate window
```

### Test Offline Mode
1. Open DevTools (F12)
2. Network tab → Throttle → Offline
3. Refresh page
4. App should load from cache
5. All features work normally

### Test Service Worker
1. Open DevTools
2. Application → Service Workers
3. Should show "MatricPrep AI" service worker
4. Status should be "active and running"

## Troubleshooting

### Install Prompt Not Showing
**Cause:** Not on HTTPS
**Solution:** Deploy to production with HTTPS

**Cause:** Browser policy blocked
**Solution:** Check browser PWA requirements

### Service Worker Not Registering
**Cause:** Development mode disabled SW
**Solution:** Deploy to production or build then start

### Icons Not Displaying
**Cause:** Incorrect manifest paths
**Solution:** Verify `/public/*.png` files exist

**Cause:** Browser cache
**Solution:** Clear cache → Ctrl+Shift+Del

### Offline Content Cached but Not Loading
**Cause:** Service Worker version mismatch
**Solution:** Hard refresh → Ctrl+Shift+R

## Cache Management

### Cache Expiration Times
- **Static Assets** (JS/CSS): 30 days
- **Images**: 30 days
- **Google Fonts**: 1 year
- **CDN Assets**: 1 week
- **HTTP Requests**: 1 hour

### Clear Cache (Users)
1. Open Settings
2. App info → Storage → Clear cache
3. Reinstall app (optional)

### Clear Cache (Development)
1. Open DevTools
2. Application → Storage → Clear site data
3. Refresh page

## Performance Optimization

### Caching Strategy
- **Cache First**: Static assets (images, fonts, JS/CSS)
- **Network First**: Dynamic content (HTML, API calls)
- **Stale While Revalidate**: CSS/JS updates with fallback

### Recommended Practices
1. Keep assets under 1MB each
2. Compress images before deployment
3. Monitor cache size (typically <50MB)
4. Update cache versions periodically

## Security

### HTTPS Required
- All PWA features require HTTPS
- No mixed content allowed
- Service Worker only works on secure origins

### Content Security Policy
```
default-src 'self'
script-src 'self' 'wasm-unsafe-eval'
style-src 'self' 'unsafe-inline'
img-src 'self' data: https:
font-src 'self'
```

## Updates & Versioning

### Updating the App
1. Make code changes
2. Build: `pnpm build`
3. Deploy to production
4. Service worker auto-updates on next visit
5. Users get new version within minutes

### Version Control
- Service Worker version: Set in `next.config.mjs`
- Cache names include version: `matricprep-ai-v1`
- Increment on major changes

## Support Resources

- [MDN PWA Docs](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [next-pwa GitHub](https://github.com/shadowwalker/next-pwa)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)

## Files Overview

| File | Purpose |
|------|---------|
| `next.config.mjs` | PWA configuration with next-pwa |
| `public/manifest.json` | PWA metadata & install config |
| `public/sw.js` | Service Worker (caching logic) |
| `public/icon-*.png` | App icons (various sizes) |
| `public/screenshot-*.png` | App store screenshots |
| `components/pwa-install.tsx` | Install prompt UI |
| `components/offline-indicator.tsx` | Offline status indicator |
| `hooks/use-notifications.ts` | Notification support |

## Success Criteria

✓ App installs with one click on Android
✓ App works completely offline
✓ Install prompt appears on first visit
✓ Offline indicator shows when no connection
✓ Lighthouse PWA score ≥ 90
✓ All content loads from cache offline
✓ Study progress persists across sessions
✓ Icons display correctly in app drawer
