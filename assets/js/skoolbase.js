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

    $("#contactForm").validate({
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: "Please enter your name",
            email: "Please enter a valid email address"
        },
        submitHandler: function(e) {
            var $form = $("#contactForm");
            window.intercomSettings = {
                app_id: 'ci0vxbk6',
                name: $form.find('[name="name"]').val(),
                email: $form.find('[name="email"]').val(),
                message: $form.find('[name="message"]').val(),
                //created_at: Date.now()
            };
                        
            $('#success').text("Thanks for your interest. We'll get back to you soon.");
        }
    });
});