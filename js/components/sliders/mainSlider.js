const MainSlider = (function() {
  // const slider = document.querySelector('.js-slider');
  let sliderInstance;
  let currentIndex = 0;

  function sliderInit() {
    sliderInstance = new Swiper(document.querySelector('.js-slider'), {
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
    });
  }

  function numberPagination() {
    const pagination = document.querySelector('.js-slider .js-pag-numbers');
    const current = pagination.querySelector('.js-current');
    const all = pagination.querySelector('.js-all');

    current.innerHTML = '01';
    all.innerHTML = '0' + sliderInstance.slides.length;

    sliderInstance.on('slideChangeTransitionStart', function () {
      current.innerHTML = `0${sliderInstance.activeIndex + 1}`;
    });
  }

  function pagination() {
    const pagination = document.querySelector('.js-slider .js-pag');
    const items = pagination.querySelectorAll('.js-pag-item');

    sliderInstance.on('slideChangeTransitionStart', function () {
      pagination.querySelector('.is-active').classList.remove('is-active');
      items[sliderInstance.activeIndex].classList.add('is-active');
    });

    for (let i = 0; i < items.length; i++) {
      const el = items[i];
      
      el.addEventListener('click', (e) => {
        sliderInstance.slideTo(i)
      })
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
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .set(lines, {
        y: '100%',
      })
      .set(button, {
        opacity: 0,
      });
  }

  function showContent(slide) {
    const lines = slide.querySelectorAll('.js-title .split__line')
    const button = slide.querySelector('.js-button')

    gsap.timeline()
      .to(lines, {
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        y: '0%',
      })
      .to(button, {
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, ">-0.3");
  }

  function init() {
    if (!document.querySelector('.js-slider')) return;
    sliderInit();
    sliderEvents();
    pagination();
    numberPagination();
  }

  return {
    init: init,
  }
})();

const MainSliderReveal = (function() {
  let slider;
  let content;
  let title;
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
    slider = document.querySelector('.js-slider');
    content = slider.querySelector('.js-content');
    title = content.querySelector('.js-title');
    titleLines = content.querySelectorAll('.js-title-wrap .split__line');
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
    if (!document.querySelector('.js-slider')) {
      return;
    }

    initVars();

    gsap.set(headerBar, {
      opacity: 0,
      y: '34px',
    })
    
    gsap.set([button, paginationNumbers, socials, pagination, scroll], {
      opacity: 0,
      y: '34px',
    })
  }

  function animate() {
    if (!document.querySelector('.js-slider')) {
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
      .to([paginationNumbers, socials, pagination, scroll], {
        stagger: 0.1,
        delay: 0.4,
        duration: 1,
        ease: 'power3.out',
        opacity: 1,
        y: '0px',
      }, '>-1.0');
  }

  return {
    prepareAnimation: prepareAnimation,
    animate: animate,
  }
})();
