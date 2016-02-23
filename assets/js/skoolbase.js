$(document).ready(function () {
    $('body').on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
    
    $(window).scroll(function() {     
        var scroll = $(window).scrollTop();
        if (scroll > 80) {
            $("#navbar").addClass("active");
        }
        else {
            $("#navbar").removeClass("active");
        }
    });
    
    function initAPEffects(e) {
        var animationDelay = 2500;
        hideWord($(e).find('.menu-item.show'));

        function hideWord($word) {
            var nextWord = takeNext($word);
            switchWord($word, nextWord);
            setTimeout(function () {
                hideWord(nextWord);
            }, animationDelay);
        }

        function takeNext($word) {
            return (!$word.is(':last-child')) ? $word.next() : $word.parent()
                .children().eq(0);
        }

        function switchWord($oldWord, $newWord) {
            $oldWord.fadeOut("slow", function() {
                $oldWord.removeClass('show').addClass('hide');
                $newWord.removeClass('hide').addClass('show');
            });
        }
    }
    initAPEffects('.jumbotron');

});