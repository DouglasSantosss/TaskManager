document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('taskStatus').value;
  
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 1, 
        title,
        description,
        status,
        due_date: '2025-04-30'
      })
    });
  
    const data = await response.json();
    console.log(data);
  });
  
