import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import plusIcon from '../assets/plus.svg';
import  axios  from "axios";

function AddBar(){    
    const[isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [errorResponse, setErrorResponse] = useState('')
    const [successResponse, setSuccessResponse] = useState('')

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        genre: [],
        total_copies: '',
        available_copies: ''
      });

      const handleChange = (e) => {
        const { name, value } = e.target;

        if(name == 'genre'){
            setFormData(prevData => ({
                ...prevData,
                genre : value
              }));
        }
        else{
            setFormData(prevData => ({
                ...prevData,
                [name]: value
              }));
        }
        
      };

      const handleSelectChange = (selectedOptions) => {
        const genreValues = selectedOptions.map(option => option.value);
      
        setFormData(prevData => ({
          ...prevData,
          genre: genreValues
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log();
        const jsonData = JSON.stringify(formData);
        console.log(jsonData);
        
        try{
            const response = await axios.post('http://localhost:8000/book/add', formData);
            console.log('response: ', response);

            if (response.data.statuscode === 200) {
                console.log("Book added successfully:", response.data.message);
                setSuccessResponse(response.data.message)
                
                // Reset the form after successful submission
                setFormData({
                    title: '',
                    author: '',
                    description: '',
                    genre: [],
                    total_copies: '',
                    available_copies: ''
                });
                alert("Book added successfully!");
            }else{
                console.log('an error occured ', response.data.message);
                setErrorResponse(response.data.message)
            }
        }catch (error) {
            console.error("Error adding book:", error);
            alert("Failed to add book!");
        }

      };

    const genres = [
        { value: "fiction", label: "Fiction" },
        { value: "nonFiction", label: "Non-Fiction" },
        { value: "poetry", label: "Poetry" },
        { value: "graphicNovels", label: "Graphic Novels/Comics" },
        { value: "youngAdult", label: "Young Adult (YA)" },
        { value: "childrensLiterature", label: "Children's Literature" },
        { value: "classics", label: "Classics" },
        { value: "shortStories", label: "Short Stories/Anthologies" },
        { value: "magicalRealism", label: "Magical Realism" },
        { value: "western", label: "Western" },
        { value: "humor", label: "Humor" },
        { value: "novel", label: "Novel" },
        { value: "novella", label: "Novella" }
      ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const handleClickOutside = (Event) =>{
            if (dropdownRef.current && !dropdownRef.current.contains(Event.target)) {
                setIsOpen(false);
              }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    return(
        <div className="flex relative w-full mt-4 h-11 bg-white rounded-full mb-4" ref={dropdownRef}>
            <input className="flex w-full bg-white rounded-full focus:outline-none pl-6" onClick={toggleDropdown}/>

            {isOpen && (
                <div className="absolute top-12 left-0 w-full bg-white shadow-md rounded-md p-4 z-10">
                <form id="submitForm" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-2">
                            <label className="block text-gray-700 mb-1">Title:</label>
                            <input
                                required
                                type="text"
                                name="title"
                                placeholder="Enter book title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 mb-1">Author:</label>
                            <input
                                required
                                type="text"
                                name="author"
                                placeholder="Enter Author's name"
                                value={formData.author}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 mb-1">Description:</label>
                            <input
                                required
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter book description"
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 mb-1">Genre:</label>
                            <Select
                                required
                                id="options"
                                name="genre"
                                options={genres}
                                isMulti
                                className="basic-select overflow- "
                                classNamePrefix="select"
                                styles={{
                                    valueContainer: (provided) => ({
                                        ...provided,
                                        maxHeight: '38px',   
                                        overflowY: 'auto',   
                                      }),
                                }}
                                value={genres.filter(option => formData.genre.includes(option.value))}
                                onChange={handleSelectChange}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 mb-1">Total copies:</label>
                            <input
                            type="number"
                            name="total_copies"
                            placeholder="Enter total copies"
                            value={formData.total_copies}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div> 
                        <div className="mb-2">
                            <label className="block text-gray-700 mb-1">Available copies:</label>
                            <input
                            type="number"
                            name="available_copies"
                            value={formData.available_copies}
                            onChange={handleChange}
                            placeholder="Enter available copies"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div> 
                        
                    </div>
                  
                </form>
              </div>
            )}
            <button className="relative w-1/7 bg-orange rounded-full overflow-hidden"
                name="submitbutton"
                form="submitForm"
                type="submit"
            
            >
                <div     className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center justify-center bg-white w-8 h-8 rounded-full shadow-md" style={{ left: "5px" }}>
                    <img src={plusIcon} alt="plus icon"/>
                </div>
            </button>
        </div>
        
    )
}

export default AddBar