import {reactive} from 'vue';

export interface Task {
    id: string;
    title: string;
    done: boolean;
}

const state = reactive<{tasks: Task[]}>({tasks: []});

const addTask = (title: string) => {
    state.tasks.push({
        id: Math.random().toString(),
        title,
        done: false,
    });
};

const checkTask = (id: string) => {
    const task = state.tasks.find((task) => task.id === id);
    if (task) task.done = true;
};

const uncheckTask = (id: string) => {
    const task = state.tasks.find((task) => task.id === id);
    if (task) task.done = false;
};

const deleteTask = (id: string) => {
    state.tasks = state.tasks.filter((task) => task.id !== id);
};

export default {
    state,
    addTask,
    checkTask,
    uncheckTask,
    deleteTask,
};
