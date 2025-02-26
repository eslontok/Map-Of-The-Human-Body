import {useState} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import useFetch from "./useFetch";
import map from "./LikeDislikeMap";

function DiscussionDetails(){

    const {id} = useParams();
    const {data: discussion, setData: setDiscussion, isLoading, error} = useFetch("http://localhost:8000/discussions/" + id);

    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

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

    return(
        <div className="discussionDetails">
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
        </div>
    );
}

export default DiscussionDetails;