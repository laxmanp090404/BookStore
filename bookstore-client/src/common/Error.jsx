import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
export default function Error() {
  const error = useRouteError();
  console.log(error)
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-8 px-4 md:px-6">
      <div className="flex max-w-md flex-col items-center justify-center gap-4">
        <BookOpenIcon className="h-20 w-20 text-[#FF8C00] dark:text-[#FF8C00]" />
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Oops! Page not found.</h1>
        <p className="text-center text-[#FF8C00] dark:text-[#FF8C00] text-xl">
          {error.status}-{error.error.message}
         
          {/* The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. */}
        </p>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-[#FF8C00] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#FF8C00]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF8C00] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#FF8C00] dark:text-white dark:hover:bg-[#FF8C00]/90 dark:focus-visible:ring-[#FF8C00]"
          to="/"
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}

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

