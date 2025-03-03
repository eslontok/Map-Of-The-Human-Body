import {useState} from "react";
import {Link} from "react-router-dom";
import DiscussionsList from "./DiscussionsList";
import useFetch from "./useFetch";

function Discussions(){

    const {data: discussions, setData: setDiscussions, isLoading, error} = useFetch("http://localhost:8000/discussions");
    const [selection, setSelection] = useState("-");

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

    //discussions array is iterated left to right and rendered top to bottom
    //therefore, an ascending array is rendered in ascending order top to bottom
    //goal: highest rating should be top to bottom - invert 1 and -1 when comparing
    const compareAsc = (disc1, disc2) => {
        const rateDiff1 = disc1.likes - disc1.dislikes;
        const rateDiff2 = disc2.likes - disc2.dislikes;
        if(rateDiff1 < rateDiff2){
            return 1;
        }
        if(rateDiff1 > rateDiff2){
            return -1;
        }
        return 0;
    }

    //discussions array is iterated left to right and rendered top to bottom
    //therefore, a descending array is rendered in descending order top to bottom
    //goal: lowest rating should be top to bottom - invert 1 and -1 when comparing
    const compareDesc = (disc1, disc2) => {
        const rateDiff1 = disc1.likes - disc1.dislikes;
        const rateDiff2 = disc2.likes - disc2.dislikes;
        if(rateDiff1 < rateDiff2){
            return -1;
        }
        if(rateDiff1 > rateDiff2){
            return 1;
        }
        return 0;
    }

    const handleChange = (e) => {
        if(e.target.value === "Highest Rating"){
            discussions.sort(compareAsc);
        }else if(e.target.value === "Lowest Rating"){
            discussions.sort(compareDesc);
        }
        setSelection(e.target.value);
    }

    return(
        <div className="discussions">
            <h2>Discussions</h2>
            <Link to="/discussions/create">
                <button style={{float: "right", fontSize: "20px"}}>+ New Discussion</button>
            </Link>
            <div>
                <label>Sort By:</label>
                <select value={selection} onChange={(e) => handleChange(e)}>
                    <option value="-">-</option>
                    <option value="Highest Rating">Highest Rating</option>
                    <option value="Lowest Rating">Lowest Rating</option>
                </select>
            </div>
            {error && <div style={{color: "#D2042D"}}>{error}</div>}
            {isLoading && <div>Loading discussions...</div>}
            {discussions && <DiscussionsList discussions={discussions} updateLikeDislike={updateLikeDislike}/>}
        </div>
    );
}

export default Discussions;