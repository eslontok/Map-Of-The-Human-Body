import {useState, useEffect} from "react";
import DiscussionsList from "./DiscussionsList";

function Discussions(){

    const [discussions, setDiscussions] = useState([
        {id: 1, title: "Discussion1", author: "anonymous1", body: "This is discussion1 by anonymous1", likes: 0, dislikes: 0},
        {id: 2, title: "Discussion2", author: "anonymous2", body: "This is discussion2 by anonymous2", likes: 0, dislikes: 0},
        {id: 3, title: "Discussion3", author: "anonymous3", body: "This is discussion3 by anonymous3", likes: 0, dislikes: 0}
    ]);

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
        //console.log(discussions);
    });

    return(
        <div className="discussions">
            <h2>Discussions</h2>
            <DiscussionsList discussions={discussions} handleDelete={handleDelete} handleLike={handleLike} handleDislike={handleDislike}/>
        </div>
    );
}

export default Discussions;