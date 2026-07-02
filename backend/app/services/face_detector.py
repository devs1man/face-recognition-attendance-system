import cv2
from insightface.app import FaceAnalysis

app = FaceAnalysis(name="buffalo_l")

app.prepare(
    ctx_id=-1,
    det_size=(640, 640)
)

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    raise Exception("Could not open camera")


def draw_faces(frame, faces):

    for face in faces:

        bbox = face.bbox.astype(int)

        cv2.rectangle(
            frame,
            (bbox[0], bbox[1]),
            (bbox[2], bbox[3]),
            (255,0, 0),
            2
        )

        for point in face.landmark_2d_106:
            x = int(point[0])
            y = int(point[1])

            cv2.circle(
                frame,
                (x,y),
                1,
                (0,255,0),
                -1
            )
        confidence = face.det_score

        cv2.putText(
            frame,
            f"{confidence:.2f}",
            (bbox[0], bbox[1]-10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (255,0, 0),
            2)


while True:

    ret, frame = cap.read()

    if not ret:
        break

    faces = app.get(frame)

    draw_faces(frame, faces)

    cv2.imshow("Face Detector", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break


cap.release()
cv2.destroyAllWindows()