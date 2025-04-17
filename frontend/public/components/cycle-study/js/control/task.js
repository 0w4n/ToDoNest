const tasks = document.getElementById('tasks');
const newTaskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');

function addTask() {
  const taskText = newTaskInput.value.trim();
  if (!taskText) return;
  const li = document.createElement('li');
  li.textContent = taskText;
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.onclick = () => li.remove();
  li.appendChild(deleteBtn);
  tasks.appendChild(li);
  newTaskInput.value = '';
}

addTaskBtn.addEventListener('click', addTask);
