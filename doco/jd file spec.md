# JD file spec

> How do you store JD data in exportable plain-text?

## What's legal?

```
000 Project
-----------       // Optional, semantically ignored.
10-19 Area
   11 Category
   11.01 ID
   12 Category    // JS-formatted comments always allowed.
   12.01 ID
   12.02 ID
20-29 Area
   21 Category
   21.01 ID

/* Multi-line comments like this are also allowed.
   But obviously not after JD items, just on their own. */

/* But of course anything at all
      10-19 Area
   inside the comment, is a comment.
   The error case here would be if a multi-line comment was never terminated.
*/

---               // Markdown-style dividers allowed anywhere, as long as
                  // they're the only thing on a line.

002 Project
10-19 Area
                  // You don't need to define any Categories etc. underneath
                  // if you don't want to.
                  // Any number of blank lines are fine.
30-39 Area
   33 Category
   33.28 ID       // Nothing needs to start from the start, as long as it's
                  // in order. Skip as many numbers as you like.

40-49 Area
 46 Category      // Indentation is optional. Whitespace is ignored.
46.84 ID          // But prettier will do it for you on processing, unless
                  // you specify otherwise.
```

## What about the meta-data thing?

Just chatting to Volker and it's not going to make sense to have to have all meta-data be forced below the main data. How can you inline it?

```
000 Project { location: "John's email" }
- this feels very code-y. Would Gruber pick this? Nope. Horrible.

000 Project    | location: John's email | Owner: John | Other metadata: I mean how long is a note going to be? This could get preposterous.

- this is pipe-separated so it can be formatted like a table

000 Project
    location: John's email
    owner: John
    other metadata: Now this note can be as long as you like.
    also: You want the keys in the key/value pair to be user-definable.
    so: it's just lowercase-key-name-colon, thing, newline?
20-29 Area
      location: SharePoint
      owner: John
      notes: This could work. Notes can be as long as you like as long as there's no eol there; up to you how they wrap in your editor, right?
      aah:   `If you want a true multi-line thing then you have
              to specify a multi-line thing somehow. Backticks?`
      "of course": this is all turned in to a standard JS object at the end of the day.

// What if this was equivalent (and interchangeable in a file):

29 Category | owner: John | "this property": is this value | and: so on

29 Category
   owner: John
   "this property": is this value
   and: so on
```

## What's illegal?

```
999 Project
-----------
20-29 Area
10-19 Area        // Out of order [0].
   19 Category
   11 Category    // Out of order [1].
   11.02 ID
   11.01 ID       // Out of order [2].
   23 Category    // AC mismatch [3].
   32.01          // ID mismatch [4].

000 Project       // Out of order [5].
-----------
10-19 Area
   11             // Everything must have a title [7].

000 Project
   11 Category    // You can't skip a thing, in this case the Area def.

---

10-19 Area        // If there's one Project, everything needs a Project [6].

[5]: Projects must be in order within the file.
[0]: Areas must be in order within a Project.
[1]: Categories must be in order within an Area.
[2]: IDs must be in order within a Category.
[3]: Categories must follow the correct Area.
[4]: IDs must follow the correct Category.
[6]: The file must either start with a Project, or contain only one ACID.
[7]: You may not create a number without a title.
```

---

# Future/thoughts/other

1. v1 will not support storing the whole PACID number, e.g. 211.18.14. Of course the tool will be able to _construct_ and _export_ this for you, but it's unsupported as a format in the `.jd` file.
