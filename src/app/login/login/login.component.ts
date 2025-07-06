import { Component } from '@angular/core';
import { AuthService } from '../../Auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  loading = false;
  constructor(private auth: AuthService, private router: Router, private messageService: MessageService) { }

  login() {
    this.errorMessage = '';

    if (this.username && this.password) {
      this.loading = true;

      setTimeout(() => {
        const success = this.auth.login(this.username, this.password);
        this.loading = false;

        if (success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Login Successful',
            detail: 'You have successfully logged in'
          });
          this.router.navigate(['/projects']);
        } else {
          this.errorMessage = 'Invalid username or password.';
        }
      }, 3000);
    } else {
      this.errorMessage = 'Please enter username and password.';
    }
  }

}
