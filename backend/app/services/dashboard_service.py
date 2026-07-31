from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date

from app.models.student import Student
from app.models.attendance_record import AttendanceRecord
from app.models.attendance_session import AttendanceSession

def get_dashboard_stats(db:Session):
    total_students = (
        db.query(Student)
        .count()
    )
    return{
        "total_students":total_students
    }