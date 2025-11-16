import React, { useEffect, useState } from 'react';
import './newcollection.css';
import Item from '../Item/Item';
// <--- IMPORTANT
const API_URL = "https://fashion-web-7skw.onrender.coms";

const NewCollections = () => {
  const [new_collection, setNew_Collection] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/newcollection`)   // <--- REPLACED LOCALHOST
      .then(res => res.json())
      .then(data => setNew_Collection(data))
      .catch(err => console.error("Failed to load new collection:", err));
  }, []);

  return (
    <div className='new-collections'>
      <h1>RECENTLY ADDED</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => (
          <Item 
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
}

export default NewCollections;
