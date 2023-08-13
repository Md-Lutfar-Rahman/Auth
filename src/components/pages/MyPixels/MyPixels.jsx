import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const MyPixels = () => {
  const [pixels, setPixels] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.email) {
      fetch("http://localhost:3000/pixels")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // Filter the pixels by user email
          const userPixels = data.filter(
            (pixel) => pixel.userId.email === user.email
          );
          setPixels(userPixels);
        })
        .catch((error) => console.log(error));
    }
  }, [user.email]);
  return (
    <div>
      <h2>Hello, I am from MyPixels! {user.email}</h2>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">
              Username
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">
              Email
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">
              Pixel Quantity
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">
              Total Amount
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">
              Status
            </th>
            <th
              className="px-6 py-3 text-center font-semibold text-gray-700"
              colSpan={2}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {pixels &&
            pixels.map((pixel) => { 
              return (
                <tr key={pixel._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {pixel.userId.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {pixel.userId.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {pixel.pixels}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {pixel.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {pixel.status?"Active":"Deactive"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/dashboard/manage-pixels/${pixel._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default MyPixels;
