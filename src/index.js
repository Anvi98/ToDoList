import './style.css';

const container = document.querySelector('.container');
const tasks = [
  {
    index: 1,
    description: 'Wash my teeth',
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
    <i class="fas fa-ellipsis-v ellipsis" style="color: gray; float: right;"></i>
    </div>
    `;

    container.appendChild(task);
  });
};

showTask(tasks);

const items = document.querySelectorAll('.item');

items.forEach(item => {
  item.addEventListener('dragstart', ()=>{
    item.classList.add('dragging');
  });

  item.addEventListener('dragend', ()=> {
    item.classList.remove('dragging');
  });
});

container.addEventListener('dragover', (e)=>{
  e.preventDefault();

  const afterElement = getDragAfterElement(container, e.clientY);
  const item = document.querySelector('.dragging');
  console.log(afterElement);
  if(afterElement !== null){
    container.insertBefore(item,afterElement);
  }


});

function getDragAfterElement(container, y){

  const draggableElements = [...container.querySelectorAll('.item:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {

    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if(offset < 0 && offset > closest.offset){
      return {offset: offset, element: child }
    } else {
      return closest;
    }
  }, {offset: Number.NEGATIVE_INFINITY}).element;
}