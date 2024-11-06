function Navbar(){
    return(
        <nav className="navbar">
            <h1>Map Of The Human Body</h1> {/* maybe insert a neuron figure here */}
            <div className="links">
                <a href="/">Home</a>
                <a href="/">Map</a>
                <a href="/">Systems</a>
                <a href="/">Diseases</a>
                <a href="/">Treatments</a>
                <a href="/">About</a>
            </div>
        </nav>
    );
}

export default Navbar;