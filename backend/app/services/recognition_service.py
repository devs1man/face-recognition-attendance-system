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
    print(f"faces detected: {len(faces)}")

    recognized_students = {}

    for face in faces:
        embedding = face.embedding

        print("matching...")
        match = match_face(
            embedding,
            db
        )
        print(match)

        if match is not None:
            match["bbox"] = face.bbox.astype(int).tolist()
            recognized_students[
                match["student_id"]
            ] = match

    return list(recognized_students.values())