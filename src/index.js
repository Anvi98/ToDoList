/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-duplicates */

import {
  reloadContainer,
  addListeners,
  dragOver,
  tasks,
  deleteAll,
} from './dragDrop.js';
import { inputListener } from './dragDrop.js';
import './style.css';
import { getContainer } from './status.js';
import editListener from './editTask.js';

export const tasksList = document.querySelector('.tasksList');
export const clearAll = document.querySelector('.clear-all');

const task = document.querySelector('.task');
export const showTask = (tasks) => {
  tasks.forEach((e) => {
    const task = document.createElement('div');
    task.classList.add('mini-section');
    task.classList.add('item');
    task.setAttribute('draggable', 'true');
    if (e.completed === true) {
      task.innerHTML = `
      <span class='desc'>
      <input class='check' type='checkbox' id='task-description' name='task-description' value='${e.description}' checked = true>${e.description}</input>
      <i class="fas fa-ellipsis-v ellipsis" style="color: gray; float: right;"></i>
      </span>
      `;
    } else {
      task.innerHTML = `
      <span>
      <input class='check' type='checkbox' id='task-description' name='task-description' value='${e.description}'>${e.description}</input>
      <i class="fas fa-ellipsis-v ellipsis" style="color: gray; float: right;"></i>
      </span>
      `;
    }

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
deleteAll();
