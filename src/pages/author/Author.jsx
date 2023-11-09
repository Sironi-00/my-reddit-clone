import { useEffect, useState } from "react";
//import "./Author.css";
import { Link, useParams } from "react-router-dom";
import { getPosts } from "../../api/redditApi";
import Post from "../../components/post/Post";

export default function Author() {
    const [postsState, setPostsState] = useState([]);

    const { author } = useParams();

    useEffect(
        () => async () => {
            const data = await getPosts(`user/${author}`);
            setPostsState(data);
        },
        [author]
    );

    return (
        <div className="posts-page">
            <div className="sub-heads">
                <Link to="">Sub</Link>
                <Link to="">Sub</Link>
                <Link to="">Sub</Link>
                <Link to="">Sub</Link>
            </div>
            <h2>Display posts like YT posts: {postsState.length}</h2>
            <div className="posts">
                {/* {postsState.map((post, idx) => <Post key={idx} postObject={post} />)} */}
                {/* use one div on mobile */}
                <div className="left-posts">
                    {postsState.slice(0, Math.floor(postsState.length / 2)).map((post, idx) => (
                        <Post key={idx} postObject={post} />
                    ))}
                </div>
                <div className="right-posts">
                    {postsState.slice(Math.floor(postsState.length / 2)).map((post, idx) => (
                        post.kind === "t3" &&<Post key={idx} postObject={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}
