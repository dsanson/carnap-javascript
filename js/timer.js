// timer.js
// a simple script to display time remaining for timed assignments

function initTimer() {
    // availability_minutes = 1;
    // a = availability_minutes * 5 * 1000;
    // t = new Date();
    // token_time = t.getTime();
    if (typeof availability_minutes !== "undefined") {
        second = 1000;
        minute = 60 * second;
        hour = 60 * minute;
        day = hour * 24;
        testTimer();
        var myVar = setInterval(testTimer, second);
        function testTimer() {
            n = new Date();
            current_time = n.getTime();
            remaining = a - (n - token_time);
            r = new Date(remaining);
            display = "";
            if (remaining > day) {
                d = Math.floor(remaining/day);
                display = display + d + 'd ';
            }
            if (remaining > hour) {
                display = display + r.getUTCHours() + 'h ';
            }
            if (3 * hour > remaining > minute) {
                display = display + r.getUTCMinutes() + 'm ';
            }
            if (remaining < 2 * minute) {
                display = display + r.getUTCSeconds() + 's ';
            }
            if (remaining < 0) {
                display = "0s";
                clearInterval(myVar);
            }
            $("#testTimer").html(display);
        }
    }
}

$( document ).ready(function() {
   initTimer();     
})
