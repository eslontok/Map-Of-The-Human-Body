import "./css/commentsList.css";
import map from "./CommentsLikeDislikeMap";

function CommentsList(props){

    const discussion = props.discussion;
    const setDiscussion = props.setDiscussion;

    const id = discussion.id;
    const comments = discussion.comments;

    const updateLikeDislike = (commentId, like, dislike) => {
        const newComments = comments.map(comment => {
            const newComment = {...comment};
            if(newComment.commentId === commentId){
                newComment.likes += like;
                newComment.dislikes += dislike;
            }
            return newComment;
        });
        const newDiscussion = {...discussion};
        newDiscussion.comments = newComments;
        fetch("http://localhost:8000/discussions/" + id, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                comments: newComments
            })
        });
        setDiscussion(newDiscussion);
    }

    const handleLike = (commentId) => {
        let like = 0;
        let dislike = 0;
        if(map.has(id)){ //at least 1 comment under discussion.id === id has been liked
            const commentsMap = map.get(id);
            if(commentsMap.has(commentId)){
                const arr = commentsMap.get(commentId);
                const liked = arr[0];
                const disliked = arr[1];
                if(liked){
                    commentsMap.set(commentId, [false, false]);
                    like = -1;
                }else{
                    commentsMap.set(commentId, [true, false]);
                    like = 1;
                }
                if(disliked){
                    dislike = -1;
                }
            }else{
                commentsMap.set(commentId, [true, false]);
                like = 1;
            }
            map.set(id, commentsMap);
        }else{ //no comments under discussion.id === id have been liked
            const commentsMap = new Map();
            commentsMap.set(commentId, [true, false]);
            map.set(id, commentsMap);
            like = 1;
        }
        updateLikeDislike(commentId, like, dislike);
    }

    const handleDislike = (commentId) => {
        let like = 0;
        let dislike = 0;
        if(map.has(id)){
            const commentsMap = map.get(id);
            if(commentsMap.has(commentId)){
                const arr = commentsMap.get(commentId);
                const liked = arr[0];
                const disliked = arr[1];
                if(disliked){
                    commentsMap.set(commentId, [false, false]);
                    dislike = -1;
                }else{
                    commentsMap.set(commentId, [false, true]);
                    dislike = 1;
                }
                if(liked){
                    like = -1;
                }
            }else{
                commentsMap.set(commentId, [false, true]);
                dislike = 1;
            }
            map.set(id, commentsMap);
        }else{
            const commentsMap = new Map();
            commentsMap.set(commentId, [false, true]);
            map.set(id, commentsMap);
            dislike = 1;
        }
        updateLikeDislike(commentId, like, dislike);
    }

    const handleDelete = (commentId) => {
        const newComments = comments.filter(comment => comment.commentId !== commentId);
        const newDiscussion = {...discussion};
        newDiscussion.comments = newComments;
        fetch("http://localhost:8000/discussions/" + id, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                comments: newComments
            })
        });
        if(map.has(id) && map.get(id).has(commentId)){
            const commentsMap = map.get(id);
            commentsMap.delete(commentId);
            map.set(id, commentsMap);
        }
        setDiscussion(newDiscussion);
    }

    return(
        <div className="commentsList">
            {comments.map((comment) => (
                <div className="commentPreview" key={comment.commentId}>
                    <h4>Commented by: {comment.author}</h4>
                    <p>{comment.body}</p>
                    <button onClick={() => handleLike(comment.commentId)}>
                        {
                            (map.has(id) && map.get(id).has(comment.commentId) && map.get(id).get(comment.commentId)[0] === true)
                            && <span className="material-symbols-outlined" style={{color: "#00FFFF"}}>thumb_up</span>
                        }
                        {
                            (!map.has(id) || !map.get(id).has(comment.commentId) || map.get(id).get(comment.commentId)[0] === false)
                            && <span className="material-symbols-outlined">thumb_up</span>
                            }
                        {comment.likes}
                    </button>
                    <button onClick={() => handleDislike(comment.commentId)}>
                        {
                            (map.has(id) && map.get(id).has(comment.commentId) && map.get(id).get(comment.commentId)[1] === true)
                            && <span className="material-symbols-outlined" style={{color: "#00FFFF"}}>thumb_down</span>
                        }
                        {
                            (!map.has(id) || !map.get(id).has(comment.commentId) || map.get(id).get(comment.commentId)[1] === false)
                            && <span className="material-symbols-outlined">thumb_down</span>
                        }
                        {comment.dislikes}
                    </button>
                    <button onClick={() => handleDelete(comment.commentId)} style={{float: "right"}}>
                        <span className="material-symbols-outlined" style={{margin: "0px", color: "#D2042D"}}>delete</span>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default CommentsList;