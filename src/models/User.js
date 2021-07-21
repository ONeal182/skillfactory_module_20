import { BaseModel } from "./BaseModel";
import { getFromStorage, addToStorage } from "../utils";

export class User extends BaseModel {
  constructor(login, password,roll = 'user') {
    super();
    this.login = login;
    this.password = password;
    this.roll = roll;
    this.storageKey = "users";
  }
  get hasAccess() {
    let users = getFromStorage(this.storageKey);
    if (users.length == 0) return false;
    for (let user of users) {
      if (user.login == this.login && user.password == this.password)
        return true;
    }
    return false;
  }
  static save(user) {
    try {
      addToStorage(user, user.storageKey);
      let userObj = {
        login: user.login,
        password: user.password,
        id: user.id,
        steate: user.roll,
        auth: true,
        task: []
      };
      let userJson = JSON.stringify(userObj);
      let usserArray = []

      if (localStorage.getItem('user') === null) {
        usserArray.push(JSON.parse(userJson));

        localStorage.setItem('user', JSON.stringify(usserArray));

      } else {
        let newUser = JSON.parse(userJson);
        let objUser = JSON.parse(localStorage.getItem('user'));
        objUser.push(newUser);
        localStorage.setItem('user', JSON.stringify(objUser));
      }
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}
