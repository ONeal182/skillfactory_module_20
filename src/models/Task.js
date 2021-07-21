export class Task {
  constructor(name = 'test') {
    this.name = name;

  }

  getAllTask() {
    let allTask = JSON.parse(localStorage.getItem('user')).find(k => k.login == this.name);

    return allTask.task;
  }
  addTask(task) {
    let allTask = JSON.parse(localStorage.getItem('user')).find(k => k.login = this.name);
    let indexFind = JSON.parse(localStorage.getItem('user')).findIndex((item) => item.login == this.name);
    let objUser = JSON.parse(localStorage.user);
    objUser[indexFind].task = task;
    localStorage.setItem('user',JSON.stringify(objUser));
    console.log(JSON.parse(localStorage.getItem('user')));
    return true;
  }
}
