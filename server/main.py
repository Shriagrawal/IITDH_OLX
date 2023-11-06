import uvicorn
from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import json  
from bson import json_util
import requests


def get_info(linkdinurl):
    api_endpoint = 'https://nubela.co/proxycurl/api/v2/linkedin'
    linkedin_profile_url = linkdinurl
    api_key = 'wJlWzaWQf-t8nxUzdYT-UA'
    headers = {'Authorization': 'Bearer ' + api_key}

    response = requests.get(api_endpoint,
                            params={'url': linkedin_profile_url,'skills': 'include'},
                            headers=headers)
    profile_data = response.json()
    return profile_data
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
database = client["IIT_DH_OLX"]

@app.get("/")
async def root():
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
    user = collection.find_one({"name": name})

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

@app.get("/events/")
def get_merchandises():
    collection = database['events']
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
        raise HTTPException(status_code=500, detail="Failed to insert item into the database")
    
    
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
        raise HTTPException(status_code=500, detail="Failed to insert item into the database")
    
    
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
        raise HTTPException(status_code=500, detail="Failed to insert item into the database")

@app.post("/add_events")
def add_events(new_item : dict):
    new_dict = new_item
    collection = database.get_collection('events')

    query = {"title": new_dict["title"]}
    update = {"$set": new_dict}
    result = collection.update_one(query, update, upsert=True)

    if result:
        return "SUCCESSFULLY ADDED"
    else:
        raise HTTPException(status_code=500, detail="Failed to insert item into the database")
    

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
    
    query = {"name": new_dict["name"]}
    update = {"$set": new_dict}
    result = collection.update_one(query, update, upsert=True)
    if result:
        return {"SUCCESSFULLY ADDED"}
    else:
        raise HTTPException(status_code=500, detail="Failed to insert item into the database")
    

@app.post("/signup")
def signup(user : dict):
    print("*"*10)
    new_user = user
    collection = database['users']
    # profile_data=get_info(user['linkdinurl'])
    # new_user.heading=profile_data['headline']
    # new_user.experiences=profile_data['experiences']
    # new_user.profile_data=profile_data
    print(new_user['name'],new_user)
    query = {"name": new_user["name"]}
    update = {"$set": new_user}
    print(collection)
    result = collection.update_one(query, update, upsert=True)
    if result.acknowledged:
        # Document updated successfully, fetch the updated document
        results = collection.find_one({'email': user['email']})
        print(new_user['name'], results)
        return json.dumps(results, default=str)
    else:
        raise HTTPException(status_code=500, detail="Failed to insert item into the database")
    
@app.post("/signin")
def signin(user : dict):
    collection = database['users']
    user = collection.find_one({"email": user['email'], "password": user['password']},{"_id": 0})

    if user:
        return user
    else:
        raise HTTPException(status_code=500, detail="User doesnt exists")
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)