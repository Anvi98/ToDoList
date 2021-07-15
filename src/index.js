import './style.css';
import { addListeners } from './dragDrop';
import { dragOver } from './dragDrop';
import { getContainer } from './status';

const tasksList = document.querySelector('.tasksList');
const tasks = [
  {
    index: 1,
    description: 'brush my teeth',
    completed: true,
  },
  {
    index: 2,
    description: 'Go to school',
    completed: false,
  },
  {
    index: 3,
    description: 'Sleep',
    completed: false,
  },
];

const showTask = (tasks) => {
  tasks.forEach((e) => {
    const task = document.createElement('div');
    task.classList.add('mini-section');
    task.classList.add('item');
    task.setAttribute("draggable", "true");
    task.innerHTML = `
    <span>
    <input class="check" type="checkbox" id="task-description" name="task-description" value="${e.index}">${e.description}
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

