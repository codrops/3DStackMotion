/**
 * Preloads images specified by the CSS selector.
 * @function
 * @param {string} [selector='img'] - CSS selector for target images.
 * @returns {Promise} - Resolves when all specified images are loaded.
 */
export const preloadImages = (selector = 'img') => {
    return new Promise((resolve) => {
        // The imagesLoaded library is used to ensure all images (including backgrounds) are fully loaded.
        imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
    });
};

/**
 * Throttles a function call, allowing it to be executed only once every specified time period.
 * This is useful for controlling the rate at which a function is executed, preventing it from being called too frequently. 
 * @function
 * @param {Function} func - The function to be throttled.
 * @param {number} limit - The time, in milliseconds, to wait before allowing the function to be called again.
 * @returns {Function} - A throttled version of the passed function, which when invoked, will only execute 
 * at most once in every `limit` milliseconds, and ignores subsequent calls within the same period.
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
      }
  };
};