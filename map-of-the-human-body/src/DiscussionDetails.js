import {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import useFetch from "./useFetch";

function DiscussionDetails(){

    const {id} = useParams();
    const {data: discussion, isLoading, error} = useFetch("http://localhost:8000/discussions/" + id);

    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const handleDelete = () => {
        setIsDeleting(true);
        setTimeout(() => {
            fetch("http://localhost:8000/discussions/" + id, {
                method: "DELETE"
            }).then(() => {
                setIsDeleting(false);
                navigate("/discussions");
            });
        }, 500);
    }

    const handleEdit = () => {
        console.log("Editor Enabled");
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
                    <div className="discussionButtons">
                        <button onClick={handleEdit}>Edit</button>
                        {!isDeleting && <button onClick={handleDelete}>Delete</button>}
                        {isDeleting && <button disabled>Deleting...</button>}
                    </div>
                </article>
            )}
        </div>
    );
}

export default DiscussionDetails;