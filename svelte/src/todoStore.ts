import {writable} from 'svelte/store';

export interface Task {
    id: string;
    title: string;
    done: boolean;
}

function createTodoStore() {
    const {subscribe, update} = writable<Task[]>([]);

    return {
        subscribe,

        addTask: (title: string) => {
            update((tasks) => [...tasks, {id: Math.random().toString(), title, done: false}]);
        },

        checkTask: (id: string) => {
            update((tasks) => tasks.map((task) => (task.id === id ? {...task, done: true} : task)));
        },

        uncheckTask: (id: string) => {
            update((tasks) => tasks.map((task) => (task.id === id ? {...task, done: false} : task)));
        },

        deleteTask: (id: string) => {
            update((tasks) => tasks.filter((task) => task.id !== id));
        },
    };
}

// Exporter une instance unique du store
export const todoStore = createTodoStore();
