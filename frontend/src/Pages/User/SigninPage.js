import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { signin } from "~/actions/userActions";
import CheckoutSteps from "~/components/CheckoutSteps";
import LoadingBox from "~/components/LoadingBox";
import MessageBox from "~/components/MessageBox";

export default function SigninPage() {
    var location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 2 register account  generate
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const redirect = location.search ? location.search.split("=")[1] : "/";

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: sign in action
        dispatch(signin(email, password));
    };
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);
    return (
        <div>
            <CheckoutSteps step1></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Sign In
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        New customer?{" "}
                        <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
