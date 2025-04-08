import './App.css'
import { Posts } from './Posts';
import { Post } from './Post';
import { Header } from './components/Header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
        <Header></Header>
        <Posts></Posts>
        </>
      )
    },
    {
      path: "/post/:id",
      element: (
        <>
        <Header></Header>
        <Post></Post>
        </>
      )
    }

  ]);
  return (
    /*
    <>
    <Posts postsArray={postsJson}></Posts>
    </>
    */
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
