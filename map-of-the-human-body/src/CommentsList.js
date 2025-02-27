function CommentsList(props){

    const comments = props.comments;

    return(
        <div className="commentsList">
            {comments.map((comment) => (
                <div className="commentPreview" key={comment.commentId}>
                    <h4>Commented by: {comment.author}</h4>
                    <p>{comment.body}</p>
                    <button>
                        <span className="material-symbols-outlined">thumb_up</span>
                        {comment.likes}
                    </button>
                    <button>
                        <span className="material-symbols-outlined">thumb_down</span>
                        {comment.dislikes}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default CommentsList;