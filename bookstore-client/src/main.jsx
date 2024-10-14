import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from './components/Body.jsx';
import Error from './common/Error.jsx';
import BookUpload from './components/BookUpload.jsx';
import BookView from './components/BookView.jsx';
import About from './components/About.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Cart from './components/Cart.jsx';
import Contact from './components/Contact.jsx';
import Checkout from './components/Checkout.jsx';
import EditBook from './components/EditBook.jsx';



const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [{
      path: "/",
      element: <About />
    },
    {
      path: "/uploadbook",
      element: <BookUpload />
    }, {
      path: "/book/:id",
      element: <BookView />
    },
    {
      path: "/home",
      element: <Body />,
    }, {
      path: "/login",
      element: <Login />
    }, {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/cart",
      element: <Cart />

    },
    {
      path: "/contact",
      element: <Contact />
    },
  {
    path:"/checkout",
    element:<Checkout/>
  },{
    path:"/editbook/:id",
    element:<EditBook/>
  }]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}></RouterProvider>);


