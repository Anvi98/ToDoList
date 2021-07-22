/**
 * @jest-environment jsdom
 */

const addTask = (task) => {
  const newTask = document.createElement('ul');
  newTask.classList.add('mini-section');
  newTask.classList.add('item');
  newTask.setAttribute('draggable', 'true');
  newTask.innerHTML = `
  <li>${task}</li>
  `;
  document.body.appendChild(newTask);
}


describe('Add new test on AddTask', ()=>{
  test('Test 1', ()=> {
    document.body.innerHTML =``;
    const task = 'Brush Teeth';
    addTask(task);
    const list = document.querySelectorAll('.item li');
    expect(list).toHaveLength(1);   
  })
})