import { createContext } from "react";

const AppContext = createContext(null);

const initialData = {
    posts: {},
    comments: [],
    subreddits: [] 
};

const appReducer = (state, action) => {
    switch (action.type) {
        case "loadPosts":
            return {
                ...state,
                posts: action.payload
            }
        case "clearPosts":
            return {
                ...state,
                posts: []
            }
        case "morePosts":
            return {
                ...state,
                posts: {
                    ...action.payload,
                    children: [...state.posts.children, ...action.payload.children]
                }
            }
        case "loadComments":
            return {
                ...state,
                comments: action.payload
            }
        case "loadSubreddits":
            return {
                ...state,
                subreddits: action.payload
            }
        default:
            return state
    }
};

export {
    AppContext,
    appReducer,
    initialData
}