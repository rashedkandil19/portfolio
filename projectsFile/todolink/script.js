let showAlertBtn = document.getElementById("showAlert");
let sweetAlert = document.getElementById("sweetAlert");
let closeAlertBtn = document.getElementById("closeAlert");
// Add class show to sweet alert
showAlertBtn.addEventListener("click", () => {
  sweetAlert.classList.add("show");
});
// Remove class show from sweet alert
closeAlertBtn.addEventListener("click", () => {
  sweetAlert.classList.remove("show");
});
// Add tasks into div
let addBtn = document.querySelector(".addTasks");
let delhead = document.querySelector(".DelHeading");
closeAlertBtn.addEventListener("click", addTasks);
function addTasks() {
  let input = document.getElementById("TaskInput");
  if (input.value.trim()) {
    let task = {
      text: input.value,
      timestamp: CurrentDateTime(),
      completed: false,
    };
    saveTask(task);
    renderTask(task);
    input.value = "";
  }
}
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTask(task));
}
function renderTask(task) {
  delhead.style.display = "none";
  let taskList = document.getElementById("taskList");
  let addList = document.querySelector(".addedLists");
  let lists = document.createElement("li");
  let listsText = document.createElement("span");
  let timestamp = document.createElement("span");
  let removeTask = document.createElement("i");
  let CheckBox = document.createElement("input");
  let liscont = document.createElement("div");
  let outPut = document.createElement("div");
  listsText.textContent = task.text;
  listsText.style.cssText = "font-size: 13px; font-weight: bold; width: 245%;";
  timestamp.textContent = task.timestamp;
  timestamp.className = "timestamp";
  timestamp.style.cssText = "font-weight: bold;";
  removeTask.className = "fa-solid fa-trash";
  outPut.className = "outPut";
  taskList.className = "taskList";
  addList.style.cssText = "flex-direction: column;";
  CheckBox.setAttribute("type", "checkbox");
  CheckBox.style.cssText = "    cursor: pointer;";
  CheckBox.checked = task.completed;
  if (task.completed) {
    listsText.style.cssText =
      "text-decoration: line-through; font-size: 13px; font-weight: bold";
    timestamp.style.cssText =
      "text-decoration: line-through; font-weight: bold";
  }
  liscont.style.cssText =
    "display: flex; width: 100%; justify-content: flex-end;";
  taskList.appendChild(liscont);
  liscont.appendChild(lists);
  lists.appendChild(CheckBox);
  lists.appendChild(outPut);
  outPut.appendChild(listsText);
  outPut.appendChild(timestamp);
  lists.appendChild(removeTask);
  // Delete the list
  removeTask.onclick = function () {
    lists.remove();
    liscont.remove();
    removeTaskFromStorage(task.text);
    if (taskList.getElementsByTagName("li").length === 0) {
      delhead.style.display = "block";
      delhead.style.cssText = "text-align: center;";
      taskList.remove();
    }
  };
  CheckBox.onclick = function () {
    task.completed = CheckBox.checked;
    if (CheckBox.checked) {
      listsText.style.cssText =
        "text-decoration: line-through; font-size: 13px; font-weight: bold";
      timestamp.style.cssText =
        "text-decoration: line-through; font-weight: bold";
    } else {
      listsText.style.cssText =
        "text-decoration: none; font-size: 13px; font-weight: bold";
      timestamp.style.cssText = "text-decoration: none;";
    }
    updateTaskInStorage(task);
  };
}
function removeTaskFromStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function updateTaskInStorage(updatedTask) {
  let ta;
  sks = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskIndex = tasks.findIndex((task) => task.text === updatedTask.text);
  if (taskIndex !== -1) {
    tasks[taskIndex] = updatedTask;
    localStor;
    age.setItem("tasks", JSON.stringify(tasks));
  }
}
function CurrentDateTime() {
  let now = new Date();
  consol;
  e.log(now);
  return now.toLocaleString();
}
// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);
function CurrentDateTime() {
  let now = new Date();
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let ampm = hours >= 12 ? "PM" : "AM";
  let displayHours = hours % 12 || 12;
  let day = now.getDate().toString().padStart(2, "0");
  let month = (now.getMonth() + 1).toString().padStart(2, "0");
  let year = now.getFullYear();
  return `${displayHours}:${minutes} ${ampm}, ${month}/${day}/${year}`;
}
