/*--------------------------------------------------
  04. Page reveals
---------------------------------------------------*/

function pageRevealEffects() {

  // masthead shapes
  gsap.registerEffect({
    name: 'mastheadShapes',
    effect: (target, config) => {

      return gsap.fromTo(target, {
        opacity: 0,
        y: config.y,
      }, {
        ease: config.easing,
        duration: config.duration,
        opacity: 1,
        y: '0%',
      })
  
    },
    extendTimeline: true,
    defaults: {
      easing: 'quart.out',
      duration: 3.0,
      y: '90%',
    },
  });

  // header, menu and ui elements
  gsap.registerEffect({
    name: 'uiElementsAnimate',
    effect: (target, config) => {

      let headerLogo;
      let headerMenu;
      let classicMenu;
      let uiElements;

      if (document.querySelector('.js-header-logo')) {
        headerLogo = document.querySelector('.js-header-logo');
      }
      if (document.querySelector('.js-header-menu')) {
        headerMenu = document.querySelector('.js-header-menu');
      }
      if (document.querySelector('.js-navClassic-list > li > a')) {
        classicMenu = document.querySelectorAll('.js-navClassic-list > li > a');
      }
      if (document.querySelector('.js-ui')) {
        uiElements = document.querySelectorAll('.js-ui');
      }

      if (!headerLogo && !headerMenu && !uiElements && !classicMenu) return;

      return gsap.fromTo([
        headerLogo,
        headerMenu,
        classicMenu,
        uiElements,
      ], {
        y: config.y,
        opacity: 0,
      }, {
        ease: config.easing,
        duration: config.duration,
        y: '0px',
        opacity: 1,
      })
  
    },
    extendTimeline: true,
    defaults: {
      easing: 'quart.out',
      duration: 0.8,
      y: '30px',
    },
  });

  // masthead background
  gsap.registerEffect({
    name: 'mastheadBackground',
    effect: (target, config) => {

      return gsap.fromTo(target, {
        scale: 1.4,
        opacity: 0,
      }, {
        ease: 'quart.inOut',
        duration: 1.4,
        scale: 1,
        opacity: 1,
      })
  
    },
    extendTimeline: true,
  });

}


const PageReveal = (function() {

  function mastheadType_1(tl) {

    if (!document.querySelector('.js-masthead-type-1')) {
      return tl;
    }

    const masthead = document.querySelector('.js-masthead-type-1');
    let title = false;
    let text = masthead.querySelector('.js-text');
    let button = masthead.querySelector('.js-button');

    if (masthead.querySelector('.js-title')) {
      title = masthead.querySelectorAll('.js-title .split__line');
    }


    const splitTitle = {
      stagger: 0.1,
      duration: 1.2,
      ease: 'quart.out',
      y: '0%',
    };
    
    const textButton = {
      stagger: 0.1,
      duration: 1,
      ease: 'quart.out',
      y: '0%',
      opacity: 1,
    };


    gsap.set([text, button], {
      y: '35px',
      opacity: 0,
    })


    if (masthead.classList.contains('js-shapes')) {
      const shapes = masthead.querySelectorAll('.js-shape');

      tl
        .mastheadShapes(shapes, '>-0.7')
        .to(title, splitTitle, '>-2.3')
        .to([text, button], textButton, '>-0.8')
        .uiElementsAnimate(null, '>-0.8')
    }

    if (masthead.classList.contains('js-bg')) {
      const bgItem = masthead.querySelector('.js-bg-item');

      tl
        .mastheadBackground(bgItem, '>-0.0')
        .to(title, splitTitle, '>-0.5')
        .to([text, button], textButton, '>-0.8')
        .uiElementsAnimate(null, '>-0.8')
    }

  }

  function base(tl) {
    if (
      document.querySelector('.js-page-header') ||
      document.querySelector('.js-masthead-type-1') ||
      document.querySelector('.js-masthead-type-2') ||
      document.querySelector('.js-masthead-type-3') ||
      document.querySelector('.js-masthead-type-4') ||
      document.querySelector('.js-masthead-type-work-1') ||
      document.querySelector('.js-sliderMain-type-1') ||
      document.querySelector('.js-sliderMain-type-2') ||
      document.querySelector('.js-sliderMain-type-3') ||
      document.querySelector('.js-masthead-blog-article')
    ) {
      return tl;
    }

    tl.add(() => {
      RevealAnim.init();
    })
  }

  function init(tl) {
    MainSliderReveal.prepareAnimation()
    MainSliderReveal2.prepareAnimation()
    MainSliderReveal3.prepareAnimation()
    MainSliderReveal4.prepareAnimation()
    MainSliderReveal5.prepareAnimation()
    MainSliderReveal9.prepareAnimation()
    MainSliderRevealAll.prepareAnimation()

    tl.add(() => {
      MainSliderReveal.animate()
      MainSliderReveal2.animate()
      MainSliderReveal3.animate()
      MainSliderReveal4.animate()
      MainSliderReveal5.animate()
      MainSliderReveal9.animate()
      MainSliderRevealAll.animate()
    })

    base(tl);
  
    return tl;
  }

  return {
    init: init,
  }

})();


function initialReveal(callback) {
  let tl = gsap.timeline();
  tl.preloaderInitial();
  tl = PageReveal.init(tl);
  tl.add(function () { callback(); })
}
