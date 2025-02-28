import {FunctionComponent, useReducer, useRef} from 'react';
import './App.css';
import {Task, TodoActionTypes, todoReducer} from './todoReducer';

export const App: FunctionComponent = () => {
    const [state, dispatch] = useReducer(todoReducer, {tasks: []});
    const titleInputRef = useRef<HTMLInputElement>(null);

    const _handleSubmitTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = titleInputRef.current;

        if (!input) {
            return;
        }

        dispatch({type: TodoActionTypes.ADD_TASK, payload: {title: input.value}});
        input.value = '';
    };

    const _handleToggleTask = (task: Task) => {
        dispatch({
            type: task.done ? TodoActionTypes.UNCHECK_TASK : TodoActionTypes.CHECK_TASK,
            payload: {id: task.id},
        });
    };

    const _handleDeleteTask = (task: Task) => {
        dispatch({type: TodoActionTypes.DELETE_TASK, payload: {id: task.id}});
    };

    return (
        <>
            <h1>✨ TODO App ✨</h1>
            <form className="todo-form" onSubmit={_handleSubmitTask}>
                <input type="text" ref={titleInputRef} name="title" />
                <button type="submit">Add</button>
            </form>
            <ul className="todo-list">
                {state.tasks.map((task) => (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.done} onChange={() => _handleToggleTask(task)} />
                        <span className="title">{task.title}</span>
                        <button onClick={() => _handleDeleteTask(task)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    );
};
