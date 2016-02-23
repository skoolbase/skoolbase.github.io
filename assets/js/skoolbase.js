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
    
    /*var w = window;
    var ic = w.Intercom;
    if (typeof ic === "function") {
        ic('reattach_activator');
        ic('update', intercomSettings);
    } else {
        var d = document;
        var i = function() {
            i.c(arguments);
        };
        i.q = [];
        i.c = function(args) {
            i.q.push(args);
        };
        w.Intercom = i;

        function l() {
            var s = d.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://widget.intercom.io/widget/ci0vxbk6';
            var x = d.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
        }
        if (w.attachEvent) {
            w.attachEvent('onload', l);
        } else {
            w.addEventListener('load', l, false);
        }
    }*/
    
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
            // create a new instance of the Mandrill class with your API key
            var mApi = new mandrill.Mandrill('vfejgu7ElMYo4ro8OD2jwQ');
            // create a variable for the Mandril API call parameters
            var params = {
                "message": {
                    "from_name" : "Skoolbase",
                    "from_email": "noreply@skoolbase.com",
                    "to": [{ "email": $form.find('[name="email"]').val() }],
                    "bcc_address": "admin@skoolbase.com",
                    "subject": "Thank you",
                    "text": "Thank you for showing interest in Skoolbase. We will get back to as soon as possible.\r\n Your message:\r\n" + $form.find('[name="message"]').val()
                }
            };
            mApi.messages.send(params, function (res) {
                $('#success').removeClass('hide');
            }, function (err) {
            });
        
            /*window.intercomSettings = {
                app_id: 'ci0vxbk6',
                name: $form.find('[name="name"]').val(),
                email: $form.find('[name="email"]').val(),
                message: $form.find('[name="message"]').val(),
                created_at: Date.now()
            };
                        
            $('#success').text("Thanks for your interest. We'll get back to you soon.");*/
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