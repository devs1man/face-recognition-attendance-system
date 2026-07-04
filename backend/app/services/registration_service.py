import cv2
from sqlalchemy.orm import Session

from app.models.student import Student
from app.services.ai_manager import face_detector
from app.services.face_embedder import FaceEmbedder
from app.models.face_embedding import FaceEmbedding

embedder = FaceEmbedder()

def capture_frames():
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        raise Exception("Could not open camera")
    
    good_frames = []
    while len(good_frames) < 10:
        ret, frame = cap.read()

        if not ret:
            break

        faces = face_detector.detect_faces(frame)

        if len(faces)!=1:

            cv2.putText(
                frame,
                "Exactly one face required",
                (20,40),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.8,
                (0,0,255),
                2,
            )
            cv2.imshow("Face registration", frame)

        
            if cv2.waitKey(1) & 0xFF == ord("q"):
                break
            continue

        good_frames.append(frame.copy())

        cv2.putText(
            frame,
            f"Captured: {len(good_frames)}/10",
            (20,40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0,255,0),
            2
        )
        cv2.imshow("Face Registration",frame)

        if cv2.waitKey(1) & 0xff == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()
    return good_frames

def save_embeddings(
        student: Student,
        embeddings,
        db:Session
):
    for embedding in embeddings:
        face_embedding = FaceEmbedding(
            student_id = student.id,
            embedding = embedding.tolist(),
            model_name = "buffalo_l",
            embedding_dimension = len(embedding)
        )
        db.add(face_embedding)

    db.commit()

    
def register_face(
        student_id :int,
        db:Session,
):
    student = (
        db.query(Student)
        .filter(Student.id == student_id)
        .first()
    )

    if student is None:
        return{
            "success":False,
            "message":"Student not found"
        }
    good_frames = capture_frames()

    embeddings = []

    for frame in good_frames:
        embedding = embedder.get_embedding(frame)

        if embedding is not None:
            embeddings.append(embedding)

    return{
        "success":True,
        "student":student.name,
        "frames_captured" : len(good_frames),
        "embeddings_generated":len(embeddings),
        "message":"Frame capture completed successfully"
    }