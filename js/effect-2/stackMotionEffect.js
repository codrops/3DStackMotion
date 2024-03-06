import { throttle } from '../utils.js';

let winsize = {width: window.innerWidth, height: window.innerHeight};

export class StackMotionEffect {
  constructor(stackEl) {
    // Check if the provided element is valid.
    if (!stackEl || !(stackEl instanceof HTMLElement)) {
      throw new Error('Invalid element provided.');
    }

    this.wrapElement = stackEl;
    this.contentElement = this.wrapElement.querySelector('.content');
    this.imageElements = [this.contentElement.querySelectorAll('.card')];
    this.imagesTotal = this.imageElements.length;

    // Set up the effect for the provided element.
    this.initializeEffect(stackEl);
  }
  
  // Sets up the initial effect on the provided element.
  initializeEffect(element) {
    // Scroll effect.
    this.scroll();

    const throttledResize = throttle(() => {
      winsize = { width: window.innerWidth, height: window.innerHeight };
      this.scroll();
    }, 100);
    window.addEventListener('resize', throttledResize);
  }

  scroll() {
    // Let's set the initial rotation for the content element
    this.contentElement.style.transform = 'rotate3d(1, 0, 0, 55deg) rotate3d(0, 1, 0, 30deg)';
    this.contentElement.style.opacity = 0;

    if (this.tl) {
      this.tl.kill();
    }

    this.tl = gsap.timeline({
      defaults: {
        ease: 'sine.inOut',
      },
      scrollTrigger: {
        trigger: this.wrapElement,
        start: 'top center',
        end: '+=150%',
        scrub: true,
        onEnter: () => gsap.set(this.contentElement, {opacity: 1}),
        onEnterBack: () => gsap.set(this.contentElement, {opacity: 1}),
        onLeave: () => gsap.set(this.contentElement, {opacity: 0}),
        onLeaveBack: () => gsap.set(this.contentElement, {opacity: 0}),
      },
    })
    .fromTo(this.imageElements, {
      z: (pos) => -1.2 * winsize.height - pos * 0.08 * winsize.height,
    }, {
      z: (pos) => 3 * winsize.height + (this.imagesTotal - pos - 1) * 0.08 * winsize.height,
    }, 0)
    .fromTo(this.imageElements, {
      rotationZ: -130,
    }, {
      rotationZ: 360,
      stagger: 0.006,
    }, 0)
    /*.fromTo(this.imageElements, {
      filter: 'brightness(10%)',
    }, {
      filter: 'brightness(400%)',
      stagger: 0.005,
    }, 0);*/
  }
}
