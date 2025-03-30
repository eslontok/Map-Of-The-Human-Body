import "./css/bodyMap.css";
import {useState} from "react";
import Observer from "./Observer";
import ScrollToTop from "./ScrollToTop";
import organsInfo from "./OrgansInfo";
import skeletonInfo from "./SkeletonInfo";
import musclesFrontInfo from "./MusclesFrontInfo";
import musclesBackInfo from "./MusclesBackInfo";

function BodyMap(){

    const organsParts = ["All","Brain","Esophagus","Lungs","Heart","Stomach","Liver","Pancreas","Gallbladder","Small Intestine","Large Intestine","Kidneys","Bladder"]; //13
    const skeletonParts = ["All","Head","Collar","Upper Arm","Forearm","Hands","Spine","Torso","Hip","Thigh","Lower Leg","Feet"]; //12
    const musclesFrontParts = ["All","Head","Shoulders","Upper Arm","Forearm","Hands","Chest","Abdomen","Obliques","Thigh","Lower Leg","Feet"]; //12
    const musclesBackParts = ["All","Traps","Shoulders","Upper Arm","Lats","Lower Back","Glutes","Thigh","Lower Leg"]; //9

    const [selection, setSelection] = useState("Organs");
    const [diagramImage, setDiagramImage] = useState(organsInfo.get("All"));
    const [parts, setParts] = useState(organsParts);
    const [part, setPart] = useState("All");
    const [partImage, setPartImage] = useState(organsInfo.get("All"));

    const [isDisplayed, setIsDisplayed] = useState(new Map());
    const [sideDisplayed, setSideDisplayed] = useState(null);

    const handleChange = (e) => {
        const option = e.target.value;
        const map = new Map();
        if(option === "Organs"){
            const organsImage = organsInfo.get("All");
            setDiagramImage(organsImage); setParts(organsParts); setPart("All"); setPartImage(organsImage);
            organsParts.forEach((name) => map.set(name, false));
        }else if(option === "Skeleton"){
            const skeletonImage = skeletonInfo.get("All");
            setDiagramImage(skeletonImage); setParts(skeletonParts); setPart("All"); setPartImage(skeletonImage);
            skeletonParts.forEach((name) => map.set(name, false));
        }else if(option === "Muscles (Front)"){
            const musclesFrontImage = musclesFrontInfo.get("All");
            setDiagramImage(musclesFrontImage); setParts(musclesFrontParts); setPart("All"); setPartImage(musclesFrontImage);
            musclesFrontParts.forEach((name) => map.set(name, false));
        }else if(option === "Muscles (Back)"){
            const musclesBackImage = musclesBackInfo.get("All");
            setDiagramImage(musclesBackImage); setParts(musclesBackParts); setPart("All"); setPartImage(musclesBackImage);
            musclesBackParts.forEach((name) => map.set(name, false));
        }
        const shownElements = document.querySelectorAll('.show');
        shownElements.forEach((element) => element.classList.remove('show'));
        setSelection(option);
        setIsDisplayed(map);
        setSideDisplayed(null);
    }

    const handleClick = (e, side) => {
        let newPartImage = null;
        let defaultImage = null;
        const currIsDisplayed = isDisplayed.get(e.target.value);
        const map = new Map();
        if(selection === "Organs"){
            newPartImage = organsInfo.get(e.target.value);
            defaultImage = organsInfo.get("All");
            organsParts.forEach((name) => map.set(name, false));
        }else if(selection === "Skeleton"){
            newPartImage = skeletonInfo.get(e.target.value);
            defaultImage = skeletonInfo.get("All");
            skeletonParts.forEach((name) => map.set(name, false));
        }else if(selection === "Muscles (Front)"){
            newPartImage = musclesFrontInfo.get(e.target.value);
            defaultImage = musclesFrontInfo.get("All");
            musclesFrontParts.forEach((name) => map.set(name, false));
        }else if(selection === "Muscles (Back)"){
            newPartImage = musclesBackInfo.get(e.target.value);
            defaultImage = musclesBackInfo.get("All");
            musclesBackParts.forEach((name) => map.set(name, false));
        }
        if(!currIsDisplayed){
            map.set(e.target.value, true);
        }else{
            newPartImage = defaultImage;
        }
        const shownElements = document.querySelectorAll('.partsLeftContent, .partsRightContent');
        shownElements.forEach((element) => element.classList.remove('show'));
        setPart(e.target.value);
        setPartImage(newPartImage);
        setIsDisplayed(map);
        setSideDisplayed(side);
    }

    return(
        <div className="mapScene">
            <div className="bodyMap">
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
                    <div className="partsLeftContent hide slideInLeft">
                        {(!isDisplayed.get(part) || sideDisplayed === "right") && <p style={{opacity: "0"}}>Hello World {part}</p>}
                        {(isDisplayed.get(part) && sideDisplayed === "left") && <p>Hello World {part}</p>}
                    </div>
                    <div className="partsLeft hide slideInLeft">
                        {parts.slice(0, parts.length / 2).map((part) => (
                            <div key={part}>
                                <button value={part} onClick={(e) => handleClick(e, "left")}>{part}</button>
                            </div>
                        ))}
                    </div>
                    <div className="mapDiagram hide slideInBottom" style={{backgroundImage: "linear-gradient(rgba(40,40,43,0.75), rgba(40,40,43,0.75)), url(" + diagramImage + ")"}}>
                        <img src={partImage} alt=""></img>
                    </div>
                    <div className="partsRight hide slideInRight">
                        {parts.slice(parts.length / 2, parts.length).map((part) => (
                            <div key={part}>
                                <button value={part} onClick={(e) => handleClick(e, "right")}>{part}</button>
                            </div>
                        ))}
                    </div>
                    <div className="partsRightContent hide slideInRight">
                        {(!isDisplayed.get(part) || sideDisplayed === "left") && <p style={{opacity: "0"}}>Hello World {part}</p>}
                        {(isDisplayed.get(part) && sideDisplayed === "right") && <p>Hello World {part}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BodyMap;