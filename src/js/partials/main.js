//
// $('.js-modal').modalShow();
//
// setTimeout(function () {
//     $('.js-modal').modalHide();
// }, 2000);

$('.js-filter').buttonFilter('.js-content');

$('.js-input').fieldEventValidate();

$('.js-ajax-form').formAjax(function (data) {
    log(data);
}, true);