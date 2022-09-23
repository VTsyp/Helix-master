/*--------------------------------------------------
	10. Isotope grids
---------------------------------------------------*/

function masonryFilterInit() {

  const filterGrids = document.querySelectorAll('.section-filter');

  if (!filterGrids.length) {
    return;
  }

  for (let i = 0; i < filterGrids.length; i++) {
    const el = filterGrids[i];

    let iso = new Isotope(el.querySelector('.masonry'), {
      itemSelector: '.masonry__item',
      percentPosition: true,
      // horizontalOrder: true,

      layoutMode: 'packery',
      packery: {
        columnWidth: '.masonry__sizer',
      },
    });


    const filterButtons = el.querySelectorAll(".filter-button-group button");
  
    for (let i = 0; i < filterButtons.length; i++) {
      const el = filterButtons[i];

      el.addEventListener("click", () => {

        let someom = iso.getItemElements();
        someom.forEach(el => {
          el.classList.remove('is-active');
        });

        filterButtons.forEach(button => button.classList.remove('btn-active'));
        el.classList.add('btn-active');

        let filterValue = el.getAttribute('data-filter');
        iso.arrange({ filter: filterValue });

      });
    }
  }

}


function masonryGridInit() {

  const grids = document.querySelectorAll('.js-masonry.js-masonry-no-filter');

  if (!grids.length) {
    return;
  }

  for (let i = 0; i < grids.length; i++) {
    new Isotope(grids[i], {
      itemSelector: '.masonry__item',
      percentPosition: true,

      layoutMode: 'packery',
      packery: {
        columnWidth: '.masonry__sizer',
      },
    });
  }
  
}