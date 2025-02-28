import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private tasks = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasks.asObservable();

  addTask(title: string) {
    const newTask: Task = { id: Math.random().toString(), title, done: false };
    this.tasks.next([...this.tasks.getValue(), newTask]);
  }

  checkTask(id: string) {
    this.tasks.next(
      this.tasks
        .getValue()
        .map((task) => (task.id === id ? { ...task, done: true } : task))
    );
  }

  uncheckTask(id: string) {
    this.tasks.next(
      this.tasks
        .getValue()
        .map((task) => (task.id === id ? { ...task, done: false } : task))
    );
  }

  deleteTask(id: string) {
    this.tasks.next(this.tasks.getValue().filter((task) => task.id !== id));
  }
}
