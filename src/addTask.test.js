const addTask = require('./addTask');

describe('Add new test on AddTask', ()=>{
  test('Test 1', ()=> {
    const task = 'Brush Teeth';
    addTask(task);
    const list = document.querySelector('items');
    expect(list.lastChild.textContent).toBe('Brush Teeth');   
  })
})