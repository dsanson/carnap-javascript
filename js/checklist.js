/* eslint-env jquery */
/* global AssignmentState, putAssignmentState, document */

function gather_exercises() {
  let exs;
  exs = [];
  // Create checkboxes beside each exercise
  $('.exercise').each(function () {
    s = $(this).children('span');
    if (s.length > 1) {
      v = s.eq(0).text();
      exs.push(v)
      s.eq(1).append(' <input type="checkbox" value="' + v + '">');
    }
  });
  return exs
}

function create_checklist(exs) {
  pts = 10;
  total = pts * exs.length
  $('.auto-tally').each(function() {
    report = $("<div/>")
    report.attr("class", "report")
    report.html('<span class=score>0</span> out of <span class=total>' + total + '</span>: <span class=pct>0</span>%')
    listdiv = $("<div/>")
    listdiv.attr("class", "four-column")
    list = $("<ul/>")
    for (i = 0; i < exs.length; i++) {
      list.append('<li> <input type="checkbox" value="' + exs[i] + '"> <a href="#exercise-' + exs[i] + '">' + exs[i] + '</a></li>') 
    }
    listdiv.append(list)
    $(this).attr("points", pts)
    $(this).attr("total", total)
    $(this).append(report)
    $(this).append(listdiv)
  });
}

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
        if ($(this).is(':checked')) {
          items[v] = true;
          $(':checkbox[value="' + v + '"]').prop('checked', true);
        } else {
          items[v] = false;
          $(':checkbox[value="' + v + '"]').prop('checked', false);
        }
        console.log(items);
        CarnapServerAPI.putAssignmentState(namespace,items);
      }
    });
  });
}

function checklist() {

  let namespace = 'checklist';

  CarnapServerAPI.getAssignmentState().then(function(as){
    // read assignment state
    if (typeof as[namespace] === 'undefined') {
      items = {};
    } else {
      items = as[namespace];
    }
    items = as;
    
    let exs = gather_exercises()
    create_checklist(exs)
    process_checkboxes(items,namespace)

  });
}

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

function tallycheck() {
  $(':checkbox').each(function() {
    $(this).click(function() {tallychecklist()})
  })
  tallychecklist()
}

function main() {
  checklist();
  tallycheck();
}

$(document).ready(main);
