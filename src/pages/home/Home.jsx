import "./Home.css";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts, getSearch } from "../../api/redditApi";
import Post from "../../components/post/Post";

export default function Home() {
    const [postsState, setPostsState] = useState([]);
    const [splitPosts, setSplitPosts] = useState(false);

    const { subreddit = null, author = null } = useParams();

    const [searchParams] = useSearchParams();

    const queryString = searchParams.get("q");

    const loadData = async () => {
        setPostsState([]);
        if (subreddit) {
            const data = await getPosts(`r/${subreddit}`);
            setPostsState(data);
        } else if (author) {
            const data = await getPosts(`user/${author}`);
            setPostsState(data);
        } else if (queryString) {
            const data = await getSearch(queryString);
            setPostsState(data);
        } else {
            const data = await getPosts();
            setPostsState(data);
        }
    };
    useEffect(() => {
        loadData();
        return setPostsState([]);
    }, [subreddit, author, queryString]);

    return (
        <>
            <a className="btn posts-to-top" href="#p-top" >
                Back to Top
            </a>
            <div className="posts-page">
                <button className="btn posts-view" onClick={() => setSplitPosts((prev) => !prev)}>
                    {splitPosts ? "Single" : "Split"} View
                </button>
                <h2 className="page-title" id="p-top">
                    {subreddit
                        ? `Subrredit: r/${subreddit}`
                        : author
                        ? `Author: ${author}`
                        : queryString
                        ? `Search: ${queryString}`
                        : "Home"}
                </h2>
                <div className="posts">
                    {/* toggle split posts */}
                    {splitPosts ? (
                        <>
                            <div className="left-posts">
                                {postsState
                                    .slice(0, Math.ceil(postsState.length / 2))
                                    .map((post, idx) => post["kind"] === "t3" && <Post key={idx} postObject={post} />)}
                            </div>
                            <div className="right-posts">
                                {postsState
                                    .slice(Math.ceil(postsState.length / 2))
                                    .map((post, idx) => post["kind"] === "t3" && <Post key={idx} postObject={post} />)}
                            </div>
                        </>
                    ) : (
                        <div className="row-posts">
                            {postsState.map(
                                (post, idx) => post["kind"] === "t3" && <Post key={idx} postObject={post} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
