import {Link} from "react-router-dom";
import DiscussionsList from "./DiscussionsList";
import useFetch from "./useFetch";

function Discussions(){

    const {data: discussions, setData: setDiscussions, isLoading, error} = useFetch("http://localhost:8000/discussions");

    const updateLikeDislike = (id, like, dislike) => {
        const newDiscussions = discussions.map(discussion => {
            const newDiscussion = {...discussion};
            if(newDiscussion.id === id){
                newDiscussion.likes += like;
                newDiscussion.dislikes += dislike;
                fetch("http://localhost:8000/discussions/" + id, {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        likes: newDiscussion.likes,
                        dislikes: newDiscussion.dislikes
                    })
                });
            }
            return newDiscussion;
        });
        setDiscussions(newDiscussions);
    }

    return(
        <div className="discussions">
            <h2>Discussions</h2>
            <Link to="/discussions/create">
                <button style={{float: "right", fontSize: "20px"}}>+ New Discussion</button>
            </Link>
            {error && <div style={{color: "#D2042D"}}>{error}</div>}
            {isLoading && <div>Loading discussions...</div>}
            {discussions && <DiscussionsList discussions={discussions} updateLikeDislike={updateLikeDislike}/>}
        </div>
    );
}

export default Discussions;