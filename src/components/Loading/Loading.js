import react from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loading({
  show = false,
  type = "Puff",
  color = "#00BFFF",
  width = "100",
  height = "100",
}) {
  return (
    <div className="loader-container">
      <Loader
        visible={show}
        type={type}
        color={color}
        height={height}
        width={width}
      />
    </div>
  );
}
