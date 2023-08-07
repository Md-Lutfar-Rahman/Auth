import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useParams } from "react-router-dom";

const ManagePixel = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // Get the pixel _id from the URL parameters
  const [currentPixel, setCurrentPixel] = useState(null);
  const [updatedPixelData, setUpdatedPixelData] = useState({});

  useEffect(() => {
    if (user.email && id) {
      fetch(`http://localhost:3000/pixels/${id}`) // Use the _id from the URL parameters to fetch the specific pixel
        .then(res => res.json())
        .then(data => setCurrentPixel(data))
        .catch(error => console.error("Error fetching pixel:", error));
    }
  }, [user.email, id]); // Add 'id' to the dependency array

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPixelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (user.email && id) {
      fetch(`http://localhost:3000/pixels/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPixelData),
      })
        .then(res => res.json())
        .then(data => {
          console.log("Pixel updated successfully:", data);
          setCurrentPixel(data); 
          console.log()// Update the currentPixel state with the updated data
        })
        .catch(error => console.error("Error updating pixel:", error));
    }
  };

  return (
    <div>
      {currentPixel ? (
        <div>
          <div>Username: {currentPixel.username}</div>
          <div>Email: {currentPixel.email}</div>
          <div>Phone: {currentPixel.phone}</div>
          {/* Add other properties you want to display */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <h2>Update Pixel</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Add input fields for updating the pixel data */}
        {/* For example: */}
        <input type="text" name="username" value={updatedPixelData.username || ""} onChange={handleInputChange} />
        <input type="text" name="email" value={updatedPixelData.email || ""} onChange={handleInputChange} />
        <input type="text" name="phone" value={updatedPixelData.phone || ""} onChange={handleInputChange} />
        <button type="submit">Update Pixel</button>
      </form>
    </div>
  );
};

export default ManagePixel;
