from app.services.ai_manager import face_detector

class FaceEmbedder:
    def get_embedding(self, face):
        faces = face_detector.detect_faces(face)

        if len(faces)!=1:
            return None
        
        return faces[0].embedding