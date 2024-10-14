import React from 'react';
import BookView from './BookView';
function BookCard({ book, isSelected, onView }) {
  const { imageUrl, title, author, rating, price, language,bookId } = book;

  return (
    <div className='rounded-xl '>
      <div
        className="card border-r-[20px] border-b-[5px] border-opacity-50  border-[#a2a2a2]  pb-4  hover:shadow-lg shadow-cyan-400    h-[31rem] w-[22rem]  mx-9 my-4 rounded-xl   active:scale-95 shadow-none cursor-pointer ease-out duration-500 flex flex-col justify-center"
      >
        <img src={imageUrl} alt={title} className="w-[full]  h-[300px] rounded-t-xl z-50" />
        <h2 className='md:text-xl text-md font-bold self-center mt-1'>{title}</h2>

        <div className="flex justify-between px-5 py-2">
          <div className="flex flex-col space-y-2 mt-5">
            <h2 className='text-blue-950 font-bold md:text-md lg:text-md xl:text-md text-lg flex items-center gap-1'><UserIcon className="w-4 h-4 text-blue-900 " />
<span>{author}</span></h2>
            <h2 className='flex items-center gap-1'><StarIcon className=" w-4 h-4 fill-yellow-300 text-yellow-400" /><span className='font-bold'>{rating}</span></h2>
          </div>
          <div className="flex flex-col gap-3 mt-5 font-bold">
           
            <h2>₹ {price}</h2>
            <h2>{language}</h2>
          </div>
        </div>
        <button className="bg-yellow-400 m-2 bg-opacity-90 rounded-xl p-2 border-b-4 active:scale-95 duration-500 border-yellow-600  text-[rgb(54,28,12)] font-mono font-extrabold hover:bg-yellow-500 hover:text-white" onClick={onView}>
          View
        </button>
      </div>
      {isSelected && (
        <div className="book-view">
         
        </div>
      )}
    </div>
  );
}

export default BookCard;


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
