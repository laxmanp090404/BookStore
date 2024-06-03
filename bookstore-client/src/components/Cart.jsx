import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { clearCart } from "../Slices/cartSlice";
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../common/Loader';

const Cart = () => {
  const [cartItems, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();

  const handleClearCart = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_SERVER+"/api/clearcart");
      const res = response.data;
      if (res.cleared) {
        toast.success(res.message);
        setCart([]);
        setPrice(0);
        dispatch(clearCart());
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error clearing cart');
    }
  };

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get(`/api/cart`);
        setCart(response.data.items);
        setLoading(false);
        const total = response.data.items.reduce((acc, item) => acc + (item.book.price * item.quantity), 0);
        setPrice(total);
      } catch (err) {
        setError(err.response ? err.response.data.error : err.message);
        setLoading(false);
      }
    };

    getCart();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Toaster />
      <div className='flex justify-between m-10 min-h-[75vh]'>
        <div className='w-[60%]'>
          <div className='text-3xl mb-2'>Your Cart</div>
          {cartItems.length === 0 ?
            <div className='flex items-center justify-center h-full'>Empty</div> :
            <div className='overflow-y-scroll h-[70vh] no-scrollbar'>
              {cartItems.map((item, idx) => (
                <CartItem details={item.book} key={item.id || idx} quantity={item.quantity} setPrice={setPrice} />
              ))}
            </div>
          }
        </div>
        <div className='checkoutdiv w-[450px] h-[300px] space-y-3 border-2 rounded-lg p-8 border-blue-300 z-10 shadow-2xl'>
          <p className='text-xl w-full'>Order Summary</p>
          <div className='orderdetails1 flex justify-between'>
            <p>Total Items</p>
            <p>{cartItems.length}</p>
          </div>
          <div className='orderdetails2 flex justify-between'>
            <p>Total Price</p>
            <p>Rs.{price}</p>
          </div>
          <button className='bg-blue-500 hover:bg-blue-400 duration-200 p-2 w-full rounded-lg text-white' onClick={handleClearCart}>Clear Cart</button>
          <button className='bg-white border-2 border-blue-600 p-2 w-full duration-200 hover:bg-blue-100 rounded-lg text-blue-600'>Proceed to Checkout</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
