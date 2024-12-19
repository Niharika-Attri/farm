import os
from dotenv import load_dotenv
from bson.objectid import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

try:
    client = AsyncIOMotorClient(os.getenv("MONGO_URI"))
    client.server_info() #raises exception if connection fails
    
    print("Connection to the database established")

    database = client.books
    collection = database.get_collection("book_collection")

except Exception as e:
    print("Error connecting to the database", e)

def book_helper(book) -> dict:
    return {
        "id": str(book["_id"]),
        "title": book["title"],
        "author": book["author"],
        "description": book["description"],
        "genre": book["genre"],
        "total_copies": book["total_copies"],
        "available_copies": book["available_copies"]
    }

async def get_all_books():
    books = []
    async for book in collection.find():
        books.append(book_helper(book))
    return books

async def get_book(id: str) -> dict:
    book = await collection.find_one({"_id": ObjectId(id)})
    return book_helper(book)

async def add_book(book_data: dict) -> dict:
    book = await collection.insert_one(book_data)
    new_book = await collection.find_one({"_id": book.inserted_id})
    return book_helper(new_book)

async def get_book_bytitle(title: str) -> dict:
    book = await collection.find_one({"title": title})
    if book:
        return book_helper(book)  
    return None

async def delete_book(id: str) -> dict:
    deleted_book = await collection.find_one_and_delete({"_id": ObjectId(id)})
    return book_helper(deleted_book)

async def update_book(id: str, book_data: dict) -> dict: 
    updated_book = await collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": book_data},  
        return_document=True
    )
    if updated_book:
        return book_helper(updated_book)  