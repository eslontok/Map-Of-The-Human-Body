import "./css/systems.css";
import {useRef} from "react";
import Observer from "./Observer";
import ScrollToTop from "./ScrollToTop";
import systemsInfo from "./SystemsInfo";

function Systems(){
    
    const refs = useRef();

    const scrollToSystem = (title) => {
        const map = initializeMap();
        const node = map.get(title);
        node.scrollIntoView({behavior: "smooth"});
    }

    const initializeMap = () => {
        if(refs.current == null){
            refs.current = new Map();
        }
        return refs.current;
    }

    return(
        <div className="systemsScene">
            <div className="systemsList">
                <button onClick={() => scrollToSystem("Nervous")}>Nervous</button>
                <button onClick={() => scrollToSystem("Endocrine")}>Endocrine</button>
                <button onClick={() => scrollToSystem("Musculoskeletal")}>Musculoskeletal</button>
                <button onClick={() => scrollToSystem("Cardiovascular")}>Cardiovascular</button>
                <button onClick={() => scrollToSystem("Respiratory")}>Respiratory</button>
                <button onClick={() => scrollToSystem("Renal")}>Renal</button>
                <button onClick={() => scrollToSystem("Digestive")}>Digestive</button>
                <button onClick={() => scrollToSystem("Reproductive (Male)")}>Reproductive</button>
                <button onClick={() => scrollToSystem("Immune")}>Immune</button>
            </div>
            <div className="systems">
                <Observer/>
                <ScrollToTop/>
                {systemsInfo.map((system) => (
                    <div className="systemDetails" key={system.title} ref={(node) => {
                        const map = initializeMap();
                        map.set(system.title, node);
                    }}>
                        <h2 className="hide slideInRight">{system.title}</h2>
                        <img className="hide slideInRight animate-stagger-short" src={system.image} alt=""></img>
                        <p className="hide slideInRight animate-stagger-long">{system.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Systems;