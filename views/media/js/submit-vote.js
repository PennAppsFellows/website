$(function() {
    // Validation and submission
    $('#vote-form').bootstrapValidator({
        live: 'disabled',
        message: 'This field is required',
        submitButtons: 'input[type="submit"]',
        submitHandler: function(validator, form, btn) {
            var $successAlert = $('#vote-alert-success'),
                $errorAlert = $('#vote-alert-error'),
                $emailAlert = $('#vote-alert-email');

            var xhr = $.post('/vote', form.serialize());
            xhr.done(function(data) {
                $errorAlert.addClass('hidden');
                $emailAlert.addClass('hidden');
                $successAlert.removeClass('hidden');
            }).fail(function(data) {
                var res = JSON.parse(data.responseText);
                if (res['emailUsed']) {
                    $errorAlert.addClass('hidden');
                    $emailAlert.removeClass('hidden');
                } else {
                    $emailAlert.addClass('hidden');
                    $errorAlert.removeClass('hidden');
                }
                $successAlert.addClass('hidden');
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
            ideas: {
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
