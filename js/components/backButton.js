/*--------------------------------------------------
  13. To top button
---------------------------------------------------*/

function backButton() {
  const button = document.querySelector('.js-backButton');
  if (!button) return;

  const scrollElement = window.document.documentElement;

  const duration = () => {
    if (scrollElement.scrollTop < 1600) {
      return 1;
    } else {
      return 2.2;
    }
  }

  button.addEventListener('click', () => {
    gsap.to(scrollElement, {
      duration: duration(),
      ease: 'power2.inOut',
      scrollTo: 0,
    });
  })

//   new ScrollMagic.Scene({
//     offset: '400px',
//   })
//     .setClassToggle(button, 'is-visible')
//     .addTo(App.SMcontroller);
}
