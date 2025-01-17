import {useState, useEffect} from "react";
import DiscussionsList from "./DiscussionsList";

function Discussions(){

    const [discussions, setDiscussions] = useState(null);

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
        console.log("Use Effect Triggered!");
        fetch("http://localhost:8000/discussions")
            .then(response => {
                return response.json();
            })
            .then(data => {
                setDiscussions(data);
            })
    }, []);

    return(
        <div className="discussions">
            <h2>Discussions</h2>
            {discussions && <DiscussionsList discussions={discussions} handleDelete={handleDelete} handleLike={handleLike} handleDislike={handleDislike}/>}
        </div>
    );
}

export default Discussions;