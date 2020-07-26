/* eslint-env jquery */
/* global AssignmentState, putAssignmentState, parsedAssignmentState, document, window */
// save_work.js
// A script to save incomplete student work on Carnap.io

function initSaveWork() {
  if (typeof parsedAssignmentState === 'undefined') {
    let parsedAssignmentState = {};
    // We only fetch AssignmentState if we were the script to declare
    // parsedAssignmentState
    try {
      parsedAssignmentState = JSON.parse(AssignmentState);
    } catch {
      // Probably means we aren't running in a Carnap assignment
      console.log('Unable to parse AssignmentState');
      parsedAssignmentState = {};
    }
  }

  // If this is the first time we run on a given assignment page,
  // we need to create as["Saved Work"]
  if (typeof parsedAssignmentState['Saved Work'] === 'undefined') {
    parsedAssignmentState['Saved Work'] = {};
  }

  function saveWork() {
    // Syntax Checking
    // Translation
    $('[data-carnap-type=translate]').each(function () {
      // Use data-carnap-submission as unique identifier
      // This will break more than one problem with same label on page
      const exerciseId = $(this).attr('data-carnap-submission');
      const studentWork = $(this).find('input').val();
      parsedAssignmentState['Saved Work'][exerciseId] = studentWork;
    });

    // Truth Tables
    // Derivations
    // Model Checking
    // Qualitative Problems
    // Sequent Calculus Problems
    // Gentzen-Prawitz Natural Deduction Problems

    console.log(parsedAssignmentState);

    // If we can't putArgumentState, that probably means we aren't
    // a Carnap.io assignment.
    try {
      putAssignmentState(JSON.stringify(parsedAssignmentState));
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
      const studentWork = parsedAssignmentState['Saved Work'][exerciseId];

      $(this).find('input').val(studentWork);
    });

    // Truth Tables
    // Derivations
    // Model Checking
    // Qualitative Problems
    // Sequent Calculus Problems
    // Gentzen-Prawitz Natural Deduction Problems

    // For debugging
    console.log(parsedAssignmentState);
  }

  loadWork();
  $(window).on('beforeunload', saveWork);
}

$(document).ready(initSaveWork);
