import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";
import { User } from "./models/User";
import { Task } from "./models/Task";
import { regUser } from "./utils";
import { State } from "./state";
import { authUser } from "./services/auth";

export const appState = new State();
sessionStorage.clear();
const loginForm = document.querySelector("#app-login-form");
const regBtn = document.querySelector('#app-regist-btn');
const addTsk = "<input class='add-new-task' type='text'>";
let auth = false;


regBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");
  regUser(User, login, password);

})
const addHtmlTask = (task) => {
  let innerTask = document.querySelector(`.task-items[data-state = "${task.state}"] `);
  let newTask = document.createElement('li');
  newTask.className = "task-item";
  newTask.innerHTML = task.text;
  innerTask.previousElementSibling.append(newTask);

}

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
    auth = true;
    const task = new Task(login);
    let taskAll = task.getTask();
    const addTasks = (elObj) => {
      taskAll.forEach(Element =>
        addHtmlTask(Element)
          

        )
    }
    
    addTasks(taskAll);
    const btnCard = document.querySelectorAll('.add-card');
    btnCard.forEach(Element =>
      Element.addEventListener('click', () => {

        let newcontent = document.createElement('li', 'input');
        newcontent.className = "task-item";
        newcontent.innerHTML = addTsk;
        Element.previousElementSibling.append(newcontent);
        console.log(addTask(taskAll));
      })
    )

  }
});
const addTask = (task) => {
  if (auth) {
    let inputAddTask = document.querySelectorAll('.add-new-task');
    inputAddTask.forEach(Element =>
      Element.addEventListener('blur', () => {
          return Element.value;
      })
    )
  }

}

