import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // do not allow empty task title
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim(),
    });

    // clear input after adding task
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter short description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Save Task</button>
    </form>
  );
}

export default TodoForm;