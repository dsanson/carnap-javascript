# carnap-javascript

This is a place for me to put javascript snippets and widgets that are meant to work
with <https://carnap.io>.

# checklist.js

This can be used to add persistent checklists to Carnap assignment pages. To
try it out, upload the [Checklist Example](Checklist%20Example) to Carnap.io,
and make it into an assignment. You can also find the Checklist Example on
Carnap as a Shared Document. But note that the script only works on *assigned*
documents, just like exercise submission only works on assigned documents.

The Checklist Example includes a link the `checklist.js` in its yaml header,
and then includes the following raw html list:

```html
<ul class="task-list">
<li><input type="checkbox" value="syllabus" disabled="" />
Read the syllabus</li>
<li><input type="checkbox" value="quiz 1" disabled="" />
Complete the syllabus quiz</li>
<li><input type="checkbox" value="sign up" disabled="" />
Create an account on Carnap.io</li>
</ul>
```

Note that you need to use raw html for your checklists, and each input box
needs to have a unique `value` attribute set, as the script uses the `value`
attribute to identify checkboxes across reloads.

If you use pandoc, an easy way to generate this raw html is to start with
github-style markdown checkboxes, use pandoc (with the `task_lists` extension
enabled) to convert them to html, and then add the `value` attributes by hand.
This is how I generated the example, starting from:

```markdown
-   [ ] Read the syllabus
-   [ ] Complete the syllabus quiz
-   [ ] Create an account on Carnap.io
```

We need to use raw html for your checklists, not markdown, for two reasons:

-   Carnap.io does not currently have pandoc's `task_lists` extension enabled,
    so github-style markdown task lists are not parsed as task lists.
-   Even if `task_lists` were enabled, pandoc does not currently support any
    syntax for specifying a value attribute for the checkbox, and the script
    uses value attributes to identify each checkbox across reloads.

Some ideas for getting past the second limitation:

-   If a checkbox doesn't have a value attribute, we could construct the value
    attribute out of the text content.
-   If a checkbox doesn't have a value, we could look for a descendent span
    that has an appropriate attribute, and make use of pandoc's
    `bracketed_spans` syntax.





