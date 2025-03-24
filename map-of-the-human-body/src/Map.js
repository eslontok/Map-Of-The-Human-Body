import "./css/map.css";
import {useState} from "react";
import Observer from "./Observer";
import ScrollToTop from "./ScrollToTop";
import organsBody from "./css/images/organs-body/organs-body.png";
import skeletonBody from "./css/images/skeleton-body/skeleton-body.png";
import muscleBodyFront from "./css/images/muscle-body-front/muscle-body-front.png";
import muscleBodyBack from "./css/images/muscle-body-back/muscle-body-back.png";

function Map(){

    const organsParts = ["All","Brain","Esophagus","Lungs","Heart","Stomach","Liver","Pancreas","Gallbladder","Small Intestine","Large Intestine","Kidneys","Bladder"]; //13
    const skeletonParts = ["All","Head","Collar","Upper Arm","Forearm","Hands","Spine","Torso","Hip","Thigh","Lower Leg","Feet"]; //12
    const musclesFrontParts = ["All","Head","Shoulders","Upper Arm","Forearm","Hands","Chest","Abdomen","Obliques","Thigh","Lower Leg","Feet"]; //12
    const musclesBackParts = ["All","Traps","Shoulders","Upper Arm","Lats","Lower Back","Glutes","Thigh","Lower Leg"]; //9

    const [selection, setSelection] = useState("Organs");
    const [parts, setParts] = useState(organsParts);
    const [diagram, setDiagram] = useState(organsBody);

    const handleChange = (e) => {
        const option = e.target.value;
        if(option === "Organs"){
            setParts(organsParts);
            setDiagram(organsBody);
        }else if(option === "Skeleton"){
            setParts(skeletonParts);
            setDiagram(skeletonBody);
        }else if(option === "Muscles (Front)"){
            setParts(musclesFrontParts);
            setDiagram(muscleBodyFront);
        }else if(option === "Muscles (Back)"){
            setParts(musclesBackParts);
            setDiagram(muscleBodyBack);
        }
        setSelection(option);
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
                        {parts.slice(0, parts.length / 2).map((part) => (
                            <div key={part}>
                                <button>{part}</button>
                            </div>
                        ))}
                    </div>
                    <div className="mapDiagram hide slideInBottom">
                        <img src={diagram} alt=""></img>
                    </div>
                    <div className="partsRight hide slideInRight">
                        {parts.slice(parts.length / 2, parts.length).map((part) => (
                            <div key={part}>
                                <button>{part}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Map;