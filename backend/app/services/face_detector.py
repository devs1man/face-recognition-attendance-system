import cv2
from insightface.app import FaceAnalysis

app = FaceAnalysis(
    name="buffalo_l"
)

app.prepare(
    ctx_id=-1,
    det_size=(640, 640)
)

cap = cv2.VideoCapture(0)
if not cap.isOpened():
    raise Exception("Could not open camera")

while True:
    ret, frame = cap.read()

    if not ret:
        break

    cv2.imshow("Webcam", frame)
    
    key = cv2.waitKey(1)

    if key == ord("q"):
        break
cap.release()
cv2.destroyAllWindows()