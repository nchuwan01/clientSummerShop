import { useNavigate, Link } from "react-router-dom";
import "./login_css/sign_in.css";
import Logo from "./../images/logoBg.png";
import { useState } from "react";
import axios from "axios";
import { APILocation } from '../httpAPILocation/httpLocation';

function Sign_In() {
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");

  const navigate = useNavigate();

  function submitted()
  {
    const data ={
      user_name: username,
      password: password
    }
    axios.post(`${APILocation}/login`, data,{
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': true,
      }
    })
    .then(res =>{
      if(res.data.detail)
      {  
        navigate("/login/Textbooks");
      }else{
        navigate("/");
        if(document.getElementById("message")==null){
          let newDiv = document.createElement("div");
          let text = document.createTextNode(res.data);
          newDiv.append(text);
          let innerDiv = document.getElementById("img_div");
          newDiv.id = "message";
          innerDiv.after(newDiv)
        }
      }
    })
  }
    return (
      <div id="text_form">

          <div id="main_flex">
              <div id="img_div">
                <Link to="/login/textbooks"><img id="logo_img" alt="SummerShop Logo" src={Logo}/></Link>
              </div>
              <div className="label_input">
                  <label>Username: </label>
                  <input type="text" placeholder="Username" name="user_name" onChange={(e)=>{setUsername(e.target.value)}}  required></input>
              </div>
              <div className="label_input">
                  <label>Password: </label>
                  <input type="password" placeholder="Password" name="password" onChange={(e)=>{setPassword(e.target.value)}} required></input>
              </div>
              <div id="sign_in">
                  <div id="sign_button">
                    <button type="submit" onClick={submitted} className='btn btn-primary p-0' value="Sign In">Sign In</button>
                  </div>
                  <Link to="/register" id="create">Create Account</Link>
              </div>
          </div>
      </div>
    );
  }
  
  export default Sign_In;
  