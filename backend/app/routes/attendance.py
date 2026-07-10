from fastapi import APIRouter

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"],
)
@router.get("/health")
def health():
    return {
        "message":"Attendance routes working"
    }