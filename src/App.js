import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
// import CategoryPage from './pages/CategoryPage';
import UserDashboardPage from './pages/user/UserDashboardPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import CartPage from './pages/CartPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ContactPage from './pages/ContactPage/ContactPage';
import { AuthProvider } from './../src/store/auth-context.js';
import { SearchContextProvider } from './store/search-context';
import { CategoryProvider } from './store/category-context';
import { CartContextProvider } from './store/cart-context';
import MakeUserDashboardPrivate from './routes/MakeUserDashboardPrivate';
import MakeAdminDashboardPrivate from './routes/MakeAdminDashboardPrivate';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import Users from './pages/admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import './App.css';
import DefaultUserPage from './pages/user/DefaultUserPage';
import DefaultAdminPage from './pages/admin/DefaultAdminPage';
import ErrorPage from './components/utilities/ErrorPage';
import SearchPage from './pages/SearchPage';
import CategoryProducts from './pages/CategoryProducts';
import ProductDetails from './pages/ProductDetails';
import OrdersAdmin from './pages/admin/OrdersAdmin';
import { Toaster } from 'react-hot-toast';
import AdminProfile from './pages/admin/AdminProfile';

// const router = createBrowserRouter([
//   {
//     path: "",
//     element: (
//       <>
//         <Layout />
//       </>
//     ),
//     children: [
//       {
//         path: "home",
//         element: <HomePage />,
//       },
//       {
//         path: "about",
//         element: <AboutPage />,
//       },
//       {
//         path: "category",
//         element: <CategoryPage />,
//       },
//       {
//         path: "login",
//         element: <LoginPage />,
//       },
//       {
//         path: "register",
//         element: <RegisterPage />,
//       },
//       {
//         path: "cart",
//         element: <CartPage />,
//       },
//       {
//         path: "contact",
//         element: <ContactPage />,
//       },
//       {
//         path: "policy",
//         element: <PrivacyPolicyPage />,
//       },
//       {
//         path: "dashboard",
//         element: <UserDashboardPage />,
//       },
//     ],
//   },
// ]);

function App() {
  return (
    <AuthProvider>
      <CartContextProvider>
        <SearchContextProvider>
          <CategoryProvider>
            <ToastContainer />
            <Toaster />
            <Routes>
              <Route exact path="/" element={<HomePage />}></Route>
              <Route path="/home" element={<HomePage />}></Route>
              <Route path="/about" element={<AboutPage />}></Route>
              {/* <Route path="/category" element={<CategoryPage />}></Route> */}
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="/policy" element={<PrivacyPolicyPage />}></Route>
              <Route path="/contact" element={<ContactPage />}></Route>
              <Route path="/search" element={<SearchPage />}></Route>
              <Route path="/products/:slug" element={<CategoryProducts />} />
              <Route
                path="/products/product-details/:slug"
                element={<ProductDetails />}
              />
              <Route path="/dashboard" element={<MakeUserDashboardPrivate />}>
                <Route path="user" element={<UserDashboardPage />}>
                  <Route index={true} element={<DefaultUserPage />}></Route>
                  <Route path="profile" element={<Profile />}></Route>
                  <Route path="orders" element={<Orders />}></Route>
                </Route>
              </Route>
              <Route path="/dashboard" element={<MakeAdminDashboardPrivate />}>
                <Route path="admin" element={<AdminDashboardPage />}>
                  <Route index={true} element={<DefaultAdminPage />} />
                  <Route path="profile" element={<AdminProfile />}></Route>
                  <Route path="create-category" element={<CreateCategory />} />
                  <Route path="create-product" element={<CreateProduct />} />
                  <Route path="products/" element={<Products />} />
                  <Route
                    path="products/update-product/:id"
                    element={<UpdateProduct />}
                  />
                  <Route path="users" element={<Users />} />
                  <Route path="orders" element={<OrdersAdmin />} />
                </Route>
              </Route>
              <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
          </CategoryProvider>
        </SearchContextProvider>
      </CartContextProvider>
    </AuthProvider>
  );
}

export default App;
