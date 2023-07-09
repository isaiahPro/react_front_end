import React, { useEffect, useState } from 'react';
import "../Style/laptop.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PhoneList } from '../ItemLIsts/AllItemList';


function App() {
  const [Phones, setphones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    async function fetchData() {
      const data = await PhoneList();
      setphones(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="container d-flex justify-content-center align-items-center">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: 'white', fontSize: '100px', marginTop: '30vh', marginBottom: '50vh' }} />
      </div>
    );
  }


  return (
    <div className="container">
      <h1 className="laptop_head">Phone Lists</h1>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        { Phones.map(phone => (
          <div key={phone._id} className="col">
            <div className="card h-100">
              <img src={`http://localhost:5000/uploads/${phone.image}`} className="card-img-top" alt={phone.name} />
              <div className="card-body"  id='laptop_list_container'>
                <h5 className="card-title">{phone.name}</h5>
                <ul className="list-unstyled">
                  <li><strong>Brand:</strong> {phone.brand}</li>
                  <li><strong>Model:</strong> {phone.model}</li>
                  <li><strong>Price:</strong> ${phone.price}</li>
                  <li><strong>Storage:</strong> {phone.storage}</li>
                  <li><strong>RAM:</strong> {phone.ram}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;