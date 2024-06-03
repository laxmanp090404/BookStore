import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BookUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const user = useSelector(store => store.user.details)
  let role = false;
  const nav = useNavigate()
  if (user && user.roles && user.roles.length > 0) {
    role = user.roles[0];
  }
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    language: '',
    imageUrl: '',
    rating: generateRandomNumber(7, 10, 1),
    description: '',
    reviews: Math.floor(Math.random() * 1000) + 400,
  });

  function generateRandomNumber(min, max, precision) {
    const randomNumber = Math.random() * (max - min) + min;
    return randomNumber.toFixed(precision);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = async () => {
    try {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', import.meta.env.VITE_CLOUD_PRESET);
      data.append('cloud_name', import.meta.env.VITE_CLOUD_NAME);

      const response = await fetch(import.meta.env.VITE_BOOK_CLOUD, {
        method: 'POST',
        body: data,
      });
      const imageData = await response.json();

      if (imageData.secure_url) {
        setUrl(imageData.secure_url); 
        return imageData.secure_url;
      } else {
        console.error('Image upload failed');
        toast.error("Image upload failed");
        return null;
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during image upload");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await handleImage(); // Wait for image upload to complete
      if (imageUrl) {
        // Set the image URL in the form data
        const updatedFormData = { ...formData, imageUrl };
        

        if(role == "admin"){
          const response = await axios.post(
<<<<<<< HEAD
            import.meta.env.VITE_SERVER+`/api/createbook`,
=======
            `/api/createbook`,
>>>>>>> e0107b6 (Solved CORS Errors and Routing Errors)
            updatedFormData
          );
          console.log('success');
          console.log('formdata:', updatedFormData);
          toast.success("Created Book Successfully");
          nav('/')
        }
        else{
          setTimeout(()=>{
            toast.error("You are not authorised to create book.Contact admin to add book")
            
          },2000)
          setTimeout(()=>{
            nav("/")
          },3000)
        }
        // Submit the form data to the backend
        // Clear the form data after successful submission
        setFormData({
          title: '',
          author: '',
          price: 0,
          language: '',
          imageUrl: '',
          rating: generateRandomNumber(7, 10, 1),
          description: '',
          reviews: Math.floor(Math.random() * 1000) + 400,
        });
        setUrl('');
        setImage(null);
      } else {
        console.error('Image upload failed, cannot submit form');
        toast.error("Image upload failed, cannot submit form");
      }
    } catch (error) {
      console.error(error, 'Submit error');
      toast.error("An error occurred during form submission");
    }
  };

  return (
    <div className='flex justify-center min-h-screen bg-[url("")] bg-cover bg-no-repeat'>
      <Toaster /> 
      <div className='m-10 h-fit bg-white border border-blue-200 p-6 rounded-lg md:text-xl md:w-[600px]'>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
          <input required type='text' placeholder='Title' className="outline-none focus-within:border-blue-800 focus-within:bg-blue-200 placeholder-blue-300 focus-within:placeholder-blue-600 duration-200 p-2 mt-8 rounded-xl border text-[#2736ff] w-full"name='title' value={formData.title} onChange={handleChange}/>
          <input required type='text' placeholder='Author' className="outline-none focus-within:border-blue-800 focus-within:bg-blue-200 placeholder-blue-300 focus-within:placeholder-blue-600 duration-200 p-2 mt-8 rounded-xl border text-[#2736ff] w-full" name="author" value={formData.author} onChange={handleChange} />
          <input required type='number' placeholder='Price' className="outline-none focus-within:border-blue-800 focus-within:bg-blue-200 placeholder-blue-300 focus-within:placeholder-blue-600 duration-200 p-2 mt-8 rounded-xl border text-[#2736ff] w-full" name='price' pattern="[0-9]*" min={0}  value={formData.price} onChange={handleChange}/>
          <input required type='text' name='language' placeholder='Language' className="outline-none focus-within:border-blue-800 focus-within:bg-blue-200 placeholder-blue-300 focus-within:placeholder-blue-600 duration-200 p-2 mt-8 rounded-xl border text-[#2736ff] w-full" value={formData.language} onChange={handleChange}/>
          <input required type='file' className='file:rounded-xl file:bg-blue-300 file:border-transparent file:text-white file:cursor-pointer' onChange={(e) => { setImage(e.target.files[0]) }}/>
          <textarea required value={formData.description} placeholder="Description" className="outline-none focus-within:border-blue-800 focus-within:bg-blue-200 placeholder-blue-300 focus-within:placeholder-blue-600 duration-200 p-2 mt-8 rounded-xl border text-[#2736ff] w-full" name='description' onChange={handleChange} rows={4}/>
          <button type='submit' className='bg-blue-400 text-white p-2 rounded-3xl border-b-4 border-blue-700 active:scale-105 duration-300 ease-out hover:bg-blue-600'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default BookUpload;
