
// keep url or live server will be broken
const BASE_URL = 'http://localhost:3000';

// Form handlers for creating tasks & subtasks
// ───────────────────────────────────────────────────────────

document.getElementById('taskForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title       = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;
  const status      = document.getElementById('taskStatus').value;
  const user_id     = localStorage.getItem('user_id');

  await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, title, description, status })
  });

  e.target.reset();
  loadAll();
});

document.getElementById('subtaskForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title   = document.getElementById('subtaskTitle').value;
  const task_id = document.getElementById('taskId').value;

  await fetch(`${BASE_URL}/subtasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, task_id })
  });

  e.target.reset();
  loadAll();
});

// have to load all tasks on page load dont remove this

window.addEventListener('DOMContentLoaded', loadAll);

async function loadAll() {
  const userId = localStorage.getItem('user_id');
  if (!userId) return console.error('No user_id in localStorage');

  
  let tasks;
  try {
    const res = await fetch(`${BASE_URL}/tasks/${userId}`);
    tasks = await res.json();
  } catch (err) {
    return console.error('Failed to load tasks:', err);
  }

  
  const container = document.getElementById('taskList');
  container.innerHTML = '';

  for (const t of tasks) {
    const id = t.task_id; 

    
    const card = document.createElement('div');
    card.className = 'task-item';
    card.innerHTML = `
      <h3>${t.title}</h3>
      <p>${t.description}</p>
      <p>Status: ${t.status}</p>
      <button class="edit-task">Edit</button>
      <button class="delete-task">Delete</button>
      <h4>Subtasks:</h4>
      <ul id="subtasks-${id}"><li>Loading…</li></ul>
    `;
    container.appendChild(card);

    
    card.querySelector('.delete-task').addEventListener('click', async () => {
      if (!confirm('Delete this task?')) return;
      await fetch(`${BASE_URL}/tasks/${id}`, { method: 'DELETE' });
      loadAll();
    });

   
    card.querySelector('.edit-task').addEventListener('click', async () => {
      const newTitle = prompt('New title', t.title);
      if (!newTitle) return;
      const newDesc   = prompt('New description', t.description);
      const newStatus = prompt('New status', t.status);

      await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDesc, status: newStatus })
      });
      loadAll();
    });

    
  
    try {
      const subRes = await fetch(`${BASE_URL}/subtasks/${id}`);
      const subs   = await subRes.json();
      const ul     = document.getElementById(`subtasks-${id}`);
      ul.innerHTML = ''; 

      if (!Array.isArray(subs) || subs.length === 0) {
        ul.innerHTML = '<li>↳ (no subtasks)</li>';
      } else {
        for (const s of subs) {
          const li = document.createElement('li');
          li.textContent = `↳ ${s.title}`;

          // Subtask button hope it works
          const editBtn = document.createElement('button');
          editBtn.textContent = '✎';
          editBtn.addEventListener('click', async () => {
            const newTitle = prompt('Edit subtask', s.title);
            if (!newTitle) return;
            await fetch(`${BASE_URL}/subtasks/${s.subtask_id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title: newTitle, completed: s.completed })
            });
            loadAll();
          });

          // Subtask DELETE button
          const delBtn = document.createElement('button');
          delBtn.textContent = '🗑';
          delBtn.addEventListener('click', async () => {
            if (!confirm('Delete this subtask?')) return;
            await fetch(`${BASE_URL}/subtasks/${s.subtask_id}`, { method: 'DELETE' });
            loadAll();
          });

          li.appendChild(editBtn);
          li.appendChild(delBtn);
          ul.appendChild(li);
        }
      }
    } catch (err) {
      console.error(`Error loading subtasks for task ${id}:`, err);
      document.getElementById(`subtasks-${id}`).innerHTML =
        '<li>↳ error loading subtasks</li>';
    }
  }
}
