document.addEventListener('DOMContentLoaded', loadTodos);
document.getElementById('add-todo').addEventListener('click', addTodo);

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    
    if (todoText === '') {
        alert('Please enter a task!');
        return;
    }

    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };

    const todos = getTodosFromLocalStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

    renderTodos();
    todoInput.value = '';
}

function getTodosFromLocalStorage() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    const todos = getTodosFromLocalStorage();
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;

        // Delete button with icon
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '🗑️';  // Trash can icon
        deleteButton.addEventListener('click', () => deleteTodo(todo.id));

        // Update button with icon
        const updateButton = document.createElement('button');
        updateButton.innerHTML = '✏️';  // Pencil icon
        updateButton.addEventListener('click', () => updateTodoPrompt(todo.id));

        li.appendChild(deleteButton);
        li.appendChild(updateButton);
        todoList.appendChild(li);
    });
}

function deleteTodo(id) {
    const todos = getTodosFromLocalStorage();
    const updatedTodos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    renderTodos();
}

function updateTodoPrompt(id) {
    const todos = getTodosFromLocalStorage();
    const todoToUpdate = todos.find(todo => todo.id === id);

    if (todoToUpdate) {
        const updatedText = prompt('Update your task:', todoToUpdate.text);
        if (updatedText !== null && updatedText.trim() !== '') {
            todoToUpdate.text = updatedText.trim();
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        }
    }
}

function loadTodos() {
    renderTodos();
}
