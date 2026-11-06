// Keep native scrolling when the CDN is unavailable or reduced motion is requested.
(() => {
  if (!window.jQuery || typeof jQuery.scrollify !== "function") return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let initialized = false;
  let animationDirection = 0;
  let reverseDistance = 0;
  let lastReverseTime = 0;
  const reverseThreshold = 80; // Pixels, or about two wheel lines.
  const reverseWindow = 160; // Accumulate a deliberate trackpad gesture.

  function resetAnimation() {
    animationDirection = 0;
    reverseDistance = 0;
    lastReverseTime = 0;
  }

  // Capture before Scrollify's wheel handler discards input while locked.
  window.addEventListener("wheel", (event) => {
    if (!animationDirection || reducedMotion.matches || jQuery.scrollify.isDisabled()) return;
    if (event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
    if (event.target.closest?.(".menu, .grid-three-columns")) return;

    const unit = event.deltaMode === 1 ? 40 : event.deltaMode === 2 ? window.innerHeight : 1;
    const distance = event.deltaY * unit;
    if (Math.sign(distance) === animationDirection) {
      reverseDistance = 0;
      lastReverseTime = 0;
      return;
    }

    const now = performance.now();
    if (now - lastReverseTime > reverseWindow) reverseDistance = 0;
    lastReverseTime = now;
    reverseDistance += Math.abs(distance);
    if (reverseDistance < reverseThreshold || !event.cancelable) return;

    const direction = Math.sign(distance);
    const position = window.scrollY;
    const sections = [...document.querySelectorAll("section.scroll")];
    // Pick the next boundary in the requested direction, even during a hash jump.
    let destination = direction < 0 ? 0 : sections.length - 1;
    sections.forEach((section, index) => {
      const top = section.getBoundingClientRect().top + position;
      if (direction < 0 && top < position - 1) destination = index;
      if (direction > 0 && top > position + 1) destination = Math.min(destination, index);
    });

    event.preventDefault();
    event.stopImmediatePropagation();
    // Do not jump to the old endpoint. Stopping also resolves Scrollify's queue
    // promise, releasing its lock before move() updates its index and URL hash.
    jQuery("html,body").stop(true, false);
    resetAnimation();
    jQuery.scrollify.move(destination);
  }, { capture: true, passive: false });

  function updateScrolling() {
    if (reducedMotion.matches) {
      if (initialized) {
        jQuery.scrollify.disable();
        jQuery("html,body").stop(true, false);
        resetAnimation();
      }
      return;
    }
    if (initialized) {
      jQuery.scrollify.enable();
      jQuery.scrollify.update();
      return;
    }

    jQuery.scrollify({
      section: "section.scroll",
      sectionName: "scroll",
      easing: "easeOutQuint",
      scrollSpeed: 1100,
      scrollbars: true,
      standardScrollElements: ".menu, .grid-three-columns",
      setHeights: false,
      overflowScroll: true,
      updateHash: true,
      touchScroll: true,
      before(index, sections) {
        animationDirection = Math.sign(sections[index].offset().top - window.scrollY);
        reverseDistance = 0;
        lastReverseTime = 0;
      },
      after: resetAnimation,
    });
    initialized = true;
  }

  updateScrolling();
  reducedMotion.addEventListener("change", updateScrolling);
  // Font loading can change section heights on short screens.
  document.fonts?.ready.then(() => {
    if (initialized) jQuery.scrollify.update();
    window.ScrollTrigger?.refresh();
  });
})();
