# To-Do List Web Application

## Objective

In the modern world, effective task management is crucial for productivity. This project aims to develop a web application that enables users to efficiently manage their tasks using a to-do list. By utilizing EJS (Embedded JavaScript) and MongoDB, the application will offer a dynamic and interactive user experience, allowing for seamless task management. Users can create, edit, and delete tasks, with all data stored permanently in a MongoDB database.

## Technology Stack

- EJS (Embedded JavaScript): Used for creating dynamic HTML templates, allowing embedded JavaScript within HTML for real-time updates.

- MongoDB: A NoSQL database used to store all task-related data, chosen for its flexibility and ability to handle large volumes of unstructured data efficiently.

- Node.js: The server-side environment for the application, known for its scalability and performance.

- Express.js: A web application framework for Node.js that simplifies the backend creation to handle user requests and interact with the MongoDB database.

## Project Requirements

### User Interface

- Task Creation: 
  - Users can add new tasks to their to-do list via a user-friendly form. 
  - Tasks will not be created if the task title is empty.

- Task Editing:
  - Users can modify existing tasks, including changing the task's priority. 
  - An editable pencil icon represents the Edit button.
  - Upon successful update, an alert shows with the message "Task updated successfully."

- Task Deletion:
  - Users can delete tasks individually to maintain an organized list.
  - A trash icon represents the delete button.
  - When clicked, the task will be deleted, accompanied by an alert confirming "Task deleted successfully."

- Show Alert: 
  - Alerts will be shown when the input field is empty or when the "Add" button is clicked.

- HTTP Method:
  - Correct HTTP method usage according to the request (e.g., POST for adding tasks, DELETE for removing them).

### Backend Functionality

- Data Storage: 
  - All tasks will be stored in a MongoDB Atlas database, ensuring data persistence and reliability. 
  - [Watch this video for MongoDB Atlas setup](https://youtu.be/QyYMvdFwBKA?si=5KHrrSO4VSZZus0F).

- Dynamic Updates: 
  - The application will dynamically update the user interface using EJS templates as tasks are added, edited, or deleted.

## Database Structure

The MongoDB database will have a collection named tasks, where each document will contain:
- title: (String) Title of the task
- priority: (String) Set the task's urgency as "urgent," "low," or "high".

## Installation

1. Clone the repository:
   ```bash
   https://github.com/vikrambagali/render-todolist

Navigate to the project directory:
cd todo-list-app

Install the dependencies:
npm install

Set up your environment variables (e.g., database connection string) in a .env file.

Start the application:
npm start

Open your browser and navigate to http://localhost:3000.


Usage


Access the application in your web browser.

Use the provided form to create new tasks.

Edit existing tasks using the pencil icon and manage priority levels as necessary.

Delete individual tasks as needed.

Ensure proper alerts are shown for task creation, edits, and deletions.


Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request for enhancements or bug fixes.
License

This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgements


Special thanks to the open-source community for the tools and resources that made this project possible.

Inspired by various task management applications and best practices in web development.


Contact

For any questions or feedback, please contact me at 28vikram20@gmail.com
//////////////////////////////////////////////////////////////////////////////////////
## 1. Render Deployed Link:
   ```bash
   https://render-todolist-2.onrender.com
