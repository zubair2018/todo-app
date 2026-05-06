const todoService = require('../services/todoService');

const getAllTodos = async (req, res, next) => {
  try {
    const todos = await todoService.getTodos(req.query);
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

const createTodo = async (req, res, next) => {
  try {
    const title = req.body.title ? req.body.title.trim() : '';
    const description = req.body.description ? req.body.description.trim() : '';

    // title is the only required field for a task
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const todo = await todoService.createTodo({
      title,
      description
    });

    res.status(201).json({
      message: 'Task created',
      todo
    });
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status
    };

    if (data.title !== undefined) {
      data.title = data.title.trim();
      if (!data.title) {
        return res.status(400).json({ message: 'Title is required' });
      }
    }

    if (data.description !== undefined) {
      data.description = data.description.trim();
    }

    const todo = await todoService.updateTodo(id, data);

    if (!todo) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({
      message: 'Task updated',
      todo
    });
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const todo = await todoService.deleteTodo(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};

const toggleStatus = async (req, res, next) => {
  try {
    const todo = await todoService.toggleTodoStatus(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({
      message: 'Status updated',
      todo
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleStatus
};