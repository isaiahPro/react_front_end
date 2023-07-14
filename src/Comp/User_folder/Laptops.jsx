import React, { useEffect, useState } from 'react';
import "../Style/laptop.css";
import { LaptopList } from '../ItemLIsts/AllItemList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const BucketURL=process.env.REACT_APP_SUPABASE_URL;
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
          <div key={laptop.id} className="col">
            <div className="card h-100">
              <img src={`${BucketURL}/bucketFile/images/${laptop.image}.jpg`} className="card-img-top" alt={laptop.name} />
              <div className="card-body"  id='laptop_list_container'>
                <h5 className="card-title">{laptop.name}</h5>
                <ul className="list-unstyled">
                  <li><strong>Name:</strong> {laptop.name}</li>
                  <li><strong>Price:</strong> ${laptop.price}</li>
                  <li><strong>Storage:</strong> {laptop.storage}GB</li>
                  <li><strong>RAM:</strong> {laptop.ram}GB</li>
                  <li><strong>Graphics Card:</strong> {laptop.graphicscard}</li>
                  <li><strong>Display Size:</strong> {laptop.displaysize}</li>
                  <li><strong>DATE:</strong> {laptop.created_at}</li>
                 
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