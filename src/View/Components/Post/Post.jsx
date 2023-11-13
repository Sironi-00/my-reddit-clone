import "./Post.css";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import Carousel from "../Carousel/Carousel";

export default function Post({ postObject }) {
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
                <p className="bold">{new Date(created_utc * 1000).toLocaleDateString()}</p>
            </div>
            <h3 className="post-title">
                <Link to={`/comments/${id}`}>{title}</Link>
            </h3>
            {link_flair_text && <p className="flair-text">{link_flair_text}</p>}

            {selftext && (
                <>
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
