
const taskInput = document.getElementById("taskInput");
const pendingTasksList = document.getElementById("pendingTasks");
const completedTasksList = document.getElementById("completedTasks");

// Load tasks from local storage when the page loads
loadTasksFromLocalStorage();

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = document.createElement("li");
    const taskDate = new Date();
    taskItem.innerHTML = `
        <span>${taskText} (${taskDate.toLocaleString()})</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="completeTask(this)">Complete</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    pendingTasksList.appendChild(taskItem);
    taskInput.value = ""; // Clear the input field

    // Save the task to local storage
    saveTaskToLocalStorage(taskItem);
}

// function completeTask(button) {
//     const taskItem = button.parentNode;
//     taskItem.classList.add("completed");
//     completedTasksList.appendChild(taskItem);
//     button.parentNode.removeChild(button);

//     // Update the task status in local storage
//     updateTaskStatusInLocalStorage(taskItem, "completed");
// }
function completeTask(button) {
    const taskItem = button.parentNode;

    // Check if the task is in the pending tasks list before moving it to completed tasks
    if (taskItem.parentNode === pendingTasksList) {
        taskItem.classList.add("completed");
        completedTasksList.appendChild(taskItem);
        button.parentNode.removeChild(button);

        // Update the task status in local storage
        // updateTaskStatusInLocalStorage(taskItem, "completed");

        // Also, move the task in local storage from pending to completed
        moveTaskInLocalStorage(taskItem, "pending", "completed");
    }
}

function moveTaskInLocalStorage(taskItem, fromStatus, toStatus) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || { pending: [], completed: [] };
    const taskText = taskItem.querySelector("span").textContent;

    // Remove the task from the 'fromStatus' array in local storage
    const index = tasks[fromStatus].indexOf(taskText);
    if (index > -1) {
        tasks[fromStatus].splice(index, 1);
    }

    // Add the task to the 'toStatus' array in local storage
    tasks[toStatus].push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



function editTask(button) {
    const taskItem = button.parentNode;
    const taskText = taskItem.querySelector("span").textContent;
    const newTaskText = prompt("Edit task:", taskText);
    if (newTaskText) {
        taskItem.querySelector("span").textContent = newTaskText;

        // Update the task in local storage
        updateTaskTextInLocalStorage(taskItem, newTaskText);
    }
}

function deleteTask(button) {
    const taskItem = button.parentNode;
    taskItem.parentNode.removeChild(taskItem);

    // Remove the task from local storage
    removeTaskFromLocalStorage(taskItem);
}

function saveTaskToLocalStorage(taskItem) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || { pending: [], completed: [] };
    const taskText = taskItem.querySelector("span").textContent;
    const taskStatus = taskItem.classList.contains("completed") ? "completed" : "pending";
    tasks[taskStatus].push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatusInLocalStorage(taskItem, newStatus) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || { pending: [], completed: [] };
    const taskText = taskItem.querySelector("span").textContent;

    // Remove the task from the old status array
    const oldStatus = taskItem.classList.contains("completed") ? "completed" : "pending";
    const index = tasks[oldStatus].indexOf(taskText);
    if (index > -1) {
        tasks[oldStatus].splice(index, 1);
    }

    // Add the task to the new status array
    tasks[newStatus].push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskTextInLocalStorage(taskItem, newText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || { pending: [], completed: [] };
    const oldText = taskItem.querySelector("span").textContent;
    const taskStatus = taskItem.classList.contains("completed") ? "completed" : "pending";

    // Update the task in the corresponding status array
    const index = tasks[taskStatus].indexOf(oldText);
    if (index > -1) {
        tasks[taskStatus][index] = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function removeTaskFromLocalStorage(taskItem) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || { pending: [], completed: [] };
    const taskText = taskItem.querySelector("span").textContent;
    const taskStatus = taskItem.classList.contains("completed") ? "completed" : "pending";
    const index = tasks[taskStatus].indexOf(taskText);
    if (index > -1) {
        tasks[taskStatus].splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || { pending: [], completed: [] };
    tasks.pending.forEach((taskText) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="completeTask(this)">Complete</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        pendingTasksList.appendChild(taskItem);
    });
    tasks.completed.forEach((taskText) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button onclick="editTask(this)">Edit</button>
         
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskItem.classList.add("completed");
        completedTasksList.appendChild(taskItem);
    });
}
