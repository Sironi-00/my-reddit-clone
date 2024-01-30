import "./SubredditsBar.css";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSubreddits } from "../../../api/redditApi";

import { CircularProgress } from "@mui/material";
import { AppContext } from "../../../Controller/Controller";
import { selectSubreddits } from "../../../Controller/Selectors";

export default function SubredditsBar() {
    const { appData, dispatch } = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(false);
    
    const subredditArray = selectSubreddits(appData);

    const { subreddit = "" } = useParams();

    const loadArray = async () => {
        setIsLoading(true);
        const data = await getSubreddits();
        dispatch({
            type: "loadSubreddits",
            payload: data
        });
        setIsLoading(false);
    };

    useEffect(() => {
        loadArray();
    }, []);

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
                                console.log(`r/${display_name}`);
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
