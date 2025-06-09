import "./css/diseases.css";
import {useRef} from "react";
import Observer from "./Observer";
import ScrollToTop from "./ScrollToTop";
import diseasesInfo from "./DiseasesInfo";

/**
 * Diseases component displays the Diseases page and handles any logic relating to the Diseases page
 * @author Earl Lontok
 */
function Diseases(){

    const refs = useRef();

    //scrolls to the referenced element (the disease that was clicked)
    const scrollToDisease = (title) => {
        const map = initializeMap();
        const node = map.get(title);
        node.scrollIntoView({behavior: "smooth"});
    }

    //initializes refs to be a map that holds referenced elements (the diseases)
    const initializeMap = () => {
        if(refs.current == null){
            refs.current = new Map();
        }
        return refs.current;
    }

    return(
        <div className="diseasesScene">
            <div className="diseasesList">
                <button onClick={() => scrollToDisease("Heart Disease")}>Heart Disease</button>
                <button onClick={() => scrollToDisease("Respiratory Disease")}>Respiratory Disease</button>
                <button onClick={() => scrollToDisease("Kidney Disease")}>Kidney Disease</button>
                <button onClick={() => scrollToDisease("Influenza (Flu)")}>Influenza (Flu)</button>
                <button onClick={() => scrollToDisease("Diabetes")}>Diabetes</button>
                <button onClick={() => scrollToDisease("Cancer")}>Cancer</button>
            </div>
            <div className="diseases">
                <Observer/>
                <ScrollToTop/>
                {diseasesInfo.map((disease) => (
                    <div className="diseaseDetails" key={disease.title} ref={(node) => {
                        const map = initializeMap();
                        map.set(disease.title, node);
                    }}>
                        <h2 className="hide slideInRight">{disease.title}</h2>
                        <img className="hide slideInRight animate-stagger-short" src={disease.image} alt=""></img>
                        <p className="hide slideInRight animate-stagger-long" style={{whiteSpace: "pre-line"}}>{disease.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Diseases;