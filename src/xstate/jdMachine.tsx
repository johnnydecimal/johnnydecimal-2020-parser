import { Machine } from 'xstate';

const jdMachine = Machine({
  id: 'jdLanguage',
  initial: 'start',
  strict: true,
  states: {
    start: {
      on: {
        AREA: 'area_detected',
        CATEGORY: 'error',
        ID: 'error',
        COMMENT: 'start',
        DIVIDER: 'start',
        EMPTYLINE: 'start',
        EOF: 'eof',
        ERROR: 'error',
      },
    },

    area_detected: {
      on: {
        AREA: 'area_detected',
        CATEGORY: 'category_detected',
        ID: 'error',
        COMMENT: 'area_detected',
        DIVIDER: 'area_detected',
        EMPTYLINE: 'area_detected',
        EOF: 'eof',
        ERROR: 'error',
      },
    },

    category_detected: {
      on: {
        AREA: 'area_detected',
        CATEGORY: 'category_detected',
        ID: 'id_detected',
        COMMENT: 'category_detected',
        DIVIDER: 'category_detected',
        EMPTYLINE: 'category_detected',
        EOF: 'eof',
        ERROR: 'error',
      },
    },

    id_detected: {
      on: {
        AREA: 'area_detected',
        CATEGORY: 'category_detected',
        ID: 'id_detected',
        COMMENT: 'id_detected',
        DIVIDER: 'id_detected',
        EMPTYLINE: 'id_detected',
        EOF: 'eof',
        ERROR: 'error',
      },
    },

    eof: {
      type: 'final',
    },

    error: {
      type: 'final',
    },
  },
});

export default jdMachine;
