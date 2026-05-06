import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleStatus,
} from './services/todoService';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const loadTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await getTodos({
        search: searchText,
        status: statusFilter
      });

      setTaskList(response.data);
    } catch (err) {
      setError('Could not fetch tasks');
      setTaskList([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, [searchText, statusFilter]);

  const handleAddTask = async (taskData) => {
    setError('');

    try {
      await createTodo(taskData);
      loadTasks();
    } catch (err) {
      setError('Could not add task');
    }
  };

  const handleDeleteTask = async (id) => {
    setError('');

    try {
      await deleteTodo(id);
      loadTasks();
    } catch (err) {
      setError('Could not delete task');
    }
  };

  const handleStatusChange = async (id) => {
    setError('');

    try {
      await toggleStatus(id);
      loadTasks();
    } catch (err) {
      setError('Could not update status');
    }
  };

  const startEdit = (todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  const cancelEdit = () => {
    setEditId('');
    setEditTitle('');
    setEditDescription('');
  };

  const saveEdit = async () => {
    if (!editTitle.trim()) {
      setError('Title is required');
      return;
    }

    setError('');

    try {
      await updateTodo(editId, {
        title: editTitle,
        description: editDescription
      });

      cancelEdit();
      loadTasks();
    } catch (err) {
      setError('Could not update task');
    }
  };

  const completedCount = taskList.filter((item) => item.status === 'completed').length;

  return (
    <div className="container">
      <h1>Zubi's Task Tracker</h1>
      <p className="sub-text">
        Total Tasks: {taskList.length} | Completed: {completedCount}
      </p>

      <TodoForm onAdd={handleAddTask} />

      <div className="filters">
        <input
          type="text"
          placeholder="Search task by title"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {editId && (
        <div className="edit-box">
          <h3>Edit Task</h3>

          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task title"
          />

          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Task description"
          />

          <div className="actions">
            <button onClick={saveEdit}>Update</button>
            <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}

      {loading && <p>Loading tasks...</p>}
      {error && <p className="error">{error}</p>}

      <div className="todo-list">
        {taskList.length > 0 ? (
          taskList.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onDelete={handleDeleteTask}
              onToggle={handleStatusChange}
              onEdit={startEdit}
            />
          ))
        ) : (
          !loading && <p>No tasks yet. Add your first one.</p>
        )}
      </div>
    </div>
  );
}

export default App;