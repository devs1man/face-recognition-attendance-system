from sqlalchemy.orm import Session

from app.models.attendance_record import AttendanceRecord
from app.models.attendance_session import AttendanceSession

def mark_attendance(
        student_id: int,
        session_id: int,
        confidence: float,
        db: Session,
):

    existing = (
        db.query(AttendanceRecord)
        .filter(
            AttendanceRecord.student_id == student_id,
            AttendanceRecord.attendance_session_id == session_id
        )
        .first()
    )
    if existing:
        return{
            "success" : False,
            "message" : "Attendance already marked."
        }
    attendance = AttendanceRecord(
        student_id=student_id,
        attendance_session_id = session_id,
        confidence=confidence,
    )

    db.add(attendance)
    db.commit()
    db.refresh(attendance)

    return {
        "success": True,
        "attendance_id":attendance.id,
        "student_id":student_id,
        "message" : "Attendance marked"
    }