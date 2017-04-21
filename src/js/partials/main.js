

//el('#modal', 'modal').show();

el('.text', 'field').eventValidate();

el('.ajax-form', 'form').eventSubmit((response, error) => {
    log("response");
}, true);

log(el('.ajax-form', 'form').serialize());

let lazy = el('.showscroll', 'lazy');
lazy.showIfVisible();
log(lazy.offsetTop());