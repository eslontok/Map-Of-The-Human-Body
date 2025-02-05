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
        }, 1000);
        return () => abort.abort();
    }, []);

    return(
        <div className="discussions">
            <h2>Discussions</h2>
            <button style={{float: "right", fontSize: "20px"}}>+ New Discussion</button>
            {error && <div style={{marginTop: "20px", color: "#D2042D"}}>{error}</div>}
            {isLoading && <div style={{marginTop: "20px"}}>Loading discussions...</div>}
            {discussions && <DiscussionsList discussions={discussions} handleDelete={handleDelete} handleLike={handleLike} handleDislike={handleDislike}/>}
        </div>
    );
}

export default Discussions;