import {useState, useEffect} from "react";
import DiscussionsList from "./DiscussionsList";

function Discussions(){

    const [discussions, setDiscussions] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleLike = (id) => {
        const newDiscussions = discussions.map(discussion => {
            const newDiscussion = {...discussion};
            if(newDiscussion.id === id){
                newDiscussion.likes++;
            }
            return newDiscussion;
        });
        setDiscussions(newDiscussions);
    }

    const handleDislike = (id) => {
        const newDiscussions = discussions.map(discussion => {
            const newDiscussion = {...discussion};
            if(newDiscussion.id === id){
                newDiscussion.dislikes++;
            }
            return newDiscussion;
        });
        setDiscussions(newDiscussions);
    }

    const handleDelete = (id) => {
        const newDiscussions = discussions.filter(discussion => discussion.id !== id);
        setDiscussions(newDiscussions);
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:8000/discussions")
                .then(response => {
                    if(!response.ok){
                        throw Error("ERROR: Server reached but could not fetch data!");
                    }
                    return response.json();
                })
                .then(data => {
                    setDiscussions(data);
                    setIsLoading(false);
                    setError(null);
                })
                .catch(error =>{
                    setIsLoading(false);
                    setError(error.message);
                });
        }, 1000);
    }, []);

    return(
        <div className="discussions">
            <h2>Discussions</h2>
            {error && <div style={{marginTop: "20px", color: "#D2042D"}}>{error}</div>}
            {isLoading && <div style={{marginTop: "20px"}}>Loading discussions...</div>}
            {discussions && <DiscussionsList discussions={discussions} handleDelete={handleDelete} handleLike={handleLike} handleDislike={handleDislike}/>}
        </div>
    );
}

export default Discussions;