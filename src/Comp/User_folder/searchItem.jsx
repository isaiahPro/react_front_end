import React from 'react'
import "../Style/sarchitem.css"

function SearchItem({ name, price, id, type }) {
    return (
      <div className='searchItemMain'>
        <strong>{name}</strong>
        <section><strong>Price:</strong>{price}</section>
        <section><a href={`/view/${id}/${type}`} id='itemlistwithPrice_view'>View</a></section>
      </div>
    );
  }
export default SearchItem