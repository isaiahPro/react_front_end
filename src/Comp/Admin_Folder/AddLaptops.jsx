import { useRef } from 'react';
import supabase from '../supabase';
import './adminStyle.css';

function AddItemForm() {
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const storageRef = useRef(null);
  const ramRef = useRef(null);
  const graphicscardRef = useRef(null);
  const displaysizeRef = useRef(null);
  const portsRef = useRef(null);
  const imageFileRef = useRef(null);
  const errorRef = useRef(null);
  const successRef = useRef(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const name = nameRef.current.value;
    const price = priceRef.current.value;
    const storage = storageRef.current.value;
    const ram = ramRef.current.value;
    const graphicscard = graphicscardRef.current.value;
    const displaysize = displaysizeRef.current.value;
    const ports = portsRef.current.value;
    const imageFile = imageFileRef.current.files[0];

    // Generate a random number to use as the image name
    const imageName = Math.floor(Math.random() * 1000000);

    // Upload the image file to SupaBase Storage with the random number as the filename
    const { error: uploadError } = await supabase.storage
      .from('bucketFile')
      .upload(`images/${imageName}.jpg`, imageFile);

    if (uploadError) {
      errorRef.current.textContent = uploadError.message;
      return;
    }

    // Insert the item data into the my_table table
    const {  error } = await supabase
      .from('laptops')
      .insert([
        {
          name,
          price,
          storage,
          ram,
          graphicscard,
          displaysize,
          port: ports,
          image: imageName,
        },
      ]);

    if (error) {
      errorRef.current.textContent = error.message;
      return;
    }

    nameRef.current.value = '';
    priceRef.current.value = '';
    storageRef.current.value = '';
    ramRef.current.value = '';
    graphicscardRef.current.value = '';
    displaysizeRef.current.value = '';
    portsRef.current.value = '';
    imageFileRef.current.value = '';
    errorRef.current.textContent = '';
    successRef.current = true;
  }

  return (
    
    <form onSubmit={handleSubmit} className="add-laptop-form">
      <label className="form-label">Name:</label>
      <input type="text" ref={nameRef} className="form-input" />

      <label className="form-label">Price:</label>
      <input type="text" ref={priceRef} className="form-input" />

      <label className="form-label">Storage:</label>
      <input type="text" ref={storageRef} className="form-input" />

      <label className="form-label">RAM:</label>
      <input type="text" ref={ramRef} className="form-input" />

      <label className="form-label">Graphics Card:</label>
      <input type="text" ref={graphicscardRef} className="form-input" />

      <label className="form-label">Display Size:</label>
      <input type="text" ref={displaysizeRef} className="form-input" />

      <label className="form-label">Ports:</label>
      <input type="text" ref={portsRef} className="form-input" />

      <label className="form-label">Image:</label>
      <input type="file" accept="image/*" ref={imageFileRef} className="form-input" />

      <button type="submit" className="form-submit-button">Add Item</button>

      <div ref={errorRef} className="form-error"></div>
      {successRef.current && <div className="form-success">Item added successfully!</div>}
    </form>
  );
}

export default AddItemForm;