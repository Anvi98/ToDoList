// Initials tasks
/* eslint-disable import/no-mutable-exports */
import { tasksList, showTask, items, clearAll } from ".";
import { getContainer } from "./status";

export let tasks = [];

if (localStorage.getItem('tasks')) {
  const getList = JSON.parse(localStorage.getItem('tasks'));
  tasks = getList;
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
  <i class="fas fa-ellipsis-v ellipsis" style="color: gray; float: right;"></i>
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
  if(listTasks.length === 0){
    tasks = [];
    saveLocalstorage(tasks);
  } else {
    for (let i = 0; i < listTasks.length; i += 1) {
      newList.push({
        index: i + 1,
        description: listTasks[i].firstChild.nextSibling.firstChild.nextSibling.value,
        completed: listTasks[i].firstChild.nextSibling.firstChild.nextSibling.checked,
      });
  
      tasks = newList;
      saveLocalstorage(tasks);
    }
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
  for(let i = 0; i < items.length; i+=1) {
    items[i].addEventListener('dblclick', (e) => {

      const oldValue = items[i].children[0].children[0];
      items[i].firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.remove();
      items[i].firstChild.nextSibling.firstChild.nextSibling.nextSibling.remove();
      const newInput = document.createElement('input');
      const icon = document.createElement('i');
      icon.classList.add('fa', 'fa-trash', 'trash');
      items[i].firstChild.nextSibling.removeChild(items[i].firstChild.nextSibling.firstChild.nextSibling);
      newInput.placeholder = oldValue.value;
      items[i].firstChild.nextSibling.insertBefore(newInput, items[i].firstChild.nextSibling.firstChild.nextSibling);
      items[i].firstChild.nextSibling.insertBefore(icon, items[i].firstChild.nextSibling.firstChild.nextSiblin);

      newInput.addEventListener('keypress', (e) => {
        if(e.key == 'Enter'){
          if(newInput.value.trim() == ''){
            newInput.classList.add('invalid');
          } else {
           items[i].children[0].id = i ;
           newInput.setAttribute('description', newInput.value);
           items[i].firstChild.nextSibling.removeChild(items[i].firstChild.nextSibling.firstChild.nextSibling);


           items[i].firstChild.nextSibling.innerHTML = `
           <input class='check' type='checkbox' id='task-description' name='task-description' value='${newInput.value}'>${newInput.value}
           <i class="fas fa-ellipsis-v ellipsis" style="color: gray; float: right;"></i>
          `;
          tasks[i].description = newInput.value;
          tasks[i].completed = false;
          saveChanges();
          document.location.reload(true);
          }
        }
      });

      icon.addEventListener('click', (e) => {
        e.target.parentElement.parentElement.remove();
        saveChanges();
        document.location.reload(true);
      });
    })

  };
};

export const deleteAll = () => {
  clearAll.addEventListener('click', (e) => {
    e.preventDefault();
    tasks = tasks.filter(task => task.completed === false);
    saveLocalstorage();
    document.location.reload(true);
    });

}


export { addListeners };