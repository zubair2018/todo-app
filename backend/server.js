const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middlewares/errorHandler');

// load environment variables from .env file
dotenv.config();

// connect backend with MongoDB database
connectDB();

const app = express();

// allow frontend to call backend api
app.use(cors());

// this helps express read json data from request body
app.use(express.json());

// simple route to check server is working or not
app.get('/', (req, res) => {
  res.send('Todo API is running');
});

// all todo related routes will start with /api/todos
app.use('/api/todos', todoRoutes);

// common error handling middleware
app.use(errorHandler);

// use port from .env, otherwise use 5000 by default
const PORT = process.env.PORT || 5000;

// start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});