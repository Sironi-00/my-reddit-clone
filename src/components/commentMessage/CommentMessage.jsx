import "./CommentMessage.css";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";

/* eslint-disable react/prop-types */
export default function CommentMessage({ commentsObject }) {
    const { data } = commentsObject;
    const {
        body,
        created_utc,
        ups,
        author,

        id,
        parent_id,
        depth,
    } = data;

    return (
        <>
            {commentsObject["kind"] === "t1" && (
                <div className="comment-message">
                    <div className="flex head-info">
                        <p>Parent: {parent_id}</p>
                        <p>Comment by: <Link to={`/author/${author}`}>{author}</Link></p>
                        <p>{new Date(created_utc * 1000).toLocaleDateString()}</p>
                    </div>
                    <div className="comment-body">
                        <Markdown className="comment-text">
                            {body}
                        {/* <p className="comment-text">{body}</p> */}
                        </Markdown>
                        <p className="comment-votes">U: {ups}</p>
                    </div>
                </div>
            )}
        </>
    );
}