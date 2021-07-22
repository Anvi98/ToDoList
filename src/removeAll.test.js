
/**
 * @jest-environment jsdom
 */

const deleteAll = () => {
  clearAll.addEventListener('click', (e) => {
    e.preventDefault();
    tasks = tasks.filter((task) => task.completed === false);
    saveLocalstorage();
    document.location.reload(true);
  });
};

describe('Test remove', ()=>{
  document.body.innerHTML =``;
  test('test2', ()=>{
    
  })
})