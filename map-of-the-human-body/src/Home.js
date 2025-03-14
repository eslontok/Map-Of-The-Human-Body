import "./css/home.css";
import Observer from "./Observer";

function Home(){

    return(
        <div className="home">
            <Observer/>
            <div className="header">
                <h2 className="hide">Map of the<br></br>Human Body</h2>
                <button className="hide animate-stagger">Explore</button>
            </div>
            <div className="body">
                <h1>Welcome!</h1>
                <p>The human body is nothing short of an engineering masterpiece. Composed of trillions of cells, the body is capable of regulating several physiological systems simultaneously and involuntarily. It is a machine that can distribute energy and resources based on the user's needs. It is a machine that can multitask or concentrate all efforts toward a single purpose. It is a machine that continues to operate despite damage and fatigue. Resilient. Adaptable. Complete. The body's ability to maintain homeostasis, regenerate, and adjust to its external environment barely scratch the surface of the body's wonders. People are often fascinated with cell phones, airplanes, and skyscrapers, yet many fail to see that we ourselves are one of the greatest feats of engineering.</p>
            </div>
        </div>
    );
}

export default Home;