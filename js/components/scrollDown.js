/*--------------------------------------------------
  14. Scroll down button
---------------------------------------------------*/

function uiScrollDown() {

  const target = document.querySelector('.js-ui-scroll-button');

  if (!target) return;

  const destination = document.querySelector('section:nth-of-type(2)');

  target.addEventListener('click', () => {
    gsap.to(window.document.documentElement, {
      duration: 1,
      ease: 'power2.inOut',
      scrollTo: destination.offsetTop,
    });
  })

}
