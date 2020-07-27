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
    // const dummyAssignmentState = '{"Saved Work":{"saveAs:1.3":"Bob","saveAs:1.7":"Badly","saveAs:1.5":"Show (Q → P)\\nP :PR","saveAs:1.4":["-","-","-","F","-","F","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","T","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-"]}}';
    // as = JSON.parse(dummyAssignmentState);
  }

  // If this is the first time we run on a given assignment page,
  // we need to create as["Saved Work"]
  if (typeof as['Saved Work'] === 'undefined') {
    as['Saved Work'] = {};
  }

  function saveWork() {
    // Syntax Checking (not implemented)
    // Translation, and Qualitative Short Answer
    $('[data-carnap-type=translate]',
      '[data-carnap-type=qualitative]',
      '[data-carnap-type=proofchecker]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission');
      const studentWork = $(this).find('input', 'textarea').val();
      as['Saved Work'][exerciseId] = studentWork;
    });

    // Truth Tables
    $('[data-carnap-type=truthtable]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission');
      as['Saved Work'][exerciseId] = [];
      $(this).find('select').each(function () {
        as['Saved Work'][exerciseId].push($(this).val());
      });
    });
    // Derivations
    $('[data-carnap-type=proofchecker]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission');
      const studentWork = $(this).find('textarea').val();
      as['Saved Work'][exerciseId] = studentWork;
    });
    // Model Checking
    // Multiple Choice and Numerical
    // Sequent Calculus Problems
    // Gentzen-Prawitz Natural Deduction Problems

    console.log(JSON.stringify(as));

    // If we can't putArgumentState, that probably means we aren't
    // a Carnap.io assignment.
    try {
      putAssignmentState(JSON.stringify(as));
    } catch {
      console.log('Unable to putArgumentState');
    }
  }

  function loadWork() {
    // Syntax Checking (not implemented)
    //
    // Translation and Qualitative Short Answer
    $('[data-carnap-type=translate]',
      '[data-carnap-type=qualitative]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission');
      if (typeof as['Saved Work'][exerciseId] !== 'undefined') {
        const studentWork = as['Saved Work'][exerciseId];
        $(this).find('input', 'textarea').val(studentWork);
      }
    });

    // Truth Tables
    $('[data-carnap-type=truthtable]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission');
      if (typeof as['Saved Work'][exerciseId] !== 'undefined') {
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

  loadWork();
  $(window).on('beforeunload', saveWork);
  $(window).on('blur', saveWork);
}

// $(document).ready(initSaveWork);
$(window).on('load', initSaveWork);
