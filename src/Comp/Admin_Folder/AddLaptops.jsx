import { useState } from "react";
import axios from "axios";
const DB_Api = process.env.REACT_APP_API_KEY;

const AddNewLaptop = () => {
  const [laptop, setLaptop] = useState({
    name: "",
    price: "",
    processor: "",
    storage: "",
    ram: "",
    graphicsCard: "",
    displaySize: "",
    ports: [],
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image" && files && files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setLaptop((prevLaptop) => ({
          ...prevLaptop,
          image: reader.result,
        }));
      };
    } else {
      setLaptop((prevLaptop) => ({
        ...prevLaptop,
        [name]: value,
      }));
    }
  };

  const handlePortsChange = (event) => {
    const { value } = event.target;
    setLaptop((prevLaptop) => ({
      ...prevLaptop,
      ports: [...prevLaptop.ports, value],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", laptop.name);
      formData.append("price", laptop.price);
      formData.append("processor", laptop.processor);
      formData.append("storage", laptop.storage);
      formData.append("ram", laptop.ram);
      formData.append("graphicsCard", laptop.graphicsCard);
      formData.append("displaySize", laptop.displaySize);
      formData.append("ports", laptop.ports);
      if (laptop.image) {
        formData.append("image", laptop.image, laptop.image.name);
      }
      await axios.post(`${DB_Api}/api/laptops`, formData);
      alert("Laptop added successfully!");
      setLaptop({
        name: "",
        price: "",
        processor: "",
        storage: "",
        ram: "",
        graphicsCard: "",
        displaySize: "",
        ports: [],
        image: null,
      });
    } catch (error) {
      console.log(error);
      alert("Error adding laptop");
    }
  };

  return (
    <div className="laptopbox">
      <h2>Add New Laptop</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={laptop.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price :</label>
          <input
            type="number"
            id="price"
            name="price"
            value={laptop.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="processor">Processor :</label>
          <input
            type="text"
            id="processor"
            name="processor"
            value={laptop.processor}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="storage">Storage :</label>
          <input
            type="text"
            id="storage"
            name="storage"
            value={laptop.storage}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ram">RAM :</label>
          <input
            type="text"
            id="ram"
            name="ram"
            value={laptop.ram}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="graphicsCard">Graphics Card :</label>
          <input
            type="text"
            id="graphicsCard"
            name="graphicsCard"
            value={laptop.graphicsCard}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="displaySize">Display Size :</label>
          <input
            type="text"
            id="displaySize"
            name="displaySize"
            value={laptop.displaySize}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ports">Ports :</label>
          <select id="ports" name="ports" onChange={handlePortsChange} multiple>
            <option value="HDMI">HDMI</option>
            <option value="USB-C">USB-C</option>
            <option value="Thunderbolt 3">Thunderbolt 3</option>
            <option value="USB 3.0">USB 3.0</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image :</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewLaptop;