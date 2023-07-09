import React, { useEffect, useState } from 'react';
import "../Style/laptop.css";
import { LaptopList } from '../ItemLIsts/AllItemList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const DB_Api=process.env.REACT_APP_API_KEY;
function App() {
  const [laptops, setLaptops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      const data = await LaptopList();
      setLaptops(data);
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
      <h1 className="laptop_head">Laptops Lists</h1>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        { laptops.map(laptop => (
          <div key={laptop._id} className="col">
            <div className="card h-100">
              <img src={`${DB_Api}/uploads/${laptop.image}`} className="card-img-top" alt={laptop.name} />
              <div className="card-body"  id='laptop_list_container'>
                <h5 className="card-title">{laptop.name}</h5>
                <ul className="list-unstyled">
                  <li><strong>Brand:</strong> {laptop.brand}</li>
                  <li><strong>Model:</strong> {laptop.model}</li>
                  <li><strong>Price:</strong> ${laptop.price}</li>
                  <li><strong>Processor:</strong> {laptop.processor}</li>
                  <li><strong>Storage:</strong> {laptop.storage}</li>
                  <li><strong>RAM:</strong> {laptop.ram}</li>
                  <li><strong>Graphics Card:</strong> {laptop.graphicsCard}</li>
                  <li><strong>Operating System:</strong> {laptop.operatingSystem}</li>
                  <li><strong>Display Size:</strong> {laptop.displaySize}</li>
                  {/* <li><strong>Display Resolution:</strong> {laptop.displayResolution}</li>
                  <li><strong>Ports:</strong> {laptop.ports.join(', ')}</li> */}
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