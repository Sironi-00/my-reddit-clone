// const baseURL = "https://www.reddit.com/";

// import fakePosts from "./fakeData/posts";
const getPosts = async (paramString=".json", { afterId="", beforeId=""}={}) => {
    // console.log("fetching", paramString)
    if (!paramString) {
        paramString = ".json?";
    }
    const pagination = {
        after: afterId? `&after=${afterId}`: "",
        before: beforeId? `&before=${beforeId}`: ""
    }

    try {
        const res = await fetch(`https://www.reddit.com/${paramString}raw_json=1${pagination.after}${pagination.before}`);
        if (res.status === 429) {
            console.log("429:")
            //return (await (Promise.resolve(fakePosts))).data;
        }
        if(res.ok) {
            const resJson = await res.json();
            return resJson.data;
        }
        return {};
    } catch (err) {
        console.log("Error: API getPosts()", err);
        return {};
    }
    
}

// import fakeComments from './fakeData/comments';
const getComments = async (postId = "") => {    
    try {
        const res = await fetch(`https://www.reddit.com/${postId}.json?raw_json=1`);
        if (res.status === 429) {
            console.log("429:")
            // return (await (Promise.resolve(fakeComments)));
        }
        if(res.ok) {
            const resJson = await res.json();
            return resJson;
        }
        return []
    } catch (err) {
        console.log("Error: API getComments()", err);
        return []
    }
}

// import fakeSubreddits from "./fakeData/subreddits";
const getSubreddits = async () => {
    // console.log("fetching, sub/r", )
    try {
        const res = await fetch(`https://www.reddit.com/subreddits.json?raw_json=1`);
        if (res.status === 429) {
            console.log("429:")
            // return (await (Promise.resolve(fakeSubreddits))).data.children;
        }
        if(res.ok) {
            const resJson = await res.json();
            return resJson["data"]["children"];
        }
        return []
    } catch (err) {
        console.log("Error: API getSubreddits()", err);
        return []
    }
}

export {
    getPosts,
    getComments,
    getSubreddits,
}