import "./css/systems.css";
import Observer from "./Observer";
import ScrollToTop from "./ScrollToTop";

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
                <h2>Systems Page</h2>
                <p>Coming Soon!</p>
            </div>
        </div>
    );
}

export default Systems;