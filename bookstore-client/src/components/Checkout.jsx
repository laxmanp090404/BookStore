import React from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const nav = useNavigate();
  const userdetails = useSelector((store) => store.user.details);

  const placeOrder = () => {
    if (!userdetails || Object.keys(userdetails).length === 0) {
      toast.error('Login first to Place orders');
      nav('/login')
    } else {
      toast.success('Order will be delivered soon');
      nav('/');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-2xl font-bold mb-8 dark:text-gray-100">Checkout</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="address"
                className="block font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="123 Sun Street"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  placeholder="Coimbatore"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  placeholder="Tamilnadu"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="zip"
                className="block font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Zip Code
              </label>
              <input
                type="text"
                id="zip"
                placeholder="641050"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="card-number"
                className="block font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Card Number
              </label>
              <input
                type="text"
                id="card-number"
                placeholder="1234 1234 1234 1234"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expiration"
                  className="block font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Expiration
                </label>
                <input
                  type="text"
                  id="expiration"
                  placeholder="MM/YY"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <label
                  htmlFor="cvv"
                  className="block font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  placeholder="123"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
        </form>
        <div className="flex justify-end mt-8">
          <button
            onClick={() => placeOrder()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
