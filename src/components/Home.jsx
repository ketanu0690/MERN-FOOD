import React, { useState, useEffect } from "react";
import "./home.css";
import { useStateValue } from "../context/StateProvider";
import { Link } from "react-router-dom";
import f1 from "../images/f1.png";
import f2 from "../images/f2.png";
import f3 from "../images/f3.png";
import f4 from "../images/f4.png";
import f5 from "../images/f5.png";
import f6 from "../images/f6.png";
import { actionType } from "../context/reducer";
import CartItem from "./CartItem";
import { GetCart , AddToCart } from "../utils/mongodbFunctions";
import ff2 from "../images/ff2.jpeg";
import BhelMakhani2 from "../images/BhelMakhani2.jpg" 
import OilFreeChole1 from "../images/OilFreeChole1.jpg"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
const Home = () => {
  // add to cart funtionality
  const [{ foodItems, cartItems, user }, dispatch] = useStateValue();
  const [fooditems, setfooditems] = useState([]);
  const [cart, setCart] = useState([]);
  const [mogoadd, setmongoadd] = useState([]);
  const[alert ,setalert] = useState("");
  const [loading, setLoading] = useState(true);
  

  const fetchdata = async()=>{
    if(user && user._id){
     await GetCart(user._id).then((data) => {
       setCart( data.data.cart);
     });
   }
  }

  useEffect(() => {
    // Fetch cart data and set state
    fetchdata()
  }, [user,fooditems,mogoadd]);

  const addfooditem = (item) => {
    if(user){
      const existingProductIndex = cartItems.findIndex(
        (e) => e.foodID === item.foodID
      );

      if (existingProductIndex === -1) {
        // If the product is not in the cart, add it
        setfooditems([...cartItems, { ...item, quantity: 1 }]);

      } else {
        // If the product is already in the cart, increase its quantity
        const updatedCartItems = cartItems.map((cartItem, index) => {
          if (index === existingProductIndex) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          } else {
            return cartItem;
          }
  
        });
        setfooditems(updatedCartItems);
      }
    }
    else{
      setalert("Login To Continue")
      setTimeout(function() {
        setalert("")
      }, 1000);
    }
    
  
  };
  
  const addcartmongo = async(item_id)=>{
    console.log("cameing into addto mongo")
    if(user){
     await AddToCart(item_id,user._id).then((data)=>{
      // console.log(data)
        setmongoadd(data)
        setalert("Item Added")
       setTimeout(function() {
          setalert("")
        }, 1000);
        }).catch((err)=>{
          alert("Server Issue")
        console.log("Error occured",err)
        })
    }
    }
    const addtocart = () => {
      dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: fooditems,
      });
      localStorage.setItem("cartItems", JSON.stringify(fooditems));
    };
    const divStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundSize: 'cover',
      height: '400px'
    }
    const buttonStyle = {
      display: 'flex',
      padding: '15px',
      backgroundColor: '#009879',
      justifyContent: 'center',
      textAlign: 'center',
      alignItem:'center',
      borderRadius: '5px',
      color: 'white',
      borderRadius:'25px',
      fontSize: '18px',
      fontWeight: 'bold',
      margin: '10px',
      cursor: 'pointer',
      textDecoration:'none',
      transition: 'background-color 0.3s ease-in-out'
    };

    const slideImages = [
      {
        url: BhelMakhani2,
        caption: 'Healthified tasty breakfast meals',
        linkto: "#breakfast"
      },
      {
        url: OilFreeChole1 ,
        caption: 'Subscribe for Daily Breakfast Packages',
        linkto: "#lunch"
      },
      {
        url: ff2,
        caption: 'Exclusive range of fitness equipments',
        linkto: "#fitness"
      },
    ];


  useEffect(() => {
    addtocart();
  }, [fooditems]);

  return (
    <div>
    <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
              <div className="sliderInfo">
              {/* <span className="spanStyle" >  */}
              <h1>{slideImage.caption} </h1>
              {/* </span> */}
                <a  style={buttonStyle} href={slideImage.linkto}> Comming Soon </a>
              </div>
             
              </div>
            </div>
          ))} 
        </Slide>
      </div>


      <section id="product1" class="section-p1">
        <div id="breakfast"></div>
        <h1>Breakfast</h1>
        <p>Enjoy our range of healthy and fresh breakfast.</p>

        <div class="pro-container card-slider" id="shop-section1">
          {foodItems &&
            foodItems
              .filter((item) => item.foodType === "breakfast")
              .map((item) => (
                <React.Fragment key={item.id}>
                  <CartItem item={item} addfooditem={addfooditem} addcartmongo={addcartmongo}/>
                </React.Fragment>
              ))}


        </div>
        <div id="lunch"></div>
        <h1>Lunch</h1>
        <p>Enjoy our nutritious lunch.</p>
        <div class="pro-container card-slider" id="shop-section2">
          {foodItems &&
            foodItems
              .filter((item) => item.foodType === "lunch")
              .map((item) => (
                <React.Fragment key={item.id}>
                <CartItem item={item} addfooditem={addfooditem} addcartmongo={addcartmongo}/>
                </React.Fragment>
              ))}
        </div>
        <div id="fitness"></div>
        <h1>Fitness Equipment</h1>
        <p>We have variety of fitness equipments.</p>
        <div class="pro-container card-slider" id="shop-section3">
        {foodItems &&
            foodItems
              .filter((item) => item.foodType === "fitness")
              .map((item) => (
                <React.Fragment key={item.id}>
                <CartItem item={item} addfooditem={addfooditem} addcartmongo={addcartmongo}/>
                </React.Fragment>
              ))}
        </div>
      </section>
      <section id="feature" class="section-p1">
        <div class="fe-box">
          <img src={f1} alt="" />
          <h6>Free Shipping</h6>
        </div>
        <div class="fe-box">
          <img src={f2} alt="" />
          <h6>Online Order</h6>
        </div>
        <div class="fe-box">
          <img src={f3} alt="" />
          <h6>Save Money</h6>
        </div>
        <div class="fe-box">
          <img src={f4} alt="" />
          <h6>Promotions</h6>
        </div>
        <div class="fe-box">
          <img src={f5} alt="" />
          <h6>Happy Sell</h6>
        </div>
        <div class="fe-box">
          <img src={f6} alt="" />
          <h6>Vegan</h6>
        </div>
      </section>


{fooditems&&fooditems.length>0?
<Link to="/cart" id="floatingButton">
      <div id="cartquantity">{fooditems?fooditems?.length:0}</div>
      <img src="https://img.icons8.com/pastel-glyph/64/000000/shopping-cart--v1.png"/>
      </Link>:<></>
}
      

      {alert&&(<div id="alert-box"> <p>{alert}</p>  </div>)}
    </div>
  );
};
export default Home;