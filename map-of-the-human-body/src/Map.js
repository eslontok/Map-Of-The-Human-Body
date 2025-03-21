import "./css/map.css";
import {useState} from "react";
import ScrollToTop from "./ScrollToTop";

function Map(){

    const [selection, setSelection] = useState("Organs");

    const handleChange = (e) => {
        setSelection(e.target.value);
    }

    return(
        <div className="mapScene">
            <div className="map">
                <ScrollToTop/>
                <h2>Navigate The Body</h2>
                <label>Map Of:</label>
                <select value={selection} onChange={(e) => handleChange(e)}>
                    <option value="Organs">Organs</option>
                    <option value="Skeleton">Skeleton</option>
                    <option value="Muscles (Front)">Muscles (Front)</option>
                    <option value="Muscles (Back)">Muscles (Back)</option>
                </select>
            </div>
        </div>
    );
}

export default Map;