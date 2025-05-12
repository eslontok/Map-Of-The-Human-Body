import "./css/bodyMap.css";
import {useState, useRef} from "react";
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
    const [diagramPartImage, setDiagramPartImage] = useState(organsInfo.get("All")[0]);
    const [partContent, setPartContent] = useState(null);
    const [partImage, setPartImage] = useState(null);

    const [isSelected, setIsSelected] = useState(new Map());

    const diagramRef = useRef();

    const handleChange = (e) => {
        const option = e.target.value;
        const map = new Map();
        if(option === "Organs"){
            const organsImage = organsInfo.get("All")[0];
            setDiagramImage(organsImage); setParts(organsParts); setPart("All"); setDiagramPartImage(organsImage);
            organsParts.forEach((name) => map.set(name, false));
        }else if(option === "Skeleton"){
            const skeletonImage = skeletonInfo.get("All")[0];
            setDiagramImage(skeletonImage); setParts(skeletonParts); setPart("All"); setDiagramPartImage(skeletonImage);
            skeletonParts.forEach((name) => map.set(name, false));
        }else if(option === "Muscles (Front)"){
            const musclesFrontImage = musclesFrontInfo.get("All")[0];
            setDiagramImage(musclesFrontImage); setParts(musclesFrontParts); setPart("All"); setDiagramPartImage(musclesFrontImage);
            musclesFrontParts.forEach((name) => map.set(name, false));
        }else if(option === "Muscles (Back)"){
            const musclesBackImage = musclesBackInfo.get("All")[0];
            setDiagramImage(musclesBackImage); setParts(musclesBackParts); setPart("All"); setDiagramPartImage(musclesBackImage);
            musclesBackParts.forEach((name) => map.set(name, false));
        }
        const shownElements = document.querySelectorAll('.show');
        shownElements.forEach((element) => element.classList.remove('show'));
        diagramRef.current.scrollIntoView();
        setSelection(option);
        setPartContent(null);
        setPartImage(null);
        setIsSelected(map);
    }

    const handleClick = (e) => {
        const name = e.target.value;
        let newDiagramPartImage = null; let defaultDiagramPartImage = null;
        let newPartContent = null;
        let newPartImage = null;
        const currIsSelected = isSelected.get(name);
        const map = new Map();
        if(selection === "Organs"){
            newDiagramPartImage = organsInfo.get(name)[0]; defaultDiagramPartImage = organsInfo.get("All")[0];
            newPartContent = organsInfo.get(name)[2];
            newPartImage = organsInfo.get(name)[1];
            organsParts.forEach((name) => map.set(name, false));
        }else if(selection === "Skeleton"){
            newDiagramPartImage = skeletonInfo.get(name)[0]; defaultDiagramPartImage = skeletonInfo.get("All")[0];
            newPartContent = skeletonInfo.get(name)[2];
            newPartImage = skeletonInfo.get(name)[1];
            skeletonParts.forEach((name) => map.set(name, false));
        }else if(selection === "Muscles (Front)"){
            newDiagramPartImage = musclesFrontInfo.get(name)[0]; defaultDiagramPartImage = musclesFrontInfo.get("All")[0];
            newPartContent = musclesFrontInfo.get(name)[2];
            newPartImage = musclesFrontInfo.get(name)[1];
            musclesFrontParts.forEach((name) => map.set(name, false));
        }else if(selection === "Muscles (Back)"){
            newDiagramPartImage = musclesBackInfo.get(name)[0]; defaultDiagramPartImage = musclesBackInfo.get("All")[0];
            newPartContent = musclesBackInfo.get(name)[2];
            newPartImage = musclesBackInfo.get(name)[1];
            musclesBackParts.forEach((name) => map.set(name, false));
        }
        if(!currIsSelected){
            map.set(name, true);
        }else{
            newDiagramPartImage = defaultDiagramPartImage;
            newPartContent = null;
            newPartImage = null;
        }
        const shownElements = document.querySelectorAll('.partsContent, .partsImage');
        shownElements.forEach((element) => element.classList.remove('show'));
        shownElements.forEach((element) => element.scroll(0, 0));
        setPart(name);
        setDiagramPartImage(newDiagramPartImage);
        setPartContent(newPartContent);
        setPartImage(newPartImage);
        setIsSelected(map);
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
                    <div className="partsContent hide slideInLeft">
                        {isSelected.get(part) && <p style={{whiteSpace: "pre-line"}}>{partContent}</p>}
                    </div>
                    <div className="partsLeft hide slideInLeft">
                        {parts.slice(0, parts.length / 2).map((name) => (
                            <div key={name}>
                                {!isSelected.get(name) && <button value={name} onClick={(e) => handleClick(e)}>{name}</button>}
                                {isSelected.get(name) && <button value={name} onClick={(e) => handleClick(e)} style={{backgroundColor: "#71797E"}}>{name}</button>}
                            </div>
                        ))}
                    </div>
                    <div className="mapDiagram hide slideInBottom" style={{backgroundImage: "linear-gradient(rgba(40,40,43,0.75), rgba(40,40,43,0.75)), url(" + diagramImage + ")"}} ref={diagramRef}>
                        <img src={diagramPartImage} alt=""></img>
                    </div>
                    <div className="partsRight hide slideInRight">
                        {parts.slice(parts.length / 2, parts.length).map((name) => (
                            <div key={name}>
                                {!isSelected.get(name) && <button value={name} onClick={(e) => handleClick(e)}>{name}</button>}
                                {isSelected.get(name) && <button value={name} onClick={(e) => handleClick(e)} style={{backgroundColor: "#71797E"}}>{name}</button>}
                            </div>
                        ))}
                    </div>
                    <div className="partsImage hide slideInRight">
                        {isSelected.get(part) && <img src={partImage} alt=""></img>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BodyMap;