# carnap-javascript

This is a place to put javascript snippets and widgets that are meant to work
with <https://carnap.io> using [Carnap's Javascript Extensions]. Everything
here is very much a work in progress, and sometimes progress is very slow.

  [Carnap's Javascript Extensions]: https://carnap.io/srv/doc/javascript.md

## timer.js

Status: works (?)

This is a very minimal implementation of a countdown timer for time-limited
assignments on Carnap. Here is a [live demo] with information on how to set it
up.

  [live demo]: https://carnap.io/shared/dsanson@gmail.com/Timer%20Example

I think this script works, but I haven't ended up using it myself, as I
haven't been using timed assignments.

## save-work.js

Status: works, but not reliably, which makes it useless

By default, Carnap loses all student work every time a page is reloaded. So
the idea here is to save work to the server, using the Carnap server's
AssignmentState.

Status:

This works, but not reliably, for all problem types except Sequent Calculus
Deductions and Gentzen-Prawitz Natural Deductions.

I believe the reason it is unreliable is a timing problem. We need to wait
until after Carnap is done loading and processing the page, before going in
and loading saved values. But right now, the Carnap javascript API does not
expose a hook for this.

TODO:

- [ ] make reliable
- [ ] add support for Sequent Calculus and Gentzen-Prawitz (using Carnap's
  JSON serialization?)
- [ ] also save information about submission status, if that can be done
  reliably

## Persistent Checklists

Status: broken

The simplest idea here is to implement persistent checklists, so a student can
check off items in a checklist, and when they reload the page, this
information will be retained.

But what I've actually created is a script that automatically generates a
checklist of all the exercises on a page, and adds a linked checkbox to each
problem. So students can check off each problem as they go, and get a quick
overview of their progress. But, like I say, it is currently broken.

TODO:

- [ ] fix!
- [ ] document!
- [ ] auto-check boxes based on problem-submision event

## youtube-embed.js

This is a simple script meant to make it easier to embed youtube videos into
Carnap documents. To embed a video, create a div with the class 'youtube', and
put the URL inside the div, like so:

```
::: youtube
https://youtu.be/dQw4w9WgXcQ
:::
```

## Other ideas

- [ ] display due date, and time until due date, for assignments with set due dates
- [ ] reveal hints when a student gets an exercise wrong
- [ ] exercise chaining
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





