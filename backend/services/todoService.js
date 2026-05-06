const Todo = require('../models/Todo');

const getTodos = async (query) => {
  const filter = {};

  // keeping search in backend so frontend stays simple
  if (query.search) {
    filter.title = { $regex: query.search, $options: 'i' };
  }

  if (query.status) {
    filter.status = query.status;
  }

  return Todo.find(filter).sort({ createdAt: -1 });
};

const createTodo = async (data) => {
  const todo = new Todo(data);
  return todo.save();
};

const updateTodo = async (id, data) => {
  return Todo.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

const deleteTodo = async (id) => {
  return Todo.findByIdAndDelete(id);
};

const toggleTodoStatus = async (id) => {
  const todo = await Todo.findById(id);

  if (!todo) {
    return null;
  }

  if (todo.status === 'completed') {
    todo.status = 'pending';
  } else {
    todo.status = 'completed';
  }

  return todo.save();
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus
};