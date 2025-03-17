import "./css/discussionDetails.css";
import {useState} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import CommentsList from "./CommentsList";
import useFetch from "./useFetch";
import map from "./DiscussionsLikeDislikeMap";
import ScrollToTop from "./ScrollToTop";

function DiscussionDetails(){

    const {id} = useParams();
    const {data: discussion, setData: setDiscussion, isLoading, error} = useFetch("http://localhost:8000/discussions/" + id);

    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const [selection, setSelection] = useState("-");

    const updateLikeDislike = (id, like, dislike) => {
        const newDiscussion = {...discussion};
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
        setDiscussion(newDiscussion);
    }

    const handleLike = (id) => { //map.get(id) = [liked?, disliked?] for discussion.id === id
        let like = 0;
        let dislike = 0;
        if(map.has(id)){
            const arr = map.get(id);
            const liked = arr[0];
            const disliked = arr[1];
            if(liked){
                map.set(id, [false, false]);
                like = -1;
            }else{
                map.set(id, [true, false]);
                like = 1;
            }
            if(disliked){
                dislike = -1;
            }
        }else{
            map.set(id, [true, false]);
            like = 1;
        }
        updateLikeDislike(id, like, dislike);
    }

    const handleDislike = (id) => { //map.get(id) = [liked?, disliked?] for discussion.id === id
        let like = 0;
        let dislike = 0;
        if(map.has(id)){
            const arr = map.get(id);
            const liked = arr[0];
            const disliked = arr[1];
            if(disliked){
                map.set(id, [false, false]);
                dislike = -1;
            }else{
                map.set(id, [false, true]);
                dislike = 1;
            }
            if(liked){
                like = -1;
            }
        }else{
            map.set(id, [false, true]);
            dislike = 1;
        }
        updateLikeDislike(id, like, dislike);
    }

    const handleDelete = () => {
        setIsDeleting(true);
        setTimeout(() => {
            fetch("http://localhost:8000/discussions/" + id, {
                method: "DELETE"
            }).then(() => {
                setIsDeleting(false);
                navigate("/discussions");
            });
        }, 500);
    }

    //discussions array is iterated left to right and rendered top to bottom
    //therefore, an ascending array is rendered in ascending order top to bottom
    //goal: highest rating should be top to bottom - invert 1 and -1 when comparing
    const compareAsc = (com1, com2) => {
        const rateDiff1 = com1.likes - com1.dislikes;
        const rateDiff2 = com2.likes - com2.dislikes;
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
    const compareDesc = (com1, com2) => {
        const rateDiff1 = com1.likes - com1.dislikes;
        const rateDiff2 = com2.likes - com2.dislikes;
        if(rateDiff1 < rateDiff2){
            return -1;
        }
        if(rateDiff1 > rateDiff2){
            return 1;
        }
        return 0;
    }

    const handleChange = (e) => {
        const comments = discussion.comments;
        if(e.target.value === "Highest Rating"){
            comments.sort(compareAsc);
        }else if(e.target.value === "Lowest Rating"){
            comments.sort(compareDesc);
        }
        setSelection(e.target.value);
    }

    return(
        <div className="scene">
            <div className="discussionDetails">
                <ScrollToTop/>
                {error && <div style={{color: "#D2042D"}}>{error}</div>}
                {isLoading && <div>Loading discussion...</div>}
                {discussion && (
                    <article>
                        <h2>{discussion.title}</h2>
                        <h3>Posted by: {discussion.author}</h3>
                        <p>{discussion.body}</p>
                        <button onClick={() => handleLike(id)}>
                            {(map.has(id) && map.get(id)[0] === true) && <span className="material-symbols-outlined" style={{color: "#00FFFF"}}>thumb_up</span>}
                            {(!map.has(id) || map.get(id)[0] === false) && <span className="material-symbols-outlined">thumb_up</span>}
                            {discussion.likes}
                        </button>
                        <button onClick={() => handleDislike(id)}>
                            {(map.has(id) && map.get(id)[1] === true) && <span className="material-symbols-outlined" style={{color: "#00FFFF"}}>thumb_down</span>}
                            {(!map.has(id) || map.get(id)[1] === false) && <span className="material-symbols-outlined">thumb_down</span>}
                            {discussion.dislikes}
                        </button>
                        <Link to={`/discussions/${id}/comments`}>
                            <button>
                                <span className="material-symbols-outlined">mode_comment</span>
                                {discussion.comments.length}
                            </button>
                        </Link>
                        <div className="discussionButtons">
                            <Link to={`/discussions/${id}/edit`}>
                                <button>Edit</button>
                            </Link>
                            {!isDeleting && <button onClick={handleDelete}>Delete</button>}
                            {isDeleting && <button disabled>Deleting...</button>}
                        </div>
                    </article>
                )}
                {discussion &&
                    <div>
                        <label>Sort By:</label>
                        <select value={selection} onChange={(e) => handleChange(e)}>
                            <option value="-">-</option>
                            <option value="Highest Rating">Highest Rating</option>
                            <option value="Lowest Rating">Lowest Rating</option>
                        </select>
                    </div>
                }
                {discussion && <CommentsList discussion={discussion} setDiscussion={setDiscussion}/>}
            </div>
        </div>
    );
}

export default DiscussionDetails;