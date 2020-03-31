Don't forget these include the parsing engine so you can be really specific.
And you want to test every error.

Holy shit this system is self-descriptive. :-)

// TODO Build indenting like 12.02 in to the parser! It's nice.

10-19     Out-of-order errors
   11     Projects

   12     Areas
   12.11  *An area which immediately follows a project can't be lower than*
          *a preceding area, because that area does not exist.*
   12.12  An area which immediately follows another area has an area number
          lower than the preceding area.
   12.13  An area which follows a category has an area number lower than the
          preceding area.
   12.14  An area which follows an ID has an area number lower than the
          preceding area.

   13 Categories
   13.11  *A category may not immediately follow a project. See **CODE***.
   13.12  *A category which immediately follows an area can't be lower than*
          *the preceding category, because that category does not exist.*
   13.13  A category which immediately follows another category has a category
          number lower than the preceding category.
   13.14  A category which follows an ID has a category number lower than the
          preceding category.

   14 IDs
   14.11  *An ID can not immediately follow a project. See **CODE***.
   14.12  *An ID can not immediately follow an area. See **CODE**.*
   14.13  *An ID which immediately follows a category can't be lower than*
          *a preceding ID, because that ID does not exist.*
   14.14  An ID which follows an ID has an ID lower than the preceding ID.

20-29     Ownership errors
   21     Projects

   22     Areas

   23     Categories
   23.22  A category does not belong to its parent area.

   24     IDs
   24.23  An ID does not belong to its parent category.
   
30-39     Missing errors