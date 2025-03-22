import "./css/map.css";
import {useState} from "react";
import ScrollToTop from "./ScrollToTop";

function Map(){

    const [selection, setSelection] = useState("Organs");

    const organsParts = ["All","Brain","Esophagus","Lungs","Heart","Stomach","Liver","Pancreas","Gallbladder","Small Intestine","Large Intestine","Kidney","Bladder"];
    const skeletonParts = ["All","Head","Collar","Upper Arm","Forearm","Hands","Spine","Torso","Hip","Thigh","Lower Leg","Feet"];
    const musclesFrontParts = ["All","Head","Shoulders","Upper Arm","Forearm","Hands","Chest","Abdomen","Obliques","Thigh","Lower Leg","Feet"];
    const musclesBackParts = ["All","Traps","Shoulders","Upper Arm","Lats","Obliques","Glutes","Thigh","Lower Leg"];

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
                    <div className="mapParts">
                        {selection === "Organs" && organsParts.map((organ) => (
                            <div key={organ}>
                                <button value={organ}>{organ}</button>
                            </div>
                        ))}
                        {selection === "Skeleton" && skeletonParts.map((bone) => (
                            <div key={bone}>
                                <button value={bone}>{bone}</button>
                            </div>
                        ))}
                        {selection === "Muscles (Front)" && musclesFrontParts.map((muscle) => (
                            <div key={muscle}>
                                <button value={muscle}>{muscle}</button>
                            </div>
                        ))}
                        {selection === "Muscles (Back)" && musclesBackParts.map((muscle) => (
                            <div key={muscle}>
                                <button value={muscle}>{muscle}</button>
                            </div>
                        ))}
                    </div>
                    <div className="mapDiagram">
                        <button>Image Goes Here</button>
                    </div>
                    <div className="mapDescription">
                        <p>This is random content that will be replaced by real content in the near future. The purpose of this random content is to simply test and see how much space it takes up on the browser. Let us now see whether or not this test is successful. I sure hope it is considering how much random nonsense I am typing here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Map;