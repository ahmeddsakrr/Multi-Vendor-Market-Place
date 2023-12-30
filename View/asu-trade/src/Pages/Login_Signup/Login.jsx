import React, {useState} from "react";
import '../Login_Signup/Login_Signup.css'
import axios from 'axios';
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Cookies from 'js-cookie';

const Login = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

            // Actual login
               try {
                    const response = await axios.post('/auth/login', {
                        username: username,
                        password: password
                    });

                    Cookies.set('authenticationToken', response.data.token);
                    var username = document.getElementById("username").value;
                
                    // Create user data object
                    var user = {
                        username: username
                    };
        
                    // Save data to cookie
                    document.cookie = "userInfo=" + JSON.stringify(user);
                    console.log(response);
                    
                } catch (error) {
                    console.log(error);
                }
            
        }
    
    return (
        <>
        <Navbar/>
        <div className="login_signup">
            <div className="LoginContainer">
                <div className="button_container">
                    <NavLink to="/Login" className="LoginButtonLP">Log in</NavLink>
                    <NavLink to="/Signup" className="SignupButtonLP">Create Account</NavLink>
                </div>
                        <h1>Log in to your account</h1>
                        <form onSubmit={handleLogin}>
                            <div className="login_signup_fields">
                                <div className="input-container">
                                    <FontAwesomeIcon icon={faEnvelope} className="input-icon"/>
                                    <input type="text" placeholder="Username" id="username" value={username} onChange={e => setUsername(e.target.value)} required></input>
                                </div>
                                <div className="input-container">
                                    <FontAwesomeIcon icon={faKey} className="input-icon"/>
                                    <input type={isPasswordVisible ? "text" : "password"} placeholder="Enter Your Password" value={password} onChange={e => setPassword(e.target.value)} required></input>
                                    <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} className="eye-icon" onClick={() => setIsPasswordVisible(!isPasswordVisible)}/>
                                </div>
                            </div>

                        <div className="FP">
                            <Link>Forgot Password?</Link>
                        </div>

                        <div className="login_signup_CB2">
                            <input type="checkbox" name="checkbox-loggedin" id="login_signup_checkbox2"/>
                            <p>Keep me logged in</p>
                        </div>

                        <input type="submit" value={"Log in"} className="CreatAccountMainButton"></input>

                        <div className="login_signup_alternative">
                            <hr/>
                            <p> or Log in with </p>
                            <hr/>
                        </div>

                        <div className="login_signup_social">
                            <Link className="social_icon">
                                <FontAwesomeIcon icon={faGoogle}/><span>Google</span>
                            </Link>
                            <Link className="social_icon">
                                <FontAwesomeIcon icon={faFacebook}/><span>Facebook</span>
                            </Link>
                        </div>
                    </form>
            </div>
        </div>
        <Footer/>
    </>
    )

    }
export default Login
