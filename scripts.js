/*
let bancoDedDados = [
    { matricula: 1, nome: "Carlos", curso: "Javascript", nota: 9.8 },
    { matricula: 2, nome: "Luana", curso: "Python", nota: 8.7 }
]

// Como armazenar no local storage

localStorage.setItem("alunos", JSON.stringify(bancoDedDados))

// Como pegar os dados do localstorage
const data = localStorage.getItem("alunos")
console.log(data)
*/

// Criando o nosso banco de dados
const storage = localStorage.getItem("tasks") || "[]"
let dados = JSON.parse(storage);

const inputAdd = document.querySelector(".input-add")
const btnAdd = document.querySelector(".btn-add")
const tasks = document.querySelector(".tasks")

// Função que add tarefa na lista
function addTaskToList() {
    // Pegando o valor digitado
    const tarefa = inputAdd.value;
    //criando o objeto que será adicionado
    const item = {
        id: crypto.randomUUID(),
        name: tarefa,
        checked: false
    }
    //adicionando a tarefa
    dados.push(item);
    // adicionando no localstorage
    localStorage.setItem("tasks", JSON.stringify(dados))
    alert("Tarefa adicionada com sucesso!")
    inputAdd.value = ""
    inputAdd.focus()
    populateTasks()

}
function populateTasks() {
    let taskItems = ""
    //Percorrendo todas as tasks
    dados.forEach(task => {
        taskItems += `
        <li>
        <label for="${task.id}">
        <input onChange="changeTask('${task.id}')" type="checkbox" id="${task.id}" ${task.checked ? "checked" : ""}>
        <span>${task.name}</span>
        </label>
        <i class="bx bx-trash" onclick="deleteTask('${task.id}')"></i>
        </li>        
        `
    });
    tasks.innerHTML = taskItems
}

function deleteTask(id) {
    // Atualizando a lista com todos os itens menos o com id passado
    const newList = dados.filter(item => item.id !== id)
    dados = newList;
    populateTasks()
    localStorage.setItem("tasks", JSON.stringify(dados))
}

function changeTask(id) {
    const checkbox = document.getElementById(id);
    let newList = dados.map(item => {
        if (item.id === id) {
            item.checked = checkbox.checked
        }
        return item;
    })
    dados = newList;
    localStorage.setItem("tasks", JSON.stringify(dados))
    populateTasks()
}

inputAdd.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        addTaskToList()
    }
})

btnAdd.addEventListener("click", addTaskToList)
populateTasks();