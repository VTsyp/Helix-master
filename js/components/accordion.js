const Accordion = (function() {
  function init() {
    const targets = document.querySelectorAll(".js-accordion");

    if (!targets) return;

    for (let i = 0; i < targets.length; i++) {
      const items = targets[i].querySelectorAll('.accordion__item');

      for (let l = 0; l < items.length; l++) {
        items[l].addEventListener("click", (e) => {
          items[l].classList.toggle('is-active');
          const content = items[l].querySelector('.accordion__content');
  
          if (content.style.maxHeight) {
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        });
      }
    }
  }

  return {
    init: init,
  }
})();