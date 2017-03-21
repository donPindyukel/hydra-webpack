//
// Для теста
//


let elm = el_button('.button');

let modalWindow = el_modal('.modal');

el('.open').eventClick(function () {
    modalWindow.show();
});

el('.close').eventClick(function () {
    modalWindow.hide();
});


