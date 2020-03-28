import { Machine } from 'xstate';

const jdMachine = Machine({
  id: 'jdLanguage',
  initial: 'start',
  strict: true,
  context: {
    johnny: 'test',
  },
  states: {
    start: {
      on: {
        AREA: 'area_detected',
        CATEGORY: 'error',
        ID: 'error',
        COMMENT: 'start',
        DIVIDER: 'start',
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
        EOF: 'eof',
        ERROR: 'error',
      },
      meta: {
        name: 'category',
      },
    },

    id_detected: {
      on: {
        AREA: 'area_detected',
        CATEGORY: 'category_detected',
        ID: 'id_detected',
        COMMENT: 'id_detected',
        DIVIDER: 'id_detected',
        EOF: 'eof',
        ERROR: 'error',
      },
      meta: {
        name: 'id',
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
