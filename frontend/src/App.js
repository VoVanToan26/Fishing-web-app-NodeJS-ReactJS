import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { publicRoutes } from "~/routes";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCartShopping, faClose, faBars } from "@fortawesome/free-solid-svg-icons";
import { signout } from "~/actions/userActions";
import { listProductCategories } from "~/actions/productActions";
import SearchBox from "~/components/SearchBox";
import LoadingBox from "~/components/LoadingBox";
import MessageBox from "~/components/MessageBox";
import PrivateRoute from "~/components/PrivateRoute";
import ChatBox from "~/components/ChatBox";

function App() {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    // add count cart
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    };

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;

    useEffect(() => {
        dispatch(listProductCategories());
    }, [dispatch]);

    return (
        <Router>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <button
                            type="button"
                            className="open-sidebar"
                            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                        >
                            <FontAwesomeIcon icon={faBars} />
                            <i className="fa fa-bars"></i>
                        </button>
                        <Link className="brand" to="/">
                            Van Toan fishing
                        </Link>
                    </div>
                    <div>
                        <SearchBox></SearchBox>
                    </div>
                    <div className="Cart" style={{ position: "relative" }}>
                        <Link to="/cart">
                            Cart{" "}
                            <FontAwesomeIcon style={{ fontSize: "2.5rem" }} icon={faCartShopping} />
                            {cartItems.length > 0 && (
                                <span
                                    style={{ position: "relative", top: "-1rem" }}
                                    className="badge"
                                >
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                        {userInfo ? (
                            <div className="dropdown">
                                <Link to="#">
                                    {userInfo.name}
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </Link>

                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/profile">User Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="#signout" onClick={signoutHandler}>
                                            Sign Out
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/orderhistory">Order History</Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/signin">Sign In</Link>
                        )}

                        {userInfo && userInfo.isSeller && (
                            <div className="dropdown">
                                <Link to="#admin">
                                    Seller <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/productlist?seller">Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist?seller">Orders</Link>
                                    </li>
                                </ul>
                            </div>
                        )}

                        {userInfo && userInfo.isAdmin && (
                            <div className="dropdown">
                                <Link to="#admin">
                                    Admin
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/productlist">Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist">Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/userlist">Users</Link>
                                    </li>
                                    <li>
                                        <Link to="/support">Support</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </header>
                <aside className={sidebarIsOpen ? "open" : ""}>
                    <ul className="categories">
                        <li>
                            <strong>Categories</strong>
                            <button
                                onClick={() => setSidebarIsOpen(false)}
                                className="close-sidebar"
                                type="button"
                            >
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </li>
                        {loadingCategories ? (
                            <LoadingBox></LoadingBox>
                        ) : errorCategories ? (
                            <MessageBox variant="danger">{errorCategories}</MessageBox>
                        ) : (
                            categories.map((c) => (
                                <li key={c}>
                                    <Link
                                        to={`/search/category/${c}`}
                                        onClick={() => setSidebarIsOpen(false)}
                                    >
                                        {c}
                                    </Link>
                                </li>
                            ))
                        )}
                    </ul>
                </aside>
                <main>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            // console.log("page", Page);
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    element={
                                        route.private ? (
                                            <PrivateRoute
                                                isAllowed={
                                                    userInfo &&
                                                    ((route.isAdminPage && userInfo.isAdmin) ||
                                                        (route.isSellerPage && userInfo.isSeller) ||
                                                        !route.isAdminPage)
                                                }
                                                redirectPath={`/signin?redirect=${route.path}`}
                                            >
                                                {" "}
                                                <Page />
                                            </PrivateRoute>
                                        ) : (
                                            <Page />
                                        )
                                    }
                                />
                            );
                        })}
                    </Routes>
                </main>
                <footer className="row center">
                    {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
                    <div>All right reserved</div>{" "}
                </footer>
            </div>
        </Router>
    );
}
export default App;
