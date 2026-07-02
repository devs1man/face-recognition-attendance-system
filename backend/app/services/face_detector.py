import cv2
from insightface.app import FaceAnalysis

class FaceDetector:
    def __init__(self):
        self.app = FaceAnalysis(name = "buffalo_l")

        self.app.prepare(
            ctx_id=1,
            det_size=(640,640)
        )

    def detect_faces(self, frame):
        return self.app.get(frame)
