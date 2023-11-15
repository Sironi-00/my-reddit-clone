import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './View/Root/Root.jsx'
import Home from './View/Pages/Home/Home.jsx'
import Comments from './View/Pages/Comments/Comments.jsx'

import ContextProvider from './Controller/ContextProvider/ContextProvider.jsx'

const router = createBrowserRouter([
  {
    path: "*",
    element: <Root />,
    children: [
      {
        path: "*",
        element: <Home />
      }, {
        path: "search",
        element: <Home />
      }, {
        path: "author/:author",
        element: <Home />
      }, {
        path: "r/:subreddit",
        element: <Home />
      }, {
        path: "comments/:postId",
        element: <Comments />
      }, 
    ]

  },
])

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  )
}

export default App
