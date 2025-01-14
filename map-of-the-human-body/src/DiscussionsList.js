function DiscussionsList(props){

    const discussions = props.discussions;
    const handleDelete = props.handleDelete;

    return(
        <div className="discussionsList">
            {discussions.map((discussion) => (
                <div className="discussionPreview" key={discussion.id}>
                    <h3>{discussion.title}</h3>
                    <h4>Posted by: {discussion.author}</h4>
                    <p>{discussion.body}</p>
                    <button>
                        <span className="material-symbols-outlined">thumb_up</span>
                        Likes
                    </button>
                    <button>
                        <span className="material-symbols-outlined">thumb_down</span>
                        Dislikes
                    </button>
                    <button onClick={() => handleDelete(discussion.id)} style={{
                        float: "right"
                    }}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default DiscussionsList;