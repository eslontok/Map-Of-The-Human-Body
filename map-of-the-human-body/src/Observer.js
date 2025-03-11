import {useEffect} from "react";

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