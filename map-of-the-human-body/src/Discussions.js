import {useState, useEffect} from "react";
import DiscussionsList from "./DiscussionsList";
import {Link} from "react-router-dom";

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

    useEffect(() => {
        const abort = new AbortController();
        setTimeout(() => {
            fetch("http://localhost:8000/discussions", {signal: abort.signal})
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
                    if(error.name !== "AbortError"){
                        setIsLoading(false);
                        setError(error.message);
                    }
                });
        }, 500);
        return () => abort.abort();
    }, []);

    return(
        <div className="discussions">
            <h2>Discussions</h2>
            <Link to="/create">
                <button style={{float: "right", fontSize: "20px"}}>+ New Discussion</button>
            </Link>
            {error && <div style={{marginTop: "20px", color: "#D2042D"}}>{error}</div>}
            {isLoading && <div style={{marginTop: "20px"}}>Loading discussions...</div>}
            {discussions && <DiscussionsList discussions={discussions} handleLike={handleLike} handleDislike={handleDislike}/>}
        </div>
    );
}

export default Discussions;