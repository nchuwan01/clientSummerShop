import { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import "./CardModal.css";
import axios from "axios";
import cookies from "js-cookie"
import {APILocation} from "../../httpAPILocation/httpLocation";



function CardModal()
{ 
  const[image, setImage]= useState("");
  const[sid, setSid] = useState();
  const[name,setName] = useState();
  const[description, setDescription] = useState();
  const[price, setPrice] = useState();
  const[message, setMessage] = useState();
  const[owner, setOwner] = useState(true);
  const[poster, setPoster] = useState();

  const {itemId} = useParams();


  let navigate = useNavigate();

  useEffect(() => {
  

  
    const fetchData = async () => {
      try {
        // Get item details
        const itemRes = await axios.get(`${APILocation}/login/item/${itemId}`);
        const { sid, name, description, price, image } = itemRes.data[0];
        setSid(sid);
        setName(name);
        setDescription(description);
        setPrice(price);
        setImage(image);
  
        // Get poster details
        const userRes = await axios.get(`${APILocation}/login/user/${sid}`);
         setPoster(userRes.data);
  
        // Check if the logged-in user is the owner of the item
        const resultRes = await axios.get(`${APILocation}/login`,{
            withCredentials: true,
          }
        );
        const resultData = resultRes.data;
        console.log("result data: ",resultData)
        if (resultData === userRes.data) {
          setOwner(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });


      function handleSubmit(event)
      {   
        event.preventDefault();     
        axios.post(`${APILocation}/login/message`,[{ "sid":sid, "message": message, "itemName": name} ], 
          {
            withCredentials: true        
          })
        .then(res =>{
          console.log(res.data);
          if(document.getElementById("message")==null){
            let newDiv = document.createElement("h1");
            let text = "";
            if(res.data === "Sign In")
            {
              text = document.createTextNode("Must be Signed in to send email");
            }
            else 
            {
              
              text = document.createTextNode("Email Has Been Sent");
              document.getElementById("sendMessageButton").value = " ";
              newDiv.style.color = "green";
            }

            newDiv.append(text);
            newDiv.style.fontSize= `20px`;
            let innerDiv = document.getElementById("messageBox");
            newDiv.id = "message";
            innerDiv.after(newDiv);
            
          }
        })
      }

      function deletePost()
      {
        console.log(cookies.get("access-token"));
        axios.get(`${APILocation}/login/delete/`+itemId, {
            withCredentials: true,
          })
        .then(res=>{
          navigate(-1);  

        })

      }
    return (
        <div id="mainDivOfModal">
          <div className="row g-3 modalCardDiv" >
            <div className="col-sm-7 detailCard">
              <div className="modalDivs">
                {image ? <img className="innerImg modalImage" src={`${APILocation}/images/${image}`} alt={name}/>
                  : <div>Loading....</div>}
              </div>
              {owner ? <form id="modalForm" onSubmit={handleSubmit}>
                <div className="modalDivs" id="messageBox">
                  <textarea maxLength="150" onChange={(e)=>{setMessage(e.target.value)}} id="textAreaModal" placeholder="Ex: Hey, I would love to purchase this. Please Email Me Back!(Max 150 characters)" required></textarea>
                </div>
                <div className="modalDivs">
                  <button id="sendMessageButton" type="submit" className="btn btn-outline-primary">Send Message to {poster}</button>
                </div>
              </form> : <div className="modalDivs"> <button onClick={()=> deletePost()} id="deletePost" className="btn btn-outline-danger">Delete</button> </div>}
              <div className="modalDivs">
                <div className="card-text" id="descriptionParagraph">{name}</div>
              </div>
              <div className="modalDivs">
                <div className="card-text" id="descriptionParagraph">{description}</div>
              </div>
              <div className="modalDivs">
                <div className="card-text" id="priceParagraph">${price}</div>
              </div>  
              <div className="modalDivs">
                <small className="text-muted">Posted by {poster} </small> 
              </div>
            </div>
          </div>
        </div>
     );
}
export default CardModal;