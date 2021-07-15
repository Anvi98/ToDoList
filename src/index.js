import './style.css';
import { addListeners } from './dragDrop';
import { dragOver } from './dragDrop';

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
    task.classList.add('hey');
    task.innerHTML = `
    <div class="mini-section item" draggable = "true">
    <input class="check" type="checkbox" id="task-description" name="task-description" value="${e.index}">${e.description}
    <i class="fas fa-ellipsis-v" style="color: gray; float: right;"></i>
    </div>
    `;

    tasksList.appendChild(task);
  });
};

showTask(tasks);

const items = document.querySelectorAll('.item');

addListeners(items);
dragOver(tasksList);
