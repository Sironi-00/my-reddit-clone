// const baseURL = "https://www.reddit.com/";

import fakePosts from "./fakeData/posts";
const getPosts = async (paramString="") => {
    //return (await Promise.resolve(fakePosts)).data.children;
    // eslint-disable-next-line no-unreachable
    
    try {
        const res = await fetch(`https://www.reddit.com/${paramString}.json?raw_json=1`);
        if(res.ok) {
            const resJson = await res.json();
            return resJson.data.children;
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
            console.log(resJson["data"]["children"])
            return resJson["data"]["children"];
        }
        return []
    } catch (err) {
        console.log("Error: API getSubreddits()", err);
        return []
    }
}

const getSearch = async (query) => {    
    if (!query) {
        return []
    }
    try {
        const res = await fetch(`https://www.reddit.com/search.json?q=${query}&raw_json=1`);
        if(res.ok) {
            const resJson = await res.json();
            return resJson["data"]["children"];
        }
        return []
    } catch (err) {
        console.log("Error: API getSearch()", err);
        return []
    }
}

export {
    getPosts,
    getComments,
    getSubreddits,
    getSearch
}