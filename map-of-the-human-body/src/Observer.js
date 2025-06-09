import {useEffect} from "react";

/**
 * Observer function watches what is currently displayed on the viewport (the screen)
 * Adds "show" to any element's class name that contains "hide" when the element appears on the screen
 * @author Earl Lontok
 */
function Observer(){
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting){
                    entry.target.classList.add('show');
                }else{
                    entry.target.classList.remove('show');
                }
            });
        });
        
        const hiddenElements = document.querySelectorAll('.hide');
        hiddenElements.forEach((element) => observer.observe(element));
    });
}

export default Observer;