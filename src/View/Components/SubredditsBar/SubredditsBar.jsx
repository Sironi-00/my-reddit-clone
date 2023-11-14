import "./SubredditsBar.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSubreddits } from "../../../api/redditApi";

import { CircularProgress } from "@mui/material";

export default function SubredditsBar() {
    const [isLoading, setIsLoading] = useState(false);
    const [subredditArray, setSubredditArray] = useState([]);

    const { subreddit = "" } = useParams();

    const loadArray = async () => {
        setIsLoading(true);
        const data = await getSubreddits();
        setIsLoading(false);
        setSubredditArray(data);
    };

    useEffect(() => {
        loadArray();
        return setSubredditArray([]);
    }, [setSubredditArray]);

    return (
        <>
            <div className="subreddits-bar">
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    subredditArray.length > 0 && (
                        <div className="sub-heads">
                            {subredditArray.map((sub) => {
                                const { display_name, url } = sub["data"];
                                return (
                                    <Link
                                        key={display_name}
                                        className={subreddit === display_name ? "current-subreddit" : ""}
                                        data-testid="subreddit-link"
                                        to={`/.${url}`}
                                    >
                                        r/{display_name}
                                    </Link>
                                );
                            })}
                        </div>
                    )   
                )}
            </div>
        </>
    );
}
