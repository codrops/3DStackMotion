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
    this.contentElement.style.transform = 'rotate3d(1, 0, 0, 25deg) rotate3d(0, 1, 0, -50deg) rotate3d(0, 0, 1, 25deg)';
    this.contentElement.style.opacity = 0;

    if (this.tl) {
      this.tl.kill();
    }

    this.tl = gsap.timeline({
      defaults: {
        ease: 'power1',
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
      z: (pos) => -2.5 * winsize.width/2 - pos * 0.07 * winsize.width,
    }, {
      z: (pos) => 2.5 * winsize.width + (this.imagesTotal - pos - 1) * 0.07 * winsize.width,
    }, 0)
    .fromTo(this.imageElements, {
      rotationZ: 10,
    }, {
      rotationX: 20,
      rotationZ: 280,
      yPercent: -100,
      stagger: 0.005,
    }, 0)
    /*.fromTo(this.imageElements, {
      filter: 'brightness(20%)',
    }, {
      filter: 'brightness(350%)',
      stagger: 0.005,
    }, 0);*/
  }
}
