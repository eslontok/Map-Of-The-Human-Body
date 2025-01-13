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
                    <button onClick={() => handleDelete(discussion.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default DiscussionsList;