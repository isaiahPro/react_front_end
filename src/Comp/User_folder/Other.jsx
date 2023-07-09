import React, { useEffect, useState } from 'react';
import "../Style/laptop.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function App() {
  const {identity} = useParams();
  const [Others, setOthers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecords() {
      const response = await axios.get(`http://localhost:5000/api/others/search/${identity}`);
      setOthers(response.data);
      setIsLoading(false);
    }
    fetchRecords();
  },);

  if (isLoading) {
    return (
      <div className="container d-flex justify-content-center align-items-center">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" className='loadAnima' />
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="laptop_head">Other Lists</h1>

      {Others.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }} id='no_data_file'>
          <h2>No data available</h2>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          { Others.map(other => (
            <div key={other._id} className="col">
              <div className="card h-100">
                <img src={`http://localhost:5000/uploads/${other.image}`} className="card-img-top" alt={other.name} />
                <div className="card-body"  id='laptop_list_container'>
                  <h5 className="card-title">{other.name}</h5>
                  <ul className="list-unstyled">
                    <li><strong>Brand:</strong> {other.brand}</li>
                    <li><strong>Model:</strong> {other.model}</li>
                    <li><strong>Price:</strong> ${other.price}</li>
                    <li><strong>Storage:</strong> {other.storage}</li>
                    <li><strong>RAM:</strong> {other.ram}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;