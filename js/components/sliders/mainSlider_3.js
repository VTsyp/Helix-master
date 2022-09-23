const MainSlider3 = (function() {
  let sliderInstance;
  let currentIndex = 0;
  
  function sliderInit() {
    const slider = document.querySelector('.js-mainSlider-type-3');
    if (!slider) return;

    sliderInstance = new Swiper(slider, {
      spaceBetween: 0,
      speed: 1000,
      parallax: true,
      lazy: {
        loadPrevNext: true,
      },
      breakpoints: {
        575: {
          parallax: false,
        },
      },
      navigation: {
        prevEl: slider.querySelector('.js-nav-prev'),
        nextEl: slider.querySelector('.js-nav-next'),
      },
      pagination: {
        el: slider.querySelector('.js-pagination'),
        bulletClass: 'pagination__item',
        bulletActiveClass: 'is-active',
        bulletElement: 'div',
        clickable: true
      },
    });
  }

  function sliderEvents() {
    sliderInstance.on('slideChangeTransitionEnd', function () {
      hideContent(sliderInstance.slides[currentIndex]);
      showContent(sliderInstance.slides[sliderInstance.activeIndex]);
      currentIndex = sliderInstance.activeIndex;
    });
  }

  function hideContent(slide) {
    const lines = slide.querySelectorAll('.js-title .split__line')
    const text = slide.querySelector('.js-text')
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .set(lines, {
        y: '100%',
      })
      .set(text, {
        opacity: 0,
        y: '30px',
      })
      .set(button, {
        opacity: 0,
        y: '30px',
      });
  }

  function showContent(slide) {
    const lines = slide.querySelectorAll('.js-title .split__line')
    const text = slide.querySelector('.js-text')
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .to(lines, {
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        y: '0%',
      })
      .to(button, {
        duration: 0.6,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, ">-0.4");
  }

  function hideSlides() {
    const slider = document.querySelector('.js-mainSlider-type-3');
    if (!slider) return;
    const lines = slider.querySelectorAll('.js-title .split__line')
    const text = slider.querySelectorAll('.js-text')
    const button = slider.querySelectorAll('.js-button')

    gsap.timeline()
      .set(lines, {
        y: '100%',
      })
      .set(button, {
        opacity: 0,
        y: '30px',
      });
  }

  function init() {
    const target = document.querySelector('.js-mainSlider-type-3');
    if (!target) return;
    sliderInit();
    hideSlides();
    sliderEvents();
  }

  return {
    init: init,
  }
})();

const MainSliderReveal3 = (function() {
  let slider;
  let content;
  let title;
  let titleLines;
  let button;
  let header;
  let headerBar;
  let headerItems;

  function initVars() {
    slider = document.querySelector('.js-mainSlider-type-3');
    content = slider.querySelector('.js-content');
    title = content.querySelector('.js-title');
    titleLines = content.querySelectorAll('.js-title-wrap .split__line');
    button = content.querySelector('.js-button');
    header = document.querySelector('.js-header');
    headerBar = document.querySelector('.js-header-bar');
    headerItems = document.querySelectorAll('.js-header .js-header-item');
  }

  function prepareAnimation() {
    if (!document.querySelector('.js-mainSlider-type-3')) {
      return;
    }

    initVars();

    gsap.set(headerBar, {
      opacity: 0,
      y: '34px',
    })
    
    gsap.set(button, {
      opacity: 0,
      y: '34px',
    })
  }

  function animate() {
    if (!document.querySelector('.js-mainSlider-type-3')) {
      return;
    }
    
    gsap.timeline()
      .to(headerBar, {
        duration: 0.7,
        ease: 'power2.out',
        y: '0%',
        opacity: 1,
      })
      .to(titleLines, {
        stagger: 0.08,
        duration: 0.85,
        ease: 'power2.out',
        y: '0%',
      }, '>-0.5')
      .to(button, {
        delay: 0.4,
        duration: 1,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, '>-0.8')
  }

  return {
    prepareAnimation: prepareAnimation,
    animate: animate,
  }
})();
