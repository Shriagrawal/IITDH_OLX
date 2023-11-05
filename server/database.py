import pymongo, json
from bson import ObjectId

def add_entry(json_data):
    # Connect to MongoDB
    client = pymongo.MongoClient('mongodb://localhost:27017')
    db = client['AutoReels_AI']
    collection = db['Projects']

    if collection not in db.list_collection_names():
        # Create the collection if it doesn't exist
        db.create_collection(collection)
        print(f"Collection :'{collection}' has been created.")

    # Add or update the JSON document in the collection
    query = {"name": json_data["name"]}
    update = {"$set": json_data}
    collection.update_one(query, update, upsert=True)

    # Close the MongoDB connection
    client.close()

def get_data(database):
    # Connect to MongoDB
    client = pymongo.MongoClient('mongodb://localhost:27017')
    db = client['AutoReels_AI']
    collection = db[database]

    # Add or update the JSON document in the collection
    data = collection.find()

    json_data = []
    # Custom JSON encoder class
    class JSONEncoder(json.JSONEncoder):
        def default(self, o):
            if isinstance(o, ObjectId):
                return str(o)
            return super().default(o)

    for document in data:
        # document = json.dumps(document, cls=JSONEncoder)
        json_data.append(document)
    # Close the MongoDB connection
    client.close()

    return json_data