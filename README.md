# carnap-javascript

This is a place to put javascript snippets and widgets that are meant to work
with <https://carnap.io> using [Carnap's Javascript Extensions]. Everything
here is very much a work in progress, and sometimes progress is very slow.

  [Carnap's Javascript Extensions]: https://carnap.io/srv/doc/javascript.md


## checklist.js

Status: works

This script implements persistent checklists, saving checkbox states to the
Carnap server using the `AssignmentState` API. It also does a bunch of other
stuff related to checkboxes, including the option to auto-generate a checklist
for all exercises on a page, so students can track their own progress through
an assignment.

I have been using a version of this script successfully in my classes since
Fall 2020, and gradually making improvements and adding features. I believe it
is fairly reliable, but I have not stress-tested the most recent version yet.

For more details, see [this live
demo](https://carnap.io/shared/dsanson@gmail.com/Checklist%20Example).

## save-work.js

Status: works

This script implements persistent student work, saving the work a student has
done on exercises to the Carnap server using the `AssignmentState` API. It
doesn't currently support Syntax/Parsing problems, Sequent Calculus problems,
or Gentzen-Prawitz deductions.

For more details, see [this live
demo](https://carnap.io/shared/dsanson@gmail.com/Save%20Work%20Example).

TODO:

- [ ] synchronize work between multiple open tabs
- [ ] add support for syntax problems
- [ ] add support for Sequent Calculus problems 
- [ ] add support for Gentzen-Prawitz deductions

## timer.js

Status: works (?)

This is a very minimal implementation of a countdown timer for time-limited
assignments on Carnap. Here is a [live demo] with information on how to set it
up.

  [live demo]: https://carnap.io/shared/dsanson@gmail.com/Timer%20Example

I think this script works. But I haven't ended up using it myself, as I
haven't been using timed assignments.

## youtube-embed.js

This is a simple script meant to make it easier to embed youtube videos into
Carnap documents. It isn't really specific to Carnap in any way. To embed a video, create a div with the class 'youtube', and
put the URL inside the div, like so:

```
::: youtube
https://youtu.be/dQw4w9WgXcQ
:::
```

## Other ideas

- [ ] Due date countdown: display due date, and time until due date, for assignments with set due dates
- [ ] Hints: when a student gets an exercise wrong, reveal hints.
- [ ] Chaining: reveal/enable an exercise only after the successful completion
  of another exercise.reveal/enable an exercise only after successful
  completion of another exercise.
- [ ] Progress meter: checklist.js offers a not very intelligent sort of
  progress meter. But I'd like something intelligent, flexible, and pretty,
  like a graphical progress bar at the top or bottom of the page.
- [ ] Activity widgets: I'd like to have an easy flexible way to embed other
  sorts of interactive widgets into Carnap. But I don't want to reinvent the
  wheel. 


