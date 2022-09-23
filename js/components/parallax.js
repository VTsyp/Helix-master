/*--------------------------------------------------
  12. Parallax
---------------------------------------------------*/

function parallaxInit() {
  if (!document.querySelector('[data-parallax]')) {
    return;
  }
  
  const target = document.querySelectorAll('[data-parallax]');

  target.forEach(el => {
    const value = el.getAttribute('data-parallax');

    jarallax(el, {
      speed: value,
      imgElement: '[data-parallax-target]',
    });
  });
}
