import {useState, useEffect} from "react";
import DiscussionsList from "./DiscussionsList";

function Discussions(){

    const [discussions, setDiscussions] = useState([
        {id: 1, title: "Discussion1", author: "anonymous1", body: "This is discussion1 by anonymous1"},
        {id: 2, title: "Discussion2", author: "anonymous2", body: "This is discussion2 by anonymous2"},
        {id: 3, title: "Discussion3", author: "anonymous3", body: "This is discussion3 by anonymous3"}
    ]);

    const handleDelete = (id) => {
        const newDiscussions = discussions.filter(discussion => discussion.id !== id);
        setDiscussions(newDiscussions);
    }

    useEffect(() => {
        console.log("Use Effect Works!");
        console.log(discussions);
    });

    return(
        <div className="discussions">
            <h2>Discussions</h2>
            <DiscussionsList discussions={discussions} handleDelete={handleDelete}/>
        </div>
    );
}

export default Discussions;