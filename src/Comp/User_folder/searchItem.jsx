import React from 'react'
import "../Style/sarchitem.css"

function SearchItem({ name, price, id }) {
    return (
      <div className='searchItemMain'>
        <strong>{name}</strong>
        <section><strong>Price:</strong>{price}</section>
        <p><a href={`/view/${id}`} id='itemlistwithPrice_view'>View</a></p>
      </div>
    );
  }
export default SearchItem