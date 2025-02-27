import {Link} from "react-router-dom";
import map from "./DiscussionsLikeDislikeMap";

function DiscussionsList(props){

    const discussions = props.discussions;
    const updateLikeDislike = props.updateLikeDislike;

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

    return(
        <div className="discussionsList">
            {discussions.map((discussion) => (
                <div className="discussionPreview" key={discussion.id}>
                    <Link to={`/discussions/${discussion.id}`}>
                        <h3>{discussion.title}</h3>
                        <h4>Posted by: {discussion.author}</h4>
                        <p>{discussion.body}</p>
                    </Link>
                    <button onClick={() => handleLike(discussion.id)}>
                        {(map.has(discussion.id) && map.get(discussion.id)[0] === true) && <span className="material-symbols-outlined" style={{color: "#00FFFF"}}>thumb_up</span>}
                        {(!map.has(discussion.id) || map.get(discussion.id)[0] === false) && <span className="material-symbols-outlined">thumb_up</span>}
                        {discussion.likes}
                    </button>
                    <button onClick={() => handleDislike(discussion.id)}>
                        {(map.has(discussion.id) && map.get(discussion.id)[1] === true) && <span className="material-symbols-outlined" style={{color: "#00FFFF"}}>thumb_down</span>}
                        {(!map.has(discussion.id) || map.get(discussion.id)[1] === false) && <span className="material-symbols-outlined">thumb_down</span>}
                        {discussion.dislikes}
                    </button>
                    <Link to={`/discussions/${discussion.id}`}>
                        <button>
                            <span className="material-symbols-outlined">mode_comment</span>
                            {discussion.comments.length}
                        </button>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default DiscussionsList;