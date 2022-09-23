/*--------------------------------------------------
  06. Elements reveal
---------------------------------------------------*/

const RevealAnim = (function() {

  function single() {
    const animationTarget = document.querySelectorAll('[data-anim]');
    if (!animationTarget.length) return;

    for (let i = 0; i < animationTarget.length; i++) {
      const el = animationTarget[i];
    
      new ScrollMagic.Scene({
        offset: '160px',
        triggerElement: el,
        triggerHook: "onEnter",
        reverse: false,
      })
      .on('enter', function (event) {
        animateElement(el);
      })
      .addTo(App.SMcontroller)
    }
  }
  
  function container() {
  
    const animationContainer = document.querySelectorAll('[data-anim-wrap]');
  
    if (!animationContainer.length) {
      return;
    }
    
    for (let i = 0; i < animationContainer.length; i++) {
      const el = animationContainer[i];
    
      new ScrollMagic.Scene({
        offset: '160px',
        triggerElement: el,
        triggerHook: "onEnter",
        reverse: false,
      })
      .on('enter', function (event) {
        
        const animChilds = el.querySelectorAll('[data-anim-child]');
        el.classList.add('animated');
        animChilds.forEach(el => animateElement(el));
        
      })
      .addTo(App.SMcontroller)
    }
  
  }
  

  function animateElement(target) {
    
    let attrVal;
    let animDelay;
    let attrDelayPart;
  
    if (target.getAttribute('data-anim')) {
      attrVal = target.getAttribute('data-anim');
    } else {
      attrVal = target.getAttribute('data-anim-child');
    }
    
    if (attrVal.includes('delay-')) {
      attrDelayPart = attrVal.split(' ').pop();
      animDelay = attrDelayPart.substr(attrDelayPart.indexOf('-') + 1) / 10;
    }
  
    if (attrVal.includes('counter')) {
      counter(target, animDelay);
    }
    else if (attrVal.includes('line-chart')) {
      lineChart(target, animDelay);
    }
    else if (attrVal.includes('pie-chart')) {
      pieChart(target, animDelay);
    }
    else if (attrVal.includes('split-lines')) {
      splitLines(target, animDelay);
    }
    else {
      target.classList.add('is-in-view');
    }

  }

  function pieChart(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-percent');
    const chartBar = target.querySelector('.js-chart-bar');
    
    if (counterVal < 0) { counterVal = 0;}
    if (counterVal > 100) { counterVal = 100;}
    
    gsap.fromTo(chartBar, {
      drawSVG: `0%`,
    }, {
      delay: 0.3 + animDelay,
      duration: 1.4,
      ease: 'power3.inOut',
      drawSVG: `${counterVal}%`,
  
      onStart: () => {
        chartBar.classList.remove('bar-stroke-hidden');
      }
    });
  
  
    let object = { count: 0 };
    const barPercent = target.querySelector('.js-chart-percent');
  
    gsap.to(object, {
      count: counterVal,
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        barPercent.innerHTML = Math.round(object.count) + '%';
      },
    });
  
  }
  
  function lineChart(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-percent');
  
    gsap.fromTo(target.querySelector('.js-bar'), {
      scaleX: 0,
    }, {
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      scaleX: counterVal / 100,
    })
  
  
    let object = { count: 0 };
    const barPercent = target.querySelector('.js-number');
  
    gsap.to(object, {
      count: counterVal,
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        barPercent.innerHTML = Math.round(object.count);
      },
    });
  
  }
  
  function counter(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-counter');
    const counterAdd = target.getAttribute('data-counter-add');
    const totalDelay = animDelay;
    let symbols = '';
    
    let object = { count: 0 };
    const counterNum = target.querySelector('.js-counter-num');

    if (counterAdd) {
      symbols = counterAdd;
    }
  
    gsap.to(object, {
      count: counterVal,
      delay: totalDelay,
      duration: 1.8,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        counterNum.innerHTML = Math.round(object.count) + symbols;
      },
    });
  
  }
  
  function splitLines(target, animDelay = 0) {
  
    const lines = target.querySelectorAll('.split__line');

    gsap.to(lines, {
      delay: animDelay,
      stagger: 0.08,
      duration: 0.85,
      ease: 'power2.out',
      y: '0%',
    });
  
  }


  function init() {

    single();
    container();

  }


  return {
    init: init,
  }

})();


function splitTextIntoLines() {
  
  let target;

  if (App.body.classList.contains('page-reveal-off')) {
    target = document.querySelectorAll("[data-split='lines']:not([data-split-page-reveal])");
  } else {
    target = document.querySelectorAll("[data-split='lines']");
  }

  if (!target.length) return;

  target.forEach(el => {
    let content;
    let test = el.querySelectorAll('* > *:not(br):not(span)');

    if (test.length > 0) {
      content = el.querySelectorAll('* > *:not(br):not(span)');
    }

    new SplitText(content, {
      type: 'lines',
      linesClass: 'overflow-hidden',
    });

    content.forEach(el => {
      const lines = el.querySelectorAll('.overflow-hidden');

      new SplitText(lines, {
        type: 'lines',
        linesClass: 'split__line',
      });
    });

    gsap.set(el.querySelectorAll('.split__line'), {
      y: '100%',
    })
  });

}


function splitIntoLines(target) {
  if (!target) return;

  let content;
  let test = target.querySelectorAll('* > *:not(br):not(span)');

  if (test.length > 0) {
    content = target.querySelectorAll('* > *:not(br):not(span)');
  }

  new SplitText(content, {
    type: 'lines',
    linesClass: 'overflow-hidden',
  });

  content.forEach(el => {
    const lines = el.querySelectorAll('.overflow-hidden');

    new SplitText(lines, {
      type: 'lines',
      linesClass: 'split__line',
    });
  });

  gsap.set(target.querySelectorAll('.split__line'), {
    y: '100%',
  })
}
