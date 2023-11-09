import "./Home.css";

import { useEffect, useState } from "react";
import { getPosts } from "../../api/redditApi";
import Post from "../../components/post/Post";
import SubredditsBar from "../../components/subredditsBar/SubredditsBar";

export default function Home() {
  const [postsState, setPostsState] = useState([]);

  useEffect(()=>async () => {
      const data = await getPosts();
      setPostsState(data)
    }
    , [])
  return (
    <div className="posts-page">
    <SubredditsBar />
    <h2>
      Display posts like YT posts: {postsState.length} 
    </h2>
    <div className="posts">
      {/* {postsState.map((post, idx) => <Post key={idx} postObject={post} />)} */}
      {/* use one div on mobile */}
      <div className="left-posts">
        {
          postsState.slice(0, Math.floor(postsState.length / 2)).map((post, idx) => <Post key={idx} postObject={post} />)
        }
      </div>
      <div className="right-posts">
        {
          postsState.slice(Math.floor(postsState.length / 2)).map((post, idx) => <Post key={idx} postObject={post} />)
        }
      </div>
    </div>
    </div>
  )
}
