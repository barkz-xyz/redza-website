// A tab can be hidden while its elements still intersect the viewport.
export function observeMotionVisibility(element: Element, notify: (visible: boolean) => void) {
  let intersects = false;
  const sync = () => notify(intersects && document.visibilityState === 'visible');
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[entries.length - 1];
    intersects = entry.isIntersecting && entry.intersectionRatio > 0;
    sync();
  }, { threshold: [0, 0.01] });

  observer.observe(element);
  document.addEventListener('visibilitychange', sync);
  return () => {
    observer.disconnect();
    document.removeEventListener('visibilitychange', sync);
  };
}
