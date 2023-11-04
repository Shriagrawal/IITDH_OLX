import uvicorn
from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware, db
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import FastAPI,Depends
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session,sessionmaker,SessionLocal
from Models import User  # Replace with your actual module and User model import

app = FastAPI()

app.add_middleware(CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],)

# MongoDB connection URL
mongo_uri = "mongodb+srv://pawanmittal2002:abhi2811@cluster0.9vjktto.mongodb.net/"

# Create a MongoDB client
client = AsyncIOMotorClient(mongo_uri)

# Access a specific MongoDB database
database = client["IIT_DH_OLX"]


@app.get("/")
async def root():
    
    return {"message": "Hello World"}

@app.get("/users/")
def get_users(db: Session = Depends(User)):
    users = db.query(User).all()
    return users


@app.get("/users/{username}")
def get_user(username: str):
    db = SessionLocal()
    user = db.execute(select(User).where(User.username == username)).scalar()
    db.close()

    if user:
        return {"user_id": user.id, "username": user.username, "email": user.email}
    else:
        return {"message": "User not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)