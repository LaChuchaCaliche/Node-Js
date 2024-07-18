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

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.loadTasks();
    }

    addTask(description) {
        const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
        const task = new Task(id, description);
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    toggleTaskComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.toggleComplete();
            this.renderTasks();
        }
    }      
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        this.renderTasks();
    }

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
            


document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();

    document.getElementById('add-task').addEventListener('click', () => {
        const newTask = document.getElementById('new-task').value;
        if (newTask) {
            taskManager.addTask(newTask);
            document.getElementById('addtask').value = '';
        }
    });
    
    
});