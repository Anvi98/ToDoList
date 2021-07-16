// Initials tasks 
export let tasks = [
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

// Add Drag-start and drag-End listeners --- Add Css Class
const addListeners = (elements) => {
  elements.forEach(item =>{
    item.addEventListener('dragstart', ()=>{
      item.classList.add('dragging');

      item.addEventListener('dragend', ()=>{
        item.classList.remove('dragging');
      });
    });
  });
};

// Help save any changes in real time (Save position after DragDrop, check and unchecked, add, delete etc...)
//----------------------
export const reloadContainer = (elements) => {
  elements.forEach(item => {
    item.addEventListener('drop', (e)=>{
      saveChanges();
    });
  });
}

export const saveChanges = () =>{
  const newList = [];
  const listTasks = document.querySelectorAll('.item');
  for (let i = 0; i < listTasks.length; i += 1) {
    newList.push({
    index: i + 1,
    description: listTasks[i].firstChild.nextSibling.firstChild.nextSibling.value,
    completed: listTasks[i].firstChild.nextSibling.firstChild.nextSibling.checked
  });
  
  tasks = newList;
  saveLocalstorage(tasks);
}
}
// ----------------
// Add event listener DragOver to dragzone
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
  });
};

// Get the element just after the location of the mouse
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

/// Code for local Storage Save.

if (localStorage.getItem('tasks')) {
  const getList = JSON.parse(localStorage.getItem('tasks'));
  tasks = getList;
}

export const saveLocalstorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export {addListeners};