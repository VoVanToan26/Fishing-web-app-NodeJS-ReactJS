import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrders, listOrders } from "~/actions/orderActions";
import LoadingBox from "~/components/LoadingBox";
import MessageBox from "~/components/MessageBox";
import { useNavigate, useLocation } from "react-router-dom";
import { ORDER_DELETE_RESET } from "~/constants/orderConstants";

export default function OrderListPage(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const location = useLocation();
    const sellerMode = location.search === "?seller";
    console.log(sellerMode);
    const navigate = useNavigate();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;
    console.log("orderList", orderList);
    const orderDelete = useSelector((state) => state.orderDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = orderDelete;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET });
        dispatch(listOrders({ seller: sellerMode ? userInfo._id : "" }));
    }, [dispatch, sellerMode, successDelete, userInfo._id]);
    const deleteHandler = (order) => {
        // TODO: delete handler
        if (window.confirm("Are you sure to delete?")) {
            dispatch(deleteOrders(order._id));
        }
    };
    return (
        <div>
            <h1>Orders</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user ? order.user.name : "No_user"}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                                <td>
                                    {order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => {
                                            navigate(`/order/${order._id}`);
                                        }}
                                    >
                                        Details
                                    </button>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => deleteHandler(order)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
