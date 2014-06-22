$(function() {
    $('form#vote').submit(function(e) {
        e.preventDefault();

        var $this = $(this);

        $.ajax({
            type: 'POST',
            url: '',
            dataType: 'json',
            data: $this.serialize(),
            success: function() {
                // Success handler
            },
            error: function() {
                // Error handler
            }
        });
    });
});
