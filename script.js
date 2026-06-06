const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const dueDateInput = document.getElementById('due-date');
const priorityInput = document.getElementById('priority');
const todoList = document.getElementById('todo-list');
const filterSelect = document.getElementById('filter');
const sortSelect = document.getElementById('sort');
const bulkCompleteBtn = document.getElementById('bulk-complete');
const bulkDeleteBtn = document.getElementById('bulk-delete');

let todos = JSON.parse(localStorage.getItem('advTodos2025')) || [];
let editingIndex = null;

if ('Notification' in window && Notification.permission !== 'granted') {
  Notification.requestPermission();
}

function renderTodos() {
  todoList.innerHTML = '';
  let filtered = [...todos];

  const filter = filterSelect.value;
  if (filter === "completed") filtered = filtered.filter(t => t.completed);
  else if (filter === "incomplete") filtered = filtered.filter(t => !t.completed);

  const sort = sortSelect.value;
  if (sort === "dueDate") {
    filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (sort === "priority") {
    const pVal = {High:0, Medium:1, Low:2};
    filtered.sort((a,b) => pVal[a.priority] - pVal[b.priority]);
  }

  filtered.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (task.completed ? ' completed' : '');
    if (editingIndex === task.id) li.classList.add('editing');

    const mainDiv = document.createElement('div');
    mainDiv.className = 'todo-main';

    const pri = document.createElement('span');
    pri.className = 'priority-badge priority-' + task.priority;
    pri.title = task.priority;
    mainDiv.appendChild(pri);

    const titleEl = document.createElement('span');
    titleEl.className = 'todo-title';
    titleEl.textContent = task.title;
    mainDiv.appendChild(titleEl);

    const dateEl = document.createElement('div');
    dateEl.className = 'todo-date';
    dateEl.textContent = task.dueDate ? 'Due: ' + task.dueDate : '';
    mainDiv.appendChild(dateEl);

    li.appendChild(mainDiv);

    if (editingIndex === task.id) {
      const editForm = document.createElement('form');
      editForm.className = 'edit-form';
      editForm.onsubmit = e => {
        e.preventDefault();
        task.title = editForm.elements["title"].value.trim() || task.title;
        task.dueDate = editForm.elements["duedate"].value;
        task.priority = editForm.elements["priority"].value;
        editingIndex = null;
        saveTodos();
      };
      
      const titleIn = document.createElement('input');
      titleIn.name = 'title';
      titleIn.value = task.title;
      
      const dateIn = document.createElement('input');
      dateIn.name = 'duedate';
      dateIn.type = "date";
      dateIn.value = task.dueDate;
      
      const prioritySel = document.createElement('select');
      prioritySel.name = 'priority';
      ["High","Medium","Low"].forEach(lvl => {
        const opt = document.createElement('option');
        opt.value = lvl;
        opt.textContent = lvl;
        if (task.priority === lvl) opt.selected = true;
        prioritySel.appendChild(opt);
      });
      
      const saveB = document.createElement('button');
      saveB.type = 'submit';
      saveB.innerText = "Save";
      
      const cancelB = document.createElement('button');
      cancelB.type = 'button';
      cancelB.innerText = "Cancel";
      cancelB.onclick = () => { editingIndex = null; renderTodos(); };
      
      editForm.append(titleIn, dateIn, prioritySel, saveB, cancelB);
      li.appendChild(editForm);
    }

    const actions = document.createElement('div');
    actions.className = 'todo-actions';

    const doneBtn = document.createElement('button');
    doneBtn.innerHTML = task.completed ? '✅' : '✔️';
    doneBtn.title = task.completed ? 'Mark as incomplete' : 'Mark as complete';
    doneBtn.onclick = () => {
      const idx = todos.findIndex(t => t.id === task.id);
      todos[idx].completed = !todos[idx].completed;
      saveTodos();
    };

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '✏️';
    editBtn.title = "Edit task";
    editBtn.onclick = () => {
      editingIndex = task.id;
      renderTodos();
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.title = 'Delete task';
    deleteBtn.onclick = () => {
      const idx = todos.findIndex(t => t.id === task.id);
      todos.splice(idx, 1);
      editingIndex = null;
      saveTodos();
    };

    actions.append(doneBtn, editBtn, deleteBtn);
    li.appendChild(actions);
    todoList.appendChild(li);
  });
}

function saveTodos() {
  localStorage.setItem('advTodos2025', JSON.stringify(todos));
  renderTodos();
}

todoForm.onsubmit = e => {
  e.preventDefault();
  const title = todoInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;
  
  if (!title || !dueDate || !priority) return;
  
  const id = Date.now() + Math.random();
  todos.push({ id, title, dueDate, priority, completed: false });
  saveTodos();
  
  todoInput.value = '';
  dueDateInput.value = '';
  priorityInput.value = '';
  
  scheduleReminder(title, dueDate);
};

function scheduleReminder(title, dueDate) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  
  const due = new Date(dueDate);
  const now = new Date();
  due.setHours(9, 0, 0, 0);
  const diff = due - now;
  
  if (diff <= 0) {
    new Notification('Task Reminder', { body: `Today: ${title}` });
  } else if (diff < 14 * 24 * 60 * 60 * 1000) {
    setTimeout(() => {
      new Notification('Task Reminder', { body: `Today: ${title}` });
    }, diff);
  }
}

filterSelect.onchange = renderTodos;
sortSelect.onchange = renderTodos;

bulkCompleteBtn.onclick = () => {
  todos.forEach(t => t.completed = true);
  saveTodos();
};

bulkDeleteBtn.onclick = () => {
  todos = todos.filter(t => !t.completed);
  saveTodos();
};

window.onload = () => {
  renderTodos();
  if ('Notification' in window && Notification.permission === 'granted') {
    const now = new Date();
    todos.forEach(task => {
      if (!task.completed && task.dueDate) {
        const due = new Date(task.dueDate);
        due.setHours(9, 0, 0, 0);
        if (due > now && (due - now) < 14 * 24 * 60 * 60 * 1000) {
          scheduleReminder(task.title, task.dueDate);
        }
      }
    });
  }
};