// Select elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Event: Add Task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = taskInput.value;
  if (task) {
    addTask(task);
    saveTasksToLocalStorage();
    taskInput.value = '';
  }
});

// Add Task
function addTask(task) {
  const li = document.createElement('li');
  li.textContent = task;

  // Mark as complete
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasksToLocalStorage();
  });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasksToLocalStorage();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  // Edit button
  const editBtn=document.createElement('button');
  editBtn.textContent= 'Edit';
  editBtn.className= 'edit-btn';
  editBtn.addEventListener('click',()=>  {
    const currentText = li.firstChild.textContent; // Get the current task text
    const newText = prompt('Edit your task:', currentText); // Show a prompt with the current task text
    if (newText !== null && newText.trim() !== '') { // Check if new text is not empty
      li.firstChild.textContent = newText; // Update the task text
      saveTasksToLocalStorage(); // Save the updated task list to localStorage
    }
  });
  
  li.appendChild(editBtn); // Add the Edit button to the list item
 
}

// Save tasks to localStorage
function saveTasksToLocalStorage() {
  const tasks = [];
  taskList.childNodes.forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed'),
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add('completed');
    }

    // Mark as complete
    li.addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasksToLocalStorage();
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
      li.remove();
      saveTasksToLocalStorage();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Load tasks on page load
loadTasksFromLocalStorage();
