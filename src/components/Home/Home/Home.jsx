import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
// import Pixel from "./Pixels/Pixels";
import PixelGrid from "./Pixels/PixelGrid ";


const Home = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            
            <h2>This is Home {user && <span>{user.displayName}</span>} </h2>
            <PixelGrid></PixelGrid>
        </div>
    );
};

export default Home;