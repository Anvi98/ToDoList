
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

export const dragOver = (container) => {
  let newContainer;
  container.addEventListener('dragover', (e)=>{
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector('.dragging');
    console.log(afterElement);
    if(afterElement === undefined) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
    newContainer = container;
    console.log(newContainer);
  });
  
  return newContainer;

}

export const getDragAfterElement = (container, y) => {
  const draggableElements = [...container.querySelectorAll('.hey:not(.dragging)')];

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

export {addListeners};