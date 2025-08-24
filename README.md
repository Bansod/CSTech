# Agent Management Project

The **Agent Management Project** is a web application built to create and manage agents, as well as assign tasks to them. Agents and tasks can be added once an account is created.  

---

## Features
The application consists of the following modules:

### 1. **Dashboard**
- Main landing page after logging in.
- Provides an overview of agents and tasks.

### 2. **Agents**
- Add and manage agents.
- Each agent has unique details (name, email, etc.).

### 3. **Tasks**
- Upload tasks in **CSV/XLS** format.
- Tasks are automatically distributed to the agents.

---

## Environment Configuration
Create a `.env` file in the root directory and add the following values:

```env
MONGO_URI= Add your MongoDB URI here
JWT_SECRET= Add your JWT secret here
PORT=5000
```
---
## Steps to run
Clone the repository, install dependencies and run. "npm run build" can be used for both Client and Server modules.

```env
npm install
npm run build
