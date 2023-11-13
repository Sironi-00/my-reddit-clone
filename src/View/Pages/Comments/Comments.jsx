import "./Comments.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../../api/redditApi";

import Post from "../../Components/Post/Post";
import CommentMessage from "../../Components/CommentMessage/CommentMessage";

export default function Comments() {
    const [postState, setPostState] = useState([]);

    const { postId } = useParams();
    const loadPost = async () => {
        if (postId) {
            const data = await getComments(postId);
            setPostState(data);
        }
    }
    useEffect(() => {
        loadPost();
    },
        [postId]
    );

    return (
        <>
        <a className="btn posts-to-top" href="#c-top" >
                Back to Top
            </a>
        <div className="comment-page">
            <div className="comments">
                {postState[0] && <Post postObject={postState[0]["data"]["children"][0]} />}
                <div className="comment-messages" id="c-top">
                    {postState[1] &&
                        postState[1]["data"]["children"].map((commentObj, idx) => (
                            <CommentMessage key={idx} commentsObject={commentObj} />
                        ))}
                </div>
            </div>
        </div>
        </>
    );
}
