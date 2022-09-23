const MainSliderAll = (function() {
  let sliderInstance;
  let currentIndex = 0;

  function sliderInit() {
    sliderInstance = new Swiper(document.querySelector('.js-mainSlider-type-all'), {
      spaceBetween: 0,
      speed: 1000,
      parallax: true,
      // direction: 'vertical',
      lazy: {
        loadPrevNext: true,
      },
      breakpoints: {
        575: {
          parallax: false,
        },
      },
      navigation: {
        prevEl: document.querySelector('.js-mainSlider-type-all .js-nav-prev'),
        nextEl: document.querySelector('.js-mainSlider-type-all .js-nav-next'),
      },
      pagination: {
        el: document.querySelector('.js-mainSlider-type-all .js-pagination'),
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
      .to(text, {
        duration: 0.6,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, ">-0.4")
      .to(button, {
        duration: 0.6,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, ">-0.4");
  }

  function hideSlides() {
    const lines = document.querySelectorAll('.js-mainSlider-type-all .js-title .split__line')
    const text = document.querySelectorAll('.js-mainSlider-type-all .js-text')
    const button = document.querySelectorAll('.js-mainSlider-type-all .js-button')

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

  function init() {
    if (!document.querySelector('.js-mainSlider-type-all')) return;
    sliderInit();
    hideSlides();
    sliderEvents();
  }

  return {
    init: init,
  }
})();

const MainSliderRevealAll = (function() {
  let slider;
  let items;
  let headerBar;
  let headerItems;

  function initVars() {
    slider = document.querySelector('.js-mainSlider-type-all');
    items = document.querySelectorAll('.js-mainSlider-type-all .js-all-item');
    headerItems = document.querySelectorAll('.js-header .js-header-item');
  }

  function prepareAnimation() {
    if (!document.querySelector('.js-mainSlider-type-all')) {
      return;
    }

    initVars();

    gsap.set([headerItems, items], {
      opacity: 0,
      y: '34px',
    })
  }

  function animate() {
    if (!document.querySelector('.js-mainSlider-type-all')) {
      return;
    }
    
    gsap.timeline()
      .to(headerItems, {
        duration: 0.8,
        ease: 'power3.out',
        y: '0%',
        opacity: 1,
      })
      .to(items, {
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        y: '0%',
        opacity: 1,
      }, '>-0.2')
  }

  return {
    prepareAnimation: prepareAnimation,
    animate: animate,
  }
})();
