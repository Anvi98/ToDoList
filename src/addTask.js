import { tasks, saveChanges, saveLocalstorage } from "./dragDrop";
import { tasksList } from "./index.js";

export const addTask = (task) => {
  const newTask = document.createElement('div');
  newTask.classList.add('mini-section');
  newTask.classList.add('item');
  newTask.setAttribute('draggable', 'true');
  newTask.innerHTML = `
  <span>
  <input class='check' type='checkbox' id='task-description' name='task-description' value='${task}'>${task}
  <i class="fas fa-ellipsis-v ellipsis" style="color: gray; float: right;"></i>
  </span>
  `;
  tasksList.appendChild(newTask);
  saveChanges();
  saveLocalstorage(tasks);
  document.location.reload(true);
};