class Task {
    constructor(id, description, completed = false) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}
En esta seccion vamos a definir la clase TASK con la cual vamos a trabajar, como vemos, la clase task precibe un id, una descripcion y un atributo llamado complete que por defecto es false

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.loadTasks();
    }
    aca definimos la clase TASK MANAGER, con un constructor vacio, no va a recibir atributos, esta "clase" es una especie de funcion donde su constructor va a transformar lo que se encuentre en el local storage en un objeto de js

    addTask(description) {
        const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
        const task = new Task(id, description);
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
    }
    esta seccion nos permite agregar nuevas tareas , la funcion recibe una "description" y a continuación hace una verificacion con operador ternario, si this.tasks.lenght es mayor a 0 (truthy) , agregarara uno al lenght total de la lista si no, sera 1 lo que tiene sentido ya que al ser 0 pues seria el primer id, luego crea una nueva task agregandole id y description

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }
    esta seccion nos filtra por id las tareas en la lista, en este caso, discrimina todas las que no tienen que ver con el id que recibe y guarda un nuevo arreglo 

    toggleTaskComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.toggleComplete();
            this.renderTasks();
        }
    }
  
    esta seccion busca por id la tarea y la marca como complete al dar click al elemento li
        
        
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    esta seccion guarda en el local storage las tareas

    loadTasks() {
        this.renderTasks();
    }
    esta seccion llama a la funcion render task
    renderTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        this.tasks.forEach(task => {
            const item = document.createElement('li');
            item.textContent = task.description;
            item.className = task.completed ? 'completed' : '';
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTaskComplete(task.id)});

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.deleteTask(task.id);
            });

            
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click',(e)=>{
                e.stopPropagation();
                const inputNewDescription = document.createElement("INPUT");
                const sendNewDescription = document.createElement("BUTTON");
                sendNewDescription.textContent = "Enviar"
                item.append(inputNewDescription,sendNewDescription);
                sendNewDescription.addEventListener('click',(e)=>{
                    e.preventDefault();
                    const editTask = this.tasks.find(t => t.id === task.id);
                    editTask.description = inputNewDescription.value;
                    this.saveTasks();
                    this.renderTasks();
                    // editTask.description = 
                } )
                  
        });
        
        item.appendChild(editButton);
        item.appendChild(deleteButton);
        taskList.appendChild(item);

        })}
    }
            
esta seccion tiene varios apartados pero se puede resumir en un forEach ciclo que recorre el array tasks para agregar a cada una de las tareas eventos y botones necesarios para la funcionalidad 

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();

    document.getElementById('add-task').addEventListener('click', () => {
        const newTask = document.getElementById('new-task').value;
        if (newTask) {
            taskManager.addTask(newTask);
            document.getElementById('new-task').value = '';
        }
    });
    
    
});