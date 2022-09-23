/*--------------------------------------------------
  03. Header
---------------------------------------------------*/

const Header = (function() {

  let menu;
  let mobileBg;
  let navList;
  let mobileFooter;
  let navListLinks;
  
  let navBtnOpen;
  let navBtnClose;
  let navBtnListBack;

  let menuDeepLevel;
  let timeline = gsap.timeline();

  function updateVars() {
    menu = document.querySelector('.js-menu');
    mobileBg = menu.querySelector('.js-mobile-bg');
    mobileFooter = menu.querySelector('.js-mobile-footer');
    navList = document.querySelector('.js-navList');
    navListLinks = document.querySelectorAll('.js-navList > li > a');

    navBtnOpen = document.querySelector('.js-nav-open');
    navBtnClose = document.querySelector('.js-nav-close');
    navBtnListBack = document.querySelector('.js-nav-list-back');
    menuDeepLevel = 0;
  }

  
  function init() {
    updateVars();
    menuListBindEvents();
    menuAnimBindEvents();
    classicMenuInit();
    // headerSticky();
  }

  function deepLevelCheck(level, htmlText = '') {
    if (level) {
      gsap.to(navBtnListBack, {
        ease: "quart.inOut",
        duration: 0.6,
        y: '0px',
        opacity: 1,
        onStart: () => {
          navBtnListBack.classList.remove('pointer-events-none');
          navBtnListBack.querySelector('a').innerHTML = htmlText;
        },
      })

      gsap.to(mobileFooter, {
        ease: "quart.inOut",
        duration: 0.6,
        opacity: 0,
        onStart: () => {
          mobileFooter.classList.add('pointer-events-none');
        },
      })
    } else {
      gsap.to(navBtnListBack, {
        ease: "quart.inOut",
        duration: 0.6,
        opacity: 0,
        onStart: () => {
          navBtnListBack.classList.add('pointer-events-none');
        },
      })

      gsap.to(mobileFooter, {
        ease: "quart.inOut",
        duration: 0.6,
        opacity: 1,
        onStart: () => {
          mobileFooter.classList.remove('pointer-events-none');
        },
      })
    }
  }

  function menuListBindEvents() {
    const listItems = document.querySelectorAll('.js-navList .menu-item-has-children');
    if (!listItems.length) return;

    navBtnListBack.addEventListener('click', () => {
      const visibleList = navList.querySelector('ul.is-active');
      const parentList = visibleList.parentElement.parentElement;

      menuDeepLevel--;

      deepLevelCheck(menuDeepLevel, parentList.parentElement.querySelector('li > a').innerHTML);
      menuListStepAnimate(visibleList, parentList);
    });
    
    listItems.forEach(el => {
      const parentLink = el.querySelector('li > a');
      parentLink.removeAttribute('href');

      parentLink.addEventListener('click', () => {
        const parent = el.parentElement;
        const subnavList = el.lastElementChild;

        menuDeepLevel++;

        deepLevelCheck(menuDeepLevel, parentLink.innerHTML);
        menuListStepAnimate(parent, subnavList);
      });
    });
  }

  function menuListStepAnimate(hideList, showList) {
    const navBtnClose = document.querySelector('.js-nav-close');
    
    let hideListItems = hideList.children;
    hideListItems = Array.from(hideListItems);
    const hideListLinks = hideListItems.map(item => item.querySelector('li > a'));
    
    let showListItems = showList.children;
    showListItems = Array.from(showListItems);
    const showListLinks = showListItems.map(item => item.querySelector('li > a'));

    timeline
      .clear()
      .to(hideListLinks, {
        ease: 'quart.out',
        stagger: -0.04,
        duration: 1.0,
        y: '100%',
        onStart: () => {
          showList.classList.add('is-active');
          hideList.classList.remove('is-active');
          navBtnClose.classList.add('pointer-events-none');
        },
      })
      .to(showListLinks, {
        ease: 'quart.out',
        stagger: 0.08,
        duration: 1.2,
        y: '0%',
        onComplete: () => {
          navBtnClose.classList.remove('pointer-events-none');
        },
      }, '>-0.6')
  }

  function menuAnimBindEvents() {
    if (!navBtnOpen) return;

    navBtnOpen.addEventListener('click', () => {
      App.html.classList.add('html-overflow-hidden');
      showMenu();
    });

    navBtnClose.addEventListener('click', () => {
      App.html.classList.remove('html-overflow-hidden');
      hideMenu();
    })
  }

  function showMenu() {

    menu.classList.add('is-active');

    gsap.timeline()
      .set(navListLinks, { opacity: 1, })
      .set(navBtnListBack, { opacity: 0, })

      .fromTo(mobileBg, {
        scaleY: 0,
      }, {
        scaleY: 1,
        duration: 0.8,
        ease: "quart.inOut",
        onStart: () => {
          navBtnOpen.classList.add('pointer-events-none');
        }
      })

      .fromTo(navBtnOpen, {
        y: '0px',
        opacity: 1,
      }, {
        ease: "quart.out",
        duration: 0.8,
        y: '-16px',
        opacity: 0,
      }, '>-0.2')
      .fromTo(navBtnClose, {
        y: '16px',
        opacity: 0,
      }, {
        ease: "quart.out",
        duration: 0.8,
        y: '0px',
        opacity: 1,
      }, '<0.2')

      .fromTo(navListLinks, {
        y: '100%',
      }, {
        ease: 'quart.out',
        stagger: 0.08,
        duration: 1.2,
        y: '0%',
      }, '>-0.7')
      .fromTo(mobileFooter, {
        y: '30px',
        opacity: 0,
      }, {
        ease: 'quart.out',
        duration: 1.2,
        y: '0px',
        opacity: 1,
        onComplete: () => {
          navList.classList.add('is-active');
          navBtnClose.classList.remove('pointer-events-none');
        }
      }, '>-0.5')

  }

  function hideMenu() {
    const navVisibleList = menu.querySelector('.is-active');
    const navActiveListLinks = menu.querySelectorAll('.is-active > li > a');
    menuDeepLevel = 0;

    gsap.timeline()
      .to([navBtnClose, navBtnListBack, mobileFooter], {
        ease: "quart.out",
        duration: 0.6,
        opacity: 0,
        y: '-16px',
        onStart: () => {
          navBtnClose.classList.add('pointer-events-none');
          navVisibleList.classList.remove('is-active');
          mobileBg.classList.add('origin-top');
        },
      })

      .fromTo(navBtnOpen, {
        y: '16px',
        opacity: 0,
      }, {
        ease: "quart.out",
        duration: 0.7,
        y: '0px',
        opacity: 1,
      }, '<0.1')

      .to(navActiveListLinks, {
        ease: "quart.out",
        duration: 0.8,
        y: '-100%',
      }, '>-0.6')

      .to(mobileBg, {
        ease: "quart.inOut",
        duration: 0.8,
        scaleY: 0,
        onComplete: () => {
          navBtnOpen.classList.remove('pointer-events-none');
          mobileBg.classList.remove('origin-top');
          menu.classList.remove('is-active');
        },
      }, '>-0.6')

  }

  function classicMenuInit() {

    const target = document.querySelectorAll('.js-navClassic-list .menu-item-has-children');
  
    if (!target.length) return;
  
    const header = document.querySelector('.header');
    let dropDownTheme;
  
    if (header.classList.contains('js-header-dark')) {
      dropDownTheme = 'dark';
    } else {
      dropDownTheme = 'light';
    }
  
    target.forEach(el => {
      let subnav = el.children;
      let where = 'bottom';
      subnav = subnav[subnav.length - 1];

      if (
        el.closest(".menu-item-has-children") &&
        el.closest(".subnav-list")
      ) {
        where = 'right';
      }
      
      tippy(el, {
        interactive: true,
        content: subnav,
        allowHTML: true,
        placement: where,
        offset: [40, 0],
        delay: [null, 200],
  
        theme: dropDownTheme,
        animation: 'shift',
  
        popperOptions: {
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['left-start'],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                altAxis: true,
              },
            },
          ],
        },
      });
    });
  
  }
  
  function headerSticky() {
    const header = document.querySelector('.js-header');
    if (!header) return;
  
    new ScrollMagic.Scene({
      offset: '6px',
    })
      .setClassToggle(header, 'is-sticky')
      .addTo(App.SMcontroller);
  }


  return {
    headerSticky: headerSticky,
    init: init,
  }

})();
