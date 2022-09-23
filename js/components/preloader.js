/*--------------------------------------------------
  02. Preloader
---------------------------------------------------*/

const Preloader = (function() {

  const preloader = document.querySelector('.js-preloader');
  const bg = preloader.querySelector('.preloader__bg');
  const progress = preloader.querySelector('.preloader__progress');
  const progressInner = preloader.querySelector('.preloader__progress__inner');

  function initial() {

    gsap.registerEffect({
      name: 'preloaderInitial',
      effect: (target, config) => {

        document.documentElement.classList.add('html-overflow-hidden');
        const tl = gsap.timeline();

        if (!document.body.classList.contains('preloader-visible')) {
          document.documentElement.classList.remove('html-overflow-hidden');
          return tl;
        }
        
        return tl
          .fromTo(progressInner, {
            scaleY: 0,
          }, {
            scaleY: 1,
            ease: 'none',
            duration: 1,
            delay: 0.3,
            onStart: () => {
              bg.classList.add('origin-top');
            }
          })
          .to(progress, {
            duration: 0.5,
            ease: 'quart.inOut',
            opacity: 0,
            scale: 0.75,
          }, '>-0.1')
          .to(bg, {
            ease: 'quart.inOut',
            duration: 0.6,
            scaleY: 0,
            onComplete: () => {
              document.documentElement.classList.remove('html-overflow-hidden');
            },
          }, '>-0.5')

      },
      extendTimeline: true,
    });

  }

  function show() {

    gsap.registerEffect({
      name: 'preloaderShow',
      effect: (target, config) => {
    
        const tl = gsap.timeline();

        if (!preloader) {
          return tl;
        }
    
        tl
          .set(progress, {
            opacity: 0,
            scale: 0.75,
          })
          .set(progressInner, {
            scaleY: 0,
          })
    
          .to(bg, {
            ease: 'quart.inOut',
            duration: 0.6,
            scaleY: 1,
            onStart: () => {
              bg.classList.remove('origin-top');
              document.documentElement.classList.add('html-overflow-hidden');
            },
          })
          .to(progress, {
            delay: 0.1,
            duration: 0.6,
            ease: 'quart.out',
            opacity: 1,
            scale: 1,
          })
          .to(progressInner, {
            scaleY: 1,
            duration: 1,
            ease: 'none',
          }, '>-0.3')
    
    
        return tl;
    
      },
      extendTimeline: true,
    });

  }
  
  function hide() {

    gsap.registerEffect({
      name: 'preloaderHide',
      effect: (target, config) => {
    
        const tl = gsap.timeline();

        return tl
          .to(progress, {
            delay: 0.15,
            duration: 0.5,
            ease: 'quart.inOut',
            opacity: 0,
            scale: 0.75,
            onStart: () => {
              bg.classList.add('origin-top');
            }
          })
          .to(bg, {
            ease: 'quart.inOut',
            duration: 0.6,
            scaleY: 0,
            onComplete: () => {
              document.documentElement.classList.remove('html-overflow-hidden');
              document.documentElement.classList.remove('overflow-hidden');
              document.body.classList.remove('overflow-hidden');
            },
          }, '>-0.5')
    
      },
      extendTimeline: true,
    });

  }

  function init() {

    if (!preloader) return;

    initial();
    show();
    hide();

  }

  return {
    init: init,
  }

})();
