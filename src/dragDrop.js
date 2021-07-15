
import {getContainer} from './status';

let container = document.querySelector('.tasksList');


const addListeners = (elements) => {
  elements.forEach(item =>{
    item.addEventListener('dragstart', ()=>{
      item.classList.add('dragging');

      item.addEventListener('dragend', ()=>{
        item.classList.remove('dragging');
        let a = [...container.querySelectorAll('input')];
        console.log(Array.prototype.indexOf.call(item.parentElement, item));
      });
    });
  });
};

export const dragOver = (container) => {
  container.addEventListener('dragover', (e)=>{
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector('.dragging');
    if(afterElement === undefined) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
    getContainer(container);
  });
}

export const getDragAfterElement = (container, y) => {
  const draggableElements = [...container.querySelectorAll('.item:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2 ;

    if(offset < 0 && offset > closest.offset){
      return {offset: offset, element: child};
    } else {
      return closest;
    }
  }, {offset: Number.NEGATIVE_INFINITY}).element;
};

export const getTodoList = () => {
  let tasks;
  if (localStorage.getItem('tasks') != null) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  } else {
    tasks = [];
  }
  return tasks;
};

export const setBook = (task) => {
  const tasks = getTodoData();
  tasks.push(task);
  tasksList = tasks;
  localStorage.setItem('tasks', JSON.stringify(tasksList));
};

export {addListeners};