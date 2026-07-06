import cv2

from app.database.database import SessionLocal
from app.services.recognition_service import recognize_frame

db = SessionLocal()

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    raise Exception("Could not open camera")

while True:
    ret, frame = cap.read()

    if not ret:
        break

    recognized_frames = recognize_frame(
        frame,
        db
    )

    for student in recognized_frames:
        bbox = student["bbox"]
        x1, y1, x2, y2 = bbox
        
        cv2.rectangle(
            frame,
            (x1, y1),
            (x2, y2),
            (0, 255, 0),
            2
        )

        cv2.putText(
            frame,
            student["student_name"],
            (x1, y1-10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0,255,0),
            2
        )

        cv2.putText(
            frame,
            f'{student["similarity"]:.2f}',
            (x1, y2+20),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0,255,0),
            2
        )

    cv2.imshow(
        "Recognition Test",
        frame
    )

    if cv2.waitKey(1) & 0xff == ord("q"):
        break
    
cap.release()
db.close()
cv2.destroyAllWindows()