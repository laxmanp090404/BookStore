import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BookCard from './BookCard';
import BookView from './BookView';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../common/Loader';
import { NoResult } from '../common/NoResult';
import { useDispatch, useSelector } from 'react-redux';
import { addBooks, removeSingleBook } from '../Slices/bookSlice';

const Body = () => {
  const [books, setBooks] = useState([]);
  const [searchtext, setSearchText] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const bookViewRef = useRef(null);
  const dispatch = useDispatch();
  const userdetails = useSelector(store => store.user?.details);
  const role = userdetails?.roles?.[0]
  const nav = useNavigate();

  const fetchBooks = async () => {
    try {
      const fetchedData = await axios.get(`/api/getbooks`);
      setBooks(fetchedData.data);
      dispatch(addBooks(fetchedData.data))
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  const handleDelete = async(id)=>{
    try {
      const res = await axios.delete("/api/removeBook/"+id);
    if(res.status == 200){
      toast.success(res.data.message);
      dispatch(removeSingleBook(id));
      fetchBooks();
    }else{
      toast.error("Unable to delete due to ",res.data.message)
    }
    } catch (error) {
      toast.error(error.response.data.message)
      console.error(error.response.data);
    }
  }

  const handleEdit = (id)=>{
    console.log("edit",id);
    nav("/editbook/"+id);
  }
  useEffect(() => {
    


    const myPromise = fetchBooks();

    toast.promise(myPromise, {
      loading: 'Loading.....',
      success: 'Fetched Books! Start Exploring!!',
      error: (err) => `Error: ${err.message}`
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
        role == "admin" ? (
          <div className='min-h-screen flex  md:flex-row flex-col  flex-wrap gap-10 m-10 mx-20'>
            {
              books.map((book) => (
               
                <div key={book._id}>
                  <div className='card  py-5 relative w-[300px] h-[300px] flex flex-col rounded-xl shadow-lg hover:shadow-xl hover:scale-105 duration-300 ease-in-out'>
                    <div className='mx-10 my-3 flex flex-col gap-4'>
                      <p className='text-2xl font-extrabold'>{book.title}</p>
                      <p className='font-bold text-gray-600'>{book.author}</p>
                      <p className='line-clamp-3 w-[200px]'>{book.description}</p>
                    </div>
                    <div className='flex mx-[100px] absolute gap-10  bottom-7 right-3'>
                      <button onClick={()=>{handleEdit(book._id)}} className='active:scale-110 duration-300'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
  </button>
                      <button onClick={()=>{handleDelete(book._id)}} className='active:scale-110 duration-300'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
</button>
                      </div>
                  </div>

                </div>
              ))
            }
          </div>
        ) : (
          <div className="min-h-screen flex flex-col items-center">
            <div className='searchbar  flex bg-[#deebff]   items-center justify-between border-2 border-transparent focus-within:border-[#041438] focus-within:bg-white p-4 rounded-full w-[50%] duration-500 ease-linear '>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 mr-5 text-[white] bg-[#3a65c9] rounded-full p-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>

              <input type='text' className='outline-none placeholder:text-[#3a65c9] flex-grow bg-inherit' maxLength={60} required placeholder='Try Searching.......' onChange={(e) => { setSearchText(e.target.value) }} />
            </div>
            <div className={selectedBook != null ? "relative opacity-10 cards flex flex-wrap max-w-8xl mx-auto my-[2%] gap-10 justify-center" : "relative cards flex flex-wrap   mx-auto my-[2%] gap-10 justify-center"}>

              {

                books.filter((book) => book.title.toLowerCase().includes(searchtext.toLowerCase())).length === 0 ? (
                  <div className='flex flex-col'>
                    <NoResult />
                    <h2 className="text-4xl font-bold tracking-tight text-[#060740]">No results found</h2>
                    <p className="text-gray-600">We couldn't find what you searched for.</p>
                    <button className="mt-4" variant="secondary">
                      Try searching again
                    </button>
                  </div>


                ) : (
                  books.filter((book) => book.title.toLowerCase().includes(searchtext.toLowerCase())).map((book) => (
                    <div key={book._id}>
                      <BookCard
                        book={book}
                        bookId={book._id}
                        isSelected={selectedBook === book._id}
                        onView={() => setSelectedBook(selectedBook === book._id ? null : book._id)}
                      />
                    </div>
                  ))

                )
              }


            </div>
            {selectedBook && (
              <div ref={bookViewRef} className='absolute top-[1vh] flex items-center justify-center md:left-[40vh] left-[7vh]'>
                <BookView book={books.find((book) => book._id === selectedBook)} selectedBook={(res) => { setSelectedBook(res) }} />
              </div>
            )}
          </div>
        )
      )}
    </>
  );
};

export default Body;
