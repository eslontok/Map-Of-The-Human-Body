import {useEffect} from "react";

/**
 * ScrollToTop function scrolls to the top when a new page is visited
 * @author Earl Lontok
 */
function ScrollToTop() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
}

export default ScrollToTop;