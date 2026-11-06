// Decorative videos only load and play while their section is visible.
(() => {
  const videos = [...document.querySelectorAll(".video video")];
  const smallScreen = window.matchMedia("(max-width: 576px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const connection = navigator.connection;
  const visible = new Set();

  function update(video) {
    const enabled = !smallScreen.matches && !reducedMotion.matches && !connection?.saveData;
    if (!enabled || document.hidden || !visible.has(video)) {
      video.pause();
      // Cancel a download if the viewport or user preference disables video.
      if (!enabled && video.hasAttribute("src")) {
        video.removeAttribute("src");
        video.load();
      }
      return;
    }

    if (!video.hasAttribute("src")) video.src = video.dataset.src;
    const playback = video.play();
    if (playback) playback.catch(() => {}); // The section image remains as a fallback.
  }

  function updateAll() {
    videos.forEach(update);
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) visible.add(target);
        else visible.delete(target);
        update(target);
      });
    });
    videos.forEach((video) => observer.observe(video));
  }

  document.addEventListener("visibilitychange", updateAll);
  smallScreen.addEventListener("change", updateAll);
  reducedMotion.addEventListener("change", updateAll);
  connection?.addEventListener("change", updateAll);
})();
