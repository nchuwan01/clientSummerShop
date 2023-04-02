import {useState } from "react";
import axios from "axios";
import "./../HomeCSS/homeStyle.css";
import cookies from "js-cookie";



function Sell() {
  const[item, setItem] = useState("");
  const[description,setDescription] = useState("");
  const[price,setPrice] = useState("");
  const[category, setCategory] = useState("Textbooks");
  const[image, setImage] = useState('');

  function handleImage(e)
  {

    setImage(e.target.files[0]);

  }

  function checkPrice(e){
    setPrice(e.target.value);
    if(e.target.value< -1 )
    {
      e.target.value = 0;
    }
    else {
      if(e.target.value > 5000)
      {
        e.target.value = 5000;
      }
    }

  }

  function handleForm(event)
  {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image",image);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("name", item);
  
    axios.post("http://3.141.202.170:4000/login/sell",formData, { headers: {
        withCredentials: true,
        cook: cookies.get("access-token")
    }})
    .then((res) =>{
      console.log(res.data);
      if(document.getElementById("message")==null){
        let newDiv = document.createElement("h1");
        let text = "";
        if(res.data === "Sign In")
        {
          text = document.createTextNode("Must be signed in to sell");
        }
        else 
        {
          text = document.createTextNode("Your item is on sale now!");
          newDiv.style.color = "yellow";

        }

        newDiv.append(text);
        newDiv.style.fontSize= `20px`;
        let innerDiv = document.getElementById("submitBtn");
        newDiv.id = "message";
        innerDiv.before(newDiv);
      }
    }
    )
  }


    return(
      <div>
        <form onSubmit={handleForm}>
          <div className="form-row">
            <div className="form-group col-md-3" id="messageBox">
              <label>Item Name</label>
              <input type="text"  maxLength={30} onChange={(e)=>{setItem(e.target.value)}} className="form-control" placeholder="Item Name" required/>
            </div>
            <div className="form-group  col-md-9">
              <label>Description</label>
              <textarea className="form-control" maxLength={150} onChange={(e)=>{setDescription(e.target.value)}} placeholder="ISBN(if book) or Any important information buyer needs to know about the product" required/>
            </div>
           
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Price</label>
              <input type="number"  min="0" max="5000" onChange={(e)=>{checkPrice(e)}} className="form-control" placeholder="45" required/>
            </div>
            
            <div className="form-group col-md-4">
              <label>Category</label>
              <select id="inputState" value={category} className="form-control" onChange={(e)=>{setCategory(e.target.value)}}>
                <option>Textbooks</option>
                <option>Electronics</option>
                <option>Household Item</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label>Image</label>
              <input type="file" aria-label="Upload Image" onChange={handleImage} className="form-control" id="inputPassword4" accept="image/*" required/>
            </div>
          </div>
          <div id="submitBtn">
              <button type="submit" id="sellButton" className="btn btn-light">Sell</button>
          </div>
        </form> 
      </div>
    );
  }
  
  export default Sell;
  