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
            <p>Coming Soon!</p>
        </div>
    );
}

export default Home;