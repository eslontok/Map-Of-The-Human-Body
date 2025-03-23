import "./css/map.css";
import {useState} from "react";
import ScrollToTop from "./ScrollToTop";

function Map(){

    const [selection, setSelection] = useState("Organs");

    const organsParts = ["All","Brain","Esophagus","Lungs","Heart","Stomach","Liver","Pancreas","Gallbladder","Small Intestine","Large Intestine","Kidney","Bladder"];
    const skeletonParts = ["All","Head","Collar","Upper Arm","Forearm","Hands","Spine","Torso","Hip","Thigh","Lower Leg","Feet"];
    const musclesFrontParts = ["All","Head","Shoulders","Upper Arm","Forearm","Hands","Chest","Abdomen","Obliques","Thigh","Lower Leg","Feet"];
    const musclesBackParts = ["All","Traps","Shoulders","Upper Arm","Lats","Obliques","Lower Back","Glutes","Thigh","Lower Leg"];

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
                <div className="mapDetails">
                    
                </div>
            </div>
        </div>
    );
}

export default Map;