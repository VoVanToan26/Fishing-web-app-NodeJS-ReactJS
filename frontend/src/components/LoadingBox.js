import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function LoadingBox() {
    return (
        <div className="loading">
            <FontAwesomeIcon icon={faSpinner} /> Loading...
        </div>
    );
}
