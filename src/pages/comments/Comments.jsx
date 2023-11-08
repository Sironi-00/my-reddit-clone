import { useParams } from "react-router-dom"

export default function Comments() {
  const { postId } = useParams();
  return (
    <>
    <div>Post by id</div>
    <h2>{postId}</h2>
    </>
  )
}
