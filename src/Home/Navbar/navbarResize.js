import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../HomeCSS/homeStyle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from "../../images/logoBg.png";
import {faBook, faComputer, faHouse, faPlus, faBarsStaggered, faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import "./navbarResizeStyle.css";
import cookies from "js-cookie";
import {APILocation} from "../../httpAPILocation/httpLocation";



function NavbarResize() {

    const[username, setUsername] = useState("");
    const navigate = useNavigate();
  
    function navHamburgerClicked()
    {
      navigate(-1);
    }
    function logoutClicked()
    {
      axios.post(`${APILocation}/logout`)
      .then(res =>{
        cookies.remove("access-token");
        navigate("/");
        
      })
      .catch(err=>{
        navigate("/");
      }
      )
    }
  
  
    axios.get(`${APILocation}/login`, {
        withCredentials: true    
      })
    .then(result => {
      if(result.data)
      {
        if(result.data === "Sign In")
        {
          setUsername(result.data)
          console.log("From sign in ",result.data)
        }
        else
        {
          console.log("from logged in " ,result.data)
          setUsername(result.data);
        }
      }
    }).catch(c =>{
      console.log("Error!")
      console.log(c);
    })
  
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/login/Textbooks" id="imgLink"><img id="logoImg"  alt= "logo" className="navbar-brand" src={Logo} href="#" /></Link>
            <Link onClick={()=>navHamburgerClicked()} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <FontAwesomeIcon icon={faBarsStaggered} />
            </Link>    
        </nav>
        <ul className="navbar-nav sideNav">
            <div id="sideNavDiv">
                <div className="middleDiv">
                    <li>
                        <Link to="/login/Textbooks">Textbook<span className="sr-only">(current)</span></Link>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faBook} />                 
                    </li>
                </div>
                    
                <div className="middleDiv">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/login/Electronics">Electronics<span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="fontAwe" >
                        <FontAwesomeIcon  icon={faComputer} />                  
                    </li>
                </div>
                    
                <div className="middleDiv">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/login/Household">Household<span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="fontAwe">
                         <FontAwesomeIcon  icon={faHouse} />                  
                    </li>
                </div>
                    
                <div  className="middleDiv">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/login/Other">Other<span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="fontAwe" >
                        <FontAwesomeIcon  icon={faPlus} />                  
                    </li>
                </div>
                <div className="middleDiv">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/login/Sell">Sell<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="fontAwe" >
                            <FontAwesomeIcon  icon={faMoneyBill} />                  
                        </li>
                </div>
                <div className="middleDiv">
    
                    <li className="nav-item active">
                        {username==="Sign In"?<Link to="/"><button className="btn btn-outline-primary"> Sign In</button></Link> : <small>Welcome, {username}! <button className="btn btn-outline-secondary" onClick={()=>{logoutClicked()}}>Sign Out</button></small> }
                    </li>
                </div>
            </div>
                
        </ul>
            
      </div>
    )
  }
  
  export default NavbarResize;
  