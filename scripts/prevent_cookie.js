(() => {
  'use strict';

  try {
    const targetProto = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie')
      ? Document.prototype
      : Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie')
      ? HTMLDocument.prototype
      : null;

    if (!targetProto) return;

    const cookieDesc = Object.getOwnPropertyDescriptor(targetProto, 'cookie');
    if (!cookieDesc || !cookieDesc.set || !cookieDesc.get || !cookieDesc.configurable) return;

    const originalGet = cookieDesc.get;
    const originalSet = cookieDesc.set;

    // Matches first-party Facebook tracking cookies (_fbp and _fbc)
    const isBlocked = (cookieStr) => {
      return /^\s*(_fbp|_fbc)\s*=/i.test(cookieStr);
    };

    Object.defineProperty(targetProto, 'cookie', {
      configurable: true,
      enumerable: true,
      get() {
        const cookies = originalGet.call(this);
        if (!cookies || typeof cookies !== 'string') return cookies;
        // Strip _fbp and _fbc from client-side JavaScript reads
        return cookies
          .split(';')
          .filter(c => !isBlocked(c))
          .join('; ')
          .trim();
      },
      set(val) {
        if (typeof val === 'string' && isBlocked(val)) {
          // Drop the cookie silently so _fbp and _fbc are never stored via JS
          return;
        }
        return originalSet.call(this, val);
      }
    });
  } catch (e) {
    // Fail silently to avoid breaking pages
  }
})();

