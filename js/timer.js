// timer.js
// a simple script to display time remaining for timed assignments

function initTimer() {
    if (typeof availability_minutes === "undefined") {
        // demo mode
        console.log("demo mode");
        availability_minutes = 5;
        token_time = new Date().getTime();
    }
    
    // Helpful units
    second = 1000;
    minute = 60 * second;
    hour = 60 * minute;
    day = hour * 24;
    
    available = availability_minutes * minute; 

    var x = setInterval(testTimer, second);
    function testTimer() {
        now = new Date().getTime();
        elapsed = now - token_time;
        remaining = available - elapsed;
        display = "";
        if (remaining > day) {
            days = Math.floor(remaining / day);
            display = display + days + 'd ';
        }
        if (remaining > hour) {
            hours = Math.floor((remaining % day) / hour);
            display = display + hours  + 'h ';
        }
        if (3 * hour > remaining && remaining > minute) {
            minutes = Math.floor((remaining % hour) / minute);
            display = display + minutes + 'm ';
        }
        if (remaining < 2 * minute) {
            seconds = Math.floor((remaining % minute) / second);
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
