// Seleção de Elementos
const data = new Date();
const day = String(data.getDate()).padStart(2, '0');
let dayName = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
let monName = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Agosto", "Outubro", "Novembro", "Dezembro"];
const year = data.getFullYear();

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;


document.getElementById("date").innerHTML = (dayName [data.getDay()] + ", " + day + " de " + monName [data.getMonth()] + " de " + year);

function time () {
    const data = new Date();
    let h = data.getHours();
    let m = data.getMinutes();
    let s = data.getSeconds();

    if(h<10) {
        h = "0"+h;
    }

    if(m<10) {
        m = "0"+m;
    }

    if(s<10) {
        s = "0"+s;
    }

    document.getElementById("hour").innerHTML = h+":"+m+":"+s;
    
    setTimeout('time()',500);
}

todoForm.addEventListener("submit", (e) => {

    e.preventDefault(); //faz com que o formulário não seja enviado para o backEnd quando precionar o botão

    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo (inputValue);
    }
})

const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);

    todoInput.value="";
    todoInput.focus();
}

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains ("finish-todo")) {
        parentEl.classList.toggle("done");
    }

    if (targetEl.classList.contains ("remove-todo")) {
        parentEl.remove();
    }

    if (targetEl.classList.contains ("edit-todo")) {
        toggleForms()

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
})

cancelEditBtn.addEventListener ("click", (e) => {
    e.preventDefault();
    toggleForms();
})

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

editForm.addEventListener ("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateToDo(editInputValue);
    }

    toggleForms();
})

const updateToDo = (text) => {
    
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    })
}