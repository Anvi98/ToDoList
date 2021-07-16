import { reloadContainer, addListeners, dragOver, tasks } from './dragDrop';
import './style.css';
import { getContainer } from './status';


const tasksList = document.querySelector('.tasksList');

const showTask = (tasks) => {
  tasks.forEach((e) => {
    const task = document.createElement('div');
    task.classList.add('mini-section');
    task.classList.add('item');
    task.setAttribute("draggable", "true");
    task.innerHTML = `
    <span>
    <input class="check" type="checkbox" id="task-description" name="task-description" value="${e.description}">${e.description}
    <i class="fas fa-ellipsis-v" style="color: gray; float: right;"></i>
    </span>
    `;
    tasksList.appendChild(task);
  });
};

showTask(tasks);
getContainer(tasksList);
const items = document.querySelectorAll('.item');

addListeners(items);
dragOver(tasksList);
reloadContainer(items);



