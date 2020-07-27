# carnap-javascript

This is a place to put javascript snippets and widgets that are meant to work
with <https://carnap.io>.

I have a few ideas, and I'm happy to take other suggestions:

- [x] persistent checklists
    - [ ] tied to assignments and managed automatically
- [x] countdown timer for timed assignments
- [ ] save in-progress student work and automatically reload
- [ ] reveal hints when a student gets an exercise wrong
- [ ] exercise B is disabled until completion of exercise A
    -   e.g., a multiple choice question asking whether a sentence is a
        truth-functionally true, truth-functionally contingent, or
        truth-functionally false is disabled
        until after the associated truth table is complete.
- [ ] progress meter (n out m exercises completed)
    - [ ] textual progress meter
    - [ ] graphical progress meter (e.g., horizontal bar at top or bottom of
      page)
- [ ] "cheesy" activity widgets, e.g.,
    - [ ] matching exercises
    - [ ] "fill-in-the-blank" propositional form exercises, and inference rule
      form exercises.
    - [ ] something for playing with inference rules, e.g., given sentence A,
      student provides some sentence B, and they are shown what would follow
      by rule R.

# checklist.js

This can be used to add persistent checklists to Carnap assignment pages. To
try it out, upload the `Checklist Example` file in [examples](examples) to Carnap.io,
and make it into an assignment. It is also available as a shared document on
Carnap.io:

<https://carnap.io/shared/dsanson@gmail.com/Checklist%20Example>

But note that the script only works when the document is made into an
*assignment*, so to test it out, you will need to download the shared file from Carnap, and then upload it, and then assign it.

# timer.js

This is a very minimal implementation of a countdown timer for time-limited
assignments on Carnap. For a live demo that includes information on how to use
it, see:

<https://carnap.io/shared/dsanson@gmail.com/Timer%20Example>

For a live demo that includes some custom css to position the timer, see:

<https://carnap.io/shared/dsanson@gmail.com/Timer%20Example%20with%20Custom%20CSS>

# save-work.js (in progress, not yet working)

This doesn't work yet. It saves student work, and reloads that work on page
reload.
