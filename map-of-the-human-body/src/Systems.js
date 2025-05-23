import "./css/systems.css";
import Observer from "./Observer";
import ScrollToTop from "./ScrollToTop";
import systemsInfo from "./SystemsInfo";

function Systems(){
    
    return(
        <div className="systemsScene">
            <div className="systemsList">
                <button>Nervous</button>
                <button>Endocrine</button>
                <button>Musculoskeletal</button>
                <button>Cardiovascular</button>
                <button>Respiratory</button>
                <button>Renal</button>
                <button>Digestive</button>
                <button>Reproductive</button>
                <button>Immune</button>
            </div>
            <div className="systems">
                <Observer/>
                <ScrollToTop/>
                {systemsInfo.map((system) => (
                    <div className="systemDetails" key={system.title} >
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