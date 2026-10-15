import { useState } from "react";

import './SpoilerText.css'

function Spoiler ({text}) {
    const [Review, setReview] = useState(false)

    return (
        <>
        <button className={`Spoiler ${Review ? "Review" : ""}`} onClick={() => {setReview(!Review)}}>{text}</button>
        </>
    )

}

export default Spoiler