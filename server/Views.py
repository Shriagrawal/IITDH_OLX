from fastapi import FastAPI,Depends
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session,sessionmaker,SessionLocal
from Models import User  # Replace with your actual module and User model import
from databases import Database


app = FastAPI()

@app.get("/users/")
def get_users(db: Session = Depends(User)):
    users = db.query(User).all()
    return users


@app.get("/users/{user_id}")
def get_user(username: str):
    db = SessionLocal()
    user = db.execute(select(User).where(User.username == username)).scalar()
    db.close()

    if user:
        return {"user_id": user.id, "username": user.username, "email": user.email}
    else:
        return {"message": "User not found"}

def hash_password(password: str):
    return pwd_context.hash(password)



