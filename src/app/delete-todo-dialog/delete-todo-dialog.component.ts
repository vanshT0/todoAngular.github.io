import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';



@Component({
  selector: 'app-delete-todo-dialog',
  templateUrl: './delete-todo-dialog.component.html',
  styleUrls: ['./delete-todo-dialog.component.scss']
})
export class DeleteTodoDialogComponent implements OnInit {

  todos!: Todo[];


  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<DeleteTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo) { }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos()
  }

  close() {
    this.dialogRef.close()
  }
  
  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo)
    this.dataService.deleteTodo(index)
    this.close()
  }
  
 

  onFormSubmit(form: NgForm) {
    if (form.invalid) return
    
    const updatedTodo = {
      ...this.todo,
      ...form.value
    }
    
    this.dialogRef.close(updatedTodo)
  }

}