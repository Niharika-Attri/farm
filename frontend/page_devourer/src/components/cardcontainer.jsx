import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";
import Modal from "./modal";
import LoadingCard from "./loadingcard";
import Notification from "./notification";

function CardContainer() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/book/");
        console.log("get response", response);
        setBooks(response.data['data'][0]); 
        setSuccessMessage(response.data['message'])
      } catch (err) {
        console.log('error: ',err);
        console.log('errormessage',err['message']);
        setErrorMessage(err['message']);
        
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
    
        await axios.delete(`http://localhost:8000/book/delete?id=${id}`);
    
        setBooks(books.filter((book) => book.id !== id));
        setSuccessMessage(r)
        console.log("Book deleted successfully");
      } catch (err) {
        console.error("Error deleting the book:", err);
      } finally {
        handleCloseModal(); 
      }
  };

  return (
    <div className="w-full">
        {errorMessage && <Notification message={errorMessage} type="error" />}
        {successMessage && <Notification message={successMessage} type="success" />}
        {books.length > 0 ? (
  <div className="flex-grow place-items-center w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {books.map((book) => (
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
    ))}
  </div>
) : (
  <div className="w-full grid place-items-center sm:grid-cols-2 lg:grid-cols-3 gap-5">
    <LoadingCard />
    <LoadingCard />
    <LoadingCard />
    <LoadingCard />
  </div>
)}

        

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
