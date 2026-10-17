// Remove any _fbp or _fbc cookie as soon as it is set or updated
chrome.cookies.onChanged.addListener((changeInfo) => {
  if (changeInfo.removed) return;

  const { cookie } = changeInfo;
  if (cookie.name === '_fbp' || cookie.name === '_fbc') {
    removeCookie(cookie);
  }
});

// Purge any existing _fbp or _fbc cookies across all domains
function purgeExistingCookies() {
  chrome.cookies.getAll({}, (cookies) => {
    if (chrome.runtime.lastError || !cookies) return;
    for (const cookie of cookies) {
      if (cookie.name === '_fbp' || cookie.name === '_fbc') {
        removeCookie(cookie);
      }
    }
  });
}

function removeCookie(cookie) {
  const protocol = cookie.secure ? 'https:' : 'http:';
  const domain = cookie.domain.replace(/^\./, '');
  const url = `${protocol}//${domain}${cookie.path}`;

  chrome.cookies.remove(
    {
      url: url,
      name: cookie.name,
      storeId: cookie.storeId
    },
    (details) => {
      if (!details && chrome.runtime.lastError) {
        // Fallback: if protocol mismatch occurred, try alternate protocol
        const altProtocol = cookie.secure ? 'http:' : 'https:';
        chrome.cookies.remove({
          url: `${altProtocol}//${domain}${cookie.path}`,
          name: cookie.name,
          storeId: cookie.storeId
        });
      }
    }
  );
}

// Run cleanup when extension is installed, updated, or when the browser starts
chrome.runtime.onInstalled.addListener(purgeExistingCookies);
chrome.runtime.onStartup.addListener(purgeExistingCookies);

