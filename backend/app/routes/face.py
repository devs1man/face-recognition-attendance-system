from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.registration_service import register_face

router = APIRouter(
    prefix="/face",
    tags=["Face Recognition"]
)

@router.post("/register/{student_id}")
def register_student_face(
    student_id:int,
    db:Session = Depends(get_db)
):
    return register_face(
        student_id,
        db
    )