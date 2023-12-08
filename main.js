'use strict';

{
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };


  const renderTodo = (todo) => {
    /*
    - li
      - label
        - input
        - span
      - button
    */
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = todo.isCompleted;
    input.addEventListener('change', () => {
      todos.forEach((item) => {
        if (item.id === todo.id) {
          item.isCompleted = !item.isCompleted;
        }
      });
      saveTodos();
    });
    localStorage.setItem('todos', JSON.stringify(todos));
    const span = document.createElement('span');
    span.textContent = todo.title;
    const label = document.createElement('label');
    label.appendChild(input);
    label.appendChild(span);
    const button = document.createElement('button');
    button.textContent = '消す';
    button.addEventListener('click', () => {
      if (!confirm('本当に消してよいですか？')) {
        return;
      }
      li.remove();
      todos = todos.filter((item) => {
        return item.id !== todo.id;
      });
      saveTodos();
    });
    const li = document.createElement('li');
    li.appendChild(label);
    li.appendChild(button);
    document.querySelector('#todos').appendChild(li);
  };

  const renderTodos = () => {
    todos.forEach((todo) => {
      renderTodo(todo);
    });
  };

  document.querySelector('#add-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('#add-form input');
    const todo = {
      id: Date.now(),
      title: input.value,
      isCompleted: false,
    };
    renderTodo(todo);
    todos.push(todo);
    saveTodos();
    input.value = '';
    input.focus();
  });

  document.querySelector('#purge').addEventListener('click', () => {
    if (!confirm('Sure?')) {
      return;
    }
    todos = todos.filter((todo) => {
      return todo.isCompleted === false;
    });
    saveTodos();
    document.querySelectorAll('#todos li').forEach((li) => {
      li.remove();
    });
    renderTodos();
  });

  renderTodos();

  const result = document.querySelector('#result input');
  const comment = document.querySelector('#comment');

  result.addEventListener('input', () => {
    if (result.value >= 5) {
      comment.textContent = 'すごいですね！☻';
    } else if (result.value < 5) {
      comment.textContent = '頑張りました。';
    } else {
      comment.textContent = '数字を入力してください。';
    }
  });
}