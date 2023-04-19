gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  scroller: ".main",
});

gsap.fromTo(
  "body",
  { opacity: 0 },
  {
    scrollTrigger: ".main",
    opacity: 1,
    delay: 0.5,
    ease: Power0.easeNone,
  }
);

/**************************/
/* HERO SECTION */
/**************************/
gsap.fromTo(
  ".grid-two-columns img",
  { opacity: 0, y: -50 },
  {
    scrollTrigger: ".section-hero",
    opacity: 1,
    y: 0,
    delay: 1,
    ease: Power0.easeNone,
  }
);

gsap.fromTo(
  ".heading-primary",
  { opacity: 0, y: -50 },
  {
    scrollTrigger: ".section-hero",
    opacity: 1,
    y: 0,
    delay: 1.5,
    ease: Power0.easeNone,
  }
);

gsap.fromTo(
  ".scroll-icon",
  { opacity: 0, y: -50 },
  {
    scrollTrigger: ".section-hero",
    opacity: 1,
    y: 0,
    delay: 2,
    ease: Power0.easeNone,
  }
);

/**************************/
/* PROJECTS SECTION */
/**************************/
gsap.fromTo(
  ".heading-projects",
  { opacity: 0, y: -50 },
  {
    scrollTrigger: ".section-projects",
    opacity: 1,
    y: 0,
    delay: 0.5,
    ease: Power0.easeNone,
  }
);

gsap.fromTo(
  ".paragrowth",
  { opacity: 0, y: -50 },
  {
    scrollTrigger: ".section-projects",
    opacity: 1,
    y: 0,
    delay: 1,
    ease: Power0.easeNone,
  }
);

gsap.fromTo(
  ".specteared",
  { opacity: 0, y: -50 },
  {
    scrollTrigger: ".section-projects",
    opacity: 1,
    y: 0,
    delay: 1.2,
    ease: Power0.easeNone,
  }
);

gsap.fromTo(
  ".fimpossible",
  { opacity: 0, y: -50 },
  {
    scrollTrigger: ".section-projects",
    opacity: 1,
    y: 0,
    delay: 1.5,
    ease: Power0.easeNone,
  }
);

/**************************/
/* MORE SECTION */
/**************************/
gsap.fromTo(
  ".heading-more",
  { opacity: 0, y: -50 },
  {
    scrollTrigger: ".section-more",
    opacity: 1,
    y: 0,
    delay: 0.5,
    ease: Power0.easeNone,
  }
);

gsap.fromTo(
  ".more-column-left",
  { opacity: 0, y: -50 },
  {
    scrollTrigger: ".section-more",
    opacity: 1,
    y: 0,
    delay: 1,
    ease: Power0.easeNone,
  }
);

gsap.fromTo(
  ".more-column-right",
  { opacity: 0, y: -50 },
  {
    scrollTrigger: ".section-more",
    opacity: 1,
    y: 0,
    delay: 1.3,
    ease: Power0.easeNone,
  }
);

/**************************/
/* ABOUT SECTION */
/**************************/
gsap.fromTo(
  ".heading-about",
  { opacity: 0, y: -50 },
  {
    scrollTrigger: ".section-about",
    opacity: 1,
    y: 0,
    delay: 0.5,
    ease: Power0.easeNone,
  }
);

gsap.fromTo(
  ".about-text",
  { opacity: 0, y: -50 },
  {
    scrollTrigger: ".section-about",
    opacity: 1,
    y: 0,
    delay: 1,
    ease: Power0.easeNone,
  }
);

gsap.fromTo(
  ".mail-fimpossible-games",
  { opacity: 0, y: -50 },
  {
    scrollTrigger: ".section-about",
    opacity: 1,
    y: 0,
    delay: 1.3,
    ease: Power0.easeNone,
  }
);

gsap.fromTo(
  ".mail-fimpossible-creations",
  { opacity: 0, y: -50 },
  {
    scrollTrigger: ".section-about",
    opacity: 1,
    y: 0,
    delay: 1.5,
    ease: Power0.easeNone,
  }
);
