export class Task {
  constructor(name = 'test') {
    this.name = name;
    this.task = JSON.parse(sessionStorage.getItem('user')).find(login => this.name).task;
  }

    getTask(){
    let allTask = this.task
    return allTask;
    }
    addTask(task){
        this.task.push(task);
        return true;
    }
}
