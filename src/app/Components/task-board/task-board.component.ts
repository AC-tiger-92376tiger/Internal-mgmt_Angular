import { Component } from '@angular/core';
import { Task } from '../../shared/models/task.model';
import { TaskService } from '../../shared/Services/task.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-task-board',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css'
})
export class TaskBoardComponent {
  tasks: Task[] = [];
  ToDoTasks: Task[] = [];
  InProgressTasks: Task[] = [];
  DoneTasks: Task[] = [];
  //id: number = 0;

  constructor(private taskService: TaskService) {
    //this.loadTasks();
  }
  
  ngOnInit(): void {
    this.loadTasks();
    
    
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
     
  }
  
    loadTasks() {
        this.taskService.getTasks().subscribe(
          data => {
            this.tasks = data;
            //console.log(this.tasks);  
            for (const task of this.tasks) {
              if (task.status === 1) {
                  this.ToDoTasks.push(task);
              } else if (task.status === 2) {
                  this.InProgressTasks.push(task);
              } else if (task.status === 3) {
                  this.DoneTasks.push(task);
              }
            } 
            //console.log(this.ToDoTasks); 
          }
        );   
        
    }
}
