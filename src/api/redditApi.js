// const baseURL = "https://www.reddit.com/api/v1/";
//const baseURL = "https://www.reddit.com";
//const baseURL = "https://www.reddit.com/r/popular/top.json?raw_json=1"
const baseURL = "https://www.reddit.com/r/Scotland.json?raw_json=1"

//import fakeData from './fakeData'
import fakeData from './r.Scotland'

const getPosts = async () => {
    return Promise.resolve(fakeData.data.children)
    
    // eslint-disable-next-line no-unreachable
    try {
        const res = await fetch(`${baseURL}`);
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

const getComments = async () => {
    return Promise.resolve(fakeData.data.children)
    
    // eslint-disable-next-line no-unreachable
    try {
        const res = await fetch(`${baseURL}`);
        if(res.ok) {
            const resJson = await res.json();
            console.log("########")
            console.log(resJson);
            return resJson.data.children;
        }
        return []
    } catch (err) {
        console.log(err);
        return []
    }
    
}


export {
    getPosts,
    getComments
}