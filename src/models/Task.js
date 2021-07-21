export class Task {
  constructor(name = 'test') {
    this.name = name;

  }

  getAllTask() {
    let allTask = JSON.parse(sessionStorage.getItem('user')).find(k => k.login == this.name);

    return allTask.task;
  }
  addTask(task) {
    let allTask = JSON.parse(sessionStorage.getItem('user')).find(k => k.login = this.name);
    let indexFind = JSON.parse(sessionStorage.getItem('user')).findIndex((item) => item.login == this.name);
    let objUser = JSON.parse(sessionStorage.user);
    objUser[indexFind].task = task;
    sessionStorage.setItem('user',JSON.stringify(objUser));
    console.log(JSON.parse(sessionStorage.getItem('user')));
    return true;
  }
}
