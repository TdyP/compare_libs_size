export interface Task {
    id: string;
    title: string;
    done: boolean;
}

export interface TodoState {
    tasks: Task[];
}

export enum TodoActionTypes {
    ADD_TASK = 'ADD_TASK',
    CHECK_TASK = 'CHECK_TASK',
    UNCHECK_TASK = 'UNCHECK_TASK',
    DELETE_TASK = 'DELETE_TASK',
}

export type TodoAction =
    | {
          type: TodoActionTypes.ADD_TASK;
          payload: {title: string};
      }
    | {
          type: TodoActionTypes.CHECK_TASK;
          payload: {id: string};
      }
    | {
          type: TodoActionTypes.UNCHECK_TASK;
          payload: {id: string};
      }
    | {
          type: TodoActionTypes.DELETE_TASK;
          payload: {id: string};
      };

export const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
    switch (action.type) {
        case TodoActionTypes.ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, {id: Math.random().toString(), title: action.payload.title, done: false}],
            };
        case TodoActionTypes.CHECK_TASK:
            return {
                ...state,
                tasks: state.tasks.map((todo) => (todo.id === action.payload.id ? {...todo, done: true} : todo)),
            };
        case TodoActionTypes.UNCHECK_TASK:
            return {
                ...state,
                tasks: state.tasks.map((todo) => (todo.id === action.payload.id ? {...todo, done: false} : todo)),
            };
        case TodoActionTypes.DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((todo) => todo.id !== action.payload.id),
            };
        default:
            return state;
    }
};
