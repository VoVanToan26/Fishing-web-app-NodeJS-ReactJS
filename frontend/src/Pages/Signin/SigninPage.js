import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { signin } from '~/actions/userActions';
import Loadingbox from '~/compenents/Loadingbox';
import Messagebox from '~/compenents/Messagebox';

export default function SigninPage() {
    var props = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.length ? `/redirect=${props.redirect}` : '/';
    console.log('redirect', redirect);
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;


    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: sign in action
        dispatch(signin(email, password));
    };
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <Loadingbox></Loadingbox>}
                {error && <Messagebox variant="danger">{error}</Messagebox>}
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
                        New customer? <Link to="/register">Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}