/* eslint-disable import/prefer-default-export */
import {
  reloadContainer,
  addListeners,
  dragOver,
  tasks,
  editListener,
} from './dragDrop.js';
import { inputListener } from './dragDrop.js';
import './style.css';
import { getContainer } from './status.js';

export const tasksList = document.querySelector('.tasksList');
const task = document.querySelector('.task');

export const showTask = (tasks) => {
  tasks.forEach((e) => {
    const task = document.createElement('div');
    task.classList.add('mini-section');
    task.classList.add('item');
    task.setAttribute('draggable', 'true');
    task.innerHTML = `
    <span>
    <input class='check' type='checkbox' id='task-description' name='task-description' value='${e.description}'>${e.description}</input>
    <i class="fas fa-ellipsis-v" style="color: gray; float: right;"></i>
    </span>
    `;
    tasksList.appendChild(task);
  });
};

showTask(tasks);
getContainer(tasksList);
export const items = document.querySelectorAll('.item');

inputListener(task);
editListener();
addListeners(items);
dragOver(tasksList);
reloadContainer(items);
