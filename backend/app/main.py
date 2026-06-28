from fastapi import FastAPI
from app.routes.health import router
from app.routes.student import router as student_router

app = FastAPI(
    title="Face recognition Attendance System API",
    description="Backend API for managing face recognition based attendance",
    version="1.0.0",
)

@app.get("/")
def root():
    return{
        "message": "welcome to the face recognition attendance system API"
    }

app.include_router(router)
app.include_router(student_router)