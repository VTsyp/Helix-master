function masthead_type_1(timeline, callback) {
    
  const headerLogo = document.querySelector('.js-header-logo');
  const headerMenu = document.querySelector('.js-header-menu');

  const masthead = document.querySelector('.js-masthead-type-1');

  const shape1 = masthead.querySelector('.js-shape-1');
  const shape2 = masthead.querySelector('.js-shape-2');
  const title = masthead.querySelector('.masthead__title');
  const text = masthead.querySelector('.masthead__text');
  const button = masthead.querySelector('.masthead__button');


  var instance = new SplitType(title, {
    split: 'lines',
    position: 'absolute',
  });


  timeline
  .add({
    targets: [shape1, shape2],
    delay: anime.stagger(400),
    duration: 1000,
    easing: 'easeOutQuart',
    opacity: [0, 1],
    scale: [0.85, 1],
  }, `-=${200}`)

  .add({
    targets: [headerLogo, headerMenu],
    duration: 800,
    easing: 'easeOutQuart',
    opacity: [0, 1],
    translateY: ['30px', 0],
  }, `-=${200}`)

  .add({
    targets: title.querySelectorAll('.line'),
    delay: anime.stagger(120),
    duration: 1200,
    easing: 'easeOutQuart',
    translateY: ['50%', 0],
    opacity: [0, 1],
  }, `-=${500}`)
  .add({
    targets: [text, button],
    delay: anime.stagger(160),
    duration: 1200,
    easing: 'easeOutQuart',
    opacity: [0, 1],
    translateY: ['40px', 0],
  }, `-=${800}`)

  .add({
    targets: masthead.querySelectorAll('.js-ui'),
    duration: 800,
    easing: 'easeOutQuart',
    opacity: [0, 1],
    translateY: ['30px', 0],
    complete: () => {
      if (callback && typeof(callback) === 'function') callback();
    },
  }, `-=${600}`)

}


// const scroll = new LocomotiveScroll({
//   el: document.querySelector('[data-scroll-container]'),
//   smooth: true,
//   inertia: 0.6,
// });


// enabled: true,
  // damping: 0.12,
  // renderByPixels: true,
  // continuousScrolling: false,
  // plugins: {
  //   edgeEasing: true
  // }
// var scroll = Scrollbar.init(document.querySelector('[data-scroll-container]'));



function sliderMain(timeline, callback) {

    const headerLogo = document.querySelector('.js-header-logo');
    const headerMenu = document.querySelector('.js-header-menu');
    const uiElements = document.querySelectorAll('.js-ui');

    const slider = document.querySelector('.js-sliderMain-type-1');
    const imgWrap = slider.querySelector('.sliderMain__img');
    const img = imgWrap.querySelector('.bg-image');

    const subtitle = slider.querySelector('.sliderMain__subtitle');
    const titleLarge = slider.querySelector('.sliderMain__bgTitle');
    const title = slider.querySelector('.sliderMain__title');
    const button = slider.querySelector('.sliderMain__button');


    timeline
    .add({
      targets: img,
      duration: 800,
      easing: 'easeInOutQuint',
      scale: [1.6, 1],
    }, '-=800')

    .add({
      targets: [subtitle, title, button],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutQuart',
      opacity: [0, 1],
      translateY: ['44px', 0],
    })
    .add({
      targets: titleLarge,
      duration: 800,
      easing: 'easeOutQuart',
      opacity: [0, 1],
      translateX: ['44px', 0],
    }, '-=600')

    .add({
      targets: [headerLogo, headerMenu, uiElements],
      duration: 800,
      easing: 'easeOutQuart',
      opacity: [0, 1],
      translateY: ['24px', 0],

      complete: function () {
        if (callback && typeof(callback) === 'function') {
          callback();
        }
      }
    }, '-=400')

}



function photoSwipeInit() {

  var pswpElement = document.querySelectorAll('.pswp')[0];

  // build items array
  var items = [
    {
      src: 'https://placekitten.com/600/400',
      w: 600,
      h: 400
    },
    {
      src: 'https://placekitten.com/1200/900',
      w: 1200,
      h: 900
    }
  ];

  // define options (if needed)
  var options = {
    // optionName: 'option value'
    // for example:
    index: 0 // start at first slide
  };

  // Initializes and opens PhotoSwipe
  var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
  gallery.init();

}



