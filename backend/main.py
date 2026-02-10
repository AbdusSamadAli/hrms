from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base
from schemas import AttendanceCreate, AttendanceResponse
from models import Attendance
from fastapi.middleware.cors import CORSMiddleware

import schemas, crud

Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/employees", response_model=schemas.EmployeeResponse)
def add_employee(emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    return crud.create_employee(db, emp)

@app.get("/employees", response_model=list[schemas.EmployeeResponse])
def list_employees(db: Session = Depends(get_db)):
    return crud.get_all_employees(db)

@app.delete("/employees/{employee_id}")
def remove_employee(employee_id: str, db: Session = Depends(get_db)):
    deleted = crud.delete_employee(db, employee_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee deleted successfully"}

@app.post("/attendance", response_model=AttendanceResponse)
def mark_employee_attendance(
    att: AttendanceCreate,
    db: Session = Depends(get_db)
):
    record = crud.mark_attendance(db, att)
    if not record:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked for this employee on this date"
        )
    return record

@app.get("/attendance/{employee_id}", response_model=list[AttendanceResponse])
def get_employee_attendance(employee_id: str, db: Session = Depends(get_db)):
    return crud.get_attendance_by_employee(db, employee_id)

@app.get("/")
def home():
    return {
        "message" : "HRMS server running"
    }
