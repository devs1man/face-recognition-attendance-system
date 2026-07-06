from datetime import datetime,UTC
from sqlalchemy import Column, Integer, String, DateTime,Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base

class AttendanceRecord(Base):
    __tablename__ = "attendance_records"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
    attendance_session_id = Column(
        Integer,
        ForeignKey(
            "attendance_sessions.id",
            ondelete="CASCADE"
        ),
        nullable=False
    )
    
    student_id = Column(
        Integer,
        ForeignKey("students.id", ondelete="CASCADE"),
        nullable=False
    )
    timestamp = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC)
    )

    confidence = Column(
        Float,
        nullable=False
    )

    status = Column(
        String,
        default="PRESENT"
    )

    student = relationship(
        "Student",
        back_populates="attendance_records"
    )
    
    attendance_session = relationship(
        "AttendanceSession",
        back_populates="attendance_records"
    )