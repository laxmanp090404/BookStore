import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        language: '',
        imageUrl: '',
        description: '',
    });

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
                console.error('Image upload failed', imageData);
                toast.error("Image upload failed");
                return null;
            }
        } catch (error) {
            console.error('Image upload error:', error);
            toast.error("An error occurred during image upload");
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (image) {
                const imageUrl = await handleImage();
                if (imageUrl) {
                    const updatedFormData = { ...formData, imageUrl };
                    const response = await axios.put(`/api/updateBook/${id}`, updatedFormData);
                    if (response.status === 200) {
                        toast.success("Edited Book Successfully");
                        navigate('/');
                    } else {
                        toast.error("Failed to edit book");
                    }
                } else {
                    toast.error("Image upload failed, cannot submit form");
                }
            } else {
                const response = await axios.put(`/api/updateBook/${id}`, formData);
                if (response.status === 200) {
                    toast.success("Edited Book Successfully");
                    navigate('/');
                } else {
                    toast.error("Failed to edit book");
                }
            }
        } catch (error) {
            console.error('Submit error:', error);
            toast.error("An error occurred during form submission");
        }
    };

    const fetchBookDetails = async () => {
        try {
            const res = await axios.get(`/api/getbook/${id}`);
            if (res.status === 200) {
                const book = res.data;
                setFormData({
                    title: book.title,
                    author: book.author,
                    price: book.price,
                    language: book.language,
                    imageUrl: book.imageUrl,
                    description: book.description,
                });
            } else {
                toast.error("Failed to fetch book details");
            }
        } catch (error) {
            console.error('Fetch book details error:', error);
            toast.error("An error occurred while fetching book details");
        }
    };

    useEffect(() => {
        fetchBookDetails();
    }, [id]);

    return (
        <div className='flex justify-center min-h-screen bg-[url("")] bg-cover bg-no-repeat'>
            <Toaster />
            <div className='m-10 h-fit bg-white border border-blue-200 p-6 rounded-lg md:text-xl md:w-[600px]'>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                    <input required type='text' placeholder='Title' className="outline-none focus-within:border-blue-800 focus-within:bg-blue-200 placeholder-blue-300 focus-within:placeholder-blue-600 duration-200 p-2 mt-8 rounded-xl border text-[#2736ff] w-full" name='title' value={formData.title} maxLength={30} onChange={handleChange} />
                    <input required type='text' placeholder='Author' className="outline-none focus-within:border-blue-800 focus-within:bg-blue-200 placeholder-blue-300 focus-within:placeholder-blue-600 duration-200 p-2 mt-8 rounded-xl border text-[#2736ff] w-full" name="author" value={formData.author} maxLength={20} onChange={handleChange} />
                    <input required type='number' placeholder='Price' className="outline-none focus-within:border-blue-800 focus-within:bg-blue-200 placeholder-blue-300 focus-within:placeholder-blue-600 duration-200 p-2 mt-8 rounded-xl border text-[#2736ff] w-full" name='price' pattern="[0-9]*" min={0} max={1500} value={formData.price} onChange={handleChange} />
                    <input required type='text' name='language' placeholder='Language' className="outline-none focus-within:border-blue-800 focus-within:bg-blue-200 placeholder-blue-300 focus-within:placeholder-blue-600 duration-200 p-2 mt-8 rounded-xl border text-[#2736ff] w-full" value={formData.language} maxLength={20} onChange={handleChange} />
                    <input type='file' className='file:rounded-xl file:bg-blue-300 file:border-transparent file:text-white file:cursor-pointer' onChange={(e) => { setImage(e.target.files[0]) }} />
                    <textarea required value={formData.description} placeholder="Description" className="outline-none focus-within:border-blue-800 focus-within:bg-blue-200 placeholder-blue-300 focus-within:placeholder-blue-600 duration-200 p-2 mt-8 rounded-xl border text-[#2736ff] w-full" name='description' maxLength={200} onChange={handleChange} rows={4} />
                    <button type='submit' className='bg-blue-400 text-white p-2 rounded-3xl border-b-4 border-blue-700 active:scale-105 duration-300 ease-out hover:bg-blue-600'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EditBook;
