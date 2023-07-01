import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProducts } from "~/actions/productActions";
import { detailsUser } from "~/actions/userActions";
import LoadingBox from "~/components/LoadingBox";
import MessageBox from "~/components/MessageBox";
import Product from "~/components/Product";
import Rating from "~/components/Rating";

export default function SellerPage() {
    const sellerId = useParams().id;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const productList = useSelector((state) => state.productList);
    const { loading: loadingProducts, error: errorProducts, products } = productList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsUser(sellerId));
        dispatch(listProducts({ seller: sellerId }));
    }, [dispatch, sellerId]);
    return (
        <div className="row d-flex justify-content-around  top">
            <div className="col-md-4 col-12">
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <ul className="card card-body">
                        <li>
                            <div className="row start">
                                <div className="p-1">
                                    <img
                                        className="small"
                                        src={user.seller.logo}
                                        alt={user.seller.name}
                                    ></img>
                                </div>
                                <div className="p-1">
                                    <h1>{user.seller.name}</h1>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Rating
                                rating={user.seller.rating}
                                numberReviews={user.seller.numberReviews}
                            ></Rating>
                        </li>
                        <li>
                            <a href={`mailto:${user.email}`}>Contact Seller</a>
                        </li>
                        <li>{user.seller.description}</li>
                    </ul>
                )}
            </div>
            <div className="col-md-8 col-12">
                {loadingProducts ? (
                    <LoadingBox></LoadingBox>
                ) : errorProducts ? (
                    <MessageBox variant="danger">{errorProducts}</MessageBox>
                ) : (
                    <>
                        {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                        <div className="row center">
                            {products.map((product) => (
                                <Product key={product._id} product={product}></Product>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
