import "./css/map.css";
import {useState} from "react";
import Observer from "./Observer";
import ScrollToTop from "./ScrollToTop";
import organsBody from "./css/images/organs-body/organs-body.png";
import skeletonBody from "./css/images/skeleton-body/skeleton-body.png";
import muscleBodyFront from "./css/images/muscle-body-front/muscle-body-front.png";
import muscleBodyBack from "./css/images/muscle-body-back/muscle-body-back.png";

function Map(){

    const [selection, setSelection] = useState("Organs");

    const organsParts = ["All","Brain","Esophagus","Lungs","Heart","Stomach","Liver","Pancreas","Gallbladder","Small Intestine","Large Intestine","Kidneys","Bladder"]; //13
    const skeletonParts = ["All","Head","Collar","Upper Arm","Forearm","Hands","Spine","Torso","Hip","Thigh","Lower Leg","Feet"]; //12
    const musclesFrontParts = ["All","Head","Shoulders","Upper Arm","Forearm","Hands","Chest","Abdomen","Obliques","Thigh","Lower Leg","Feet"]; //12
    const musclesBackParts = ["All","Traps","Shoulders","Upper Arm","Lats","Lower Back","Glutes","Thigh","Lower Leg"]; //9

    const handleChange = (e) => {
        setSelection(e.target.value);
    }

    return(
        <div className="mapScene">
            <div className="map">
                <Observer/>
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
                    <div className="partsLeft hide slideInLeft">
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
                        {selection === "Muscles (Back)" && musclesBackParts.slice(0, 4).map((muscle) => (
                            <div key={muscle}>
                                <button>{muscle}</button>
                            </div>
                        ))}
                    </div>
                    <div className="mapDiagram hide fadeIn">
                        {selection === "Organs" && <img src={organsBody} alt=""></img>}
                        {selection === "Skeleton" && <img src={skeletonBody} alt=""></img>}
                        {selection === "Muscles (Front)" && <img src={muscleBodyFront} alt=""></img>}
                        {selection === "Muscles (Back)" && <img src={muscleBodyBack} alt=""></img>}
                    </div>
                    <div className="partsRight hide slideInRight">
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
                        {selection === "Muscles (Back)" && musclesBackParts.slice(4, 9).map((muscle) => (
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