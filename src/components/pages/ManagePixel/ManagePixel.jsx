import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

const ManagePixel = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPixel, setCurrentPixel] = useState(null);
  const [img, setImg] = useState({});
  const [siteLink, setSiteLink] = useState("");
  useEffect(() => {
    if (user.email && id) {
      fetch(`http://localhost:3000/pixels/${id}`)
        .then((res) => res.json())
        .then((data) => setCurrentPixel(data))
        .catch((error) => console.error("Error fetching pixel:", error));
    }
  }, [user.email, id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postLink", siteLink);
    formData.append("photo", img);

    if (user.email && id) {
      try {
        const response = await fetch(`http://localhost:3000/pixels/${id}`, {
          method: "PUT",
 
          body: formData,
        });

        const data = await response.json();
        console.log("Pixel updated successfully:", data);
        setCurrentPixel(data);

        navigate("/dashboard/mypixels"); // Navigate after successful update
      } catch (error) {
        console.error("Error updating pixel:", error);
      }
    }
  };

  return (
    <div className="w-2/3 p-8 mx-auto border-red-500">
      {currentPixel ? (
        <div className="mb-8">
          <div className="mb-2">Username: {currentPixel.name}</div>
          <div className="mb-2">Email: {currentPixel.email}</div>
          <div className="mb-2">Phone: {currentPixel.phone}</div>
          {/* Add other properties you want to display */}
        </div>
      ) : (
        <div className="mb-8">Loading...</div>
      )}
      <h2 className="text-xl font-semibold mb-4">
        Add photo and links on Pixel
      </h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <input
          type="file"
          multiple={false}
          name="photo"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
          className="mt-2"
        />
        <input
          type="url"
          name="postLink"
          placeholder="Post Link"
          onChange={(e) => setSiteLink(e.target.value)}
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
