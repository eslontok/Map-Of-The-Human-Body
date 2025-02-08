import {useState} from "react";

function Create(){

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");

    return(
        <div className="create">
            <h2>Create a New Discussion</h2>
            <form>
                <label>Title:</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label>Author:</label>
                <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)}/>
                <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                <button>Upload</button>
                <p>{title}</p>
                <p>{author}</p>
                <p>{body}</p>
            </form>
        </div>
    );
}

export default Create;