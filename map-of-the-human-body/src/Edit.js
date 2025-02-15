import {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import useFetch from "./useFetch";

function Edit(){

    const {id} = useParams();
    const {data: discussion, isLoading, error} = useFetch("http://localhost:8000/discussions/" + id);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");

    return(
        <div className="edit">
            <h2>Edit Discussion</h2>
            {error && <div style={{marginTop: "5px", color: "#D2042D"}}>{error}</div>}
            {isLoading && <div style={{marginTop: "5px"}}>Loading discussion...</div>}
            {discussion && (
                <form>
                    <label>Title:</label>
                    <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <label>Author:</label>
                    <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)}/>
                    <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                    <button>Upload</button>
                </form>
            )}
        </div>
    );
}

export default Edit;