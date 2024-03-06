import { throttle } from '../utils.js';

// Keeps track of the window's size for responsive adjustments.
let winsize = {width: window.innerWidth, height: window.innerHeight};

export class StackMotionEffect {
  constructor(stackEl) {
    // Validates the input element to ensure it's an HTML element.
    if (!stackEl || !(stackEl instanceof HTMLElement)) {
      throw new Error('Invalid element provided.');
    }

    this.wrapElement = stackEl;
    this.contentElement = this.wrapElement.querySelector('.content');
    this.imageElements = [this.contentElement.querySelectorAll('.card')];
    this.imagesTotal = this.imageElements.length;

    // Calls the method to set up the initial effect.
    this.initializeEffect(stackEl);
  }
  
  // Sets up the initial effect on the provided element.
  initializeEffect(element) {
    // Scroll effect.
    this.scroll();
    
    // Throttles resize event to optimize performance and re-calculate sizes and effect on resize.
    const throttledResize = throttle(() => {
      winsize = { width: window.innerWidth, height: window.innerHeight };
      this.scroll();
    }, 100);
    window.addEventListener('resize', throttledResize);
  }

  // Defines the scroll effect logic for the stack.
  scroll() {
    // Initially hides the content element and prepares it for the animation by setting its transform property. 
    // This sets the initial 3D rotation of the stack and its cards, defining their starting visual appearance.
    this.contentElement.style.transform = 'rotate3d(1, 0, 0, -25deg) rotate3d(0, 1, 0, 50deg) rotate3d(0, 0, 1, 25deg)';
    this.contentElement.style.opacity = 0;

    // Clears previous timeline if exists to prevent conflicts.
    if (this.tl) {
      this.tl.kill();
    }

    // Creates a new timeline for the scroll-triggered animation.
    this.tl = gsap.timeline({
      defaults: {
        ease: 'power1',
      },
      scrollTrigger: {
        trigger: this.wrapElement,
        start: 'top center',
        end: '+=150%',
        scrub: true,
        // Sets opacity to 1 when the element comes into view.
        onEnter: () => gsap.set(this.contentElement, {opacity: 1}),
        onEnterBack: () => gsap.set(this.contentElement, {opacity: 1}),
        // Hides the element when it leaves the view.
        onLeave: () => gsap.set(this.contentElement, {opacity: 0}),
        onLeaveBack: () => gsap.set(this.contentElement, {opacity: 0})
      },
    })
    .fromTo(this.imageElements, {
      // Animates from a starting z position based on the window size.
      z: (pos) => -2.65 * winsize.width - pos * 0.03 * winsize.width,
    }, {
      // Animates to an ending z position, creating a 3D effect as elements scroll.
      z: (pos) => 1.4 * winsize.width + (this.imagesTotal - pos - 1) * 0.03 * winsize.width,
    }, 0)
    .fromTo(this.imageElements, {
      rotationZ: -220,
    }, {
      rotationY: -30,
      rotationZ: 120,
      // Stagger effect for individual elements to animate sequentially.
      stagger: 0.005,
    }, 0)
    /*.fromTo(this.imageElements, {
      filter: 'brightness(20%)',
    }, {
      filter: 'brightness(150%)',
      stagger: 0.005,
    }, 0);*/
  }
}
