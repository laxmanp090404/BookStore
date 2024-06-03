import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import BookView from './BookView';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../common/Loader';

const Body = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const bookViewRef = useRef(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
<<<<<<< HEAD
        const fetchedData = await axios.get(import.meta.env.VITE_SERVER+`/api/getbooks`);
=======
        const fetchedData = await axios.get(`/api/getbooks`);
>>>>>>> e0107b6 (Solved CORS Errors and Routing Errors)
        setBooks(fetchedData.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw error; // Throw the error to be caught by toast.promise
      }
    };

    // Create the promise and pass it to toast.promise
    const myPromise = fetchBooks();

    toast.promise(myPromise, {
      loading: 'Loading.....',
      success: 'Fetched Books! Start Exploring!!',
      error: (err) => `Error: ${err.message}` // Use the error message from the caught error
    });
  }, []);

  useEffect(() => {
    if (selectedBook) {
      bookViewRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedBook]);

  return (
    <>
      <Toaster />
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen">
          <div className={selectedBook != null ? "relative opacity-10 cards flex flex-wrap max-w-8xl mx-auto my-[2%] gap-10 justify-center" : "relative cards flex flex-wrap   mx-auto my-[2%] gap-10 justify-center"}>
            {books.map((book) => (
              <div key={book._id}>
                <BookCard
                  book={book}
                  bookId = {book._id}
                  isSelected={selectedBook === book._id}
                  onView={() => setSelectedBook(selectedBook === book._id ? null : book._id)}
                />
              </div>
            ))}
          </div>
          {selectedBook && (
            <div ref={bookViewRef} className='absolute top-[1vh] flex items-center justify-center md:left-[40vh] left-[7vh]'>
              <BookView book={books.find((book) => book._id === selectedBook)} selectedBook={(res) => { setSelectedBook(res) }} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Body;
