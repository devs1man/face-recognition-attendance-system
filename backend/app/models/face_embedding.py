from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey
)
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship
from datetime import datetime, UTC
from app.database.database import Base

class FaceEmbedding(Base):
    __tablename__ = "face_embeddings"
    
    id = Column(
        Integer,
        primary_key=True
    )

    student_id = Column(
        Integer, 
        ForeignKey(
            "students.id",
            ondelete="CASCADE"
        ),
        nullable=False
    )

    embedding = Column(
        ARRAY(Float),
        nullable=False
    )

    model_name = Column(
        String,
        nullable=False
    )

    embedding_dimension = Column(
        Integer,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC)
    )

    student = relationship(
        "Student",
        back_populates="face_embeddings"
    )