/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "~/components/MessageBox";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import LoadingBox from "~/components/LoadingBox";
import { USER_UPDATE_RESET } from "~/constants/userConstants";
import { detailsUser, updateUser } from "~/actions/userActions";

export default function userEditPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    // user hook update
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isSeller, setIsSeller] = useState("");
    const [isAdmin, setIsAdmin] = useState("");

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    //get state when update user
    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;
    console.log("userUpdate", userUpdate);

    // get id from link
    var props = useParams();
    const userId = props.id;
    // get user detail when no have user or shet input value  when have user

    useEffect(() => {
        // if update success redirect to /user
        console.log(successUpdate);

        if (successUpdate) {
            navigate("/userlist");
        }
        // if !user or update success reset oriuct
        if (!user || user._id !== userId || successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            dispatch(detailsUser(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsSeller(user.isSeller);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, navigate, successUpdate, navigate, user, userId]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUser({
                _id: userId,
                name,
                email,
                isSeller,
                isAdmin,
            })
        );
    };

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit user {userId}</h1>
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
                            <label htmlFor="email">email</label>
                            <input
                                id="email"
                                type="text"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="isSeller">is Seller</label>
                            <input
                                id="isSeller"
                                type="checkbox"
                                placeholder="Enter isSeller"
                                checked={isSeller}
                                onChange={(e) => setIsSeller(e.target.checked)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="isAdmin">is Admin</label>
                            <input
                                id="isAdmin"
                                type="checkbox"
                                placeholder="Enter isAdmin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></input>
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
