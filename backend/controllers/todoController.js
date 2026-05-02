const todoService = require('../services/todoService');

const getAllTodos = async (req, res, next) => {
  try {
    // get todos with optional search and status filter
    const todos = await todoService.getTodos(req.query);
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

const createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // title is required to create task
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

module.exports = {
  getAllTodos,
  createTodo,
};