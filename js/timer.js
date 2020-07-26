// timer.js
// a simple script to display time remaining for timed assignments

function initTimer() {
    if (typeof availability_minutes === "undefined") {
        // demo mode
        console.log("demo mode");
        var availability_minutes = 5;
        var token_time = new Date().getTime();
    }
    if ($("#testTimer").length == 0 ) {
        console.log('adding div')
        var timerDiv = document.createElement("div");
        timerDiv.id = 'testTimer';
        $('body').append(timerDiv)
    }

    // Helpful units
    var second = 1000;
    var minute = 60 * second;
    var hour = 60 * minute;
    var day = hour * 24;
    
    var available = availability_minutes * minute; 

    var x = setInterval(testTimer, second);
    function testTimer() {
        var now = new Date().getTime();
        var elapsed = now - token_time;
        var remaining = available - elapsed;
        var display = "";
        if (remaining > day) {
            var days = Math.floor(remaining / day);
            display = display + days + 'd ';
        }
        if (remaining > hour) {
            var hours = Math.floor((remaining % day) / hour);
            display = display + hours  + 'h ';
        }
        if (3 * hour > remaining && remaining > minute) {
            var minutes = Math.floor((remaining % hour) / minute);
            display = display + minutes + 'm ';
        }
        if (remaining < 2 * minute) {
            var seconds = Math.floor((remaining % minute) / second);
            display = display + seconds + 's ';
        }
        if (remaining < 0) {
            display = "EXPIRED";
            clearInterval(x);
        }
        $("#testTimer").html(display);
    }
}

$( document ).ready(function() {
   initTimer();     
})
