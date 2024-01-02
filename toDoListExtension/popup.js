document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['todoList'], function (result) {
        const todoList = result.todoList || [];
        displayTodoList(todoList);
    });

    const addTodoButton = document.getElementById('addTodoButton');
    addTodoButton.addEventListener('click', addTodo);

    const todoListContainer = document.getElementById('todoList');
    todoListContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            const todoIndex = parseInt(event.target.dataset.index);
            removeTodo(todoIndex);
        } else if (event.target.classList.contains('edit-btn')) {
            const todoIndex = parseInt(event.target.dataset.index);
            editTodo(todoIndex);
        } else if (event.target.classList.contains('complete-checkbox')) {
            const todoIndex = parseInt(event.target.dataset.index);
            toggleTodoCompletion(todoIndex);
        }
    });

    const showAllButton = document.getElementById('showAllButton');
    showAllButton.addEventListener('click', function () {
        chrome.storage.sync.get(['todoList'], function (result) {
            const todoList = result.todoList || [];
            displayTodoList(todoList);
        });
    });

    const showActiveButton = document.getElementById('showActiveButton');
    showActiveButton.addEventListener('click', function () {
        chrome.storage.sync.get(['todoList'], function (result) {
            const todoList = result.todoList || [];
            const activeTodos = todoList.filter(todo => !todo.completed);
            displayTodoList(activeTodos);
        });
    });

    const showCompletedButton = document.getElementById('showCompletedButton');
    showCompletedButton.addEventListener('click', function () {
        chrome.storage.sync.get(['todoList'], function (result) {
            const todoList = result.todoList || [];
            const completedTodos = todoList.filter(todo => todo.completed);
            displayTodoList(completedTodos);
        });
    });
});

function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const newTodo = todoInput.value.trim();

    if (newTodo !== '') {
        chrome.storage.sync.get(['todoList'], function (result) {
            const todoList = result.todoList || [];

            todoList.push({ text: newTodo, completed: false });

            chrome.storage.sync.set({ todoList: todoList }, function () {
                displayTodoList(todoList);
                todoInput.value = '';
            });
        });
    }
}

function removeTodo(index) {
    chrome.storage.sync.get(['todoList'], function (result) {
        const todoList = result.todoList || [];
        todoList.splice(index, 1);
        chrome.storage.sync.set({ todoList: todoList }, function () {
            displayTodoList(todoList);
        });
    });
}

function editTodo(index) {
    chrome.storage.sync.get(['todoList'], function (result) {
        const todoList = result.todoList || [];
        const todoToEdit = todoList[index];
        const editedTodo = prompt('Chỉnh sửa công việc:', todoToEdit.text);

        if (editedTodo !== null) {
            todoToEdit.text = editedTodo;
            chrome.storage.sync.set({ todoList: todoList }, function () {
                displayTodoList(todoList);
            });
        }
    });
}

function toggleTodoCompletion(index) {
    chrome.storage.sync.get(['todoList'], function (result) {
        const todoList = result.todoList || [];
        todoList[index].completed = !todoList[index].completed;
        chrome.storage.sync.set({ todoList: todoList }, function () {
            displayTodoList(todoList);
        });
    });
}

function displayTodoList(todoList) {
    const todoListContainer = document.getElementById('todoList');
    todoListContainer.innerHTML = '';

    if (todoList.length === 0) {
        todoListContainer.innerHTML = 'Empty.';
    } else {
        const ul = document.createElement('ul');
        todoList.forEach(function (todo, index) {
            const li = document.createElement('li');
            li.innerHTML = `
        <button class="complete-checkbox" data-index="${index}" ${todo.completed ? 'checked' : ''}>Complete</button>
          <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
            ul.appendChild(li);
        });
        todoListContainer.appendChild(ul);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['todoList'], function (result) {
        const todoList = result.todoList || [];
        displayTodoList(todoList);
    });

    let activeButton = null;

    const showAllButton = document.getElementById('showAllButton');
    showAllButton.addEventListener('click', function () {
        setActiveButton(showAllButton);
        chrome.storage.sync.get(['todoList'], function (result) {
            const todoList = result.todoList || [];
            displayTodoList(todoList);
        });
    });

    const showActiveButton = document.getElementById('showActiveButton');
    showActiveButton.addEventListener('click', function () {
        setActiveButton(showActiveButton);
        chrome.storage.sync.get(['todoList'], function (result) {
            const todoList = result.todoList || [];
            const activeTodos = todoList.filter(todo => !todo.completed);
            displayTodoList(activeTodos);
        });
    });

    const showCompletedButton = document.getElementById('showCompletedButton');
    showCompletedButton.addEventListener('click', function () {
        setActiveButton(showCompletedButton);
        chrome.storage.sync.get(['todoList'], function (result) {
            const todoList = result.todoList || [];
            const completedTodos = todoList.filter(todo => todo.completed);
            displayTodoList(completedTodos);
        });
    });

    function setActiveButton(button) {
        if (activeButton) {
            activeButton.classList.remove('active');
        }
        activeButton = button;
        activeButton.classList.add('active');
    }

});
