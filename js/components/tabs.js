const Tabs = (function() {
  function init() {
    const targets = document.querySelectorAll(".js-tabs");
    if (!targets) return;

    targets.forEach(el => {
      singleTab(el)
    })
  }

  function singleTab(target) {
    const controls = target.querySelector('.js-tabs-controls');
    const controlsItems = target.querySelectorAll('.js-tabs-controls .tabs__button');
    const content = target.querySelector('.js-tabs-content');

    for (let l = 0; l < controlsItems.length; l++) {
      const el = controlsItems[l];
      
      el.addEventListener("click", (e) => {
        const selector = el.getAttribute('data-tab-target');

        controls.querySelector('.is-active').classList.remove('is-active')
        content.querySelector('.is-active').classList.remove('is-active')

        el.classList.add('is-active')
        content.querySelector(selector).classList.add('is-active')
      });
    }
  }

  return {
    init: init,
  }
})();