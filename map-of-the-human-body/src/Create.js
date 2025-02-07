function Create(){
    return(
        <div className="create">
            <h2>Create a New Discussion</h2>
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

export default Create;