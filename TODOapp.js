const form = document.getElementById("form");
const input = document.getElementById("input");
const Ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach(todo => {
        add(todo);
    })

}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    add();
})

function add(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const li = document.createElement("li");
        li.innerText = todoText;
        li.classList.add("list-group-item");

        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through")
        }

        li.addEventListener("contextmenu", function (event) {
            event.preventDefault();
            li.remove();
            saveData();
        });

        li.addEventListener("click", function () {
            li.classList.toggle
                ("text-decoration-line-through")//toggleなければつける。あれば消す
            saveData();
        });

        ul.appendChild(li);
        input.value = "";
        saveData();
    }
}

//TODOの記録
function saveData() {
    const lists = document.querySelectorAll("li");
    let todos = [];
    lists.forEach(list => {
        //オブジェクト
        let todo = {
            text: list.innerText,
            completed: list.classList.contains
                ("text-decoration-line-through")
        };
        todos.push(todo);
    });
    //ローカルストレージへの保存
    localStorage.setItem("todos", JSON.stringify(todos));
}