import "./css/map.css";
import {useState} from "react";
import Observer from "./Observer";
import ScrollToTop from "./ScrollToTop";
import organsInfo from "./OrgansInfo"
import skeletonBody from "./css/images/skeleton-body/skeleton.png";
import muscleBodyFront from "./css/images/muscle-body-front/muscle-front.png";
import muscleBodyBack from "./css/images/muscle-body-back/muscle-back.png";

function Map(){

    const organsParts = ["All","Brain","Esophagus","Lungs","Heart","Stomach","Liver","Pancreas","Gallbladder","Small Intestine","Large Intestine","Kidneys","Bladder"]; //13
    const skeletonParts = ["All","Head","Collar","Upper Arm","Forearm","Hands","Spine","Torso","Hip","Thigh","Lower Leg","Feet"]; //12
    const muscleFrontParts = ["All","Head","Shoulders","Upper Arm","Forearm","Hands","Chest","Abdomen","Obliques","Thigh","Lower Leg","Feet"]; //12
    const muscleBackParts = ["All","Traps","Shoulders","Upper Arm","Lats","Lower Back","Glutes","Thigh","Lower Leg"]; //9

    const [selection, setSelection] = useState("Organs");
    const [parts, setParts] = useState(organsParts);
    const [diagram, setDiagram] = useState(organsInfo.get("All"));

    const handleChange = (e) => {
        const option = e.target.value;
        if(option === "Organs"){
            const organsImage = organsInfo.get("All");
            setParts(organsParts);
            setDiagram(organsImage);
        }else if(option === "Skeleton"){
            setParts(skeletonParts);
            setDiagram(skeletonBody);
        }else if(option === "Muscles (Front)"){
            setParts(muscleFrontParts);
            setDiagram(muscleBodyFront);
        }else if(option === "Muscles (Back)"){
            setParts(muscleBackParts);
            setDiagram(muscleBodyBack);
        }
        const hiddenElements = document.querySelectorAll('.show');
        hiddenElements.forEach((element) => element.classList.remove('show'));
        setSelection(option);
    }

    const handleClick = (e) => {
        const part = e.target.value;
        const partImage = organsInfo.get(part);
        setDiagram(partImage);
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
                                <button value={part} onClick={(e) => handleClick(e)}>{part}</button>
                            </div>
                        ))}
                    </div>
                    <div className="mapDiagram hide slideInBottom">
                        <img src={diagram} alt=""></img>
                    </div>
                    <div className="partsRight hide slideInRight">
                        {parts.slice(parts.length / 2, parts.length).map((part) => (
                            <div key={part}>
                                <button value={part} onClick={(e) => handleClick(e)}>{part}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Map;