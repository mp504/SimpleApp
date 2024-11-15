const colorWheel = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

var quoteAuthor = "";
var quoteText = "";

function getQuote() {

    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?", function (data) {
        quoteText = data.quoteText;

        if (data.quoteAuthor) {
            quoteAuthor = data.quoteAuthor;
        } else {
            quoteAuthor = "Anonymous"
        }

        $('#quote').animate({
            opacity: 0
        }, 500, function () {
            $('#quote').html(quoteText);
            $(this).animate({
                opacity: 1
            }, 500);
        });

        $('.author').animate({
            opacity: 0
        }, 500, function () {
            $('.author').html(" - " + quoteAuthor);
            $(this).animate({
                opacity: 1
            }, 500);
        });

        const choice = Math.floor(Math.random() * colorWheel.length);

        $('body').animate({
            backgroundColor: colorWheel[choice],
            color: colorWheel[choice],
        }, 1000);

        $('button').animate({
            backgroundColor: colorWheel[choice]
        }, 1000);

        $('#tw-button').attr("href", "https://twitter.com/intent/tweet?text=" + encodeURIComponent('"' + quoteText + '" -' + quoteAuthor));
    });
}

$(document).ready(function () {
    var quoteInfo = [];
    $('#refresh').click(function (event) {
        event.preventDefault();
        getQuote();
    });
});

getQuote();