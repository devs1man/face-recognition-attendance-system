from sqlalchemy.orm import Session
from datetime import datetime, UTC

from app.models.attendance_session import AttendanceSession

def start_session(db: Session):
    session = AttendanceSession()

    db.add(session)
    db.commit()
    db.refresh(session)
    return session

def end_session(
        session_id:int,
        db: Session,
):
    session = (
        db.query(AttendanceSession)
        .filter(
            AttendanceSession.id == session_id
        )
        .first()
    )
    if session is None:
        return None
    
    session.status = "COMPLETED"
    session.ended_at = datetime.now(UTC)
    db.commit()

    return session