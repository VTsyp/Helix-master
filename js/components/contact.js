/*--------------------------------------------------
	09. Contact form
---------------------------------------------------*/

function contactForm() {

  const form = document.querySelector(".js-ajax-form");
  
  if (!form) {
    return;
  }

  const formAlert = form.querySelector('.js-ajax-form-alert');
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let validForm = true;
    let formData = {};
    formAlert.classList.remove('is-active');
    formAlert.classList.remove('is-success');
    formAlert.classList.remove('is-error');
    const inputGroups = form.querySelectorAll('.js-input-group');


    form.querySelectorAll('.form__error').forEach(el => {
      el.innerHTML = '';
      el.classList.remove('is-active');
    });
    form.querySelectorAll('.-error').forEach(el => {
      el.classList.remove('-error');
    });


    for (let i = 0; i < inputGroups.length; i++) {
      const el = inputGroups[i];
      
      let field;
      
      if (el.querySelector('input')) {
        field = el.querySelector('input');
      } else if (el.querySelector('textarea')) {
        field = el.querySelector('textarea');
      }

      let fieldName = field.getAttribute('name');
      let fieldValue = field.value;
      let errorField = el.querySelector('.form__error');

      
      if (field.hasAttribute('data-required') && !fieldValue) {
        field.classList.add('-error');
        validForm = false;
        errorField.classList.add('is-active');
        errorField.innerHTML = 'Please fill this field';
        continue;
      }
    
      if (field.getAttribute('name') === 'email') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) {
          field.classList.add('-error');
          validForm = false;
          errorField.classList.add('is-active');
          errorField.innerHTML = 'Please enter correct email';
          continue;
        }
      }
    
      formData[fieldName] = fieldValue;
    }


    if (!validForm) return;

    let requestData = '';
    let request = new XMLHttpRequest();
    let dataArray = [];

    for (let property in formData) {
      dataArray.push(`${property}=${formData[property]}`);
      requestData = dataArray.join('&');
    }
    
    setTimeout(() => {
      request.onreadystatechange = function() {
        setTimeout(() => {
          if (this.readyState == 4 && this.status == 200) {
            formAlert.classList.add('is-active');
            formAlert.classList.add('is-success');
            formAlert.querySelector('.ajax-form-alert__content').innerHTML = form.getAttribute('data-message-success');
          } else {
            formAlert.classList.add('is-active');
            formAlert.classList.add('is-error');
            formAlert.querySelector('.ajax-form-alert__content').innerHTML = form.getAttribute('data-message-error');
          }
        }, 400);
      };
  
      request.open("POST", "kontakt.php", true);
      request.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded",
      );
      request.send(requestData);
    }, 1000);
  });

}
