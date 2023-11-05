import uvicorn
from fastapi import FastAPI,HTTPException
# from fastapi_sqlalchemy import DBSessionMiddleware, db
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import FastAPI,Depends
# from sqlalchemy import create_engine, select
# from sqlalchemy.orm import session,sessionmaker
# from Models import User
from pymongo import MongoClient

# from Models import User  # Replace with your actual module and User model import



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection URL
mongo_uri = "mongodb+srv://pawanmittal2002:abhi2811@cluster0.9vjktto.mongodb.net/"

# Create a MongoDB client
client = MongoClient(mongo_uri)

# Access a specific MongoDB database
database = client["IIT_DH_OLX"]
# collection_name = ""

# if collection_name not in database.list_collection_names():
#     database.create_collection(collection_name)


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/users/")
def get_users():
    collection = database['users']
    users = collection.find()
    return users

@app.get("/items/")
def get_users():
    collection = database['products']
    users = collection.find()
    return users


@app.get("/users/{username}")
def get_user(username: str):
    collection = database['users']
    user = collection.find_one({"username": username})

    if user:
        return {"user_id": user.id, "username": user.username, "email": user.email}
    else:
        return {"message": "User not found"}


@app.post("/add_user")
async def add_user(new_user : dict):
    print(new_user)
    users_dict = new_user
    collection = database.get_collection('users')

    query = {"username": new_user["username"]}
    update = {"$set": new_user}
    result = collection.update_one(query, update, upsert=True)

    if result:
        return {"UPDATED SUCESSFULLY"}
    else:
        raise HTTPException(status_code=500, detail="Failed to insert item into the database")
    
    
@app.post("/add_item")
def add_item(new_item : dict):
    products_dict = new_item
    print(new_item)
    collection = database['products']
    print(collection)

    query = {"product_title": products_dict["product_title"]}
    update = {"$set": products_dict}
    result = collection.update_one(query, update, upsert=True)

    if(result):
        return {result}
    else:
        raise HTTPException(status_code=500, detail="Failed to insert item into the database")
    
    
@app.post("/add_merchandise")
def add_merchandise(new_item : dict):
    new_dict = new_item
    collection = database['merchandise']

    query = {"product_title": new_dict["product_title"]}
    update = {"$set": new_dict}
    result = collection.update_one(query, update, upsert=True)

    if result:
        return {"SUCCESSFULLY ADDED"}
    else:
        raise HTTPException(status_code=500, detail="Failed to insert item into the database")


# @app.post("/donations")
# def add_donations(item : dict):
#     new_dict = item
#     collection = database['donations']
#     result = collection.insert_one(new_dict)
#     if result:
#         return {"SUCCESSFULLY ADDED"}
#     else:
#         raise HTTPException(status_code=500, detail="Failed to insert item into the database")

@app.post("/add_alumni")
def add_alumni(item : dict):
    new_dict = item
    collection = database['alumni']
    
    query = {"username": new_dict["username"]}
    update = {"$set": new_dict}
    result = collection.update_one(query, update, upsert=True)
    if result:
        return {"SUCCESSFULLY ADDED"}
    else:
        raise HTTPException(status_code=500, detail="Failed to insert item into the database")
    

@app.post("/signup")
def signup(user : dict):
    new_user = user
    collection = database['users']

    query = {"username": new_user["username"]}
    update = {"$set": new_user}
    result = collection.update_one(query, update, upsert=True)
    if result:
        return {"SUCCESSFULLY ADDED"}
    else:
        raise HTTPException(status_code=500, detail="Failed to insert item into the database")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)