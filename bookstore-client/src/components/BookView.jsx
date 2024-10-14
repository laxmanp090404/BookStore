import React from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addItem } from '../Slices/cartSlice';

axios.defaults.withCredentials = true;

function BookView({ book, selectedBook }) {
  if (!book) return null;
  
  const dispatch = useDispatch();

  const addToCart = async () => {
    try {
      const res = await axios.post(`/api/addtocart`, {
        bookId: book._id,
        quantity: 1
      });

      if (res.status === 200) {
        toast.success('Item added to cart successfully');
        dispatch(addItem({ id: book._id, quantity: 1, price: book.price }));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('You need to log in to add items to the cart');
      } else {
        toast.error('Error adding item to cart');
        console.error(error);
      }
    }
  };

  const { imageUrl, title, author, rating, price, language, description, reviews } = book;

  return (
    <>
      <Toaster />
      <div className="overall-container flex items-center justify-center min-h-screen px-4 md:px-6">
        <div className="card bg-[#d8e4f7] md:w-[120vh] md:h-[70vh] h-auto w-[30vh] my-10 flex md:flex-row flex-col rounded-2xl">
          <div className="leftcard md:w-[50%] w-full h-full bg-gray-100 rounded-t-2xl md:rounded-s-2xl">
            <div
              className="active:scale-105 hover:font-bold hover:-translate-x-2 duration-300 cursor-pointer mx-8 my-4"
              onClick={() => { selectedBook(null); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="md:w-8 md:h-8 w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </div>
            <div className="topbar flex m-8 mt-0 justify-between items-center">
              <div className="authorpart flex space-x-2 items-center text-gray-600">
                <UserIcon className="w-4 h-4 md:w-6 md:h-6 text-gray-400" />
                <p className="md:text-lg text-[10px]">{author}</p>
              </div>
              <div className="languagepart flex space-x-2 items-center text-gray-600">
                <GlobeIcon className="w-4 h-4 md:w-6 md:h-6 text-gray-500" />
                <p className="md:text-lg text-[10px]">{language}</p>
              </div>
            </div>
            <p className="bookname md:text-4xl text-xl font-bold mx-8">{title}</p>
            <p className="m-8 text-gray-500 md:line-clamp-4 sm:line-clamp-3 line-clamp-2 md:text-lg text-sm">{description}</p>
            <div className="reviewamntpart mx-8 flex justify-between font-bold text-xl">
              <div className="starrating flex space-x-4 items-center md:text-lg text-sm">
                <StarIcon className="md:w-6 md:h-6 w-4 h-4 fill-black text-black" />
                <div>{rating}</div>
                <div>({reviews})</div>
              </div>
              <div className="amount md:text-lg text-sm">₹{price}</div>
            </div>
            <button
              onClick={addToCart}
              className="bg-[#2460b9] px-4 py-4 m-8 text-white rounded-lg active:scale-90 duration-500 ease-out flex scale-80 md:scale-100"
            >
              <ShoppingCartIcon className="md:w-5 md:h-5 w-3 h-3 mr-2" />
              <div className="md:text-lg text-[10px]">Add to Cart</div>
            </button>
          </div>
          <div className="rigthcard md:w-[50%] w-full h-full bg-gradient-to-r from-bg-[#d8e4f7] to-orange-400 via-orange-300 rounded-b-2xl md:rounded-e-2xl flex justify-center items-center">
            <img src={imageUrl} className="rounded-xl w-[300px] h-[450px] scale-50 md:scale-100 sm:scale-75" alt={title} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BookView;

function GlobeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z" />
    </svg>
  );
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
