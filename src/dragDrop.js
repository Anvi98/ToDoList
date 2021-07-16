// Initials tasks
/* eslint-disable import/no-mutable-exports */
import { tasksList, showTask, items } from ".";
import { getContainer } from "./status";

export let tasks = [];

if (localStorage.getItem('tasks')) {
  const getList = JSON.parse(localStorage.getItem('tasks'));
  tasks = getList;
} else {

  tasks = [
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
  
}

// Add Drag-start and drag-End listeners --- Add Css Class
const addListeners = (elements) => {
  elements.forEach((item) => {
    item.addEventListener('dragstart', () => {
      item.classList.add('dragging');

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });
    });
  });
};

const addTask = (task) => {
  console.log(tasks.length);
  const newTask = document.createElement('div');
  newTask.classList.add('mini-section');
  newTask.classList.add('item');
  newTask.setAttribute('draggable', 'true');
  newTask.innerHTML = `
  <span>
  <input class='check' type='checkbox' id='task-description' name='task-description' value='${task}'>${task}
  <i class="fas fa-ellipsis-v" style="color: gray; float: right;"></i>
  </span>
  `;
  tasksList.appendChild(newTask);
  saveChanges();
  saveLocalstorage(tasks);
  document.location.reload(true);
} 

export const inputListener = (input) => {
  input.addEventListener('keypress', (e) => {
    if(e.key == 'Enter'){
      addTask(input.value);
    }
  });
}

/// Code for local Storage Save.

export const saveLocalstorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Help save any changes in real time (Save position after DragDrop, etc...)
//----------------------

export const saveChanges = () => {
  const newList = [];
  const listTasks = document.querySelectorAll('.item');
  for (let i = 0; i < listTasks.length; i += 1) {
    newList.push({
      index: i + 1,
      description: listTasks[i].firstChild.nextSibling.firstChild.nextSibling.value,
      completed: listTasks[i].firstChild.nextSibling.firstChild.nextSibling.checked,
    });

    tasks = newList;
    saveLocalstorage(tasks);
  }
};

export const reloadContainer = (elements) => {
  elements.forEach((item) => {
    item.addEventListener('drop', () => {
      saveChanges();
    });
  });
};

// ----------------

// Get the element just after the location of the mouse
export const getDragAfterElement = (container, y) => {
  const draggableElements = [...container.querySelectorAll('.item:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
};

// Add event listener DragOver to dragzone
export const dragOver = (container) => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement === undefined) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
};

export const editListener = () => {
  items.forEach((item) => {
    item.addEventListener('click', (e) => {
      const newInput = document.createElement('input');
      const oldValue = e.target.firstChild.nextSibling.firstChild.nextSibling.value;

      e.target.removeChild(e.target.firstChild.nextSibling);
      newInput.placeholder = oldValue;
      e.target.insertBefore(newInput, e.target.firstChild.nextSibling);
      console.log(oldValue);

      newInput.addEventListener('keypress', (e) => {
        
      });
    });
  });
};

export { addListeners };