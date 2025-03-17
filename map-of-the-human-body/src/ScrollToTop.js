import {useEffect} from "react";

function ScrollToTop() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
}

export default ScrollToTop;