/* eslint-env jquery */
/* global AssignmentState, putAssignmentState, document, window */
// save_work.js
// A script to save incomplete student work on Carnap.io

function initSaveWork() {
  const debug = true;
  const namespace = 'save-work';
  let items;

  if (debug) console.log('save-work.js debugging on')

  function saveWork() {

    if (debug) console.log('saving work');

    // Syntax Checking 
    //   this approach---just saving all the html and reloading it---doesn't
    //   work!
    //
    // $('[data-carnap-type=synchecker]').each(function () {
    //   const exerciseId = $(this).attr('data-carnap-submission').slice(7);
    //   const studentWork = $(this).find('.output').html();
    //   items[exerciseId] = studentWork;
    //   if (debug) console.log('Content: ' + studentWork);
    //   if (debug) console.log('Saving ' + exerciseId + ': ' + studentWork);
    // });

    // Translation and Numerical
    $('[data-carnap-type=translate], [data-carnap-qualitativetype=numerical]').each(function () {
      // ".slice(7)" to remove the 'saveAs:' prefix
      const exerciseId = $(this).attr('data-carnap-submission').slice(7);
      const studentWork = $(this).find('input').val();
      items[exerciseId] = studentWork;
      if (debug) console.log('Saving ' + exerciseId + ': ' + studentWork);
    });

    // Qualitative Short Answer and Derivations
    $('[data-carnap-qualitativetype=shortanswer], [data-carnap-type=proofchecker]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission').slice(7);
      const studentWork = $(this).find('textarea').val();
      items[exerciseId] = studentWork;
      if (debug) console.log('Saving ' + exerciseId + ': ' + studentWork);
    });

    // Countermodels
    $('[data-carnap-type=countermodeler]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission').slice(7);
      items[exerciseId] = [];
      if (debug) console.log('Saving ' + exerciseId);
      $(this).find('textarea').each(function () {
        items[exerciseId].push($(this).val());
      });
    });

    // Truth Tables
    $('[data-carnap-type=truthtable]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission').slice(7);
      items[exerciseId] = [];
      if (debug) console.log('Saving ' + exerciseId);
      $(this).find('select').each(function () {
        items[exerciseId].push($(this).val());
      });
    });

    // Multiple Choice and Multiple Selection
    $('[data-carnap-qualitativetype=multiplechoice], [data-carnap-qualitativetype=multipleselection]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission').slice(7);
      items[exerciseId] = [];
      if (debug) console.log('Saving ' + exerciseId);
      $(this).find('input').each(function () {
        items[exerciseId].push($(this).prop('checked'));
      });
    });

    // Multiple Choice
    // Model Checking
    // Multiple Choice and Numerical
    // Sequent Calculus Problems
    // Gentzen-Prawitz Natural Deduction Problems

    if (debug) console.log(JSON.stringify(items));

    // If we can't putArgumentState, that probably means we aren't
    // a Carnap.io assignment.
    try {
      CarnapServerAPI.putAssignmentState(namespace,items);
    } catch {
      if (debug) console.log('Unable to putAssignmentState');
    }
  }

  function loadWork() {

    if (debug) console.log('loading saved work');

    // // Syntax Checking 
    // $('[data-carnap-type=synchecker]').each(function () {
    //   const exerciseId = $(this).attr('data-carnap-submission').slice(7);
    //   if (typeof items[exerciseId] !== 'undefined') {
    //     if (debug) console.log('loading ' + exerciseId)
    //     const studentWork = items[exerciseId];
    //     $(this).find('.output').html(studentWork);
    //   }
    // });

    // Translation and Numerical
    $('[data-carnap-type=translate], [data-carnap-qualitativetype=numerical]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission').slice(7);
      if (typeof items[exerciseId] !== 'undefined') {
        if (debug) console.log('loading ' + exerciseId)
        const studentWork = items[exerciseId];
        $(this).find('input').val(studentWork);
      }
    });

    // Qualitative Short Answer and Derivations
    $('[data-carnap-qualitativetype=shortanswer], [data-carnap-type=proofchecker]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission').slice(7);;
      if (typeof items[exerciseId] !== 'undefined') {
        if (debug) console.log('loading ' + exerciseId)
        const studentWork = items[exerciseId];
        $(this).find('textarea').val(studentWork);
      }
    });

    // Countermodels
    $('[data-carnap-type=countermodeler]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission').slice(7);;
      if (typeof items[exerciseId] !== 'undefined') {
        if (debug) console.log('loading ' + exerciseId)
        $(this).find('textarea').each(function () {
          const value = items[exerciseId].shift();
          $(this).val(value);
        });
      }
    });

    // Truth Tables
    $('[data-carnap-type=truthtable]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission').slice(7);;
      if (typeof items[exerciseId] !== 'undefined') {
        if (debug) console.log('loading ' + exerciseId)
        $(this).find('select').each(function () {
          const value = items[exerciseId].shift();
          $(this).val(value);
        });
      }
    });
    
    // Multiple Choice and Multiple Selection
      $('[data-carnap-qualitativetype=multiplechoice], [data-carnap-qualitativetype=multipleselection]').each(function () {
      const exerciseId = $(this).attr('data-carnap-submission').slice(7);;
      if (typeof items[exerciseId] !== 'undefined') {
        if (debug) console.log('loading ' + exerciseId)
        $(this).find('input').each(function () {
          const value = items[exerciseId].shift();
          $(this).prop('checked', value);
        });
      }
    });

    // Model Checking
    // Sequent Calculus Problems
    // Gentzen-Prawitz Natural Deduction Problems
    
    if (debug) console.log('done loading');

  }

  function successCallback(as) {

    if (debug) console.log('fetched assignment state: ' + JSON.stringify(as));

    // read assignment state
    if (typeof as[namespace] === 'undefined') {
      if (debug) console.log('no saved work; creating empty list')
      items = {};
    } else {
      items = as[namespace];
      if (debug) console.log('fetched items: ' + JSON.stringify(items));
    }

    loadWork();
    $(window).on('beforeunload', saveWork);
    $(window).on('blur', saveWork);
    //document.addEventListener('carnap-loaded', loadWork);
  }

  function failureCallback(error) {
    if (debug) console.log('failure: ' + error)
  }

  try {
    CarnapServerAPI.getAssignmentState().then(successCallback, failureCallback);
  } catch {
    if (debug) console.log('Unable to access CarnapServerAPI');
  }

}

document.addEventListener("carnap-loaded", initSaveWork)

//$(document).ready(initSaveWork);
// $(window).on('load', initSaveWork);
