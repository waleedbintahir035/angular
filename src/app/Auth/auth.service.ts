import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    isAuthenticated(): boolean {
        return !!sessionStorage.getItem('user');
    }

    login(username: string, password: string): boolean {
        if (username === 'assigment@lmkr.com' && password === 'assigment') {
            sessionStorage.setItem('user', JSON.stringify({ username }));
            return true;
        }
        return false;
    }

    logout() {
        sessionStorage.removeItem('user');
    }
}
