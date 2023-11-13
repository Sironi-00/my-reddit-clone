import "./Home.css";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../../../api/redditApi";
import Post from "../../Components/Post/Post";

export default function Home() {
    const [splitPosts, setSplitPosts] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [postsState, setPostsState] = useState({});

    const { children, after } = postsState;

    const { subreddit = null, author = null } = useParams();

    const [searchParams] = useSearchParams();

    const queryString = searchParams.get("q");

    const fetchPayload = () => {
        let payload = "";
        if (subreddit) {
            payload = `r/${subreddit}.json?`;
        } else if (author) {
            payload = `user/${author}.json?`;
        } else if (queryString) {
            payload = `search.json?q=${queryString}&`;
        }
        return payload;
    };

    const loadData = async () => {
        setIsLoading(true);

        setPostsState({});
        const data = await getPosts(fetchPayload());
        setPostsState(data);

        setIsLoading(false);
    };

    const loadDataAfter = async () => {
        if (!after) {
            return;
        }
        setPostsState({});
        const data = await getPosts(fetchPayload(), { afterId: after });
        setPostsState(data);
    };

    useEffect(() => {
        loadData();
    }, [subreddit, author, queryString]);

    document.title = subreddit
        ? `subreddit -> r/${subreddit}`
        : author
        ? `author: ${author}`
        : queryString
        ? `search: ${queryString}`
        : "reddit clone";

    return (
        <>
            <a className="btn posts-to-top" href="#p-top">
                Back to Top
            </a>
            <div className="posts-page">
                {children && (
                    <>
                        <button className="btn posts-view md-only" onClick={() => setSplitPosts((prev) => !prev)}>
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
                                        {children
                                            .slice(0, Math.ceil(children.length / 2))
                                            .map(
                                                (post, idx) =>
                                                    post["kind"] === "t3" && <Post key={idx} postObject={post} />
                                            )}
                                    </div>
                                    <div className="right-posts">
                                        {children
                                            .slice(Math.ceil(children.length / 2))
                                            .map(
                                                (post, idx) =>
                                                    post["kind"] === "t3" && <Post key={idx} postObject={post} />
                                            )}
                                    </div>
                                </>
                            ) : (
                                <div className="row-posts">
                                    {children.map(
                                        (post, idx) => post["kind"] === "t3" && <Post key={idx} postObject={post} />
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="posts-pagination">
                            {after && (
                                <button className="btn" onClick={() => loadDataAfter()}>
                                    More
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
