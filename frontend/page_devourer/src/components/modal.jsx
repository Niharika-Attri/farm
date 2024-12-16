import React from "react";

function Modal({ book, onClose, onUpdate, onDelete }) {
  if (!book) return null;

  const handleUpdate = () => {
    onUpdate(book.id);
  };

  const handleDelete = () => {
    onDelete(book.id);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-dark bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl w-96 shadow-lg">
        <h3 className="font-bold text-xl">{book.title}</h3>
        <p className="text-textcolour">{book.author}</p>
        <p className=" mt-2">{book.description}</p>
        <ul className="flex flex-wrap gap-2 mt-2">
          {book.genre.map((genre, index) => (
            <li key={index} className="bg-purple text-white text-xs rounded-full px-3 py-1">
              {genre}
            </li>
          ))}
        </ul>
        <div className="mt-4 text-xs text-gray-600">
          <p>Total Copies: {book.total_copies}</p>
          <p>Available Copies: {book.available_copies}</p>
        </div>

        <div className="mt-4 flex justify-between">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-md">
            Close
          </button>
          <div className="flex gap-2">
            <button onClick={handleUpdate} className="bg-darkpurple text-dark px-4 py-2 rounded-full" >
              Update
            </button>
            <button onClick={handleDelete} className="bg-orange text-white px-4 py-2 rounded-full">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
