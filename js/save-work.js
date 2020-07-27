/* eslint-env jquery */
/* global AssignmentState, putAssignmentState, document, window */
// save_work.js
// A script to save incomplete student work on Carnap.io

function initSaveWork() {
  const debug = true;
  if (debug) console.log('save-work.js debugging on')
  // If we can't fetch AssignmentState, that means we are not
  // a Carnap assignment. So we'll just go ahead and create an
  // empty object.
  let as;
  try {
    if (typeof AssignmentState === 'object') as = AssignmentState
    else throw "AssignmentState is not an object"
  } catch {
    if (debug) console.log('Unable to fetch AssignmentState');
    as = {};
  }

  // If this is the first time we run on a given assignment page,
  // we need to create as["Saved Work"]
  if (typeof as['Saved Work'] === 'undefined') {
    as['Saved Work'] = {};
  }

  function saveWork() {
    if (debug) console.log('saving work');
    // Syntax Checking (not implemented)

    // Translation and Numerical
    $('[data-carnap-type=translate]',
      '[data-carnap-qualitativetype=numerical]').each(function () {
      // ".slice(7)" to remove the 'saveAs:' prefix
      const exerciseId = $(this).attr('data-carnap-submission').slice(7);
      const studentWork = $(this).find('input').val();
      as['Saved Work'][exerciseId] = studentWork;
      if (debug) console.log('Saving ' + exerciseId + ': ' + studentWork);
    });

    // Qualitative Short Answer and Derivations
    $('[data-carnap-qualitativetype=shortanswer]',
      '[data-carnap-type=proofchecker]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission').slice(7);
      const studentWork = $(this).find('textarea').val();
      as['Saved Work'][exerciseId] = studentWork;
      if (debug) console.log('Saving ' + exerciseId + ': ' + studentWork);
    });

    // Truth Tables
    $('[data-carnap-type=truthtable]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission').slice(7);
      as['Saved Work'][exerciseId] = [];
      if (debug) console.log('Saving ' + exerciseId);
      $(this).find('select').each(function () {
        as['Saved Work'][exerciseId].push($(this).val());
      });
    });

    // Multiple Choice
    // Model Checking
    // Multiple Choice and Numerical
    // Sequent Calculus Problems
    // Gentzen-Prawitz Natural Deduction Problems

    if (debug) console.log(JSON.stringify(as));

    // If we can't putArgumentState, that probably means we aren't
    // a Carnap.io assignment.
    try {
      putAssignmentState(as);
    } catch {
      if (debug) console.log('Unable to putAssignmentState');
    }
  }

  function loadWork() {
    if (debug) console.log('loading saved work');
    // Syntax Checking (not implemented)
    //
    // Translation and Numerical
    $('[data-carnap-type=translate]',
      '[data-carnap-qualitativetype=numerical]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission').slice(7);
      if (typeof as['Saved Work'][exerciseId] !== 'undefined') {
        if (debug) console.log('loading ' + exerciseId)
        const studentWork = as['Saved Work'][exerciseId];
        $(this).find('input').val(studentWork);
      }
    });

    // Qualitative Short Answer and Derivations
    $('[data-carnap-qualitativetype=shortanswer]',
      '[data-carnap-type=proofchecker]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission').slice(7);;
      if (typeof as['Saved Work'][exerciseId] !== 'undefined') {
        if (debug) console.log('loading ' + exerciseId)
        const studentWork = as['Saved Work'][exerciseId];
        $(this).find('textarea').val(studentWork);
      }
    });

    // Truth Tables
    $('[data-carnap-type=truthtable]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission').slice(7);;
      if (typeof as['Saved Work'][exerciseId] !== 'undefined') {
        if (debug) console.log('loading ' + exerciseId)
        $(this).find('select').each(function () {
          const value = as['Saved Work'][exerciseId].shift();
          $(this).val(value);
        });
      }
    });
    // Multiple Choice
    // Model Checking
    // Sequent Calculus Problems
    // Gentzen-Prawitz Natural Deduction Problems

    // For debugging
    if (debug) console.log(JSON.stringify(as));
  }

  $(window).on('beforeunload', saveWork);
  $(window).on('blur', saveWork);
  document.addEventListener('carnap-loaded', loadWork);
}

$(document).ready(initSaveWork);
// $(window).on('load', initSaveWork);
