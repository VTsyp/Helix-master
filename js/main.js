(function() {
"use strict";

/*------------------------------------------------------------------

  01. Custom easings

-------------------------------------------------------------------*/

// GSAP: turn off console warnings
gsap.config({
	nullTargetWarn: false
});

window.App = {};

App.config = {
  headroom: {
    enabled: true,
    options: {
      classes : {
        initial : "headroom",
        pinned : "is-pinned",
        unpinned : "is-unpinned",
        top : "is-top",
        notTop : "is-not-top",
        bottom : "is-bottom",
        notBottom : "is-not-bottom",
        frozen: "is-frozen",
      },
    }
  },
  ajax: {
    enabled: true,
  },
  cursorFollower: {
    enabled: true,
    disableBreakpoint: '992', // cursor will be disabled on this device width
  },
}

App.html = document.querySelector('html');
App.body = document.querySelector('body');
App.SMcontroller = new ScrollMagic.Controller();

window.onload = function () {
  customEasingsInit();
  pageRevealEffects();
  Preloader.init();
  

  document.fonts.ready.then(function () {
    initComponents();

    initialReveal(() => {
      MainSliderReveal.animate();
      MainSliderReveal2.animate();
      MainSliderReveal3.animate();
      MainSliderReveal4.animate();
      MainSliderReveal5.animate();
      MainSliderReveal9.animate();
      MainSliderRevealAll.animate();
    });
  });
}


// Reloads all scripts when navigating through pages
function initComponents() {
  lazyLoading();
  SectionSlider();
  Header.init();

  MainSlider.init();
  MainSlider2.init();
  MainSlider3.init();
  MainSlider4.init();
  MainSlider5.init();
  MainSlider9.init();
  MainSliderAll.init();

  Cursor.init();
  splitTextIntoLines();
  parallaxInit();
  sidebar();
  searchbar();
  mobileMenu();
  Accordion.init();
  Tabs.init();
  feather.replace();

  masonryFilterInit();
  masonryGridInit();

  mapInit();
  backButton();
  comingSoon();
  pinOnScroll();
  galleryInit();
  inputCounter();

  Header.headerSticky();
  PJAX.init();
  customSelect();
  someSlider();

  //
	// your custom plugins init here
  //
}


function someSlider() {
  const slider = document.querySelector('.js-shop-slider .js-slider-slider');

  const sliderInstance = new Swiper(slider, {
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

  const sliderPaginationItems = document.querySelectorAll('.js-shop-slider .js-slider-pagination > *');

  sliderInstance.on('slideChangeTransitionStart', function () {
    sliderPaginationItems[sliderInstance.activeIndex].classList.add('is-active');
  });

  for (let i = 0; i < sliderPaginationItems.length; i++) {
    const el = sliderPaginationItems[i];
    
    el.addEventListener('click', (e) => {
      sliderInstance.slideTo(i)
    })
  }
}

function customSelect() {
  const target = document.querySelectorAll(".js-selectize");
  if (!target) return;
  target.forEach(function(select) {
    NiceSelect.bind(select);
  });

  const target2 = document.querySelectorAll(".js-selectize-seachable");
  if (!target2) return;
  target2.forEach(function(select) {
    NiceSelect.bind(select, { searchable: true });
  });
}

function inputCounter() {
  const target = document.querySelector('.js-input-counter');
  if (!target) return;

  const input = target.querySelector('input')
  var value = input.value;

  target.querySelector('.js-up').addEventListener('click', () => {
    input.focus();
    value = parseInt(value) + 1;
    input.value = value;
  })

  target.querySelector('.js-down').addEventListener('click', () => {
    input.focus();
    value = parseInt(value) - 1;
    value = value < 0 ? 0 : value;
    input.value = value;
  })
}

function galleryInit() {
  GLightbox({
    selector: '.js-gallery',
    touchNavigation: true,
    loop: false,
    autoplayVideos: true,
  });
}

function pinOnScroll() {
  const target = document.querySelectorAll('.js-pin-container');
  if (!target) return;

  target.forEach(el => {
    const sceneDuration = el.offsetHeight;
    const sceneOffset = el.querySelector('.js-pin-content').offsetHeight + 20;

    const scene = new ScrollMagic.Scene({
      duration: sceneDuration - sceneOffset,
      offset: sceneOffset,
      triggerElement: el,
      triggerHook: "onEnter",
    })
    .setPin(".js-pin-content")
    .addTo(App.SMcontroller)

    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    if (width < 992) {
      scene.duration('1px');
      scene.refresh();
    } else {
      scene.duration(sceneDuration - sceneOffset);
      scene.refresh();
    }

    window.addEventListener('resize', () => {
      let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

      if (width < 992) {
        scene.duration('1px');
        scene.refresh();
      } else {
        scene.duration(sceneDuration - sceneOffset);
        scene.refresh();
      }
    })
  });
}

function comingSoon() {
  const target = document.querySelector('.js-soon-timer');
  if (!target) return;

  var countDownDate = new Date("Jan 5, 2022 15:37:25").getTime();

  var x = setInterval(function() {
    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector('.js-soon-days').innerHTML = days;
    document.querySelector('.js-soon-hours').innerHTML = hours;
    document.querySelector('.js-soon-minutes').innerHTML = minutes;
    document.querySelector('.js-soon-seconds').innerHTML = seconds;

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
}

function mapInit() {
  const target = document.querySelector("#map");
  if (!target) return;

  const map = L.map(target).setView([51.505, -0.09], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([51.5, -0.09]).addTo(map)
    .openPopup();
}

//=include('components/sliders/mainSlider.js')
//=include('components/sliders/mainSlider_2.js')
//=include('components/sliders/mainSlider_3.js')
//=include('components/sliders/mainSlider_4.js')
//=include('components/sliders/mainSlider_5.js')
//=include('components/sliders/MainSlider_9.js')
//=include('components/sliders/MainSlider_all.js')

//=include('components/accordion.js')
//=include('components/tabs.js')

//=include('components/sidebar.js')
//=include('components/lazyLoading.js')
//=include('components/SectionSlider.js')
//=include('components/customEasings.js')
//=include('components/preloader.js')
//=include('components/menu.js')
//=include('components/pageReveal.js')
//=include('components/cursor.js')
//=include('components/revealAnim.js')
//=include('components/contact.js')
//=include('components/lazyLoading.js')
//=include('components/parallax.js')
//=include('components/backButton.js')
//=include('components/scrollDown.js')
//=include('components/video.js')
//=include('components/scrollToId.js')
//=include('components/PJAX.js')
//=include('components/isotopeInit.js')

})();
