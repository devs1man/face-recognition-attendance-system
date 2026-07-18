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
    student = Student(
        roll_number=student.roll_number,
        name=student.name,
        department=student.department,
        year=student.year,
        email=student.email
    )
    
    db.add(student)
    db.commit()
    db.refresh(student)

    return student

@router.get("/students")
def get_all_students(
    db:Session = Depends(get_db)
):
    students = db.query(Student).all()
    return students

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
    student_data:StudentCreate,
    db: Session=Depends(get_db)
):
    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )
    student.roll_number = student_data.roll_number
    student.name = student_data.name
    student.department = student_data.department
    student.year = student_data.year
    student.email = student_data.email

    db.commit()
    db.refresh(student)
    return student

@router.delete("/students/{student_id}")
def delete_student(
    student_id: int,
    db: Session=Depends(get_db)
):
    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )
    db.delete(student)
    db.commit()

    return{
        "message":"Student deleted successfully"
    }