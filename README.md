# Neighborhood Library Service

## Tech Stack
- FastAPI (Python)
- PostgreSQL
- Next.js

---

## Backend Setup

1. Install PostgreSQL
2. Create database:

CREATE DATABASE library;

3. Create backend/.env

DATABASE_URL=postgresql://postgres:password@localhost:5432/library

4. Install dependencies

cd backend
pip install -r requirements.txt

5. Run server

uvicorn app.main:app --reload

API Docs:
http://localhost:8000/docs

---

## Frontend Setup

cd frontend
npm install
npm run dev

Frontend:
http://localhost:3000
