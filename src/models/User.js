import { BaseModel } from "./BaseModel";
import { getFromStorage, addToStorage } from "../utils";

export class User extends BaseModel {
  constructor(login, password) {
    super();
    this.login = login;
    this.password = password;
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
        task:[ 
          {
            text: 'Login page – performance issues',
            state: 'Backlog'
          },
          {
            text: 'Sprint bugfix',
            state: 'Backlog'
          },
          {
            text: 'Shop page – performance issues',
            state: 'Ready'
          },
          {
            text: 'Checkout bugfix',
            state: 'Ready'
          },
          {
            text: 'Shop bug1',
            state: 'Ready'
          },
          {
            text: 'Shop bug2',
            state: 'Ready'
          },
          {
            text: 'Shop bug3',
            state: 'Ready'
          },
          {
            text: 'Shop bug4',
            state: 'Ready'
          },
          {
            text: 'User page – performance issues',
            state: 'InProgress'
          },
          {
            text: 'Auth bugfix',
            state: 'InProgress'
          },
          {
            text: 'Main page – performance issues',
            state: 'Finished'
          },
          {
            text: 'Main page bugfix',
            state: 'Finished'
          },
          
        ] };
      let userJson = JSON.stringify(userObj);
      let usserArray = []
      if (sessionStorage.getItem('user') === null) {
        usserArray.push(JSON.parse(userJson));

        sessionStorage.setItem('user', JSON.stringify(usserArray));

      }else{
        let newUser = JSON.parse(userJson);
        let objUser = JSON.parse(sessionStorage.getItem('user'));
        objUser.push(newUser);
        sessionStorage.setItem('user', JSON.stringify(objUser));
      }
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}
