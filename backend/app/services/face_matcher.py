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
    return numerator/denominator

def match_face(
        
)