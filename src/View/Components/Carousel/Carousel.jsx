import { useEffect, useState } from "react";
import "./Carousel.css";

export default function Carousel({imageArray}) {
    const [currentImg, setCurrentImg] = useState(0);

    useEffect(() => {
        if (currentImg >= imageArray.length) {
            setCurrentImg(0)
        } else if (currentImg < 0) {
            setCurrentImg(imageArray.length - 1);
        }
    }, [currentImg]);

    return (
        <div className="post-carousel">
            <img loading="lazy" src={imageArray[currentImg]} alt={`Alt: ${imageArray[currentImg]}`} />
            {
                imageArray.length > 1 && 
                <>
                    <a className="carousel-control carousel-prev button" onClick={()=> setCurrentImg(prev => prev-1)} >Prev</a>
                    <a className="carousel-control carousel-next button" onClick={()=> setCurrentImg(prev => prev+1)} >Next</a>
                    <p className="carousel-indicator">{currentImg+1} / {imageArray.length}</p>
                </>
            }
        </div>
    );
}

Carousel.propTypes = {
    imageArray: []
}