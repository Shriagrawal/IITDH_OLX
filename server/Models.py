from sqlalchemy import Column, Integer, String, ARRAY, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from passlib.context import CryptContext
from datetime import datetime


Base = declarative_base()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = "users"

    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, index=True)
    phone_number = Column(Integer)
    batch = Column(Integer)
    branch = Column(String)
    address = Column(String)
    image = Column(String)

    # Define a relationship with the "Product" model
    products = relationship("Product", back_populates="seller")


class Product(Base):
    __tablename__ = "products"

    product_title = Column(String)
    product_description = Column(String)
    product_price = Column(Integer)
    product_image = Column(String)
    product_condition = Column(String)
    product_status = Column(String)

    # Define the seller_id as a foreign key referencing the id in the User model
    seller_id = Column(String, ForeignKey("users.id"))
    buyer_id = Column(String, ForeignKey("users.id"))

    # Create a relationship with the "User" model to access seller information
    seller = relationship("User", back_populates="products")
    buyer = relationship("User", foreign_keys=[buyer_id], back_populates="products_bought")

class Room(Base):
    __tablename__ = "room"

    members = Column(ARRAY(String))
    messages = Column(ARRAY(String))
    created_at = Column(DateTime, default=datetime.now)
    unseen_message = Column(Integer, default=0)
    sender_id = Column(String)
    receiver_id = Column(String)
    sent_at = Column(DateTime)
    message_type = Column(String) 
    # Define a relationship with the User model for sender and receiver information
    sender = relationship("User", foreign_keys=[sender_id])
    receiver = relationship("User", foreign_keys=[receiver_id])

