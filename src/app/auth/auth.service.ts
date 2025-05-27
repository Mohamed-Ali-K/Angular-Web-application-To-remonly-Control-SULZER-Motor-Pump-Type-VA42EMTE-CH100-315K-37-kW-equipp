import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

/**
 * @Injectable()
 * Service responsible for handling user authentication.
 * It manages user registration, login, logout, and authentication status.
 */
@Injectable()
export class AuthService {
  /**
   * Subject that emits a boolean value when the authentication status changes.
   * True if the user is authenticated, false otherwise.
   */
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  /**
   * Registers a new user.
   * @param authData An object containing the user's email and password.
   */
  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  /**
   * Logs in an existing user.
   * @param authData An object containing the user's email and password.
   */
  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  /**
   * Logs out the current user.
   * Clears user data and navigates to the login page.
   */
  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  /**
   * Retrieves the current user's information.
   * @returns A copy of the user object if a user is logged in, otherwise undefined.
   */
  getUser() {
    return { ...this.user };
  }

  /**
   * Checks if a user is currently authenticated.
   * @returns True if a user is logged in, false otherwise.
   */
  isAuth() {
    return this.user != null;
  }

  /**
   * Handles successful authentication.
   * Emits an authChange event and navigates to the control page.
   * @private
   */
  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/control']);
  }
}
