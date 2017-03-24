//
//
//

let form = el_form('.ajax-form');

form[0].serialize();

each(form[0].formFields, function (th) {
   th.eventValidate('validate-success', 'validate-error');
});

form[0].eventSubmit(function (response, status) {
   log(response);
}, true);