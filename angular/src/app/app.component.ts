import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TodoService } from './services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AppComponent {
  title = 'angular';
  tasks$: Observable<Task[]>;
  newTask = '';

  constructor(private todoService: TodoService) {
    this.tasks$ = this.todoService.tasks$;
  }

  addTask() {
    if (this.newTask.trim()) {
      this.todoService.addTask(this.newTask);
      this.newTask = '';
    }
  }

  toggleTask(task: Task) {
    task.done
      ? this.todoService.uncheckTask(task.id)
      : this.todoService.checkTask(task.id);
  }

  deleteTask(id: string) {
    this.todoService.deleteTask(id);
  }
}
