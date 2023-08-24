import { Link } from "react-router-dom";

const Pixels = ({ getpixels }) => {
  let Cheight = 24 * parseInt(getpixels.pixels) + "px";
  let Cwidth = 24 * parseInt(getpixels.pixels) + "px";
  return (
    <div>
      <Link to={getpixels.postLink} target="blank">
        <img
          src={ "http://localhost:3000/" + getpixels?.photo?.filename}
          alt=""
          className=" px-2"
          style={{ width: Cwidth, height: "20px" }}
        />
      </Link>
    </div>
  );
};

export default Pixels;
