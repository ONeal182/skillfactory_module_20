import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";
import { User } from "./models/User";
import { Task } from "./models/Task";
import { regUser } from "./utils";
import { State } from "./state";
import { authUser } from "./services/auth";
import { v4 as uuid } from "uuid";
import { Render } from "./services/render.js";
export const appState = new State();
const loginForm = document.querySelector("#app-login-form");
const regBtn = document.querySelector('#app-regist-btn');
const addTsk = "<input class='add-new-task' type='text'>";
const userIcon = document.querySelector('.userIcon');

let auth = false;
const regAdmin = () =>{
  if(localStorage.getItem('user') === null || JSON.parse( localStorage.getItem('user')).find(k=>k.state === 'admin')){
    regUser(User,'admin', '123','admin');
  }
}

regAdmin();

console.log(localStorage.getItem('user'));
regBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");
  regUser(User, login, password);

})

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");

  let fieldHTMLContent = authUser(login, password)
    ? taskFieldTemplate
    : noAccessTemplate;

  document.querySelector("#content").innerHTML = fieldHTMLContent;
  if (authUser(login, password)) {
    const footer = document.querySelector('.footer');
    loginForm.style.display = 'none';
    userIcon.style.display = 'block';
    userIcon.addEventListener('click', () => {
      document.querySelector('.userIcon').classList.toggle('userIcon_down');
      document.querySelector('.selectMenu').classList.toggle('selectMenuShow');
    })
    document.querySelector('.logOut').addEventListener('click', () => {
      document.querySelector("#content").innerHTML = noAccessTemplate;
      document.querySelector('.userIcon').classList.remove('userIcon_down');
      document.querySelector('.selectMenu').classList.remove('selectMenuShow');
      userIcon.style.display = 'none';
      loginForm.style.display = 'flex';
      footer.style.display = 'none';
    })

    auth = true;
    const taskClass = new Task(login);
    let taskAll = taskClass.getAllTask();
    let render = new Render(login);

    const addTaskHtml = (task, btnData, login) => {
      if (auth) {
        render.addTaskHtml(task, btnData, login);
        render.footerInfo(task, login);
        taskClass.addTask(task);

      }
    }
    const transferTask = (task, datTask, login) => {
      if (auth) {
        render.transferTask(task, datTask, login);
        taskClass.addTask(task);
      }
    }
    const addHtmlSelected = (task, stateObj, prevElement) => {
      render.addHtmlSelected(task, stateObj, prevElement);
      console.log(task);
      taskClass.addTask(task);
    }
    const addTasks = (takeAll) => {
      render.addTasks(takeAll);
      taskClass.addTask(takeAll);
    }
    render.footerInfo(taskAll, login);
    render.disabledButton(taskAll);
    addTasks(taskAll);
    render.addDescription(taskAll);
    const btnCard = document.querySelectorAll('.add-card');
    btnCard.forEach((Element, key) => {
      Element.addEventListener('click', () => {

        let btnData = Element.dataset.btn;
        if (btnData != 'Backlog') {
          let prevElement = btnCard[key - 1].dataset.btn;
          addHtmlSelected(taskAll, prevElement, btnData);
          Element.previousElementSibling.classList.remove('task-submit_hidden');
          Element.classList.add('task-submit_hidden');
          transferTask(taskAll, btnData, login);
          taskClass.addTask(taskAll);
        } else {
          let newcontent = document.createElement('li', 'input');
          newcontent.className = "task-item";
          newcontent.innerHTML = addTsk;
          Element.previousElementSibling.append(newcontent);
          addTaskHtml(taskAll, btnData, login);
          taskClass.addTask(taskAll);
          render.footerInfo(taskAll);
        }
      })
    })
  }
});



