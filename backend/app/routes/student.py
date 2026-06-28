from fastapi import APIRouter

router = APIRouter()

@router.get("/students")
def get_students():
    return [
        {
            "id": 1,
            "name": "Kuttaa",
            "branch": "Mechanical Engineering",
        },
        {
            "id": 2,
            "name": "Alice",
            "branch": "Computer Science",
        },
    ]