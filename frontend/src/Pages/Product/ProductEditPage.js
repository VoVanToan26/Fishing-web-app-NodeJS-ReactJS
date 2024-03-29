import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "~/components/MessageBox";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { detailsProduct, updateProduct } from "~/actions/productActions";
import LoadingBox from "~/components/LoadingBox";
import { PRODUCT_UPDATE_RESET } from "~/constants/productConstants";
import Axios from "axios";

export default function ProductEditPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const [countInStock, setCountInStock] = useState("");
    const [description, setDescription] = useState("");

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    //get state when update product
    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;
    // get id from link
    var props = useParams();
    const productId = props.id;
    // get product detail when no have product or shet input value  when have product
    useEffect(() => {
        // if update success redirect to /product
        if (successUpdate) {
            navigate("/productlist");
        }
        // if !product or update success reset oriuct
        if (!product || product._id !== productId || successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch(detailsProduct(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setDescription(product.description);
            console.log(product.price);
        }
    }, [product, dispatch, productId, successUpdate, navigate]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productId,
                name,
                price,
                image,
                category,
                brand,
                countInStock,
                description,
            }),
        );
    };

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState("");

    const uploadFileHandler = async (e) => {
        // get file from event upload
        const file = e.target.files[0];
        // create form data
        const bodyFormData = new FormData();
        bodyFormData.append("image", file);
        // change value loadingUpload
        setLoadingUpload(true);
        try {
            // get data fro
            const { data } = await Axios.post("/api/uploads/productImage", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };
    
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product {productId}</h1>
                </div>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input
                                id="price"
                                type="text"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="image">Image</label>
                            <input
                                id="image"
                                type="text"
                                placeholder="Enter image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="imageFile">Image File</label>
                            <input
                                type="file"
                                id="imageFile"
                                label="Choose Image"
                                onChange={uploadFileHandler}
                            ></input>
                            {loadingUpload && <LoadingBox></LoadingBox>}
                            {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                        </div>
                        <div>
                            <label htmlFor="category">Category</label>
                            <input
                                id="category"
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="brand">Brand</label>
                            <input
                                id="brand"
                                type="text"
                                placeholder="Enter brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="countInStock">Count In Stock</label>
                            <input
                                id="countInStock"
                                type="text"
                                placeholder="Enter countInStock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                rows="3"
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label></label>
                            <button className="primary" type="submit">
                                Update
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}
