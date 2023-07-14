import { useRef } from 'react';
import supabase from '../supabase';
import './adminStyle.css';

function AddItemForm() {
  const nameRef = useRef(null);
  const typeRef = useRef(null);
  const priceRef = useRef(null);
  const imageFileRef = useRef(null);
  const errorRef = useRef(null);
  const successRef = useRef(false);
  const messageRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const name = nameRef.current.value;
    const type = typeRef.current.value;
    const message = messageRef.current.value;
    const price = priceRef.current.value;
    const imageFile = imageFileRef.current.files[0];

    // Generate a random number to use as the image name
    const imageName = Math.floor(Math.random() * 1000000);

    // Upload the image file to SupaBase Storage with the random number as the filename
    const { error: uploadError } = await supabase.storage
      .from('bucketFileImage01')
      .upload(`images/${imageName}.jpg`, imageFile);

    if (uploadError) {
      errorRef.current.textContent = uploadError.message;
      return;
    }

    // Insert the item data into the my_table table
    const {  error } = await supabase
      .from('others')
      .insert([
        {
          name,
          type,
          message,
          price,
          image: imageName,
        },
      ]);

    if (error) {
      errorRef.current.textContent = error.message;
      return;
    } else {
      alert("Item added successfully!")
    }

    nameRef.current.value = '';
    typeRef.current.value = '';
    messageRef.current.value = '';
    priceRef.current.value = '';
    imageFileRef.current.value = '';
    errorRef.current.textContent = '';
    successRef.current = true;
  }

  return (
    <form onSubmit={handleSubmit} className="add-laptop-form">
      <label className="form-label">Name:</label>
      <input type="text" ref={nameRef} className="form-input" required/>

      <label className="form-label">Price:</label>
      <input type="text" ref={priceRef} className="form-input" required />

      <label className="form-label">Information:</label>
      <textarea ref={messageRef} className="form-input"  required/>

      <label className="form-label">Type:</label>
      <select ref={typeRef} className="form-input" required>
        <option value="">Choose a type</option>
        <option value="tv">TV</option>
        <option value="tvAccessories">TV Accessories</option>
        <option value="speakers">Speakers</option>
        <option value="laptopAccessories">Laptop Accessories</option>
        <option value="other">Other</option>
      </select>

      <label className="form-label">Image:</label>
      <input type="file" accept="image/*" ref={imageFileRef} className="form-input" required />

      <button type="submit" className="form-submit-button">Add Item</button>

      <div ref={errorRef} className="form-error"></div>

      {successRef.current && <div className="form-success">Item added successfully!</div>}
    </form>
  );
}

export default AddItemForm;