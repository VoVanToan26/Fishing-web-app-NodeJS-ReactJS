import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/fontawesome-free-regular';

function Rating({ rating, numReviews = 0, caption }) {
    console.log("rate", rating, numReviews, caption);
    return (
        <div className="rating">
            <span>
                {Array(5)
                    .fill(null)
                    .map((value, index) => (
                        <FontAwesomeIcon
                            key={index}
                            icon={
                                rating > index
                                    ? faStarSolid
                                    : rating < index - 1
                                    ? faStarRegular
                                    : faStarHalfAlt
                            }
                        />
                    ))}
            </span>
            {caption ? <span>{caption}</span> : <span>{numReviews + " reviews"}</span>}
        </div>
    );
}

export default Rating;