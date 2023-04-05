import React, { useState } from 'react';
import {Link} from "react-router-dom";
import Logo from "./../images/logoBg.png";
import axios from "axios";
import { APILocation } from '../httpAPILocation/httpLocation';
function Create_Account() {
    const[username, setUsername] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[confirm_password, setconfirm_password] = useState("");

    const data= {
        user_name: username,
        email: email,
        password: password
    }

    function registerSubmitted(event)
    {
        event.preventDefault();
        let message = "";
        if(!document.getElementById("message"))
        {
            let newDiv = document.createElement("div");
            let innerDiv = document.getElementById("logo_img");
            newDiv.id = "message";
            innerDiv.after(newDiv)
        }
        
        if(password !== confirm_password)
        {   
            message = "Password needs to match. Please try again"
            document.getElementById("message").innerHTML = message;

        }else{
            axios.post(`${APILocation}/register`, data)
            .then(response =>{
                message = response.data;
                document.getElementById("message").innerHTML = message;
            })
        }
                
    }

    return (
        <div id="text_form">
            <form onSubmit={registerSubmitted}>
                <div id="main_flex">
                    <div id="img_div">

                        <div>
                            <img id="logo_img" alt="summershop Logo" src={Logo}/>
                        </div>

                    </div>
                    <div className="label_input">
                        <label> Username: </label>
                        <input type="text" className="createInputs" value={username} onChange={(e)=>{setUsername(e.target.value)}} name="user_name" placeholder="Username" required></input>
                    </div>
                    <div className="label_input">
                        <label> Email: </label>
                        <input type="email" className="createInputs" value={email} onChange={(e)=>{setEmail(e.target.value)}} pattern=".+@aurora.edu" name="email" placeholder="Ex: john02@aurora.edu" required></input>
                    </div>
                    <div className="label_input">
                        <label> Password: </label>
                        <input onChange={(e) =>{setPassword(e.target.value)}} value={password}  className="createInputs" type="password" name="password" placeholder="Password" required></input>
                    </div>

                    <div className="label_input">
                        <label> Confirm Password: </label>
                        <input onChange={(e) => setconfirm_password(e.target.value)} value={confirm_password} type="password" placeholder="Retype Password" className="createInputs" required></input>
                    </div>
                    <div id="password_message">
                        <span id="span_password"></span>
                    </div>
                    <div className="Login_ButtonLink" >
                        <div id="sign_button">
                            <button id="button_submit" type='submit' className='btn btn-primary p-0'>Create</button>
                        </div>
                            <Link to="/" id='sign_in_link'>Sign In</Link>
                    </div>
                </div>
            </form>
      </div>
    );
}

export default Create_Account;