<script lang="ts">
    import {todoStore} from './todoStore';
    import type {Task} from './todoStore';

    const {addTask, checkTask, uncheckTask, deleteTask} = todoStore;

    let newTask = '';

    const _handleSubmitTask = (e: Event) => {
        e.preventDefault();
        if (newTask) {
            addTask(newTask);
            newTask = '';
        }
    };

    const _handleToggleTask = (task: Task) => {
        if (task.done) {
            uncheckTask(task.id);
        } else {
            checkTask(task.id);
        }
    };

    const _handleDeleteTask = (task: Task) => {
        deleteTask(task.id);
    };
</script>

<main>
    <h1>✨ TODO App ✨</h1>
    <form class="todo-form" on:submit={_handleSubmitTask}>
        <input type="text" bind:value={newTask} name="title" />
        <button type="submit">Add</button>
    </form>
    <ul class="todo-list">
        {#each $todoStore as task (task.id)}
            <li>
                <input type="checkbox" bind:checked={task.done} on:click={() => _handleToggleTask(task)} />
                <span class="title">{task.title}</span>
                <button on:click={() => _handleDeleteTask(task)}>Delete</button>
            </li>
        {/each}
    </ul>
</main>

<style>
    input {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        margin-right: 1rem;
    }

    .todo-list {
        list-style-type: none;
        padding: 0;
    }

    .todo-list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
    }

    .todo-list li .title {
        flex: 1;
        text-align: left;
    }
</style>
