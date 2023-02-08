import config from "~/config";
import HomePage from "~/Pages/Home";
import ProductPage from "~/Pages/Product";
import CartPage from "~/Pages/Cart";
import SigninPage from "~/Pages/Signin";
import RegisterPage from "~/Pages/Register";
import ShippingAddressPage from "~/Pages/Shipping";
import PaymentPage from "~/Pages/Payment";
import PlaceOrderPage from "~/Pages/PlaceOrder";
import OrderPage from "~/Pages/Order";
import OrderHistoryPage from "~/Pages/OrderHistory";
import ProfilePage from "~/Pages/Profile";
import ProductListPage from "~/Pages/ProductList";
import ProductEditPage from "~/Pages/ProductEdit";
import OrderListPage from "~/Pages/OrderList";
import UserListPage from "~/Pages/UserList";
import UserEditPage from "~/Pages/UserEdit";
import SellerPage from "~/Pages/SellerPage";
import SearchPage from "~/Pages/SearchPage";
import MapPage from "~/Pages/MapPage";
import DashboardPage from "~/Pages/Dashboard/DashboardPage";
import SupportPage from "~/Pages/Support";

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
        component: UserEditPage,
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
