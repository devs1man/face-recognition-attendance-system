from fastapi import APIRouter, Depends
from app.schemas.attendance import AttendanceCreate
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.attendance_service import mark_attendance

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"],
)
@router.get("/health")
def health():
    return {
        "message":"Attendance routes working"
    }
@router.post("/mark")
def mark_student_attendance(
    attendance: AttendanceCreate,
    db: Session = Depends(get_db),
):
    return mark_attendance(
        attendance.student_id,
        attendance.session_id,
        attendance.confidence,
        db,
    )