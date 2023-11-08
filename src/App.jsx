import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Root from './root/Root'
import Home from './pages/home/Home'
import Comments from './pages/comments/Comments.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      }, {
        path: "/comments/:postId",
        element: <Comments />
      }, {
        path: "/author/:author",
        element: <Home  />
      }, {
        path: "/r/:subreddit",
        element: <Home  />
      }
    ]

  },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
