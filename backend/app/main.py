from fastapi import FastAPI
from app.routes.health import router
from app.routes.student import router as student_router
from app.routes.face import router as face_router
from app.database.database import Base
from app.routes.session import router as session_router
from app.routes.attendance import router as attendance_router
from app.routes.recognition import router as recognition_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Face recognition Attendance System API",
    description="Backend API for managing face recognition based attendance",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return{
        "message": "welcome to the face recognition attendance system API"
    }

app.include_router(router)
app.include_router(student_router)
app.include_router(face_router)
app.include_router(session_router)
app.include_router(attendance_router)
app.include_router(recognition_router)