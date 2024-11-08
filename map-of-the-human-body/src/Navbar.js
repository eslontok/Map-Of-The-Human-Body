function Navbar(){
    return(
        <nav className="navbar">
            <h1>Map Of The Human Body</h1> {/* maybe insert a neuron figure here */}
            <div className="links">
                <a href="/">Home</a>
                <a href="/">Map</a>
                <a href="/">Systems</a>
                <a href="/">Diseases/Treatments</a>
                <a href="/">Discussions</a>
            </div>
        </nav>
    );
}

export default Navbar;