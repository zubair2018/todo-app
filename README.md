# MERN To-Do List App

This project is a simple To-Do List application made using **MongoDB, Express.js, React.js, and Node.js**. It was built as part of the assignment to first create the backend APIs and then connect them with the React frontend so that the full app works properly.

## Project objective

The main goal of this project was to build a working To-Do application where a user can add tasks, view tasks, search tasks, update task status, and delete tasks using a proper MERN stack structure.[1] The backend was created with Express and MongoDB, while the frontend was connected using Axios so that the UI updates dynamically when the user performs any action.

## Features implemented

- Add a new task.
- View all tasks from MongoDB.
- Search tasks by title.
- Filter tasks by status such as pending or completed.
- Update task status.
- Delete a task.
- Show loading and error messages on frontend when needed.

## Tech stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

### Frontend
- React.js
- Axios
- Vite

## Folder structure


todo-assignment/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   └── package.json
│
└── README.md


## Backend setup

1. Open terminal in the `backend` folder.
2. Install dependencies:

npm install

3. Create a `.env` file inside `backend` and add:


PORT=5000
MONGO_URI=mongodb_connection_string


4. Start backend server:

npm run dev


The backend runs on `http://localhost:5000` if the MongoDB connection is correct.

## Frontend setup

1. Open another terminal in the `frontend` folder.
2. Install dependencies:


npm install


3. Create a `.env` file inside `frontend` and add:


VITE_API_URL=http://localhost:5000


4. Start frontend:

npm run dev


The React frontend connects to the backend using Axios and sends requests to the API routes for all task actions.

## API routes used

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/todos` | Get all tasks  |
| POST | `/api/todos` | Add new task  |
| PUT | `/api/todos/:id` | Update task details  |
| PATCH | `/api/todos/:id/status` | Change task status  |
| DELETE | `/api/todos/:id` | Delete task  |

Search and filter can also be used like this:

- `GET /api/todos?search=study`
- `GET /api/todos?status=completed`

## Testing

The backend APIs were tested using Postman to check whether create, read, update, delete, search, and status update were working properly. The frontend was tested by performing task operations in the browser and checking whether data stayed synced between UI and backend.

## Deployment

The recommended deployment approach for this project is:

- **Backend:** Render
- **Frontend:** Netlify

After backend deployment, the frontend environment variable should be updated to the deployed backend URL before final frontend deployment.

### Deployed links
- Frontend Link: `Add your Netlify link here`
- Backend Link: `Add your Render link here`
- GitHub Repository: `Add your GitHub repo link here`
- Submission Form Link: `Add Google Form link here`

## Challenges faced

### 1. Connecting frontend with backend
At first, the frontend was not always fetching the data correctly because the API base URL and routes needed to be matched properly. This was solved by keeping all API calls inside one service file and using the same base URL everywhere.

### 2. Handling API response safely
There was an issue where the frontend expected an array but sometimes got a different response during errors, which caused `map is not a function`. This was handled by checking whether the response data is actually an array before saving it in state.

### 3. CORS and environment setup
While connecting React and Express, CORS and `.env` setup were important to make local development work smoothly. This was solved by using `cors` middleware in backend and keeping the API URL inside frontend environment variables.

## Decisions made during the project

The project was kept simple and beginner-friendly so that the code stays readable and easy to explain in submission. A controller-service-routes structure was used in backend to keep logic separated, and Axios was used in frontend for clean API integration.


## Final note

This project was made to complete both parts of the assignment: backend API development and frontend API integration. The focus was on keeping the structure simple, functional, and easy to understand while following good coding practices.