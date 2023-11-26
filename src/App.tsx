import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home />},
    { path: "/login", element: <Login />},
    { path: "/register", element: <Register />},
    { path: "*", element: <PageNotFound />},
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
