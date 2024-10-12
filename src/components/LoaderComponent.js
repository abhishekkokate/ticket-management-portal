import React from "react";
import "../styles/LoaderComponent.css";
import { ReactComponent as Logo } from "../logo.svg";

function LoaderComponent() {
  return (
    <div className="loader-container">
      <div className="loader">
        <Logo className="loader-img" />
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default LoaderComponent;
