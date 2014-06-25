$(function() {
    // Submit vote data.
    var submitVote = function(e) {
        e.preventDefault();

        var $this = $(this);

        return $.ajax({
            type: 'POST',
            url: '',
            dataType: 'json',
            data: $this.serialize()
        });
    };

    // Events.
    $('form#vote').submit(function(e) {
        var req = submitVote(e);
    });
});
