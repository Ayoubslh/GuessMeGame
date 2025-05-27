import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeLayout from './pages/HomeLayout';
import Error from './errors/Error';
import ErrorElement from './errors/ErrorElement';
import Landing from './pages/Landing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
