const express = require('express');
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleStatus,
} = require('../controllers/todoController');

const router = express.Router();

router.get('/', getAllTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.patch('/:id/status', toggleStatus);
router.delete('/:id', deleteTodo);

module.exports = router;
