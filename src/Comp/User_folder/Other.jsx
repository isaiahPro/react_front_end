import React, { useEffect, useState } from 'react';
import "../Style/laptop.css";
import supabase from '../supabase';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const BucketURL=process.env.REACT_APP_SUPABASE_URL;

function App() {
  const {identity} = useParams();
  const [Others, setOthers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecords() {
      
let { data: others, error:itemsError } = await supabase
.from('others')
.select('*')
.eq('type', `${identity}`);
     
      setIsLoading(false);
      if (itemsError) {
        console.error(itemsError);
        return;
      }
      else{
        setOthers(others);
      }
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
            <div key={other.id} className="col">
              <div className="card h-100">
                <img src={`${BucketURL}/bucketFileImage01/images/${other.image}.jpg`} className="card-img-top" alt={other.name} />
                <div className="card-body"  id='laptop_list_container'>
                  <h5 className="card-title">{other.name}</h5>
                  <ul className="list-unstyled">
                    <li><strong>name:</strong> {other.name}</li>
                    <li><strong>Price:</strong> {other.price} Birr</li>
                    <li><strong>Type:</strong> {other.type}</li>
                    <li><strong>DATE:</strong> {other.created_at}</li>
                    <li><strong>Description:</strong> {other.message}</li>
                   
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