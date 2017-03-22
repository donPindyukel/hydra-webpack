//
// Для теста
//


let modal = el_modal('.modal-main');

let button = el_button('.button.open');
let buttonClose = el_button('.button.close');

//
//
//

let input = el_form('.js-change');
input.eventValidate('validate-success', 'validate-error', 'length', 'valid', true);

/*input.eventChange(function (th) {
    console.log('this changed - ' + th.val());
});*/

//
//
//

let checkbox = el_form('.js-change-checkbox');
checkbox.eventValidate('validate-success', 'validate-error', 'checked', 'valid', false);

//
//
//

button.html("Открыть!");

button.eventClick(function (th) {
   modal.show('fadeIn');
   th.addClass('fadeIn');
});

buttonClose.eventClick(function () {
    modal.hide('fadeOut');
});

let buttonFilter = el_button('.filter');
buttonFilter.filter('.content');
