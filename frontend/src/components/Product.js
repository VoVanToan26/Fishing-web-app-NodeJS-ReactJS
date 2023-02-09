import React from "react";
import { Link } from "react-router-dom";
import Rating from "~/components/Rating";

function Product({ product }) {
    return (
        <div key={product._id} className="card product-container">
            <Link to={`/product/${product._id}`}>
                <img className="medium img-container" src={product.image} alt={product.name} />
            </Link>
            <div className="card-body ">
                <Link to={`/product/${product._id}`}>
                    <h2>{product.name}</h2>
                </Link>
                <Rating rating={product.rating} numberReviews={product.numberReviews}></Rating>
                <div className="row">
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
