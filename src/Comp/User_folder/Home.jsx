import React from 'react';
import '../Style/userhome.css';
import { useState,useEffect } from 'react';
import HomeImage04 from "../Asset/HomeImage04.jpg"
import HomeImage03 from "../Asset/HomeImage3.jpg";
import HomeImage02 from "../Asset/homeImage2.jpg";
import HomeImage01 from "../Asset/homeImage1.jpg";
import { PhoneListLimit,LaptopListlimit,OtherListLimit } from '../ItemLIsts/AllItemList';
const BucketURL=process.env.REACT_APP_SUPABASE_URL;

function Home() {
  const [showButton, setShowButton] = useState(false);
  const [laptops, setLaptops] = useState([]);
  const [phones, setPhones] = useState([]);
  const [other, setOthers] = useState([]);
  const [direct, setDirect]= useState('');
  const images= [
    HomeImage01,
    HomeImage02,
    HomeImage03,
    HomeImage04,
  ];

  useEffect(()=>{
    async function fetchData01() {
      const data01 = await LaptopListlimit();
      setLaptops(data01);
    }
    fetchData01();
    async function fetchData02() {
      const data02 = await PhoneListLimit();
      setPhones(data02);
    }
    fetchData02();
    async function fetchData03() {
      const data03 = await OtherListLimit();
      setOthers(data03);
    }
    fetchData03();
  })
 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const buttonStyle = {
   
    display: showButton ? 'block' : 'none', // show or hide the button based on state
  };

  const handleMouseMove = (event) => {
  setDirect(event.clientX);
  const screenWidth = window.innerWidth
    
  if (direct >= screenWidth - 100) { // show the button if the mouse is in the right area
    setShowButton(true);
  } else {
    setShowButton(false);
  }

  };

  useEffect(() => {
    
    const interval = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  return (
    <div className="home"  onMouseMove={handleMouseMove}  >
      <h1 style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
      }}
      className='home_welcome_text'
      ><p className='home_welcome_text_inner'>Welcome To<br />DAVE ELECTONICS Website</p></h1>
      <hr />
      <h2 className="category-title">Laptops</h2>
      <ul className="category-list">
        {laptops.map((laptop, index) => (
          <li key={index}>
            <img src={`${BucketURL}/bucketFile/images/${laptop.image}.jpg`} alt={laptop.name} />
            <div className="itemlistwithPrice">
            <section id='itemlistwithPrice_price' > <span id='innerspan_bold'></span>{laptop.name}</section>
              <section id='itemlistwithPrice_price' > <span id='innerspan_bold'>Price: </span>{laptop.price}Birr</section>
              <section><a href={`/view/${laptop.id}/${laptop.type}`} id='itemlistwithPrice_view'>View</a></section>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="category-title">Phones</h2>
      <ul className="category-list">
        {phones.map((phone, index) => (
          <li key={index}>
            <img src={`${BucketURL}/bucketFileImage/images/${phone.image}.jpg`} alt={phone.name} />
            <div className="itemlistwithPrice">
            <section id='itemlistwithPrice_price' > <span id='innerspan_bold'></span>{phone.name}</section>
              <section id='itemlistwithPrice_price' > <span id='innerspan_bold'>Price: </span>{phone.price}Birr</section>
              <section><a href={`/view/${phone.id}/${phone.type}`} id='itemlistwithPrice_view'>View</a></section>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="category-title">Other Electronics</h2>
      <ul className="category-list">
        {other.map((electronic, index) => (
          <li key={index}>
            <img src={`${BucketURL}/bucketFileImage01/images/${electronic.image}.jpg`} alt={electronic.name} />
            <div className="itemlistwithPrice">
            <section id='itemlistwithPrice_price' > <span id='innerspan_bold'></span>{electronic.name}</section>
              <section id='itemlistwithPrice_price' > <span id='innerspan_bold'>Price: </span>{electronic.price}Birr</section>
              <section><a href={`/view/${electronic.id}/${electronic.maintype}`} id='itemlistwithPrice_view'>View</a></section>
            </div>
          </li>
        ))}
      </ul>
      <footer className="footer">
        <a href="contact-us.html">Contact Us</a>
      </footer>
      <a href="/signin" className="adminButton" style={buttonStyle}>Admin</a>

    </div>
  );
}

export default Home;