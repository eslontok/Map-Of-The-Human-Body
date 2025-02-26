import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Create(){

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");
    const likes = 0;
    const dislikes = 0;
    const comments = [];

    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

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
        <div className="create">
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
    );
}

export default Create;