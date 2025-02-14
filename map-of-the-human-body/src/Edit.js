import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Edit(){
    return(
        <div className="edit">
            <h2>Edit Discussion</h2>
            <form>
                <label>Title:</label>
                <input type="text" required/>
                <label>Author:</label>
                <input type="text" required/>
                <textarea required></textarea>
                <button>Upload</button>
            </form>
        </div>
    );
}

export default Edit;