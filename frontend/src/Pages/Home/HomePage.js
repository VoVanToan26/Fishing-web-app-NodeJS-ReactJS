import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import LoadingBox from "~/components/LoadingBox";
import MessageBox from "~/components/MessageBox";
import Product from "~/components/Product";

import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "~/actions/productActions";
import { listTopSellers } from "~/actions/userActions";
import { Link } from "react-router-dom";

function HomePage() {
    const dispatch = useDispatch();

    const userTopSellersList = useSelector((state) => state.userTopSellersList);
    const { loading: loadingSellers, error: errorSellers, users: sellers } = userTopSellersList;

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(
        () => {
            dispatch(listProducts({}));
            dispatch(listTopSellers());
        },
        [dispatch],
        products
    );

    return (
        <div>
            <h2 className="font-weight-bold">Top Sellers</h2>
            {loadingSellers ? (
                <LoadingBox></LoadingBox>
            ) : errorSellers ? (
                <MessageBox variant="danger">{errorSellers}</MessageBox>
            ) : (
                <>
                    {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
                    <div className="carousel-container">
                        <Carousel showArrows autoPlay showThumbs={false}>
                            {sellers.map((seller) => (
                                <div key={seller._id} className="containerSeller">
                                    <Link to={`/seller/${seller._id}`}>
                                        <img src={seller.seller.logo} alt={seller.seller.name} />
                                        <p className="legend">{seller.seller.name}</p>
                                    </Link>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </>
            )}
            <h2 className="font-weight-bold">Featured Products</h2>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                    {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                    <div className="row center product-list ">
                        <div className="col"></div>
                        {products.map((product) => (
                            <Product key={product._id} product={product}></Product>
                        ))}
                        <div className="col"></div>
                    </div>
                </>
            )}
        </div>
    );
}

export default HomePage;
