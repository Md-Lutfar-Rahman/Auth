import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useParams } from "react-router-dom";

const ManagePixel = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [updatedPixelData, setUpdatedPixelData] = useState({});
  // const [imageFile, setImageFile] = useState(null);
  // const [postLink, setPostLink] = useState("");
  const [currentPixel, setCurrentPixel] = useState({
    username: updatedPixelData.username || "",
    email: updatedPixelData.email || "",
    phone: updatedPixelData.phone || "",
    photo:'',
    pixels: updatedPixelData.pixels || "",
    totalAmount: updatedPixelData.totalAmount || "",
    trxid: updatedPixelData.trxid || "",
  });
  useEffect(() => {
    if (user.email && id) {
      fetch(`http://localhost:3000/pixels/${id}`)
        .then((res) => res.json())
        .then((data) => setCurrentPixel(data))
        .catch((error) => console.error("Error fetching pixel:", error));
    }
  }, [user.email, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPixelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   setImageFile(file);
  // };

  // const handleLinkChange = (e) => {
  //   setPostLink(e.target.value);
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(updatedPixelData);
    if (user.email && id) {
      fetch(`http://localhost:3000/pixels/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedPixelData,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("User updated successfully:", data);
          setCurrentPixel(data);
        })
        .catch((error) => console.error("Error updating user:", error));
    }
  };
  console.log(currentPixel);
  return (
    <div className="w-2/3 p-8 mx-auto border-red-500">
      {currentPixel ? (
        <div className="mb-8">
          <div className="mb-2">Username: {currentPixel.username}</div>
          <div className="mb-2">Email: {currentPixel.email}</div>
          <div className="mb-2">Phone: {currentPixel.phone}</div>
          {/* Add other properties you want to display */}
        </div>
      ) : (
        <div className="mb-8">Loading...</div>
      )}
      <h2 className="text-xl font-semibold mb-4">Update Pixel</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={updatedPixelData?.username}
          onChange={handleInputChange}
          className="border rounded p-2 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={updatedPixelData.email || ""}
          onChange={handleInputChange}
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={updatedPixelData.phone || ""}
          onChange={handleInputChange}
          className="border rounded p-2 w-full"
        />
        <input
          type="file"
          name="photo"
          multiple={false}
          accept="image/*"
          onChange={(e) =>
            setUpdatedPixelData({
              ...updatedPixelData,
              photo: e.target.files[0].name,
            })
          }
          className="mt-2"
        />
        <input
          type="url"
          name="postLink"
          placeholder="Site or Post Link"
          // value={postLink}
          onChange={handleInputChange}
          className="border rounded p-2 w-full mt-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
        >
          Update Pixel
        </button>
      </form>
    </div>
  );
};

export default ManagePixel;
