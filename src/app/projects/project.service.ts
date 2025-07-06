import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Project {
  id: number;
  name: string;
  owner: string;
  status: 'Active' | 'Completed';
  completedTasks: number;
  totalTasks: number;
  summary: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projectsData: Project[] = [
    {
      id: 1,
      name: 'Website Redesign',
      owner: 'Alice',
      status: 'Active',
      completedTasks: 3,
      totalTasks: 5,
      summary: 'Revamp company website for Q3',
      description: 'Landing page and features page'
    },

    {
      id: 2,
      name: 'Mobile App Launch',
      owner: 'Bob',
      status: 'Completed',
      completedTasks: 10,
      totalTasks: 10,
      summary: 'Launch Android and iOS versions',
      description: 'Launch Android and iOS versions'
    }
  ];

  private projectsSubject = new BehaviorSubject<Project[]>(this.projectsData);
  public projects$ = this.projectsSubject.asObservable();

  getProjects(): Project[] {
    return this.projectsSubject.getValue();
  }

  addProject(project: Project) {
    const updated = [...this.getProjects(), project];
    this.projectsSubject.next(updated);
  }

  updateProject(project: Project) {
    const updated = this.getProjects().map(p => p.id === project.id ? project : p);
    this.projectsSubject.next(updated);
  }

  deleteProject(id: number) {
    const updated = this.getProjects().filter(p => p.id !== id);
    this.projectsSubject.next(updated);
  }
}
