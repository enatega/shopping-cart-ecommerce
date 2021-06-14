"use strict";
$(document).ready(function(){
    if($( window ).width() >= 991 ) {
        $("nav a").on('click', function(event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - 75
                }, 1000, function(){
                });
                return false;
            }
        });
    }else {
        $("nav a").on('click', function(event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - 50
                }, 1000, function(){
                });
                return false;
            }
        });
    }
});