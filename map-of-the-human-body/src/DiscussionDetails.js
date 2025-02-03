import {useParams} from "react-router-dom";

function DiscussionDetails(){

    const {id} = useParams();

    return(
        <div className="discussionDetails">
            <h2>Discussion details for Discussion {id}</h2>
        </div>
    );
}

export default DiscussionDetails;