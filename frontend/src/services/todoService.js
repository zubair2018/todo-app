import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getTodos = (params) => API.get('/api/todos', { params });
export const createTodo = (data) => API.post('/api/todos', data);
export const updateTodo = (id, data) => API.put(`/api/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/api/todos/${id}`);
export const toggleStatus = (id) => API.patch(`/api/todos/${id}/status`);
