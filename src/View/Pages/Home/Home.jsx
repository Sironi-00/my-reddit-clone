import "./Home.css";
import { useParams, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getPosts } from "../../../api/redditApi";
import Post from "../../Components/Post/Post";

import { CircularProgress } from "@mui/material";
import { AppContext } from "../../../Controller/Controller";
import { selectPosts } from "../../../Controller/Selectors";

export default function Home() {
    const { appData, dispatch } = useContext(AppContext);
    const { children = [], after = "" } = selectPosts(appData);

    const [splitPosts, setSplitPosts] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { subreddit = null, author = null } = useParams();

    const [searchParams] = useSearchParams();
    const queryString = searchParams.get("q");

    const fetchString = () => {
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

        const data = await getPosts(fetchString());
        dispatch({ type: "loadPosts", payload: data });

        setIsLoading(false);
    };

    const loadDataAfter = async () => {
        if (!after) {
            return;
        }
        setIsLoading(true);
        const data = await getPosts(fetchString(), { afterId: after });
        dispatch({ type: "morePosts", payload: data });
        setIsLoading(false);
    };

    useEffect(() => {
        dispatch({
            type: "clearPosts",
        });
        loadData();
    }, [subreddit, author, queryString]);

    document.title = subreddit
        ? `🌐 r/${subreddit}`
        : author
        ? `👤 ${author}`
        : queryString
        ? `🔍 ${queryString}`
        : "🪩 reddit clone";

    return (
        <>
            <a className="btn posts-to-top" href="#p-top">
                Back to Top
            </a>
            <div className="posts-page">
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
                {children.length > 0 ? (
                    <div className="posts">
                        {splitPosts ? (
                            <>
                                <div className="left-posts">
                                    {children
                                        .slice(0, Math.ceil(children.length / 2))
                                        .map(
                                            (post, idx) => post["kind"] === "t3" && <Post key={idx} postObject={post} />
                                        )}
                                </div>
                                <div className="right-posts">
                                    {children
                                        .slice(Math.ceil(children.length / 2))
                                        .map(
                                            (post, idx) => post["kind"] === "t3" && <Post key={idx} postObject={post} />
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
                        {isLoading && <CircularProgress />}
                        <div className="posts-pagination">
                            {!isLoading && after && (
                                <button className="btn" onClick={() => loadDataAfter()}>
                                    More
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <>{isLoading ? <CircularProgress />: <h2 className="no-items">No posts found</h2>}</>
                )}
            </div>
        </>
    );
}
