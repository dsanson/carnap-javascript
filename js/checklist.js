/* eslint-env jquery */
/* global AssignmentState, putAssignmentState, document */

function checklist() {
  // If we can't fetch AssignmentState, that means we are not
  // a Carnap assignment. So we'll just go ahead and create an
  // empty object.
  let as;
  try {
    as = JSON.parse(AssignmentState);
  } catch {
    console.log('Unable to parse AssignmentState');
    as = {};
  }

  // If this is the first time we run on a given assignment page,
  // we need to create as["Checklist Items"]
  if (typeof as['Checklist Items'] === 'undefined') {
    as['Checklist Items'] = {};
  }

  $(':checkbox').each(function () {
    // Pandoc disables all checkboxes by default, so we undisable them
    $(this).prop('disabled', false);

    // Set checkbox value attribute
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

    // Apply stored settings from AssignmentState
    if (as['Checklist Items'][$(this).val()]) {
      $(this).prop('checked', true);
    } else {
      $(this).prop('checked', false);
    }

    $(this).click(function () {
      // When an input box is clicked, update AssignmentState
      const v = $(this).val();
      if (v !== 'skip') {
        if ($(this).is(':checked')) {
          as['Checklist Items'][v] = true;
          $(':checkbox[value="' + v + '"]').prop('checked', true);
        } else {
          as['Checklist Items'][v] = false;
          $(':checkbox[value="' + v + '"]').prop('checked', false);
        }

        console.log(as);

        // If we can't putArgumentState, that probably means we aren't
        // running within a Carnap assignment.
        try {
          putAssignmentState(as);
        } catch {
          console.log('Unable to putArgumentState');
        }
      }
    });
  });
}

$(document).ready(checklist);
