import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const MyPixels = () => {
  const [pixels, setPixels] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.email) {
      fetch('http://localhost:3000/pixels')
        .then(res => res.json())
        .then(data => {
          // Filter the pixels by user email
          const userPixels = data.filter(pixel => pixel.email === user.email);
          setPixels(userPixels);
        })
        .catch(error => console.log(error));
    }
  }, [user.email]);

  return (
    <div>
      <h2>Hello, I am from MyPixels! {user.email}</h2>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Pixel Quantity</th>
            <th>Total Amount</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {pixels &&
            pixels.map((pixel) => (
              <tr key={pixel._id}>
                <td>{pixel.username}</td>
                <td>{pixel.email}</td>
                <td>{pixel.pixelQty}</td>
                <td>{pixel.totalAmount}</td>
                <Link to={`/dashboard/manage-pixels/${pixel._id}`}>Edit</Link>
                <td>{pixel.totalAmount}delete</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPixels;
