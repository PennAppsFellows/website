$(function() {
    // Validation and submission
    $('#vote-form').bootstrapValidator({
        live: 'disabled',
        message: 'This field is required',
        submitButtons: 'input[type="submit"]',
        submitHandler: function(validator, form, btn) {
            var $doneAlert = $('div#vote-container > div.alerts > div.alert-success'),
                $failAlert = $('div#vote-container > div.alerts > div.alert-danger');

            var xhr = $.post('/vote', form.serialize());
            xhr.done(function(data) {
                $doneAlert.removeClass('hidden');
                $failAlert.addClass('hidden');
            }).fail(function(data) {
                $failAlert.removeClass('hidden');
                $doneAlert.addClass('hidden');
            });
        },
        fields: {
            email: {
                enabled: true,
                validators: {
                    emailAddress: {
                        message: 'Invalid email address'
                    },
                    notEmpty: {
                        message: 'Email address is required'
                    }
                }
            },
            idea: {
                enabled: true,
                validators: {
                    notEmpty: {
                        message: 'No idea selected'
                    }
                }
            }
        }
    });
});
