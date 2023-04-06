import { useState } from "react";
import {Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../HomeCSS/homeStyle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from "../../images/logoBg.png";
import {faBook, faComputer, faHouse, faMoneyBill, faPlus,faBars} from "@fortawesome/free-solid-svg-icons";
import "./styleNavBar.CSS";
import {APILocation} from "../../httpAPILocation/httpLocation";



function HomePage_Nav() {
  const[username, setUsername] = useState("");
  const navigate = useNavigate();


  function logoutClicked()
  {
    axios.post(`${APILocation}/logout`)
    .then(res =>{
      navigate("/");      
    })
    .catch(err=>{
      navigate("/");
    }
    )
  }


  axios.get(`${APILocation}/login`,  {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': true,
      }
    })
  .then(result => {
    if(result.data)
    {
      console.log(result)
      if(result.data === "Sign In")
      {
        setUsername("Sign In")
      }
      else
      {
        setUsername(result.data);
      }
    }
  }).catch(c =>{
    console.log("Error!")
    console.log(c);
  })


  
    return (
      <div className="App">
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/login/Textbooks" id="imgLink"><img id="logoImg" alt="Summershop logo" className="navbar-brand" src={Logo} href="#" /></Link>
            <Link to="/menu" className="navbar-toggler burgerNav" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <FontAwesomeIcon icon={faBars} />
            </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <div className="fontAweDiv">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/login/Textbooks">Textbook<span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="fontAwe" >
                    <FontAwesomeIcon icon={faBook} />                 
                  </li>
                </div>
                
                <div className="fontAweDiv">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/login/Electronics">Electronics<span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="fontAwe" >
                      <FontAwesomeIcon  icon={faComputer} />                  
                  </li>
                </div>
                
                <div className="fontAweDiv">
                      <li className="nav-item active">
                        <Link className="nav-link" to="/login/Household">Household Items<span className="sr-only">(current)</span></Link>
                      </li>
                      <li className="fontAwe" >
                            <FontAwesomeIcon  icon={faHouse} />                  
                      </li>
                </div>
                
                  <div className="fontAweDiv">
                      <li className="nav-item active">
                        <Link className="nav-link" to="/login/Other">Other<span className="sr-only">(current)</span></Link>
                      </li>
                      <li className="fontAwe" >
                          <FontAwesomeIcon  icon={faPlus} />                  
                      </li>
                  </div>
              </ul>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav fontAweDiv">
                <li className="nav-item active">
                  <Link className="nav-link" to="/login/Sell">Sell<span className="sr-only">(current)</span></Link>
                </li>
                <li className="fontAwe" >
                  <FontAwesomeIcon  icon={faMoneyBill} />                  
                </li>
              </ul>       
            </div>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    {username==="Sign In" ? <Link to="/"><button className="btn btn-outline-primary"> Sign In</button></Link> : <small>Welcome, {username}! <button className="btn btn-outline-secondary" onClick={()=>{logoutClicked()}}>Sign Out</button></small> }
                  </li>
                </ul>
                
            </div>
          </nav>
          <Outlet />
        </div>
      </div>
    );
  }
  
  export default HomePage_Nav;
  