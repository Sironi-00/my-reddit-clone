import "./Post.css";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import Carousel from "../carousel/Carousel";

export default function Post({ postObject }) {
    // post, src=reddit || embed
    // post, has img || is_gallery || carousel
    // post, Thumbnail
    // Post, link in selftext
    /* 
        data{} / children[] / {} / data{
            subreddit: [string]
            author_fullname: [string]
            author: [string]
            name: [string]
            title: [string]
            id: [string]
            
            num_comments: [int]
            created_utc: [int]
            
            # selftext_html: [string]
            url: [string]
            permalink: [string]

            downs: [int]
            ups: [int]
            score: [int]
            over_18: [bool]

            selftext: [string]
            
            link_flair_text
            is_video: [bool]
            
            
            media_embed: [{}]
            
            is_reddit_media_domain: [bool]
            thumbnail: [string]
            is_self: [bool]
            
            subreddit_id: [string]
            num_crossposts: [int]
            
            is_original_content: [bool] ?
            media: [null] ?
        } 
    */

    const { data } = postObject;
    const {
        subreddit,
        selftext,
        author,
        title,

        ups,
        downs,
        created_utc,
        id,
        permalink,
        num_comments,
        url_overridden_by_dest,
        is_self,
        link_flair_text,

        media_metadata,
        preview,
        is_video
    } = data;

    const extractGalleryUrl = (metaData) => {
        // extract alt urls
        if (!metaData) {
            return [];
        }
        
        const galleryUrl = [];
        Object.keys(media_metadata).forEach((galleryItem) => {
            const itemUrl = metaData[galleryItem]["s"]["u"];
            if (itemUrl) {
                galleryUrl.push(itemUrl);
            }
        });

        return galleryUrl;
    };

    const extractPreview = (preview) => {
        if (!preview) {
            return [];
        }
        
        const previewUrl = [];
        preview["images"].map((item) => {
            const itemUrl = item["source"].url;
            if (itemUrl) {
                previewUrl.push(itemUrl);
            }
        });
        return previewUrl;
    };

    if (is_video) {
        return
    }

    return (
        <div className="post">
            <div className="flex head-info">
                <Link to={`/r/${subreddit}`}>r/{subreddit}</Link>
                <p>
                    Posted by <Link to={`/author/${author}`}>{author}</Link>
                </p>
                {/* <Link to={`/a/${author_fullname}`}>r/{author_fullname}</Link> */}
                <p className="bold">{new Date(created_utc * 1000).toLocaleDateString()}</p>
            </div>
            <h3 className="post-title">
                <Link to={`/comments/${id}`}>{title}</Link>
            </h3>
            {link_flair_text && <p className="flair-text">{link_flair_text}</p>}

            {selftext && (
                <>
                    {/* <p className="head-text">Text:</p> */}
                    <Markdown className="markdown-text">{selftext}</Markdown>
                </>
            )}

            {media_metadata ? (
                <Carousel imageArray={extractGalleryUrl(media_metadata)} />
            ) : preview ? (
                <Carousel imageArray={extractPreview(preview)} />
            ) : (
                <></>
            )}

            <div className="flex post-footer">
                <a target="_blank" href={`https://www.reddit.com${permalink}`} rel="noreferrer">
                    Reddit
                </a>
                {!is_self && (
                    <Link to={url_overridden_by_dest} target="_blank">
                        Original Source
                    </Link>
                )}
                <div className="flex post-rating">
                    <p>U: {ups}</p>
                    <p>D: {downs}</p>
                    <p>
                        <Link to={`/comments/${id}`}>C: {num_comments}</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

Post.propTypes = {
    postObject: {},
};
