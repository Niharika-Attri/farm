from typing import Optional
from pydantic import BaseModel, Field

class BookSchema(BaseModel):
    title: str = Field(...)
    author: str = Field(...)
    description: Optional[str]
    genre: list[str]
    total_copies: int = Field(...)
    available_copies: int = Field(...)

    class Config:
        json_schema_extra = {
            "example":{
                "title":"Jane Eyre",
                "author":"Charolette Bronte",
                "description":"Jane Eyre is a Bildungsroman, or a coming-of-age story, in which the protagonist's aspirations are set against the pressures and expectations of society.",
                "genre":["Social Critism","Novel","Bildungsroman"],
                "total_copies": 10,
                "available_copies": 8
            }
        }

class UpdateBookSchema(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    description: Optional[str] = None
    genre: Optional[list[str]] = None
    total_copies: Optional[int] = None
    available_copies: Optional[int] = None

    class Config:
        json_schema_extra = {
            "example" :{
                "title":"Kafka on the shore",
                "author":"Haruki Murakami",
                "description":"Murakami describes the “shore” in Kafka on the Shore as the border between the conscious and the unconscious minds.",
                "genre":["Magical Realism","Novel","Fantasy Fiction"],
                "total_copies": 11,
                "available_copies": 4
            }
        }

def ResponseModel(data, message):
    return{
        "data": [data],
        "statuscode": 200,
        "message": message
    }

def ErrorResponseModel(error, code, message):
    return{
        "error": error,
        "statuscode": code,
        "message": message
    }