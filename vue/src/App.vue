<script setup lang="ts">
import {ref} from 'vue';
import todoStore,{type Task} from './todoStore';

const {state,addTask,checkTask,uncheckTask,deleteTask} = todoStore;

const titleInputRef = ref<HTMLInputElement | null>(null);

const _handleSubmitTask = (e: Event) => {
  e.preventDefault();
  if (titleInputRef.value) {
    addTask(titleInputRef.value.value);
    titleInputRef.value.value = '';
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

<template>
  <h1>✨ TODO App ✨</h1>
  <form class="todo-form" @submit="_handleSubmitTask">
    <input type="text" ref="titleInputRef" name="title" />
    <button type="submit">Add</button>
  </form>
  <ul className="todo-list">
    <li v-for="task in state.tasks" :key="task.id">
      <input type="checkbox" v-model="task.done" @click="_handleToggleTask(task)" />
      <span class="title">{{ task.title }}</span>
      <button @click="_handleDeleteTask(task)">Delete</button>
    </li>
  </ul>
</template>

<style scoped>
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

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
