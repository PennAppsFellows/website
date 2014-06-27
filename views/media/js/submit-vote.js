$(function() {
    // Validation and submission
    $('#vote-form').bootstrapValidator({
        live: 'disabled',
        message: 'This field is required',
        submitButtons: 'input[type="submit"]',
        submitHandler: function(validator, form, btn) {
            var xhr = $.post('/vote', form.serialize());
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
