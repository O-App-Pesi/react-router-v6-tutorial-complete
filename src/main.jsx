import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from "./routes/root";
import ErrorPage from './error-page';
import Contact from './routes/contact';
import { loader as contactLoader } from "./routes/contact";
import { action as contactAction } from "./routes/contact";
import { loader as rootLoader } from "./routes/root";
import { action as rootAction } from "./routes/root";
import EditContact, { action as editAction } from './routes/edit';
import { action as destroyAction } from "./routes/destroy";
import Index from './routes/index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      // {
      //   //Pathless Route to catch errors and 
      //   //maintain the rest of the page.
      //   errorElement: <ErrorPage />,
      //   children: [

          //index route is what shows by default :P
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          }
      //   ]
      // }
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
