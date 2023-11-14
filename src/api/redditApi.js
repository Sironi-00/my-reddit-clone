// const baseURL = "https://www.reddit.com/";

const getPosts = async (paramString=".json", { afterId="", beforeId=""}={}) => {
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
        return {};
    } catch (err) {
        console.log("Error: API getPosts()", err);
        return {};
    }
    
}

const getComments = async (postId = "") => {    
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

const getSubreddits = async () => {    
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