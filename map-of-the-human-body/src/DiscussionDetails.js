import {useParams, useNavigate} from "react-router-dom";
import useFetch from "./useFetch";

function DiscussionDetails(){

    const {id} = useParams();
    const {data: discussion, isLoading, error} = useFetch("http://localhost:8000/discussions/" + id);
    const navigate = useNavigate();

    const handleDelete = () => {
        fetch("http://localhost:8000/discussions/" + id, {
            method: "DELETE"
        }).then(() => {
            navigate("/discussions");
        });
    }

    return(
        <div className="discussionDetails">
            {error && <div style={{marginTop: "5px", color: "#D2042D"}}>{error}</div>}
            {isLoading && <div style={{marginTop: "5px"}}>Loading discussion...</div>}
            {discussion && (
                <article>
                    <h2>{discussion.title}</h2>
                    <h3>Posted by: {discussion.author}</h3>
                    <p>{discussion.body}</p>
                    <button onClick={handleDelete} style={{float: "right"}}>Delete</button>
                </article>
            )}
        </div>
    );
}

export default DiscussionDetails;