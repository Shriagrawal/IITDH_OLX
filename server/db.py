from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi import Depends

# Define a SQLAlchemy engine
DATABASE_URL = "mongodb+srv://pawanmittal2002:abhi2811@cluster0.9vjktto.mongodb.net/"  # Replace with your database connection string
engine = create_engine(DATABASE_URL)

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Define a function to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
