import "./css/diseases.css";
import Observer from "./Observer";
import ScrollToTop from "./ScrollToTop";
import diseasesInfo from "./DiseasesInfo";

function Diseases(){
    return(
        <div className="diseasesScene">
            <div className="diseasesList">
                <button>Heart Disease</button>
                <button>Respiratory Disease</button>
                <button>Kidney Disease</button>
                <button>Influenza (Flu)</button>
                <button>Diabetes</button>
                <button>Cancer</button>
            </div>
            <div className="diseases">
                <Observer/>
                <ScrollToTop/>
                {diseasesInfo.map((disease) => (
                    <div className="diseaseDetails" key={disease.title}>
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