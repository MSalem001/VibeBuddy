from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from uuid import UUID, uuid4


class test_user_in(BaseModel):
    name: str
    age: int
    is_adult: bool


class test_user_out(test_user_in):
    id: UUID


class user_response(BaseModel):
    msg: str
    users: list[test_user_out]


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


user_table = []


@app.get("/")
async def greetings():
    return {"msg": "Hello, World."}


@app.post("/user", response_model=test_user_out, status_code=201)
async def create_user(user: test_user_in):
    new_user = {**user.model_dump(), "id": uuid4()}
    user_table.append(new_user)
    return new_user


@app.get("/user", response_model=user_response)
def get_all_users():
    return {"msg": "success", "users": user_table}


@app.get("/user/{user_id}", response_model=test_user_out)
def get_user_by_id(user_id: UUID):
    user = [user for user in user_table if user.get("id") == user_id]
    if user:
        return user[0]
    else:
        raise HTTPException(detail="User not found.", status_code=404)
