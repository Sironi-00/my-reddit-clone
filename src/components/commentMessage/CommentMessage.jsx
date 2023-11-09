import { Link } from "react-router-dom";

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
            <div className="comment-message">
                <div className="head-info">
                    <Link to={`/author/${author}`}>{author}</Link>
                    <p>{new Date(created_utc * 1000).toLocaleDateString()}</p>
                </div>
                <p>Body: {body}</p>
                <p>U: {ups}</p>
                <hr />
                {/* {JSON.stringify(commentsObject)} */}
            </div>
        </>
    );
}
