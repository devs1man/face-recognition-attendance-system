from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session

import cv2
import numpy as np

from app.database.database import get_db
from app.services.recognition_service import recognize_frame

router = APIRouter(
    prefix="/recognition",
    tags=["Recognition"]
)
@router.post("/recognize")
async def recognize(
        file: UploadFile = File(...),
        db:Session = Depends(get_db),
):
    contents = await file.read()

    image = np.frombuffer(
        contents,
        np.uint8
    )

    frame = cv2.imdecode(
        image,
        cv2.IMREAD_COLOR
    )

    students = recognize_frame(
        frame,
        db
    )
    return{
        "recognized_students":students
    }