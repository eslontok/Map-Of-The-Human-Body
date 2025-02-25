import {useParams} from "react-router-dom";
import useFetch from "./useFetch";

function Comments(){

    const {id} = useParams();
    const {data: discussion, setData: setDiscussion, isLoading, error} = useFetch("http://localhost:8000/discussions/" + id);

    return(
        <div className="comments">
            {error && <div style={{color: "#D2042D"}}>{error}</div>}
            {isLoading && <div>Loading discussion...</div>}
            {discussion && (
                <article>
                    <h2>{discussion.title}</h2>
                    <h3>Posted by: {discussion.author}</h3>
                    <p>{discussion.body}</p>
                    <span className="material-symbols-outlined">prompt_suggestion</span>
                    <form>
                        <label>Author:</label>
                        <input type="text" required/>
                        <textarea required></textarea>
                        <button>Upload</button>
                    </form>
                </article>
            )}
        </div>
    );
}

export default Comments;