import React from 'react'
//#060740
const OfflinePage = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen flex-col gap-4 p-4 text-center">
    <div className="space-y-2">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-[#5558ff]">BookHaven</h1>
      <BookOpenIcon className="h-20 w-20 text-[#1b1d7a] dark:text-[#060740] mx-auto" />
      <p className="text-gray-500">Your gateway to literary adventures</p>
    </div>
    <div className="mx-auto max-w-[400px] space-y-2">
      <p className="text-2xl font-bold">Oops, it looks like you're offline.</p>
      <p className="text-sm text-gray-500">Please check your internet connection and try again.</p>
     
    </div>
    
  </div>
  )
}

export default OfflinePage

function BookOpenIcon(props) {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}