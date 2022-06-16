/*
Name: Lily Weber
Date: 15-June-2022
File: signin.js
Description:
 */


import {Button} from 'react-bootstrap';
import {useState} from 'react';
import {useLocation, useNavigate, Link} from "react-router-dom";
import {useAuth} from "../../services/useAuth";
import './auth.css'



const Signin = () => {

    let location = useLocation();
    let navigate = useNavigate();
    let [account, setAccount] = useState(null);
    let from = location.state?.from?.pathname || "/signin";
    let {isAuthed, login, isLoading, error} = useAuth();


    // verify a user's username and password by calling the login function
    const verifyAccount = (e) => {
        e.preventDefault();
        login(account, () => {
            // Send the user back to the page they tried to visit when they were
            // redirected to the login page
            navigate(from, {replace: true});
        });
    }

// handle the change event in the two text boxes;
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setAccount({...account, [name]: value});  //spread the JSON object
    }

    return (
            <>
                <div className="main-heading">
                    <div className="container">Authorization</div>
                </div>

                <div className="main-content container">
                    <div className="auth-container">
                        {error && <div className="message" style={{color: "red"}}>{error}</div>}
                        {isLoading && <div className="message image-loading">
                            Please wait while data is being loaded
                            <img src={require(`src/pages/loading.gif`)} alt="Loading ......"/>
                        </div>}
                        {isAuthed
                            ?
                            <div style={{width: "100%", textAlign: "left"}}>You have successfully signed in. Click the links
                                in the navbar to explore the app.</div>
                            : <form className="form-auth" onSubmit={verifyAccount}>
                                <h3>Please sign in to Dog Breeds SPA</h3>
                                <div className="form-group">
                                    <div>
                                        <label>Username</label>
                                        <input type="text" name="username" required onChange={handleInputChange}/>
                                    </div>
                                    <div>
                                        <label>Password</label>
                                        <input type="password" name="password" required
                                               onChange={handleInputChange}/>
                                    </div>
                                    <div className="form-button">
                                        <Button type="submit">Sign in</Button>
                                    </div>
                                    <div className="form-footer">
                                        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                                    </div>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </>




    );
};

export default Signin;