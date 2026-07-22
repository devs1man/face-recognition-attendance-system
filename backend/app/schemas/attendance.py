from pydantic import BaseModel

class AttendanceCreate(BaseModel):
    session_id: int
    student_id: int
    confidence: float