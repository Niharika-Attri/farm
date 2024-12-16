from fastapi import APIRouter, Body, HTTPException
from fastapi.encoders import jsonable_encoder

from server.database import (
    add_book,
    get_all_books,
    get_book,
    get_book_bytitle,
    delete_book,
    update_book
)
from server.models.bookmodel import (
    ErrorResponseModel,
    ResponseModel,
    BookSchema,
    UpdateBookSchema,
)

router = APIRouter(
    prefix="/book",
    tags=["Books"]
)


@router.get('/', response_description="Books retrieved")
async def get_books():
    try:
        books = await get_all_books()
        if books:
            return ResponseModel(books, "All books retrieved successfully")
        return ResponseModel(books, "Empty list recieved")
    except Exception as e:
        raise HTTPException(status_code=500, detail= f"An error occured retrieving the data: {e}")
    

@router.get("/{id}", response_description="Specific book data retrieved")
async def get_single_book(id: str):
    try: 
        book = await get_book(id)
        if book:
            return ResponseModel(book, "Bood data retrieved successfully")
        return ErrorResponseModel("error retriving the book", 404, "Book doesn't exist")
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"an error occured retrieving the book data: {e}")
    
@router.post("/add", response_description= "book data added to the database")
async def add_new_book(book: BookSchema = Body(...)):
    try:
        book_data = jsonable_encoder(book)
        print(book_data)
        existing_book = await get_book_bytitle(book_data['title'])
        print(existing_book)
        if existing_book:
            return ErrorResponseModel("an error occured adding the book", 409, "Book already exists.")
        new_book = await add_book(book_data)
        return ResponseModel(new_book, "Book added to the database successfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occured adding the book to database: {e}")
    
@router.delete("/delete", response_description="Document deleted")
async def delete_by_id(id: str):
    try:
        deleted_book = await delete_book(id)
        if deleted_book:
            return ResponseModel(deleted_book, "Book deleted successfully")
        raise HTTPException(status_code=404, detail= f"Book not found  for deletion")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting the book data: {e}")
    
@router.put("/update", response_description="Document updated")
async def update_by_id(id: str, book: UpdateBookSchema = Body(...)):
    try:
        book_data = jsonable_encoder(book, exclude_unset=True)
        if "_id" in book:
            book["_id"] = str(book["_id"])  
        book_data = {key: value for key, value in book_data.items() if key != "_id"}
        updated_book = await update_book(id, book_data)
        if updated_book:
            return ResponseModel(updated_book, "Book updated successfully")
        raise HTTPException(status_code=404, detail="Book data not found for updation")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating the document: {e}")