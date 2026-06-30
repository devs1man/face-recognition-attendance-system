from fastapi import APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends
from app.database.database import SessionLocal
from app.models.student import Student
from app.schemas.student import StudentCreate
from app.database.database import get_db

router = APIRouter()

@router.post("/students")
def create_student(
    student: StudentCreate,
    db: Session=Depends(get_db)
):
    db_student = Student(
        roll_number=student.roll_number,
        name=student.name,
        department=student.department,
        year=student.year,
        email=student.email
    )
    
    db.add(db_student)
    db.commit()
    db.refresh(db_student)

    return db_student

@router.get("/students")
def get_students(
    db:Session = Depends(get_db)
):
    students = db.query(Student).all()
    return students