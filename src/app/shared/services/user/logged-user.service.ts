import { Injectable } from '@angular/core';
import { LoggedUser } from "../../interfaces/user/user";
import { environment } from "../../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  private loggedUser: LoggedUser|null = null;

  constructor() { }

  /**
   * @return LoggedUser|null
   */
  getLoggedUser(): LoggedUser| null {
    return this.loggedUser;
  }

  /**
   * Set the logged user and the jwt token on local storage
   *
   * @param loggedUser
   */
  setLoggedUser(loggedUser: LoggedUser): void {
    this.loggedUser = loggedUser;
    localStorage.setItem(environment.token_key, loggedUser.token);
  }

  // todo: implement remove logged user for logout
}
