import React from 'react'
import { Link } from 'react-router-dom'
const Contact = () => {
  return (
    <>
      <section className="bg-[#041438] text-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch with BookHaven</h1>
              <p className="text-lg md:text-xl mb-8">
                Have a question or want to learn more? Fill out the form and we'll get back to you.
              </p>
              <form className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="bg-[#093e67] border-none rounded-md py-3 px-4 w-full focus:ring-2 focus:ring-white focus:outline-none"
                    id="name"
                    placeholder="Enter your name"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="bg-[#093e67]  border-none rounded-md py-3 px-4 w-full focus:ring-2 focus:ring-white focus:outline-none"
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="bg-[#093e67] border-none rounded-md py-3 px-4 w-full focus:ring-2 focus:ring-white focus:outline-none"
                    id="message"
                    placeholder="Enter your message"
                    rows={4}
                  />
                </div>
                <button
                  className="bg-white text-[#041438] font-medium rounded-md py-3 px-6 hover:bg-[#c1e4ff]  transition-colors"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="justify-self-center rounded-md">
              <img
                alt="Books Illustration"
                height={400}
                className='rounded-md'
                src="/assets/vec2.jpg"
                style={{
                  aspectRatio: "400/400",
                  objectFit: "cover",
                }}
                width={400}
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto px-4 md:px-6 py-10">
          <div className="flex justify-center space-x-6 w-full h-20">
            <Link className="text-[#0077B6] hover:text-[#0066B3] transition-colors" href="#">
              <FacebookIcon className="h-8 w-8" />
            </Link>
            <Link className="text-[#0077B6] hover:text-[#0066B3] transition-colors" href="#">
              <TwitterIcon className="h-8 w-8" />
            </Link>
            <Link className="text-[#0077B6] hover:text-[#0066B3] transition-colors" href="#">
              <InstagramIcon className="h-8 w-8" />
            </Link>
            <Link className="text-[#0077B6] hover:text-[#0066B3] transition-colors" href="#">
              <LinkedinIcon className="h-8 w-8" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact

function FacebookIcon(props) {
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
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )
  }
  
  
  function InstagramIcon(props) {
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
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    )
  }
  
  
  function LinkedinIcon(props) {
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
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  }
  
  
  function TwitterIcon(props) {
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
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    )
  }