from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database.database import Base

class Student(Base):
    __tablename__ = "students"
    
    id = Column(Integer, primary_key=True)
    roll_number = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    department = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    email = Column(String, unique=True, nullable=False)

    attendance_records = relationship(
        "AttendanceRecord",
        back_populates="student",
        cascade="all,delete-orphan"
    )

    face_embeddings = relationship(
        "FaceEmbedding",
        back_populates="student",
        cascade="all, delete"
    )