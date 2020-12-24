//selectors
const todoinput = document.querySelector(".todo_input");
const todobutton = document.querySelector(".todo_button");
const todolist = document.querySelector(".todo_list");
const filter = document.querySelector(".filter_todo");

//adding eventlisteners
document.addEventListener("DOMContentLoaded", getTodo);
todobutton.addEventListener("click", addtodo);
todolist.addEventListener("click", deletetodo);
filter.addEventListener("change", filtertodo);

//filtering the todo
function filtertodo(e) {

    //getting childnodes of todolist
    const ftodos = todolist.childNodes;

    //applying filter to todo
    ftodos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.classList.remove("hide");
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.classList.remove("hide");
                } else {
                    todo.classList.add("hide");
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.classList.remove("hide");
                } else {
                    todo.classList.add("hide");
                }
                break;
        }
    });
}

//functions
function addtodo(event) {

    //preventing from submitting
    event.preventDefault();

    //if input value is empty then stop adding and return the function
    if (todoinput.value === "") {
        return;
    }

    // newTodo
    newTodo(todoinput.value);

    //save to localStorage
    saveToLocal(todoinput.value);

    //clear todo input value
    todoinput.value = "";
}

function newTodo(todo) {
    //creating element
    const tododiv = document.createElement("div");

    //adding a class todo
    tododiv.classList.add("todo");

    //creating li
    const todoli = document.createElement("li");
    todoli.textContent = todo;
    todoli.classList.add("todo_item");
    tododiv.appendChild(todoli);

    //check mark button
    const todobcheck = document.createElement("button");
    todobcheck.innerHTML = '<i class="fas fa-check"></i>';
    todobcheck.classList.add("complete_btn");
    tododiv.appendChild(todobcheck);

    //trash button
    const todobtrash = document.createElement("button");
    todobtrash.innerHTML = '<i class="fas fa-trash"></i>';
    todobtrash.classList.add("trash_btn");
    tododiv.appendChild(todobtrash);
    todolist.appendChild(tododiv);
}

//deleting todo
function deletetodo(e) {

    //getting target which is clicked
    const item = e.target;

    //delete todo
    if (item.classList[0] === "trash_btn") {

        //getting the parent element
        const todorm = item.parentElement;

        // applying animation to it
        todorm.classList.add("fall");

        //removing from localStorage
        removeLocal(todorm);

        //removing from the DOM
        todorm.addEventListener("transitionend", function () {
            todorm.remove();
        });
    }

    //adding as completed todo
    if (item.classList[0] === "complete_btn") {

        //getting the parent element
        const todocm = item.parentElement;

        //toggling the the div for comleted
        todocm.classList.toggle("completed");
    }
}

//check for local todos
function checklocalStorage() {

    //creating the variable
    let todos = [];

    //checking for the todos in localStorage
    if (localStorage.getItem('todos') !== null) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //returning the array that retrived from localStorage
    return todos;
}

function getTodo() {
    //check for local todos
    let todos = checklocalStorage();

    //creating elements for each values
    todos.forEach((todo) => {
        newTodo(todo)
    });
}

function addtolocalStorage(todos) {
    //adding to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

function saveToLocal(todo) {
    //check for local todos
    let todos = checklocalStorage();

    //pushing value to todos arrays
    todos.push(todo);

    //adding to localstorage
    addtolocalStorage(todos);
}
function removeLocal(todo) {
    //check for local todos
    let todos = checklocalStorage();

    //getting index of the array
    const todoIndex = todos.indexOf(todo.children[0].innerText);

    //removing the element from the array of todos
    todos.splice(todoIndex, 1);

    //adding to localstorage
    addtolocalStorage(todos);
}