let taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  let text = taskInput.value;
  let date = taskDate.value;
  let time = taskTime.value;

  if (text === "") return alert("Enter a task");

  let task = { text, date, time, done: false };
  let tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
  renderTasks();
  taskInput.value = "";
}

function renderTasks() {
  taskList.innerHTML = "";
  getTasks().forEach((task, index) => {
    let li = document.createElement("li");
    if (task.done) li.classList.add("completed");

    li.innerHTML = `
      <strong>${task.text}</strong><br>
      <small>${task.date} ${task.time}</small>
      <div class="task-actions">
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="editTask(${index})">✏</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function toggleTask(index) {
  let tasks = getTasks();
  tasks[index].done = !tasks[index].done;
  saveTasks(tasks);
  renderTasks();
}

function editTask(index) {
  let tasks = getTasks();
  let newText = prompt("Edit Task", tasks[index].text);
  if (newText) tasks[index].text = newText;
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(index) {
  let tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  renderTasks();
}
