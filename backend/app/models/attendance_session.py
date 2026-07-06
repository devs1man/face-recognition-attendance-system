from datetime import datetime, UTC

from sqlalchemy import(
    Column,
    Integer,
    DateTime,
    ForeignKey,
    String,
)

from sqlalchemy.orm import relationship

from app.database.database import Base

class AttendanceSession(Base):
    __tablename__ = "attendance_sessions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
    # course_id = Column(
    #     Integer,
    #     ForeignKey("courses.id"),
    #     nullable=False
    # )
    started_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC)
    )
    ended_at = Column(
        DateTime(timezone=True),
        nullable=True
    )
    status = Column(
        String,
        default="ACTIVE"
    )
    attendance_records = relationship(
        "AttendanceRecord",
        back_populates="attendance_session",
        cascade="all, delete-orphan"
    )