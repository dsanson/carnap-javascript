/* eslint-env jquery */
/* global availability_minutes:writable, token_time:writable, document */
/* eslint camelcase: ["error", {ignoreGlobals: true}] */
// timer.js
// a simple script to display time remaining for timed assignments

function initTimer() {
  if (typeof availability_minutes === 'undefined') {
  // Demo mode
    console.log('demo mode');
    availability_minutes = 5;
    token_time = new Date().getTime();
  }

  if ($('#testTimer').length === 0) {
    console.log('adding div');
    $('article').prepend('<div id="testTimer"></div>');
  }

  // Helpful constants
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = hour * 24;
  const available = availability_minutes * minute;

  // Run testTimer every second
  const x = setInterval(testTimer, second);

  function testTimer() {
    const now = new Date().getTime();
    const elapsed = now - token_time;
    const remaining = available - elapsed;
    let display = '';
    if (remaining > day) {
      const days = Math.floor(remaining / day);
      display = display + days + 'd';
    }

    if (remaining > hour) {
      const hours = Math.floor((remaining % day) / hour);
      display = display + hours + 'h';
    }

    if (day > remaining && remaining > minute) {
      const minutes = Math.floor((remaining % hour) / minute);
      display = display + minutes + 'm';
    }

    if (remaining < 5 * minute) {
      const seconds = Math.floor((remaining % minute) / second);
      display = display + seconds + 's';
    }

    if (remaining < 0) {
      display = 'EXPIRED';
      clearInterval(x);
    }

    $('#testTimer').html(display);
  }
}

$(document).ready(initTimer);
