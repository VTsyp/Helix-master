const MainSlider2 = (function() {
  let sliderInstance;
  let currentIndex = 0;

  function sliderInit() {
    const slider = document.querySelector('.js-mainSlider-type-2');
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

    const pagination = slider.querySelectorAll('.js-pagination > div')

    for (let i = 1; i < pagination.length + 1; i++) {
      pagination[i - 1].innerHTML = '0' + i;
    }
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
    const slider = document.querySelector('.js-mainSlider-type-2');
    if (!slider) return;
    const lines = slider.querySelectorAll('.js-title .split__line')
    const text = slider.querySelectorAll('.js-text')
    const button = slider.querySelectorAll('.js-button')

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
    const slider = document.querySelector('.js-mainSlider-type-2');
    if (!slider) return;
    sliderInit();
    hideSlides();
    sliderEvents();
  }

  return {
    init: init,
  }
})();

const MainSliderReveal2 = (function() {
  let slider;
  let content;
  let title;
  let text;
  let titleLines;
  let button;
  let paginationNumbers;
  let socials;
  let pagination;
  let scroll;
  let header;
  let headerBar;
  let headerItems;

  function initVars() {
    slider = document.querySelector('.js-mainSlider-type-2');
    content = slider.querySelector('.js-content');
    title = content.querySelector('.js-title');
    titleLines = content.querySelectorAll('.js-title-wrap .split__line');
    text = content.querySelector('.js-text');
    button = content.querySelector('.js-button');
    paginationNumbers = document.querySelector('.js-pag-numbers');
    socials = document.querySelector('.js-socials');
    pagination = document.querySelector('.js-pag');
    scroll = document.querySelector('.js-scroll');
    header = document.querySelector('.js-header');
    headerBar = document.querySelector('.js-header-bar');
    headerItems = document.querySelectorAll('.js-header .js-header-item');
  }

  function prepareAnimation() {
    if (!document.querySelector('.js-mainSlider-type-2')) {
      return;
    }

    initVars();

    gsap.set(headerBar, {
      opacity: 0,
      y: '34px',
    })
    
    gsap.set([text, button, paginationNumbers, socials, pagination, scroll], {
      opacity: 0,
      y: '34px',
    })
  }

  function animate() {
    if (!document.querySelector('.js-mainSlider-type-2')) {
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
      .to(text, {
        delay: 0.4,
        duration: 1,
        ease: 'power3.out',
        opacity: 1,
        y: '0%',
      }, '>-1.0')
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
