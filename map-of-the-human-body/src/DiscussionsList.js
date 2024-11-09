function DiscussionsList(props){

    const discussions = props.discussions;

    return(
        <div className="discussionsList">
            {discussions.map((discussion) => (
                <div className="discussionPreview" key={discussion.id}>
                    <h3>{discussion.title}</h3>
                    <p>Posted by: {discussion.author}</p>
                    <p>{discussion.body}</p>
                </div>
            ))}
        </div>
    );
}

export default DiscussionsList;