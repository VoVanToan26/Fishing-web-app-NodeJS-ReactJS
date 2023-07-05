import React from "react";
import { Link } from "react-router-dom";
import Rating from "~/components/Rating";

function Product({ product }) {
    return (
        <div key={product._id} className="card col product-container">
            <div className="img-container">
                <Link to={`/product/${product._id}`}>
                    <img className="medium card-img-top" src={product.image} alt={product.name} />
                </Link>
            </div>
            <div className="card-body d-flex flex-column justify-content-between">
                <Link className="card-title" to={`/product/${product._id}`}>
                    <h3>{product.name}</h3>
                </Link>
                <Rating rating={product.rating} numberReviews={product.numberReviews}></Rating>
                <div className="row justify-content-around card-text ">
                    <div className="price">${product.price}</div>
                    <div>
                        {product.seller ? (
                            <Link to={`/seller/${product.seller._id}`}>
                                {product.seller.seller.name}
                            </Link>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Product;
