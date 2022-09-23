/*--------------------------------------------------
  03. Sidebar
---------------------------------------------------*/

function sidebar() {
  const target = document.querySelector('.js-sidebar')
  const openButton = document.querySelector('.js-sidebar-open')
  const closeButton = document.querySelector('.js-sidebar-close')
  if (!target || !openButton || !closeButton) return;

  openButton.addEventListener('click', () => target.classList.add('is-open'))
  closeButton.addEventListener('click', () => target.classList.remove('is-open'))
}


function searchbar() {
  const target = document.querySelector('.js-headerSearch')
  if (!target) return;
  const field = target.querySelector('input')
  const openButton = document.querySelector('.js-headerSearch-open')
  const closeButton = target.querySelector('.js-headerSearch-close')

  openButton.addEventListener('click', () => {
    target.classList.add('is-open')
    field.focus()
  })
  closeButton.addEventListener('click', () => target.classList.remove('is-open'))
}


function mobileMenu() {
  const target = document.querySelector('.js-mobileMenu')
  const openButton = document.querySelector('.js-mobileMenu-open')
  if (!target || !openButton) return;

  openButton.addEventListener('click', () => {
    target.classList.toggle('is-open')
    App.html.classList.toggle('overflow-hidden')
  })
  // closeButton.addEventListener('click', () => target.classList.remove('is-open'))
}
