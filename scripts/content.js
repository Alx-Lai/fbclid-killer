const referrerMatchers = [
  /[?&]fbclid=[^&]*/,
  /l.facebook.com/,
];

console.log(document.referrer);
for (const matcher of referrerMatchers) {
  if (matcher.test(document.referrer)) {
    const url = new URL(location.href);
    url.searchParams.delete('fbclid');
    history.replaceState(history.state, document.title, url.href);
  }

}
