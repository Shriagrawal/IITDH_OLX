from pymongo import MongoClient

# Create a MongoDB client and connect to your MongoDB server
client = MongoClient("mongodb+srv://pawanmittal2002:abhi2811@cluster0.9vjktto.mongodb.net/")  # Replace with your MongoDB connection details

# Access the MongoDB database
db = client["your_database_name"]  # Replace with the name of your MongoDB database

# Access the "users" collection within the database
users_collection = db["users"]

# Create some dummy user data
dummy_users = [
    {
        "username": "user1",
        "email": "user1@example.com",
        "phone_number": 1234567890,
        "password": "something",
        "batch": 2020,
        "branch": "ABC",
        "address": "IITDH",
        "image": "hehe",
    },
    {
        "username": "user2",
        "email": "user2@example.com",
        "phone_number": 9389040033,
        "password": "soso",
        "batch": 2024,
        "branch": "ABC",
        "address": "IITDH",
        "image": "hoho",
    },
    # Add more dummy users as needed
]

# Insert the dummy user data into the MongoDB collection
users_collection.insert_many(dummy_users)

# Close the MongoDB client
client.close()
