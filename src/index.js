import { after } from 'lodash';
import './style.css';

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

items.forEach(item =>{
  item.addEventListener('dragstart', ()=>{
    item.classList.add('dragging');

  item.addEventListener('dragend', ()=>{
    item.classList.remove('dragging');
  });
  });
});

tasksList.addEventListener('dragover', (e)=>{
  e.preventDefault();
  const afterElement = getDragAfterElement(tasksList, e.clientY);
  const draggable = document.querySelector('.dragging');
  console.log(afterElement);
  if(afterElement == null) {
    tasksList.appendChild(draggable);
  } else {
    tasksList.insertBefore(draggable, afterElement);
  }

});

function getDragAfterElement(container, y) {
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
}