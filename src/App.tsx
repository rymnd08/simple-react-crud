import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import UploadBooks from "./pages/UploadBooks";
import MyBooks from "./pages/MyBooks";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home />},
    { path: "/login", element: <Login />},
    { path: "/register", element: <Register />},
    { path: "/my-books", element: <MyBooks />},
    { path: "/create", element: <UploadBooks />},
    { path: "*", element: <PageNotFound />},
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
