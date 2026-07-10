import cv2
from app.database.database import SessionLocal

from app.services.recognition_service import recognize_frame
from app.services.attendance_service import mark_attendance
from app.services.session_service import start_session, end_session

db = SessionLocal()

session = start_session(db)
print(f"Attendance session started: {session.id}")

cap = cv2.VideoCapture(0)
if not cap.isOpened():
    raise Exception("Could not open camera")

while True:
    ret, frame = cap.read()

    if not ret:
        break

    recongnized_students = recognize_frame(
        frame,
        db,
    )

    for student in recongnized_students:
        result = mark_attendance(
            student["student_id"],
            session.id,
            student["similarity"],
            db,
        )
        x1,y1,x2,y2 = student["bbox"]

        cv2.rectangle(
            frame,
            (x1, y1),
            (x2, y2),
            (0, 255,0),
            2,
        )
        cv2.putText(
            frame,
            student["student_name"],
            (x1, y1-10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0,255,0),
            2,
        )
        cv2.putText(
            frame,
            result["message"],
            (x1, y2+20),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (255,255,0),
            2,
        )
        cv2.imshow(
            "Attendance Test",
            frame,
        )
        if cv2.waitKey(1) & 0xff == ord("q"):
            break
    end_session(
        session.id,
        db,
    )

    cap.release()
    db.close()
    cv2.destroyAllWindows()