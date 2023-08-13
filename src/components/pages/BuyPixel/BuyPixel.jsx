import { useState, useEffect, useContext } from "react";
import payment from "../../../assets/payment.jfif";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
const BuyPixel = () => {
  const [pixels, setPixels] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState({});
  useEffect(() => {
    // Calculate the total amount based on the number of pixels
    const calculateTotalAmount = () => {
      const pixelPrice = 109; // Price per pixel in taka (BDT)
      const amount = pixels * pixelPrice;
      setTotalAmount(amount);
    };

    calculateTotalAmount();
  }, [pixels]);
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        setDbUser(data.find((u) => u.email === user.email)); // Update the users state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [user]);
  const handlePixelsChange = (e) => {
    setPixels(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the payload to send to the server
    const payload = {
      userId: dbUser._id,
      pixels,
      totalAmount,
      purchesTime: new Date(),
      trxid: e.target.trxid.value,
      // Add any other data you want to send to the server
    };
    // Make the POST request using the fetch API
    fetch("http://localhost:3000/pixels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server, if needed
        console.log("Data stored successfully:", data);

        // You can also add logic here to display a success message or redirect the user
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error storing data:", error);
        // You can display an error message to the user or perform other error handling
      });
  };
  return (
    <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">BuyPixels Page</h2>
        <form method="post" className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4"></div>

          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex flex-col w-full">
              <label htmlFor="pixels" className="text-lg font-medium mb-2">
                Amount of Pixels:
              </label>
              <input
                type="number"
                id="pixels"
                name="pixels"
                required
                className="rounded-md border border-gray-300 px-3 py-2"
                onChange={handlePixelsChange}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex flex-col w-full">
              <label htmlFor="totalAmount" className="text-lg font-medium mb-2">
                Total Amount (Taka BDT):
              </label>
              <input
                type="text"
                id="totalAmount"
                name="totalAmount"
                value={totalAmount}
                readOnly
                className="rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="payment_qrcode"
                className="text-lg font-medium mb-2"
              >
                Payment QR Code:
              </label>
              <div className="mb-4">
                {/* Display the QR code here for users to scan */}
                <img
                  src={payment}
                  alt="Payment QR Code"
                  className="w-44 h-52"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="trxid" className="text-lg font-medium mb-2">
              Transaction ID:
            </label>
            <input
              type="text"
              id="trxid"
              name="trxid"
              required
              className="rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyPixel;
