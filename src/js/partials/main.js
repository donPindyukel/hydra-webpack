//
// Для теста
//

let modal = modal('.modal');

el('.open').clickEvent(function () {
    modal.show('.modal-main');
});

el('.close').clickEvent(function () {
    modal.hide('.modal-main');
});
