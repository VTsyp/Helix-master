/*--------------------------------------------------
  08. Section sliders
---------------------------------------------------*/

function SectionSlider() {
  const sectionSlider = document.querySelectorAll('.js-sectionSlider');

  if (!sectionSlider.length) return;

  for (let i = 0; i < sectionSlider.length; i++) {
    const el = sectionSlider[i];
    
    let gap = 0;
    let loop = false;
    let centered = false;
    let pagination = false;

    if (el.getAttribute('data-gap'))    gap = el.getAttribute('data-gap');
    if (el.hasAttribute('data-loop'))   loop = true;
    if (el.hasAttribute('data-center')) centered = true;

    if (el.hasAttribute('data-pagination')) {
      pagination = {
        el: el.querySelector('.js-pagination'),
        bulletClass: 'pagination__item',
        bulletActiveClass: 'is-active',
        bulletElement: 'div',
        clickable: true
      };
    }
   
    const colsArray = el.getAttribute('data-slider-col').split(' ');

    let cols_base = 1;
    let cols_lg = 1;
    let cols_md = 1;
    let cols_sm = 1;

    colsArray.forEach(el => {
      if (el.includes('base')) cols_base = el.slice(-1);
      if (el.includes('lg')) cols_lg = el.slice(-1);
      if (el.includes('md')) cols_md = el.slice(-1);
      if (el.includes('sm')) cols_sm = el.slice(-1);
    });

    new Swiper(el, {
      speed: 800,
      autoHeight: true,
      spaceBetween: parseInt(gap),
      centeredSlides: centered,
      parallax: true,
      watchSlidesVisibility: true,

      loop: loop,
      loopAdditionalSlides: 1,
      preloadImages: false,
      lazy: true,
      
      lazy: {
        loadPrevNext: true,
      },

      slidesPerView: parseInt(cols_base),

      breakpoints: {
        1199: { slidesPerView: parseInt(cols_lg) },
        991:  { slidesPerView: parseInt(cols_md) },
        767:  { slidesPerView: parseInt(cols_sm) },
      },

      navigation: {
        prevEl: el.querySelector('.js-prev'),
        nextEl: el.querySelector('.js-next'),
      },

      pagination: pagination,
    });
  }
}
