from fastapi import FastAPI
from server.routes.books import router as bookRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust to allow specific origins if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(bookRouter)

@app.get("/", tags=["Root"])# routes with same tags are grouped withiin a section in documentation
async def read_root():
    return {"message": "heloo"}