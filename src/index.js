import _ from 'lodash';
import './style.css';

const tasksList = document.querySelector('.tasksList');
const tasks = [
  {
    index: 1,
    description: "Wash my teeth",
    completed: true
  },
  {
    index: 2,
    description: "Go to school",
    completed: true
  },
  {
    index: 3,
    description: "Sleep",
    completed: true
  }
];

const showTask = (tasks) => {
  tasks.forEach(e => {
  const task = document.createElement('div');
  task.innerHTML = `
  
  <div class="mini-section item">
  <input type="checkbox" id="task-description" name="task-description" value="${e.index}">${e.description}
  <i class="fas fa-ellipsis-v" style="color: gray; float: right;"></i>
  </div>
  `;

  tasksList.appendChild(task);
});

};

showTask(tasks);