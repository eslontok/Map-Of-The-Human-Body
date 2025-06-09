import "./css/notFound.css";
import {Link} from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

/**
 * NotFound component displays the 404 page and handles any logic relating to the 404 page
 * @author Earl Lontok
 */
function NotFound(){
    return(
        <div className="notFoundScene">
            <div className="notFound">
                <ScrollToTop/>
                <h2>404 Page Not Found</h2>
                <Link to="/">Go to Home</Link>
            </div>
        </div>
    );
}

export default NotFound;