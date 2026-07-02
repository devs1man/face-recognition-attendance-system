import cv2
from sqlalchemy.orm import Session

from app.models.student import Student
from app.models.face_embedding import FaceEmbedding
from app.services.face_detector import FaceDetector

def capture_frames(face_analyzer):
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        raise Exception("Could not open camera")
    
    good_frames = []
    while len(good_frames) < 10:
        ret, frame = cap.read()

        if not ret:
            break

        faces = detector.detect_faces(frame)
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

        good_frames.append(frame)

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

def register_face(
        student_id :int,
        db
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
    good_frames = capture_frames(face_analyzer)

    return{
        "success":True,
        "student":student.name,
        "frames_captured" : len(good_frames),
        "message":"Frame capture completed successfully"
    }