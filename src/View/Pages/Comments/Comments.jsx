import "./Comments.css";

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../../api/redditApi";

import Post from "../../Components/Post/Post";
import CommentMessage from "../../Components/CommentMessage/CommentMessage";

import { CircularProgress } from '@mui/material';
import { AppContext } from "../../../Controller/Controller";
import { selectComments } from "../../../Controller/Selectors";

export default function Comments() {
    const { appData, dispatch } = useContext(AppContext);
    const postComment = selectComments(appData);

    const [isLoading, setIsLoading] = useState(false);

    const { postId = "" } = useParams();
    const loadPost = async () => {
        if (!postId) {
            return;
        }
        setIsLoading(true)
        const data = await getComments(postId);
        dispatch({
            type: "loadComments",
            payload: data
        });
        setIsLoading(false)
    }
    useEffect(() => {
        loadPost();
    },
        [postId]
    );

    document.title =  postComment[0]? `📄 ${postComment[0]["data"]["children"][0]["data"]["title"]}`: "📄 Comments"

    return (
        <>
        <a className="btn posts-to-top" href="#c-top" >
                Back to Top
            </a>
        <div className="comment-page">
            {
                (!isLoading&& postComment[0] && postComment[1]) ?<>
                <div className="comments">
                    <Post postObject={postComment[0]["data"]["children"][0]} />
                    <div className="comment-messages" id="c-top">
                    {
                        postComment[1]["data"]["children"].map((commentObj, idx) => (<CommentMessage key={idx} commentsObject={commentObj} />))
                    }
                    </div>
                </div></>:
                isLoading ? <CircularProgress />: <h2 className="no-items">No post Found</h2>
            }
        </div>
        </>
    );
}
