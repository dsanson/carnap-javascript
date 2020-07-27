/* eslint-env jquery */
/* global AssignmentState, putAssignmentState, document, window */
// save_work.js
// A script to save incomplete student work on Carnap.io

function initSaveWork() {
  // If we can't fetch AssignmentState, that means we are not
  // a Carnap assignment. So we'll just go ahead and create an
  // empty object.
  let as;
  try {
    if (typeof AssignmentState === 'object') as = AssignmentState
    else throw "AssignmentState is not an object"
  } catch {
    console.log('Unable to fetch AssignmentState');
    as = {};
  }

  // If this is the first time we run on a given assignment page,
  // we need to create as["Saved Work"]
  if (typeof as['Saved Work'] === 'undefined') {
    as['Saved Work'] = {};
  }

  function saveWork() {
    console.log('saving work');
    // Syntax Checking (not implemented)
    // Translation, and Qualitative Short Answer
    $('[data-carnap-type=translate]',
      '[data-carnap-type=qualitative]',
      '[data-carnap-type=proofchecker]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission');
      const studentWork = $(this).find('input', 'textarea').val();
      as['Saved Work'][exerciseId] = studentWork;
      console.log('Saving ' + exerciseId + ': ' + studentWork);
    });

    // Truth Tables
    $('[data-carnap-type=truthtable]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission');
      as['Saved Work'][exerciseId] = [];
      console.log('Saving ' + exerciseId);
      $(this).find('select').each(function () {
        as['Saved Work'][exerciseId].push($(this).val());
      });
    });
    // Derivations
    $('[data-carnap-type=proofchecker]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission');
      const studentWork = $(this).find('textarea').val();
      as['Saved Work'][exerciseId] = studentWork;
      console.log('Saving ' + exerciseId + ': ' + studentWork);
    });
    // Model Checking
    // Multiple Choice and Numerical
    // Sequent Calculus Problems
    // Gentzen-Prawitz Natural Deduction Problems

    console.log(JSON.stringify(as));

    // If we can't putArgumentState, that probably means we aren't
    // a Carnap.io assignment.
    try {
      putAssignmentState(as);
    } catch {
      console.log('Unable to putArgumentState');
    }
  }

  function loadWork() {
    console.log('loading saved work');
    // Syntax Checking (not implemented)
    //
    // Translation and Qualitative Short Answer
    $('[data-carnap-type=translate]',
      '[data-carnap-type=qualitative]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission');
      if (typeof as['Saved Work'][exerciseId] !== 'undefined') {
        console.log('loading ' + exerciseId)
        const studentWork = as['Saved Work'][exerciseId];
        $(this).find('input', 'textarea').val(studentWork);
      }
    });

    // Truth Tables
    $('[data-carnap-type=truthtable]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission');
      if (typeof as['Saved Work'][exerciseId] !== 'undefined') {
        console.log('loading ' + exerciseId)
        $(this).find('select').each(function () {
          const value = as['Saved Work'][exerciseId].shift();
          $(this).val(value);
        });
      }
    });
    // Derivations
    $('[data-carnap-type=proofchecker]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission');
      if (typeof as['Saved Work'][exerciseId] !== 'undefined') {
        console.log('loading ' + exerciseId)
        const studentWork = as['Saved Work'][exerciseId];
        $(this).find('textarea').val(studentWork);
      }
    });
    // Model Checking
    // Multiple Choice and Numerical
    // Sequent Calculus Problems
    // Gentzen-Prawitz Natural Deduction Problems

    // For debugging
    console.log(as);
  }

  $(window).on('beforeunload', saveWork);
  $(window).on('blur', saveWork);
  document.addEventListener('carnap-loaded', loadWork);
}

$(document).ready(initSaveWork);
// $(window).on('load', initSaveWork);
