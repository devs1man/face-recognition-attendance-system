import numpy as np

from sqlalchemy.orm import Session
from app.models.face_embedding import FaceEmbedding

def cosine_similarity(vec1, vec2):

    vec1 = np.array(vec1)
    vec2 = np.array(vec2)

    numerator = np.dot(vec1,vec2)
    denominator = (
        np.linalg.norm(vec1)
        *
        np.linalg.norm(vec2)
    )
    if denominator == 0:
         return 0
         
    return numerator/denominator

def match_face(
        embedding,
        db:Session
):
    stored_embeddings = db.query(
        FaceEmbedding
    ).all()

    best_similarity = -1
    best_match = None
    THRESHOLD = 0.65

    for stored in stored_embeddings:
        similarity = cosine_similarity(
            embedding,
            stored.embedding
        )
        if similarity > best_similarity:
            best_similarity = similarity
            best_match = stored

    if best_similarity < THRESHOLD:
            return None
        
    return{
         "student_id":best_match.student.id,
         "student_name":best_match.student.name,
         "embedding_id":best_match.id,
         "similarity":float(best_similarity)
    }

