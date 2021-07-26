/* eslint-env jquery */
/* global AssignmentState, putAssignmentState, document, window */
// save_work.js
// A script to save student work on Carnap.io

function initSaveWork() {
  const debug = true;
  const namespace = 'saved-work';
  let items;
  let ids = []; // a list for tracking duplicate ids
  let firstload = true;

  if (debug) console.log('save-work.js debugging on')

  function getId($exercise) {

    l = $exercise.parent().attr('data-carnap-label')
    t = $exercise.attr('data-carnap-type')
    // qualitative problems come in many types
    if (t == 'qualitative') {
      t = $exercise.attr('data-carnap-qualitativetype')
    }

    // shorten type to use as label
    if (t == 'proofchecker') t = '-pr'
    if (t == 'truthtable') t = '-tt'
    if (t == 'countermodeler') t = '-cm'
    if (t == 'multiplechoice') t = '-mc'
    if (t == 'multipleselection') t = '-ms'
    if (t == 'shortanswer') t = '-sa'
    if (t == 'numerical') t = '-nu'
    if (t == 'translate') t = '-tr'
    
    id = l + t 
    
    n = 0
    while ( ids.includes(id) ) {
      n = n + 1;
      id = id + '-' + n.toString();
    }
    ids.push(id);

    return id;
  }

  function saveSimple($exercise, workdiv) {
      const exerciseId = getId($exercise);
      const studentWork = $exercise.find(workdiv).val();
      items[exerciseId] = studentWork;
      //if (debug) console.log('Saving ' + exerciseId + ': ' + studentWork);
  }

  function saveArray($exercise, workdiv) {
      const exerciseId = getId($exercise);
      items[exerciseId] = [];
      $exercise.find(workdiv).each(function () {
        items[exerciseId].push($(this).val());
      });
      //if (debug) console.log('Saving ' + exerciseId + ': ' + JSON.stringify(items[exerciseId]));
  }

  function saveArraytoCheckboxes($exercise, workdiv) {
      const exerciseId = getId($exercise);
      items[exerciseId] = [];
      $exercise.find(workdiv).each(function () {
        items[exerciseId].push($(this).prop('checked'));
      });
      //if (debug) console.log('Saving ' + exerciseId + ': ' + JSON.stringify(items[exerciseId]));
  }

  function saveWork() {

    if (debug) console.log('saving work');

    ids = [];  // reset found list of found ids

    // Translation and Numerical
    $('[data-carnap-type=translate], [data-carnap-qualitativetype=numerical]').each(function () {
      saveSimple($(this),'input');
    });

    // Qualitative Short Answer and Derivations
    $('[data-carnap-qualitativetype=shortanswer], [data-carnap-type=proofchecker]').each(function () {
      saveSimple($(this),'textarea');
    });

    // Countermodels
    $('[data-carnap-type=countermodeler]').each(function () {
      saveArray($(this),'textarea');
    });

    // Truth Tables
    $('[data-carnap-type=truthtable]').each(function () {
      saveArray($(this),'select');
    });

    // Multiple Choice and Multiple Selection
    $('[data-carnap-qualitativetype=multiplechoice], [data-carnap-qualitativetype=multipleselection]').each(function () {
      saveArraytoCheckboxes($(this),'input');
    });

    // Syntax Problems
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

  function loadSimple($exercise, workdiv) {
    const exerciseId = getId($exercise);
    if (typeof items[exerciseId] !== 'undefined') {
      const studentWork = items[exerciseId];
      // check that the saved data is a string or number
      if (typeof(studentWork) == "string" || typeof(studentWork) == "number")  {
        //if (debug) console.log('loading ' + exerciseId + ': ' + studentWork)
        $exercise.find(workdiv).val(studentWork);
      } else {
        console.log(exerciseId + ' not loaded: wrong type');
      }
    }
  }

  function loadArray($exercise, workdiv) {
    const exerciseId = getId($exercise);
    if (typeof items[exerciseId] !== 'undefined') {
      studentWork = items[exerciseId];
      // check that saved data is an array, not a string
      if (typeof(studentWork) == "object") {
        // if (debug) console.log('loading ' + exerciseId)
        $exercise.find(workdiv).each(function () {
          const value = studentWork.shift();
          $(this).val(value);
        });
      } else {
        console.log(exerciseId + ' not loaded: wrong type');
      }
    }
  }

  function loadArraytoCheckboxes($exercise, workdiv) {
    const exerciseId = getId($exercise);
    if (typeof items[exerciseId] !== 'undefined') {
      studentWork = items[exerciseId];
      // check that saved data is an array, not a string
      if (typeof(studentWork) == "object") {
        // if (debug) console.log('loading ' + exerciseId)
        $exercise.find(workdiv).each(function () {
          const value = studentWork.shift();
          $(this).prop('checked', value);
        });
      } else {
        console.log(exerciseId + ' not loaded: wrong type');
      }
    }
  }

  function loadWork() {

    if (debug) console.log('loading saved work');

    ids = [];  // reset found list of found ids

    // Translation and Numerical
    $('[data-carnap-type=translate], [data-carnap-qualitativetype=numerical]').each(function () {
      loadSimple($(this), 'input');
    });

    // Qualitative Short Answer and Derivations
    $('[data-carnap-qualitativetype=shortanswer], [data-carnap-type=proofchecker]').each(function () {
      loadSimple($(this), 'textarea');
    });

    // Countermodels
    $('[data-carnap-type=countermodeler]').each(function () {
      loadArray($(this), 'textarea');
    });

    // Truth Tables
    $('[data-carnap-type=truthtable]').each(function () {
      loadArray($(this), 'select');
    });
    
    // Multiple Choice and Multiple Selection
    $('[data-carnap-qualitativetype=multiplechoice], [data-carnap-qualitativetype=multipleselection]').each(function () {
      loadArraytoCheckboxes($(this), 'input');
    });

    // Syntax Problems
    // Sequent Calculus Problems
    // Gentzen-Prawitz Natural Deduction Problems
    
    if (debug) console.log('done loading');

  }

  function successCallback(as) {

    // if (debug) console.log('fetched assignment state: ' + JSON.stringify(as));

    // read assignment state
    if (typeof as[namespace] === 'undefined') {
      if (debug) console.log('no saved work; creating empty list')
      items = {};
    } else {
      items = as[namespace];
      // if (debug) console.log('fetched items: ' + JSON.stringify(items));
    }

    loadWork();

    // use Page Visibility API instead of beforeunload for mobile friendly saving
    // https://www.igvita.com/2015/11/20/dont-lose-user-and-app-state-use-page-visibility/
    
    // subscribe to visibility change events
    document.addEventListener('visibilitychange', function() {
      // fires when user switches tabs, apps, goes to homescreen, etc.
      // if (document.visibilityState == 'hidden') saveWork();
      //if (document.visibilityState == 'visible') fetchWork();
    });

    $(window).on('beforeunload', saveWork);
    $('input').on('blur', saveWork);
    $('textarea').on('blur', saveWork);
    $('select').on('blur', saveWork);
    // $(window).on('focus', fetchWork);
    // $(window).on('focus', function() {console.log('focused!')});
  }

  function failureCallback(error) {
    if (debug) console.log('failure: ' + error)
  }

  function fetchWork() {
    try {
      if (debug) console.log('fetching assignment state');
      CarnapServerAPI.getAssignmentState().then(successCallback, failureCallback);
    } catch {
      if (debug) console.log('Unable to access CarnapServerAPI');
    }
  }
  
  fetchWork();
}

document.addEventListener("carnap-loaded", initSaveWork)

