const API = 'http://localhost:5000';

async function fetchTodos() {
  const res = await fetch(`${API}/todos`);
  const todos = await res.json();
  const list = document.getElementById('todoList');
  list.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${todo.text}</span>
      <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  if (!text) return;
  await fetch(`${API}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  input.value = '';
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`${API}/todos/${id}`, { method: 'DELETE' });
  fetchTodos();
}

// Load todos on page load
fetchTodos();