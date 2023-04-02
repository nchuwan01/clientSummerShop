import React, { useState } from 'react';
import {Link} from "react-router-dom";
import Logo from "./../images/logoBg.png";
import axios from "axios";

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
        axios.post("http://18.191.202.74:4000/register", data)
        .then(response =>{

            if(document.getElementById("message") == null){
                let newDiv = document.createElement("div");
                let text = document.createTextNode(response.data);
                newDiv.append(text);
                let innerDiv = document.getElementById("logo_img");
                newDiv.id = "message";
                innerDiv.after(newDiv)
                
            }else{
                document.getElementById("message").innerHTML = response.data;
            }
            
        })
    }

    

    function passwordCheck(e)
    {
        e.preventDefault();
        setPassword(e.target.value);
        if(confirm_password !== "")
        {
            password_commenter(e.target.value);
        }

    }
    function confirmPassword(e)
    {
        e.preventDefault();
        setconfirm_password(e.target.value);
        password_commenter(e.target.value);
       
    }
    function password_commenter(val)
    {
        let span_id = document.getElementById("span_password");
        let button_submit = document.getElementById("button_submit");
        if(val !== confirm_password && val !== password)
        {
            span_id.innerHTML = "Password not matching...."
            span_id.style.color = "red";
            button_submit.disabled = true;
        }
        else{
            
            span_id.style.color = "green";
            span_id.innerHTML = "Password matched"
            button_submit.disabled = false;


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
                        <small className="passwordWarning">Please use a different password than your usual one</small>

                    </div>
                    <div className="label_input">
                        <label> Username: </label>
                        <input type="text" onChange={(e)=>{setUsername(e.target.value)}} name="user_name" placeholder="Username" required></input>
                    </div>
                    <div className="label_input">
                        <label> Email: </label>
                        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} pattern=".+@aurora.edu" name="email" placeholder="Ex: john02@aurora.edu" required></input>
                    </div>
                    <div className="label_input">
                        <label> Password: </label>
                        <input onChange={(e) =>{passwordCheck(e)}}  type="password" name="password" placeholder="Password" required></input>
                    </div>

                    <div className="label_input">
                        <label> Confirm Password: </label>
                        <input onChange={(e) =>{confirmPassword(e)}}  type="password" placeholder="Retype Password" required></input>
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