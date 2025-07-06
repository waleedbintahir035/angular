import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectTasksComponent } from './projects/project-tasks/project-tasks.component';
import { authGuard } from './Auth/auth.guard';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'projects', component: ProjectListComponent, canActivate: [authGuard] },
  { path: 'projects/:id/tasks', component: ProjectTasksComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'projects' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
