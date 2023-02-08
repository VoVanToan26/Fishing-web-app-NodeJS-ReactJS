import config from "~/config";
import DashboardPage from "~/Pages/Admin/DashboardPage";
import SupportPage from "~/Pages/Admin/SupportPage";
import CartPage from "~/Pages/Cart/CartPage";
import MapPage from "~/Pages/Cart/MapPage";
import PaymentPage from "~/Pages/Cart/PaymentPage";
import PlaceOrderPage from "~/Pages/Cart/PlaceOrderPage";
import ShippingAddressPage from "~/Pages/Cart/ShippingAddressPage";
import HomePage from "~/Pages/Home/HomePage";
import OrderHistoryPage from "~/Pages/Order/OrderHistoryPage";
import OrderListPage from "~/Pages/Order/OrderListPage";
import OrderPage from "~/Pages/Order/OrderPage";
import ProductEditPage from "~/Pages/Product/ProductEditPage";
import ProductListPage from "~/Pages/Product/ProductListPage";
import ProductPage from "~/Pages/Product/ProductPage";
import SearchPage from "~/Pages/Product/SearchPage";
import SellerPage from "~/Pages/SellerPage/SellerPage";
import ProfilePage from "~/Pages/User/ProfilePage";
import RegisterPage from "~/Pages/User/RegisterPage";
import SigninPage from "~/Pages/User/SigninPage";
import userEditPage from "~/Pages/User/UserEditPage";
import UserListPage from "~/Pages/User/UserListPage";

// Layouts

// Pages

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: HomePage },
    { path: config.routes.product, component: ProductPage },
    { path: config.routes.cart, component: CartPage },
    { path: config.routes.cartAll, component: CartPage },
    { path: config.routes.signin, component: SigninPage },
    { path: config.routes.register, component: RegisterPage },
    { path: config.routes.shipping, component: ShippingAddressPage },
    { path: config.routes.payment, component: PaymentPage },
    { path: config.routes.placeOrder, component: PlaceOrderPage },
    { path: config.routes.order, component: OrderPage },
    { path: config.routes.orderHistory, component: OrderHistoryPage },
    { path: config.routes.profile, component: ProfilePage, private: true },
    {
        path: config.routes.productList,
        component: ProductListPage,
        private: true,
        isAminPage: true,
        isSellerPage: true,
        exact: true,
    },

    {
        path: config.routes.productEdit,
        component: ProductEditPage,
        private: true,
        isAminPage: true,
    },
    {
        path: config.routes.orderList,
        component: OrderListPage,
        private: true,
        isAminPage: true,
        isSellerPage: true,
    },
    {
        path: config.routes.userList,
        component: UserListPage,
        private: true,
        isAminPage: true,
    },
    {
        path: config.routes.userEdit,
        component: userEditPage,
        private: true,
        isAminPage: true,
    },
    {
        path: config.routes.seller,
        component: SellerPage,
    },
    {
        path: config.routes.search,
        component: SearchPage,
        exact: true,
    },
    {
        path: config.routes.searchCategory,
        component: SearchPage,
        exact: true,
    },
    {
        path: config.routes.searchCategoryName,
        component: SearchPage,
        exact: true,
    },
    {
        path: config.routes.searchAll,
        component: SearchPage,
        exact: true,
    },
    {
        path: config.routes.map,
        component: MapPage,
        private: true,
    },
    {
        path: config.routes.productListPage,
        component: ProductListPage,
        private: true,
    },
    {
        path: config.routes.dashboard,
        component: DashboardPage,
        private: true,
        isAminPage: true,
    },
    {
        path: config.routes.support,
        component: SupportPage,
        private: true,
    },
];
console.log("publicRoutes", publicRoutes);
const privateRoutes = [];

export { publicRoutes, privateRoutes };
