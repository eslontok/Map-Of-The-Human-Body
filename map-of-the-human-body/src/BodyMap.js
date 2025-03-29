import "./css/bodyMap.css";
import {useState} from "react";
import Observer from "./Observer";
import ScrollToTop from "./ScrollToTop";
import organsInfo from "./OrgansInfo";
import skeletonInfo from "./SkeletonInfo";
import musclesFrontInfo from "./MusclesFrontInfo";
import musclesBackInfo from "./MusclesBackInfo";

function HumanMap(){

    const organsParts = ["All","Brain","Esophagus","Lungs","Heart","Stomach","Liver","Pancreas","Gallbladder","Small Intestine","Large Intestine","Kidneys","Bladder"]; //13
    const skeletonParts = ["All","Head","Collar","Upper Arm","Forearm","Hands","Spine","Torso","Hip","Thigh","Lower Leg","Feet"]; //12
    const musclesFrontParts = ["All","Head","Shoulders","Upper Arm","Forearm","Hands","Chest","Abdomen","Obliques","Thigh","Lower Leg","Feet"]; //12
    const musclesBackParts = ["All","Traps","Shoulders","Upper Arm","Lats","Lower Back","Glutes","Thigh","Lower Leg"]; //9

    const [selection, setSelection] = useState("Organs");
    const [parts, setParts] = useState(organsParts);
    const [diagram, setDiagram] = useState(organsInfo.get("All"));
    const [diagramPart, setDiagramPart] = useState(organsInfo.get("All"));
    const [diagramPartContent, setDiagramPartContent] = useState("All");

    const handleChange = (e) => {
        const option = e.target.value;
        if(option === "Organs"){
            const organsImage = organsInfo.get("All");
            setParts(organsParts); setDiagram(organsImage); setDiagramPart(organsImage);
        }else if(option === "Skeleton"){
            const skeletonImage = skeletonInfo.get("All");
            setParts(skeletonParts); setDiagram(skeletonImage); setDiagramPart(skeletonImage);
        }else if(option === "Muscles (Front)"){
            const musclesFrontImage = musclesFrontInfo.get("All");
            setParts(musclesFrontParts); setDiagram(musclesFrontImage); setDiagramPart(musclesFrontImage);
        }else if(option === "Muscles (Back)"){
            const musclesBackImage = musclesBackInfo.get("All");
            setParts(musclesBackParts); setDiagram(musclesBackImage); setDiagramPart(musclesBackImage);
        }
        const shownElements = document.querySelectorAll('.show');
        shownElements.forEach((element) => element.classList.remove('show'));
        setDiagramPartContent("All");
        setSelection(option);
    }

    const handleClick = (e) => {
        let diagramPartImage = null;
        if(selection === "Organs"){
            diagramPartImage = organsInfo.get(e.target.value);
        }else if(selection === "Skeleton"){
            diagramPartImage = skeletonInfo.get(e.target.value);
        }else if(selection === "Muscles (Front)"){
            diagramPartImage = musclesFrontInfo.get(e.target.value);
        }else if(selection === "Muscles (Back)"){
            diagramPartImage = musclesBackInfo.get(e.target.value);
        }
        setDiagramPartContent(e.target.value);
        setDiagramPart(diagramPartImage);
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
                        <p>This area here will contain the content for {diagramPartContent}. I decided that it will simply span the entire left page when an option is clicked. When the user clicks the same option again, the content will collapse and hide.</p>
                    </div>
                    <div className="partsLeft hide slideInLeft">
                        {parts.slice(0, parts.length / 2).map((part) => (
                            <div key={part}>
                                <button value={part} onClick={(e) => handleClick(e)}>{part}</button>
                            </div>
                        ))}
                    </div>
                    <div className="mapDiagram hide slideInBottom" style={{backgroundImage: "linear-gradient(rgba(40,40,43,0.75), rgba(40,40,43,0.75)), url(" + diagram + ")"}}>
                        <img src={diagramPart} alt=""></img>
                    </div>
                    <div className="partsRight hide slideInRight">
                        {parts.slice(parts.length / 2, parts.length).map((part) => (
                            <div key={part}>
                                <button value={part} onClick={(e) => handleClick(e)}>{part}</button>
                            </div>
                        ))}
                    </div>
                    <div className="partsRightContent hide slideInRight">
                        <p>This area here will contain the content for {diagramPartContent}. I decided that it will simply span the entire left page when an option is clicked. When the user clicks the same option again, the content will collapse and hide.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HumanMap;