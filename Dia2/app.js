// ----------- SELECTORES -----------
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// ----------- EVENTOS -----------
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// ----------- FUNCIONES PRINCIPALES -----------

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return alert("Ingrese una tarea");

  const li = createTaskElement(text);
  taskList.appendChild(li);
  taskInput.value = "";
}

// Crea un elemento <li> con su texto, botón eliminar y evento de completado
function createTaskElement(text) {
  const li = document.createElement("li");
  li.classList.add("task-item");

  const span = document.createElement("span");
  span.textContent = text;
  span.classList.add("task-text");

  span.addEventListener("click", () => {
    span.classList.toggle("completed");
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => li.remove());

  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}
