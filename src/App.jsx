import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Root from './root/Root'
import Home from './pages/home/Home'
import Comments from './pages/comments/Comments.jsx'

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      }, {
        path: "/search",
        element: <Home />
      }, {
        path: "/author/:author",
        element: <Home />
      }, {
        path: "/r/:subreddit",
        element: <Home />
      }, {
        path: "/comments/:postId",
        element: <Comments />
      },
    ]

  },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