function widgetsLinksAddAttribte() {

  const target = document.querySelectorAll('.widget');

  if (!target.length) {
    return;
  }

  for (let i = 0; i < target.length; i++) {
    let newarer = target[i].querySelectorAll('a');

    for (let i = 0; i < newarer.length; i++) {
      newarer[i].setAttribute('data-barba', '');
    }
  }

}



const accordions = document.querySelectorAll('.js-accordion');
accordion(accordions);

function accordion(target) {
  target.forEach(el => {
    el.addEventListener("click", function() {
      this.classList.toggle("is-active");

      let target = el.querySelector('.accordion__content');

      if (target.style.maxHeight) {
        target.style.maxHeight = null;
      } else {
        target.style.maxHeight = target.scrollHeight + "px";
      }
    });
  });
}














// execute above function
initPhotoSwipeFromDOM('.js-gallery');

function initPhotoSwipeFromDOM(gallerySelector) {

  var parseThumbnailElements = function(el) {
    let thumbElements = el.childNodes;
    let numNodes = thumbElements.length;
    let items = [];
    let figureEl;
    let linkEl;
    let size;
    let item;

    for (var i = 0; i < numNodes; i++) {
      figureEl = thumbElements[i]; // <figure> element

      // include only element nodes 
      if (figureEl.nodeType !== 1) {
        continue;
      }

      linkEl = figureEl.children[0]; // <a> element

      size = linkEl.getAttribute('data-size').split('x');

      // create slide object
      item = {
        src: linkEl.getAttribute('href'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10)
      };

      if (figureEl.children.length > 1) {
        // <figcaption> content
        item.title = figureEl.children[1].innerHTML; 
      }

      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute('src');
      } 

      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }

    return items;
  };

  // find nearest parent element
  var closest = function closest(el, fn) {
      return el && ( fn(el) ? el : closest(el.parentNode, fn) );
  };

  var onThumbnailsClick = function(e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;

    var eTarget = e.target || e.srcElement;

    var clickedListItem = closest(eTarget, function(el) {
      return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
    });

    if (!clickedListItem) {
      return;
    }

    let clickedGallery = clickedListItem.parentNode;
    let childNodes = clickedListItem.parentNode.childNodes;
    let numChildNodes = childNodes.length;
    let nodeIndex = 0;
    let parallaxEl = document.querySelector('[data-parallax-target]');
    let index;

    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) { 
        continue;
      }

      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      
      nodeIndex++;
    }

    if (index >= 0) {
      openPhotoSwipe(index, clickedGallery);
    }

    return false;
  };

  var photoswipeParseHash = function() {
      var hash = window.location.hash.substring(1),
      params = {};

      if(hash.length < 5) {
          return params;
      }

      var vars = hash.split('&');
      for (var i = 0; i < vars.length; i++) {
          if(!vars[i]) {
              continue;
          }
          var pair = vars[i].split('=');  
          if(pair.length < 2) {
              continue;
          }           
          params[pair[0]] = pair[1];
      }

      if(params.gid) {
          params.gid = parseInt(params.gid, 10);
      }

      return params;
  };

  var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
    let pswpElement = document.querySelector('.pswp');
    let gallery;
    let options;
    let items;

    items = parseThumbnailElements(galleryElement);

    options = {
      galleryUID: galleryElement.getAttribute('data-pswp-uid'),
    }

    if (fromURL) {
      if(options.galleryPIDs) {
        // parse real index when custom PIDs are used 
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for(var j = 0; j < items.length; j++) {
          if(items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        // in URL indexes start from 1
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }

    if (isNaN(options.index)) {
      return;
    }

    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }

    gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };


  // loop through all gallery elements and bind events
  var galleryElements = document.querySelectorAll(gallerySelector);

  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute('data-pswp-uid', i+1);
    galleryElements[i].onclick = onThumbnailsClick;
  }

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }

}