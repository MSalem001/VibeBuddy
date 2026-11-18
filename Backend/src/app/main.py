from fastapi import FastAPI

app = FastAPI(title="VibeBuddy app")


@app.get("/")
async def greetings():
    return "Hello, World."
