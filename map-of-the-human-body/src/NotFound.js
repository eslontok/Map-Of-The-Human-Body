import {Link} from "react-router-dom";

function NotFound(){
    return(
        <div className="notFound">
            <h2>404 Page Not Found</h2>
            <Link to="/">Go to Home</Link>
        </div>
    );
}

export default NotFound;