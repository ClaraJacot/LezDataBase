import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Movie from "./components/Movie";
import MovieList from "./components/MovieList";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <MovieList/>,
      },
    ],
  },
  {
    path:"/edit/:id",
    element: <App/>,
    children: [
      {
        path: "/edit/:id",
        element: <Movie />,
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <Movie />,
      },
    ],
  },
]);
  
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
