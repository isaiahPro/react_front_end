import React, { useEffect, useState } from 'react';
import firebase from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../Style/admin.css'; 
import AddNewLaptop from './AddLaptops';

function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const onClickHandler = () => {
    firebase.signOut();
    navigate('/signin');
  };
  const [showLaptops, setShowLaptops] = useState(false);
  const [showPhones, setShowPhones] = useState(false);
  const [showOther, setShowOther] = useState(false);

  const phones = ['iPhone', 'Samsung', 'Google Pixel'];
  const otherItems = ['Headphones', 'Speakers', 'Webcams'];

  const handleLaptopsClick = () => {
    setShowLaptops(!showLaptops);
    setShowPhones(false);
    setShowOther(false);
  };

  const handlePhonesClick = () => {
    setShowLaptops(false);
    setShowPhones(!showPhones);
    setShowOther(false);
  };

  const handleOtherClick = () => {
    setShowLaptops(false);
    setShowPhones(false);
    setShowOther(!showOther);
  };

  return (
    <div className="Admin_box">
      {user ? (
        <div className="container">
          <div className="buttons">
            <h2>Admin Dashboard</h2>
            <button onClick={handleLaptopsClick}>Add Laptops</button>
            <button onClick={handlePhonesClick}>Add Phones</button>
            <button onClick={handleOtherClick}>Add Other</button>
            <button onClick={onClickHandler}>Sign Out</button>
          </div>
          <div className="list">
            {showLaptops && (
              <div>
                <AddNewLaptop/>
              </div>
            )}

            {showPhones && (
              <div>
                <h3>Phones</h3>
                <ul>
                  {phones.map((phone) => (
                    <li key={phone}>{phone}</li>
                  ))}
                </ul>
              </div>
            )}

            {showOther && (
              <div>
                <h3>Other Items</h3>
                <ul>
                  {otherItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p style={{ color: 'red' }}>
          Please sign in to access this page. <a href="/signin">Login</a>
        </p>
      )}
    </div>
  );
}

export default Admin;