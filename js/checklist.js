/* eslint-env jquery */
/* global AssignmentState, putAssignmentState, document */

// SETTINGS

// set to true to insert checkbox next to each exercise
const addcheckboxestoexercises = true;
// set to true to display total points, points checked, and percentage
// of points checked.
const displayprogress = false;
// Note that progress display is not smart about points. It assumes all exercises are
// worth this many points:
const pts = 10;

// gather_exercises does two things:
//   -   it creates a list of all exercises in the document
//   -   if addcheckboxestoexercises is true, it adds checkboxes 
//       next to each exercise it finds
//       
function gather_exercises() {
  let exs;
  exs = [];
  $('.exercise').each(function () {
    s = $(this).children('span');

    // We have two cases to handle. By default, exercises do not display
    // point value, and so have just one child span element, which contains
    // the exercise label.
    //
    // But if an exercise has an explicit point value set, then it will
    // display that point value in a second child span.

    if (s.length > 1) {
      // first we handle exercises that have explicit point values set
      v = s.eq(0).text();
      exs.push(v)
      if (addcheckboxestoexercises) {
        s.eq(1).append(' <input type="checkbox" value="' + v + '">');
      }
    }
    else {
      // now we handle exercises that do not display any point value.
      v = s.eq(0).text();
      exs.push(v)
      if (addcheckboxestoexercises) {
        s.eq(0).after('<span><input type="checkbox" value="' + v + '"></span>');
      }
    }
  });
  return exs
}

// create_checklist populates any element with the class 'auto-tally' with
// an automatically generated checklist for all the exercises. If displayprogress
// is true, it also calculates and displays total points, total points complete, and
// percentage of total points complete.
//
function create_checklist(exs) {
  // should replace this with a smarter calculation fo total points, that 
  // 
  // -   checks the actual point value of each exercise
  // -   checks for duplicate exercises
  //
  total = pts * exs.length
  $('.auto-tally').each(function() {
    if (displayprogress) {
      report = $("<div/>")
      report.attr("class", "report")
      report.html('<span class=score>0</span> out of <span class=total>' + total + '</span>: <span class=pct>0</span>%')
    }
    listdiv = $("<div/>")
    listdiv.attr("class", "exercise-checklist")
    list = $("<ul/>")
    for (i = 0; i < exs.length; i++) {
      list.append('<li> <input type="checkbox" value="' + exs[i] + '"> <a href="#exercise-' + exs[i] + '">' + exs[i] + '</a></li>') 
    }
    listdiv.append(list)
    if (displayprogress) {
      $(this).attr("points", pts)
      $(this).attr("total", total)
      $(this).append(report)
    }
    $(this).append(listdiv)
  });
}

// By default, checkboxes created using markdown are disabled, and
// have no set value. process_checkboxes enables all checkboxes, and
// sets an appropriate value for each.
//
// It then applies any stored settings, checking boxes that should be
// checked.
//
// Finally, it attaches a function to each checkbox, so that when a checkbox
// is checked or unchecked, its stored value is updated.
//
function process_checkboxes(items,namespace) {
  $(':checkbox').each(function () {
    // enable checkboxes
    $(this).prop('disabled', false);

    // set checkbox value attribute
    if ($(this).val() === 'on') {
      // Find first sibling with a value or data-value attribute
      const sib = $(this).siblings('span[data-value],a[value],span[value],a[data-value]');
      let v = sib.attr('data-value');
      if (typeof v === 'undefined') {
        v = sib.attr('value');
      }

      if (typeof v === 'undefined') {
        // Fall back to the href of a link element
        v = $(this).siblings('a').attr('href');
      }

      if (typeof v === 'undefined') {
        v = 'skip';
      }

      $(this).val(v);
    }

    // apply stored settings
    if (items[$(this).val()]) {
      $(this).prop('checked', true);
    } else {
      $(this).prop('checked', false);
    }

    // create function to update on click
    $(this).click(function () {
      const v = $(this).val()
      if (v !== 'skip') {
        if ($(this).prop('checked')) {
          items[v] = true;
          $(':checkbox[value="' + v + '"]').prop('checked', true);
        } else {
          items[v] = false;
          $(':checkbox[value="' + v + '"]').prop('checked', false);
        }
        try {
          CarnapServerAPI.putAssignmentState(namespace,items);
        } catch {
          console.log('Unable to access CarnapServerAPI');
        }
      }
    });
  });
}

// checklist is the main function for this script. It fetches
// stored checklist values from Carnap, and calls gather_exercises,
// create_checklist, and process_checkboxes.
//
function checklist() {

  let namespace = 'checklist';

  function successCallback(as) {
    // read assignment state
    if (typeof as[namespace] === 'undefined') {
      items = {};
    } else {
      items = as[namespace];
    }
    let exs = gather_exercises()
    create_checklist(exs)
    process_checkboxes(items,namespace)
  };

  try {
    CarnapServerAPI.getAssignmentState().then(successCallback);
  } catch {
    console.log('Unable to access CarnapServerAPI');
    items = {};
    let exs = gather_exercises()
    create_checklist(exs)
    process_checkboxes(items,namespace)
  }
}

// tallychecklist recalculates progress for the progress
// report.
function tallychecklist() {
  $('div.auto-tally, div.tally').each(function() {
    points=Number($(this).attr('points'))
    total=Number($(this).attr('total'))
    score = 0
    $(this).find(':checkbox').each(function() {
      if ($(this).prop('checked')) {
        score = score + points
      }
    })
    $(this).find('.score').each(function(){
      $(this).text(score)
    })
    $(this).find('.total').each(function(){
      $(this).text(total)
    })
    $(this).find('.pct').each(function(){
      $(this).text(Math.floor(score / total * 100))
    })
  })
}

// If we are tracking progress, we bind tallychecklist to 
// each checkbox, so the progress report gets updated whenever
// a box is checked or unchecked.
function tallycheck() {
  $(':checkbox').each(function() {
    $(this).click(function() {tallychecklist()})
  })
  tallychecklist()
}

function main() {
  checklist();
  if (displayprogress) tallycheck();
}

$(document).ready(main);
