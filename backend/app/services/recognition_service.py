from sqlalchemy.orm import Session

from app.services.ai_manager import face_detector
from app.services.face_embedder import FaceEmbedder
from app.services.face_matcher import match_face

embedder = FaceEmbedder()

def recognize_frame(
        frame,
        db:Session
):
    faces = face_detector.detect_faces(frame)

    recognized_students = []

    for face in faces:
        embedding = face.embedding

        match = match_face(
            embedding,
            db
        )

        if match is None:
            recognized_students.append(match)

    return recognized_students