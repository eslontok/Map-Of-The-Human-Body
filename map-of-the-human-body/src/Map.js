import "./css/map.css";
import {useState} from "react";
import ScrollToTop from "./ScrollToTop";
import organsBody from "./css/images/organs-body/organs-body.png";

function Map(){

    const [selection, setSelection] = useState("Organs");

    const organsParts = ["All","Brain","Esophagus","Lungs","Heart","Stomach","Liver","Pancreas","Gallbladder","Small Intestine","Large Intestine","Kidney","Bladder"]; //13
    const skeletonParts = ["All","Head","Collar","Upper Arm","Forearm","Hands","Spine","Torso","Hip","Thigh","Lower Leg","Feet"]; //12
    const musclesFrontParts = ["All","Head","Shoulders","Upper Arm","Forearm","Hands","Chest","Abdomen","Obliques","Thigh","Lower Leg","Feet"]; //12
    const musclesBackParts = ["All","Traps","Shoulders","Upper Arm","Lats","Obliques","Lower Back","Glutes","Thigh","Lower Leg"]; //10

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
                    <div className="partsLeft">
                        {selection === "Organs" && organsParts.slice(0, 6).map((organ) => (
                            <div key={organ}>
                                <button>{organ}</button>
                            </div>
                        ))}
                        {selection === "Skeleton" && skeletonParts.slice(0, 6).map((bone) => (
                            <div key={bone}>
                                <button>{bone}</button>
                            </div>
                        ))}
                        {selection === "Muscles (Front)" && musclesFrontParts.slice(0, 6).map((muscle) => (
                            <div key={muscle}>
                                <button>{muscle}</button>
                            </div>
                        ))}
                        {selection === "Muscles (Back)" && musclesBackParts.slice(0, 5).map((muscle) => (
                            <div key={muscle}>
                                <button>{muscle}</button>
                            </div>
                        ))}
                    </div>
                    <div className="mapDiagram">
                        <img src={organsBody} alt=""></img>
                    </div>
                    <div className="partsRight">
                        {selection === "Organs" && organsParts.slice(6, 13).map((organ) => (
                            <div key={organ}>
                                <button>{organ}</button>
                            </div>
                        ))}
                        {selection === "Skeleton" && skeletonParts.slice(6, 12).map((bone) => (
                            <div key={bone}>
                                <button>{bone}</button>
                            </div>
                        ))}
                        {selection === "Muscles (Front)" && musclesFrontParts.slice(6, 12).map((muscle) => (
                            <div key={muscle}>
                                <button>{muscle}</button>
                            </div>
                        ))}
                        {selection === "Muscles (Back)" && musclesBackParts.slice(5, 10).map((muscle) => (
                            <div key={muscle}>
                                <button>{muscle}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Map;