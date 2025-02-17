import {useState} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
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

    return(
        <div className="discussionDetails">
            {error && <div style={{color: "#D2042D"}}>{error}</div>}
            {isLoading && <div>Loading discussion...</div>}
            {discussion && (
                <article>
                    <h2>{discussion.title}</h2>
                    <h3>Posted by: {discussion.author}</h3>
                    <p>{discussion.body}</p>
                    <button>
                        <span className="material-symbols-outlined">thumb_up</span>
                        {discussion.likes}
                    </button>
                    <button>
                        <span className="material-symbols-outlined">thumb_down</span>
                        {discussion.dislikes}
                    </button>
                    <div className="discussionButtons">
                        <Link to={`/discussions/${id}/edit`}>
                            <button>Edit</button>
                        </Link>
                        {!isDeleting && <button onClick={handleDelete}>Delete</button>}
                        {isDeleting && <button disabled>Deleting...</button>}
                    </div>
                </article>
            )}
        </div>
    );
}

export default DiscussionDetails;