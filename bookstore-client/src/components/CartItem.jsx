import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../Slices/cartSlice';

const CartItem = ({ details, quantity, setPrice }) => {
  const { _id, title, imageUrl, author, price } = details;
  const [quantvar, setQuantVar] = useState(quantity);
  const dispatch = useDispatch();

  const removeItemFromCart = async () => {
    try {
      if (quantvar > 0) {
        const res = await axios.delete(`/api/removeitem/${_id}`);
        if (res.status === 200) {
          dispatch(removeItem(_id));
          setQuantVar(prevQuant => prevQuant - 1);
          setPrice(prevPrice => prevPrice - price);
          toast.success('Item removed from cart successfully');
        } else {
          toast.error("Item is already empty");
        }
      }
    } catch (error) {
      toast.error('Error removing item from cart');
      console.error(error);
    }
  };

  const addToCart = async () => {
    try {
      const res = await axios.post(`/api/addtocart`, { bookId: _id, quantity: 1 });
      if (res.status === 200) {
        dispatch(addItem({ id: _id, quantity: 1, price }));
        setQuantVar(prevQuant => prevQuant + 1);
        setPrice(prevPrice => prevPrice + price);
        toast.success('Item added to cart successfully');
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

  return (
    <>
      <Toaster />
      {
        quantvar==0?<>
        </>:<>
        <div className='cartitemcard flex gap-10 w-full mb-5 p-5 rounded-xl cursor-pointer border-2 border-blue-300 items-center'>
        <div>
          <img src={imageUrl} className='w-[25vh] h-[30vh] rounded-lg shadow-xl' alt={title} />
        </div>
        <div className="aligntry flex justify-between w-full">
          <div className="details">
            <div className='text-2xl font-bold'>{title}</div>
            <div className='text-blue-400 text-xl'>{author}</div>
            <div className='font-extrabold text-xl my-2'>Rs.{price}</div>
          </div>
          <div className='flex space-x-5 items-center'>
            <button className='px-3 py-1 rounded-lg cursor-pointer border-2 w-fit h-fit font-extrabold' onClick={removeItemFromCart}>-</button>
            <div>{quantvar}</div>
            <button className='px-3 py-1 rounded-lg cursor-pointer border-2 w-fit h-fit font-bold' onClick={addToCart}>+</button>
          </div>
        </div>
      </div>
        </>
      }
      
    </>
  );
};

export default CartItem;
