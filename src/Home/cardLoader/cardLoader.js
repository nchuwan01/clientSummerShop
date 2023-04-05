import {useState } from "react";
import axios from "axios";
import "./../HomeCSS/homeStyle.css";
import { useNavigate } from "react-router-dom";
import {APILocation} from "../../httpAPILocation/httpLocation";

 function CardLoader({categoryType}) {
    const [householdData, setHouseholdData] = useState([]);
    let navigate = useNavigate();

    let arrayInfo = [];

      axios
        .get(`${APILocation}/login/sell`)
        .then((res) => {
            let data = res.data;
           data.map((item)=>{
              if(item.category === categoryType)
              {
                arrayInfo.push(item);    
              }   
              arrayInfo = arrayInfo.reverse();
              setHouseholdData(arrayInfo);
              return householdData;
            })



        })
        .catch((error) => {
          console.log(error);
        });

    

    function clicked(itemData)
    {
      navigate("/login/item/"+itemData.itemID)
    }

    return (
      <div>

          <div className="cardDiv">
          {
          
          householdData.map((item) => (
              <div key={item.itemID} value={item.itemID} onClick={()=>clicked(item)} className="cardIO">   
                  <div className="imgDiv">
                    {item.image ? 
                    <img className="innerImg" src={`${APILocation}/images/${item.image}`} alt={item.name}/>
                      : <div> Loading....</div>}
                  </div>
                  <div className="card-footer">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text" id="priceParagraph">${item.price}</p>
                    <small className="text-muted">Posted on {Date(item.created_at).slice(0,16)}</small>
                  </div>
              </div>
          ))}
          </div>
      </div>
    )
  }
  
  export default CardLoader;
