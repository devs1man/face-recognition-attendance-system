from pydantic import BaseModel

class StudentCreate(BaseModel):
    roll_number: str
    name: str
    department: str
    year: int
    email: str