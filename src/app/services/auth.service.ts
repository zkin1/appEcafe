import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { id: 1, name: 'admin', email: 'admin', password: 'admin', isAdmin: true },
    { id: 2, name: 'user', email: 'user', password: 'user', isAdmin: false }
  ];
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor() {}

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }

  logout() {
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.isAdmin || false;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentUserName(): string | null {
    return this.currentUserSubject.value?.name || null;
  }

  getUsers(): User[] {
    return this.users;
  }

  register(name: string, email: string, password: string): boolean {
    if (this.users.some(u => u.email === email)) {
      return false; // El usuario ya existe
    }
    const newUser: User = {
      id: this.users.length + 1,
      name,
      email,
      password,
      isAdmin: false
    };
    this.users.push(newUser);
    return true;
  }

  addUser(user: Omit<User, 'id'>): User {
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updatedUser: Partial<User>): User | null {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser };
      return this.users[index];
    }
    return null;
  }

  deleteUser(id: number): boolean {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}