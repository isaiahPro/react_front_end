import { useRef } from 'react';
import supabase from '../supabase';
import './adminStyle.css';

function AddItemForm() {
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const storageRef = useRef(null);
  const ramRef = useRef(null);
  const imageFileRef = useRef(null);
  const errorRef = useRef(null);
  const successRef = useRef(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const name = nameRef.current.value;
    const price = priceRef.current.value;
    const storage = storageRef.current.value;
    const ram = ramRef.current.value;
    const imageFile = imageFileRef.current.files[0];

    // Generate a random number to use as the image name
    const imageName = Math.floor(Math.random() * 1000000);

    // Upload the image file to SupaBase Storage with the random number as the filename
    const { error: uploadError } = await supabase.storage
      .from('bucketFileImage')
      .upload(`images/${imageName}.jpg`, imageFile);

    if (uploadError) {
      errorRef.current.textContent = uploadError.message;
      return;
    }

    // Insert the item data into the my_table table
    const {  error } = await supabase
      .from('phones')
      .insert([
        {
          name,
          storage,
          ram,
          price,
          image: imageName,
        },
      ]);

    if (error) {
      errorRef.current.textContent = error.message;
      return;
    }else{
      alert("Item added successfully!")
    }

    nameRef.current.value = '';
    priceRef.current.value = '';
    storageRef.current.value = '';
    ramRef.current.value = '';
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
      <input type="text" ref={priceRef} className="form-input" />
      <label className="form-label">ram:</label>
      <input type="text" ref={priceRef} className="form-input" />
      <label className="form-label">Image:</label>
      <input type="file" accept="image/*" ref={imageFileRef} className="form-input" />
      <button type="submit" className="form-submit-button">Add Item</button>
      <div ref={errorRef} className="form-error"></div>
      {successRef.current && <div className="form-success">Item added successfully!</div>}
    </form>
  );
}

export default AddItemForm;