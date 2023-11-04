import uvicorn
from fastapi_sqlalchemy import DBSessionMiddleware, db
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import FastAPI, WebSocket
from typing import List
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from datetime import datetime
import json
import requests
from bs4 import BeautifulSoup
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



app = FastAPI()
@app.get("/")
async def root():
    # If database doesn't exist, create it
    return {"message": "Hello World"}


class ConnectionManager:

    def __init__(self) -> None:
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()

# define endpoint



def scrape_linkedin_profile(linkedin_url):
    response = requests.get(linkedin_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        profile_name = soup.find('h1', class_='pv-top-card-section__name').get_text()
        return profile_name
    else:
        return None

@app.get("/scrape-linkedin/")
def scrape_linkedin(linkedin_url: str):
    profile_data = scrape_linkedin_profile(linkedin_url)
    return {"profile_name": profile_data}


@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket)
    now = datetime.now()
    current_time = now.strftime("%H:%M")
    try:
        while True:
            data = await websocket.receive_text()
            # await manager.send_personal_message(f"You wrote: {data}", websocket)
            message = {"time":current_time,"clientId":client_id,"message":data}
            await manager.broadcast(json.dumps(message))
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        message = {"time":current_time,"clientId":client_id,"message":"Offline"}
        await manager.broadcast(json.dumps(message))

