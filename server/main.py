import uvicorn
from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware, db
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import json  
import requests

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


@app.get("/")
async def root():
    # If database doesn't exist, create it
    return {"message": "Hello World"}

@app.get("/users/")
def get_users():
    collection = database['users']
    users = collection.find({},{"_id":0})
    json_data = []
    for document in users:
        # document = json.dumps(document, cls=JSONEncoder)
        json_data.append(document)
    return json_data


@app.get("/users/{username}")
def get_user(username: str):
    collection = database['users']
    user = collection.find_one({"name": username})

    if user:
        return user
    else:
        return {"message": "User not found"}

@app.get("/items/")
def get_items():
    collection = database['products']
    users = collection.find({},{"_id":0})
    json_data = []
    for document in users:
        # document = json.dumps(document, cls=JSONEncoder)
        json_data.append(document)
    return json_data

@app.get("/merchandise/")
def get_merchandises():
    collection = database['merchandise']
    users = collection.find({},{"_id":0})
    json_data = []
    for document in users:
        # document = json.dumps(document, cls=JSONEncoder)
        json_data.append(document)
    print(json_data)
    return json_data

@app.get("/event_donations/")
def get_merchandises():
    collection = database['events']
    users = collection.find({},{"_id":0})
    json_data = []
    for document in users:
        # document = json.dumps(document, cls=JSONEncoder)
        json_data.append(document)
    print(json_data)
    return json_data

@app.get("/blogs/")
def get_merchandises():
    collection = database['blogs']
    users = collection.find({},{"_id":0})
    json_data = []
    for document in users:
        # document = json.dumps(document, cls=JSONEncoder)
        json_data.append(document)
    print(json_data)
    return json_data

@app.post("/add_user")
async def add_user(new_user : dict):
    print(new_user)
    users_dict = new_user
    collection = database.get_collection('users')

    query = {"name": new_user["name"]}
    update = {"$set": new_user}
    result = collection.update_one(query, update, upsert=True)

    if result:
        return "UPDATED SUCESSFULLY"
    else:
        return {"message": "Failed"}
    
    
@app.post("/add_item")
def add_item(new_item : dict):
    products_dict = new_item
    print(new_item)
    collection = database.get_collection('products')
    print(collection)

    query = {"product_title": products_dict["product_title"]}
    update = {"$set": products_dict}
    result = collection.update_one(query, update, upsert=True)

    # print(result)
    if(result):
        return "OK"
    else:
        {"message": "Failed"}
    
    
@app.post("/add_merchandise")
def add_merchandise(new_item : dict):
    new_dict = new_item
    collection = database.get_collection('merchandise')

    query = {"product_title": new_dict["product_title"]}
    update = {"$set": new_dict}
    result = collection.update_one(query, update, upsert=True)

    if result:
        return "SUCCESSFULLY ADDED"
    else:
        return {"message": "Failed"}

@app.post("/add_blogs")
def add_blogs(new_item : dict):
    new_dict = new_item
    collection = database.get_collection('blogs')

    query = {"title": new_dict["title"]}
    update = {"$set": new_dict}
    result = collection.update_one(query, update, upsert=True)

    if result:
        return "SUCCESSFULLY ADDED"
    else:
        return {"message": "Failed"}
    
@app.post("/add_event_donations")
def add_donations(item : dict):
    new_dict = item
    collection = database['events']

    query = {"title": new_dict["title"]}
    update = {"$set": new_dict}
    result = collection.update_one(query, update, upsert=True)

    if result:
        return {"SUCCESSFULLY ADDED"}
    else:
        raise {"message": "Failed"}

@app.post("/add_alumni")
def add_alumni(item : dict):
    new_dict = item
    collection = database['alumni']
    
    query = {"name": new_dict["name"]}
    update = {"$set": new_dict}
    result = collection.update_one(query, update, upsert=True)
    if result:
        return {"SUCCESSFULLY ADDED"}
    else:
        return {"message": "Failed"}
    

@app.post("/signup")
def signup(user : dict):
    new_user = user
    collection = database['users']
    # profile_data=user['linkedinurl']
    # new_user.heading=profile_data['headline']
    # new_user.experiences=profile_data['experiences']
    # new_user.profile_data=profile_data
    # print(new_user['name'],new_user)
    query = {"username": new_user["username"]}
    update = {"$set": new_user}
    # print(collection)
    result = collection.update_one(query, update, upsert=True)
    if result:
        return "OK"
    else:
        return {"message": "Failed"}
    
@app.post("/signin")
def signin(user : dict):
    collection = database['users']
    user = collection.find_one({"email": user['email'], "password": user['password']},{"_id": 0})

    if user:
        return user
    else:
        return {"message": "Failed"}
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)