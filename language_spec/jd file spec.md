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

/* Comments like this
   also allowed */

---               // Markdown-style dividers allowed.

002 Project
10-19 Area
                  // Don't need to define any Categories etc. underneath if you don't want to.
                  // Any number of blank lines are fine.
30-39 Area
   33 Category
   33.28 ID       // Nothing needs to start from the start, as long as it's in order.

40-49 Area
 46 Category      // Indentation is optional. Whitespace is ignored.
46.84 ID          // But prettier will do it for you on processing, unless you specify otherwise.
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

---

10-19 Area        // If there's one Project, everything needs a Project [6].

[5]: Projects must be in order within the file.
[0]: Areas must be in order within a Project.
[1]: Categories must be in order within an Area.
[2]: IDs must be in order within a Category.
[3]: Categories must follow the correct Area.
[4]: IDs must follow the correct Category.
[6]: The file must either start with a Project, or contain only one ACID.
```

---

# Future/thoughts/other

1. v1 will not support storing the whole PACID number, e.g. 211.18.14. Of course the tool will be able to _construct_ and _export_ this for you, but it's unsupported as a format in the `.jd` file.
