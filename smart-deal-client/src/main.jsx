import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layout/RootLayout';
import Home from './components/Home/Home';
import AllProducts from './components/AllProducts/AllProducts';
import AuthProvider from './context/AuthProvider';
import Register from './components/Register/Register';
import MyProducts from './components/MyProducts/MyProducts';
import MyBids from './components/MyBids/MyBids';
import PrivateRoute from './context/PrivateRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CreateProduct from './components/CreateProduct/CreateProduct';
import ErrorPage from './components/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'allProducts',
        loader: () => fetch('https://smart-deal-server-nu.vercel.app/products/'),
        Component: AllProducts,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'myProducts',
        element: <PrivateRoute>
            <MyProducts></MyProducts>
        </PrivateRoute>,
      },
      {
        path: 'myBids',
        element: <PrivateRoute>
            <MyBids></MyBids>
        </PrivateRoute>,
      },
      {
        path: 'createProduct',
        element: <PrivateRoute>
            <CreateProduct></CreateProduct>
        </PrivateRoute>,
      },
      {
        path: 'productDetails/:id',
        loader: ({params}) => fetch(`https://smart-deal-server-nu.vercel.app/products/${params.id}`),
        // Component: ProductDetails,
        element: <PrivateRoute>
            <ProductDetails></ProductDetails>
        </PrivateRoute>,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
