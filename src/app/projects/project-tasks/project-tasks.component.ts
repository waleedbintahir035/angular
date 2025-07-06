import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html'
})
export class ProjectTasksComponent implements OnInit {
  tasks: any[] = [];
  showDialog: boolean = false;
  taskForm!: FormGroup;

  newTask: any = {
    title: '',
    assignee: '',
    dueDate: null,
    status: '',
    priority: ''
  };

  statusOptions = ['Pending', 'In Progress', 'Completed'];
  priorityOptions = ['Low', 'Medium', 'High'];

  projectId: number = 0;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      assignee: ['', Validators.required],
      dueDate: [null, Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required]
    });
    this.projectId = +this.route.snapshot.paramMap.get('id')!;

    this.tasks = [
      {
        id: 101,
        projectId: 1,
        title: "Wireframe new homepage",
        assignee: "Emma",
        dueDate: "2025-07-10",
        status: "In Progress",
        priority: "High"
      },
      {
        id: 102,
        projectId: 1,
        title: "Get stakeholder approval",
        assignee: "Liam",
        dueDate: "2025-07-12",
        status: "Pending",
        priority: "Medium"
      },
      {
        id: 103,
        projectId: 2,
        title: "Beta test with internal team",
        assignee: "Olivia",
        dueDate: "2025-06-28",
        status: "Completed",
        priority: "High"
      },
      {
        id: 104,
        projectId: 2,
        title: "Fix reported bugs",
        assignee: "Noah",
        dueDate: "2025-06-29",
        status: "Completed",
        priority: "High"
      },
      {
        id: 105,
        projectId: 2,
        title: "Submit to app stores",
        assignee: "Ava",
        dueDate: "2025-07-01",
        status: "Completed",
        priority: "Medium"
      }
    ].filter(task => task.projectId === this.projectId);
  }


  openAddDialog() {
    this.newTask = {
      title: '',
      assignee: '',
      dueDate: null,
      status: '',
      priority: ''
    };
    this.showDialog = true;
  }

  addTask() {
    const newId = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
    const task = { id: newId, projectId: this.projectId, ...this.newTask };
    this.tasks.push(task);
    this.showDialog = false;
  }
  get overdueTasks(): number {
    const today = new Date();
    return this.tasks.filter(task =>
      new Date(task.dueDate) < today && task.status !== 'Completed'
    ).length;
  }
  get completedTasks(): number {
    return this.tasks.filter(task => task.status === 'Completed').length;
  }

  getPriorityColor(priority: string) {
    switch (priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'info';
    }
  }
}
