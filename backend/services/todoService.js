const Todo = require('../models/Todo');

const getTodos = async (query) => {
  const filter = {};

  if (query.status) {
    filter.status = query.status;
  }

  if (query.search) {
    filter.title = { $regex: query.search, $options: 'i' };
  }

  return await Todo.find(filter).sort({ createdAt: -1 });
};

const createTodo = async (data) => {
  return await Todo.create(data);
};

const updateTodo = async (id, data) => {
  return await Todo.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteTodo = async (id) => {
  return await Todo.findByIdAndDelete(id);
};

const toggleTodoStatus = async (id) => {
  const todo = await Todo.findById(id);

  if (!todo) {
    return null;
  }

  todo.status = todo.status === 'pending' ? 'completed' : 'pending';
  return await todo.save();
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
};
