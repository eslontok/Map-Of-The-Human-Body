import "./css/bodyMap.css";
import {useState} from "react";
import Observer from "./Observer";
import ScrollToTop from "./ScrollToTop";
import organsInfo from "./OrgansInfo";
import skeletonInfo from "./SkeletonInfo";
import musclesFrontInfo from "./MusclesFrontInfo";
import musclesBackInfo from "./MusclesBackInfo";

function BodyMap(){

    const organsParts = ["All","Brain","Esophagus","Lungs","Heart","Stomach","Liver","Gallbladder","Pancreas","Small Intestine","Large Intestine","Kidneys","Bladder","Gonads"]; //14
    const skeletonParts = ["All","Head","Collar","Upper Arm","Forearm","Hands","Spine","Torso","Hip","Thigh","Lower Leg","Feet"]; //12
    const musclesFrontParts = ["All","Head","Shoulders","Upper Arm","Forearm","Hands","Chest","Abdomen","Obliques","Thigh","Lower Leg","Feet"]; //12
    const musclesBackParts = ["All","Traps","Shoulders","Upper Arm","Lats","Lower Back","Glutes","Thigh","Lower Leg"]; //9

    const [selection, setSelection] = useState("Organs");
    const [diagramImage, setDiagramImage] = useState(organsInfo.get("All")[0]);
    const [parts, setParts] = useState(organsParts);
    const [part, setPart] = useState("All");
    const [partImage, setPartImage] = useState(organsInfo.get("All")[0]);
    const [partContent, setPartContent] = useState(null);

    const [isSelected, setIsSelected] = useState(new Map());
    const [sideSelected, setSideSelected] = useState(null);

    const handleChange = (e) => {
        const option = e.target.value;
        const map = new Map();
        if(option === "Organs"){
            const organsImage = organsInfo.get("All")[0];
            setDiagramImage(organsImage); setParts(organsParts); setPart("All"); setPartImage(organsImage); setPartContent(null);
            organsParts.forEach((name) => map.set(name, false));
        }else if(option === "Skeleton"){
            const skeletonImage = skeletonInfo.get("All")[0];
            setDiagramImage(skeletonImage); setParts(skeletonParts); setPart("All"); setPartImage(skeletonImage); setPartContent(null);
            skeletonParts.forEach((name) => map.set(name, false));
        }else if(option === "Muscles (Front)"){
            const musclesFrontImage = musclesFrontInfo.get("All")[0];
            setDiagramImage(musclesFrontImage); setParts(musclesFrontParts); setPart("All"); setPartImage(musclesFrontImage); setPartContent(null);
            musclesFrontParts.forEach((name) => map.set(name, false));
        }else if(option === "Muscles (Back)"){
            const musclesBackImage = musclesBackInfo.get("All")[0];
            setDiagramImage(musclesBackImage); setParts(musclesBackParts); setPart("All"); setPartImage(musclesBackImage); setPartContent(null);
            musclesBackParts.forEach((name) => map.set(name, false));
        }
        const shownElements = document.querySelectorAll('.show');
        shownElements.forEach((element) => element.classList.remove('show'));
        setSelection(option);
        setIsSelected(map);
        setSideSelected(null);
    }

    const handleClick = (e, side) => {
        const name = e.target.value;
        let newPartImage = null; let defaultImage = null;
        let newPartContent = null; let defaultContent = null;
        const currIsSelected = isSelected.get(name);
        const map = new Map();
        if(selection === "Organs"){
            newPartImage = organsInfo.get(name)[0]; defaultImage = organsInfo.get("All")[0];
            newPartContent = organsInfo.get(name)[1];
            organsParts.forEach((name) => map.set(name, false));
        }else if(selection === "Skeleton"){
            newPartImage = skeletonInfo.get(name)[0]; defaultImage = skeletonInfo.get("All")[0];
            newPartContent = skeletonInfo.get(name)[1];
            skeletonParts.forEach((name) => map.set(name, false));
        }else if(selection === "Muscles (Front)"){
            newPartImage = musclesFrontInfo.get(name)[0]; defaultImage = musclesFrontInfo.get("All")[0];
            newPartContent = musclesFrontInfo.get(name)[1];
            musclesFrontParts.forEach((name) => map.set(name, false));
        }else if(selection === "Muscles (Back)"){
            newPartImage = musclesBackInfo.get(name)[0]; defaultImage = musclesBackInfo.get("All")[0];
            newPartContent = musclesBackInfo.get(name)[1];
            musclesBackParts.forEach((name) => map.set(name, false));
        }
        if(!currIsSelected){
            map.set(name, true);
        }else{
            newPartImage = defaultImage;
            newPartContent = defaultContent;
        }
        const shownElements = document.querySelectorAll('.partsLeftContent, .partsRightContent');
        shownElements.forEach((element) => element.classList.remove('show'));
        shownElements.forEach((element) => element.scroll(0, 0));
        setPart(name);
        setPartImage(newPartImage);
        setPartContent(newPartContent);
        setIsSelected(map);
        setSideSelected(side);
    }

    return(
        <div className="bodyMapScene">
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
                        {(isSelected.get(part) && sideSelected === "left") && <p style={{whiteSpace: "pre-line"}}>{partContent}</p>}
                    </div>
                    <div className="partsLeft hide slideInLeft">
                        {parts.slice(0, parts.length / 2).map((name) => (
                            <div key={name}>
                                {(!isSelected.get(name) || sideSelected === "right") && <button value={name} onClick={(e) => handleClick(e, "left")}>{name}</button>}
                                {(isSelected.get(name) && sideSelected === "left") && <button value={name} onClick={(e) => handleClick(e, "left")} style={{backgroundColor: "#71797E"}}>{name}</button>}
                            </div>
                        ))}
                    </div>
                    <div className="mapDiagram hide slideInBottom" style={{backgroundImage: "linear-gradient(rgba(40,40,43,0.75), rgba(40,40,43,0.75)), url(" + diagramImage + ")"}}>
                        <img src={partImage} alt=""></img>
                    </div>
                    <div className="partsRight hide slideInRight">
                        {parts.slice(parts.length / 2, parts.length).map((name) => (
                            <div key={name}>
                                {(!isSelected.get(name) || sideSelected === "left") && <button value={name} onClick={(e) => handleClick(e, "right")}>{name}</button>}
                                {(isSelected.get(name) && sideSelected === "right") && <button value={name} onClick={(e) => handleClick(e, "right")} style={{backgroundColor: "#71797E"}}>{name}</button>}
                            </div>
                        ))}
                    </div>
                    <div className="partsRightContent hide slideInRight">
                        {(isSelected.get(part) && sideSelected === "right") && <p style={{whiteSpace: "pre-line"}}>{partContent}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BodyMap;