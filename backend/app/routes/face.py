from fastapi import APIRouter

router = APIRouter(
    prefix="/face",
    tags=["Face Recognition"]
)

@router.post("/register/{student_id}")
def register_face(student_id: int):
    return{
        "message": f"Registering face for student {student_id}"
    }