
// Execute the function when the entire window and its resources finish loading
$(window).on("load", function() {
    // Fades out the inner content of the loader with a duration of 500 milliseconds
    $(".loader .inner").fadeOut(500, function(){
        // Once the inner content is faded out, fade out the entire loader using a callback function with a duration of 750 milliseconds
        $(".loader").fadeOut(750);
    });
     // called when the page loads
     $(".items").isotope({
        // Loads with the All filter at first
        filter: '*',
        animationOptions: {
            // miliseconds
            duration: 1500,
            //smoothness, direction of animation
            easing: 'linear',
            queue: false
        }
    });
});

// execute the function  when the document/web page is ready
$(document).ready(function() {
    // intializes the slides the # references the id of slides in index.html
    $('#slides').superslides({
        animation: 'fade',
        // in miliseconds
        play: 5000,
        // if false user cannot change the image
        pagination: false
    });  

    var typed = new Typed(".typed", {
        strings: ["West Bank", "Gaza Strip", "Israel Proper"],
        typeSpeed: 70,
        loop: true,
        startDelay: 1000,
        showCursor: false
    });

    $('.owl-carousel').owlCarousel({
        loop:true,
        nav: false,
        dots: true,
        // 4 items are displayed at once
        items: 4,
        responsive:{
            0:{
                items:1
            },
            480:{
                items:2
            },
            768:{
                items:3
            },
            938:{
                items:4
            }
        }
    });
    // gets the position of the statsSection (how far it is from the top of the web page)
    var statsTopOffSet = $(".statsSection").offset().top;
    var countUpFinished = false; 
    // window scroll event
    $(window).scroll(function() {
        // Starts counting up when the user has scrolled to the statsSection
        // window.scrollY is the scroll position, if the user has scrolled past the statsTopOffSet position
        // subtracts the height of the window so that it would start counting up at the beginning of the window, not the end of it
        // adds 200 to delay the animation so it would start a little after the window get into the view.
        if(countUpFinished != true && window.scrollY > statsTopOffSet - $(window).height() + 200) {
            // loops to find every instance of the counter class
            $(".counter").each(function() {
                // The number as a string
                var element = $(this);
                // gets the floating point value of element
                var endVal = parseFloat(element.text());
                var decimals = 2;

                // Creates a new CountUp instance for each element, with a 2 second duration
                var countUp = new CountUp(this, 0, endVal, decimals, 2); 
                countUp.start();
                // Add percentage sign after the count animation is complete
                countUp.callback = function () {
                    element.text(element.text() + "%");
                };
            })
            countUpFinished = true;
        }
    });
    // creates a jquery fancy box object
    $("[data-fancybox]").fancybox();

   
    //selects the anchor tags of the filter class
    $("#filters a").click(function(){
        // removes the current class when the user clicks on a different button
        $("#filters .current").removeClass("current");
        // this refers to the current button that was clicked on by the user (this becomes the new current)
        $(this).addClass("current");
        // gets the value of the data-filter attribute, like West Bank, Maps etc...
        var selector = $(this).attr("data-filter");
        $(".items").isotope({
            // retrieves the data-filter value for the button that was currently clicked on
            filter: selector,
            animationOptions: {
                // miliseconds
                duration: 1500,
                //smoothness, direction of animation
                easing: 'linear',
                queue: false
            }
        });
        // do not do any more actions
        return false;

    });

    $("#navigation li a").click(function(e){
        // prevents the default click event from occuring when clicking on the link button
        e.preventDefault();
        // gets the link to the current anchor tag
        var targetElement = $(this).attr("href");
        // gets the top position of the target element by creating a jquery object
        var targetPosition = $(targetElement).offset().top;
        // -25 so it wont be too far up when the scrolling occurs
        $("html, body").animate({scrollTop: targetPosition - 25}, "slow");
    });





    // variable that should never be overwritten
    const nav = $("#navigation");
    // gets the top position of #navigation bar
    const navTop = nav.offset().top;
    
    $(window).on("scroll", stickyNavigation);

    function stickyNavigation() {

        var body = $("body");
        // gets position of the scroll window
        // if the user scrolls past the position of the navTop
        if($(window).scrollTop() >= navTop) {
            // adds padding in order to push the background contents down, forces the dom to take the height of the navbar into account for smooth transition
            body.css("padding-top", nav.outerHeight() + "px");
            // apply the class
            body.addClass("fixedNav");
        } else {
            // if not remove it and the extra padding
            body.css("padding-top", 0);
            body.removeClass("fixedNav");
        }

    }

});
