import {useState} from "react";

function Home(){

    /*const [sen, setSen] = useState("Never gonna give you up") //delete later
    const handleClick1 = () => { //delete later
        setSen("Never gonna let you down");
    }
    const handleClick2 = (name) => { //delete later
        console.log("Hello " + name);
    }*/

    const [posts, setPosts] = useState([
        {id: 1, title: "Post1", author: "anonymous1", body: "This is post1 by anonymous1"},
        {id: 2, title: "Post2", author: "anonymous2", body: "This is post2 by anonymous2"},
        {id: 3, title: "Post3", author: "anonymous3", body: "This is post3 by anonymous3"}
    ]);

    return(
        <div className="home">
            <h2>Homepage</h2>
            {/*<p>{sen}</p>
            <button onClick={handleClick1}>Test Button 1</button>
            <button onClick={() => handleClick2("Michael Phelps")}>Test Button 2</button> DELETE LATER*/} 
            {posts.map((post) => (
                <div className="postPreview" key={post.id}>
                    <h3>{post.title}</h3>
                    <p>Posted by: {post.author}</p>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;