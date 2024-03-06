// Importing utility function for preloading images
import { preloadImages } from './utils.js';
// Importing StackMotionEffect classes from different effect files with renamed imports to avoid name conflicts
import { StackMotionEffect as StackMotionEffect1 } from './effect-1/stackMotionEffect.js';
import { StackMotionEffect as StackMotionEffect2 } from './effect-2/stackMotionEffect.js';
import { StackMotionEffect as StackMotionEffect3 } from './effect-3/stackMotionEffect.js';

// Registers ScrollTrigger plugin with GSAP for scroll-based animations.
gsap.registerPlugin(ScrollTrigger);

// Initialize function to set up motion effects and animations
const init = () => {
  // Apply the first stack motion effect to all elements with a specific data attribute
  document.querySelectorAll('[data-stack-1]').forEach((stackEl) => {
    new StackMotionEffect1(stackEl);
  });
  // Apply the second stack motion effect to all elements with a different specific data attribute
  document.querySelectorAll('[data-stack-2]').forEach((stackEl) => {
    new StackMotionEffect2(stackEl);
  });
  // Apply the third stack motion effect to all elements with yet another specific data attribute
  document.querySelectorAll('[data-stack-3]').forEach((stackEl) => {
    new StackMotionEffect3(stackEl);
  });

  // Select all grid intro card elements and apply animations on scroll
  const introCards = document.querySelectorAll('.intro .card');
  introCards.forEach(introCard => {
    gsap.to(introCard, {
      ease: 'power1.in',
      startAt: {
        transformOrigin: '100% 50%',
        filter: 'brightness(70%)'
      },
      rotationX: () => -60,
      yPercent: () => gsap.utils.random(-100,0),
      z: () => gsap.utils.random(-100,0),
      filter: 'brightness(0%)',
      scrollTrigger: {
        trigger: introCard,
        start: 'clamp(top bottom)',
        end: 'clamp(bottom top)',
        scrub: true,
      }
    });
  });
};

// Preloading images and initializing setup when complete
preloadImages('.grid__img').then(() => {
  document.body.classList.remove('loading');
  init();
});
