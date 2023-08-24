import  { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { Link } from 'react-router-dom';

const PixelsPayment = () => {
    const { user } = useContext(AuthContext);
    const [pixels, setpixels] = useState([]);
    console.log(user)
    useEffect(() => {
        // Fetch pixels from the API
        fetch('http://localhost:3000/pixels')
            .then(res => res.json())
            .then(data => {
                setpixels(data);
                console.log(data)
                // Update the pixels state with the fetched data
            })

            .catch(error => {
                console.error('Error fetching pixels:', error);
            });
    }, []);
    


    return (
        <div className="py-2 ">
        <div className=" w-9/12 mx-auto px-4">
            <h1 className="text-3xl font-semibold mb-4 text-center">All pixels</h1>
            <table className=" mx-auto bg-white border rounded-lg overflow-hidden shadow-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600">SL</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600">Name</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600">Email</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600">Total Pixels</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pixels.map((pixel, index) => {
                        console.log(pixel)
                        return(
                       
                        <tr key={user._id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                            <td className="px-4 py-3">{index + 1}</td>
                            <td className="px-4 py-3">{pixel.userId.email}</td>
                            <td className="px-4 py-3">Email: {pixel.email}</td>
                            <td className="px-4 py-3">Role: {pixel.role}</td>
                            <td className="px-4 py-3">
                                <Link
                                    to={`/dashboard/pixels/edit/${user._id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </Link>
                            </td>
                            <td className="px-4 py-3">
                                <Link
                                    to={`/pixels/delete/${user._id}`}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default PixelsPayment;
