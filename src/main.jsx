import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard.jsx'
import store from './store.js';
import { Provider } from 'react-redux'
import BookDetails from './Components/BookDetail/BookDetails.jsx'
import MemberDetails from './Components/MemberDetail/MemberDetail.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/books',
    element: <Dashboard />,
  },
  {
    path: '/books/:id',
    element: <BookDetails />
  },
  {
    path: '/members',
    element: <Dashboard />,
  },
  {
    path: '/members/:id',
    element: <MemberDetails />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
