import { Machine, assign } from 'xstate';

import isAreaOrderValid from '../jdHelpers/isAreaOrderValid';
import isCategoryOrderValid from '../jdHelpers/isCategoryOrderValid';
import isCategoryInArea from '../jdHelpers/isCategoryInArea';

// Context
const updateAreaContext = assign({
  area: (context, event) => event.jdNumber,
});
const updateCategoryContext = assign({
  category: (context, event) => event.jdNumber,
});
const updateIDContext = assign({
  id: (context, event) => event.jdNumber,
});

// Guards
const areaValid = (context, event) => {
  return isAreaOrderValid(context.area, event.jdNumber);
};

const categoryValid = (context, event) => {
  return (
    isCategoryInArea(context.area, event.jdNumber) &&
    isCategoryOrderValid(context.category, event.jdNumber)
  );
};

const jdMachine = Machine(
  {
    id: 'jdLanguage',
    initial: 'start',
    strict: true,
    context: {
      area: '',
      category: '',
      id: '',
    },
    states: {
      start: {
        on: {
          AREA: {
            target: 'area_detected',
            actions: 'updateAreaContext',
            // cond: 'areaValid', no need to check if it's the first area?
          },
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
          AREA: [
            {
              target: 'area_detected',
              actions: 'updateAreaContext',
              cond: 'areaValid',
            },
            { target: 'error' },
          ],
          CATEGORY: {
            target: 'category_detected',
            actions: 'updateCategoryContext',
          },
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
          AREA: {
            target: 'area_detected',
            actions: 'updateAreaContext',
          },
          CATEGORY: [
            {
              target: 'category_detected',
              actions: 'updateCategoryContext',
              cond: 'categoryValid',
            },
            { target: 'error' },
          ],
          ID: {
            target: 'id_detected',
            actions: 'updateIDContext',
          },
          COMMENT: 'category_detected',
          DIVIDER: 'category_detected',
          EMPTYLINE: 'category_detected',
          EOF: 'eof',
          ERROR: 'error',
        },
      },

      id_detected: {
        on: {
          AREA: {
            target: 'area_detected',
            actions: 'updateAreaContext',
          },
          CATEGORY: {
            target: 'category_detected',
            actions: 'updateCategoryContext',
          },
          ID: {
            target: 'id_detected',
            actions: 'updateIDContext',
          },
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
  },
  {
    actions: { updateAreaContext, updateCategoryContext, updateIDContext },
    guards: { areaValid, categoryValid },
  }
);

export default jdMachine;

/* TypeScript stuff. Save this for later.
interface JDStateSchema {
  states: {
    start: {};
    area_detected: {};
    category_detected: {};
    id_detected: {};
    eof: {};
    error: {};
  };
}

type ContextObject = {
  area: string;
  category: string;
  id: string;
};

type JDEvent =
  | { type: 'AREA'; actions: 'updateAreaContext' }
  | { type: 'CATEGORY' }
  | { type: 'ID' }
  | { type: 'ERROR' }
  | { type: 'COMMENT' }
  | { type: 'DIVIDER' }
  | { type: 'EMPTYLINE' }
  | { type: 'EOF' };

*/
