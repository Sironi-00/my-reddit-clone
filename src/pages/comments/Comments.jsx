import "./Comments.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../api/redditApi";

import Post from "../../components/post/Post";
import CommentMessage from "../../components/commentMessage/CommentMessage";

export default function Comments() {
    const [postState, setPostState] = useState([]);

    const { postId } = useParams();
    useEffect(
        () => async () => {
            if (postId) {
                const data = await getComments(postId);
                // console.log(data)
                setPostState(data);
            }
        },
        [postId]
    );

    return (
        <div className="comment-page">
            <div className="comments">
                {postState[0] && <Post postObject={postState[0]["data"]["children"][0]} />}
                <div className="comment-messages">
                    {postState[1] &&
                        postState[1]["data"]["children"].map((commentObj, idx) => (
                            <CommentMessage key={idx} commentsObject={commentObj} />
                        ))}
                </div>
            </div>
        </div>
    );
}
