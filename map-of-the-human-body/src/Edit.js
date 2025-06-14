import "./css/edit.css";
import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

/**
 * Edit component displays the Edit Discussion page and handles any logic relating to the Edit Discussion page
 * @author Earl Lontok
 */
function Edit(){

    const {id} = useParams();

    //holds the fetched discussion data with the associated ID from the discussions resource (JSON server)
    const [discussion, setDiscussion] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //holds the properties of the discussion with the associated ID
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");

    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    //updates the discussion object with the associated ID to the discussions resource (JSON Server)
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsUploading(true);
        setTimeout(() => {
            fetch("http://localhost:8000/discussions/" + id, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    title: title,
                    author: author,
                    body: body
                })
            }).then(() => {
                setIsUploading(false);
                navigate("/discussions/" + id);
            });
        }, 500);
    }

    //fetches the discussion data with the associated ID from the discussions resource (JSON Server)
    useEffect(() => {
        const abort = new AbortController();
        setTimeout(() => {
            fetch("http://localhost:8000/discussions/" + id, {signal: abort.signal})
                .then(response => {
                    if(!response.ok){
                        throw Error("ERROR: Server reached but could not fetch data!");
                    }
                    return response.json();
                })
                .then(data => {
                    setDiscussion(data);
                    setTitle(data.title);
                    setAuthor(data.author);
                    setBody(data.body);
                    setIsLoading(false);
                    setError(null);
                })
                .catch(error =>{
                    if(error.name !== "AbortError"){
                        setIsLoading(false);
                        setError(error.message);
                    }
                });
        }, 500);
        return () => abort.abort();
    }, [id]);

    return(
        <div className="editScene">
            <div className="edit">
                <ScrollToTop/>
                <h2>Edit Discussion</h2>
                {error && <div style={{color: "#D2042D"}}>{error}</div>}
                {isLoading && <div>Loading discussion...</div>}
                {discussion && (
                    <form onSubmit={handleSubmit}>
                        <label>Title:</label>
                        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <label>Author:</label>
                        <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)}/>
                        <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                        {!isUploading && <button>Upload</button>}
                        {isUploading && <button disabled>Uploading...</button>}
                    </form>
                )}
            </div>
        </div>
    );
}

export default Edit;