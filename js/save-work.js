/* eslint-env jquery */
/* global AssignmentState, putAssignmentState, document, window */
// save_work.js
// A script to save incomplete student work on Carnap.io

function initSaveWork() {
  const debug = true;
  const namespace = 'save-work';
  let items;
  let ids = []; // a list for tracking duplicate ids

  if (debug) console.log('save-work.js debugging on')

  // use a hash function to generate hopefully unique exercise IDs
  // https://gist.github.com/vaiorabbit/5657561
  function fnv32a( str ) {
    var FNV1_32A_INIT = 0x811c9dc5;
    var hval = FNV1_32A_INIT;
    for ( var i = 0; i < str.length; ++i )
    {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    return hval >>> 0;
  }

  function getId($exercise) {

    // use an assigned identifier if it exists
    id = $exercise.attr('data-carnap-identifier');
    
    // but if not, construct an identifier
    if (!id) {
      t = $exercise.attr('data-carnap-type')
      if (t == 'qualitative') {
        t = $exercise.attr('data-carnap-qualitativetype')
      }
      g = $exercise.attr('data-carnap-goal')
      // identifier is a hash of type and goal
      id = fnv32a(t + g);
    } 
   
    // avoid duplicate ids
    n = 0
    while ( ids.includes(id) ) {
      n = n + 1;
      if (debug) console.log('incrementing id');
      id = id + '-' + n.toString();
    }
    ids.push(id);

    if (debug) console.log($exercise.parent().attr('data-carnap-label') + ' id: ' + id);
    return id;
  }

  function saveWork() {

    if (debug) console.log('saving work');

    ids = [];  // reset found list of found ids

    // Translation and Numerical
    $('[data-carnap-type=translate], [data-carnap-qualitativetype=numerical]').each(function () {
      const exerciseId = getId($(this));
      const studentWork = $(this).find('input').val();
      items[exerciseId] = studentWork;
      if (debug) console.log('Saving ' + exerciseId + ': ' + studentWork);
    });

    // Qualitative Short Answer and Derivations
    $('[data-carnap-qualitativetype=shortanswer], [data-carnap-type=proofchecker]').each(function () {
      const exerciseId = getId($(this));
      const studentWork = $(this).find('textarea').val();
      items[exerciseId] = studentWork;
      if (debug) console.log('Saving ' + exerciseId + ': ' + studentWork);
    });

    // Countermodels
    $('[data-carnap-type=countermodeler]').each(function () {
      const exerciseId = getId($(this));
      items[exerciseId] = [];
      if (debug) console.log('Saving ' + exerciseId);
      $(this).find('textarea').each(function () {
        items[exerciseId].push($(this).val());
      });
    });

    // Truth Tables
    $('[data-carnap-type=truthtable]').each(function () {
      const exerciseId = getId($(this));
      items[exerciseId] = [];
      if (debug) console.log('Saving ' + exerciseId);
      $(this).find('select').each(function () {
        items[exerciseId].push($(this).val());
      });
    });

    // Multiple Choice and Multiple Selection
    $('[data-carnap-qualitativetype=multiplechoice], [data-carnap-qualitativetype=multipleselection]').each(function () {
      const exerciseId = getId($(this));
      items[exerciseId] = [];
      if (debug) console.log('Saving ' + exerciseId);
      $(this).find('input').each(function () {
        items[exerciseId].push($(this).prop('checked'));
      });
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
        if (debug) console.log('loading ' + exerciseId)
        $exercise.find(workdiv).val(studentWork);
      } else {
        console.log(excerciseId + ' not loaded: wrong type');
      }
    }
  }

  function loadArray($exercise, workdiv) {
    const exerciseId = getId($exercise);
    if (typeof items[exerciseId] !== 'undefined') {
      studentWork = items[exerciseId];
      // check that saved data is an array, not a string
      if (typeof(studentWork) == "object") {
        if (debug) console.log('loading ' + exerciseId)
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
        if (debug) console.log('loading ' + exerciseId)
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

