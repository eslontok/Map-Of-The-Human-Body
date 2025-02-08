import {Link} from "react-router-dom";

function DiscussionsList(props){

    const discussions = props.discussions;
    const handleLike = props.handleLike;
    const handleDislike = props.handleDislike;

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
                        <span className="material-symbols-outlined">thumb_up</span>
                        {discussion.likes}
                    </button>
                    <button onClick={() => handleDislike(discussion.id)}>
                        <span className="material-symbols-outlined">thumb_down</span>
                        {discussion.dislikes}
                    </button>
                    <h4 style={{
                        marginTop: "5px",
                        marginLeft: "5px"
                    }}>{discussion.replies.length} replies...</h4>
                </div>
            ))}
        </div>
    );
}

export default DiscussionsList;