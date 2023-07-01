import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Rating from "~/components/Rating";
import { createReview, detailsProduct } from "~/actions/productActions";
import LoadingBox from "~/components/LoadingBox";
import MessageBox from "~/components/MessageBox";

const ProductPage = () => {
    //dispatch() is the method used to dispatch actions and trigger state changes to the store. react-redux is simply trying to give you convenient access to it
    const dispatch = useDispatch();
    var props = useParams();
    const productId = props.id;
    const [qty, setQty] = useState(1);
    //useSelector lấy state từ Redux store bằng cách sử dụng một selector function làm tham số đầu vào
    // /Allows you to extract data from the Redux store state, using a selector function.
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const navigate = useNavigate();
    const addToCartHandler = () => {
        // react routewr 6  v4 is props.history.push()
        navigate(`/cart/${productId}?qty=${qty}`);
    };
    console.log("detailsProduct", detailsProduct);

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    // get state review create
    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
        loading: loadingReviewCreate,
        error: errorReviewCreate,
        success: successReviewCreate,
    } = productReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
            dispatch(createReview(productId, { rating, comment, name: userInfo.name }));
        } else {
            alert("Please enter comment and rating");
        }
    };

    // hook
    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate]);

    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>
                    <Link to="/">Back </Link>
                    <div className="row top">
                        <div className="product-item d-flex justify-content-center col-xl-5">
                            <img className="large" src={product.image} alt={product.name}></img>
                        </div>
                        <div className="product-item  col-6  col-xl-3">
                            <ul>
                                <li>
                                    <h1>{product.name}</h1>
                                </li>
                                <li>
                                    <Rating
                                        rating={product.rating}
                                        numberReviews={product.numberReviews || "0"}
                                    ></Rating>
                                </li>
                                <li>Pirce :<span className="product-price">${product.price}</span> </li>
                                <li>
                                    Description:
                                    <p>{product.description}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="product-item  col-6 col-xl-3">
                            <div className="card card-body">
                                <li>
                                    Seller{" "}
                                    <h2>
                                        <Link to={`/seller/${product.seller._id}`}>
                                            {product.seller.seller.name}
                                        </Link>
                                    </h2>
                                    <Rating
                                        rating={product.seller.seller.rating}
                                        numberReviews={product.seller.seller.numberReviews}
                                    ></Rating>
                                </li>
                                <ul>
                                    <li>
                                        <div className="row">
                                            <div>Price</div>
                                            <div className="price product-price">${product.price}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Status</div>
                                            <div>
                                                {product.countInStock > 0 ? (
                                                    <span className="success">In Stock</span>
                                                ) : (
                                                    <span className="error">Unavailable</span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                    {product.countInStock > 0 && (
                                        <>
                                            <li>
                                                <div className="row">
                                                    <div>Qty</div>
                                                    <div>
                                                        <select
                                                            className=" m-2"
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {[
                                                                ...Array(
                                                                    product.countInStock
                                                                ).keys(),
                                                            ].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={addToCartHandler}
                                                    className="primary block"
                                                >
                                                    Add to Cart
                                                </button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 id="reviews">Reviews</h2>
                        {product.reviews.length === 0 && (
                            <MessageBox>There is no review</MessageBox>
                        )}
                        <ul>
                            {product.reviews.map((review) => (
                                <li key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating rating={review.rating} caption=" "></Rating>
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </li>
                            ))}
                            <li>
                                {userInfo ? (
                                    <form className="form" onSubmit={submitHandler}>
                                        <div>
                                            <h2>Write a customer review</h2>
                                        </div>
                                        <div>
                                            <label htmlFor="rating">Rating</label>
                                            <select
                                                id="rating"
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                            >
                                                <option value="">Select...</option>
                                                <option value="1">1- Poor</option>
                                                <option value="2">2- Fair</option>
                                                <option value="3">3- Good</option>
                                                <option value="4">4- Very good</option>
                                                <option value="5">5- Excelent</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="comment">Comment</label>
                                            <textarea
                                                id="comment"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label />
                                            <button className="primary" type="submit">
                                                Submit
                                            </button>
                                        </div>
                                        <div>
                                            {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                            {errorReviewCreate && (
                                                <MessageBox variant="danger">
                                                    {errorReviewCreate}
                                                </MessageBox>
                                            )}
                                        </div>
                                    </form>
                                ) : (
                                    <MessageBox>
                                        Please <Link to="/signin">Sign In</Link> to write a review
                                    </MessageBox>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;
