import "./SubredditsBar.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSubreddits } from "../../../api/redditApi";

import { CircularProgress } from '@mui/material';

export default function SubredditsBar() {
    const [isLoading, setIsLoading] = useState(false);
    const [subredditArray, setSubredditArray] = useState([]);

    const { subreddit = "" } = useParams();

    const loadArray = async () => {
        setIsLoading(true)
        const data = await getSubreddits();
        setIsLoading(false);
        setSubredditArray(data);
    };

    useEffect(() => {
        loadArray();
        return setSubredditArray([]);
    }, [setSubredditArray, subreddit]);

    return (
        <>
            {subredditArray.length > 0 && (
                <div className="subreddits-bar">
                    {
                        isLoading? <CircularProgress /> :
                    <div className="sub-heads">
                        {subredditArray.length > 0 &&
                            subredditArray.map((sub) => {
                                const { display_name, url } = sub["data"];
                                return (
                                    <Link
                                        key={display_name}
                                        className={subreddit === display_name ? "current-subreddit" : ""}
                                        to={`/.${url}`}
                                    >
                                        r/{display_name}
                                    </Link>
                                );
                            })}
                    </div>
                    }
                </div>
            )}
        </>
    );
}
