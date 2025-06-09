import "./css/comments.css";
import {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import useFetch from "./useFetch";
import ScrollToTop from "./ScrollToTop";

/**
 * Comments component displays the Create Comment page and handles any logic relating to the Create Comment page
 * @author Earl Lontok
 */
function Comments(){

    const {id} = useParams();

    //holds the fetched discussion data with the associated ID from the discussions resource (JSON server)
    const {data: discussion, isLoading, error} = useFetch("http://localhost:8000/discussions/" + id);

    //holds the properties of a comment
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");
    const likes = 0;
    const dislikes = 0;

    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    //generates a unique numerical ID
    const genId = () => {
        let newCommentId = -1;
        for(let i = 0; i < discussion.comments.length; i++){
            const comment = discussion.comments[i];
            if(comment.commentId > newCommentId){
                newCommentId = comment.commentId;
            }
        }
        return newCommentId + 1;
    }

    //adds a new comment object to the discussion with the associated ID to the discussions resource (JSON server)
    const handleSubmit = (e) => {
        e.preventDefault();
        const commentId = genId();
        const comment = {commentId, author, body, likes, dislikes};
        const newComments = [...discussion.comments];
        newComments.push(comment);
        setIsUploading(true);
        setTimeout(() => {
            fetch("http://localhost:8000/discussions/" + id, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    comments: newComments
                })
            }).then(() => {
                setIsUploading(false);
                navigate("/discussions/" + id);
            });
        }, 500);
    }

    return(
        <div className="commentsScene">
            <div className="comments">
                <ScrollToTop/>
                {error && <div style={{color: "#D2042D"}}>{error}</div>}
                {isLoading && <div>Loading discussion...</div>}
                {discussion && (
                    <article>
                        <h2>{discussion.title}</h2>
                        <h3>Posted by: {discussion.author}</h3>
                        <p>{discussion.body}</p>
                        <span className="material-symbols-outlined">prompt_suggestion</span>
                        <form onSubmit={handleSubmit}>
                            <label>Author:</label>
                            <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)}/>
                            <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                            {!isUploading && <button>Upload</button>}
                            {isUploading && <button disabled>Uploading...</button>}
                        </form>
                    </article>
                )}
            </div>
        </div>
    );
}

export default Comments;