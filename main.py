from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from generator import generate_dockerfile
from validator import validate_dockerfile

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class GenRequest(BaseModel):
    language: str
    framework: str = ""


@app.post("/generate")
def generate(req: GenRequest):
    dockerfile = generate_dockerfile(req.language, req.framework)
    lint_output = validate_dockerfile(dockerfile)

    return {"dockerfile": dockerfile, "lint": lint_output}