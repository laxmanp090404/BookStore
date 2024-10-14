import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const About = () => {
  const nav = useNavigate();
  return (
    <>
      <div className="bg-[url('https://cdn.pixabay.com/photo/2022/10/16/19/39/teacup-7526022_1280.jpg')] bg-cover py-20 md:py-32 lg:py-40">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">Welcome to BookHaven</h1>
            <p className="mt-4 text-lg text-gray-200 sm:text-xl md:text-2xl">
            <span className='mt-2 mb-0 text-[30px] md:text-[50px] font-serif'>“</span>  The man who does not <span className='font-extrabold sm:text-2xl md:text-3xl'>read</span> good books is no better than the man who <span className='font-extrabold sm:text-2xl md:text-3xl'>can't</span><span className='text-3xl font-serif text-[30px] md:text-[50px]'>”</span></p>
          </div>
        </div>
      </div>
      <div className="py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            <div className="flex justify-center">
              <img
                alt="Book Stack"
                className="max-w-full h-auto rounded-xl "
                height={400}
                src="/assets/vec1.jpeg"
                style={{
                  aspectRatio: "400/400",
                  objectFit: "cover",
                }}
                width={400}
              />
            </div>
            <div className="space-y-4 md:space-y-6 lg:space-y-8 flex flex-col items-center md:items-start">
              <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl text-[#041438]">About BookHaven</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                BookHaven is a cozy, independent bookstore that has been serving the community for over a decade. Our
                mission is to provide a welcoming space where book lovers can discover new stories, engage with authors,
                and connect with like-minded readers.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We pride ourselves on our carefully curated selection of books, ranging from the latest bestsellers to
                hidden gems. Our knowledgeable staff is always on hand to offer personalized recommendations and help
                you find your next great read.
              </p>
             
  <div className='flex justify-center md:justify-start mt-4'>
    <button className='hover:border-[#041438] border-2 border-transparent hover:bg-white px-10 py-2 rounded-xl hover:text-[#041438] bg-[#041438] text-white duration-500'
            onClick={(e) => {e.preventDefault(); nav('/home'); window.scrollTo(0, 0);}}>
      Explore Books
    </button>
  </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default About