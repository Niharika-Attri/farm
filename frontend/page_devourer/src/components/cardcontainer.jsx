import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";
import Modal from "./modal";

function CardContainer() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/book/");
        console.log("get response", response);
        setBooks(response.data['data'][0]); 
      } catch (err) {
        console.log("Error in get", err);
      }
    };

    fetchBooks();
  }, []); 

  const handleCardClick = (book) => {
    setSelectedBook(book); 
  };

  const handleCloseModal = () => {
    setSelectedBook(null); 
  };

  const handleUpdate = (id) => {
    console.log("Updating book with id:", id);
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    try {
        console.log("Deleting book with id:", id);
    
        // Call backend API to delete the book
        await axios.delete(`http://localhost:8000/book/delete?id=${id}`);
    
        // Update the UI by filtering out the deleted book
        setBooks(books.filter((book) => book.id !== id));
        console.log("Book deleted successfully");
      } catch (err) {
        console.error("Error deleting the book:", err);
      } finally {
        handleCloseModal(); // Close the modal after the operation
      }
  };

  return (
    <div>
        <div className="flex-grow w-full pl-12 pr-12 grid grid-cols-3 gap-4">
            {books.length > 0 ? (
                books.map((book) => (
                <div key={book.id} onClick={() => handleCardClick(book)}>
                    <Card
                      title={book.title}
                      author={book.author}
                      description={book.description}
                      genre={book.genre}
                      total_copies={book.total_copies}
                      available_copies={book.available_copies}
                    />
                  </div>
                ))
            ) : (
                <p>Loading books...</p> 
            )}
        </div>

        <Modal
        book={selectedBook}
        onClose={handleCloseModal}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
    

    
  );
}

export default CardContainer;
