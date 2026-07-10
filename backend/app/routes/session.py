from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.session_service import (
    start_session,
    end_session,
)

router = APIRouter(
    prefix="/session",
    tags=["Session"]
)

@router.post("/start")
def create_session(
    db: Session = Depends(get_db)
):
    session = start_session(db)

    return {
        "session_id" : session.id,
        "status" : session.status,
        "started_at":session.started_at
    }

@router.post("/end/{session_id}")
def close_session(
    session_id: int,
    db: Session = Depends(get_db),
):
    session = end_session(
        session_id,
        db,
    )
    if session is None:
        raise HTTPException(
            status_code=404,
            detail="Session not found",
        )
    return{
        "session_id":session.id,
        "status" : session.status,
        "ended_at" : session.ended_at,
    }