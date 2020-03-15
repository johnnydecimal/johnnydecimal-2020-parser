const projectFileStates = {
  initial: 'project_detected',
  states: {
    project_detected: {
      on: {
        FIND_COMMENT: 'project_detected',
        FIND_PROJECT: 'project_detected',
        FIND_AREA: 'area_detected',
        OTHER: 'error',
      },
    },
    area_detected: {
      on: {
        FIND_COMMENT: 'area_detected',
        FIND_PROJECT: 'project_detected',
        FIND_AREA: 'area_detected',
        FIND_CATEGORY: 'category_detected',
        OTHER: 'error',
      },
    },
    category_detected: {
      on: {
        FIND_COMMENT: 'category_detected',
        FIND_PROJECT: 'project_detected',
        FIND_AREA: 'area_detected',
        FIND_CATEGORY: 'category_detected',
        FIND_ID: 'id_detected',
        OTHER: 'error',
      },
    },
    id_detected: {
      on: {
        FIND_COMMENT: 'id_detected',
        FIND_PROJECT: 'project_detected',
        FIND_AREA: 'area_detected',
        FIND_CATEGORY: 'category_detected',
        FIND_ID: 'id_detected',
        OTHER: 'error',
      },
    },

    error: {},
  },
  on: {
    EOF: 'eof',
  },
};

const jdLanguage = Machine({
  id: 'jdLanguage',
  initial: 'start',
  states: {
    start: {
      on: {
        FIND_COMMENT: 'start',
        FIND_PROJECT: 'project_based_file',
        FIND_AREA: 'not_project_based_file',
        NOT_FIND_EITHER: 'error',
      },
    },

    project_based_file: {
      ...projectFileStates,
    },

    not_project_based_file: {
      initial: 'start',
      states: {
        start: {},
      },
      on: {
        EOF: 'eof',
      },
    },
    eof: {},
    error: {},
  },
});
