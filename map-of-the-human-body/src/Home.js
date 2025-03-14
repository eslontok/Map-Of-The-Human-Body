import "./css/home.css";
import {useRef} from "react";
import {Link} from "react-router-dom";
import Observer from "./Observer";
import body from "./css/images/body.png";
import system from "./css/images/system.png";
import disease from "./css/images/disease.png";

function Home(){

    const exploreRef = useRef();

    const handleExplore = () => {
        exploreRef.current.scrollIntoView({behavior: "smooth"});
    }

    return(
        <div className="home">
            <Observer/>
            <div className="header">
                <h2 className="hide">Map of the<br></br>Human Body</h2>
                <button className="hide animate-stagger-long" onClick={handleExplore}>Explore</button>
            </div>
            <div className="body">
                <h1>Welcome!</h1>
                <p>The human body is nothing short of an engineering masterpiece. Composed of trillions of cells, the body is capable of regulating several physiological systems simultaneously and involuntarily. It is a machine that can distribute energy and resources based on the user's needs. It is a machine that can multitask or concentrate all efforts toward a single purpose. It is a machine that continues to operate despite damage and fatigue. Resilient. Adaptable. Complete. The body's ability to maintain homeostasis, regenerate, and adjust to its external environment barely scratch the surface of the body's wonders. People are often fascinated with cell phones, airplanes, and skyscrapers, yet many fail to see that we ourselves are one of the greatest feats of engineering.</p>
                <div className="options" ref={exploreRef}>
                    <div>
                        <Link to="/map">
                            <button className="hide" title="Map"><img src={body} alt=""></img></button>
                        </Link>
                        <p>Begin your journey and navigate the map of the human body.</p>
                    </div>
                    <div>
                        <Link to="/systems">
                            <button className="hide animate-stagger-short" title="Systems"><img src={system} alt=""></img></button>
                        </Link>
                        <p>Understand the physiological systems that allow you to go about your day.</p>
                    </div>
                    <div>
                        <Link to="/diseases">
                            <button className="hide animate-stagger-long" title="Diseases"><img src={disease} alt=""></img></button>
                        </Link>
                        <p>Know your body's common enemies and learn their weaknesses.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;