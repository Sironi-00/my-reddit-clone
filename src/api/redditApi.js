// const baseURL = "https://www.reddit.com/";

const getPosts = async (paramString="") => {
    try {
        const res = await fetch(`https://www.reddit.com/${paramString}.json?raw_json=1`);
        if(res.ok) {
            const resJson = await res.json();
            return resJson.data.children;
        }
        return []
    } catch (err) {
        console.log(err);
        return []
    }
    
}

const getComments = async (postId) => {    
    if (!postId) {
        throw new Error("no postId")
    }
    // eslint-disable-next-line no-unreachable
    try {
        const res = await fetch(`https://www.reddit.com/${postId}.json?raw_json=1`);
        if(res.ok) {
            const resJson = await res.json();
            return resJson;
        }
        return []
    } catch (err) {
        console.log(err);
        return []
    }
}

const getSubreddits = async () => {    
    try {
        const res = await fetch(`https://www.reddit.com/r.json?raw_json=1`);
        if(res.ok) {
            const resJson = await res.json();
            return resJson;
        }
        return []
    } catch (err) {
        console.log(err);
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
            return resJson;
        }
        return []
    } catch (err) {
        console.log(err);
        return []
    }
}

export {
    getPosts,
    getComments,
    getSubreddits,
    getSearch
}