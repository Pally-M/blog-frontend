import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, addComment, deleteComments } from "../Api.js";
import LoadingPage from "./LoadingDetailPage";

const PostList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPost(id);
        if (fetchedPost) {
          setPost(fetchedPost);
          setComments(fetchedPost.comments || []);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        setError("Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const newComment = { text: comment };
    try {
      await addComment(id, newComment);
      setComments((prevComments) => [...prevComments, newComment]);
      setComment("");
    } catch (err) {
      setError("Failed to add comment");
    }
  };

  const handleDeleteComments = async () => {
    try {
      await deleteComments(id);
      setComments([]);
    } catch (err) {
      setError("Failed to delete comments");
    }
  };

  if (loading) return <LoadingPage />;

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  if (!post) return <div className="text-center">Post not found</div>;

  return (
    <section className="bg-hero-pattern bg-cover bg-center overflow-hidden py-24" style={{ backgroundColor: "#f4e9e0" }}>
      <div className="container mx-auto px-4">
        <button
          className="text-gray-500 group inline-flex items-center gap-2 flex-wrap mb-6"
          onClick={() => navigate(-1)}
        >
          <div className="group-hover:text-gray-600 transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M15.4167 10H5M5 10L10 5M5 10L10 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
          <span className="group-hover:text-gray-600 transition duration-200 font-bold">
            Back to Blog
          </span>
        </button>
        <h2 className="text-3xl lg:text-5xl font-bold mb-12 max-w-xl lg:max-w-3xl mx-auto" style={{ color: "#424d51" }}>
          {post.title}
        </h2>
        <img
          className="w-full h-64 lg:h-96 mx-auto rounded-2xl mb-12 object-cover"
          src={post.image}
          alt="Blog Post"
        />
        <p className="text-lg mb-6" style={{ color: "#424d51" }}>
          {post.content}
        </p>
        <hr className="w-full h-px mb-6" style={{ backgroundColor: "#eedbcd" }} />
        <h3 className="text-2xl font-bold mb-4" style={{ color: "#80b4ab" }}>Comments</h3>
        <button
          className="py-2 px-4 text-white rounded transition duration-200 mb-4"
          style={{ backgroundColor: "#80b4ab" }}
          onClick={handleDeleteComments}
        >
          Erase Comments
        </button>
        <ul className="mb-12">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <li key={index} className="mb-2 p-2 border-b" style={{ borderColor: "#eedbcd", backgroundColor: "#f4e9e0" }}>
                {comment.text}
              </li>
            ))
          ) : (
            <li>No comments yet</li>
          )}
        </ul>
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full h-24 p-2 border rounded mb-2"
            style={{ borderColor: "#80b4ab", backgroundColor: "#eedbcd" }}
            placeholder="Add a comment"
          />
          <button
            type="submit"
            className="py-2 px-4 text-white rounded transition duration-200"
            style={{ backgroundColor: "#80b4ab" }}
          >
            Add Comment
          </button>
        </form>
      </div>
    </section>
  );
};

export default PostList;
