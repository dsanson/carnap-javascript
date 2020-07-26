/* eslint-env jquery */
/* global AssignmentState, putAssignmentState, document, window */
// save_work.js
// A script to save incomplete student work on Carnap.io

function initSaveWork() {
  // If we can't fetch AssignmentState, that means we are not
  // a Carnap assignment. So we'll just go ahead and create an
  // empty object.
  let as = {};
  try {
    as = JSON.parse(AssignmentState);
  } catch {
    console.log('Unable to parse AssignmentState');
  }

  // If this is the first time we run on a given assignment page,
  // we need to create as["Saved Work"]
  if (typeof as['Saved Work'] === 'undefined') {
    as['Saved Work'] = {};
  }

  function saveWork() {
    // Syntax Checking
    // Translation
    $('[data-carnap-type=translate]').each(function () {
      // Use data-carnap-submission as unique identifier
      // This will break more than one problem with same label on page
      const exerciseId = $(this).attr('data-carnap-submission');
      const studentWork = $(this).find('input').val();
      as['Saved Work'][exerciseId] = studentWork;
    });

    // Truth Tables
    // Derivations
    // Model Checking
    // Qualitative Problems
    // Sequent Calculus Problems
    // Gentzen-Prawitz Natural Deduction Problems

    console.log(as);

    // If we can't putArgumentState, that probably means we aren't
    // a Carnap.io assignment.
    try {
      putAssignmentState(JSON.stringify(as));
    } catch {
      console.log('Unable to putArgumentState');
    }
  }

  function loadWork() {
    // Syntax Checking
    // Translation
    $('[data-carnap-type=translate]').each(function () {
      // Use data-carnap-submission as unique identifier
      // This will break more than one problem with same label on page
      const exerciseId = $(this).attr('data-carnap-submission');
      const studentWork = as['Saved Work'][exerciseId];

      $(this).find('input').val(studentWork);
    });

    // Truth Tables
    // Derivations
    // Model Checking
    // Qualitative Problems
    // Sequent Calculus Problems
    // Gentzen-Prawitz Natural Deduction Problems

    // For debugging
    console.log(as);
  }

  loadWork();
  $(window).on('beforeunload', saveWork);
}

$(document).ready(initSaveWork);
