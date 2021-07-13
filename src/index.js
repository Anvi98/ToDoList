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

const showTask = () => {
  tasks.forEach(e => {
  const task = document.createElement('div');
  task.innerHTML = `
  <div class="mini-section">${e.description}</div>
  `;

  tasksList.appendChild(task);
});

};

showTask(tasks);