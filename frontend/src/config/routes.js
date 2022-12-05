const routes = {
    product: "/product/:id",
    cart: "/cart/:id",
    cartAll: "/cart",
    shipping: "/shipping",
    payment: "/payment",
    placeOrder: "/placeorder",

    order: "/order/:id",
    orderList: "/orderlist",
    orderHistory: "/orderhistory",

    profile: "/profile",
    register: "/register",
    signin: "/signin",

    productList: "/productlist",
    productEdit: "/product/:id/edit",

    userList: "/userlist",
    userEdit: "/user/:id/edit",
    seller: "/seller/:id",
    support: "/support",

    search: "/search/name",
    searchCategory: "/search/category/:category",
    searchCategoryName: "/search/category/:category/name/:name",
    searchAll:
        "/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber",
    productListPage: "/productlist/pageNumber/:pageNumber",
    map: "/map",
    dashboard: "/dashboard",

    home: "/",
    // profile: '/@:nickname',
    // Upload: '/upload',
    // search: '/search',
    // live:'/live'
};
export default routes;
