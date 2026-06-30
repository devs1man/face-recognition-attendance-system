from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
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


@router.get("/students/{student_id}")
def get_students(
    student_id: int,
    db:Session = Depends(get_db)
):
    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )
    return student


@router.put("/students/{student_id}")
def update_student(
    student_id: int,
    student:StudentCreate,
    db: Session=Depends(get_db)
):
    db_student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if db_student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )
    db_student.roll_number = student.roll_number
    db_student.name = student.name
    db_student.department = student.department
    db_student.year = student.year
    db_student.email = student.email

    db.commit()
    db.refresh(db_student)
    return db_student