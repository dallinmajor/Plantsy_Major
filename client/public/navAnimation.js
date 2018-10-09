// The navbar will animate up when the user scrolls down and animate down when the user scrolls up
import 'jquery';
// Stores the variables that determine which animation is appropiate
var prev_scroll_val;
var navbar_position;
var is_scrolling_down = false;

// See where the user is on the page
$(window).scroll(function () {
    // store the user scroll value in a variable
    var current_scroll_val = $(document).scrollTop();

    // Is the user Scrolling Down? True or False? 
    current_scroll_val > prev_scroll_val ? is_scrolling_down = true : is_scrolling_down = false;

    console.log(is_scrolling_down);

    // If the user is past 400px the navbar run animate funtion
    current_scroll_val > 400 ? animateNav() : setDefaults();
    
    //the current scroll value is now the previous scroll value
    prev_scroll_val = current_scroll_val;
});

function animateNav() {
    
    // Decide what animate to perform
    if (navbar_position > 0) {
        navbar_position = 0;
    } else if (!is_scrolling_down && 0 > navbar_position) {
        navbar_position = navbar_position + 2;
    } else if (is_scrolling_down && navbar_position > -55) {
        navbar_position = navbar_position - 2;
    }

    // Change the value of top in the myNav css to the value of navbar_position
    $(".myNav").css("top", navbar_position);
    console.log(navbar_position);
}

function setDefaults() {

    // reset values
    navbar_position = 0; ;
    is_scrolling_down = false;

    // return navbar to it's default position
    $(".myNav").css("top", "0");
}