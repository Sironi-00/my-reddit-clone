const selectPosts = (context) => context.posts;

const selectComments = (context) => context.comments;

const selectSubreddits = (context) => context.subreddits;

export {
    selectSubreddits,
    selectPosts,
    selectComments,
}

