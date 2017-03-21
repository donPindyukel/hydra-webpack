//
// Для теста
//


let modal = el_modal('.modal-main');

let button = el_button('.button.open');
let buttonClose = el_button('.button.close');

button.html("Открыть!");

button.eventClick(function (th) {
   modal.show('fadeIn');
});

buttonClose.eventClick(function () {
    modal.hide('fadeOut');
});

let buttonFilter = el_button('.filter');
buttonFilter.filter('.content');
