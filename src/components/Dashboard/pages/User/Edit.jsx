import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { useParams } from "react-router";

const Edit = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [updateUserData, setUpdateUserData] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    if (user.email && id) {
      fetch(`http://localhost:3000/users/${id}`)
        .then((res) => res.json())
        .then((data) => setCurrentUser(data))
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [user.email, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (user.email && id) {
      fetch(`http://localhost:3000/users/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updateUserData,
          status: selectedStatus,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("User updated successfully:", data);
          setCurrentUser(data);
        })
        .catch((error) => console.error("Error updating user:", error));
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {currentUser ? (
        <div className="bg-white rounded p-4 shadow mb-4">
          <div className="mb-2 font-bold">Username: {currentUser.name}</div>
          <div className="mb-2">Email: {currentUser.email}</div>
          <div>Phone: {currentUser.phone}</div>
          <div>Status: {currentUser.status}</div>
          {/* Add other properties you want to display */}
        </div>
      ) : (
        <div className="bg-white rounded p-4 shadow mb-4">Loading...</div>
      )}
      <h2 className="text-xl font-bold mb-4">Update User</h2>
      <form onSubmit={handleFormSubmit} className="bg-white rounded p-4 shadow">
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={updateUserData.name || ""}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={updateUserData.email || ""}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={updateUserData.phone || ""}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <select
          className="w-full p-2 mb-2 border rounded"
          value={selectedStatus}
          onChange={handleStatusChange}
          required
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default Edit;
