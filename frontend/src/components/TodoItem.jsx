function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  return (
    <div className="todo-item">
      <div>
        <h3>{todo.title}</h3>
        <p>{todo.description || 'No description'}</p>
        <span className={todo.status === 'completed' ? 'done' : 'pending'}>
          {todo.status}
        </span>
      </div>

      <div className="actions">
        <button onClick={() => onEdit(todo)}>Edit</button>
        <button onClick={() => onToggle(todo._id)}>Status</button>
        <button onClick={() => onDelete(todo._id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;