export class Render {
    constructor() {

    }
    addHtmlElement(task) {
        let innerTask = document.querySelector(`.task-items[data-state = "${task.state}"] `);
        let newTask = document.createElement('li');
        newTask.className = "task-item";
        newTask.innerHTML = task.name;
        newTask.dataset.id = task.id;
        innerTask.append(newTask);
    }
    addHtmlSelected(task, stateObj, prevElement) {
        let innerTask = document.querySelector(`.task-items[data-state = "${prevElement}"] `);
        let newTask = document.createElement('li');
        let stateTask = ``;
        task.forEach((Element) => {
            newTask.className = "task-item";
            if (Element.state == stateObj) {
                stateTask += ` <option class="task-item_option" data-id="${Element.id}" value="${Element.name}">${Element.name}</option>`;
            }
        });
        newTask.innerHTML = `<select class="task-item_select" name="" id="">${stateTask}</select>`;
        innerTask.append(newTask);
    }
    addTasks(takeAll) {
        takeAll.forEach(Element =>
            this.addHtmlElement(Element)
        )
    }
    clearAll(htmlContent) {
        htmlContent.forEach(Element =>
            Element.innerHTML = ''
        );
    }
    addDescription(taskobj) {
        let inputAddTask = document.querySelectorAll(`.task-items .task-item`);
        let task = taskobj;
        inputAddTask.forEach(Element => {
            Element.addEventListener('dblclick', function test(e) {
                task.forEach((Element1) => {
                    if (Number(Element1.id) === Number(Element.dataset.id)) {

                        let changeDiscription = document.querySelector(`.changeDiscription`);
                        let changeDiscriptionTextarea = document.querySelector(`.changeDiscription .changeTextare`);
                        let changeDiscriptionText = document.querySelector(`.changeDiscription .changeDiscriptionText`);
                        let nameTask = document.querySelector(`.changeDiscription .nameTask`);
                        let taskTextSubmit = document.querySelector(`.task-text-submit`);
                        let close = document.querySelector(`.close`);
                        changeDiscriptionTextarea.value = '';
                        changeDiscription.style.display = 'flex';
                        nameTask.textContent = Element1.name;

                        if (Element1.text != '') {
                            changeDiscriptionText.textContent = Element1.text;
                            changeDiscriptionText.style.display = 'block';
                            changeDiscriptionTextarea.value = '';
                        }
                        close.addEventListener('click', () => {
                            changeDiscription.style.display = 'none';
                            changeDiscriptionText.textContent = '';
                            nameTask.textContent = '';
                        })
                        taskTextSubmit.addEventListener('click', function test2(e) {
                            Element1.text = changeDiscriptionTextarea.value;
                            e.currentTarget.removeEventListener('click', test2);

                        })
                    }
                })
            })
        })
    }
    transferTask(task, datTask) {
        let taskText;
        let taskState;
        let inputAddTask = document.querySelectorAll('.task-submit');
        let selectedTask = document.querySelector(`.task-items[data-state=${datTask}] .task-item_select`);
        let innerTask = document.querySelectorAll(`.task-items`);
        let addCard = document.querySelector(`.add-card[data-btn = ${datTask}]`);
        const clear = (innerTask) => {
            this.clearAll(innerTask);
        }
        const addHtml = (element) => {
            this.addHtmlElement(element)
        }
        const desc = (task) => {
            this.addDescription(task);
        }
        const disabledButton = (task) => {
            this.disabledButton(task);
        }
        inputAddTask.forEach(Element => {
            Element.addEventListener('click', function changeStateHandler(e) {



                clear(innerTask);
                taskText = selectedTask.value;
                let taskTextId = selectedTask.options[selectedTask.selectedIndex].dataset.id;
                task.forEach((Element2) => {
                    if (Element2.id == taskTextId) {
                        Element2.state = datTask;
                    }
                }

                )
                task.forEach(Element1 =>
                    addHtml(Element1)
                )
                Element.classList.add('task-submit_hidden');
                selectedTask.parentElement.remove();
                addCard.classList.remove('task-submit_hidden');
                e.currentTarget.removeEventListener('click', changeStateHandler);
                desc(task);
                disabledButton(task);
            }, false)

        })
    }
    addTaskHtml(task, btnData) {
        let taskText;
        let inputAddTask = document.querySelectorAll('.add-new-task');
        const disabledButton = (task) => {
            this.disabledButton(task);
        }
        inputAddTask.forEach(Element =>
            Element.addEventListener('blur', (e) => {

                taskText = Element.value;
                let newTask = { id: task.length + 1, name: taskText, state: btnData, text: '' };
                task.push(newTask)
                this.addHtmlElement(newTask);
                Element.parentElement.remove();
                this.addDescription(task);
                disabledButton(task);

            })
        )
    }

    disabledButton(task) {
        if (task.find(k => k.state == 'Backlog') !== undefined) {

            document.querySelector(`.add-card[data-btn = Ready]`).removeAttribute("disabled");
        } else {

            document.querySelector(`.add-card[data-btn = Ready]`).setAttribute("disabled", "disabled");
        }
        if (task.find(k => k.state == 'Ready') !== undefined) {

            document.querySelector(`.add-card[data-btn = InProgress]`).removeAttribute("disabled");
        } else {
            document.querySelector(`.add-card[data-btn = InProgress]`).setAttribute("disabled", "disabled");

        }

        if (task.find(k => k.state == 'InProgress') !== undefined) {

            document.querySelector(`.add-card[data-btn = Finished]`).removeAttribute("disabled");
        } else {
            document.querySelector(`.add-card[data-btn = Finished]`).setAttribute("disabled", "disabled");

        }

    }
}