// const baseURL = "https://www.reddit.com/";

import fakePosts from "./fakeData/posts";
const getPosts = async (paramString=".json", { afterId="", beforeId=""}={}) => {
    //return (await Promise.resolve(fakePosts)).data;
    // eslint-disable-next-line no-unreachable
    if (!paramString) {
        paramString = ".json?";
    }
    const pagination = {
        after: afterId? `&after=${afterId}`: "",
        before: beforeId? `&before=${beforeId}`: ""
    }

    try {
        const res = await fetch(`https://www.reddit.com/${paramString}raw_json=1${pagination.after}${pagination.before}`);
        if(res.ok) {
            const resJson = await res.json();
            return resJson.data;
        }
        return []
    } catch (err) {
        console.log("Error: API getPosts()", err);
        return []
    }
    
}

import fakeComments from "./fakeData/comments";
const getComments = async (postId) => {    
    //return (await Promise.resolve(fakeComments));
    // eslint-disable-next-line no-unreachable
    if (!postId) {
        throw new Error("no postId")
    }

    try {
        const res = await fetch(`https://www.reddit.com/${postId}.json?raw_json=1`);
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

import fakeSubreddits from "./fakeData/subreddits";
const getSubreddits = async () => {
    //return (await Promise.resolve(fakeSubreddits)).data.children;
    // eslint-disable-next-line no-unreachable
    
    try {
        const res = await fetch(`https://www.reddit.com/subreddits.json?raw_json=1`);
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