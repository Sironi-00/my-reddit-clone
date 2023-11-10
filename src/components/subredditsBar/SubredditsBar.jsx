import "./SubredditsBar.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSubreddits } from "../../api/redditApi";

export default function SubredditsBar() {
    const [subredditArray, setSubredditArray] = useState([]);

    const { subreddit = "" } = useParams();

    useEffect(
        () => async () => {
            const data = await getSubreddits();
            setSubredditArray(data);
        },
        [setSubredditArray, subreddit]
    );

    if (subredditArray.length < 1) {
        return ;
    }

    return (
        <div className="subreddits-bar">
            <div className="sub-heads">
                {
                    subredditArray.length > 0 && (
                        subredditArray.map((sub) => {
                            const { display_name,  url } = sub["data"];
                            return <Link key={display_name} className={subreddit === display_name ? "current-subreddit":""} to={`/.${url}`}>r/{display_name}</Link>;
                        })

                    )
                }
            </div>
        </div>
    );
}
