import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService, Project } from '../project.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  providers: [MessageService]
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  showDialog = false;
  selectedProject: Project | null = null;
  selectedStatus = 'All';
  statusOptions = ['All', 'Active', 'Completed'];

  constructor(private router: Router, private projectService: ProjectService, private messageService: MessageService) { }

  ngOnInit() {
    this.projectService.projects$.subscribe(projects => {
      this.projects = projects;
    });
  }


  get filteredProjects() {
    if (this.selectedStatus === 'All') return this.projects;
    return this.projects.filter(p => p.status === this.selectedStatus);
  }

  getProgress(project: Project): number {
    if (project.totalTasks === 0) return 0;
    return Math.round((project.completedTasks / project.totalTasks) * 100);
  }

  viewTasks(project: Project) {
    this.router.navigate(['/projects', project.id, 'tasks']);
  }

  editProject(project: Project) {
    this.selectedProject = { ...project };
    this.showDialog = true;
  }

  openAddDialog() {
    this.selectedProject = null;
    this.showDialog = true;
  }

  saveProject(data: any) {
    if (this.selectedProject) {
      this.projectService.updateProject({ ...this.selectedProject, ...data });
    } else {
      const newId = Math.max(...this.projects.map(p => p.id), 0) + 1;
      this.projectService.addProject({
        id: newId,
        name: data.name,
        owner: data.owner,
        status: data.status,
        description: data.description,
        completedTasks: 0,
        totalTasks: 0,
        summary: ''
      });
    }
    this.showDialog = false;
  }

  deleteProject(project: Project) {
    this.projectService.deleteProject(project.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Project Deleted',
      detail: `"${project.name}" has been removed successfully.`
    });
  }

  closeDialog() {
    this.showDialog = false;
  }
}
