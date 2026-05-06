import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api/todos',
});

export const getTodos = (params) => API.get('/', { params });
export const createTodo = (data) => API.post('/', data);
export const updateTodo = (id, data) => API.put(`/${id}`, data);
export const deleteTodo = (id) => API.delete(`/${id}`);
export const toggleStatus = (id) => API.patch(`/${id}/status`);