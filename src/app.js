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

export const appState = new State();
sessionStorage.clear();
const loginForm = document.querySelector("#app-login-form");
const regBtn = document.querySelector('#app-regist-btn');
const addTsk = "<input class='add-new-task' type='text'>";
let auth = false;

const addTaskHtml = (task, btnData) => {
  let taskText;
  if (auth) {
    let inputAddTask = document.querySelectorAll('.add-new-task');
    inputAddTask.forEach(Element =>
      Element.addEventListener('blur', () => {
        taskText = Element.value;
        let newTask = {id:task.length  + 1, text: taskText, state: btnData };
        task.push(newTask)
        addNewHtmlTask(newTask);
        Element.parentElement.remove();
      })
    )

  }
}

const transferTask = (task, datTask) => {

  let taskText;
  if (auth) {
    let inputAddTask = document.querySelectorAll('.task-submit');
    let selectedTask = document.querySelector(`.task-items[data-state=${datTask}] .task-item_select`);
    let innerTask = document.querySelectorAll(`.task-items`);
    let addCard = document.querySelector(`.add-card[data-btn = ${datTask}]`)

    inputAddTask.forEach(Element =>
      Element.addEventListener('click', function handler(e) {
        clearAll(innerTask);
        taskText = selectedTask.value;
        let taskTextId = selectedTask.options[selectedTask.selectedIndex].dataset.id;
        task.forEach((Element2) => {

          if (Element2.id == taskTextId) {
             Element2.state = datTask;
          }
        }

        )
        
        task.forEach(Element1 =>
          addAllHtmlTask(Element1)
        )
        console.log(task);
        Element.classList.add('task-submit_hidden');
        selectedTask.parentElement.remove();
        addCard.classList.remove('task-submit_hidden');
        e.currentTarget.removeEventListener(e.type, handler);
      }, false)
    )

  }
}
const clearAll = (htmlContent) => {
  htmlContent.forEach(Element =>
    Element.innerHTML = ''
  );
}
const addTasks = (takeAll) => {
  takeAll.forEach(Element =>
    addAllHtmlTask(Element)
  )
}
regBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");
  regUser(User, login, password);

})
const addNewHtmlTask = (task) => {
  let innerTask = document.querySelector(`.task-items[data-state = "${task.state}"] `);
  let newTask = document.createElement('li');
  newTask.className = "task-item";
  newTask.innerHTML = task.text;
  innerTask.append(newTask);
}
const addAllHtmlTask = (task) => {
  console.log(task);
  let innerTask = document.querySelector(`.task-items[data-state = "${task.state}"] `);
  console.log(innerTask);
  let newTask = document.createElement('li');
  newTask.className = "task-item";
  newTask.innerHTML = task.text;
  innerTask.append(newTask);

}
const addHtmlSelected = (task, stateObj, prevElement) => {
  let innerTask = document.querySelector(`.task-items[data-state = "${prevElement}"] `);
  let newTask = document.createElement('li');
  let stateTask = ``;
  task.forEach((Element) => {

    newTask.className = "task-item";

    if (Element.state == stateObj) {
      stateTask += ` <option class="task-item_option" data-id="${Element.id}" value="${Element.text}">${Element.text}</option>`;
    }
  });
  newTask.innerHTML = `<select class="task-item_select" name="" id="">${stateTask}</select>`;

  innerTask.append(newTask);
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
    let taskAll = task.getAllTask();


    addTasks(taskAll);
    const btnCard = document.querySelectorAll('.add-card');
    btnCard.forEach((Element, key) => {
      Element.addEventListener('click', () => {

        let btnData = Element.dataset.btn;
        if (btnData != 'Backlog') {
          let prevElement = btnCard[key - 1].dataset.btn;
          addHtmlSelected(taskAll, prevElement, btnData);
          Element.previousElementSibling.classList.remove('task-submit_hidden');
          Element.classList.add('task-submit_hidden');
          transferTask(taskAll, btnData);

        } else {

          let newcontent = document.createElement('li', 'input');
          newcontent.className = "task-item";
          newcontent.innerHTML = addTsk;
          Element.previousElementSibling.append(newcontent);
          let text = addTaskHtml(taskAll, btnData);
        }



      })
    })

  }
});



