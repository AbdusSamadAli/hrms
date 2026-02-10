# HRMS Lite – Full Stack Application

A lightweight **Human Resource Management System (HRMS Lite)** built as a full-stack web application.  
The system allows an admin to manage employee records and track daily attendance through a clean and usable interface.

This project is designed to demonstrate **end-to-end full-stack development skills**, including frontend UI, backend APIs, database design, validation, and production-ready structure.

---

## Project Overview

The application supports the following core features:

- **Employee Management**
  - Add new employees with unique Employee ID and email
  - View a list of all employees
  - Delete employees (with validation to prevent deletion if attendance exists)

- **Attendance Management**
  - Mark daily attendance (Present / Absent)
  - View attendance records for a specific employee
  - Prevent duplicate attendance for the same employee on the same date

The system simulates a **basic internal HR tool** with a focus on simplicity, correctness, and usability.

---

## 🛠️ Tech Stack Used

### Frontend
- React (Vite)
- Tailwind CSS
- JavaScript (ES6+)

### Backend
- FastAPI (Python)
- SQLAlchemy ORM
- PostgreSQL

### Tooling & Others
- Uvicorn (ASGI server)
- pgAdmin (local PostgreSQL management)
- Git & GitHub

---

## ▶️ Steps to Run the Project Locally

### Clone the repository
```bash
git clone <your-repo-url>
cd hrms
Backend Setup (FastAPI)
cd backend
python -m venv venv

Activate virtual environment:
Windows: venv\Scripts\activate
macOS / Linux: source venv/bin/activate

Install dependencies: pip install -r requirements.txt

Run the backend: uvicorn main:app --reload

Backend will be available at: http://127.0.0.1:8000

Swagger API Docs: http://127.0.0.1:8000/docs


Frontend Setup (React + Vite)

cd frontend
npm install
npm run dev

Frontend will be available at: http://localhost:5173

Connect Frontend & Backend

Ensure the backend base URL is correctly set in:

src/api/api.js

const BASE_URL = "http://127.0.0.1:8000";


Assumptions & Limitations

The system assumes a single admin user.

No authentication or authorization is implemented.

Employees with existing attendance records cannot be deleted to preserve data integrity.

Additional Features:

Server-side validation implemented using Pydantic

Database-level constraints prevent duplicate and inconsistent data

CORS configured for frontend-backend communication
