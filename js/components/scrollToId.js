/*--------------------------------------------------
  16. Scroll to id
---------------------------------------------------*/

function scrollToIdInit() {

  const targets = document.querySelectorAll('.js-scroll-to-id');

  if (!targets.length) return;

  targets.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const id = el.getAttribute('href');
      const destination = document.querySelector(`#${id.slice(1)}`);

      // console.log(destination);
      // console.log(destination.offsetTop);

      gsap.to(window.document.documentElement, {
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTo: destination.offsetTop,
      });
    })
  });

}
