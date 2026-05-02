const todoService = require('../services/todoService');

const getAllTodos = async (req, res, next) => {
  try {
    
    // get all todos with optional search and status filter
    const todos = await todoService.getTodos(req.query);
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

const createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // title is required before creating a task
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const todo = await todoService.createTodo({
      title: title.trim(),
      description: description?.trim() || '',
    });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    const updatedTodo = await todoService.updateTodo(req.params.id, {
      title,
      description,
      status,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const deletedTodo = await todoService.deleteTodo(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const toggleStatus = async (req, res, next) => {
  try {
    const todo = await todoService.toggleTodoStatus(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleStatus,
};