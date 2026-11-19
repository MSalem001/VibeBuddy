from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from uuid import UUID, uuid4


class test_user_in(BaseModel):
    name: str
    age: int
    is_adult: bool


class test_user_out(test_user_in):
    id: UUID


app = FastAPI(title="VibeBuddy app")
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def greetings():
    return {"msg":"Hello, World."}


@app.post("/user", response_model=test_user_out, status_code=201)
async def create_user(user: test_user_in):
    return {**user.model_dump(), "id": uuid4()}
