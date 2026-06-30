let tasks = JSON.parse(localStorage.getItem('tasknext-tasks')) || [];
let currentFilter = 'all';

const taskInput        = document.getElementById('task-input');
const addBtn           = document.getElementById('add-btn');
const taskList         = document.getElementById('task-list');
const emptyState       = document.getElementById('empty-state');
const summaryText      = document.getElementById('summary-text');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const filterBtns       = document.querySelectorAll('.filter-btn');

function saveTasks() {
  localStorage.setItem('tasknext-tasks', JSON.stringify(tasks));
}

function createTask(text) {
  return {
    id: Date.now().toString(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    taskInput.focus();
    taskInput.classList.add('shake');
    taskInput.addEventListener('animationend', () => taskInput.classList.remove('shake'), { once: true });
    return;
  }

  const task = createTask(text);
  tasks.unshift(task); 
  saveTasks();
  taskInput.value = '';
  taskInput.focus();
  render();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    render();
  }
}


function deleteTask(id) {
  const item = document.querySelector(`[data-id="${id}"]`);
  if (item) {
    item.classList.add('removing');
    item.addEventListener('animationend', () => {
      tasks = tasks.filter(t => t.id !== id);
      saveTasks();
      render();
    }, { once: true });
  }
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  render();
}

function getFilteredTasks() {
  switch (currentFilter) {
    case 'active':    return tasks.filter(t => !t.completed);
    case 'completed': return tasks.filter(t => t.completed);
    default:          return tasks;
  }
}

function buildTaskElement(task) {
  const item = document.createElement('div');
  item.className = `task-item${task.completed ? ' completed' : ''}`;
  item.setAttribute('data-id', task.id);
  item.setAttribute('role', 'listitem');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.checked = task.completed;
  checkbox.setAttribute('aria-label', `Mark "${task.text}" as ${task.completed ? 'active' : 'completed'}`);
  checkbox.addEventListener('change', () => toggleTask(task.id));

  const label = document.createElement('span');
  label.className = 'task-label';
  label.textContent = task.text;
  label.title = task.text;
  label.addEventListener('click', () => toggleTask(task.id));

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.setAttribute('aria-label', `Delete task "${task.text}"`);
  deleteBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6l-1 14H6L5 6"></path>
      <path d="M10 11v6"></path>
      <path d="M14 11v6"></path>
      <path d="M9 6V4h6v2"></path>
    </svg>`;
  deleteBtn.addEventListener('click', () => deleteTask(task.id));

  item.append(checkbox, label, deleteBtn);
  return item;
}

function updateSummary() {
  const total     = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active    = total - completed;

  if (total === 0) {
    summaryText.textContent = '0 tasks';
  } else {
    summaryText.textContent = `${active} remaining · ${completed} done`;
  }

  clearCompletedBtn.style.display = completed > 0 ? 'inline' : 'none';
}

function render() {
  const filtered = getFilteredTasks();

  taskList.innerHTML = '';

  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = `
      <div class="empty-icon">✓</div>
      <p class="empty-title">${
        currentFilter === 'completed'
          ? 'No completed tasks yet'
          : currentFilter === 'active'
          ? 'Nothing active — great work!'
          : 'You\'re all clear'
      }</p>
      <p class="empty-sub">${
        currentFilter === 'all' ? 'Add a task above to get started' : ''
      }</p>`;
    taskList.appendChild(empty);
  } else {
    filtered.forEach(task => taskList.appendChild(buildTaskElement(task)));
  }

  updateSummary();
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

clearCompletedBtn.addEventListener('click', clearCompleted);

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});


render();
