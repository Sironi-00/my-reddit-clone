import "./Comments.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../../api/redditApi";

import Post from "../../Components/Post/Post";
import CommentMessage from "../../Components/CommentMessage/CommentMessage";

import { CircularProgress } from '@mui/material';

export default function Comments() {
    const [isLoading, setIsLoading] = useState(false);
    const [postState, setPostState] = useState([]);

    const { postId = "" } = useParams();
    const loadPost = async () => {
        setIsLoading(true)
        if (postId) {
            const data = await getComments(postId);
            setPostState(data);
        }
        setIsLoading(false)
    }
    useEffect(() => {
        loadPost();
    },
        [postId]
    );

    document.title =  postState[0]? postState[0]["data"]["children"][0]["data"]["title"]: ""

    return (
        <>
        <a className="btn posts-to-top" href="#c-top" >
                Back to Top
            </a>
        <div className="comment-page">
                <div className="comments">
                    {
                        isLoading && <CircularProgress />
                    }
                    {
                        postState[0] && <Post postObject={postState[0]["data"]["children"][0]} />
                    }
                    <div className="comment-messages" id="c-top">
                    {
                        postState[1] && postState[1]["data"]["children"].map((commentObj, idx) => (<CommentMessage key={idx} commentsObject={commentObj} />))
                    }
                    </div>
                </div>
        </div>
        </>
    );
}
