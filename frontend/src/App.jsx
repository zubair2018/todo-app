import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import {
  getTodos,
  createTodo,
  deleteTodo,
  toggleStatus,
} from './services/todoService';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // this function loads all tasks from backend

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getTodos({
        search: searchText,
        status: statusFilter,
      });


      // making sure response is array before saving it

      if (Array.isArray(response.data)) {
        setTaskList(response.data);
      } else {
        setTaskList([]);
        setError('Data format is not correct');
      }
    } catch (err) {
      setTaskList([]);
      setError('Could not fetch tasks');
    } finally {
      setLoading(false);
    }
  };
  

  // load tasks on first render and also when search/filter changes

  useEffect(() => {
    loadTasks();
  }, [searchText, statusFilter]);

  const handleAddTask = async (taskData) => {
    try {
      await createTodo(taskData);


      // after adding task, reload latest list

      loadTasks();
    } catch (err) {
      setError('Could not add task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTodo(id);

      // refresh list after delete
      loadTasks();
    } catch (err) {
      setError('Could not delete task');
    }
  };

  const handleStatusChange = async (id) => {
    try {
      await toggleStatus(id);


      // reload so updated status shows on screen
      
      loadTasks();
    } catch (err) {
      setError('Could not update status');
    }
  };

  const completedCount = taskList.filter(
    (item) => item.status === 'completed'
  ).length;

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