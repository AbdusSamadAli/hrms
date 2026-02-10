from sqlalchemy.orm import Session
from models import Employee
from schemas import EmployeeCreate
from models import Attendance
from sqlalchemy.exc import IntegrityError

def create_employee(db: Session, emp: EmployeeCreate):
    employee = Employee(**emp.dict())
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee

def get_all_employees(db: Session):
    return db.query(Employee).all()

def delete_employee(db: Session, employee_id: str):
    emp = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if emp:
        db.delete(emp)
        db.commit()
        return True
    return False



def mark_attendance(db, att):
    record = Attendance(**att.dict())
    db.add(record)
    try:
        db.commit()
        db.refresh(record)
        return record
    except IntegrityError:
        db.rollback()
        return None

def get_attendance_by_employee(db, employee_id: str):
    return db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    ).all()
