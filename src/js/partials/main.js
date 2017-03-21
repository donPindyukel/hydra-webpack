//
// Для теста
//

let modal = new Modal('.modal');

el('.open').clickEvent(function () {
   modal.show('.modal-main');
});

el('.close').clickEvent(function () {
   modal.hide('.modal-main');
});
