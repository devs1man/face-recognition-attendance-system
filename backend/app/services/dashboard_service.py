from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date

from app.models.student import Student
from app.models.attendance_record import AttendanceRecord
from app.models.attendance_session import AttendanceSession

def get_dashboard_stats(db:Session):
    total_students =  db.query(Student).count()
    total_sessions = db.query(AttendanceSession).count()
    today_attendance = (
        db.query(AttendanceRecord).filter(func.date(AttendanceRecord.timestamp) == date.today()).count()
    )
    active_session = (
        db.query(AttendanceSession).filter(AttendanceSession.status == "ACTIVE").first()
    )
    
    return{
        "total_students":total_students,
        "total_sessions":total_sessions,
        "today_attendance":today_attendance,
        "active_session":active_session is not None,
    }