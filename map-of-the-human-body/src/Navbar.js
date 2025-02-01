import {Link} from 'react-router-dom';

function Navbar(){
    return(
        <nav className="navbar">
            <h1>Map Of The Human Body</h1> {/* maybe insert a neuron figure here */}
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/map">Map</Link>
                <Link to="/systems">Systems</Link>
                <Link to="/diseases">Diseases</Link>
                <Link to="/discussions">Discussions</Link>
            </div>
        </nav>
    );
}

export default Navbar;