import "./css/create.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

/**
 * Create component displays the Create Discussion page and handles any logic relating to the Create Discussion Page
 * @author Earl Lontok
 */
function Create(){

    //holds the properties of a discussion
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");
    const likes = 0;
    const dislikes = 0;
    const comments = [];

    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    //adds a new discussion object to the discussions resource (JSON Server)
    const handleSubmit = (e) => {
        e.preventDefault();
        const discussion = {title, author, body, likes, dislikes, comments};
        setIsUploading(true);
        setTimeout(() => {
            fetch("http://localhost:8000/discussions", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(discussion)
            }).then(() => {
                setIsUploading(false);
                navigate("/discussions");
            });
        }, 500);
        
    }

    return(
        <div className="createScene">
            <div className="create">
                <ScrollToTop/>
                <h2>Create a New Discussion</h2>
                <form onSubmit={handleSubmit}>
                    <label>Title:</label>
                    <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <label>Author:</label>
                    <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)}/>
                    <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                    {!isUploading && <button>Upload</button>}
                    {isUploading && <button disabled>Uploading...</button>}
                </form>
            </div>
        </div>
    );
}

export default Create;